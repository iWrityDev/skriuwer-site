/**
 * add_blog_posts_2.mjs — Adds 10 more targeted long-tail SEO blog posts.
 * Focuses on third-party bestsellers with high search intent: reviews, comparisons.
 * Usage: node scripts/add_blog_posts_2.mjs --save
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_JSON = join(__dirname, "../data/blog-posts.json");
const SAVE = process.argv.includes("--save");
const TODAY = "2026-04-18";

const NEW_POSTS = [
  {
    slug: "mans-search-for-meaning-review-frankl",
    title: "Man's Search for Meaning Review: Viktor Frankl's Book 75 Years Later",
    date: TODAY,
    oldUrl: "",
    categories: ["psychology", "books"],
    content: `<h2>Man's Search for Meaning: Still the Most Important Book You'll Read</h2>

<p>WRITTEN IN NINE DAYS in 1945 by a psychiatrist who survived four Nazi concentration camps, Viktor Frankl's <em>Man's Search for Meaning</em> is not a comfortable book. It is not meant to be. It is, however, the most important book most people have never truly read — because reading it and absorbing it are two different things.</p>

<p>The book has two parts. The first is a memoir of Frankl's experience in Auschwitz and three other camps. The second introduces logotherapy, his theory that humans can survive almost anything if they believe their suffering has meaning.</p>

<h2>What Makes This Book Extraordinary</h2>

<p>Frankl refuses to write as a victim. He writes as an observer — clinical, detached, almost scientific. He describes watching men give away their last piece of bread to strangers, and watching others step over corpses to get to the bread first. He asks: what determines which kind of person you become when everything is stripped away?</p>

<p>His answer: the last human freedom is the freedom to choose your attitude toward your circumstances. No one can take that from you. This isn't motivational-poster philosophy. He developed it while watching people die.</p>

<h2>Does It Hold Up?</h2>

<p>Some psychologists have critiqued logotherapy as oversimplified. Some historians have noted that Frankl's account of his own experiences is occasionally at odds with documented records. These are fair points. They don't change the power of the book's central question: if your life were stripped to almost nothing, what would remain?</p>

<p>With over 95,000 Amazon reviews averaging 4.7 stars, it remains one of the most-read books in psychology and philosophy. That's 75 years of readers saying the same thing: this book matters.</p>

<h2>Who Should Read It</h2>

<p>Anyone going through a difficult period. Anyone who thinks they might be "going through the motions" without a clear sense of why. Anyone interested in psychology, philosophy, or World War II history. And honestly, anyone who hasn't read it yet.</p>

<p>Find Man's Search for Meaning and related books in psychology and history at <strong>Skriuwer.com</strong> — ranked by reader reviews.</p>`,
  },
  {
    slug: "educated-tara-westover-review",
    title: "Educated by Tara Westover Review: Memoir, Survival, and Self-Creation",
    date: TODAY,
    oldUrl: "",
    categories: ["biography", "books"],
    content: `<h2>Educated: The Memoir That Proves Education Is More Than Schooling</h2>

<p>TARA WESTOVER grew up in a survivalist family in rural Idaho. She didn't have a birth certificate until she was nine. She didn't set foot in a school until she was seventeen. By 32, she had a PhD from Cambridge. <em>Educated</em> is the story of how that happened — and what it cost her.</p>

<p>Published in 2018, <em>Educated</em> has over 195,000 Amazon reviews with an average of 4.7 stars. It spent 131 weeks on the New York Times bestseller list. None of that explains what it actually feels like to read it.</p>

<h2>What the Book Is Really About</h2>

<p>On the surface, <em>Educated</em> is about a girl who taught herself enough to pass the ACT and get into Brigham Young University. Below the surface, it's about the violence of ideology — about what happens when the stories we're told about who we are conflict with who we're becoming.</p>

<p>Westover's family believed the government was corrupt, hospitals were dangerous, and the end of the world was coming. Her father was charismatic, brilliant, and dangerous. Her brother was abusive. The rest of the family alternated between protecting and enabling both of them.</p>

<p>What makes the book extraordinary is Westover's refusal to write a simple hero-villain story. She loves her family even as she describes the harm they caused. She is uncertain about her own memories. She acknowledges that the truth is complicated in ways that don't resolve neatly.</p>

<h2>The Writing</h2>

<p>Westover is a genuinely gifted writer. The book reads quickly but lands heavily. Her descriptions of the Idaho mountains have a beauty that makes the darkness more stark. Her portrayal of the moment she first realized she could choose a different life is one of the most quietly powerful scenes in recent memoir.</p>

<h2>Is It Accurate?</h2>

<p>Some family members dispute aspects of her account. Westover addresses this in the author's note: memory is imperfect, especially traumatic memory, and she presents her experience as she understood it. This is standard for memoir. Read it as one person's account of what shaped her, not as a court document.</p>

<p>Find Educated and other top-rated biographies at <strong>Skriuwer.com</strong> — curated by reader reviews.</p>`,
  },
  {
    slug: "circe-book-review-madeline-miller",
    title: "Circe Review: Madeline Miller's Mythology Novel Earns Its Hype",
    date: TODAY,
    oldUrl: "",
    categories: ["mythology", "books"],
    content: `<h2>Circe: When Mythology Finally Gets a Protagonist Worth Following</h2>

<p>IF YOU READ Greek mythology and ever wondered what happened to all the women — the ones mentioned in passing, the ones blamed for things, the ones who were beautiful and then cursed — Madeline Miller's <em>Circe</em> is your answer.</p>

<p>Miller, who also wrote <em>The Song of Achilles</em>, spent years studying classics at Brown and Yale. It shows. <em>Circe</em> is not a casual retelling. It's a deep excavation of a character who appears briefly in the Odyssey and has been reduced to "the witch who turned men into pigs" ever since.</p>

<h2>The Story</h2>

<p>Circe is the daughter of Helios, the sun god. Born without divine beauty or power, she is marginalized in the immortal world. She discovers she has the ability to work with herbs and potions — magic that the Olympians find beneath them. She is eventually exiled to the island of Aiaia, where she spends thousands of years, occasionally meeting the heroes, monsters, and figures of Greek mythology who pass through.</p>

<p>That summary makes it sound like a series of mythology checkboxes. It isn't. Miller uses the encounters with Odysseus, Daedalus, Pasiphae, Medea, and others as pressure points to explore Circe's own development: what it means to grow slowly when you're immortal, to make mistakes you have centuries to regret, to be powerful and still feel powerless.</p>

<h2>The Writing</h2>

<p>Miller's prose is precise and sensory without being ornate. She makes the ancient world feel lived-in rather than decor. The pacing is steady rather than propulsive, which might frustrate readers expecting thriller-style momentum. Those who sink into it will find something more lasting.</p>

<p><em>Circe</em> has over 180,000 Amazon reviews averaging 4.7 stars. It was a finalist for the Women's Prize for Fiction and one of the best-reviewed novels of 2018.</p>

<p>Find Circe, The Song of Achilles, and more mythology fiction at <strong>Skriuwer.com</strong>.</p>`,
  },
  {
    slug: "cant-hurt-me-david-goggins-review",
    title: "Can't Hurt Me Review: David Goggins Book Is Not What You Expect",
    date: TODAY,
    oldUrl: "",
    categories: ["self-help", "books"],
    content: `<h2>Can't Hurt Me: The Most Brutal Self-Help Book You'll Ever Read</h2>

<p>DAVID GOGGINS grew up in a household with an abusive father, dropped out of high school, worked as a pest control operator, and weighed 297 pounds. He then became one of the most decorated Navy SEALs in history, a multiple ultra-marathon finisher, and one of the few people to complete Army Ranger School, BUD/S, and Air Force Tactical Air Controller training in a single year.</p>

<p><em>Can't Hurt Me</em> is how he did it. With over 125,000 Amazon reviews averaging 4.8 stars, it's one of the most-reviewed books in self-help. And it's nothing like the typical self-help book.</p>

<h2>What's Actually in the Book</h2>

<p>The book alternates between memoir chapters and what Goggins calls "challenges" — specific exercises the reader is supposed to complete before moving on. The challenges force uncomfortable self-reflection: mapping your real history (not the polished version), identifying accountability partners who won't let you off the hook, calculating what percentage of your potential you're currently using.</p>

<p>Goggins doesn't claim to have found a life hack. He claims to have found that most people — himself included, for years — are operating at 40% of their actual capacity, and that the only way to access the other 60% is through deliberate, voluntary suffering. Doing hard things teaches you that you can do hard things.</p>

<h2>The Controversy</h2>

<p>Some readers find Goggins's intensity alienating or unsustainable. That's fair. He pushes his own body to a degree that most doctors wouldn't recommend. His ethos doesn't allow for rest, gentleness, or what most people would call self-compassion.</p>

<p>If you're looking for a gentle introduction to better habits, read James Clear's <em>Atomic Habits</em> instead. If you want to understand what humans can do when they refuse to accept their own limits, Goggins's book is the sharpest version of that argument.</p>

<p>Find Can't Hurt Me and other top self-help books at <strong>Skriuwer.com</strong>.</p>`,
  },
  {
    slug: "song-of-achilles-review-madeline-miller",
    title: "The Song of Achilles Review: Greek Mythology's Most Emotional Retelling",
    date: TODAY,
    oldUrl: "",
    categories: ["mythology", "books"],
    content: `<h2>The Song of Achilles: The Iliad as You've Never Read It</h2>

<p>BEFORE MADELINE MILLER wrote <em>Circe</em>, she wrote <em>The Song of Achilles</em>. Published in 2011, it won the Orange Prize for Fiction and has accumulated over 220,000 Amazon reviews averaging 4.8 stars — more reviews than almost any mythology novel in recent history.</p>

<p>The premise is simple: tell the story of the Iliad from the perspective of Patroclus, Achilles's companion, lover, and closest friend. The execution is extraordinary.</p>

<h2>What Miller Does Differently</h2>

<p>The Iliad is a poem about war, honor, and the rage of Achilles. It's not particularly interested in psychology. Miller is. She takes the relationship between Achilles and Patroclus — hinted at in Homer, debated by scholars for centuries — and makes it the emotional center of the story.</p>

<p>Patroclus narrates. He is not a hero. He is observant, empathetic, and in love with a man who is literally the greatest warrior of his generation. The story follows them from boyhood through the siege of Troy, and if you know your mythology, you know how it ends. Miller makes you dread it anyway.</p>

<h2>Is It Accurate to the Source Material?</h2>

<p>Miller takes liberties, but they're the liberties of a skilled translator rather than someone rewriting the story to fit modern preferences. The gods are still capricious and terrifying. The war is still brutal and pointless. Achilles is still impossible — beautiful, magnetic, and dangerous. The additions feel like expansion, not replacement.</p>

<h2>Who Is This Book For?</h2>

<p>Anyone interested in Greek mythology who hasn't read it yet. Anyone who loved <em>Circe</em> and wants more Miller. Anyone who read the Iliad in school and wanted someone to actually explain what was happening emotionally. Anyone who just wants to read something that will make them feel something.</p>

<p>Find The Song of Achilles and other mythology books at <strong>Skriuwer.com</strong>.</p>`,
  },
  {
    slug: "why-we-sleep-matthew-walker-review",
    title: "Why We Sleep Review: Matthew Walker's Book on Sleep Science",
    date: TODAY,
    oldUrl: "",
    categories: ["science", "books"],
    content: `<h2>Why We Sleep: Genuinely Important Science, Some Controversies You Should Know</h2>

<p>MATTHEW WALKER'S <em>Why We Sleep</em>, published in 2017, is one of those books that changes behavior. After reading it, you start protecting your sleep with the same seriousness you'd give diet or exercise. That's the intended effect, and it mostly works.</p>

<p>Walker is a professor of neuroscience at UC Berkeley and a former sleep researcher at Harvard. The book synthesizes decades of sleep research into an accessible argument: most people in the modern world are chronically sleep-deprived, and the consequences are far more serious than most of us realize.</p>

<h2>The Core Argument</h2>

<p>Walker argues that 7-9 hours of sleep is not optional. It's a biological requirement. Chronic sleep deprivation — defined as regularly getting 6 hours or fewer — is linked to significantly higher rates of cancer, Alzheimer's disease, heart disease, obesity, and mental illness. The research he cites is extensive and alarming.</p>

<p>He also explains the mechanisms: what happens during REM and non-REM sleep, why dreams exist, how sleep deprivation affects memory consolidation, immune function, and emotional regulation. This is genuinely interesting science, and Walker explains it well.</p>

<h2>The Controversies</h2>

<p>The book has been criticized by sleep researchers for overstating some of its claims. Alexey Guzey, a researcher who reviewed the book in detail, found numerous factual errors and cases where Walker cited studies incorrectly. Some of the more alarming statistics (sleeping less than 6 hours doubles your cancer risk, for instance) are overstated relative to what the research actually shows.</p>

<p>Walker responded to some of these criticisms. The debate is ongoing. The core message — sleep is critically important and most people don't get enough — is solid. The specific numbers should be taken with some skepticism.</p>

<h2>Should You Read It?</h2>

<p>Yes. Even if some statistics are exaggerated, the behavioral changes the book inspires are generally positive. Prioritizing sleep is not a bad life decision. Find Why We Sleep at <strong>Skriuwer.com</strong>.</p>`,
  },
  {
    slug: "guns-germs-steel-jared-diamond-review",
    title: "Guns Germs and Steel Review: Still the Best Answer to Yali's Question",
    date: TODAY,
    oldUrl: "",
    categories: ["history", "books"],
    content: `<h2>Guns, Germs, and Steel: The Book That Asks Why Some Societies Won</h2>

<p>IN 1972, a New Guinea politician named Yali asked biologist Jared Diamond a question: "Why is it that you white people developed so much cargo and brought it to New Guinea, but we black people had little cargo of our own?"</p>

<p>That question took Diamond 25 years to answer. The result was <em>Guns, Germs, and Steel</em>, published in 1997 and winner of the Pulitzer Prize. It remains one of the most ambitious and influential works of popular history ever written — and one of the most debated.</p>

<h2>Diamond's Argument</h2>

<p>The short version: the West dominated the world not because of racial or cultural superiority, but because of geographic luck. Eurasia had more domesticable plants and animals than any other continent. Agriculture developed there first, producing food surpluses, which created specialists, cities, writing, governments, and eventually weapons and immunity to diseases. When Europeans arrived in the Americas, Africa, and Australia, they brought germs that killed populations who had never encountered those diseases, and guns and steel to finish the job.</p>

<p>Geography is destiny. That's the argument. What separated conquerors from conquered wasn't intelligence or ambition — it was the starting hand that history dealt.</p>

<h2>The Critiques</h2>

<p>The book has attracted serious criticism from historians who argue Diamond oversimplifies by reducing complex historical causation to geography. Anthropologists have critiqued his treatment of specific cultures. Some argue that his framework, while rejecting racial explanations, still imposes a Western developmental model on non-Western societies.</p>

<p>These are fair critiques. Diamond himself acknowledges the limits of his framework. The book is best read as a starting framework for thinking about historical inequality, not as the definitive answer.</p>

<h2>The Verdict</h2>

<p>Required reading for anyone interested in history, anthropology, or the origins of global inequality. Pair it with Sapiens for a complementary perspective. Find it at <strong>Skriuwer.com</strong>.</p>`,
  },
  {
    slug: "best-books-to-understand-human-psychology",
    title: "Best Books to Understand Human Psychology: 8 That Actually Explain Behavior",
    date: TODAY,
    oldUrl: "",
    categories: ["psychology", "books"],
    content: `<h2>The Best Psychology Books That Actually Change How You See People</h2>

<p>MOST PSYCHOLOGY BOOKS make the same mistake: they explain research in ways that feel interesting in the moment but don't change how you actually behave. The books below are different. They explain the mechanisms of human behavior clearly enough that you start applying the ideas immediately — not tomorrow, not after you've read a summary, but while you're reading.</p>

<p>These are ranked by reader reviews across Amazon, filtered for books that explain rather than inspire.</p>

<h2>1. Influence by Robert Cialdini</h2>

<p>The foundational book on persuasion. Cialdini identifies six principles — reciprocity, commitment, social proof, authority, liking, and scarcity — and explains the research behind each. What makes it useful is that it works in both directions: you'll understand how you're being persuaded as much as how to persuade others. Over 52,000 Amazon reviews.</p>

<h2>2. Man's Search for Meaning by Viktor Frankl</h2>

<p>Part memoir, part psychological theory. Frankl survived the Nazi concentration camps and developed logotherapy — the idea that meaning, not pleasure, is the primary human motivator. Still the most important book in existential psychology, 75 years after publication.</p>

<h2>3. 12 Rules for Life by Jordan Peterson</h2>

<p>Controversial but substantial. Peterson synthesizes evolutionary psychology, mythology, and clinical experience into 12 principles for building a functional life. You don't have to agree with his politics to find his understanding of human behavior useful. 85,000+ Amazon reviews.</p>

<h2>4. Why We Sleep by Matthew Walker</h2>

<p>Sleep is the most underestimated variable in human performance and mental health. Walker makes the case clearly, and the research is largely solid even if some specific claims are overstated.</p>

<h2>5. Thinking, Fast and Slow by Daniel Kahneman</h2>

<p>The definitive popular account of behavioral economics and cognitive biases. Kahneman won the Nobel Prize for this work. Dense in places, but essential for understanding why humans make irrational decisions consistently.</p>

<h2>6. Deep Work by Cal Newport</h2>

<p>Not a psychology book in the traditional sense, but its argument is grounded in cognitive science: the ability to focus deeply is becoming rare and valuable at the same time. Newport explains both the science and the practical systems. 48,000+ reviews.</p>

<h2>7. The Power of Habit by Charles Duhigg</h2>

<p>Clear explanation of how habits form and can be changed, based on neurological research. Practical without being shallow.</p>

<h2>8. Extreme Ownership by Jocko Willink</h2>

<p>Military leadership applied to civilian life. Less a psychology book and more a framework for taking responsibility in ways that actually change behavior. 55,000+ reviews.</p>

<p>All these books and more are ranked by reader reviews at <strong>Skriuwer.com</strong> — find your next read.</p>`,
  },
  {
    slug: "best-books-like-sapiens-world-history",
    title: "Best Books Like Sapiens: 8 World History Books That Change How You Think",
    date: TODAY,
    oldUrl: "",
    categories: ["history", "books"],
    content: `<h2>If You Loved Sapiens, Read These Next</h2>

<p>SAPIENS BY YUVAL NOAH HARARI is the rare history book that changes how you think about everything — not just history. If you finished it and felt that particular hunger for more books that take the big view, here are eight that match that ambition.</p>

<h2>Guns, Germs, and Steel — Jared Diamond</h2>

<p>The complementary volume to Sapiens. Where Harari asks what makes us human, Diamond asks why some human societies dominated others. His answer — geographic luck, not racial superiority — is compelling and well-researched. 19,000+ reviews. Read this second after Sapiens.</p>

<h2>Homo Deus — Yuval Noah Harari</h2>

<p>Harari's follow-up to Sapiens. Where Sapiens looks backward, Homo Deus looks forward. What happens when humans gain the power to engineer themselves, to achieve something close to immortality, to create intelligence that surpasses our own? Less grounded than Sapiens, but equally thought-provoking.</p>

<h2>A Brief History of Time — Stephen Hawking</h2>

<p>Not history of humanity but history of the universe. If Sapiens made you think about 70,000 years of human development, Hawking will make you think about 13.8 billion years of cosmic development. Surprisingly readable for a book about black holes.</p>

<h2>The Silk Roads — Peter Frankopan</h2>

<p>Frankopan argues that the standard Western history narrative misses the point: for most of history, the center of the world was Asia, not Europe. A genuinely different angle on familiar events.</p>

<h2>Civilized to Death — Christopher Ryan</h2>

<p>Challenges the assumption that civilization represents progress. Ryan argues that hunter-gatherer life was better in many measurable ways than the sedentary agricultural life that followed. Provocative, well-sourced, and a direct dialogue with Harari's agricultural revolution chapter.</p>

<h2>The Origins of Virtue — Matt Ridley</h2>

<p>How did human cooperation emerge from individual self-interest? Ridley approaches the question from evolutionary biology and economics. Dense but rewarding.</p>

<h2>Sapiens-Sized Thinking</h2>

<p>All of these books share Sapiens's willingness to step back from specific periods and ask the larger questions: Why are we the way we are? What forces shaped human history? What does that mean for the future?</p>

<p>Browse all world history books at <strong>Skriuwer.com</strong>, ranked by reader reviews.</p>`,
  },
  {
    slug: "night-elie-wiesel-review-holocaust-memoir",
    title: "Night by Elie Wiesel Review: The Holocaust Memoir That Cannot Be Forgotten",
    date: TODAY,
    oldUrl: "",
    categories: ["history", "books"],
    content: `<h2>Night: A Holocaust Memoir That Has No Equal</h2>

<p>ELIE WIESEL was fifteen years old when the Nazis arrived in his hometown of Sighet, Hungary. By sixteen, he had survived Auschwitz and Buchenwald, watched his father die, and witnessed things that he would spend the rest of his life trying to describe — and wondering whether description was even possible.</p>

<p><em>Night</em> is 115 pages. It took Wiesel ten years to write it. Published in France in 1958, rejected by publishers in the United States for five years, it was finally released in English in 1960 and went on to sell more than ten million copies. It has over 72,000 Amazon reviews averaging 4.7 stars.</p>

<h2>What Makes Night Different from Other Holocaust Accounts</h2>

<p>Most Holocaust narratives carry an implicit arc toward survival, recovery, and meaning. Wiesel resists this. <em>Night</em> does not resolve. It ends with the liberation of Buchenwald — and with Wiesel looking at his own reflection in a mirror for the first time in months, seeing a corpse looking back at him.</p>

<p>The book's power comes from its refusal to explain or redeem. Wiesel describes what he saw. He describes the death of his father, which happened in stages so gradual that he could not grieve at the time. He describes the moment he stopped praying, and what that meant for a deeply religious boy who had planned to spend his life studying the Torah.</p>

<h2>Should You Read It?</h2>

<p>This is one of those books where the question isn't "is it good?" but "am I ready for it?" It is good — technically simple, emotionally devastating. If you're approaching the Holocaust through books, <em>Night</em> should be first. It is the most direct account, by someone who was there, of what it felt like to be there.</p>

<p>Pair it with <em>The Diary of a Young Girl</em> by Anne Frank, and <em>Ordinary Men</em> by Christopher Browning, for perspectives from different angles. Find them all at <strong>Skriuwer.com</strong>.</p>`,
  },
];

async function main() {
  const blogData = JSON.parse(readFileSync(BLOG_JSON, "utf-8"));
  const existingSlugs = new Set(blogData.posts.map((p) => p.slug));

  const toAdd = NEW_POSTS.filter((p) => !existingSlugs.has(p.slug));
  console.log(`\n📝 Adding ${toAdd.length} new blog posts (${NEW_POSTS.length - toAdd.length} already exist)\n`);

  toAdd.forEach((p) => {
    console.log(`  + ${p.slug}`);
  });

  if (!SAVE) {
    console.log("\nDry run — add --save to write.\n");
    return;
  }

  blogData.posts.push(...toAdd);
  writeFileSync(BLOG_JSON, JSON.stringify(blogData, null, 2), "utf-8");
  console.log(`\n✅ Saved ${toAdd.length} posts to data/blog-posts.json (total: ${blogData.posts.length})\n`);
}

main().catch((e) => { console.error(e); process.exit(1); });
