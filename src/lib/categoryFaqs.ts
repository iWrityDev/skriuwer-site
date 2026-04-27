export interface Faq {
  q: string;
  a: string;
}

export const CATEGORY_FAQS: Record<string, Faq[]> = {
  history: [
    {
      q: "What are the best history books for beginners?",
      a: "Start with narrative history books — those written like stories rather than textbooks. Books on this page ranked highest by readers tend to be the most accessible. Look for titles described as 'readable' or 'for general audiences' rather than academic monographs.",
    },
    {
      q: "Are history books worth reading if you can just watch documentaries?",
      a: "Books go far deeper. A documentary on the Roman Empire covers 1,000 years in 45 minutes; a good history book spends 300 pages on one century and gives you real context, contradictions, and nuance. Books also let you re-read confusing sections and go at your own pace.",
    },
    {
      q: "Which history books are available in multiple languages?",
      a: "Many top history books are translated into German, Dutch, French, and other languages. On individual book pages you can check Amazon marketplaces for your country — links to Amazon US, UK, DE, and NL are provided for every title.",
    },
    {
      q: "How do I choose between ancient, medieval, and modern history books?",
      a: "Pick the era closest to what already interests you. Ancient history covers Rome, Greece, Egypt, and Mesopotamia. Medieval history focuses on the Middle Ages (500–1500 CE). Modern history covers everything from the Renaissance to today. Each era on this list includes the most reader-approved titles.",
    },
    {
      q: "Do these history books cite their sources?",
      a: "Most popular history books include a bibliography and endnotes. Academic-style histories tend to have more rigorous sourcing; narrative histories still cite their main claims but present them as part of the story. Check individual book descriptions for academic vs. popular framing.",
    },
  ],

  mythology: [
    {
      q: "What is the best mythology book for someone who knows nothing about it?",
      a: "Start with Greek mythology — it is the most widely written-about and the gateway to Norse, Egyptian, and Roman myths. Books on this page with the highest reader counts are proven entry points. Many are written for curious adults with no prior knowledge.",
    },
    {
      q: "How does Norse mythology differ from Greek mythology?",
      a: "Greek mythology is more orderly — gods live on Mount Olympus with clear hierarchies and interact with humans through heroes and quests. Norse mythology is rawer and more fatalistic, built around Ragnarok (the end of the gods) and a universe where even Odin will die. Both traditions are rich, but they have very different tones.",
    },
    {
      q: "Are mythology books suitable for children?",
      a: "It depends on the book and the age. Classic myths include violence, betrayal, and adult themes. Many books on this list are written for adult audiences. Some publishers produce family-friendly mythology retellings — check the description and age recommendation on individual book pages.",
    },
    {
      q: "What is the connection between mythology and modern culture?",
      a: "An enormous one. The names of the planets, the days of the week (Thursday = Thor's day), Marvel's Thor and Loki, the Odyssey's influence on everything from James Joyce to The Lion King — myth is the foundation of Western storytelling. Understanding mythology makes modern culture far more legible.",
    },
    {
      q: "Are these mythology books academic or popular?",
      a: "Most books on this list are popular non-fiction written for general readers, not academics. They are well-sourced but written in an engaging narrative style. A few titles by classics scholars are included for depth — those are noted in descriptions.",
    },
  ],

  "language-learning": [
    {
      q: "What is the fastest way to learn a new language?",
      a: "Immersion combined with structured vocabulary is the most effective approach. Bilingual books — where both languages appear side by side — let you read in the target language while staying unstuck. Adding daily listening (podcasts, shows) accelerates recognition. Consistency beats intensity.",
    },
    {
      q: "How many words do I need to know to have a basic conversation?",
      a: "Research suggests that 800–1,000 high-frequency words cover around 85% of everyday speech. The bilingual short story books on this page are designed around exactly this vocabulary range — each story reinforces the most common words through context rather than memorization.",
    },
    {
      q: "Can I learn a language just from books?",
      a: "Books alone build strong reading comprehension and vocabulary, but listening and speaking require additional practice. Use books as your core vocabulary and grammar foundation, then supplement with audio (podcasts, language exchange apps) once you have enough words to understand real speech.",
    },
    {
      q: "Which languages are the easiest for English speakers to learn?",
      a: "Spanish, Dutch, Norwegian, Swedish, and Danish are consistently rated the easiest for English speakers by the US Foreign Service Institute. Afrikaans and Frisian are even closer cousins to English. Languages like Hungarian, Finnish, Japanese, and Arabic require significantly more hours.",
    },
    {
      q: "Are bilingual books better than traditional textbooks?",
      a: "For vocabulary acquisition, yes — research on extensive reading shows that learners who read large amounts of comprehensible input outperform those who study grammar rules alone. Bilingual books remove the friction of looking up words and keep you reading longer. Textbooks are better for understanding grammar rules explicitly.",
    },
  ],

  "dark-history": [
    {
      q: "Why do people read about dark history?",
      a: "Understanding the worst of human history prevents its repetition. Dark history books examine genocides, atrocities, and moral failures in detail precisely so readers can recognise the warning signs — social pressure, dehumanisation, institutional failure — when they appear today.",
    },
    {
      q: "Are dark history books too disturbing to read?",
      a: "The best ones balance unflinching honesty with historical context, so you understand what happened without being left only with despair. Books on this list are selected for their analytical depth, not shock value. Reader reviews generally indicate if a book is exceptionally graphic.",
    },
    {
      q: "What is the difference between dark history and true crime?",
      a: "Dark history deals with mass atrocities, state violence, and the systemic failures that allowed historical horrors. True crime focuses on individual criminal acts, investigations, and perpetrators. Both explore dark human behaviour, but at different scales and with different analytical lenses.",
    },
    {
      q: "Which dark history books are most popular with readers?",
      a: "Books about hidden historical scandals, untold atrocities, and suppressed narratives consistently attract the most readers. Titles on this page are sorted by review count, so the most reader-tested books appear first.",
    },
    {
      q: "Do dark history books have a political agenda?",
      a: "The strongest ones don't — they present primary sources and documented evidence, letting readers draw their own conclusions. Be cautious of books that present only one side without engaging with opposing evidence. Look for books with detailed bibliographies and academic endorsements.",
    },
  ],

  conspiracy: [
    {
      q: "What separates a real conspiracy from a conspiracy theory?",
      a: "Real conspiracies — and history is full of them — are backed by documented evidence: leaked documents, whistleblower testimony, declassified files, court records. Conspiracy theories substitute speculation for evidence and are unfalsifiable by design. The books on this page focus on documented cover-ups, not speculation.",
    },
    {
      q: "Are conspiracy books just for people who distrust the government?",
      a: "Not at all. The most compelling books in this genre are written by journalists, historians, and investigators with documented sources. They're read by people who want to understand how institutions fail, how information gets suppressed, and how power actually operates — not just how it claims to.",
    },
    {
      q: "What are the best-documented historical conspiracies?",
      a: "The CIA's MKUltra mind-control programme (confirmed by declassified documents), Operation Northwoods (a proposed false-flag attack signed off by the Joint Chiefs), the tobacco industry's decades-long suppression of cancer research, and the Tuskegee syphilis experiment are among the most thoroughly documented. Books on this page cover many of these.",
    },
    {
      q: "How can I tell if a conspiracy book is credible?",
      a: "Look for a detailed bibliography, primary sources (not just YouTube links), and an author with a verifiable track record. The best books engage with counter-evidence rather than ignoring it. If a book claims certainty about things that can't be proven, treat it as entertainment rather than history.",
    },
  ],

  religion: [
    {
      q: "What are the best books about the history of the Bible?",
      a: "The books on this page that focus on biblical history examine how the Bible was written, compiled, and edited over centuries — drawing on archaeology, Dead Sea Scrolls scholarship, and textual analysis. They are written for general readers, not theologians, and approach the text as a historical document.",
    },
    {
      q: "Can I read religion books if I am not religious?",
      a: "Absolutely. The most insightful books about religion are written for curious readers regardless of personal belief. Understanding how major religions developed, what they teach, and how they shaped civilisation is essential for understanding history, politics, and culture worldwide.",
    },
    {
      q: "What is the difference between religious history and theology?",
      a: "Religious history examines how religions developed, spread, and changed over time — it is descriptive and evidence-based. Theology examines the internal logic and meaning of religious belief — it is prescriptive and often assumes the faith is true. Most books on this page are religious history, not theology.",
    },
    {
      q: "Which religion has the most books written about it?",
      a: "Christianity, given its historical dominance in the Western publishing market. But the books on this page cover Islam, Judaism, ancient pagan religions, and comparative religion as well. The best religion books explain each tradition on its own terms rather than comparing it unfavourably with others.",
    },
  ],

  "self-help": [
    {
      q: "Do self-help books actually work?",
      a: "Research shows that reading alone changes little unless paired with deliberate practice. The most effective self-help books give you specific, actionable techniques — not just inspiration. Books on this page with high review counts (thousands of readers) have the longest track records of working in the real world.",
    },
    {
      q: "What self-help book should I read first?",
      a: "Start with whatever problem is most pressing right now — habit-building, focus, anxiety, career. Books on this page are organised by reader popularity within the category. The top-ranked books are the ones that have helped the most people across the widest range of situations.",
    },
    {
      q: "Is self-help just a repackaging of common sense?",
      a: "Sometimes. The best books translate psychology research into practical systems — they aren't common sense because most people don't actually apply common-sense principles consistently. The worst books are thin motivation wrapped in anecdotes. Reader reviews on Amazon are the best filter for separating the two.",
    },
    {
      q: "How often should I read self-help books?",
      a: "Quality over quantity. Reading one book slowly, applying its core ideas for 30–90 days, and then moving on is more effective than reading ten books in a month. Most self-help books have one or two genuinely useful ideas — if you extract and apply those, the book has done its job.",
    },
  ],

  fiction: [
    {
      q: "What is the difference between literary fiction and genre fiction?",
      a: "Literary fiction prioritises style, character depth, and themes over plot. Genre fiction (thriller, fantasy, romance, sci-fi) prioritises plot, world-building, and reader satisfaction within established conventions. The best books often do both. Neither is inherently superior — it depends on what you want from reading.",
    },
    {
      q: "Are these fiction books available as ebooks?",
      a: "Most books on this page link to the Kindle edition where available, alongside paperback options. Amazon links will route you to your local Amazon store (UK, DE, NL, and more) so you can check availability and current pricing in your country.",
    },
    {
      q: "What fiction books are best for people who don't normally read?",
      a: "Start with fast-paced, plot-driven books rather than dense literary novels. Thrillers and crime fiction are the most reliably engaging for reluctant readers. Books on this page with the highest review counts tend to be the most compulsively readable — thousands of readers can't all be wrong.",
    },
    {
      q: "How do I find my next favourite book?",
      a: "The most reliable method: identify a book you loved, look at what readers who loved it also read, and start there. Our related books section on each book page does exactly this — it shows books with overlapping reader bases, which is a stronger signal than genre alone.",
    },
  ],

  science: [
    {
      q: "Do I need a science background to read popular science books?",
      a: "No. The books on this page are written for curious general readers, not specialists. The best popular science writers spend more time on why something matters than on technical detail. If you find a book getting too technical, look for an earlier book by the same author — they often have an entry-level title.",
    },
    {
      q: "What science books are most popular with general readers?",
      a: "Books about the brain, evolution, physics, and the universe consistently attract the largest audiences. Books on this page are sorted by reader review count, so the most widely read science books appear first.",
    },
    {
      q: "Are science books always factually accurate?",
      a: "Popular science books are generally well-researched, but they simplify and some overstate certainty. For cutting-edge topics (nutrition, psychology research), check the publication date — findings from a decade ago may have been revised. Books by active researchers tend to be more careful about caveats than those by science journalists.",
    },
    {
      q: "What is the difference between popular science and textbooks?",
      a: "Textbooks cover entire fields comprehensively and are written for students being assessed. Popular science books focus on specific ideas or discoveries, written for general readers who want to understand rather than pass exams. Popular science is typically far more enjoyable to read.",
    },
  ],

  biography: [
    {
      q: "What makes a biography worth reading?",
      a: "The best biographies reveal how decisions were made under pressure, what the subject actually believed (versus what they said), and what their life can teach you about navigating your own. Avoid hagiographies — books that treat their subject as flawless. The most revealing biographies are willing to show failures and contradictions.",
    },
    {
      q: "What is the difference between a biography and an autobiography?",
      a: "A biography is written by someone other than the subject, drawing on interviews, archives, and research. An autobiography (or memoir) is written by the subject themselves. Biographies tend to be more objective; autobiographies give you the subject's own voice but naturally reflect their perspective.",
    },
    {
      q: "Which biography books are most recommended for business readers?",
      a: "Biographies of entrepreneurs, investors, and business leaders are among the most read on this list. Books about founders who built and nearly destroyed their companies are the most instructive — they show both what works and what kills a great business.",
    },
    {
      q: "Are these biographies available in languages other than English?",
      a: "Many major biographies are translated into German, Dutch, French, Spanish, and other languages. Check the Amazon links on individual book pages — they route to your local Amazon store where local-language editions are listed when available.",
    },
  ],

  business: [
    {
      q: "What business books should I read first?",
      a: "Start with whatever stage of business you are currently in: idea stage (customer discovery, lean startup), building stage (operations, hiring, culture), or scaling stage (strategy, finance, leadership). Books on this page with the most reader reviews have the most proven track records across different industries.",
    },
    {
      q: "Are business books too theoretical to be useful?",
      a: "The worst ones are. The best business books are built around specific case studies, real decisions, and patterns you can apply immediately. Books with thousands of Amazon reviews from verified purchasers tend to be the ones that delivered real-world value rather than abstract frameworks.",
    },
    {
      q: "What finance books are good for beginners?",
      a: "Look for books about personal finance and investing fundamentals before moving to trading or corporate finance. Books written by practitioners (not academics) tend to be more practical. Books on this page are filtered to those with the strongest reader endorsements across multiple editions.",
    },
    {
      q: "How often do business books become outdated?",
      a: "Books about business principles (human motivation, negotiation, strategy) age slowly — the fundamentals change little. Books about technology, markets, or specific industries age quickly. Always check the publication date; a book about 'the future of tech' from 2015 may describe your present, not your future.",
    },
  ],

  psychology: [
    {
      q: "What psychology books are best for understanding human behaviour?",
      a: "Books on cognitive biases, decision-making, and social psychology are the most practically useful for understanding why people (including yourself) behave the way they do. The books on this page ranked highest by readers are consistently the ones that changed how readers see their own thinking.",
    },
    {
      q: "Do you need a psychology degree to read these books?",
      a: "No. Every book on this page is written for curious general readers. Many are written by researchers who are also skilled communicators — they translate research into clear examples and practical takeaways without requiring background knowledge.",
    },
    {
      q: "What is the difference between pop psychology and academic psychology?",
      a: "Academic psychology is published in peer-reviewed journals and written for specialists. Popular psychology translates that research for general audiences. The best popular psychology books cite rigorous studies and acknowledge uncertainty; the worst make sweeping claims from single studies. Reader reviews and author credentials are the best filters.",
    },
    {
      q: "Are psychology books useful for improving mental health?",
      a: "Books on cognitive behavioural therapy (CBT), mindfulness, and emotional regulation are evidence-backed and widely used as self-help tools. They supplement, but don't replace, professional support for serious mental health concerns. Many readers report significant benefits from applied reading of CBT-based books.",
    },
  ],

  "true-crime": [
    {
      q: "Why do people enjoy true crime books?",
      a: "True crime appeals to readers' interest in psychology, justice, and the limits of human behaviour. Readers want to understand how ordinary-seeming people commit extraordinary crimes, how investigators piece together cases, and what motivates criminal behaviour. It is less about the crime itself and more about the people behind it.",
    },
    {
      q: "Are true crime books suitable for sensitive readers?",
      a: "Many true crime books include graphic descriptions of violence. Books on this page vary significantly in their graphic content — check reader reviews for warnings before starting. Some focus more on investigation and psychology than on crime details, which suits readers who want the story without the disturbing imagery.",
    },
    {
      q: "What is the most popular type of true crime book?",
      a: "Serial killer profiles and cold case investigations attract the largest audiences. Books that combine psychological profiling with investigative journalism tend to be the most critically acclaimed — they explain the 'why' as well as the 'what.'",
    },
    {
      q: "Do true crime books change how cases are investigated?",
      a: "Sometimes significantly. Several cold cases have been reopened after true crime books or podcasts brought new attention or evidence. In rare cases, authors have discovered key evidence through their research. True crime writing has also driven reforms in wrongful conviction cases.",
    },
  ],

  philosophy: [
    {
      q: "Where should I start with philosophy if I am a complete beginner?",
      a: "Stoicism is the most accessible entry point for modern readers because it is practical, focused on daily life, and requires no prior philosophy background. Marcus Aurelius's Meditations and Epictetus's Enchiridion are the classic texts; several books on this page provide excellent modern introductions to the same ideas.",
    },
    {
      q: "Is philosophy still relevant today?",
      a: "More than ever. Questions about artificial intelligence, free will, political justice, consciousness, and what makes a good life are all philosophy questions that technology and politics have made urgent again. The philosophers who wrote about identity, power, and truth centuries ago often predicted exactly the tensions we face now.",
    },
    {
      q: "What is the difference between philosophy and self-help?",
      a: "Philosophy asks foundational questions (what is a good life? what can I know? what is real?) without necessarily answering them. Self-help assumes those answers and focuses on techniques to improve your current situation. Stoic philosophy is the clearest bridge between the two — it is philosophy that also functions as a daily practice.",
    },
    {
      q: "Do I need to read Plato and Aristotle before modern philosophy?",
      a: "No — but reading Plato first makes modern philosophy far richer because you will recognise what later philosophers were responding to. Several books on this page provide excellent overviews that give you the context without requiring you to read the originals first.",
    },
  ],

  frisian: [
    {
      q: "What is the Frisian language?",
      a: "West Frisian is a Germanic language spoken by around 450,000 people in the Dutch province of Friesland. It is the closest living relative of Old English — so close that some short sentences are mutually intelligible between Frisian and English. It has official language status in the Netherlands alongside Dutch.",
    },
    {
      q: "Is Frisian difficult to learn for English speakers?",
      a: "Frisian is one of the easier languages for English speakers because of their shared ancestry. The vocabulary overlaps significantly with English and Dutch. Grammar is more regular than English. Most learners with a Dutch background reach conversational level faster than in any other foreign language.",
    },
    {
      q: "Are there books available to learn Frisian?",
      a: "Yes — the books on this page include resources for learning West Frisian as a foreign language, as well as Frisian-language literature. Resources are more limited than for major languages, but the dedicated learner will find everything needed to reach conversational fluency.",
    },
    {
      q: "Why is Frisian worth learning?",
      a: "Frisian connects you to one of Europe's most distinctive cultural identities and to the oldest surviving Germanic writing outside of English and German. For anyone with Frisian ancestry or ties to Friesland, it is also a deeply personal connection to family and regional heritage.",
    },
  ],
};
