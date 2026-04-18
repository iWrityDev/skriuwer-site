/**
 * add_blog_posts.mjs — Adds 12 targeted long-tail SEO blog posts to blog-posts.json.
 * Usage: node scripts/add_blog_posts.mjs --save
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
    slug: "is-sapiens-worth-reading-honest-review",
    title: "Is Sapiens Worth Reading? An Honest Review of Harari's Bestseller",
    date: TODAY,
    oldUrl: "",
    categories: ["history", "books"],
    content: `<h2>Is Sapiens Worth Reading? An Honest Review</h2>

<p>CHANCES ARE you've seen Sapiens on every airport bookshelf for the past decade. Yuval Noah Harari's <em>Sapiens: A Brief History of Humankind</em> has sold over 20 million copies and been endorsed by everyone from Barack Obama to Bill Gates. But is the hype justified, or is this just another pop-science book that sounds profound without saying much?</p>

<p>Here's the honest answer: Sapiens is genuinely worth reading, but not for the reasons most reviewers give.</p>

<h2>What Sapiens Actually Does Well</h2>

<p>The book's real strength is its audacity. Harari compresses 70,000 years of human history into 450 pages, and he does it without dumbing things down. The opening chapters on the Cognitive Revolution are genuinely fascinating. The idea that <em>Homo sapiens</em> conquered the world because we're the only species that can believe in shared fictions — money, nations, corporations, religion — is a compelling framework that changes how you see the modern world.</p>

<p>The agricultural revolution chapter is equally provocative. Harari argues that farming was humanity's biggest mistake. Rather than improving our lives, it trapped most people in harder labor, worse nutrition, and hierarchical societies. You may not agree, but you'll think about it for days.</p>

<h2>Where It Falls Short</h2>

<p>The second half of the book loses some of the early momentum. Harari's treatment of capitalism and religion is broad enough that specialists in those fields will find plenty to argue with. The final chapters on the future of humanity veer into speculative territory that feels less grounded than the earlier history.</p>

<p>Some critics also accuse Harari of oversimplifying — of writing history that reads more like philosophy. That's fair. But it's also what makes the book readable.</p>

<h2>Who Should Read Sapiens</h2>

<p>If you haven't read much popular history and want a single book that makes you reconsider everything you thought you knew about human civilization, Sapiens delivers. It's a starting point, not a destination. Read it, argue with it, then go deeper into the periods and ideas that interest you most.</p>

<p>If you want something more rigorous after finishing it, pair it with Jared Diamond's <em>Guns, Germs, and Steel</em> for the evolutionary side, or Peter Frankopan's <em>The Silk Roads</em> for a more grounded geopolitical history of civilization.</p>

<h2>The Verdict</h2>

<p>Sapiens earns its reputation. It won't make you an expert in any period of history, but it will reframe how you think about the long arc of human development. For a 450-page book covering all of human history, that's a remarkable achievement.</p>

<p>Find Sapiens and related history books at <strong>Skriuwer.com</strong> — with rankings by reader reviews across every major category.</p>`,
  },

  {
    slug: "best-books-about-ancient-rome-reading-guide",
    title: "Best Books About Ancient Rome: A Complete Reading Guide for 2026",
    date: TODAY,
    oldUrl: "",
    categories: ["history", "books"],
    content: `<h2>Best Books About Ancient Rome: Where to Start</h2>

<p>THE ROMAN EMPIRE lasted over 500 years and shaped virtually everything about Western civilization — our laws, our languages, our architecture, even our calendar. Yet most people's knowledge of Rome comes from <em>Gladiator</em> and a few vague memories of Julius Caesar. These books fix that.</p>

<h2>The Essential Starting Point: SPQR by Mary Beard</h2>

<p>If you read one book about Ancient Rome, make it <em>SPQR: A History of Ancient Rome</em> by Mary Beard. Britain's most prominent classicist, Beard writes with the clarity of a great teacher and the edge of someone who genuinely loves picking fights with received wisdom. She focuses on the Republic rather than the Empire, and on ordinary Romans rather than just emperors and generals. The result is a history that feels alive in a way that most ancient history books don't.</p>

<h2>For the Political Drama: Tom Holland's Rome Trilogy</h2>

<p>Tom Holland has written what might be the most enjoyable popular history of Rome. Start with <em>Rubicon: The Last Years of the Roman Republic</em>, which covers the fall of the Republic through the stories of Caesar, Pompey, and Cicero. It reads like a political thriller because, well, it was one. Then continue with <em>Dynasty: The Rise and Fall of the House of Caesar</em> for the first five emperors.</p>

<p>For a complementary perspective, Mike Duncan's <em>The Storm Before the Storm</em> covers the generation before Caesar — Marius, Sulla, and the men who broke the Republic's political norms and made Caesar possible. Duncan created the enormously popular <em>History of Rome</em> podcast, and his writing has that same gift for making complex Roman politics feel immediate and comprehensible.</p>

<h2>Deep Dives: Goldsworthy on Caesar and Rome's Fall</h2>

<p>Adrian Goldsworthy is the historian to go to when you want rigorous scholarship that's still readable. His <em>Caesar: Life of a Colossus</em> is the most complete biography of Julius Caesar in English. And when you're ready to understand how the greatest empire in history ended, his <em>How Rome Fell</em> is the most persuasive account available.</p>

<h2>Building Your Reading List</h2>

<p>A good sequence for Roman history: start with SPQR for the foundations, move to Rubicon for the Republic's fall, then Dynasty for the Julio-Claudians. Goldsworthy's Caesar works well anywhere in that sequence. By the time you finish all four, you'll know more about Roman history than most people with classics degrees.</p>

<p>Browse the full ranked list of <strong>best Ancient Rome books</strong> at Skriuwer.com, sorted by reader reviews.</p>`,
  },

  {
    slug: "norse-mythology-books-ranked-gaiman-to-prose-edda",
    title: "Norse Mythology Books Ranked: From Neil Gaiman to the Prose Edda",
    date: TODAY,
    oldUrl: "",
    categories: ["mythology", "books"],
    content: `<h2>Norse Mythology Books: The Complete Ranking</h2>

<p>ODIN HANGING from Yggdrasil for nine days to gain wisdom. Thor's fishing trip that almost ends with the Midgard Serpent dragging up the ocean floor. Loki giving birth to an eight-legged horse. Norse mythology is strange, violent, and genuinely unlike anything else in world mythology. Here's where to start.</p>

<h2>Best for First-Time Readers: Neil Gaiman's Norse Mythology</h2>

<p>Neil Gaiman's <em>Norse Mythology</em> is the obvious entry point and deserves every bit of its popularity. Gaiman grew up steeped in Norse myths and brings a storyteller's instinct to retelling them. The book covers the major cycles from the creation of the world to Ragnarök, written in clear, immediate prose that captures how these stories must have felt when told aloud around a fire.</p>

<p>This is not a scholarly text. Gaiman doesn't annotate or contextualize. What he does is make you care about Odin, Thor, and Loki as characters. That emotional connection is what makes everything else stick.</p>

<h2>The Primary Source: The Prose Edda</h2>

<p>Once Gaiman has you hooked, go to the source: Snorri Sturluson's <em>Prose Edda</em>, written in Iceland around 1220 CE. This is the single most important document we have for Norse mythology — most of what we know about the Norse gods comes from this one medieval text.</p>

<p>Snorri was a Christian writing about pagan mythology, which makes the text fascinatingly complex. He's trying to preserve the old myths while framing them within a Christian worldview. The result is strange and layered in ways that reward multiple readings. The Penguin Classics translation by Jesse Byock is the most accessible for modern readers.</p>

<h2>Academic But Readable: Carolyne Larrington's The Norse Myths</h2>

<p>For something between Gaiman's storytelling and Snorri's primary source, Carolyne Larrington's <em>The Norse Myths: A Guide to the Gods and Heroes</em> provides scholarly context without getting dry. Larrington is a professor of medieval English literature at Oxford and knows these texts as well as anyone alive.</p>

<h2>Beyond the Myths: Neil Price's Children of Ash and Elm</h2>

<p>If you want to understand not just the mythology but the actual Vikings — who they were, how they lived, what they believed — Neil Price's <em>Children of Ash and Elm</em> is the definitive modern account. Price spent decades excavating Viking sites, and this book synthesizes the latest archaeological evidence with a gift for narrative history. The mythology makes far more sense when you understand the culture that produced it.</p>

<p>See the full ranked list of <strong>best Norse mythology books</strong> at Skriuwer.com.</p>`,
  },

  {
    slug: "atomic-habits-review-does-it-actually-work",
    title: "Atomic Habits Review: Does James Clear's System Actually Work?",
    date: TODAY,
    oldUrl: "",
    categories: ["self-help", "books"],
    content: `<h2>Atomic Habits Review: The Honest Truth</h2>

<p>OVER 10 MILLION copies sold. Over 150,000 reviews on Amazon averaging 4.8 stars. James Clear's <em>Atomic Habits</em> is the best-selling self-help book of the past decade by almost any measure. But does it actually work, or is this another "read it, feel inspired, change nothing" book?</p>

<p>The short answer: the system works if you use it. The longer answer is more interesting.</p>

<h2>What Makes Atomic Habits Different</h2>

<p>Most self-help books are motivational. Atomic Habits is operational. Clear isn't trying to inspire you — he's trying to give you a functional system for behavior change based on how your brain actually works.</p>

<p>The core insight is about identity over outcomes. Most people set goals: "I want to lose 20 pounds" or "I want to read 50 books this year." Clear argues this is backwards. Instead of focusing on what you want to achieve, focus on who you want to become. A person who exercises doesn't miss workouts. A person who reads goes to bed with a book. The behavior follows from the identity.</p>

<p>The four laws of behavior change — make it obvious, make it attractive, make it easy, make it satisfying — give you concrete levers to pull. Want to exercise more? Make it obvious (put your gym clothes next to your alarm). Make it easy (start with two-minute workouts). Make it satisfying (track your streak). These aren't revelations, but they're presented in a way that actually sticks.</p>

<h2>Where It Falls Short</h2>

<p>The book is better at building habits than breaking them. The inversion of the four laws (make it invisible, unattractive, difficult, unsatisfying) works in theory but is harder to execute. Clear also doesn't engage much with the psychological research on willpower depletion and decision fatigue, which feels like a gap.</p>

<p>The examples can also feel repetitive by the second half. If you're paying attention, you've understood the system by chapter 8. The rest is reinforcement.</p>

<h2>Should You Read It?</h2>

<p>Yes. Especially if you've struggled to make habits stick. The two-minute rule alone — starting any new habit by making it take less than two minutes — has genuinely changed how a lot of people approach behavior change. The book is worth reading for that one concept even if you ignore everything else.</p>

<p>Find <em>Atomic Habits</em> and other top self-help books at <strong>Skriuwer.com</strong>, ranked by reader reviews.</p>`,
  },

  {
    slug: "greek-mythology-books-for-adults-beyond-percy-jackson",
    title: "Greek Mythology Books for Adults: Beyond Percy Jackson",
    date: TODAY,
    oldUrl: "",
    categories: ["mythology", "books"],
    content: `<h2>Greek Mythology Books for Adults: The Real Reading List</h2>

<p>EVERYONE KNOWS Zeus, Hercules, and the Trojan War from childhood. But Greek mythology is far stranger, darker, and more philosophically rich than any children's adaptation suggests. These are the books that give you the full, unfiltered version.</p>

<h2>The Modern Gold Standard: Stephen Fry's Trilogy</h2>

<p>Stephen Fry's three-volume retelling of Greek mythology — <em>Mythos</em>, <em>Heroes</em>, and <em>Troy</em> — is the best entry point for adult readers. Fry writes with the casual erudition of someone who has spent a lifetime with these stories and wants you to love them as much as he does. <em>Mythos</em> covers the creation of the world and the gods. <em>Heroes</em> tells the great hero myths from Perseus to Heracles. <em>Troy</em> covers the Trojan War from Paris's judgment to the fall of the city.</p>

<p>What Fry gets right that children's versions don't: the moral complexity. The Greek gods are not good or evil. They're powerful, petty, generous, and terrifyingly arbitrary. Fry doesn't sanitize that. When Zeus is monstrous, Fry says so.</p>

<h2>Go to the Source: Homer</h2>

<p>The Trojan War mythology culminates in Homer. Read Robert Fagles' translation of <em>The Iliad</em> and you'll understand why Western literature has been riffing on these 24 books for three thousand years. Fagles' translation is muscular and immediate in a way that older translations aren't. The death of Hector is one of the most affecting scenes in all of literature.</p>

<h2>The Classic Reference: Edith Hamilton's Mythology</h2>

<p>First published in 1942, Edith Hamilton's <em>Mythology</em> remains the single best reference for Greek, Roman, and Norse myths in one volume. It lacks the narrative flair of Fry, but the coverage is comprehensive and the writing is clear and dignified. If you want to actually know all the myths rather than just the famous ones, this is the book to own.</p>

<h2>For the Daring: Robert Graves</h2>

<p>Robert Graves' two-volume <em>The Greek Myths</em> is a fascinating if controversial deep-dive. Graves annotates every myth with his own interpretive framework, arguing that the myths encode suppressed pre-Hellenic religious traditions. Classicists argue about how much of this is credible. But even where Graves is speculative, he sends you down fascinating rabbit holes.</p>

<h2>Modern Fiction Rooted in Myth</h2>

<p>For fiction, Madeline Miller's <em>The Song of Achilles</em> and <em>Circe</em> have introduced Greek mythology to a new generation of readers. Miller trained as a classicist and it shows — the mythological details are authentic even as she fills in the emotional interiority that Homer leaves out.</p>

<p>Browse all <strong>Greek mythology books</strong> at Skriuwer.com, ranked by reader reviews.</p>`,
  },

  {
    slug: "best-conspiracy-books-that-make-you-think",
    title: "Best Conspiracy Books That Actually Make You Think",
    date: TODAY,
    oldUrl: "",
    categories: ["conspiracy", "history"],
    content: `<h2>Conspiracy Books Worth Reading — and Why</h2>

<p>HERE'S THE PROBLEM with conspiracy books: most of them are either credulous to the point of embarrassment or so dismissive that they miss the real, documented examples of governments and institutions doing exactly what conspiracy theorists accuse them of.</p>

<p>The books worth reading thread a harder needle. They take the question seriously, look at the evidence, and let you decide.</p>

<h2>The Essential: The Creature from Jekyll Island</h2>

<p>G. Edward Griffin's <em>The Creature from Jekyll Island</em> is the most serious and well-documented book on the origins of the Federal Reserve. Whether you end up agreeing with Griffin's conclusions or not, the factual foundation is solid: in 1910, a small group of the most powerful bankers in America met in secret on Jekyll Island, Georgia, and drafted what became the Federal Reserve Act of 1913.</p>

<p>That's not a conspiracy theory. That's documented history. What you make of it determines how you read the rest of the book.</p>

<h2>The Classic: Behold a Pale Horse</h2>

<p>Milton William Cooper's <em>Behold a Pale Horse</em> is a different kind of book. Cooper, a former Naval Intelligence officer, compiled everything he claimed to have seen in classified files — secret societies, UFOs, population control plans, and the global elite. Some of what Cooper predicted came true. Much of it reads as the work of a brilliant but troubled man with access to real information he couldn't fully contextualize.</p>

<p>Read it as a cultural artifact as much as a factual account. It shows how a certain strain of American skepticism about official narratives developed in the late 20th century, and many of its questions about power and surveillance now look prescient in ways Cooper couldn't have predicted.</p>

<h2>The Historical Case: Carroll Quigley's Tragedy and Hope</h2>

<p>For academic rigor, Carroll Quigley's <em>Tragedy and Hope</em> is in a class by itself. Quigley was a Georgetown professor and mentor to Bill Clinton. His 1,300-page history of the 20th century argues that a network of Anglo-American financial elites has shaped global politics in ways the public wasn't aware of. His sources were the private documents of these elites themselves, who apparently believed his account would be sympathetic. It wasn't.</p>

<h2>The Standard These Books Set</h2>

<p>The best conspiracy books share a quality: they're willing to follow the evidence where it leads, even when the conclusion is uncomfortable. They distinguish between documented facts and speculation, and they take the reader seriously enough to present both.</p>

<p>See the full <strong>best conspiracy books</strong> list at Skriuwer.com, ranked by reader reviews.</p>`,
  },

  {
    slug: "best-viking-books-for-beginners-and-history-fans",
    title: "Best Viking Books: A Reading Guide for Beginners and History Fans",
    date: TODAY,
    oldUrl: "",
    categories: ["history", "books"],
    content: `<h2>Viking Books: Where the Real History Begins</h2>

<p>THE VIKINGS OF POPULAR CULTURE are mostly wrong. They didn't wear horned helmets. They were not primarily raiders. Many were traders, farmers, and explorers who founded cities, opened trade routes from Scandinavia to Constantinople, and reached North America five centuries before Columbus. The real Vikings are more interesting than the stereotype.</p>

<p>These books tell the actual story.</p>

<h2>The Best Modern Overview: Children of Ash and Elm</h2>

<p>Neil Price's <em>Children of Ash and Elm: A History of the Vikings</em> is the definitive modern account and it's not particularly close. Price is an archaeologist who has spent his career excavating Viking-Age sites across Scandinavia, and this book synthesizes the latest archaeology with written sources in a way no previous popular history has managed.</p>

<p>What makes it different from older Viking histories: Price takes the spiritual world of the Vikings seriously. He doesn't treat their beliefs in Odin, fate, and the afterlife as superstition to be quickly acknowledged and moved past. He argues that understanding the Viking worldview — particularly their attitude toward death and the warrior life — is essential to understanding their behavior. This reframes everything from the berserkers to the practice of human sacrifice in a more coherent way.</p>

<h2>The Accessible Classic: The Sea Wolves</h2>

<p>Lars Brownworth's <em>The Sea Wolves: A History of the Vikings</em> is shorter, more narrative-driven, and an excellent starting point if you're new to Viking history. Brownworth is a gifted popular historian who makes complex events feel like stories. The book covers the full arc from the first raids to the end of the Viking Age, with particularly strong chapters on the Varangian Guard in Constantinople and the discovery of North America.</p>

<h2>Academic Depth: The Age of the Vikings</h2>

<p>Anders Winroth's <em>The Age of the Vikings</em> is written by a Yale historian and is more rigorous than either Price or Brownworth, while remaining readable. Winroth is particularly good on the Viking relationship with the Christian world — their gradual conversion and how it changed Scandinavian society. Essential reading if you want to understand how the Viking Age ended.</p>

<h2>Building the Full Picture</h2>

<p>Read Price for the archaeological and cultural depth, Brownworth for the narrative overview, and Winroth for the historical context. Add Neil Gaiman's <em>Norse Mythology</em> to understand what the Vikings believed, and you'll have a more complete picture of this period than most history books provide.</p>

<p>Browse the full <strong>best Viking books</strong> list at Skriuwer.com.</p>`,
  },

  {
    slug: "best-ww2-books-every-history-fan-should-read",
    title: "Best World War II Books Every History Fan Should Read",
    date: TODAY,
    oldUrl: "",
    categories: ["history", "books"],
    content: `<h2>World War II Books: The Essential Reading List</h2>

<p>WORLD WAR II is the most written-about event in human history. There are over 70,000 books about it in English alone. The question isn't whether there are good books — it's which ones are worth your time. Here are the ones that matter.</p>

<h2>The Most Human Account: Band of Brothers</h2>

<p>Stephen Ambrose's <em>Band of Brothers</em> follows E Company, 506th Parachute Infantry Regiment, 101st Airborne Division from their training in Georgia through D-Day, Operation Market Garden, the Battle of the Bulge, and the capture of Hitler's Eagle's Nest. Ambrose interviewed the surviving members of Easy Company in the 1980s and 1990s, and the result is the most intimate account of frontline combat in the European theater.</p>

<p>What elevates it above most military history: the individual voices. These are ordinary American men in extraordinary circumstances, and Ambrose never lets you forget that.</p>

<h2>The Most Harrowing Memoir: Night</h2>

<p>Elie Wiesel's <em>Night</em> is the most widely read Holocaust memoir in the world and one of the most important books of the 20th century. Wiesel was fifteen when he and his family were deported from their home in Romania to Auschwitz. The 120-page memoir that resulted from this experience is stripped of every literary flourish, written in a voice that is simultaneously a child's and an old man's.</p>

<p>Reading it once is not enough. It asks to be returned to.</p>

<h2>The Survival Story: Unbroken</h2>

<p>Laura Hillenbrand's <em>Unbroken: A World War II Story of Survival, Resilience, and Redemption</em> tells the story of Louis Zamperini, a US Olympic runner who survived 47 days adrift in the Pacific after his bomber crashed, then two years as a Japanese prisoner of war. Hillenbrand researched the book for seven years and the narrative precision shows. It reads like a novel, and the story it tells is almost too extraordinary to believe.</p>

<h2>The Turning Points: D-Day</h2>

<p>For military history with scope and precision, Stephen Ambrose's <em>D-Day: June 6, 1944</em> remains the definitive account of the Normandy landings. Ambrose interviewed 1,400 veterans for this book, and the granular detail — what soldiers saw, heard, and felt on individual beaches — is unlike anything in conventional military history.</p>

<h2>The Younger Perspective</h2>

<p>Anne Frank's <em>The Diary of a Young Girl</em> requires no introduction, but it rewards rereading as an adult. What strikes you is how ordinary life continued — the petty irritations, the crushes, the arguments — alongside the terror of what was happening outside. The ordinariness is what makes it unbearable.</p>

<p>Find all <strong>best WW2 books</strong> at Skriuwer.com, ranked by reader reviews.</p>`,
  },

  {
    slug: "stoicism-books-for-beginners-marcus-aurelius-to-ryan-holiday",
    title: "Stoicism Books for Beginners: From Marcus Aurelius to Ryan Holiday",
    date: TODAY,
    oldUrl: "",
    categories: ["philosophy", "self-help", "books"],
    content: `<h2>Stoicism Books: Where to Start and Where to Go</h2>

<p>STOICISM HAS HAD a remarkable second life in the 21st century. A philosophy developed in ancient Athens and refined in Rome has become the preferred life philosophy of Silicon Valley executives, military officers, and millions of ordinary people looking for a framework that actually holds up under pressure. Here's the reading sequence that gets you there.</p>

<h2>Start Here: The Daily Stoic</h2>

<p>Ryan Holiday's <em>The Daily Stoic: 366 Meditations on Wisdom, Perseverance, and the Art of Living</em> is the best entry point for modern readers. Holiday takes passages from Stoic philosophers — Marcus Aurelius, Epictetus, Seneca — and pairs each with a short reflection on its contemporary relevance. The format makes it easy to build a daily practice without requiring fluency in ancient philosophy.</p>

<p>Holiday's gift is translation: not just of language but of context. He makes Epictetus's life as a slave feel relevant to a modern professional trying to stay sane in a difficult job. That's harder than it sounds.</p>

<h2>The Primary Source: Meditations</h2>

<p>Once Holiday has oriented you, go to Marcus Aurelius directly. <em>Meditations</em> is the private journal of a Roman emperor — notes to himself, reminders of how to live, philosophical exercises he performed each morning. He never intended it to be published, which gives it an honesty and vulnerability that formal philosophical writing rarely achieves.</p>

<p>There are many translations. Gregory Hays' translation for Modern Library is the most readable modern English version. The original Penguin Classics translation by Maxwell Staniforth is more formal but beautiful in its own way.</p>

<h2>The Practice: Stoicism and the Art of Happiness</h2>

<p>Donald Robertson's <em>Stoicism and the Art of Happiness</em> is the best bridge between ancient philosophy and practical psychology. Robertson is a cognitive therapist, and his book draws explicit connections between Stoic practice and modern cognitive-behavioral therapy. If you want to understand <em>why</em> Stoicism works, not just <em>that</em> it works, this is the book.</p>

<h2>Meditations on the Applied Life</h2>

<p>What makes Stoicism worth serious attention is that it was always intended as a practice, not just a theory. Marcus Aurelius wasn't writing for posterity — he was working through his thinking every morning before dealing with an empire. That pragmatic orientation is what distinguishes Stoicism from most ancient philosophy, and it's why it resonates with people under genuine pressure.</p>

<p>Find the full <strong>best philosophy and Stoicism books</strong> list at Skriuwer.com.</p>`,
  },

  {
    slug: "true-crime-books-like-mindhunter-fbi-profiling",
    title: "True Crime Books Like Mindhunter: FBI Profiling and Serial Killer Cases",
    date: TODAY,
    oldUrl: "",
    categories: ["true-crime", "books"],
    content: `<h2>Books Like Mindhunter: FBI Profiling Done Right</h2>

<p>JOHN DOUGLAS spent his career at the FBI interviewing convicted serial killers to understand how they thought, what drove them, and how to catch others like them. Mindhunter was the book that brought this work to a wide audience, and the Netflix series has introduced it to millions more. If you've finished both and want more, here's where to go.</p>

<h2>Mindhunter Itself</h2>

<p>If you've only seen the series, read the book. John Douglas and Mark Olshaker's <em>Mindhunter: Inside the FBI's Elite Serial Crime Unit</em> covers more cases, provides more psychological depth, and gives more context for how criminal profiling developed as a discipline. Douglas is a gifted writer (with Olshaker's help) who makes the clinical feel visceral without exploitation.</p>

<h2>The Cold Case Masterwork: I'll Be Gone in the Dark</h2>

<p>Michelle McNamara's <em>I'll Be Gone in the Dark: One Woman's Obsessive Search for the Golden State Killer</em> is the rare true crime book that transcends the genre. McNamara was a true crime blogger and journalist who became obsessed with the identity of the East Area Rapist, a serial criminal who committed 50 home invasions and 12 murders across California in the 1970s and 1980s.</p>

<p>The book is two things at once: a rigorous investigation of the crimes and evidence, and a meditation on the obsession that drives certain people to follow cold cases. McNamara died in 2016 before finishing the manuscript, and the last section was completed by her collaborators. The Golden State Killer was identified in 2018 through genetic genealogy. Reading the book knowing this makes the ending devastating.</p>

<h2>The Classic: Helter Skelter</h2>

<p>Vincent Bugliosi's <em>Helter Skelter: The True Story of the Manson Murders</em> remains the most thorough account of one of the most sensational criminal cases in American history. Bugliosi was the prosecutor, and his insider perspective gives the book a legal precision that most true crime writing lacks. At nearly 700 pages, it's comprehensive to the point of exhaustion, but nothing that's there is wasted.</p>

<h2>The Psychology of Evil: Ordinary Men</h2>

<p>If you want to understand how ordinary people commit extraordinary atrocities — a question that applies to serial killers and war criminals alike — Christopher Browning's <em>Ordinary Men</em> is essential reading. Browning studies a German police battalion whose members murdered tens of thousands of Jewish civilians in Poland during WW2. Most were not fanatical Nazis. That's the disturbing part.</p>

<p>Find the full <strong>best true crime books</strong> list at Skriuwer.com.</p>`,
  },

  {
    slug: "books-about-ancient-egypt-for-beginners",
    title: "Books About Ancient Egypt for Beginners: The Complete Guide",
    date: TODAY,
    oldUrl: "",
    categories: ["history", "mythology", "books"],
    content: `<h2>Ancient Egypt Books: The Best Starting Points</h2>

<p>ANCIENT EGYPT lasted for over 3,000 years. The pyramids were already ancient when Julius Caesar visited Egypt. The civilization that built them produced some of history's most sophisticated art, architecture, and religious thought, and we're still deciphering what they left behind. Here's how to start understanding it.</p>

<h2>The Best Modern Overview: The Rise and Fall of Ancient Egypt</h2>

<p>Toby Wilkinson's <em>The Rise and Fall of Ancient Egypt</em> is the most comprehensive one-volume history of Egypt from the Predynastic period to the Roman conquest. Wilkinson is an Egyptologist at Cambridge and writes with authority and elegance. The book covers every major dynasty and period, but never loses sight of the human stories behind the monuments.</p>

<p>The section on Akhenaten's religious revolution is particularly good. Wilkinson presents the most psychologically plausible account of why this pharaoh tried to replace the entire Egyptian pantheon with a single deity, and why it failed so completely after his death.</p>

<h2>The Religious Dimension: Egyptian Mythology</h2>

<p>To understand ancient Egypt, you have to understand its religion — which means understanding its gods. Geraldine Pinch's <em>Egyptian Mythology: A Guide to the Gods, Goddesses, and Traditions of Ancient Egypt</em> is the clearest scholarly guide to this material. The Egyptian pantheon is genuinely complex, with gods who shift, merge, and transform in ways that don't map onto other mythological traditions. Pinch explains the underlying logic.</p>

<h2>The Primary Source: The Book of the Dead</h2>

<p>For a direct encounter with ancient Egyptian religious thought, the <em>Book of the Dead</em> — more accurately the Book of Coming Forth by Day — is as close as you can get. These are the spells, instructions, and declarations that ancient Egyptians believed would guide the deceased through the afterlife. Reading them, you encounter a worldview so different from anything in the Western tradition that it's genuinely disorienting in the best way.</p>

<h2>The Full Picture</h2>

<p>Ancient Egypt is worth understanding not just as a collection of monuments and mummies but as a working civilization that sustained itself for three millennia through a combination of religious cohesion, agricultural genius, and administrative sophistication. The books above give you all three dimensions.</p>

<p>Browse the full <strong>best ancient Egypt books</strong> list at Skriuwer.com.</p>`,
  },

  {
    slug: "self-help-books-that-actually-change-behavior",
    title: "Self-Help Books That Actually Change Behavior (Not Just Inspire)",
    date: TODAY,
    oldUrl: "",
    categories: ["self-help", "books"],
    content: `<h2>Self-Help Books That Work</h2>

<p>THE SELF-HELP SECTION of any bookstore is mostly noise. Books that promise transformation while delivering motivation that lasts three days. But some books are different — they change how you think about behavior, and the changes stick. Here's the short list of ones that actually deliver.</p>

<h2>Atomic Habits (James Clear)</h2>

<p>Already covered in depth elsewhere, but it belongs on any list of effective self-help. The two-minute rule and the identity-based approach to habit formation are practical tools, not inspiration. Millions of readers have genuinely changed their behavior using the system in this book.</p>

<h2>Deep Work (Cal Newport)</h2>

<p>Newport's argument is straightforward: the ability to focus without distraction on cognitively demanding work is becoming rarer and more valuable simultaneously. Most knowledge workers are systematically degrading this ability through constant connectivity. <em>Deep Work</em> is both a diagnosis of the problem and a practical prescription for fixing it.</p>

<p>The most actionable idea: scheduling every minute of your workday. Not to be rigid, but to force yourself to be intentional about where your time goes. Newport's own practice of planning every hour of his academic day has made him one of the most productive computer scientists of his generation.</p>

<h2>Extreme Ownership (Jocko Willink and Leif Babin)</h2>

<p>Written by two Navy SEAL commanders, <em>Extreme Ownership</em> applies military leadership principles to business and personal accountability. The central principle — that every outcome in your life is ultimately your responsibility — is uncomfortable but liberating. Willink and Babin illustrate each principle with combat narratives from Ramadi, Iraq, then show how the same principle applies in corporate contexts.</p>

<h2>Man's Search for Meaning (Viktor Frankl)</h2>

<p>Viktor Frankl survived Auschwitz and three other Nazi concentration camps and came out with a theory of human psychology: that the primary human motivational force is not pleasure (Freud) or power (Adler) but meaning. <em>Man's Search for Meaning</em> is the shortest book on this list and the one most likely to change how you think about suffering, choice, and purpose.</p>

<p>It's 165 pages. You can read it in a day. You'll carry it for years.</p>

<h2>The Pattern</h2>

<p>The self-help books that work share a quality: they're built on evidence or lived experience, not wishful thinking. They make specific, testable claims about how behavior changes. And they respect your intelligence enough to explain the <em>why</em>, not just the <em>what</em>.</p>

<p>See the full <strong>best self-help books</strong> list at Skriuwer.com, ranked by reader reviews.</p>`,
  },
];

function main() {
  const data = JSON.parse(readFileSync(BLOG_JSON, "utf-8"));
  const existingSlugs = new Set(data.posts.map((p) => p.slug));

  let added = 0;
  for (const post of NEW_POSTS) {
    if (existingSlugs.has(post.slug)) {
      console.log(`  ✗ exists  ${post.slug}`);
      continue;
    }
    data.posts.push({ ...post, oldUrl: post.oldUrl || "" });
    existingSlugs.add(post.slug);
    added++;
    console.log(`  ✓ added   ${post.slug}`);
  }

  console.log(`\n  Added: ${added}  Total posts: ${data.posts.length}`);

  if (!SAVE) { console.log("  Dry run — add --save to write.\n"); return; }

  writeFileSync(BLOG_JSON, JSON.stringify(data, null, 2), "utf-8");
  console.log("  ✅ Saved blog-posts.json\n");
}

main();
