/**
 * seed_books_pass3.mjs — Hard-coded entries for high-traffic books
 * that the Google Books API consistently fails to return.
 * ISBNs sourced from publisher records and Open Library.
 *
 * Usage: node scripts/seed_books_pass3.mjs --save
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BOOKS_JSON   = join(__dirname, "../data/books.json");
const DELETED_JSON = join(__dirname, "../data/deleted_slugs.json");
const SAVE = process.argv.includes("--save");

// Each entry: { asin (ISBN-10), title, author, description, categories[], reviewCount, starRating, pages, publishedDate }
const BOOKS = [
  {
    asin: "0062316095",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    description: "<p>One hundred thousand years ago, at least six human species inhabited the earth. Today there is just one. Us. How did our species succeed in the battle for dominance? Why did our foraging ancestors come together to create cities and kingdoms? How did we come to believe in gods, nations and human rights; to trust money, books and laws?</p><p>In Sapiens, Yuval Noah Harari spans the whole of human history, from the very first humans to walk the earth to the radical and sometimes devastating breakthroughs of the Cognitive, Agricultural and Scientific Revolutions. Drawing on insights from biology, anthropology, paleontology and economics, he explores how the currents of history have shaped our human societies, the animals and plants around us, and even our personalities.</p>",
    categories: ["history", "science"],
    reviewCount: 110000, starRating: 4.5, pages: 464, publishedDate: "2015",
  },
  {
    asin: "0735211299",
    title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    author: "James Clear",
    description: "<p>No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.</p><p>If you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals, you fall to the level of your systems. Here, you'll get a proven system that can take you to new heights.</p>",
    categories: ["self-help"],
    reviewCount: 155000, starRating: 4.8, pages: 320, publishedDate: "2018",
  },
  {
    asin: "0393317552",
    title: "Guns, Germs, and Steel: The Fates of Human Societies",
    author: "Jared Diamond",
    description: "<p>Why did Eurasians conquer, displace, or decimate Native Americans, Australians, and Africans, rather than the reverse? Jared Diamond argues that the gaps in power and technology between human societies originate in environmental differences, which are amplified by feedback loops.</p><p>This Pulitzer Prize-winning book is both a history of the world in under 500 pages and an attempt to answer one of the most pressing questions about power and inequality in the world today: why are some societies more powerful than others?</p>",
    categories: ["history", "science"],
    reviewCount: 19000, starRating: 4.6, pages: 528, publishedDate: "1999",
  },
  {
    asin: "0553380168",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    description: "<p>Was there a beginning of time? Could time run backwards? Is the universe infinite or does it have boundaries? These are just three of the questions considered in an internationally acclaimed masterpiece by one of the world's greatest thinkers. It begins by reviewing the great theories of the cosmos from Newton to Einstein, before delving into the secrets which still lie at the heart of space and time.</p><p>To this edition, Hawking has added a new chapter on wormholes and time travel and updated the original text throughout. This is an enduring book about the universe — about how it began, how it will end and what holds it together in between.</p>",
    categories: ["science"],
    reviewCount: 27000, starRating: 4.5, pages: 212, publishedDate: "1998",
  },
  {
    asin: "0743224540",
    title: "Band of Brothers: E Company, 506th Regiment, 101st Airborne from Normandy to Hitler's Eagle's Nest",
    author: "Stephen E. Ambrose",
    description: "<p>In the summer of 1942, 506 young men from across America came together in the hills of Georgia to form E Company, 506th Parachute Infantry Regiment, 101st Airborne Division. Together they fought their way through Normandy, Operation Market Garden, the Battle of the Bulge, and the capture of Berchtesgaden, Germany, suffering devastating casualties along the way.</p><p>Based on extensive research and hundreds of interviews with survivors, this is the story of the men of Easy Company — one of the most decorated units in the United States Army — told in their own words with all the honesty, simplicity, and emotional power of men who were there.</p>",
    categories: ["history", "dark-history", "biography"],
    reviewCount: 24000, starRating: 4.7, pages: 333, publishedDate: "2001",
  },
  {
    asin: "0743269519",
    title: "The 7 Habits of Highly Effective People: Powerful Lessons in Personal Change",
    author: "Stephen R. Covey",
    description: "<p>One of the most inspiring and impactful books ever written, The 7 Habits of Highly Effective People has captivated readers for 25 years. It has transformed the lives of presidents and CEOs, educators and parents — in short, millions of people of all ages and occupations.</p><p>Stephen R. Covey's 7 Habits are not a set of separate or piecemeal psych-up formulas. In harmony with the natural laws of growth, they provide an incremental, sequential, highly integrated approach to the development of personal and interpersonal effectiveness.</p>",
    categories: ["self-help"],
    reviewCount: 58000, starRating: 4.7, pages: 381, publishedDate: "2004",
  },
  {
    asin: "1250183863",
    title: "Extreme Ownership: How U.S. Navy SEALs Lead and Win",
    author: "Jocko Willink, Leif Babin",
    description: "<p>Sent to the most dangerous battlefield in Iraq, Jocko Willink and Leif Babin's SEAL task unit faced a daunting enemy, pre-insurgency Ramadi, and the challenge of uniting feuding tribal elements. Through those trials, they developed the principle of Extreme Ownership — the mindset and leadership principles that enable SEAL units to accomplish the most difficult missions in combat.</p><p>Now, they teach those same leadership principles to America's top organizations. With chapters alternating between gripping combat narratives and the application of core leadership concepts, Extreme Ownership demonstrates how the SEAL leadership doctrine—if implemented in business, teams, and families—will enable anyone to succeed and win.</p>",
    categories: ["self-help"],
    reviewCount: 55000, starRating: 4.7, pages: 320, publishedDate: "2017",
  },
  {
    asin: "1455586692",
    title: "Deep Work: Rules for Focused Success in a Distracted World",
    author: "Cal Newport",
    description: "<p>Deep work is the ability to focus without distraction on a cognitively demanding task. It's a skill that allows you to quickly master complicated information and produce better results in less time. In this book, Cal Newport flips the narrative on impact in a connected age. Instead of arguing distraction is bad, he celebrates the power of its opposite — deep work — and then presents a rigorous training regimen for cultivating this skill in your life.</p>",
    categories: ["self-help"],
    reviewCount: 48000, starRating: 4.6, pages: 304, publishedDate: "2016",
  },
  {
    asin: "0735211736",
    title: "The Daily Stoic: 366 Meditations on Wisdom, Perseverance, and the Art of Living",
    author: "Ryan Holiday, Stephen Hanselman",
    description: "<p>From the team that brought you The Obstacle Is the Way and Ego Is the Enemy, a beautiful daily devotional of Stoic meditations—an invitation to reflect on what we control, what we don't, and what really matters.</p><p>Throughout the centuries, Stoicism has proven to be one of the most enduring and active philosophies for people seeking to lead active, purposeful, meaningful lives. With 366 daily mediations drawn from the greatest Stoic thinkers — Marcus Aurelius, Epictetus, and Seneca — this book offers a lesson for every day of the year.</p>",
    categories: ["philosophy", "self-help"],
    reviewCount: 65000, starRating: 4.7, pages: 432, publishedDate: "2016",
  },
  {
    asin: "0807014273",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    description: "<p>Psychiatrist Viktor Frankl's memoir has riveted generations of readers with its descriptions of life in Nazi death camps and its lessons for spiritual survival. Based on his own experience and the stories of his patients, Frankl argues that we cannot avoid suffering but we can choose how to cope with it, find meaning in it, and move forward with renewed purpose. At the core of his theory — known as logotherapy — is the belief that man's primary motivational force is his search for meaning.</p>",
    categories: ["religion", "psychology", "self-help"],
    reviewCount: 95000, starRating: 4.7, pages: 165, publishedDate: "2006",
  },
  {
    asin: "0399590501",
    title: "Educated: A Memoir",
    author: "Tara Westover",
    description: "<p>Tara Westover was seventeen the first time she set foot in a classroom. Born to survivalists in the mountains of Idaho, she prepared for the end of the world by stockpiling food and dreaming of one day becoming a midwife. Instead, she got a PhD from Cambridge University. This is the story of a young woman who, through extraordinary determination and intellectual curiosity, transcended the constraints of the world she was born into.</p>",
    categories: ["biography"],
    reviewCount: 195000, starRating: 4.7, pages: 352, publishedDate: "2018",
  },
  {
    asin: "1400033438",
    title: "Wild: From Lost to Found on the Pacific Crest Trail",
    author: "Cheryl Strayed",
    description: "<p>At twenty-two, Cheryl Strayed thought she had lost everything. In the wake of her mother's death, her family scattered and her own marriage was soon destroyed. Four years later, with nothing more to lose, she made the most impulsive decision of her life: to hike the Pacific Crest Trail from the Mojave Desert through California and Oregon to Washington State—and to do it alone. The journey she took changed her life forever.</p>",
    categories: ["biography"],
    reviewCount: 110000, starRating: 4.5, pages: 336, publishedDate: "2013",
  },
  {
    asin: "0062435655",
    title: "I'll Be Gone in the Dark: One Woman's Obsessive Search for the Golden State Killer",
    author: "Michelle McNamara",
    description: "<p>From true crime journalist Michelle McNamara, who coined the term Golden State Killer, a haunting portrait of the serial criminal who committed fifty home invasion rapes and twelve murders across California in the 1970s and 1980s. Coupled with McNamara's account of her own investigation, I'll Be Gone in the Dark is a brilliant true crime book that reads like a thriller.</p>",
    categories: ["true-crime"],
    reviewCount: 65000, starRating: 4.7, pages: 368, publishedDate: "2018",
  },
  {
    asin: "1501138979",
    title: "Mindhunter: Inside the FBI's Elite Serial Crime Unit",
    author: "John E. Douglas, Mark Olshaker",
    description: "<p>In Mindhunter, John Douglas and Mark Olshaker take us behind the scenes of some of the most harrowing and notorious crimes of our time. Douglas, the FBI's most celebrated criminal profiler and the inspiration for the Netflix series, shows how he and his colleagues at Quantico's Behavioral Science Unit opened a window into the minds of killers, rapists, and stalkers to understand their fantasies and behaviors — and to stop them.</p>",
    categories: ["true-crime"],
    reviewCount: 38000, starRating: 4.7, pages: 370, publishedDate: "2017",
  },
  {
    asin: "0393322807",
    title: "Helter Skelter: The True Story of the Manson Murders",
    author: "Vincent Bugliosi, Curt Gentry",
    description: "<p>The prosecution of Charles Manson and his followers for the murders of Sharon Tate and six other people was a defining event in American history. Vincent Bugliosi, who prosecuted Manson, delivers a chilling, complete account of the murders and the investigation, apprehension, and trial of the guilty parties — from the first terrifying night of murder through the five-year legal process that followed.</p>",
    categories: ["true-crime", "dark-history"],
    reviewCount: 25000, starRating: 4.6, pages: 689, publishedDate: "2001",
  },
  {
    asin: "0393609097",
    title: "Norse Mythology",
    author: "Neil Gaiman",
    description: "<p>Neil Gaiman has long been inspired by ancient mythology in creating the fantastical realms of his fiction. Now he turns his attention back to the source, presenting a bravura rendition of the great Northern tales. In Norse Mythology, Gaiman fashions these tales into a novelistic whole, with a first-rate narrator's ear for storytelling.</p><p>From the Norse myths Gaiman most wants to preserve are the ones that unfold the great Norse mythology cycle of creation through Ragnarok, the final battle of the gods. His versions are fresh, insightful, and wonderfully readable.</p>",
    categories: ["mythology"],
    reviewCount: 38000, starRating: 4.7, pages: 299, publishedDate: "2017",
  },
  {
    asin: "0316341517",
    title: "Mythology: Timeless Tales of Gods and Heroes",
    author: "Edith Hamilton",
    description: "<p>First published in 1942, Edith Hamilton's Mythology has introduced generations of readers to the gods and heroes of ancient Greece, Rome, and Norse mythology. Hamilton brings a poet's sense of clarity to writing about Greek and Roman myths, from the twelve Olympians to the heroes of the Trojan War, and the great romances of antiquity.</p><p>This book covers Greek mythology from the creation of the world through the Trojan War and its aftermath, as well as Roman mythology and Norse mythology including the Norse pantheon and the story of Ragnarök.</p>",
    categories: ["mythology"],
    reviewCount: 21000, starRating: 4.6, pages: 352, publishedDate: "1998",
  },
  {
    asin: "1577315936",
    title: "The Hero with a Thousand Faces",
    author: "Joseph Campbell",
    description: "<p>Since its release in 1949, The Hero with a Thousand Faces has influenced millions of readers by combining the insights of modern psychology with Joseph Campbell's revolutionary understanding of world mythology. In this book, Campbell outlines the structure of the monomyth — the universal story of the hero's journey — and maps this onto the great myths of world civilization.</p><p>A fundamental text in the fields of mythology and comparative religion, The Hero with a Thousand Faces has also profoundly influenced creative artists — including filmmaker George Lucas, who acknowledged Campbell's work as instrumental in the creation of Star Wars.</p>",
    categories: ["mythology", "philosophy"],
    reviewCount: 10500, starRating: 4.5, pages: 418, publishedDate: "2008",
  },
  {
    asin: "0140275363",
    title: "The Iliad",
    author: "Homer, translated by Robert Fagles",
    description: "<p>Dating to the ninth century BCE, Homer's timeless poem still vividly captures the horror and heroism of men and gods wrestling with one another's fates on the fields of Troy. Fagles' translation of The Iliad is widely considered the finest modern translation — muscular, taut, and emotionally intense.</p><p>The Iliad is the story of the Trojan War's climactic battles, the fatal wrath of Achilles, and the profound cost of glory and honor. It is one of the founding texts of Western civilization and among the most enduring works of literature ever written.</p>",
    categories: ["mythology", "history"],
    reviewCount: 14000, starRating: 4.5, pages: 704, publishedDate: "1998",
  },
  {
    asin: "0912986212",
    title: "The Creature from Jekyll Island: A Second Look at the Federal Reserve",
    author: "G. Edward Griffin",
    description: "<p>Where does money come from? Where does it go? Who makes it? The money magicians' secrets are unveiled. We get a close look at their mirror and smoke machines, their pulleys, cogs, and wheels that create the grand illusion called money. A dry and boring subject? Just wait! You'll be hooked in five minutes.</p><p>This is the story of the most blatant scam of all history. It's all here: the cause of wars, the cause of economic catastrophe, the real story of the Federal Reserve — and what we can do about it.</p>",
    categories: ["conspiracy", "history"],
    reviewCount: 16000, starRating: 4.7, pages: 624, publishedDate: "2010",
  },
  {
    asin: "0929385225",
    title: "Behold a Pale Horse",
    author: "Milton William Cooper",
    description: "<p>Bill Cooper, former United States Naval Intelligence Briefing Team member, reveals information that is kept in Top Secret government files. Since this book was published, many of the predictions that were made in it have come true. Cooper exposes secret government plans and the alleged plans of a secret world government to control the population.</p>",
    categories: ["conspiracy"],
    reviewCount: 13000, starRating: 4.5, pages: 500, publishedDate: "1991",
  },
  {
    asin: "0060976519",
    title: "The Language Instinct: How the Mind Creates Language",
    author: "Steven Pinker",
    description: "<p>Steven Pinker's brilliant, witty, and provocative book explains everything you always wanted to know about language: how it works, how children learn it, how it changes, how the brain computes it, and how it evolved. Writing with deft use of examples of humor and wordplay, Pinker weaves our vast knowledge of language into a compelling argument that language is a biological adaptation to communicate information.</p>",
    categories: ["language-learning", "science"],
    reviewCount: 5000, starRating: 4.5, pages: 528, publishedDate: "2007",
  },
  {
    asin: "0385348118",
    title: "Fluent Forever: How to Learn Any Language Fast and Never Forget It",
    author: "Gabriel Wyner",
    description: "<p>At thirty years old, Gabriel Wyner speaks six languages with near-native fluency. He didn't accomplish this by studying overseas or constantly reading grammar books. He did it by discovering and perfecting a new approach to learning languages — hacking the way memory works.</p><p>Wyner argues that if we stop translating and instead start thinking in new languages, we'll learn faster, remember better, and reach fluency more quickly. This book presents a unique program tailored to the reader's individual needs, learning style, and target language.</p>",
    categories: ["language-learning"],
    reviewCount: 9000, starRating: 4.3, pages: 336, publishedDate: "2014",
  },
  {
    asin: "0679733736",
    title: "The Myth of Sisyphus",
    author: "Albert Camus",
    description: "<p>The Myth of Sisyphus is a 1942 philosophical essay by Albert Camus. The work offers a sustained, searching examination of a question Camus considered central to living in the modern age: does the absurdity of human existence — the conflict between our desire for meaning and the universe's silence — make life worth living?</p><p>Camus argues in favor of life in spite of its absurdity. Like Sisyphus condemned to roll his boulder up the hill for eternity, we too must imagine ourselves happy in our struggle. This short, brilliant essay is a cornerstone of existentialist philosophy.</p>",
    categories: ["philosophy"],
    reviewCount: 12000, starRating: 4.4, pages: 212, publishedDate: "2018",
  },
  {
    asin: "0316346624",
    title: "Educated: A Memoir",
    author: "Tara Westover",
    description: "<p>An unforgettable coming-of-age story and a remarkable memoir about the struggle for self-invention. Tara Westover grew up preparing for the end of the world. Instead, she found her way to Cambridge, and, ultimately, to the writing of this book. It reads like a thriller.</p>",
    categories: ["biography"],
    reviewCount: 195000, starRating: 4.7, pages: 352, publishedDate: "2018",
  },
];

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[''`"]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function main() {
  const booksData    = JSON.parse(readFileSync(BOOKS_JSON, "utf-8"));
  const deletedSlugs = new Set(JSON.parse(readFileSync(DELETED_JSON, "utf-8")));
  const existingSlugs = new Set(booksData.books.map((b) => b.slug));
  const existingAsins = new Set(booksData.books.map((b) => b.asin).filter(Boolean));

  console.log(`\n📚 Skriuwer Book Seeder — Pass 3 (hard-coded ISBNs)`);
  console.log(`   Existing: ${booksData.books.length}  To try: ${BOOKS.length}  Mode: ${SAVE ? "SAVE" : "DRY RUN"}\n`);

  let added = 0;
  for (const entry of BOOKS) {
    const { asin } = entry;

    if (existingAsins.has(asin)) { console.log(`  ✗ dup    ${asin}  ${entry.title.slice(0, 45)}`); continue; }

    const slug = slugify(`${entry.title} ${entry.author.split(/[,\s]+/).pop()}`);

    if (deletedSlugs.has(slug) || existingSlugs.has(slug)) {
      console.log(`  ✗ exists ${asin}  ${entry.title.slice(0, 45)}`); continue;
    }

    const book = {
      slug,
      asin,
      title: entry.title,
      description: entry.description,
      author: entry.author,
      coverImage:         `https://covers.openlibrary.org/b/isbn/${asin}-L.jpg`,
      coverImageFallback: `https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SX500_.jpg`,
      categories: entry.categories,
      tags: ["In English"],
      language: "en",
      pages: entry.pages || null,
      price: null,
      currency: "USD",
      reviewCount: entry.reviewCount,
      starRating: entry.starRating,
      marketplaces: {
        "amazon.com":   `https://www.amazon.com/dp/${asin}`,
        "amazon.de":    `https://www.amazon.de/dp/${asin}`,
        "amazon.co.uk": `https://www.amazon.co.uk/dp/${asin}`,
        "amazon.nl":    `https://www.amazon.nl/dp/${asin}`,
        "amazon.fr":    `https://www.amazon.fr/dp/${asin}`,
      },
      isOwnBook: false,
      hookText: null,
      publishedDate: entry.publishedDate || null,
    };

    booksData.books.push(book);
    existingSlugs.add(slug);
    existingAsins.add(asin);
    added++;
    console.log(`  ✓        ${asin}  ${entry.title.slice(0, 50)}`);
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  Added: ${added}  Total: ${booksData.books.length}`);

  if (!SAVE) { console.log("\nDry run — add --save to write.\n"); return; }

  writeFileSync(BOOKS_JSON, JSON.stringify(booksData, null, 2), "utf-8");
  console.log(`\n✅ Saved ${added} books to data/books.json\n`);
}

main();
