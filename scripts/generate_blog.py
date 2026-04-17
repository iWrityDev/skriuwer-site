"""
generate_blog.py
----------------
Generates SEO-optimized blog posts via the Claude API and appends them to
data/blog-posts.json.

Usage:
    python scripts/generate_blog.py                        # auto-pick next unused topic
    python scripts/generate_blog.py --topic "My Title"     # specific topic
    python scripts/generate_blog.py --count 5              # generate 5 posts in a row
    python scripts/generate_blog.py --cheap                # use claude-3-5-haiku (cheaper)
    python scripts/generate_blog.py --count 3 --cheap      # combine flags

Requirements:
    pip install anthropic

Environment variables:
    ANTHROPIC_API_KEY   Your Anthropic API key
"""

import argparse
import json
import os
import re
import sys
from datetime import date
from pathlib import Path

# Fix Windows console encoding
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

import anthropic

# ---------------------------------------------------------------------------
# Paths (resolved relative to the repo root, one level above /scripts)
# ---------------------------------------------------------------------------
REPO_ROOT = Path(__file__).parent.parent
BLOG_JSON = REPO_ROOT / "data" / "blog-posts.json"
TOPICS_USED_JSON = Path(__file__).parent / "blog_topics_used.json"

# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
MODEL_DEFAULT = "claude-opus-4-5"
MODEL_CHEAP = "claude-haiku-4-5"

# ---------------------------------------------------------------------------
# Predefined topic list (60+ titles)
# ---------------------------------------------------------------------------
TOPICS = [
    "Why Greek Mythology Still Matters Today",
    "The Rise and Fall of the Roman Empire: A Brief History",
    "How to Learn Frisian: A Complete Guide for Beginners",
    "The Most Fascinating Norse Myths You've Never Heard Of",
    "Ancient Egypt: The Secrets Behind the Pyramids",
    "Top 10 History Books That Changed How We See the World",
    "The Best Bilingual Books for Learning German Fast",
    "Viking Age: Everything You Need to Know",
    "Latin: A Dead Language That Refuses to Die",
    "The History of the Dutch Language",
    "Greek Gods Explained: Who They Are and Why They Matter",
    "The Trojan War: Myth or History?",
    "Ancient Rome vs Ancient Greece: Key Differences",
    "How Languages Die (And Why It Matters)",
    "The Best Books About the Frisian Language and Culture",
    "Mesopotamia: The Cradle of Civilization",
    "Alexander the Great: Conqueror of the Known World",
    "Medieval Europe: Life in the Middle Ages",
    "The Byzantine Empire: Rome's Forgotten Legacy",
    "Celtic Mythology: Gods, Heroes, and Legends",
    "The History of Writing: From Cuneiform to Today",
    "Ancient Greek Philosophy: Socrates, Plato, Aristotle",
    "The Silk Road: How East Met West",
    "Egyptian Mythology: Gods of the Nile",
    "How to Learn Dutch: Tips for English Speakers",
    "The Best History Books for Beginners",
    "Roman Gods vs Greek Gods: What's the Difference?",
    "The Iliad and the Odyssey: Homer's Epic Tales Explained",
    "Hannibal Barca: Rome's Greatest Enemy",
    "The Persian Wars: Greece vs. Persia",
    "Stoicism: Ancient Philosophy for Modern Life",
    "The History of the Frisian People",
    "Charlemagne: Father of Europe",
    "The Crusades: Everything You Need to Know",
    "Ancient Sparta: The Warrior Society",
    "The Library of Alexandria: What We Lost",
    "Julius Caesar: Conqueror, Dictator, Martyr",
    "The Mystery of the Minoans: Europe's First Civilization",
    "Norse Gods: Odin, Thor, Loki and the Others",
    "The Peloponnesian War: Athens vs. Sparta",
    "How Empires Fall: Lessons from History",
    "Cleopatra: The Last Pharaoh of Egypt",
    "The Ottoman Empire: 600 Years of History",
    "Medieval Knights: Life, Honor, and Battle",
    "The Black Death: How the Plague Changed Europe",
    "Ancient Chinese Civilization and Its Influence",
    "The Spanish Armada: England's Greatest Naval Victory",
    "World War I Origins: A Complete Explanation",
    "The Renaissance: Art, Science, and Rebirth",
    "The French Revolution: Liberty, Equality, Chaos",
    "Napoleon Bonaparte: Genius or Tyrant?",
    "The American Revolution and Its European Roots",
    "Ancient Persia: The Achaemenid Empire",
    "The Mongol Empire: History's Largest Land Empire",
    "Why Learn a Second Language? Science and Benefits",
    "The Phoenicians: The Forgotten Civilization",
    "Carthage: The City Rome Had to Destroy",
    "The History of Democracy: From Athens to Today",
    "Gladiators: The Reality Behind the Arena",
    "Ancient Roman Daily Life: What It Was Really Like",
    "The Aztec Empire: Rise, Power, and Fall",
    "Mythology of the Ancient Celts: A Deep Dive",
    "The Origins of the English Language",
    "Sumerian Civilization: The World's First Empire",
    "The Age of Exploration: Europe Discovers the World",
    "Medieval Castles: Architecture, Warfare, and Daily Life",
    "The Huns: The Barbarians Who Shook Rome",
    "Ancient Indian Civilizations: Indus Valley and Beyond",
    "The History of the Bible: How It Was Written and Compiled",
    # Psychology & Self-Help
    "The Psychology of Fear: Why We Love to Be Scared",
    "How to Build Unbreakable Habits: Science-Backed Tips",
    "Cognitive Biases: How Your Brain Tricks You Every Day",
    "The Science of Happiness: What Really Makes Us Content",
    "Why We Procrastinate and How to Stop",
    "The Power of Deep Work: How to Focus in a Distracted World",
    "Understanding Introversion: The Power of Quiet",
    "How Trauma Shapes Us: The Science of PTSD",
    "Emotional Intelligence: The Key to Better Relationships",
    "The Growth Mindset: Carol Dweck's Revolutionary Idea",
    # Business & Economics
    "The Best Business Books of All Time",
    "How Great Companies Are Built: Lessons from History",
    "The Psychology of Money: Why We Make Bad Financial Decisions",
    "Entrepreneurship Lessons from Ancient Rome",
    "How to Negotiate Like a Pro: Strategies That Work",
    "The Rise and Fall of Great Businesses",
    "Marketing Lessons from History's Greatest Empires",
    "The Power of Storytelling in Business",
    "Why Most Startups Fail and How to Avoid It",
    "Leadership Lessons from Ancient Military Commanders",
    # True Crime & Dark History
    "History's Most Notorious Criminals and What Drove Them",
    "The Rise of Organized Crime: From Ancient Rome to Today",
    "Jack the Ripper: The Mystery That Still Haunts Us",
    "History's Greatest Heists and the People Behind Them",
    "The Dark Side of Medieval Justice",
    "Serial Killers in History: Understanding the Criminal Mind",
    "Espionage in History: The World's Greatest Spies",
    "The Holocaust: Understanding History's Darkest Chapter",
    "War Crimes Through History and Their Aftermath",
    "The History of Prisons and Criminal Justice",
    # Biography & Historical Figures
    "Marcus Aurelius: Emperor, Philosopher, Stoic",
    "Genghis Khan: The Man Who Conquered the World",
    "Leonardo da Vinci: Genius of the Renaissance",
    "Queen Elizabeth I: England's Greatest Monarch",
    "Attila the Hun: The Scourge of God",
    "Nikola Tesla: The Forgotten Genius",
    "Marie Curie: Breaking Barriers in Science",
    "Abraham Lincoln: Leadership in Times of Crisis",
    "Winston Churchill: Courage Under Fire",
    "Nero: Rome's Most Controversial Emperor",
    # Science & Technology in History
    "The History of Mathematics: From Ancient Egypt to Today",
    "How Ancient Engineers Built Without Modern Technology",
    "The Scientific Revolution: How Europe Changed the World",
    "Astronomy in the Ancient World: How They Read the Stars",
    "The History of Medicine: From Herbs to Modern Science",
    "How the Printing Press Changed Everything",
    "Ancient Roman Engineering: Roads, Aqueducts, and More",
    "The Industrial Revolution: How It Transformed Society",
    "The Space Race: Cold War Battle Above the Atmosphere",
    "Archimedes: The Greatest Scientist of the Ancient World",
    # Additional History Topics
    "The Hundred Years War: England vs. France",
    "Samurai: The Warriors Who Defined Japan",
    "The Aztec Sacrifice Rituals: What Really Happened",
    "Pirates of the Caribbean: The Golden Age of Piracy",
    "The Cold War: 45 Years of Tension Without War",
    "Ancient Olympia: The Origins of the Olympic Games",
    "The Fall of Constantinople: End of an Empire",
    "Vlad the Impaler: The Real Dracula",
    "The Wild West: Myth vs. Reality",
    "How World War II Changed the World Forever",
    # Extra History & Culture
    "The Trojan War Revisited: What Homer Got Wrong",
    "Nero vs. Caligula: Rome's Two Most Infamous Emperors",
    "The Real History Behind the Trojan Horse",
    "How Julius Caesar Really Died: A Historical Investigation",
    "The Ancient Olympics: Sport, Politics, and Gods",
    "Mary Magdalene: Who Was She Really?",
    "The History of Torture: From Ancient Rome to Modern Times",
    "The Inquisition: Separating Myth from History",
    "Lost Cities of the Ancient World",
    "The Real Viking Age: Beyond the Horned Helmets",
    "The History of Money: From Barter to Bitcoin",
    "How Ancient Rome Built Its Roads (And Why They're Still Here)",
    "The Black Plague: How It Reshaped Medieval Europe",
    "Women Warriors of History: Forgotten Female Fighters",
    "The Ancient Art of Gladiatorial Combat",
    "How Genghis Khan United the Mongols",
    "The History of Piracy: Fact vs. Fiction",
    "Medieval Weapons and Warfare Explained",
    "The Real Story of Robin Hood",
    "How Alexander the Great Built His Empire",
    # Psychology & Behavior
    "The Psychology of Evil: Why Good People Do Bad Things",
    "Understanding Narcissism: Signs, Causes, and Recovery",
    "The Science of Persuasion: How to Win Any Argument",
    "How Habits Are Formed (And How to Break Bad Ones)",
    "The Dark Triad: Narcissism, Machiavellianism, and Psychopathy",
    "Why We Fear Death — and How to Make Peace With It",
    "The Psychology of Cults: How Leaders Control Followers",
    "How Childhood Trauma Shapes Adult Behavior",
    "The Science of Willpower: How to Strengthen Your Self-Control",
    "Body Language: What Your Gestures Really Say",
    # Business & Finance
    "How Warren Buffett Thinks About Investing",
    "The History of Capitalism: From Merchants to Multinationals",
    "What Successful People Do Differently Before 8 AM",
    "The Art of Negotiation: Lessons from the World's Best Dealmakers",
    "How to Build a Personal Brand in the Digital Age",
    # Science & Nature
    "The Big Bang: What Really Happened at the Start of the Universe",
    "How Evolution Works: Darwin's Theory Explained",
    "The History of Astronomy: From Stargazers to Space Travel",
    "Climate Change Throughout History: Natural vs. Human Causes",
    "The Human Brain: 10 Mind-Blowing Facts",
    "How Ancient Egyptians Performed Surgery",
    "The Discovery of DNA: Watson, Crick, and the Double Helix",
    # True Crime & Dark
    "The Most Notorious Prison Escapes in History",
    "The History of Assassination: From Ancient Rome to the Modern Era",
    "How Con Artists Fool Intelligent People",
    "The World's Most Unsolved Murders",
    "The Psychology of Serial Killers: What Science Says",
    # New batch - Mythology deep dives
    "Medusa: The Real Story Behind the Monster",
    "Hercules vs Heracles: Greek Hero Myths Explained",
    "The Underworld in Greek Mythology: Hades, Charon, and Tartarus",
    "Ares and Mars: The God of War in Greek and Roman Myth",
    "Athena: Goddess of Wisdom and War",
    "Poseidon: God of the Sea, Earthquakes, and Horses",
    "The Fates in Greek Mythology: Clotho, Lachesis, and Atropos",
    "Loki: The Most Misunderstood Norse God",
    "Freya: The Norse Goddess of Love and War",
    "The Nine Worlds of Norse Mythology",
    "Ragnarok: The Norse Apocalypse Explained",
    # Ancient history deep dives
    "The Battle of Thermopylae: 300 Spartans vs. the World",
    "The Library of Pergamon: The Rival to Alexandria",
    "Cleopatra's Egypt: Life in the Ptolemaic Kingdom",
    "The Roman Colosseum: How It Was Built and What Happened Inside",
    "Hadrian's Wall: Rome's Last Line of Defense",
    "The Sack of Rome: How the Eternal City Fell",
    "The Gladiator Games: Entertainment or Ritual?",
    "The Druids: Priests, Scholars, and Philosophers of Celtic Culture",
    "The Vestal Virgins: Rome's Most Powerful Women",
    "Pompeii: Life Before the Volcano",
    # Medieval & early modern
    "The Knights Templar: History, Mystery, and Myths",
    "The Black Death: How Europe Recovered from Its Greatest Disaster",
    "Joan of Arc: The Maid Who Changed History",
    "Genghis Khan's Successors: The Mongol Empire After Its Founder",
    "The Silk Road's Greatest Cities: Samarkand, Kashgar, and Beyond",
    "The Borgias: History's Most Dangerous Family",
    # Science & discovery
    "Isaac Newton: The Man Who Unlocked the Universe",
    "Galileo: The Scientist Who Defied the Church",
    "Charles Darwin: How He Changed Our Understanding of Life",
    "The Race to Decode DNA: The Story Behind the Double Helix",
    "Marie Curie: Two Nobel Prizes and an Extraordinary Life",
    # True crime & dark history
    "H.H. Holmes: America's First Serial Killer",
    "The Zodiac Killer: America's Most Mysterious Crime Spree",
    "Al Capone: The Rise and Fall of Chicago's Most Dangerous Gangster",
    "The Nuremberg Trials: Justice After the Holocaust",
    "Operation Paperclip: How the US Recruited Nazi Scientists",
    # Philosophy & Stoicism
    "What Is Stoicism? The Ancient Philosophy That Runs the World",
    "Marcus Aurelius' Meditations: The Most Powerful Self-Help Book Ever Written",
    "Seneca on Time: How to Use Your Hours Like a Philosopher",
    "Epictetus: The Slave Who Became a Philosopher",
    "Plato's Republic: What It Says and Why It Still Matters",
    "Nietzsche's Thus Spoke Zarathustra: A Beginner's Guide",
    "The Allegory of the Cave: Plato's Greatest Thought Experiment",
    "Aristotle's Nicomachean Ethics: The Philosophy of the Good Life",
    "Kant's Categorical Imperative: The Ultimate Moral Rule",
    "The Socratic Method: How to Think Clearly and Argue Well",
    "Existentialism Explained: Sartre, Camus, and the Meaning of Life",
    "Stoic Exercises for Daily Life: What the Ancients Actually Practiced",
    "How Stoicism Differs from Buddhism (And What They Share)",
    "The Pre-Socratics: Philosophy Before Plato",
    "David Hume and the Problem of Induction",
    "René Descartes: 'I Think, Therefore I Am'",
    "The Stoic View of Anger: How Ancient Romans Controlled Their Temper",
    "Zeno of Citium: The Founder of Stoicism",
    # Extra true crime
    "Ted Bundy: The Psychology Behind America's Most Charming Killer",
    "The Night Stalker: Richard Ramirez and the Terror of 1985",
    "Jack the Ripper: The Prime Suspects and the Unsolved Mystery",
    "The Unabomber: Ted Kaczynski and the War Against Technology",
    "Bonnie and Clyde: The Real Story Behind the Legend",
    # Extra biography
    "Sun Tzu: The Art of War and the Life Behind It",
    "Catherine the Great: Russia's Most Powerful Empress",
    "Frederick the Great: Prussia's Philosopher King",
    "Voltaire: The Writer Who Changed Europe",
    "Machiavelli: The Man Behind 'The Prince'",
]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def title_to_slug(title: str) -> str:
    """Convert a title to a URL-friendly slug (max 80 chars)."""
    slug = title.lower()
    slug = re.sub(r"[^a-z0-9\s-]", "", slug)        # remove non-alphanumeric
    slug = re.sub(r"[\s]+", "-", slug.strip())       # spaces to hyphens
    slug = re.sub(r"-{2,}", "-", slug)               # collapse consecutive hyphens
    return slug[:80].rstrip("-")


def infer_categories(title: str) -> list[str]:
    """Assign broad categories based on keywords in the title."""
    title_lower = title.lower()
    cats = []
    if any(k in title_lower for k in ["myth", "god", "gods", "legend", "norse", "greek myth", "egypt", "celtic", "roman god"]):
        cats.append("mythology")
    if any(k in title_lower for k in ["history", "empire", "war", "battle", "ancient", "medieval", "civiliz", "crusade",
                                       "roman", "greek", "viking", "pharaoh", "dynasty", "revolution", "renaissance",
                                       "napoleon", "caesar", "alexander", "hannibal", "aztec", "mongol", "ottoman",
                                       "crusad", "armada", "persian", "spartan", "sparta", "byzantine", "charlemagne",
                                       "peloponnesian", "trojan", "babylon", "mesopotamia", "phoenician", "carthage",
                                       "minoan", "silk road", "exploration", "castle", "knight", "samurai", "pirate",
                                       "huns", "attila", "genghis", "cold war", "world war", "industrial"]):
        cats.append("history")
    if any(k in title_lower for k in ["language", "learn", "dutch", "frisian", "latin", "german", "linguist",
                                       "bilingual", "speak", "french", "english"]):
        cats.append("language-learning")
    if any(k in title_lower for k in ["book", "books", "read", "reading", "library"]):
        cats.append("books")
    if any(k in title_lower for k in ["philosophy", "stoic", "stoicism", "socrates", "plato", "aristotle",
                                       "marcus aurelius", "epicurean"]):
        cats.append("philosophy")
    if any(k in title_lower for k in ["psychology", "cognitive", "bias", "happiness", "trauma", "ptsd",
                                       "emotional", "introvert", "habit", "mindset", "procrastinat"]):
        cats.append("psychology")
    if any(k in title_lower for k in ["business", "startup", "entrepreneurship", "marketing", "negotiat",
                                       "leadership", "money", "financial", "economics"]):
        cats.append("business")
    if any(k in title_lower for k in ["crime", "criminal", "murder", "killer", "espionage", "spy", "heist",
                                       "dracula", "ripper", "holocaust", "dark", "prison"]):
        cats.append("true-crime")
    if any(k in title_lower for k in ["self-help", "habit", "focus", "productivity", "deep work",
                                       "growth mindset", "happiness", "procrastinat"]):
        cats.append("self-help")
    if any(k in title_lower for k in ["science", "mathematics", "math", "engineer", "astronomy",
                                       "medicine", "printing press", "industrial revolution", "space",
                                       "archimedes", "tesla", "curie", "da vinci", "newton"]):
        cats.append("science")
    # Default fallback
    if not cats:
        cats.append("history")
    return list(dict.fromkeys(cats))  # deduplicate while preserving order


def load_used_topics() -> list[str]:
    if TOPICS_USED_JSON.exists():
        return json.loads(TOPICS_USED_JSON.read_text(encoding="utf-8"))
    return []


def save_used_topics(used: list[str]) -> None:
    TOPICS_USED_JSON.write_text(json.dumps(used, indent=2), encoding="utf-8")


def load_blog_posts() -> dict:
    if BLOG_JSON.exists():
        return json.loads(BLOG_JSON.read_text(encoding="utf-8"))
    return {"posts": []}


def save_blog_posts(data: dict) -> None:
    BLOG_JSON.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")


def pick_next_topic(used_slugs: list[str]) -> str | None:
    """Return the first topic whose slug has not been used yet."""
    for topic in TOPICS:
        if title_to_slug(topic) not in used_slugs:
            return topic
    return None


# ---------------------------------------------------------------------------
# Core generation
# ---------------------------------------------------------------------------

def generate_post(title: str, model: str, api_key: str) -> dict:
    """Call Claude to generate an HTML blog post and return a post dict."""
    client = anthropic.Anthropic(api_key=api_key)

    system = (
        "You are a knowledgeable writer for Skriuwer.com, an affiliate book discovery site. "
        "Write engaging, factual, SEO-optimized blog posts about history, mythology, and language learning. "
        "Write in English. "
        "Return ONLY the HTML content — no title tag, no markdown fences, no preamble. "
        "Start directly with a <p> or <h2> tag."
    )

    user = (
        f'Write a blog post titled: "{title}". '
        "It should be 800-1000 words, well-structured with <h2> section headings and <p> paragraphs. "
        "Use <strong> for emphasis on key terms. "
        "Naturally mention books that readers might enjoy (reference specific real book titles where relevant). "
        "Include the main keyword naturally 3-5 times throughout. "
        "End with a conclusion section and a call-to-action mentioning that readers can find related books at Skriuwer.com."
    )

    print(f"  Calling Claude ({model})...", flush=True)
    message = client.messages.create(
        model=model,
        max_tokens=2048,
        messages=[{"role": "user", "content": user}],
        system=system,
    )

    content_html = message.content[0].text.strip()

    # Validate content - must start with an HTML tag, not garbage
    if not content_html.startswith("<"):
        # Try to strip any markdown fence or preamble
        lines = content_html.split("\n")
        html_lines = [l for l in lines if l.strip().startswith("<")]
        if html_lines:
            content_html = "\n".join(lines[lines.index(html_lines[0]):]).strip()
        else:
            raise ValueError(f"Generated content doesn't look like HTML: {content_html[:100]}")

    # Validate slug is clean (no "false", no weird patterns)
    slug = title_to_slug(title)
    if len(slug) < 5 or "false" in slug.lower():
        raise ValueError(f"Bad slug generated from title '{title}': {slug}")

    today = date.today().isoformat()
    categories = infer_categories(title)

    return {
        "slug": slug,
        "title": title,
        "date": today,
        "categories": categories,
        "content": content_html,
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description="Generate SEO blog posts for skriuwer.com")
    parser.add_argument("--topic", type=str, default=None, help="Custom topic title to generate")
    parser.add_argument("--count", type=int, default=1, help="Number of posts to generate (default: 1)")
    parser.add_argument("--cheap", action="store_true", help="Use claude-3-5-haiku instead of claude-opus-4-5")
    args = parser.parse_args()

    # API key — check env first, then fall back to scripts/secrets.env
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        secrets_file = Path(__file__).parent / "secrets.env"
        if secrets_file.exists():
            for line in secrets_file.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if line.startswith("ANTHROPIC_API_KEY=") and not line.startswith("#"):
                    val = line.split("=", 1)[1].strip()
                    if val:
                        api_key = val
                        break
    if not api_key:
        print("ERROR: ANTHROPIC_API_KEY not set.", file=sys.stderr)
        print("  Option 1: Set as env var: set ANTHROPIC_API_KEY=sk-ant-...", file=sys.stderr)
        print("  Option 2: Add to scripts/secrets.env", file=sys.stderr)
        print("  Option 3: Run scripts/setup_keys.ps1", file=sys.stderr)
        sys.exit(1)

    model = MODEL_CHEAP if args.cheap else MODEL_DEFAULT
    print(f"Model: {model}")

    used_slugs = load_used_topics()
    blog_data = load_blog_posts()

    generated = 0
    for i in range(args.count):
        # Pick topic
        if args.topic:
            title = args.topic
        else:
            title = pick_next_topic(used_slugs)
            if title is None:
                print("All predefined topics have been used. Pass --topic to add a custom one.")
                break

        slug = title_to_slug(title)

        # Skip if slug already exists in blog-posts.json
        existing_slugs = {p["slug"] for p in blog_data.get("posts", [])}
        if slug in existing_slugs:
            print(f"  Skipping (already exists): {title}")
            if slug not in used_slugs:
                used_slugs.append(slug)
            continue

        print(f"\n[{i + 1}/{args.count}] Generating: {title}")

        try:
            post = generate_post(title, model, api_key)
        except Exception as exc:
            print(f"  ERROR generating post: {exc}", file=sys.stderr)
            break

        # Prepend so newest appears first
        blog_data.setdefault("posts", []).insert(0, post)
        save_blog_posts(blog_data)

        # Record as used
        if slug not in used_slugs:
            used_slugs.append(slug)
        save_used_topics(used_slugs)

        print(f"  Generated: {title} -> /blog/{slug}")
        generated += 1

    print(f"\nDone. {generated} post(s) added to data/blog-posts.json.")


if __name__ == "__main__":
    main()
