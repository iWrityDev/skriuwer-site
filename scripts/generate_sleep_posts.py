"""
Generates one SEO blog post per Learn While You Sleep YouTube video.
Each post targets "[topic] sleep story / sleep stories" keywords.
Run: python scripts/generate_sleep_posts.py
"""

import os
import re

BLOG_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "content", "blog")

# Full video list scraped from the channel playlist
VIDEOS = [
    ("bFhiobQej8s", "Daily Life in Ancient Rome | 5 Hour Sleep Story"),
    ("7E9c-gcUNGY", "7 Hours of EPIC Ancient Japanese History Facts"),
    ("YE_DN2gYguM", "7 Hours of EPIC British Empire History Facts"),
    ("pDD6BWyTOtE", "4 Hours of DARK Ancient Mesopotamia History Facts"),
    ("iC-0mlMBrV0", "The HIDDEN History of the Jews"),
    ("vY_YNKaJa0Q", "4 Hours of DARK Seven Wonders of the Ancient World"),
    ("4lcuWzNEVYo", "The HIDDEN History of Ancient Rome"),
    ("tayaxLQ6ziI", "4 Hours of DARK Ancient Ritual History Facts"),
    ("rBOMgDaDkHs", "3 Hours of EPIC British Empire History Facts"),
    ("Y0IoQt4VLYQ", "Spanish Flu History To Fall Asleep To"),
    ("4kjk892Ak9g", "1 Hour of EPIC Napoleonic Wars History Facts"),
    ("AzmLG5AGC2I", "2 Hours of EPIC Black Death History Facts"),
    ("8px23DF31AQ", "3 Hours of DARK Ancient History: Pompeii and Herculaneum"),
    ("pO3jUdqAIs8", "3 Hours: The Rise and Fall of Ancient Babylon"),
    ("gVI6wnAidvA", "4 Hours: The Rise and Fall of Carthage"),
    ("TE5AxR6keJU", "3 Hours of MYSTERIOUS Minoan Civilization History Facts"),
    ("dJtXqxRmJL0", "3 Hours of DARK Assyrian Empire History Facts"),
    ("7vGqvyYvXyM", "5 Hours of DARK Ancient Rituals History Facts"),
    ("NxWfS842Y5k", "6 Hours of FORGOTTEN African Kingdom History Facts"),
    ("8efB2v2CUHU", "5 Hours of EPIC Persian Empire History Facts"),
    ("_YdZGDbCSFE", "4 Hours of CRAZY Medieval History Facts"),
    ("PzIoosCmzEs", "5 Hours of CRAZY History Stories"),
    ("dH0fyxgIWD8", "5 Hours of MYSTERIOUS Olmec Civilization History Facts"),
    ("LWKQ5u0bw_A", "5 Hours of FASCINATING Hittite Empire History Facts"),
    ("KkymbYqkUOQ", "4 Hours of DARK Maya Civilization History Facts"),
    ("kQDTP3SEwAA", "5 Hours of FORGOTTEN Israelite History Facts"),
    ("smWRQBthrAE", "4 Hours of MYSTERIOUS Indus Valley Civilization History Facts"),
    ("Zo_zBNo24Yo", "4 Hours of DARK Aztec Empire History Facts"),
    ("x21y_771CHI", "5 Hours of FASCINATING Inca Empire History Facts"),
    ("5KK6daRqdh4", "SCARY Ancient Greek History Facts"),
    ("kgcIThbHldI", "SCARY Ancient Civilization History Facts"),
    ("UaxpbmFpIaA", "5 Hours of SCARY Roman History Facts"),
    ("vuioHkeALBo", "5 Hours: What if the USA Never Existed? Alternate History"),
    ("ToKn72uM2y4", "3 Hours of SCARY Ancient History Facts"),
    ("WrLML7VW6yE", "4 Hours of SCARY Medieval History Facts"),
    ("MvD44c7_ZTE", "3 Hours of FASCINATING US History Facts"),
    ("MQB--vCQI3A", "3 Hours of AMAZING Ancient China History Facts"),
    ("Huul7Kc-RGU", "2 Hours of FASCINATING Christmas History Facts"),
    ("aFwQTu4PV8c", "3 Hours of EPIC World History Facts"),
    ("O6_2h9cZY0A", "3 Hours of FASCINATING Ancient Egypt History Facts"),
    ("8jVMQR-MDLw", "4 Hours of FASCINATING Ancient History Facts"),
    ("wwOdkF3A--E", "3 Hours of FASCINATING Ottoman Empire History Facts"),
    ("nKxXUmMcGlk", "The SHOCKING Truth About African Colonization History"),
    ("II-w1DiZgSY", "3 Hours of AMAZING European History Facts"),
    ("42AeNGwplDU", "2 Hours of EPIC Ancient Greek History Facts"),
    ("nux6lamFJug", "6 Hours of Ancient History's GREATEST Mysteries"),
    ("X6fjjLmy88A", "6 Hours of Fascinating Islam History Facts"),
    ("EMC6dgbOIkg", "5 Hours of SHOCKING Civil War History Facts"),
    ("7oDRYjw7N-c", "7 Hours of EPIC Roman Empire History Facts"),
    ("Uf1_VBvGKFc", "5 Hours of FASCINATING Gothic Cathedral History Facts"),
    ("4PICzeBwizs", "6 Hours of EPIC Crusader History Facts"),
    ("QeO9zi5RV-s", "6 Hours of Stone Age SECRETS"),
    ("cG7xM-rNKNw", "The FASCINATING History of the Hittite Empire"),
    ("vTPTWd_vlU8", "The DARK Secrets of Bronze Age Greek History"),
    ("f49at5x8wdo", "4 Hours of DARK Ancient History Facts"),
    ("nlHRv1asiak", "4 Hours of EPIC Roman Empire History Facts"),
    ("gIUtfIWSmXw", "6 Hours of EPIC War History Facts"),
    ("t2LT4cGmTPU", "Life Inside an Ancient Egyptian Home | 4 Hour Sleep Story"),
    ("ypSCfGc_nFs", "Daily Life in Ancient Egypt | 5 Hour Sleep Story"),
    ("LMd5m4lnnzk", "The ENTIRE Story of Greek Mythology | 4 Hour Sleep Story"),
    ("b8tfGiJdg-k", "2 Hours of EPIC History of Medieval England"),
    ("enBxN9n5PiY", "1 Hour of EPIC WW2 History Facts"),
    ("Vh61K3tc3YU", "1 Hour of EPIC Medieval History Facts"),
]

# Topic data: keyword → (intro paragraph, books list)
TOPIC_DATA = {
    "roman": {
        "slug_keyword": "roman",
        "intro": """Rome was not built in a day, and it did not fall in one either. The Roman Empire's collapse took three centuries of frontier pressure, economic strain, political instability, and slow institutional decay — which is one reason it is so fascinating. There was no single moment of failure. There were hundreds of them, each individually survivable, collectively fatal. Sleep stories covering {topic} give you access to this enormous span of history in the most natural format available: a calm voice, the dark, and hours of material that carries you from one world into the next.""",
        "books": [
            ("SPQR by Mary Beard", "the best one-volume introduction to Roman history written in the last twenty years. Asks questions the traditional histories skip."),
            ("The Fall of the Roman Empire by Peter Heather", "the definitive modern account of why Rome collapsed, written against the grain of conventional wisdom."),
            ("Rubicon by Tom Holland", "the late Republic and the civil wars that produced the Empire. Reads like a political thriller."),
            ("I, Claudius by Robert Graves", "fiction, but so grounded in Suetonius and Tacitus that it has taught more people about early imperial Rome than most academic works."),
        ]
    },
    "egypt": {
        "slug_keyword": "ancient-egypt",
        "intro": """Ancient Egypt is the longest-running civilization in human history. Three thousand years of continuous cultural identity, broken by invasions and internal collapse but always reassembling around the same geography, the same gods, the same symbolic language. When you listen to sleep stories about {topic}, you are absorbing a narrative so long that the pyramids were already ancient ruins by the time Cleopatra was born. The pharaohs of the New Kingdom were as distant from Cleopatra as she is from us.""",
        "books": [
            ("The Oxford History of Ancient Egypt edited by Ian Shaw", "the scholarly standard. Dense but authoritative."),
            ("Tutankhamen by Howard Carter", "Carter's own account of discovering the tomb. Reads like a thriller."),
            ("The Complete Gods and Goddesses of Ancient Egypt by Richard Wilkinson", "every deity in the Egyptian pantheon, with their myths and regional variations."),
            ("Egyptian Book of the Dead translated by E.A. Wallis Budge", "the primary source for Egyptian mythology and the afterlife. Demanding but irreplaceable."),
        ]
    },
    "japanese": {
        "slug_keyword": "ancient-japan",
        "intro": """Japanese history is one of the most distinctive civilizational stories on earth. An island nation that absorbed Chinese culture and made it unrecognizable, that produced a warrior aristocracy unlike anything in the medieval West, that closed itself to the outside world for two centuries and then opened overnight — Japan is a civilization of radical transformations disguised as stability. Sleep stories covering {topic} take you from the mythological origins of the islands through the samurai era and into the forces that made modern Japan.""",
        "books": [
            ("The Tale of Genji by Murasaki Shikibu", "the world's first novel, written in eleventh-century Japan by a court lady. Extraordinary."),
            ("Japan: A Short Cultural History by G.B. Sansom", "the classic overview. Still the most comprehensive single-volume cultural history."),
            ("Shogun by James Clavell", "fiction, but a deeply researched portrait of feudal Japan that has introduced more readers to the period than any academic work."),
            ("The Samurai by Eiichi Aoki", "the history of Japan's warrior class from origins to the Meiji abolition."),
        ]
    },
    "british empire": {
        "slug_keyword": "british-empire",
        "intro": """At its peak, the British Empire covered a quarter of the earth's land surface and governed a quarter of its population. It was the largest empire in human history by those measures — and also one of the most contradictory. The same institution that abolished the slave trade ran plantation economies in the Caribbean for decades after abolition, enforced opium imports on China at gunpoint, and described itself throughout as a civilizing mission. Sleep stories covering {topic} take you through this complexity without resolving it artificially.""",
        "books": [
            ("Empire by Niall Ferguson", "the controversial case for the British Empire's positive legacy. Essential reading whether you agree or not."),
            ("The Anarchy by William Dalrymple", "the East India Company's takeover of the Mughal Empire. One of the best history books of recent years."),
            ("Inglorious Empire by Shashi Tharoor", "the counter-argument to Ferguson. India's perspective on the same history."),
            ("Churchill's Empire by Richard Toye", "Churchill's relationship with empire — more complicated and darker than the hagiographies suggest."),
        ]
    },
    "mesopotamia": {
        "slug_keyword": "ancient-mesopotamia",
        "intro": """Mesopotamia invented writing, the wheel, the city, the legal code, and the concept of organized irrigation agriculture — in roughly that order, over about five thousand years. The civilizations of ancient Mesopotamia are the oldest we have detailed records of, which makes sleep stories covering {topic} genuinely unlike anything else in the genre: you are listening to the very beginning of recorded human history.""",
        "books": [
            ("The Epic of Gilgamesh translated by Andrew George", "the world's oldest surviving story. Gilgamesh predates Homer by fifteen centuries."),
            ("Mesopotamia: The Invention of the City by Gwendolyn Leick", "the history of the world's first urban civilization from a scholar who spent her career there."),
            ("The Sumerians by Samuel Noah Kramer", "the foundational English-language history of the world's first civilization."),
        ]
    },
    "seven wonders": {
        "slug_keyword": "seven-wonders-ancient-world",
        "intro": """Only one of the Seven Wonders of the Ancient World still stands. The Great Pyramid of Giza has outlasted the Colossus of Rhodes, the Lighthouse of Alexandria, the Temple of Artemis, the Statue of Zeus, the Mausoleum at Halicarnassus, and the Hanging Gardens of Babylon — which may never have existed in the form the ancient writers described. Sleep stories covering {topic} take you through what we actually know about each monument versus what legend has added over two thousand years of retelling.""",
        "books": [
            ("The Seven Wonders of the Ancient World edited by Peter Clayton", "the scholarly account of all seven monuments, separating evidence from tradition."),
            ("The Histories by Herodotus", "the ancient primary source that described many of these monuments firsthand."),
        ]
    },
    "ritual": {
        "slug_keyword": "ancient-rituals",
        "intro": """Every ancient civilization practiced rituals that look, from the outside, somewhere between strange and horrifying. Human sacrifice in Carthage and Mesoamerica. Bull-leaping in Minoan Crete. The Roman practice of reading the future in animal entrails. The Aztec calendar system built around keeping the sun alive through blood. Sleep stories covering {topic} take these practices seriously — not as evidence of barbarism, but as technologies for managing a world in which the gods were real and their favor genuinely mattered.""",
        "books": [
            ("The Sacred and the Profane by Mircea Eliade", "the philosophical framework for understanding ritual behavior across all cultures."),
            ("Religion in Ancient Rome by Ken Dowden", "the Roman religious system from the inside — not as superstition, but as a coherent way of managing divine-human relationships."),
            ("The Golden Bough by James George Frazer", "the foundational (and controversial) comparative mythology study. Enormous, flawed, and still essential."),
        ]
    },
    "babylon": {
        "slug_keyword": "ancient-babylon",
        "intro": """Babylon was the largest city on earth for most of the period between 1770 BCE and 500 BCE. It gave us the Hammurabi law code — one of the first written legal systems in history. It gave us the Tower of Babel, or at least the ziggurat that inspired it. It was conquered by Cyrus the Great, then Alexander, then gradually abandoned as the rivers shifted and the trade routes moved. Sleep stories covering {topic} take you through one of the great urban civilizations of the ancient world.""",
        "books": [
            ("Babylon: Mesopotamia and the Birth of Civilization by Paul Kriwaczek", "the most accessible one-volume history of Babylonian civilization."),
            ("The Epic of Gilgamesh translated by Andrew George", "the story that Babylon preserved and passed on. The oldest adventure narrative in human history."),
        ]
    },
    "carthage": {
        "slug_keyword": "ancient-carthage",
        "intro": """Carthage was destroyed so thoroughly that almost none of its own writing survives. Everything we know about Carthage comes from the Romans who defeated it — which means we are reading history written by the victors about a civilization they worked hard to erase. Carthage was the major Mediterranean commercial power for four centuries. It clashed with Rome three times. Three times Rome nearly lost. The third time, Rome won completely, and the city that had challenged them for supremacy was demolished stone by stone. Sleep stories covering {topic} reconstruct what we know from archaeology and hostile sources.""",
        "books": [
            ("Carthage Must Be Destroyed by Richard Miles", "the definitive English-language history of Carthage. Excellent on the archaeology and what it reveals about the Carthaginian perspective."),
            ("Hannibal by Patrick Hunt", "the life of the general who came closest to ending Rome, told with the military detail it deserves."),
        ]
    },
    "minoan": {
        "slug_keyword": "minoan-civilization",
        "intro": """The Minoans built Europe's first palace civilization on Crete, created the first known European writing systems (Linear A remains undeciphered), and produced art so sophisticated that nineteenth-century archaeologists refused to believe it was actually ancient. Then, around 1450 BCE, Minoan civilization collapsed — almost certainly following a catastrophic volcanic eruption on the nearby island of Thera, possibly the largest eruption in recorded human history. Sleep stories covering {topic} take you into one of the most mysterious civilizations in the ancient world.""",
        "books": [
            ("The Minoans by Rodney Castleden", "a careful reconstruction of Minoan society from the archaeological evidence."),
            ("1177 B.C.: The Year Civilization Collapsed by Eric Cline", "the broader Bronze Age collapse that ended the Minoans and many other civilizations simultaneously."),
        ]
    },
    "assyrian": {
        "slug_keyword": "assyrian-empire",
        "intro": """The Assyrian Empire was the first true empire in history by modern definitions: a centralized state that conquered and administered a large, multiethnic territory. The Assyrians were also, by ancient standards, exceptionally brutal. Their own inscriptions describe mass deportations, systematic torture of enemies, and the deliberate destruction of cities as policy. This ruthlessness was not incidental to their success — it was a calculated strategy for making rebellion seem more costly than submission. Sleep stories covering {topic} take you into one of antiquity's most formidable and least sentimentalized states.""",
        "books": [
            ("The Might That Was Assyria by H.W.F. Saggs", "the standard English-language history of the Assyrian Empire."),
            ("Daily Life in Ancient Mesopotamia by Karen Rhea Nemet-Nejat", "the social history behind the military achievements."),
        ]
    },
    "african kingdom": {
        "slug_keyword": "african-kingdoms",
        "intro": """African history before European colonization is one of the most systematically neglected areas of popular historiography. The kingdoms of Mali, Songhai, Kush, Aksum, Zimbabwe, Benin, and dozens of others were sophisticated, wealthy, and complex states — some controlling trade routes that made their rulers among the richest people on earth. Sleep stories covering {topic} restore what colonial-era historiography deliberately omitted.""",
        "books": [
            ("The Fate of Africa by Martin Meredith", "modern African history from independence to the present, with essential colonial context."),
            ("Sundiata: An Epic of Old Mali translated by D.T. Niane", "the founding epic of the Mali Empire. The African equivalent of the Iliad."),
            ("African Kingdoms by Basil Davidson", "the foundational survey of sub-Saharan African civilizations before European contact."),
        ]
    },
    "persian": {
        "slug_keyword": "persian-empire",
        "intro": """The Persian Empire under Cyrus and his successors was the largest empire the world had seen to that point. It stretched from Greece to India, governed dozens of different languages and cultures, and operated a remarkably sophisticated administrative system that allowed local traditions to survive under Persian suzerainty. Sleep stories covering {topic} cover everything from Cyrus's revolutionary approach to conquered peoples through the wars with Greece and the eventual conquest by Alexander.""",
        "books": [
            ("The Persian Empire by A.T. Olmstead", "the classic comprehensive history of the Achaemenid Persian Empire."),
            ("Persian Fire by Tom Holland", "the Greco-Persian wars told from both sides. Reads like an epic."),
            ("Cyrus the Great by Larry Hedrick", "the life of history's first great conqueror who was also, unusually, humane."),
        ]
    },
    "maya": {
        "slug_keyword": "maya-civilization",
        "intro": """The Maya are one of the few pre-Columbian civilizations that independently developed a complete writing system, accurate astronomical calculations, and zero as a mathematical concept. Their calendar predicted astronomical events centuries in advance. They built cities in the Mesoamerican jungle without metal tools, the wheel, or draft animals. And their civilization did not simply collapse — it experienced a series of regional collapses across different centuries, with some areas flourishing long after others had been abandoned. Sleep stories covering {topic} take you into one of the most sophisticated ancient cultures in the Americas.""",
        "books": [
            ("The Ancient Maya by Robert J. Sharer", "the scholarly standard on Maya civilization."),
            ("Breaking the Maya Code by Michael Coe", "the story of how Maya hieroglyphics were deciphered. Reads like a detective story."),
            ("2012 and the End of the World edited by Matthew Restall", "separates Maya calendar fact from apocalypse myth."),
        ]
    },
    "aztec": {
        "slug_keyword": "aztec-empire",
        "intro": """The Aztec Empire was built in less than two centuries and conquered by the Spanish in under two years. In between, it built one of the largest cities in the world at Tenochtitlan, developed an elaborate tributary empire across central Mexico, and created a religious system that demanded regular human sacrifice on a scale that still shocks historians. When Cortes arrived in 1519, he found a civilization of genuine complexity and power — and then dismantled it using a combination of disease, alliance with the empire's enemies, and brutal military tactics. Sleep stories covering {topic} give the full picture.""",
        "books": [
            ("The Aztecs by Inga Clendinnen", "the cultural history of Aztec civilization from a scholar who spent decades studying it."),
            ("Conquest by Hugh Thomas", "the definitive account of the Spanish conquest of Mexico."),
            ("Aztec by Gary Jennings", "fiction, but extraordinarily researched. One of the most immersive historical novels about pre-Columbian America."),
        ]
    },
    "inca": {
        "slug_keyword": "inca-empire",
        "intro": """The Inca Empire was the largest empire in pre-Columbian America and, at its height, the largest empire in the world. It controlled a territory stretching 4,000 kilometres along the Andes, governed dozens of distinct ethnic groups, and built a road network that rivalled Rome's — without iron tools, the wheel, or a written language. Instead of writing, the Incas used quipu: knotted strings that recorded numerical data and possibly narratives in a system we have still not fully deciphered. Sleep stories covering {topic} take you into a civilization that operated on entirely different principles from anything in the Old World.""",
        "books": [
            ("The Last Days of the Incas by Kim MacQuarrie", "the Spanish conquest of the Inca Empire told with the pace of a thriller."),
            ("At the Crossroads of the Earth and the Sky by Gary Urton", "the Inca astronomical system and its relationship to Andean religion."),
        ]
    },
    "ottoman": {
        "slug_keyword": "ottoman-empire",
        "intro": """The Ottoman Empire lasted longer than the Roman Empire. From its founding in the late thirteenth century to its dissolution after World War One, it governed southeastern Europe, Anatolia, the Middle East, and North Africa for over six centuries. It conquered Constantinople — ending the Byzantine Empire — in 1453. At its height under Suleiman the Magnificent, it was the most powerful state in the world. Sleep stories covering {topic} take you through an imperial history that shaped the modern Middle East more directly than any other.""",
        "books": [
            ("The Ottoman Empire by Halil Inalcik", "the scholarly standard by the leading Ottoman historian of the twentieth century."),
            ("Lords of the Horizons by Jason Goodwin", "the popular history of the Ottoman Empire. Atmospheric and readable."),
            ("A Peace to End All Peace by David Fromkin", "how the Ottoman collapse after WW1 created the modern Middle East."),
        ]
    },
    "crusader": {
        "slug_keyword": "crusaders",
        "intro": """The Crusades were never purely a religious enterprise. The religious motivation was real for many participants — but the political calculations of European kings, the commercial interests of Italian merchants, and the complex internal politics of the Islamic world all shaped the Crusades as decisively as theology did. Sleep stories covering {topic} take you through the two centuries of expeditions, kingdoms, and military orders that defined the relationship between Christian Europe and the Islamic Middle East — a relationship whose effects are still visible today.""",
        "books": [
            ("The Crusades by Thomas Asbridge", "the best single-volume history of the Crusades available. Balanced and comprehensive."),
            ("God's War by Christopher Tyerman", "the scholarly standard. More demanding than Asbridge but indispensable for serious readers."),
            ("The First Crusade by Peter Frankopan", "the Crusades from the Byzantine perspective. Changes the familiar narrative significantly."),
        ]
    },
    "stone age": {
        "slug_keyword": "stone-age",
        "intro": """The Stone Age covers roughly 99 percent of human history. Everything else — agriculture, cities, writing, empires, industrialisation — fits into the remaining one percent. The humans who lived through the Paleolithic and Neolithic periods were cognitively identical to us, facing challenges of survival that required sophisticated social structures, environmental knowledge, and technology that we have largely lost the ability to replicate. Sleep stories covering {topic} take you into the longest chapter of the human story.""",
        "books": [
            ("The Dawn of Everything by David Graeber and David Wengrow", "a complete rethink of how early human societies were organized. One of the most important history books of recent years."),
            ("Sapiens by Yuval Noah Harari", "the broadest overview of human history, starting from the Stone Age."),
            ("The Old Stone Age by François Bordes", "the archaeological science behind what we actually know about Paleolithic life."),
        ]
    },
    "hittite": {
        "slug_keyword": "hittite-empire",
        "intro": """The Hittites controlled Anatolia for over five hundred years, fought Egypt to a standstill at Kadesh in 1274 BCE in one of the earliest recorded battles in history, and then vanished so completely from the historical record that nineteenth-century scholars doubted they had existed at all. Their decipherment revealed a sophisticated legal system, an extensive archive of diplomatic correspondence, and a mythology that contributed elements to both Greek religion and the Hebrew Bible. Sleep stories covering {topic} take you into one of the ancient world's most underappreciated powers.""",
        "books": [
            ("The Hittites by O.R. Gurney", "the classic introduction to Hittite history and culture."),
            ("1177 B.C.: The Year Civilization Collapsed by Eric Cline", "the Bronze Age collapse that ended the Hittite Empire along with almost everything else."),
        ]
    },
    "olmec": {
        "slug_keyword": "olmec-civilization",
        "intro": """The Olmec are called the mother culture of Mesoamerica. They built the first cities in the Americas, created the first Mesoamerican writing system, and established the religious and political patterns that the Maya, Aztec, and every other Mesoamerican civilization would later follow. They also carved colossal stone heads — some weighing up to forty tons — depicting rulers with distinctive features, transported across roadless jungle from quarries fifty miles away. Sleep stories covering {topic} take you into a civilization that archaeology is still piecing together.""",
        "books": [
            ("The Olmecs: America's First Civilization by Richard Diehl", "the definitive scholarly overview."),
            ("1491 by Charles C. Mann", "the Americas before Columbus, including extensive coverage of Mesoamerican civilizations."),
        ]
    },
    "indus valley": {
        "slug_keyword": "indus-valley-civilization",
        "intro": """The Indus Valley Civilization was contemporary with ancient Sumer and Egypt — and in some respects more sophisticated. Its cities had standardized brick sizes, sophisticated sewage systems, and grain storage facilities that suggest a level of urban planning Rome would not match for another two thousand years. We cannot read their script. We do not know what they called themselves. We do not know why their civilization declined around 1900 BCE. Sleep stories covering {topic} take you into one of history's great mysteries.""",
        "books": [
            ("The Indus Civilization by Mortimer Wheeler", "the foundational archaeological study by the scholar who excavated the major Indus Valley sites."),
            ("The Lost River by Michel Danino", "the Saraswati River and its relationship to the Indus Valley collapse."),
        ]
    },
    "israelite": {
        "slug_keyword": "ancient-israel",
        "intro": """The history of ancient Israel is simultaneously one of the most documented and one of the most contested subjects in historical scholarship. The Hebrew Bible is an extraordinary historical source — but it was written by authors with theological and political agendas, edited over centuries, and does not always align with the archaeological record. Sleep stories covering {topic} take you through what we actually know about the kingdoms of Israel and Judah, the Babylonian exile, and the origins of monotheism.""",
        "books": [
            ("The Bible Unearthed by Israel Finkelstein", "the archaeology of ancient Israel and what it confirms or contradicts in the biblical narrative."),
            ("A History of God by Karen Armstrong", "the evolution of monotheism from Abraham through Islam."),
        ]
    },
    "black death": {
        "slug_keyword": "black-death",
        "intro": """The Black Death killed between a third and half of Europe's population between 1347 and 1351. In some regions the mortality was higher. Florence lost more than half its population. Entire villages were abandoned. The social and economic consequences — the collapse of the feudal labour system, the questioning of Church authority, the acceleration of the Italian Renaissance — shaped everything that came after. Sleep stories covering {topic} take you through one of the defining catastrophes of human history.""",
        "books": [
            ("The Great Mortality by John Kelly", "the best narrative account of the Black Death in English. Gripping and meticulously researched."),
            ("A Distant Mirror by Barbara Tuchman", "the fourteenth century in full, including the plague and its aftermath."),
            ("Plagues and Peoples by William McNeill", "the broader history of infectious disease as a driver of historical change."),
        ]
    },
    "spanish flu": {
        "slug_keyword": "spanish-flu",
        "intro": """The 1918 influenza pandemic killed more people than World War One — some estimates put the death toll at fifty million, others higher. It spread worldwide in three waves, killed young healthy adults at disproportionate rates (the opposite of normal flu patterns), and operated largely invisibly because governments suppressed reporting to maintain wartime morale. Spain was the only major country that reported it honestly, which is why it was called the Spanish Flu despite almost certainly not originating there. Sleep stories covering {topic} take you through a catastrophe that has been consistently underrepresented in historical memory.""",
        "books": [
            ("The Great Influenza by John Barry", "the definitive account of the 1918 pandemic. Authoritative and terrifying."),
            ("Pale Rider by Laura Spinney", "the global history of the pandemic, covering its impact across six continents."),
        ]
    },
    "napoleon": {
        "slug_keyword": "napoleonic-wars",
        "intro": """Napoleon Bonaparte rose from a minor Corsican noble family to become Emperor of the French in fifteen years. He reformed the legal system of France and most of Europe, fought more than sixty battles and lost only a handful, and was ultimately defeated not by military genius on the part of his opponents but by the strategic reality of a continent that refused to stay conquered. Sleep stories covering {topic} take you through the most dramatic quarter-century in European history before the twentieth century.""",
        "books": [
            ("Napoleon by Andrew Roberts", "the comprehensive modern biography. Roberts had access to Napoleon's letters and it shows."),
            ("The Campaign of 1812 by Adam Zamoyski", "Napoleon's Russian disaster in full detail."),
            ("Waterloo by Bernard Cornwell", "fiction, but Cornwell's battle research is exhaustive. The best way to understand what Waterloo actually felt like on the ground."),
        ]
    },
    "pompeii": {
        "slug_keyword": "pompeii-and-herculaneum",
        "intro": """On 24 August 79 CE, Mount Vesuvius erupted and buried the city of Pompeii under four metres of volcanic ash, preserving it almost perfectly until its rediscovery in the eighteenth century. What emerged was something unprecedented in archaeology: a complete Roman city, frozen at a single moment. Shops with price lists still on the walls. Graffiti. Electoral slogans. Lovers' messages. The bodies of people who did not escape in time. Sleep stories covering {topic} take you into the best-preserved snapshot of daily Roman life that exists.""",
        "books": [
            ("Pompeii by Robert Harris", "fiction, but brilliantly researched. Tells the story of the eruption through an engineer's eyes."),
            ("The Fires of Vesuvius by Mary Beard", "the scholarly account of what Pompeii actually tells us about Roman life."),
            ("Pompeii by Paul Roberts", "the British Museum's definitive illustrated history."),
        ]
    },
    "us history": {
        "slug_keyword": "us-history",
        "intro": """American history is 250 years old and has generated more historical writing than any other national history on earth. The sheer volume of material makes finding the good work difficult. Sleep stories covering {topic} cut through the mythology — the founding fathers as demigods, the frontier as empty, the civil war as a quarrel over abstract principles — and give you the actual political, economic, and social forces that made the United States what it is.""",
        "books": [
            ("A People's History of the United States by Howard Zinn", "American history told from the bottom up. Controversial and essential."),
            ("These Truths by Jill Lepore", "the single best one-volume history of the United States written in recent years."),
            ("The Warmth of Other Suns by Isabel Wilkerson", "the Great Migration of African Americans from the South to the North. One of the great history books of the century."),
        ]
    },
    "ancient china": {
        "slug_keyword": "ancient-china",
        "intro": """China has the longest continuous recorded history of any civilization on earth. The first dynasty with confirmed archaeological evidence dates to 1600 BCE, and Chinese historical records extend in an unbroken line from there to the present. Sleep stories covering {topic} take you through a history that encompasses the Warring States period, the unification under Qin, the Han dynasty that shaped Chinese identity for two millennia, and everything that followed — a narrative so long that most Western history fits inside it.""",
        "books": [
            ("China: A History by John Keay", "the best one-volume survey of Chinese history for general readers."),
            ("The Art of War by Sun Tzu", "the foundational text of Chinese strategic thought. Short but inexhaustible."),
            ("The Search for Modern China by Jonathan Spence", "China from the late Ming dynasty to the present. The standard university text."),
        ]
    },
    "civil war": {
        "slug_keyword": "us-civil-war",
        "intro": """The American Civil War killed 620,000 soldiers and an unknown number of civilians — a death toll that exceeds American casualties in every other war combined. It was fought over slavery, whatever the post-war mythology said about states' rights, and it resolved the question of whether the United States would remain a slaveholding republic by the only means available after forty years of failed political compromise: violence. Sleep stories covering {topic} take you through four years of industrial slaughter and political crisis that permanently changed what America was.""",
        "books": [
            ("Battle Cry of Freedom by James McPherson", "the Pulitzer Prize-winning single-volume history of the Civil War. The standard."),
            ("Team of Rivals by Doris Kearns Goodwin", "Lincoln and his cabinet. The political genius of managing competing egos during a national emergency."),
            ("The Civil War by Shelby Foote", "the three-volume narrative history. Foote writes like a novelist. Controversial for its Southern perspective but essential reading."),
        ]
    },
    "european history": {
        "slug_keyword": "european-history",
        "intro": """European history from the fall of Rome to the present is a 1,500-year story of political fragmentation slowly hardening into nation-states, religious uniformity fracturing into endless schism, and a series of catastrophic wars each of which seemed to set the conditions for the next. Sleep stories covering {topic} give you the broad sweep of a civilization that remade itself repeatedly — through the Renaissance, the Reformation, the Enlightenment, the revolutions of 1848, and the two world wars that defined the twentieth century.""",
        "books": [
            ("Postwar by Tony Judt", "Europe from 1945 to the present. The definitive account of how the continent rebuilt itself."),
            ("The Guns of August by Barbara Tuchman", "the first month of WW1 and the decisions that locked Europe into catastrophe."),
            ("Europe: A History by Norman Davies", "the most ambitious single-volume European history in English. 1,300 pages and worth every one."),
        ]
    },
    "ancient greek": {
        "slug_keyword": "ancient-greek-history",
        "intro": """Ancient Greece was not a unified civilization. It was a collection of city-states — often at war with each other — that shared a language, a religious tradition, and a competitive athletic culture. Athens and Sparta were contemporary civilizations with almost nothing in common beyond their Greekness. The wars with Persia, the plague that devastated Athens, the Peloponnesian War that ended Athenian supremacy, and the eventual conquest by Macedon all happened within a single extraordinary century. Sleep stories covering {topic} take you into one of the richest periods in human cultural history.""",
        "books": [
            ("The Histories by Herodotus", "the first work of history in the Western tradition. Still the most entertaining."),
            ("The Peloponnesian War by Thucydides", "the defining account of Athens and Sparta at war. Political science as much as history."),
            ("The Fate of Rome by Kyle Harper", "how climate change and pandemic disease destroyed the classical world."),
        ]
    },
    "ottoman empire": {
        "slug_keyword": "ottoman-empire",
        "intro": """The Ottoman Empire lasted longer than the Roman Empire. From its founding in the late thirteenth century to its dissolution after World War One, it governed southeastern Europe, Anatolia, the Middle East, and North Africa for over six centuries. Sleep stories covering {topic} take you through an imperial history that shaped the modern Middle East more directly than any other.""",
        "books": [
            ("The Ottoman Empire by Halil Inalcik", "the scholarly standard."),
            ("Lords of the Horizons by Jason Goodwin", "atmospheric and readable popular history."),
            ("A Peace to End All Peace by David Fromkin", "how the Ottoman collapse created the modern Middle East."),
        ]
    },
    "islam": {
        "slug_keyword": "islamic-history",
        "intro": """Islamic civilization was, for five centuries after the death of Muhammad, the most sophisticated on earth by almost any measure: science, medicine, philosophy, mathematics, astronomy, architecture. The House of Wisdom in Baghdad preserved and extended Greek learning while Europe was in the early medieval period. The translation movement that brought Aristotle back to Europe came through Arabic intermediaries. Sleep stories covering {topic} take you through a history that Western education has consistently undersold.""",
        "books": [
            ("In the Shadow of the Sword by Tom Holland", "the origins of Islam in late antique Arabia. Controversial and meticulously researched."),
            ("The House of Wisdom by Jim Al-Khalili", "how Islamic scholars saved and extended Greek science."),
            ("A History of God by Karen Armstrong", "monotheism from Abraham through Islam."),
        ]
    },
    "world history": {
        "slug_keyword": "world-history",
        "intro": """World history is the attempt to find patterns across civilizations that developed independently of each other. Why did agriculture emerge in multiple places simultaneously around 10,000 BCE? Why did industrialization begin in Britain rather than China, which had most of the same ingredients earlier? Why did some civilizations develop writing and others did not? Sleep stories covering {topic} give you the broad sweep of human civilization from the first cities to the modern world.""",
        "books": [
            ("Sapiens by Yuval Noah Harari", "the most accessible overview of the entire human story."),
            ("Guns, Germs, and Steel by Jared Diamond", "why some civilizations conquered others. Controversial and important."),
            ("The Silk Roads by Peter Frankopan", "world history recentred on Central Asia and the trade routes that connected civilizations."),
        ]
    },
    "ancient history": {
        "slug_keyword": "ancient-history",
        "intro": """Ancient history covers roughly four thousand years of human civilization before the fall of the Western Roman Empire in 476 CE. In that span, humanity invented writing, mathematics, philosophy, democracy, monotheism, architecture, metallurgy, and organized warfare — along with most of the other foundational technologies and ideas that shaped everything that followed. Sleep stories covering {topic} take you into the deep roots of the world we live in.""",
        "books": [
            ("The Ancient World by Brian Fagan", "a broad survey of ancient civilizations from Mesopotamia through Rome."),
            ("Rubicon by Tom Holland", "the late Roman Republic and the civil wars that produced the Empire."),
            ("SPQR by Mary Beard", "Rome as it actually was, rather than as the mythology presents it."),
        ]
    },
    "medieval history": {
        "slug_keyword": "medieval-history",
        "intro": """The medieval period runs from roughly 500 CE to 1500 CE — a thousand years of European history that produced Gothic cathedrals, the Black Death, the Crusades, Magna Carta, the rise of universities, and the slow emergence of the nation-state from feudal fragmentation. Sleep stories covering {topic} give you access to a period far richer and stranger than its popular image as a dark age suggests.""",
        "books": [
            ("The Time Traveler's Guide to Medieval England by Ian Mortimer", "daily life in fourteenth-century England, written as a travel guide."),
            ("A Distant Mirror by Barbara Tuchman", "the fourteenth century in full."),
            ("The Plantagenets by Dan Jones", "England's medieval kings from Henry II through Richard III."),
        ]
    },
    "alternate history": {
        "slug_keyword": "alternate-history",
        "intro": """Alternate history is not escapism — it is a tool for understanding why things happened the way they did. When you ask 'what if the South had won the Civil War?' or 'what if Germany had won World War Two?', you are forced to identify exactly which decisions and accidents made the actual outcome possible. Sleep stories covering {topic} use counterfactual scenarios to illuminate the real history behind them.""",
        "books": [
            ("The Man in the High Castle by Philip K. Dick", "the Axis powers won WW2. The most influential alternate history novel."),
            ("Fatherland by Robert Harris", "Germany won WW2. A thriller set in the Nazi state that emerged from victory."),
            ("What Ifs? of American History edited by Robert Cowley", "historians applying counterfactual thinking to key American moments."),
        ]
    },
    "african colonization": {
        "slug_keyword": "african-colonization",
        "intro": """The Scramble for Africa — the period between 1881 and 1914 when European powers divided virtually the entire African continent between themselves — was one of the most consequential events in modern history. The borders drawn during this period still govern African states today, cutting through ethnic groups and ecological zones with complete indifference to the people who lived there. Sleep stories covering {topic} take you through the history of colonization and its long aftermath without the sanitising that European historiography has often applied.""",
        "books": [
            ("King Leopold's Ghost by Adam Hochschild", "the Belgian Congo and one of the worst colonial atrocities in history."),
            ("The Fate of Africa by Martin Meredith", "the full arc of modern African history."),
            ("Things Fall Apart by Chinua Achebe", "fiction, but the canonical literary account of colonization's effect on an African community."),
        ]
    },
    "christmas": {
        "slug_keyword": "christmas-history",
        "intro": """Christmas has a history far more complicated than most people suspect. The date, December 25th, was not established for centuries after Christ's birth and was chosen partly to coincide with existing Roman and northern European winter festivals. The Christmas tree came from Germany in the eighteenth century. Santa Claus as we know him was largely a nineteenth-century American invention. The carol tradition is largely Victorian. Sleep stories covering {topic} take you through how a religious observance became the cultural phenomenon it is today.""",
        "books": [
            ("Christmas: A Biography by Judith Flanders", "the social history of Christmas from early Christianity to the present."),
            ("Inventing Christmas by Jock Elliott", "how the Victorians created the Christmas we celebrate."),
        ]
    },
    "gothic cathedral": {
        "slug_keyword": "gothic-cathedrals",
        "intro": """Gothic cathedrals were the engineering marvels of the medieval world. The pointed arch, the flying buttress, and the ribbed vault together allowed medieval builders to construct structures of unprecedented height with enormous windows that flooded interiors with coloured light — creating an architectural experience deliberately designed to evoke the transcendent. Sleep stories covering {topic} take you into the engineering logic, the religious ambition, and the human stories behind these extraordinary buildings.""",
        "books": [
            ("The Pillars of the Earth by Ken Follett", "fiction, but exhaustively researched about medieval cathedral building. One of the great historical novels."),
            ("Gothic Architecture by Paul Frankl", "the scholarly history of the Gothic style."),
            ("The Cathedral Builders by Jean Gimpel", "the engineers and craftsmen who built the cathedrals."),
        ]
    },
    "bronze age": {
        "slug_keyword": "bronze-age-greece",
        "intro": """Bronze Age Greece — the Mycenaean civilization — was the historical reality behind the Homeric epics. These were real palace civilizations, literate (in Linear B), wealthy from trade, and powerful enough to sack Troy — if, as most scholars now believe, the Trojan War has a historical basis. The Bronze Age collapse around 1200 BCE ended the Mycenaean civilization along with the Hittites, the Egyptians of the New Kingdom, and almost everything else in the eastern Mediterranean. Sleep stories covering {topic} take you into a world that disappeared so completely it became legend.""",
        "books": [
            ("1177 B.C.: The Year Civilization Collapsed by Eric Cline", "the most accessible account of the Bronze Age collapse."),
            ("The Iliad by Homer translated by Emily Wilson", "the literary echo of the civilization that collapsed."),
        ]
    },
    "mysteries": {
        "slug_keyword": "ancient-mysteries",
        "intro": """Some questions in ancient history have been definitively answered. Many have not. Why did the Bronze Age civilizations collapse simultaneously around 1200 BCE? What happened to the population of Easter Island? Why did the Maya cities of the southern lowlands empty out between 800 and 1000 CE? What do the Nazca lines actually represent? Sleep stories covering {topic} take you into the genuine unsolved questions at the edges of ancient history.""",
        "books": [
            ("Mysteries of the Ancient World edited by Brian Fagan", "the best unsolved questions in archaeology and ancient history."),
            ("1177 B.C.: The Year Civilization Collapsed by Eric Cline", "one of the great mysteries of ancient history, partially solved."),
        ]
    },
    "war history": {
        "slug_keyword": "war-history",
        "intro": """War is the most documented human activity in history. From the earliest Sumerian records through to the present, military conflict has generated more historical writing than any other subject. Sleep stories covering {topic} take you through the broadest sweep of military history — the battles, the strategies, the technologies, and the human decisions that determined how conflicts began, escalated, and ended.""",
        "books": [
            ("A History of Warfare by John Keegan", "the defining modern account of war as a cultural and historical phenomenon."),
            ("The Art of War by Sun Tzu", "the foundational strategic text. Relevant across 2,500 years."),
            ("Carnage and Culture by Victor Davis Hanson", "why Western armies have historically been unusually lethal."),
        ]
    },
}

ALREADY_DONE = {
    "WjSLeZzg0JY", "3yHrzJUtf44", "C-opBKaCnYg", "-LDDvIJbnuI",
    "keoWGO1tRAc", "mVYAZJn-Paw", "nXwNOGAyMtk", "LMd5m4lnnzk",
    "MbccdQIfmV0", "-VYiC7XOYsk", "eF38HRJuQTU", "BLV6gsZ4zqw",
    "Izze-9oQhuU", "52EB0GL7p2Y", "V9x-Ml0XE9Q", "Jm7gQEsM06I",
    "P-WsxYZ6vFQ", "ypSCfGc_nFs", "t2LT4cGmTPU",
    "b8tfGiJdg-k", "Vh61K3tc3YU", "enBxN9n5PiY",
}

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')

def detect_topic(title):
    t = title.lower()
    if 'roman' in t and ('empire' in t or 'history' in t or 'rome' in t or 'scary' in t or 'epic' in t):
        return 'roman'
    if 'rome' in t and 'hidden' in t:
        return 'roman'
    if 'egypt' in t and ('tomb' not in t and 'pharaoh' not in t):
        return 'egypt'
    if 'egypt' in t:
        return 'egypt'
    if 'japanese' in t or 'japan' in t:
        return 'japanese'
    if 'british empire' in t:
        return 'british empire'
    if 'mesopotamia' in t:
        return 'mesopotamia'
    if 'seven wonders' in t:
        return 'seven wonders'
    if 'ritual' in t:
        return 'ritual'
    if 'babylon' in t:
        return 'babylon'
    if 'carthage' in t:
        return 'carthage'
    if 'minoan' in t:
        return 'minoan'
    if 'assyrian' in t:
        return 'assyrian'
    if 'african kingdom' in t or 'forgotten african' in t:
        return 'african kingdom'
    if 'african coloniz' in t or 'colonization' in t:
        return 'african colonization'
    if 'persian' in t:
        return 'persian'
    if 'maya' in t:
        return 'maya'
    if 'aztec' in t:
        return 'aztec'
    if 'inca' in t:
        return 'inca'
    if 'ottoman' in t:
        return 'ottoman'
    if 'crusader' in t or 'crusade' in t:
        return 'crusader'
    if 'stone age' in t:
        return 'stone age'
    if 'hittite' in t:
        return 'hittite'
    if 'olmec' in t:
        return 'olmec'
    if 'indus valley' in t:
        return 'indus valley'
    if 'israelite' in t or 'jewish' in t or 'history of the jews' in t:
        return 'israelite'
    if 'black death' in t:
        return 'black death'
    if 'spanish flu' in t:
        return 'spanish flu'
    if 'napoleon' in t:
        return 'napoleon'
    if 'pompeii' in t or 'herculaneum' in t:
        return 'pompeii'
    if 'us history' in t or 'american history' in t:
        return 'us history'
    if 'china' in t:
        return 'ancient china'
    if 'civil war' in t:
        return 'civil war'
    if 'european history' in t or 'europe' in t:
        return 'european history'
    if 'greek' in t and ('history' in t or 'scary' in t or 'epic' in t):
        return 'ancient greek'
    if 'islam' in t:
        return 'islam'
    if 'world history' in t:
        return 'world history'
    if 'alternate history' in t or 'what if' in t:
        return 'alternate history'
    if 'christmas' in t:
        return 'christmas'
    if 'gothic cathedral' in t or 'cathedral' in t:
        return 'gothic cathedral'
    if 'bronze age' in t:
        return 'bronze age'
    if 'mysteries' in t or 'mystery' in t or 'greatest mysteries' in t:
        return 'mysteries'
    if 'war history' in t or 'epic war' in t:
        return 'war history'
    if 'medieval' in t:
        return 'medieval history'
    if 'ancient history' in t or 'ancient civilization' in t:
        return 'ancient history'
    return 'ancient history'

def make_title(vid_title):
    # Strip duration prefix patterns and make it a proper post title
    clean = re.sub(r'Fall Asleep (to|FAST with these|To) ', '', vid_title)
    clean = re.sub(r'\|.*$', '', clean).strip()
    clean = re.sub(r'\d+ Hour(s)? Sleep Story', '', clean).strip()
    clean = clean.strip('| ').strip()
    return f"{clean}: Sleep Stories to Fall Asleep To"

def make_slug(vid_title, vid_id):
    clean = re.sub(r'Fall Asleep (to|FAST with these|To) ', '', vid_title)
    clean = re.sub(r'\|.*$', '', clean).strip()
    clean = re.sub(r'\d+\s*Hours?\s*(of\s*)?', '', clean)
    clean = re.sub(r'(EPIC|DARK|SCARY|CRAZY|MYSTERIOUS|FASCINATING|AMAZING|SHOCKING|FORGOTTEN|MIND-BLOWING|REAL|HIDDEN)\s*', '', clean)
    slug = slugify(clean)
    if len(slug) < 10:
        slug = slugify(vid_title[:60])
    return f"sleep-story-{slug}"[:80]

def make_post(video_id, raw_title, topic_key, topic_data):
    post_title = make_title(raw_title)
    topic_label = raw_title.replace('Fall Asleep to ', '').replace('Fall Asleep FAST with these ', '').strip()
    topic_label = re.sub(r'\|.*$', '', topic_label).strip()

    intro = topic_data['intro'].replace('{topic}', topic_label.lower())

    books_html = "\n".join([
        f"<li><strong>{b[0]}</strong> — {b[1]}</li>"
        for b in topic_data['books']
    ])

    content = f"""<p>{intro}</p>

<p>The <a href="https://www.youtube.com/@sleepylanguage" target="_blank" rel="noopener">Learn While You Sleep</a> channel covers this topic in long-form, calm-narrated sleep content built for nighttime listening. 144 videos covering history and mythology — all in the same steady, unhurried format that carries you from wakefulness into deep sleep.</p>

<h2>{topic_label}</h2>

<iframe src="https://www.youtube.com/embed/{video_id}" width="100%" height="400" style="max-width:700px;border-radius:12px;margin:1.5rem 0" title="{raw_title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<h2>Why This Format Works for Sleep</h2>

<p>The sleep learning format works because it occupies the analytical mind just enough to prevent it from generating its own anxieties, while keeping the emotional stakes low enough to allow actual sleep. Historical content is ideal for this: genuinely interesting, intellectually engaging, but emotionally distant enough that your nervous system can relax. The events happened long ago, to people you will never meet. Your brain processes the narrative without activating the threat responses that keep you awake.</p>

<p>Long videos matter too. A two-hour video that ends while you are still awake is a disruption. A four-to-seven-hour video carries you through the night without interruption. The channel produces content at the length that sleep actually needs.</p>

<h2>More Sleep Stories on the Channel</h2>

<p>Browse the full playlist at <a href="https://www.youtube.com/playlist?list=PLdI_JIOogFW6r6tgJqYIe_U1IXgVnzy2w" target="_blank" rel="noopener">Fall Asleep to History</a> — 109 videos covering everything from the Stone Age to World War Two. New content added regularly.</p>

<h2>Books on This Topic</h2>

<p>Sleep stories build the framework. These books fill in the detail:</p>

<ul>
{books_html}
</ul>

<p>Find these and more at <a href="/books">Skriuwer's curated history collection</a>, with honest reviews and direct Amazon links. Subscribe to <a href="https://www.youtube.com/@sleepylanguage" target="_blank" rel="noopener">Learn While You Sleep</a> and there will be new content waiting every night.</p>"""

    return content

def main():
    os.makedirs(BLOG_DIR, exist_ok=True)
    created = 0
    skipped = 0

    for vid_id, raw_title in VIDEOS:
        if vid_id in ALREADY_DONE:
            skipped += 1
            continue

        topic_key = detect_topic(raw_title)
        topic_data = TOPIC_DATA.get(topic_key, TOPIC_DATA['ancient history'])

        slug = make_slug(raw_title, vid_id)
        filepath = os.path.join(BLOG_DIR, f"{slug}.md")

        # Determine category
        if any(k in topic_key for k in ['maya', 'aztec', 'inca', 'olmec']):
            categories = '["history"]'
        elif topic_key in ['alternate history', 'mysteries', 'war history', 'world history']:
            categories = '["history"]'
        elif topic_key in ['ancient greek', 'roman', 'mesopotamia', 'babylon', 'assyrian', 'hittite', 'minoan', 'persian', 'bronze age']:
            categories = '["history"]'
        else:
            categories = '["history"]'

        post_title = make_title(raw_title)
        content = make_post(vid_id, raw_title, topic_key, topic_data)

        frontmatter = f"""---
title: "{post_title}"
date: "2026-04-29"
categories: {categories}
---

"""
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(frontmatter + content)

        print(f"Created: {slug}.md [{topic_key}]")
        created += 1

    print(f"\nDone: {created} posts created, {skipped} skipped (already exist)")

if __name__ == '__main__':
    main()
