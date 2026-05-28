// Client-side Playroom Logic
document.addEventListener("DOMContentLoaded", () => {
  const API_BASE = window.location.origin;

  // 1. VOCABULARY DATABASE
  const VOCABULARY_EN_SINGLE = {
    "A": { word: "Apple", emoji: "🍎", phonic: "aah" },
    "B": { word: "Ball", emoji: "⚽", phonic: "buh" },
    "C": { word: "Cat", emoji: "🐱", phonic: "cuh" },
    "D": { word: "Dog", emoji: "🐶", phonic: "duh" },
    "E": { word: "Elephant", emoji: "🐘", phonic: "eh" },
    "F": { word: "Fish", emoji: "🐟", phonic: "fuh" },
    "G": { word: "Grapes", emoji: "🍇", phonic: "guh" },
    "H": { word: "House", emoji: "🏠", phonic: "huh" },
    "I": { word: "Igloo", emoji: "🛖", phonic: "ih" },
    "J": { word: "Jellyfish", emoji: "🪼", phonic: "juh" },
    "K": { word: "Kite", emoji: "🪁", phonic: "kuh" },
    "L": { word: "Lion", emoji: "🦁", phonic: "luh" },
    "M": { word: "Monkey", emoji: "🐒", phonic: "muh" },
    "N": { word: "Nest", emoji: "🪹", phonic: "nuh" },
    "O": { word: "Orange", emoji: "🍊", phonic: "ah" },
    "P": { word: "Peacock", emoji: "🦚", phonic: "puh" },
    "Q": { word: "Queen", emoji: "👑", phonic: "kwuh" },
    "R": { word: "Rabbit", emoji: "🐰", phonic: "ruh" },
    "S": { word: "Sun", emoji: "☀️", phonic: "suh" },
    "T": { word: "Tiger", emoji: "🐯", phonic: "tuh" },
    "U": { word: "Umbrella", emoji: "☂️", phonic: "uh" },
    "V": { word: "Violin", emoji: "🎻", phonic: "vuh" },
    "W": { word: "Watch", emoji: "⌚", phonic: "wuh" },
    "X": { word: "X-ray", emoji: "🩻", phonic: "ecks" },
    "Y": { word: "Yacht", emoji: "⛵", phonic: "yuh" },
    "Z": { word: "Zebra", emoji: "🦓", phonic: "zuh" }
  };

  const VOCABULARY_EN_BLENDS = {
    "CH": { word: "Chair", emoji: "🪑", phonic: "chuh" },
    "SH": { word: "Ship", emoji: "🚢", phonic: "shuh" },
    "TH": { word: "Thumb", emoji: "👍", phonic: "thuh" },
    "BL": { word: "Blue", emoji: "🔵", phonic: "bluh" },
    "FL": { word: "Flower", emoji: "🌸", phonic: "fluh" },
    "PL": { word: "Play", emoji: "🎮", phonic: "pluh" },
    "GR": { word: "Green", emoji: "🟢", phonic: "gruh" },
    "BR": { word: "Bread", emoji: "🍞", phonic: "bruh" },
    "TR": { word: "Tree", emoji: "🌳", phonic: "truh" },
    "DR": { word: "Drum", emoji: "🥁", phonic: "druh" },
    "CL": { word: "Clock", emoji: "⏰", phonic: "cluh" },
    "SL": { word: "Slide", emoji: "🛝", phonic: "sluh" },
    "ST": { word: "Star", emoji: "⭐", phonic: "stuh" },
    "SP": { word: "Spoon", emoji: "🥄", phonic: "spuh" },
    "CR": { word: "Crab", emoji: "🦀", phonic: "cruh" }
  };

  const VOCABULARY_HI = {
    "अ": { word: "अनार", emoji: "🍎" },
    "आ": { word: "आम", emoji: "🥭" },
    "इ": { word: "इमली", emoji: "🫘" },
    "ई": { word: "ईख", emoji: "🌾" },
    "उ": { word: "उपहार", emoji: "🎁" },
    "ऊ": { word: "ऊन", emoji: "🧶" },
    "ए": { word: "एड़ी", emoji: "🦶" },
    "ऐ": { word: "ऐनक", emoji: "👓" },
    "ओ": { word: "ओखली", emoji: "🥣" },
    "औ": { word: "औरत", emoji: "👩" },
    "अं": { word: "अंगूर", emoji: "🍇" },
    "क": { word: "कमल", emoji: "🪷" },
    "ख": { word: "खरगोश", emoji: "🐇" },
    "ग": { word: "गमला", emoji: "🪴" },
    "घ": { word: "घर", emoji: "🏠" },
    "च": { word: "चम्मच", emoji: "🥄" },
    "छ": { word: "छतरी", emoji: "☂️" },
    "ज": { word: "जग", emoji: "🥛" },
    "झ": { word: "झंडा", emoji: "🇮🇳" },
    "ट": { word: "टमाटर", emoji: "🍅" },
    "ठ": { word: "ठठेरा", emoji: "🔨" },
    "ड": { word: "डमरू", emoji: "🪘" },
    "ढ": { word: "ढोलक", emoji: "🪘" },
    "त": { word: "तरबूज", emoji: "🍉" },
    "ध": { word: "धनुष", emoji: "🏹" },
    "न": { word: "नल", emoji: "🚰" },
    "प": { word: "पतंग", emoji: "🪁" },
    "फ": { word: "फल", emoji: "🍎" },
    "ब": { word: "बतख", emoji: "🦆" },
    "भ": { word: "भालू", emoji: "🐻" },
    "म": { word: "मछली", emoji: "🐟" },
    "य": { word: "यज्ञ", emoji: "🔥" },
    "र": { word: "रथ", emoji: "🛞" },
    "ल": { word: "लट्टू", emoji: "🪀" },
    "व": { word: "वन", emoji: "🌲" },
    "श": { word: "शलगम", emoji: "🧅" },
    "ष": { word: "षटकोण", emoji: "⬡" },
    "स": { word: "सपेरा", emoji: "🐍" },
    "ह": { word: "हाथी", emoji: "🐘" }
  };

  const VOCABULARY_HI_BLENDS = {
    "क्ष": { word: "कक्षा", emoji: "🏫", components: "क और ष" },
    "त्र": { word: "त्रिकोण", emoji: "🔺", components: "त और र" },
    "ज्ञ": { word: "ज्ञानी", emoji: "🧠", components: "ज और ञ" },
    "श्र": { word: "श्रमिक", emoji: "👷", components: "श और र" },
    "प्र": { word: "प्रकाश", emoji: "💡", components: "प और र" },
    "द्व": { word: "द्वार", emoji: "🚪", components: "द और व" },
    "द्य": { word: "विद्या", emoji: "📚", components: "द और य" },
    "क्र": { word: "क्रिकेट", emoji: "🏏", components: "क और र" },
    "द्ध": { word: "बुद्ध", emoji: "🧘", components: "द और ध" }
  };

  const VOCABULARY_TE_SINGLE = {
    "అ": { word: "అమ్మ", emoji: "👩", translit: "Amma", meaning: "Mother" },
    "ఆ": { word: "ఆవు", emoji: "🐄", translit: "Aavu", meaning: "Cow" },
    "ఇ": { word: "ఇల్లు", emoji: "🏠", translit: "Illu", meaning: "House" },
    "ఈ": { word: "ఈక", emoji: "🪶", translit: "Eeka", meaning: "Feather" },
    "ఉ": { word: "ఉడుత", emoji: "🐿️", translit: "Uduta", meaning: "Squirrel" },
    "ఊ": { word: "ఊయల", emoji: "🛝", translit: "Ooyala", meaning: "Swing" },
    "ఎ": { word: "ఎలుక", emoji: "🐀", translit: "Eluka", meaning: "Rat" },
    "ఏ": { word: "ఏనుగు", emoji: "🐘", translit: "Eenugu", meaning: "Elephant" },
    "ఐ": { word: "ఐదు", emoji: "🖐️", translit: "Aidu", meaning: "Five" },
    "ఒ": { word: "ఒంటె", emoji: "🐫", translit: "Onte", meaning: "Camel" },
    "ఓ": { word: "ఓడ", emoji: "🚢", translit: "Oda", meaning: "Ship" },
    "ఔ": { word: "ఔషధం", emoji: "💊", translit: "Aushadham", meaning: "Medicine" },
    "క": { word: "కలము", emoji: "✒️", translit: "Kalamu", meaning: "Pen" },
    "ఖ": { word: "ఖడ్గం", emoji: "🗡️", translit: "Khadgam", meaning: "Sword" },
    "గ": { word: "గడియారం", emoji: "⏰", translit: "Gadiyaram", meaning: "Clock" },
    "ఘ": { word: "ఘటం", emoji: "🏺", translit: "Ghatam", meaning: "Pot" },
    "చ": { word: "చక్రం", emoji: "🎡", translit: "Chakram", meaning: "Wheel" },
    "ఛ": { word: "ఛత్రి", emoji: "☂️", translit: "Chhatri", meaning: "Umbrella" },
    "జ": { word: "జలజ", emoji: "🪷", translit: "Jalaja", meaning: "Lotus" },
    "ఝ": { word: "ఝషం", emoji: "🐟", translit: "Jhasham", meaning: "Fish" },
    "ట": { word: "టమాటా", emoji: "🍅", translit: "Tamata", meaning: "Tomato" },
    "ఠ": { word: "కంఠం", emoji: "🗣️", translit: "Kantham", meaning: "Throat/Neck" },
    "డ": { word: "డమరుకం", emoji: "🪘", translit: "Damarukam", meaning: "Drum" },
    "ఢ": { word: "ఢంకా", emoji: "🥁", translit: "Dhanka", meaning: "Big Drum" },
    "త": { word: "తబలా", emoji: "🪘", translit: "Tabala", meaning: "Tabla" },
    "థ": { word: "రథము", emoji: "🛞", translit: "Rathamu", meaning: "Chariot" },
    "ద": { word: "దంతము", emoji: "🦷", translit: "Danthamu", meaning: "Tooth" },
    "ధ": { word: "ధనస్సు", emoji: "🏹", translit: "Dhanassu", meaning: "Bow" },
    "న": { word: "నగ", emoji: "💎", translit: "Naga", meaning: "Jewel" },
    "ప": { word: "పలక", emoji: "📋", translit: "Palaka", meaning: "Slate" },
    "ఫ": { word: "ఫలము", emoji: "🍎", translit: "Phalamu", meaning: "Fruit" },
    "బ": { word: "బంతి", emoji: "⚽", translit: "Banthi", meaning: "Ball" },
    "భ": { word: "భల్లూకం", emoji: "🐻", translit: "Bhallookam", meaning: "Bear" },
    "మ": { word: "మంచం", emoji: "🛏️", translit: "Mancham", meaning: "Cot" },
    "య": { word: "యంత్రం", emoji: "⚙️", translit: "Yanthram", meaning: "Machine" },
    "ర": { word: "రవి", emoji: "☀️", translit: "Ravi", meaning: "Sun" },
    "ల": { word: "లత", emoji: "🌿", translit: "Latha", meaning: "Creeper/Vine" },
    "వ": { word: "వల", emoji: "🕸️", translit: "Vala", meaning: "Net" },
    "శ": { word: "శంఖం", emoji: "🐚", translit: "Shankham", meaning: "Conch" },
    "ష": { word: "షట్కోణం", emoji: "⬡", translit: "Shatkonam", meaning: "Hexagon" },
    "స": { word: "సంచి", emoji: "🛍️", translit: "Sanchi", meaning: "Bag" },
    "హ": { word: "హంస", emoji: "🦢", translit: "Hamsa", meaning: "Swan" }
  };

  const VOCABULARY_TE_BLENDS = {
    "క్క": { word: "అక్క", emoji: "👩", translit: "Akka", meaning: "Elder Sister", components: "క వత్తు" },
    "గ్గ": { word: "మొగ్గ", emoji: "🪷", translit: "Mogga", meaning: "Flower Bud", components: "గ వత్తు" },
    "చ్చ": { word: "పచ్చడి", emoji: "🥣", translit: "Pachadi", meaning: "Pickle", components: "చ వత్తు" },
    "జ్జ": { word: "గజ్జెలు", emoji: "🔔", translit: "Gajjelu", meaning: "Anklets", components: "జ వత్తు" },
    "ట్ట": { word: "పెట్టె", emoji: "📦", translit: "Pette", meaning: "Box", components: "ట వత్తు" },
    "డ్డ": { word: "లడ్డు", emoji: "🧆", translit: "Laddu", meaning: "Sweet Ball", components: "డ వత్తు" },
    "త్త": { word: "నత్త", emoji: "🐌", translit: "Natha", meaning: "Snail", components: "త వత్తు" },
    "ద్ద": { word: "ఎద్దు", emoji: "🐂", translit: "Eddu", meaning: "Ox", components: "ద వత్తు" },
    "న్న": { word: "అన్న", emoji: "👦", translit: "Anna", meaning: "Elder Brother", components: "న వత్తు" },
    "ప్ప": { word: "కప్ప", emoji: "🐸", translit: "Kappa", meaning: "Frog", components: "ప వత్తు" },
    "బ్బ": { word: "మబ్బు", emoji: "☁️", translit: "Mabbu", meaning: "Cloud", components: "బ వత్తు" },
    "మ్మ": { word: "అమ్మ", emoji: "👩", translit: "Amma", meaning: "Mother", components: "మ వత్తు" },
    "య్య": { word: "కొయ్య", emoji: "🪵", translit: "Koyya", meaning: "Wood/Stick", components: "య వత్తు" },
    "ర్ర": { word: "జుర్రు", emoji: "🍜", translit: "Jurru", meaning: "Slurp", components: "ర వత్తు" },
    "ల్ల": { word: "పిల్లి", emoji: "🐱", translit: "Pilli", meaning: "Cat", components: "ల వత్తు" },
    "వ్వ": { word: "పువ్వు", emoji: "🌸", translit: "Puvvu", meaning: "Flower", components: "వ వత్తు" }
  };

  const VOCABULARY_KN_SINGLE = {
    "ಅ": { word: "ಅಮ್ಮ", emoji: "👩", translit: "Amma", meaning: "Mother" },
    "ಆ": { word: "ಆನೆ", emoji: "🐘", translit: "Aane", meaning: "Elephant" },
    "ಇ": { word: "ಇಲಿ", emoji: "🐀", translit: "Ili", meaning: "Rat" },
    "ಈ": { word: "ಈಜು", emoji: "🏊", translit: "Eeju", meaning: "Swim" },
    "ಉ": { word: "ಉಡುಗೊರೆ", emoji: "🎁", translit: "Udugore", meaning: "Gift" },
    "ಊ": { word: "ಊಟ", emoji: "🍽️", translit: "Oota", meaning: "Meal" },
    "ಎ": { word: "ಎಲೆ", emoji: "🍃", translit: "Ele", meaning: "Leaf" },
    "ಏ": { word: "ಏಣಿ", emoji: "🪜", translit: "Eeni", meaning: "Ladder" },
    "ಐ": { word: "ಐದು", emoji: "🖐️", translit: "Aidu", meaning: "Five" },
    "ಒ": { word: "ಒಂಟೆ", emoji: "🐫", translit: "Onte", meaning: "Camel" },
    "ಓ": { word: "ಓಡು", emoji: "🏃", translit: "Oodu", meaning: "Run" },
    "ಔ": { word: "ಔಷಧ", emoji: "💊", translit: "Aushadha", meaning: "Medicine" },
    "ಕ": { word: "ಕಮಲ", emoji: "🪷", translit: "Kamala", meaning: "Lotus" },
    "ಖ": { word: "ಖಡ್ಗ", emoji: "🗡️", translit: "Khadga", meaning: "Sword" },
    "ಗ": { word: "ಗಡಿಯಾರ", emoji: "⏰", translit: "Gadiyara", meaning: "Clock" },
    "ಘ": { word: "ಘಟ", emoji: "🏺", translit: "Ghata", meaning: "Pot" },
    "ಚ": { word: "ಚಮಚ", emoji: "🥄", translit: "Chamacha", meaning: "Spoon" },
    "ಛ": { word: "ಛತ್ರಿ", emoji: "☂️", translit: "Chhatri", meaning: "Umbrella" },
    "ಜ": { word: "ಜೇನು", emoji: "🐝", translit: "Jeenu", meaning: "Honey/Bee" },
    "ಝ": { word: "ಝಷ", emoji: "🐟", translit: "Jhasha", meaning: "Fish" },
    "ಟ": { word: "ಟೊಮೇಟೊ", emoji: "🍅", translit: "Tomato", meaning: "Tomato" },
    "ಠ": { word: "ಕಂಠ", emoji: "🗣️", translit: "Kantha", meaning: "Throat/Voice" },
    "ಡ": { word: "ಡಮರು", emoji: "🪘", translit: "Damaru", meaning: "Drum" },
    "ಢ": { word: "ಢಕ್ಕೆ", emoji: "🥁", translit: "Dhakke", meaning: "Large Drum" },
    "ತ": { word: "ತಬಲ", emoji: "🪘", translit: "Tabala", meaning: "Tabla" },
    "ಥ": { word: "ರಥ", emoji: "🛞", translit: "Ratha", meaning: "Chariot" },
    "ದ": { word: "ದಂತ", emoji: "🦷", translit: "Dantha", meaning: "Tooth" },
    "ಧ": { word: "ಧನಸ್ಸು", emoji: "🏹", translit: "Dhanassu", meaning: "Bow" },
    "ನ": { word: "ನಳ", emoji: "🚰", translit: "Nala", meaning: "Tap" },
    "ಪ": { word: "ಪಟ", emoji: "🪁", translit: "Pata", meaning: "Kite" },
    "ಫ": { word: "ಫಲ", emoji: "🍎", translit: "Phala", meaning: "Fruit" },
    "ಬ": { word: "ಬಾಳೆಹಣ್ಣು", emoji: "🍌", translit: "Baalehannu", meaning: "Banana" },
    "ಭ": { word: "ಭಲ್ಲೂಕ", emoji: "🐻", translit: "Bhallooka", meaning: "Bear" },
    "ಮ": { word: "ಮರ", emoji: "🌳", translit: "Mara", meaning: "Tree" },
    "ಯ": { word: "ಯಂತ್ರ", emoji: "⚙️", translit: "Yanthra", meaning: "Machine" },
    "ರ": { word: "ರವಿ", emoji: "☀️", translit: "Ravi", meaning: "Sun" },
    "ಲ": { word: "ಲತೆ", emoji: "🌿", translit: "Lathe", meaning: "Creeper/Vine" },
    "ವ": { word: "ವನ", emoji: "🌲", translit: "Vana", meaning: "Forest" },
    "ಶ": { word: "ಶಂಖ", emoji: "🐚", translit: "Shankha", meaning: "Conch" },
    "ಷ": { word: "ಷಟ್ಕೋನ", emoji: "⬡", translit: "Shatkona", meaning: "Hexagon" },
    "ಸ": { word: "ಸೇಬು", emoji: "🍎", translit: "Seebu", meaning: "Apple" },
    "ಹ": { word: "ಹಂಸ", emoji: "🦢", translit: "Hamsa", meaning: "Swan" }
  };

  const VOCABULARY_KN_BLENDS = {
    "ಕ್ಕ": { word: "ಅಕ್ಕ", emoji: "👩", translit: "Akka", meaning: "Elder Sister", components: "ಕ ಒತ್ತು" },
    "ಗ್ಗ": { word: "ಮೊಗ್ಗು", emoji: "🪷", translit: "Moggu", meaning: "Flower Bud", components: "ಗ ಒತ್ತು" },
    "ಚ್ಚ": { word: "ಚಚ್ಚು", emoji: "🔨", translit: "Chachhu", meaning: "Crush/Beat", components: "ಚ ಒತ್ತು" },
    "ಜ್ಜ": { word: "ಗೆಜ್ಜೆ", emoji: "🔔", translit: "Gejje", meaning: "Anklet", components: "ಜ ಒತ್ತು" },
    "ಟ್ಟ": { word: "ಪೆಟ್ಟಿಗೆ", emoji: "📦", translit: "Pettige", meaning: "Box", components: "ಟ ಒತ್ತು" },
    "ಡ್ಡ": { word: "ಲಡ್ಡು", emoji: "🧆", translit: "Laddu", meaning: "Sweet Ball", components: "ಡ ಒತ್ತು" },
    "ತ್ತ": { word: "ನತ್ತ", emoji: "🐌", translit: "Natha", meaning: "Snail/Nose-ring", components: "ತ ಒತ್ತು" },
    "ದ್ದ": { word: "ಎತ್ತು", emoji: "🐂", translit: "Etthu", meaning: "Ox", components: "ದ ಒತ್ತು" },
    "ನ್ನ": { word: "ಅಣ್ಣ", emoji: "👦", translit: "Anna", meaning: "Elder Brother", components: "ನ ಒತ್ತು" },
    "ಪ್ಪ": { word: "ಕಪ್ಪೆ", emoji: "🐸", translit: "Kappe", meaning: "Frog", components: "ಪ ಒತ್ತು" },
    "ಬ್ಬ": { word: "ಹಬ್ಬ", emoji: "🎉", translit: "Habba", meaning: "Festival", components: "ಬ ಒತ್ತು" },
    "ಮ್ಮ": { word: "ಅಮ್ಮ", emoji: "👩", translit: "Amma", meaning: "Mother", components: "ಮ ಒತ್ತು" },
    "ಯ್ಯ": { word: "ಗೆಳೆಯ", emoji: "👦", translit: "Geleya", meaning: "Friend", components: "ಯ ಒತ್ತು" },
    "ರ್ರ": { word: "ಕರ್ನಾಟಕ", emoji: "🗺️", translit: "Karnataka", meaning: "Karnataka State", components: "ರ ಒತ್ತು" },
    "ಲ್ಲ": { word: "ಹಲ್ಲಿ", emoji: "🦎", translit: "Halli", meaning: "Lizard", components: "ಲ ಒತ್ತು" },
    "ವ್ವ": { word: "ಅವ್ವ", emoji: "👵", translit: "Avva", meaning: "Grandmother/Mother", components: "ವ ಒತ್ತು" }
  };

  // State Management
  let currentLanguage = "en"; // "en" or "hi"
  let currentTab = "single"; // "single" or "blends" (for English)
  let activeLetter = "A"; // Currently requested tracing guide
  let isSoundEnabled = true;
  let isDrawing = false;
  let hasDrawnAnything = false;
  let pointerTimer = null;
  let voicesList = [];
  let activeSequenceId = 0;
  let currentPlayMode = "trace"; // "trace" or "free"
  let strokesData = []; // list of strokes: each stroke is [ [xs], [ys], [ts] ]
  let currentStroke = null;
  let strokeStartTime = 0;

  // Quiz State Management
  let quizScoreValue = 0;
  let currentQuizAnswer = "";
  let currentQuizSentenceTemplate = "";
  let currentQuizCompletedSentence = "";

  // Canvas elements
  const canvas = document.getElementById("paintCanvas");
  const ctx = canvas.getContext("2d");
  const traceGuide = document.getElementById("traceGuideText");
  const btnClearCanvas = document.getElementById("btnClearCanvas");
  const btnDoneWriting = document.getElementById("btnDoneWriting");
  const chkAutoRecognize = document.getElementById("chkAutoRecognize");
  const btnNextLetter = document.getElementById("btnNextLetter");
  const btnPlayTrace = document.getElementById("btnPlayTrace");
  const btnPlayFree = document.getElementById("btnPlayFree");
  const lblBoardTip = document.getElementById("lblBoardTip");

  // DOM output displays
  const vocabLetter = document.getElementById("vocabLetterDisplay");
  const vocabWord = document.getElementById("vocabWordDisplay");
  const emojiIllustration = document.getElementById("emojiIllustration");
  const illustrationContainer = document.getElementById("illustrationContainer");
  const consoleLogsStream = document.getElementById("consoleLogsStream");

  // UI control toggles
  const btnModeEn = document.getElementById("btnModeEn");
  const btnModeHi = document.getElementById("btnModeHi");
  const btnModeTe = document.getElementById("btnModeTe");
  const btnModeKn = document.getElementById("btnModeKn");
  const btnToggleSound = document.getElementById("btnToggleSound");
  const soundIcon = document.getElementById("soundIcon");
  const btnRepeatAudio = document.getElementById("btnRepeatAudio");

  // Keyboard boards
  const boardEnglishSingle = document.getElementById("boardEnglishSingle");
  const boardEnglishBlends = document.getElementById("boardEnglishBlends");
  const boardHindiSingle = document.getElementById("boardHindiSingle");
  const boardHindiBlends = document.getElementById("boardHindiBlends");
  const boardTeluguSingle = document.getElementById("boardTeluguSingle");
  const boardTeluguBlends = document.getElementById("boardTeluguBlends");
  const boardKannadaSingle = document.getElementById("boardKannadaSingle");
  const boardKannadaBlends = document.getElementById("boardKannadaBlends");
  const keyboardTogglesRow = document.getElementById("keyboardTogglesRow");
  const tabEnSingle = document.getElementById("tabEnSingle");
  const tabEnBlends = document.getElementById("tabEnBlends");

  // Tracing score rating overlay & mic speak elements
  const ratingOverlay = document.getElementById("ratingOverlay");
  const ratingStars = document.getElementById("ratingStars");
  const ratingText = document.getElementById("ratingText");
  const btnMicSpeak = document.getElementById("btnMicSpeak");

  // Quiz Elements
  const btnPlayQuiz = document.getElementById("btnPlayQuiz");
  const quizOverlay = document.getElementById("quizOverlay");
  const quizSentence = document.getElementById("quizSentence");
  const quizOptionsGrid = document.getElementById("quizOptionsGrid");
  const quizFeedbackBox = document.getElementById("quizFeedbackBox");
  const quizFeedbackEmoji = document.getElementById("quizFeedbackEmoji");
  const quizFeedbackText = document.getElementById("quizFeedbackText");
  const btnQuizSpeak = document.getElementById("btnQuizSpeak");
  const btnQuizNext = document.getElementById("btnQuizNext");
  const quizScore = document.getElementById("quizScore");

  // Logging telemetry
  function logEngine(message, category = 'log') {
    const div = document.createElement('div');
    div.className = `console-log-row ${category}`;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    div.innerText = `[${timeStr}] ${message}`;
    consoleLogsStream.appendChild(div);
    consoleLogsStream.scrollTop = consoleLogsStream.scrollHeight;
  }

  // 2. TEXT-TO-SPEECH VOICE PREPARATIONS
  function initVoices() {
    voicesList = window.speechSynthesis.getVoices();
    // Some browsers populate speech voices asynchronously
    if (voicesList.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        voicesList = window.speechSynthesis.getVoices();
        logEngine(`SpeechSynthesis voices refreshed: ${voicesList.length} voices loaded.`, 'tts');
      };
    } else {
      logEngine(`SpeechSynthesis initialized with ${voicesList.length} voices.`, 'tts');
    }
  }
  initVoices();

  function getSpeechVoice(langCode) {
    if (langCode === "te") {
      const targetVoices = voicesList.filter(v => v.lang.replace('_', '-').startsWith("te-IN") || v.lang.startsWith("te"));
      const premiumTeKeywords = ["Google తెలుగు", "Microsoft Shruti", "Shruti", "Siri Telugu", "Google", "Microsoft"];
      for (const kw of premiumTeKeywords) {
        const match = targetVoices.find(v => v.name.toLowerCase().includes(kw.toLowerCase()));
        if (match) return match;
      }
      return targetVoices.length > 0 ? targetVoices[0] : null;
    } else if (langCode === "kn") {
      const targetVoices = voicesList.filter(v => v.lang.replace('_', '-').startsWith("kn-IN") || v.lang.startsWith("kn"));
      const premiumKnKeywords = ["Google ಕನ್ನಡ", "Microsoft Heera", "Heera", "Siri Kannada", "Google", "Microsoft"];
      for (const kw of premiumKnKeywords) {
        const match = targetVoices.find(v => v.name.toLowerCase().includes(kw.toLowerCase()));
        if (match) return match;
      }
      return targetVoices.length > 0 ? targetVoices[0] : null;
    } else if (langCode === "hi") {
      const targetVoices = voicesList.filter(v => v.lang.replace('_', '-').startsWith("hi-IN") || v.lang.startsWith("hi"));
      const premiumHiKeywords = ["Google हिन्दी", "Sangeeta", "Lekha", "Veena", "Heera", "Kalpana", "Microsoft"];
      for (const kw of premiumHiKeywords) {
        const match = targetVoices.find(v => v.name.toLowerCase().includes(kw.toLowerCase()));
        if (match) return match;
      }
      return targetVoices.length > 0 ? targetVoices[0] : null;
    } else {
      const enVoices = voicesList.filter(v => v.lang.toLowerCase().startsWith("en"));
      const premiumEnKeywords = [
        "samantha",
        "google us english",
        "google uk english",
        "aria",
        "jenny",
        "guy",
        "serena",
        "daniel",
        "zira",
        "david",
        "karen"
      ];
      for (const kw of premiumEnKeywords) {
        const match = enVoices.find(v => v.name.toLowerCase().includes(kw));
        if (match) return match;
      }
      const enUSGB = enVoices.filter(v => v.lang.toLowerCase().startsWith("en-us") || v.lang.toLowerCase().startsWith("en-gb"));
      if (enUSGB.length > 0) return enUSGB[0];
      return enVoices.length > 0 ? enVoices[0] : null;
    }
  }

  // Auditory sequencing rule builder
  function speakWordSequenced(letter, vocab, langCode, praise = null) {
    if (!isSoundEnabled) return;

    window.speechSynthesis.cancel();
    
    const seqId = ++activeSequenceId;
    const activeVoice = getSpeechVoice(langCode);
    logEngine(`Using voice profile: ${activeVoice ? activeVoice.name : "System Default"} (${langCode})`, 'tts');

    const langParams = {
      en: { pitch: 1.15, rate: 0.90 },
      hi: { pitch: 1.0,  rate: 0.85 },
      te: { pitch: 1.0,  rate: 0.85 },
      kn: { pitch: 1.0,  rate: 0.85 }
    };

    const speakSegment = (phrase, prePauseMs = 0, rateOverride = null, langOverride = null) => {
      return new Promise((resolve) => {
        if (seqId !== activeSequenceId) {
          resolve();
          return;
        }
        setTimeout(() => {
          if (seqId !== activeSequenceId) {
            resolve();
            return;
          }
          const utterance = new SpeechSynthesisUtterance(phrase);
          const currentLang = langOverride || langCode;
          const voice = getSpeechVoice(currentLang);
          if (voice) utterance.voice = voice;
          utterance.volume = 1.0;
          
          const params = langParams[currentLang] || { pitch: 1.0, rate: 0.90 };
          utterance.pitch = params.pitch;
          utterance.rate = rateOverride || params.rate;
          
          utterance.onend = () => resolve();
          utterance.onerror = () => resolve();
          window.speechSynthesis.speak(utterance);
        }, prePauseMs);
      });
    };

    const runSequence = async () => {
      const checkAbort = () => seqId !== activeSequenceId;

      if (praise) {
        await speakSegment(praise, 0, null, "en");
        if (checkAbort()) return;
      }

      if (langCode === "hi") {
        if (vocab.components) {
          logEngine(`Audio out (Hindi Blend): "${vocab.components} मिलकर बनता है ${letter}। ${letter} से ${vocab.word}"`, 'tts');
          await speakSegment(`${vocab.components}`);
          if (checkAbort()) return;
          await speakSegment(`मिलकर बनता है ${letter}`, 250);
          if (checkAbort()) return;
          await speakSegment(`${letter} से ${vocab.word}`, 300);
        } else {
          logEngine(`Audio out (Hindi): "${letter} से ${vocab.word}"`, 'tts');
          await speakSegment(`${letter} से ${vocab.word}`);
        }
      } else if (langCode === "te") {
        if (vocab.components) {
          logEngine(`Audio out (Telugu Blend): "${letter}, ఇది ${vocab.components}, ${vocab.word}"`, 'tts');
          await speakSegment(letter, 0);
          if (checkAbort()) return;
          await speakSegment(`ఇది ${vocab.components}`, 250);
          if (checkAbort()) return;
          await speakSegment(vocab.word, 250);
          if (checkAbort()) return;
          await speakSegment(`means ${vocab.meaning}`, 250, null, "en");
        } else {
          logEngine(`Audio out (Telugu): "${letter}, ${vocab.word}"`, 'tts');
          await speakSegment(letter, 0);
          if (checkAbort()) return;
          await speakSegment(vocab.word, 200);
          if (checkAbort()) return;
          await speakSegment(`means ${vocab.meaning}`, 250, null, "en");
        }
      } else if (langCode === "kn") {
        if (vocab.components) {
          logEngine(`Audio out (Kannada Blend): "${letter}, ಇದು ${vocab.components}, ${vocab.word}"`, 'tts');
          await speakSegment(letter, 0);
          if (checkAbort()) return;
          await speakSegment(`ಇದು ${vocab.components}`, 250);
          if (checkAbort()) return;
          await speakSegment(vocab.word, 250);
          if (checkAbort()) return;
          await speakSegment(`means ${vocab.meaning}`, 250, null, "en");
        } else {
          logEngine(`Audio out (Kannada): "${letter}, ${vocab.word}"`, 'tts');
          await speakSegment(letter, 0);
          if (checkAbort()) return;
          await speakSegment(vocab.word, 200);
          if (checkAbort()) return;
          await speakSegment(`means ${vocab.meaning}`, 250, null, "en");
        }
      } else {
        const isBlend = letter.length > 1;
        if (!isBlend) {
          logEngine(`Audio out (Single Phonics): "${letter} says, ${vocab.phonic || letter}. ${letter} is for, ${vocab.word}!"`, 'tts');
          
          if (vocab.phonic) {
            await speakSegment(`${letter} says, ${vocab.phonic}!`, 0);
          } else {
            await speakSegment(`${letter}!`, 0);
          }
          if (checkAbort()) return;
          
          await speakSegment(`${letter} is for, ${vocab.word}!`, 200);
          if (checkAbort()) return;
          
          const spelling = vocab.word.toUpperCase().split('').join(', ');
          await speakSegment(spelling, 250);
        } else {
          logEngine(`Audio out (Blend Phonics): "${letter.split('').join(' ')} says, ${vocab.phonic || letter}. ${letter} is for, ${vocab.word}!"`, 'tts');
          
          const blendSpelling = letter.split('').join(', ');
          if (vocab.phonic) {
            await speakSegment(`${blendSpelling} says, ${vocab.phonic}!`, 0);
          } else {
            await speakSegment(`${blendSpelling}!`, 0);
          }
          if (checkAbort()) return;
          
          await speakSegment(`${letter} is for, ${vocab.word}!`, 200);
          if (checkAbort()) return;
          
          const spelling = vocab.word.toUpperCase().split('').join(', ');
          await speakSegment(spelling, 250);
        }
      }
    };

    runSequence();
  }

  // 3. CANVAS DRAWING IMPLEMENTATION
  function resizeCanvas() {
    // Get display boundaries of parent container
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Clear and redraw background rules if needed
    clearBoard();
    logEngine(`Canvas resized to ${canvas.width}x${canvas.height}`, 'log');
  }

  // Setup drawing properties
  let brushColor = "#3b82f6";
  let brushSize = 16;

  function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawnAnything = false;
    strokesData = [];
    currentStroke = null;
    if (pointerTimer) clearTimeout(pointerTimer);
  }

  function getPointerCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function startDrawingPath(e) {
    e.preventDefault();
    isDrawing = true;
    hasDrawnAnything = true;
    
    // Hide rating overlay on new drawing session
    ratingOverlay.style.display = "none";
    
    if (pointerTimer) clearTimeout(pointerTimer);
    
    const coords = getPointerCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    
    // Smooth drawing cap styles
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;

    // Stroke data record start
    strokeStartTime = Date.now();
    currentStroke = [
      [Math.round(coords.x)], // xs
      [Math.round(coords.y)], // ys
      [0] // ts
    ];
  }

  function drawMove(e) {
    if (!isDrawing) return;
    e.preventDefault();
    
    const coords = getPointerCoordinates(e);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    // Record point
    if (currentStroke) {
      currentStroke[0].push(Math.round(coords.x));
      currentStroke[1].push(Math.round(coords.y));
      currentStroke[2].push(Date.now() - strokeStartTime);
    }
    
    // Log coordinates coordinates periodically for debugger view
    if (Math.random() < 0.05) {
      logEngine(`Drawing path coordinate: X=${Math.round(coords.x)}, Y=${Math.round(coords.y)}`, 'log');
    }
  }

  function endDrawingPath() {
    if (!isDrawing) return;
    isDrawing = false;
    ctx.closePath();
    logEngine("Lifting brush from whiteboard.", 'log');

    // Save current stroke to strokesData
    if (currentStroke && currentStroke[0].length > 0) {
      strokesData.push(currentStroke);
      currentStroke = null;
    }
    
    // Trigger auto-done idle timer if selected
    if (chkAutoRecognize.checked && hasDrawnAnything) {
      if (pointerTimer) clearTimeout(pointerTimer);
      pointerTimer = setTimeout(() => {
        logEngine("Automatic 2.5s drawing idle timeout triggered evaluation.", 'log');
        evaluateDrawing();
      }, 2500);
    }
  }

  // Attachment listeners
  canvas.addEventListener("mousedown", startDrawingPath);
  canvas.addEventListener("mousemove", drawMove);
  canvas.addEventListener("mouseup", endDrawingPath);
  canvas.addEventListener("mouseleave", endDrawingPath);

  canvas.addEventListener("touchstart", startDrawingPath, { passive: false });
  canvas.addEventListener("touchmove", drawMove, { passive: false });
  canvas.addEventListener("touchend", endDrawingPath);
  canvas.addEventListener("touchcancel", endDrawingPath);

  // 4. HANDWRITING RECOGNITION AND TRIGGER PIPELINE
  async function recognizeHandwriting(strokes, lang) {
    let itc = "en-t-i0-handwrit";
    if (lang === "hi") itc = "hi-t-i0-handwrit";
    else if (lang === "te") itc = "te-t-i0-handwrit";
    else if (lang === "kn") itc = "kn-t-i0-handwrit";
    const url = `https://inputtools.google.com/request?ime=handwriting&app=demopage&itc=${itc}&cs=1&oe=utf-8&ie=utf-8`;
    
    const payload = {
      device: navigator.userAgent,
      options: "enable_pre_space",
      requests: [{
        writing_guide: {
          writing_area_width: canvas.width,
          writing_area_height: canvas.height
        },
        ink: strokes,
        language: lang
      }]
    };

    try {
      logEngine(`Sending handwriting recognition request to Google API (itc: ${itc})...`, 'log');
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error status: ${response.status}`);
      }

      const data = await response.json();
      if (data[0] === "SUCCESS" && data[1] && data[1][0] && data[1][0][1] && data[1][0][1].length > 0) {
        const candidates = data[1][0][1];
        logEngine(`Handwriting API Candidates: ${JSON.stringify(candidates)}`, 'log');
        return candidates;
      } else {
        logEngine("Handwriting recognition returned no results.", "err");
        return [];
      }
    } catch (e) {
      logEngine(`Handwriting recognition failed: ${e.message}`, "err");
      return [];
    }
  }

  function getDynamicVocab(candidate, lang) {
    if (lang === "hi") {
      if (VOCABULARY_HI[candidate]) return VOCABULARY_HI[candidate];
      if (VOCABULARY_HI_BLENDS[candidate]) return VOCABULARY_HI_BLENDS[candidate];
      return { word: candidate, emoji: "✏️" };
    } else if (lang === "te") {
      if (VOCABULARY_TE_SINGLE[candidate]) return VOCABULARY_TE_SINGLE[candidate];
      if (VOCABULARY_TE_BLENDS[candidate]) return VOCABULARY_TE_BLENDS[candidate];
      return { word: candidate, emoji: "✏️" };
    } else if (lang === "kn") {
      if (VOCABULARY_KN_SINGLE[candidate]) return VOCABULARY_KN_SINGLE[candidate];
      if (VOCABULARY_KN_BLENDS[candidate]) return VOCABULARY_KN_BLENDS[candidate];
      return { word: candidate, emoji: "✏️" };
    }
    
    const upper = candidate.toUpperCase().trim();
    if (VOCABULARY_EN_SINGLE[upper]) return VOCABULARY_EN_SINGLE[upper];
    if (VOCABULARY_EN_BLENDS[upper]) return VOCABULARY_EN_BLENDS[upper];
    
    const wordMap = {
      "FLOWER": { word: "Flower", emoji: "🌸" },
      "TREE": { word: "Tree", emoji: "🌳" },
      "STAR": { word: "Star", emoji: "⭐" },
      "SUN": { word: "Sun", emoji: "☀️" },
      "CAT": { word: "Cat", emoji: "🐱" },
      "DOG": { word: "Dog", emoji: "🐶" },
      "BALL": { word: "Ball", emoji: "⚽" },
      "FISH": { word: "Fish", emoji: "🐟" },
      "BIRD": { word: "Bird", emoji: "🐦" },
      "CAR": { word: "Car", emoji: "🚗" },
      "HOUSE": { word: "House", emoji: "🏠" },
      "APPLE": { word: "Apple", emoji: "🍎" },
      "ICE": { word: "Ice Cream", emoji: "🍦" },
      "BOY": { word: "Boy", emoji: "👦" },
      "GIRL": { word: "Girl", emoji: "👧" }
    };
    if (wordMap[upper]) return wordMap[upper];
    
    const titleCase = candidate.charAt(0).toUpperCase() + candidate.slice(1).toLowerCase();
    return { word: titleCase, emoji: "🎨" };
  }

  function calculateTracingScore() {
    // Create an offscreen canvas
    const offCanvas = document.createElement("canvas");
    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;
    const octx = offCanvas.getContext("2d");
    
    // Draw the target guide letter exactly like the background guide
    octx.font = "900 15rem Fredoka, comfortaa, sans-serif";
    if (window.innerWidth <= 600) {
      octx.font = "900 9rem Fredoka, comfortaa, sans-serif";
    }
    octx.letterSpacing = (currentLanguage === "hi" || currentLanguage === "te" || currentLanguage === "kn") ? "0px" : "-10px";
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillStyle = "black";
    
    octx.fillText(activeLetter, offCanvas.width / 2, offCanvas.height / 2);
    
    // Analyze pixels of both canvases
    const guideData = octx.getImageData(0, 0, offCanvas.width, offCanvas.height).data;
    const drawData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    
    let targetPixels = 0;
    let tracedOnTarget = 0;
    let tracedOffTarget = 0;
    
    for (let i = 0; i < guideData.length; i += 4) {
      const isGuide = guideData[i + 3] > 10; // Guide has alpha
      const isDrawn = drawData[i + 3] > 10; // Child has drawn
      
      if (isGuide) {
        targetPixels++;
        if (isDrawn) {
          tracedOnTarget++;
        }
      } else if (isDrawn) {
        tracedOffTarget++;
      }
    }
    
    if (targetPixels === 0) return 100; // safety fallback
    
    // Calculate accuracy: coverage of target guide
    const coverage = tracedOnTarget / targetPixels; // 0 to 1
    
    // Calculate neatness: drawn pixels inside target vs outside
    const totalDrawn = tracedOnTarget + tracedOffTarget;
    const neatness = totalDrawn === 0 ? 0 : (tracedOnTarget / totalDrawn); // 0 to 1
    
    // Combined score out of 100
    const score = (coverage * 0.7 + neatness * 0.3) * 100;
    logEngine(`Tracing math: Coverage=${Math.round(coverage*100)}%, Neatness=${Math.round(neatness*100)}%, Final Score=${Math.round(score)}%`, 'log');
    return Math.round(score);
  }



  async function evaluateDrawing() {
    if (pointerTimer) {
      clearTimeout(pointerTimer);
      pointerTimer = null;
    }
    if (!hasDrawnAnything) {
      logEngine("Whiteboard is blank. Tracing cancelled.", 'err');
      alert("✏️ Please draw or trace the letter first!");
      return;
    }
    
    let lang = currentLanguage;

    if (currentPlayMode === "trace") {
      const score = calculateTracingScore();
      
      let stars = "";
      let text = "";
      let praise = "";

      if (score >= 80) {
        stars = "⭐⭐⭐";
        if (lang === "hi") {
          text = "अति उत्तम! बहुत सुंदर!";
          praise = "अति उत्तम!";
        } else if (lang === "te") {
          text = "చాలా బాగుంది! అద్భుతం!";
          praise = "అద్భుతం!";
        } else if (lang === "kn") {
          text = "ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ! ಅದ್ಭುತ!";
          praise = "ಅದ್ಭುತ!";
        } else {
          text = "Excellent! Super neat!";
          praise = "Excellent!";
        }
      } else if (score >= 50) {
        stars = "⭐⭐";
        if (lang === "hi") {
          text = "बहुत बढ़िया! अच्छा प्रयास!";
          praise = "बहुत बढ़िया!";
        } else if (lang === "te") {
          text = "మంచి ప్రయత్నం! చాలా బాగుంది!";
          praise = "చాలా బాగుంది!";
        } else if (lang === "kn") {
          text = "ಉತ್ತಮ ಪ್ರಯತ್ನ! ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ!";
          praise = "ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ!";
        } else {
          text = "Good Job! Keep it up!";
          praise = "Good job!";
        }
      } else if (score >= 15) {
        stars = "⭐";
        if (lang === "hi") {
          text = "सुंदर प्रयास! थोड़ा और सुधारें!";
          praise = "सुंदर प्रयास!";
        } else if (lang === "te") {
          text = "మంచి ప్రయత్నం! కొంచెం ప్రయత్నించండి!";
          praise = "మంచి ప్రయత్నం!";
        } else if (lang === "kn") {
          text = "ಉತ್ತಮ ಪ್ರಯತ್ನ! ಇನ್ನಷ್ಟು ಪ್ರಯತ್ನಿಸಿ!";
          praise = "ಉತ್ತಮ ಪ್ರಯತ್ನ!";
        } else {
          text = "Nice Try! Keep tracing!";
          praise = "Nice try!";
        }
      } else {
        stars = "✏️";
        if (lang === "hi") {
          text = "फिर से प्रयास करें! आप कर सकते हैं!";
          praise = "फिर से प्रयास करें!";
        } else if (lang === "te") {
          text = "మళ్లీ ప్రయత్నించండి! మీరు చేయగలరు!";
          praise = "మళ్లీ ప్రయత్నించండి!";
        } else if (lang === "kn") {
          text = "ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ! ನೀವು ಮಾಡಬಹುದು!";
          praise = "ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ!";
        } else {
          text = "Let's practice some more!";
          praise = "Let's practice!";
        }
      }

      ratingStars.innerText = stars;
      ratingText.innerText = text;
      ratingOverlay.style.display = "flex";
      
      setTimeout(() => {
        ratingOverlay.style.display = "none";
      }, 3000);

      logEngine(`[TRACING ENGINE] Tracing Score: ${score}% (${praise})`, 'log');
      triggerVocabularyMatch(activeLetter, null, praise);
    } else {
      logEngine(`[AI ENGINE] Evaluating strokes for free drawing...`, 'log');
      const candidates = await recognizeHandwriting(strokesData, lang);
      
      if (candidates.length === 0) {
        logEngine("AI could not recognize the writing. Try drawing again!", "err");
        let failText = "🤔 Hmmm, I couldn't guess that one. Try drawing again!";
        if (lang === "te") failText = "🤔 ఉమ్, నేను ఊహించలేకపోయాను. మళ్ళీ ప్రయత్నించండి!";
        else if (lang === "kn") failText = "🤔 ಉಮ್, ನನಗೆ ಊಹಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ!";
        else if (lang === "hi") failText = "🤔 हूँ, मैं पहचान नहीं पाया। फिर से प्रयास करें!";
        alert(failText);
        clearBoard();
        return;
      }

      let bestCandidate = null;
      let matchedVocab = null;

      for (const cand of candidates) {
        const cleaned = (lang === "hi" || lang === "te" || lang === "kn") ? cand.trim() : cand.toUpperCase().trim();
        if (lang === "hi") {
          if (VOCABULARY_HI[cleaned]) { bestCandidate = cleaned; matchedVocab = VOCABULARY_HI[cleaned]; break; }
          if (VOCABULARY_HI_BLENDS[cleaned]) { bestCandidate = cleaned; matchedVocab = VOCABULARY_HI_BLENDS[cleaned]; break; }
        } else if (lang === "te") {
          if (VOCABULARY_TE_SINGLE[cleaned]) { bestCandidate = cleaned; matchedVocab = VOCABULARY_TE_SINGLE[cleaned]; break; }
          if (VOCABULARY_TE_BLENDS[cleaned]) { bestCandidate = cleaned; matchedVocab = VOCABULARY_TE_BLENDS[cleaned]; break; }
        } else if (lang === "kn") {
          if (VOCABULARY_KN_SINGLE[cleaned]) { bestCandidate = cleaned; matchedVocab = VOCABULARY_KN_SINGLE[cleaned]; break; }
          if (VOCABULARY_KN_BLENDS[cleaned]) { bestCandidate = cleaned; matchedVocab = VOCABULARY_KN_BLENDS[cleaned]; break; }
        } else {
          if (VOCABULARY_EN_SINGLE[cleaned]) { bestCandidate = cleaned; matchedVocab = VOCABULARY_EN_SINGLE[cleaned]; break; }
          if (VOCABULARY_EN_BLENDS[cleaned]) { bestCandidate = cleaned; matchedVocab = VOCABULARY_EN_BLENDS[cleaned]; break; }
        }
      }

      if (!matchedVocab) {
        bestCandidate = candidates[0];
        matchedVocab = getDynamicVocab(bestCandidate, lang);
      }

      ratingStars.innerText = "🤖 AI Guess!";
      if (lang === "hi") ratingText.innerText = `मुझे लगता है आपने लिखा: ${bestCandidate}`;
      else if (lang === "te") ratingText.innerText = `మీరు రాసింది అని నేను అనుకుంటున్నాను: ${bestCandidate}`;
      else if (lang === "kn") ratingText.innerText = `ನೀವು ಬರೆದಿದ್ದೀರಿ ಎಂದು ನಾನು ಭಾವಿಸುತ್ತೇನೆ: ${bestCandidate}`;
      else ratingText.innerText = `I guess you wrote: ${bestCandidate}!`;

      ratingOverlay.style.display = "flex";
      
      setTimeout(() => {
        ratingOverlay.style.display = "none";
      }, 3000);

      let praise = "";
      if (lang === "hi") praise = `मुझे लगता है आपने लिखा ${bestCandidate}`;
      else if (lang === "te") praise = `మీరు రాసింది ${bestCandidate}`;
      else if (lang === "kn") praise = `ನೀವು ಬರೆದಿದ್ದು ${bestCandidate}`;
      else praise = `I think you wrote ${bestCandidate}!`;

      logEngine(`AI prediction: '${bestCandidate}' -> '${matchedVocab.word}'`, 'log');
      triggerVocabularyMatch(bestCandidate, matchedVocab, praise);
    }
  }

  function triggerVocabularyMatch(letter, customVocab = null, praise = null) {
    let vocabData = customVocab;
    let lang = currentLanguage;

    if (!vocabData) {
      if (lang === "hi") {
        vocabData = currentTab === "single" ? VOCABULARY_HI[letter] : VOCABULARY_HI_BLENDS[letter];
      } else if (lang === "te") {
        vocabData = currentTab === "single" ? VOCABULARY_TE_SINGLE[letter] : VOCABULARY_TE_BLENDS[letter];
      } else if (lang === "kn") {
        vocabData = currentTab === "single" ? VOCABULARY_KN_SINGLE[letter] : VOCABULARY_KN_BLENDS[letter];
      } else {
        vocabData = currentTab === "single" ? VOCABULARY_EN_SINGLE[letter] : VOCABULARY_EN_BLENDS[letter];
      }
    }

    if (!vocabData) {
      logEngine(`Letter/blend '${letter}' not found in active database.`, 'err');
      return;
    }

    logEngine(`Success! Match: '${letter}' -> Vocabulary: '${vocabData.word}'`, 'log');

    vocabLetter.innerText = letter;
    vocabWord.innerText = vocabData.word;
    emojiIllustration.innerText = vocabData.emoji;

    const vocabMeaningDisplay = document.getElementById("vocabMeaningDisplay");
    if (vocabMeaningDisplay) {
      if (vocabData.translit && vocabData.meaning) {
        vocabMeaningDisplay.innerText = `(${vocabData.translit} - ${vocabData.meaning})`;
        vocabMeaningDisplay.style.display = "inline-block";
      } else {
        vocabMeaningDisplay.style.display = "none";
      }
    }

    triggerCelebration();
    speakWordSequenced(letter, vocabData, lang, praise);
    highlightKeyboardKey(letter);
    logEngine("Whiteboard drawing preserved.", "log");
  }

  // Confettis Celebration Particle Burst System
  function triggerCelebration() {
    illustrationContainer.classList.add("celebrate");
    setTimeout(() => {
      illustrationContainer.classList.remove("celebrate");
    }, 1500);

    // Confetti burst system
    const confCanvas = document.createElement("canvas");
    confCanvas.className = "celebration-canvas";
    document.body.appendChild(confCanvas);
    
    const cctx = confCanvas.getContext("2d");
    confCanvas.width = window.innerWidth;
    confCanvas.height = window.innerHeight;

    let particles = [];
    const colors = ["#ff597b", "#ffeed0", "#3b82f6", "#10b981", "#f59e0b", "#a855f7"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 50,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.7) * 15 - 5,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015
      });
    }

    function animateParticles() {
      cctx.clearRect(0, 0, confCanvas.width, confCanvas.height);
      let alive = false;
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.alpha -= p.decay;
        
        if (p.alpha > 0) {
          alive = true;
          cctx.fillStyle = p.color;
          cctx.globalAlpha = p.alpha;
          cctx.beginPath();
          cctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          cctx.fill();
        }
      });

      if (alive) {
        requestAnimationFrame(animateParticles);
      } else {
        document.body.removeChild(confCanvas);
      }
    }

    animateParticles();
  }

  // 5. TOOLBAR CONTROLS
  btnClearCanvas.addEventListener("click", () => {
    logEngine("Manual board clear requested.", "log");
    clearBoard();
  });

  btnDoneWriting.addEventListener("click", () => {
    logEngine("Manual verification check requested via 'Done!' button.", "log");
    evaluateDrawing();
  });

  // Color selection dots
  document.querySelectorAll(".color-dot").forEach(dot => {
    dot.addEventListener("click", (e) => {
      document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("active"));
      e.target.classList.add("active");
      brushColor = e.target.getAttribute("data-color");
      logEngine(`Brush color updated to: ${brushColor}`, "log");
    });
  });

  // Brush sizes
  document.querySelectorAll(".size-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
      const targetBtn = e.target.closest(".size-btn");
      targetBtn.classList.add("active");
      brushSize = parseInt(targetBtn.getAttribute("data-size"));
      logEngine(`Brush size updated to: ${brushSize}px`, "log");
    });
  });

  // Sound muting
  btnToggleSound.addEventListener("click", () => {
    isSoundEnabled = !isSoundEnabled;
    if (isSoundEnabled) {
      soundIcon.innerText = "🔊";
      btnToggleSound.style.background = "#f1f5f9";
      logEngine("SpeechSynthesis sound output enabled.", "tts");
      // Repeat current pronunciation if unmuted
      repeatPronunciation();
    } else {
      soundIcon.innerText = "🔇";
      btnToggleSound.style.background = "#fee2e2";
      window.speechSynthesis.cancel();
      logEngine("SpeechSynthesis sound output muted.", "tts");
    }
  });

  function repeatPronunciation() {
    let vocabData = null;
    let lang = currentLanguage;

    if (lang === "hi") {
      vocabData = currentTab === "single" ? VOCABULARY_HI[activeLetter] : VOCABULARY_HI_BLENDS[activeLetter];
    } else if (lang === "te") {
      vocabData = currentTab === "single" ? VOCABULARY_TE_SINGLE[activeLetter] : VOCABULARY_TE_BLENDS[activeLetter];
    } else if (lang === "kn") {
      vocabData = currentTab === "single" ? VOCABULARY_KN_SINGLE[activeLetter] : VOCABULARY_KN_BLENDS[activeLetter];
    } else {
      vocabData = currentTab === "single" ? VOCABULARY_EN_SINGLE[activeLetter] : VOCABULARY_EN_BLENDS[activeLetter];
    }
    
    if (vocabData) {
      speakWordSequenced(activeLetter, vocabData, lang);
    }
  }

  btnRepeatAudio.addEventListener("click", repeatPronunciation);

  // 6. MODE SELECTION & LANGUAGE TOGGLES
  function setLanguageMode(mode) {
    if (currentLanguage === mode) return;
    currentLanguage = mode;

    btnModeEn.classList.toggle("active", mode === "en");
    btnModeHi.classList.toggle("active", mode === "hi");
    btnModeTe.classList.toggle("active", mode === "te");
    btnModeKn.classList.toggle("active", mode === "kn");
    keyboardTogglesRow.style.display = "flex";
    
    boardEnglishSingle.style.display = mode === "en" ? "flex" : "none";
    boardEnglishBlends.style.display = (mode === "en" && currentTab === "blends") ? "flex" : "none";
    
    boardHindiSingle.style.display = mode === "hi" && currentTab === "single" ? "flex" : "none";
    boardHindiBlends.style.display = mode === "hi" && currentTab === "blends" ? "flex" : "none";
    
    boardTeluguSingle.style.display = mode === "te" && currentTab === "single" ? "flex" : "none";
    boardTeluguBlends.style.display = mode === "te" && currentTab === "blends" ? "flex" : "none";
    
    boardKannadaSingle.style.display = mode === "kn" && currentTab === "single" ? "flex" : "none";
    boardKannadaBlends.style.display = mode === "kn" && currentTab === "blends" ? "flex" : "none";

    if (mode === "en") {
      tabEnSingle.innerText = "Single Letters";
      tabEnBlends.innerText = "Multi-Letter Blends";
      activeLetter = currentTab === "single" ? "A" : "CH";
      logEngine("Switched playroom learning mode to English.", "log");
    } else if (mode === "hi") {
      tabEnSingle.innerText = "वर्णमाला (Letters)";
      tabEnBlends.innerText = "संयुक्त व्यंजन (Blends)";
      activeLetter = currentTab === "single" ? "अ" : "क्ष";
      logEngine("Switched playroom learning mode to Hindi Varnamala.", "log");
    } else if (mode === "te") {
      tabEnSingle.innerText = "అక్షరాలు (Letters)";
      tabEnBlends.innerText = "ఒత్తులు (Blends)";
      activeLetter = currentTab === "single" ? "అ" : "క్క";
      logEngine("Switched playroom learning mode to Telugu.", "log");
    } else if (mode === "kn") {
      tabEnSingle.innerText = "ಅಕ್ಷರಗಳು (Letters)";
      tabEnBlends.innerText = "ಒತ್ತುಗಳು (Blends)";
      activeLetter = currentTab === "single" ? "ಅ" : "ಕ್ಕ";
      logEngine("Switched playroom learning mode to Kannada.", "log");
    }

    updateTraceGuideLetter();
    clearBoard();
    if (currentPlayMode === "quiz") {
      loadNextQuizQuestion(true);
    } else {
      repeatPronunciation();
    }
  }

  btnModeEn.addEventListener("click", () => setLanguageMode("en"));
  btnModeHi.addEventListener("click", () => setLanguageMode("hi"));
  btnModeTe.addEventListener("click", () => setLanguageMode("te"));
  btnModeKn.addEventListener("click", () => setLanguageMode("kn"));

  // English keyboard toggles (letters vs blends)
  tabEnSingle.addEventListener("click", () => {
    tabEnSingle.classList.add("active");
    tabEnBlends.classList.remove("active");
    currentTab = "single";
    
    boardEnglishSingle.style.display = currentLanguage === "en" ? "flex" : "none";
    boardEnglishBlends.style.display = "none";
    boardHindiSingle.style.display = currentLanguage === "hi" ? "flex" : "none";
    boardHindiBlends.style.display = "none";
    boardTeluguSingle.style.display = currentLanguage === "te" ? "flex" : "none";
    boardTeluguBlends.style.display = "none";
    boardKannadaSingle.style.display = currentLanguage === "kn" ? "flex" : "none";
    boardKannadaBlends.style.display = "none";
    
    if (currentLanguage === "en") activeLetter = "A";
    else if (currentLanguage === "hi") activeLetter = "अ";
    else if (currentLanguage === "te") activeLetter = "అ";
    else if (currentLanguage === "kn") activeLetter = "ಅ";

    updateTraceGuideLetter();
    clearBoard();
    repeatPronunciation();
  });

  tabEnBlends.addEventListener("click", () => {
    tabEnSingle.classList.remove("active");
    tabEnBlends.classList.add("active");
    currentTab = "blends";
    
    boardEnglishSingle.style.display = "none";
    boardEnglishBlends.style.display = currentLanguage === "en" ? "flex" : "none";
    boardHindiSingle.style.display = "none";
    boardHindiBlends.style.display = currentLanguage === "hi" ? "flex" : "none";
    boardTeluguSingle.style.display = "none";
    boardTeluguBlends.style.display = currentLanguage === "te" ? "flex" : "none";
    boardKannadaSingle.style.display = "none";
    boardKannadaBlends.style.display = currentLanguage === "kn" ? "flex" : "none";
    
    if (currentLanguage === "en") activeLetter = "CH";
    else if (currentLanguage === "hi") activeLetter = "क्ष";
    else if (currentLanguage === "te") activeLetter = "క్క";
    else if (currentLanguage === "kn") activeLetter = "ಕ್ಕ";

    updateTraceGuideLetter();
    clearBoard();
    repeatPronunciation();
  });

  // Tracing guidelines guide updater
  function updateTraceGuideLetter() {
    traceGuide.innerText = activeLetter;
    if (currentLanguage === "hi" || currentLanguage === "te" || currentLanguage === "kn") {
      traceGuide.style.letterSpacing = "0px";
    } else {
      traceGuide.style.letterSpacing = "-10px";
    }
  }

  // 7. TESTING BOARD KEYBOARD BUILDERS
  function buildSelectionKeyboards() {
    // A. English Single Letters (A-Z)
    boardEnglishSingle.innerHTML = "";
    Object.keys(VOCABULARY_EN_SINGLE).forEach(char => {
      const btn = document.createElement("button");
      btn.className = "key-btn";
      btn.innerText = char;
      btn.setAttribute("data-key", char);
      btn.addEventListener("click", () => handleKeyboardSelection(char));
      boardEnglishSingle.appendChild(btn);
    });

    // B. English Blends (CH, SH, TH...)
    boardEnglishBlends.innerHTML = "";
    Object.keys(VOCABULARY_EN_BLENDS).forEach(char => {
      const btn = document.createElement("button");
      btn.className = "key-btn blend";
      btn.innerText = char;
      btn.setAttribute("data-key", char);
      btn.addEventListener("click", () => handleKeyboardSelection(char));
      boardEnglishBlends.appendChild(btn);
    });

    // C. Hindi Single Letters (अ-ह)
    boardHindiSingle.innerHTML = "";
    Object.keys(VOCABULARY_HI).forEach(char => {
      const btn = document.createElement("button");
      btn.className = "key-btn";
      btn.innerText = char;
      btn.setAttribute("data-key", char);
      btn.addEventListener("click", () => handleKeyboardSelection(char));
      boardHindiSingle.appendChild(btn);
    });

    // D. Hindi Blends (क्ष, त्र, ज्ञ...)
    boardHindiBlends.innerHTML = "";
    Object.keys(VOCABULARY_HI_BLENDS).forEach(char => {
      const btn = document.createElement("button");
      btn.className = "key-btn blend";
      btn.innerText = char;
      btn.setAttribute("data-key", char);
      btn.addEventListener("click", () => handleKeyboardSelection(char));
      boardHindiBlends.appendChild(btn);
    });

    // E. Telugu Single Letters
    boardTeluguSingle.innerHTML = "";
    Object.keys(VOCABULARY_TE_SINGLE).forEach(char => {
      const btn = document.createElement("button");
      btn.className = "key-btn";
      btn.innerText = char;
      btn.setAttribute("data-key", char);
      btn.addEventListener("click", () => handleKeyboardSelection(char));
      boardTeluguSingle.appendChild(btn);
    });

    // F. Telugu Blends
    boardTeluguBlends.innerHTML = "";
    Object.keys(VOCABULARY_TE_BLENDS).forEach(char => {
      const btn = document.createElement("button");
      btn.className = "key-btn blend";
      btn.innerText = char;
      btn.setAttribute("data-key", char);
      btn.addEventListener("click", () => handleKeyboardSelection(char));
      boardTeluguBlends.appendChild(btn);
    });

    // G. Kannada Single Letters
    boardKannadaSingle.innerHTML = "";
    Object.keys(VOCABULARY_KN_SINGLE).forEach(char => {
      const btn = document.createElement("button");
      btn.className = "key-btn";
      btn.innerText = char;
      btn.setAttribute("data-key", char);
      btn.addEventListener("click", () => handleKeyboardSelection(char));
      boardKannadaSingle.appendChild(btn);
    });

    // H. Kannada Blends
    boardKannadaBlends.innerHTML = "";
    Object.keys(VOCABULARY_KN_BLENDS).forEach(char => {
      const btn = document.createElement("button");
      btn.className = "key-btn blend";
      btn.innerText = char;
      btn.setAttribute("data-key", char);
      btn.addEventListener("click", () => handleKeyboardSelection(char));
      boardKannadaBlends.appendChild(btn);
    });
  }

  function handleKeyboardSelection(char) {
    logEngine(`Manual testing key selected: '${char}'`, 'log');
    activeLetter = char;
    updateTraceGuideLetter();
    clearBoard();
    
    if (currentPlayMode === "trace") {
      hasDrawnAnything = true;
      evaluateDrawing();
    } else {
      const matched = getDynamicVocab(char, currentLanguage);
      triggerVocabularyMatch(char, matched);
    }
  }

  function highlightKeyboardKey(char) {
    document.querySelectorAll(".key-btn").forEach(btn => btn.classList.remove("active"));
    const activeButtons = document.querySelectorAll(`.key-btn[data-key="${char}"]`);
    activeButtons.forEach(btn => btn.classList.add("active"));
  }

  // 8. NAVIGATION AND PLAY MODES CONTROL
  function goToNextLetter() {
    let keys = [];
    if (currentLanguage === "hi") {
      keys = currentTab === "single" ? Object.keys(VOCABULARY_HI) : Object.keys(VOCABULARY_HI_BLENDS);
    } else if (currentLanguage === "te") {
      keys = currentTab === "single" ? Object.keys(VOCABULARY_TE_SINGLE) : Object.keys(VOCABULARY_TE_BLENDS);
    } else if (currentLanguage === "kn") {
      keys = currentTab === "single" ? Object.keys(VOCABULARY_KN_SINGLE) : Object.keys(VOCABULARY_KN_BLENDS);
    } else {
      keys = currentTab === "single" ? Object.keys(VOCABULARY_EN_SINGLE) : Object.keys(VOCABULARY_EN_BLENDS);
    }
    
    let idx = keys.indexOf(activeLetter);
    if (idx !== -1) {
      let nextIdx = (idx + 1) % keys.length;
      activeLetter = keys[nextIdx];
      logEngine(`Advancing navigation to next letter: '${activeLetter}'`, 'log');
      updateTraceGuideLetter();
      clearBoard();
      repeatPronunciation();
      highlightKeyboardKey(activeLetter);
    }
  }

  function setPlayMode(mode) {
    currentPlayMode = mode;
    clearBoard();

    if (mode === "trace") {
      btnPlayTrace.classList.add("active");
      btnPlayFree.classList.remove("active");
      btnPlayQuiz.classList.remove("active");
      traceGuide.style.display = "block";
      btnNextLetter.style.display = "inline-block";
      canvas.style.display = "block";
      document.querySelector(".canvas-toolbar").style.display = "flex";
      document.querySelector(".auto-recognize-status").style.display = "flex";
      quizOverlay.style.display = "none";
      lblBoardTip.innerText = "Trace the letter below";
      logEngine("Playroom mode updated to: Guided Tracing", "log");
      updateTraceGuideLetter();
      repeatPronunciation();
    } else if (mode === "free") {
      btnPlayTrace.classList.remove("active");
      btnPlayFree.classList.add("active");
      btnPlayQuiz.classList.remove("active");
      traceGuide.style.display = "none";
      btnNextLetter.style.display = "none";
      canvas.style.display = "block";
      document.querySelector(".canvas-toolbar").style.display = "flex";
      document.querySelector(".auto-recognize-status").style.display = "flex";
      quizOverlay.style.display = "none";
      lblBoardTip.innerText = "Write any letter/blend (e.g. FL) on the blank board";
      logEngine("Playroom mode updated to: Advanced Free Write (AI Guess)", "log");
    } else if (mode === "quiz") {
      btnPlayTrace.classList.remove("active");
      btnPlayFree.classList.remove("active");
      btnPlayQuiz.classList.add("active");
      traceGuide.style.display = "none";
      btnNextLetter.style.display = "none";
      canvas.style.display = "none";
      document.querySelector(".canvas-toolbar").style.display = "none";
      document.querySelector(".auto-recognize-status").style.display = "none";
      quizOverlay.style.display = "flex";
      lblBoardTip.innerText = "Fill in the blank by tapping the correct word!";
      logEngine("Playroom mode updated to: Fun Fill-in-the-Blank Quiz", "log");
      loadNextQuizQuestion(true); // reset score and load first question
    }
  }

  btnPlayTrace.addEventListener("click", () => setPlayMode("trace"));
  btnPlayFree.addEventListener("click", () => setPlayMode("free"));
  btnPlayQuiz.addEventListener("click", () => setPlayMode("quiz"));
  btnNextLetter.addEventListener("click", goToNextLetter);

  // 9. MICROPHONE INTERACTIVE SPEECH RECOGNITION (CHILD SPEAK FEEDBACK)
  let recognition = null;
  let isListening = false;

  function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      logEngine("SpeechRecognition API not supported on this browser.", "err");
      btnMicSpeak.style.display = "none"; // Hide if not supported
      return;
    }
    
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      isListening = true;
      btnMicSpeak.classList.add("recording");
      btnMicSpeak.innerHTML = `<span>🔴</span> Listening...`;
      logEngine("Microphone listening active...", "tts");
    };
    
    recognition.onresult = async (event) => {
      const result = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;
      logEngine(`Received voice transcript: "${result}" (Confidence: ${Math.round(confidence * 100)}%)`, "tts");
      
      await evaluatePronunciation(result);
    };
    
    recognition.onerror = (event) => {
      logEngine(`Speech recognition error: ${event.error}`, "err");
      btnMicSpeak.innerHTML = `<span>🎤</span> Tap & Say!`;
      btnMicSpeak.classList.remove("recording");
      isListening = false;
    };
    
    recognition.onend = () => {
      isListening = false;
      btnMicSpeak.innerHTML = `<span>🎤</span> Tap & Say!`;
      btnMicSpeak.classList.remove("recording");
      logEngine("Microphone listening stopped.", "tts");
    };
  }

  async function evaluatePronunciation(spokenText) {
    let vocabData = null;
    let lang = currentLanguage;
    if (lang === "hi") {
      vocabData = currentTab === "single" ? VOCABULARY_HI[activeLetter] : VOCABULARY_HI_BLENDS[activeLetter];
    } else if (lang === "te") {
      vocabData = currentTab === "single" ? VOCABULARY_TE_SINGLE[activeLetter] : VOCABULARY_TE_BLENDS[activeLetter];
    } else if (lang === "kn") {
      vocabData = currentTab === "single" ? VOCABULARY_KN_SINGLE[activeLetter] : VOCABULARY_KN_BLENDS[activeLetter];
    } else {
      vocabData = currentTab === "single" ? VOCABULARY_EN_SINGLE[activeLetter] : VOCABULARY_EN_BLENDS[activeLetter];
    }
    
    if (!vocabData) return;
    let targetWord = vocabData.word;
    
    const spokenClean = spokenText.toLowerCase().trim();
    const targetClean = targetWord.toLowerCase().trim();
    
    const isMatch = spokenClean.includes(targetClean) || targetClean.includes(spokenClean);
    
    window.speechSynthesis.cancel();
    const seqId = ++activeSequenceId;
    
    const speakFeedback = (phrase, feedbackLang = "en") => {
      return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(phrase);
        const activeVoice = getSpeechVoice(feedbackLang);
        if (activeVoice) utterance.voice = activeVoice;
        utterance.pitch = 1.0;
        utterance.rate = feedbackLang === "en" ? 0.95 : 0.88;
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        window.speechSynthesis.speak(utterance);
      });
    };
    
    if (isMatch) {
      logEngine(`Pronunciation MATCH: "${spokenText}" matches target "${targetWord}"!`, "tts");
      triggerCelebration();
      if (lang === "hi") {
        await speakFeedback(`अरे वाह! बहुत सुंदर उच्चारण! आपने कहा ${targetWord}`, "hi");
      } else if (lang === "te") {
        await speakFeedback(`భలే చెప్పారు! చాలా మంచి ఉచ్ఛారణ! మీరు ${targetWord} అన్నారు`, "te");
      } else if (lang === "kn") {
        await speakFeedback(`ಭಲೇ ಹೇಳಿದ್ರಿ! ತುಂಬಾ ಒಳ್ಳೆಯ ಉಚ್ಚಾರಣೆ! ನೀವು ${targetWord} ಅಂದ್ರಿ`, "kn");
      } else {
        await speakFeedback(`Awesome! Perfect pronunciation! You said ${targetWord}`, "en");
      }
    } else {
      logEngine(`Pronunciation MISMATCH: "${spokenText}" did not match target "${targetWord}".`, "tts");
      if (lang === "hi") {
        await speakFeedback(`सुंदर प्रयास! एक बार फिर से बोलिए: ${targetWord}`, "hi");
      } else if (lang === "te") {
        await speakFeedback(`మంచి ప్రయత్నం! ఇంకోసారి చెప్పండి: ${targetWord}`, "te");
      } else if (lang === "kn") {
        await speakFeedback(`ಉತ್ತಮ ಪ್ರಯತ್ನ! ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ: ${targetWord}`, "kn");
      } else {
        await speakFeedback(`Nice try! Let's say it again: ${targetWord}`, "en");
      }
    }
  }

  btnMicSpeak.addEventListener("click", () => {
    if (!recognition) {
      alert("🎙️ Speech Recognition is not supported or active on this device.");
      return;
    }
    if (isListening) {
      recognition.stop();
      return;
    }
    
    let vocabData = null;
    let lang = currentLanguage;
    if (lang === "hi") {
      vocabData = currentTab === "single" ? VOCABULARY_HI[activeLetter] : VOCABULARY_HI_BLENDS[activeLetter];
    } else if (lang === "te") {
      vocabData = currentTab === "single" ? VOCABULARY_TE_SINGLE[activeLetter] : VOCABULARY_TE_BLENDS[activeLetter];
    } else if (lang === "kn") {
      vocabData = currentTab === "single" ? VOCABULARY_KN_SINGLE[activeLetter] : VOCABULARY_KN_BLENDS[activeLetter];
    } else {
      vocabData = currentTab === "single" ? VOCABULARY_EN_SINGLE[activeLetter] : VOCABULARY_EN_BLENDS[activeLetter];
    }
    if (!vocabData) return;
    
    window.speechSynthesis.cancel();
    const seqId = ++activeSequenceId;
    
    let promptPhrase = "";
    if (lang === "hi") {
      promptPhrase = `अब आप बोलिए: ${vocabData.word}`;
    } else if (lang === "te") {
      promptPhrase = `ఇప్పుడు మీ వంతు! చెప్పండి: ${vocabData.word}`;
    } else if (lang === "kn") {
      promptPhrase = `ಈಗ ನಿಮ್ಮ ಸರತಿ! ಹೇಳಿ: ${vocabData.word}`;
    } else {
      promptPhrase = `Now your turn! Say: ${vocabData.word}`;
    }
    
    const utterance = new SpeechSynthesisUtterance(promptPhrase);
    const activeVoice = getSpeechVoice(lang);
    if (activeVoice) utterance.voice = activeVoice;
    utterance.pitch = 1.0;
    utterance.rate = lang === "en" ? 0.95 : 0.88;
    
    utterance.onend = () => {
      if (seqId === activeSequenceId) {
        try {
          let langCode = "en-US";
          if (lang === "hi") langCode = "hi-IN";
          else if (lang === "te") langCode = "te-IN";
          else if (lang === "kn") langCode = "kn-IN";
          recognition.lang = langCode;
          recognition.start();
        } catch(e) {
          logEngine(`Error starting recognition: ${e.message}`, 'err');
        }
      }
    };
    
    utterance.onerror = () => {
      if (seqId === activeSequenceId) {
        recognition.start();
      }
    };
    
    window.speechSynthesis.speak(utterance);
  });

  // ==========================================
  // 10. FUN FILL-IN-THE-BLANK QUIZ ENGINE
  // ==========================================
  
  // Dynamic question pools
  const QUIZ_EN_ANIMALS = [
    { name: "dog", sound: "woof", emoji: "🐶" },
    { name: "cat", sound: "meow", emoji: "🐱" },
    { name: "cow", sound: "moo", emoji: "🐮" },
    { name: "lion", sound: "roar", emoji: "🦁" },
    { name: "bird", sound: "tweet", emoji: "🐦" },
    { name: "sheep", sound: "baa", emoji: "🐑" },
    { name: "duck", sound: "quack", emoji: "🦆" },
    { name: "frog", sound: "ribbit", emoji: "🐸" },
    { name: "rooster", sound: "crow", emoji: "🐓" }
  ];

  const QUIZ_EN_COLORS = [
    { name: "sky", color: "blue", emoji: "🌤️" },
    { name: "grass", color: "green", emoji: "🌱" },
    { name: "banana", color: "yellow", emoji: "🍌" },
    { name: "apple", color: "red", emoji: "🍎" },
    { name: "milk", color: "white", emoji: "🥛" },
    { name: "sun", color: "yellow", emoji: "☀️" },
    { name: "strawberry", color: "red", emoji: "🍓" },
    { name: "carrot", color: "orange", emoji: "🥕" },
    { name: "grapes", color: "purple", emoji: "🍇" }
  ];

  const QUIZ_EN_VERBS = [
    { sentence: "Where ___ you going?", ans: "are", options: ["is", "am", "are"] },
    { sentence: "I ___ a happy child.", ans: "am", options: ["is", "am", "are"] },
    { sentence: "He ___ playing with a ball.", ans: "is", options: ["is", "am", "are"] },
    { sentence: "We ___ going to the park.", ans: "are", options: ["is", "am", "are"] },
    { sentence: "She ___ reading a book.", ans: "is", options: ["is", "am", "are"] },
    { sentence: "They ___ eating ice cream.", ans: "are", options: ["is", "am", "are"] },
    { sentence: "You ___ my best friend.", ans: "are", options: ["is", "am", "are"] }
  ];

  const QUIZ_EN_ARTICLES = [
    { sentence: "I see ___ elephant.", ans: "an", options: ["a", "an", "the"] },
    { sentence: "This is ___ big red apple.", ans: "a", options: ["a", "an", "the"] },
    { sentence: "Look at ___ shining sun.", ans: "the", options: ["a", "an", "the"] },
    { sentence: "She wants ___ orange cup.", ans: "an", options: ["a", "an", "the"] },
    { sentence: "He is holding ___ balloon.", ans: "a", options: ["a", "an", "the"] }
  ];

  const QUIZ_HI_ANIMALS = [
    { name: "बिल्ली", sound: "म्याऊँ", emoji: "🐱" },
    { name: "कुत्ता", sound: "भौ-भौ", emoji: "🐶" },
    { name: "चिड़िया", sound: "चीं-चीं", emoji: "🐦" },
    { name: "मेढक", sound: "टर-टर", emoji: "🐸" },
    { name: "शेर", sound: "दहाड़ता", emoji: "🦁" },
    { name: "गाय", sound: "रंभाती", emoji: "🐮" },
    { name: "बकरी", sound: "म्याँ-म्याँ", emoji: "🐐" }
  ];

  const QUIZ_HI_COLORS = [
    { name: "टमाटर", color: "लाल", emoji: "🍅" },
    { name: "पत्ता", color: "हरा", emoji: "🍃" },
    { name: "आसमान", color: "नीला", emoji: "🌤️" },
    { name: "दूध", color: "सफेद", emoji: "🥛" },
    { name: "केला", color: "पीला", emoji: "🍌" },
    { name: "सेब", color: "लाल", emoji: "🍎" },
    { name: "संतरा", color: "नारंगी", emoji: "🍊" }
  ];

  const QUIZ_HI_VERBS = [
    { sentence: "लड़का दौड़ रहा ___।", ans: "है", options: ["है", "हैं", "हूँ"] },
    { sentence: "हम खेल रहे ___।", ans: "हैं", options: ["है", "हैं", "हूँ"] },
    { sentence: "मैं पढ़ रहा ___।", ans: "हूँ", options: ["है", "हैं", "हूँ"] },
    { sentence: "लड़की नाच रही ___।", ans: "है", options: ["है", "हैं", "हूँ"] },
    { sentence: "बच्चे सो रहे ___।", ans: "हैं", options: ["है", "हैं", "हूँ"] },
    { sentence: "तुम क्या कर रहे ___?", ans: "हो", options: ["हैं", "हो", "हूँ"] }
  ];

  const QUIZ_HI_COUNTS = [
    { name: "हाथ", count: "दो", options: ["दो", "चार", "एक"], sentence: "मेरे पास ___ हाथ हैं।" },
    { name: "पैर", count: "चार", options: ["चार", "दो", "छह"], sentence: "गाय के ___ पैर होते हैं।" },
    { name: "पंख", count: "दो", options: ["दो", "चार", "आठ"], sentence: "चिड़िया के ___ पंख होते हैं।" },
    { name: "आँखें", count: "दो", options: ["दो", "तीन", "चार"], sentence: "मेरी ___ आँखें हैं।" },
    { name: "पहिए", count: "तीन", options: ["तीन", "चार", "दो"], sentence: "ऑटो रिक्शा में ___ पहिए होते हैं।" }
  ];

  const QUIZ_TE_ANIMALS = [
    { name: "పిల్లి", sound: "మ్యావ్", emoji: "🐱" },
    { name: "కుక్క", sound: "భౌ-భౌ", emoji: "🐶" },
    { name: "ఆవు", sound: "అంబా", emoji: "🐮" },
    { name: "కప్ప", sound: "బెకబెక", emoji: "🐸" },
    { name: "సింహం", sound: "గర్జన", emoji: "🦁" }
  ];

  const QUIZ_TE_COLORS = [
    { name: "టమాటా", color: "ఎరుపు", emoji: "🍅" },
    { name: "ఆకు", color: "ఆకుపచ్చ", emoji: "🍃" },
    { name: "పాలు", color: "తెలుపు", emoji: "🥛" },
    { name: "అరటిపండు", color: "పసుపు", emoji: "🍌" }
  ];

  const QUIZ_TE_VERBS = [
    { sentence: "nuvvu ekkadiki ___?", ans: "వెళ్తున్నావు", options: ["వెళ్తున్నావు", "వెళ్తున్నాను", "వెళ్తున్నారు"] },
    { sentence: "నేను బడికి ___.", ans: "వెళ్తున్నాను", options: ["వెళ్తున్నాను", "వెళ్తున్నావు", "వెళ్తున్నారు"] },
    { sentence: "వారు ఆడుకు ___.", ans: "ంటున్నారు", options: ["ంటున్నారు", "ంటున్నాను", "ంటున్నావు"] }
  ];

  const QUIZ_TE_COUNTS = [
    { name: "కళ్ళు", count: "రెండు", options: ["రెండు", "మూడు", "నాలుగు"], sentence: "నాకు ___ కళ్ళు ఉన్నాయి." },
    { name: "కాళ్ళు", count: "నాలుగు", options: ["నాలుగు", "రెండు", "ఆరు"], sentence: "ఆవుకు ___ కాళ్ళు ఉన్నాయి." }
  ];

  const QUIZ_KN_ANIMALS = [
    { name: "ಬೆಕ್ಕು", sound: "ಮಿಯಾವ್", emoji: "🐱" },
    { name: "ನಾಯಿ", sound: "ಬೌ-ಬೌ", emoji: "🐶" },
    { name: "ಹಸು", sound: "ಅಂಬಾ", emoji: "🐮" },
    { name: "ಕಪ್ಪೆ", sound: "ಬೆಕ-ಬೆಕ", emoji: "🐸" },
    { name: "ಸಿಂಹ", sound: "ಗರ್ಜನೆ", emoji: "🦁" }
  ];

  const QUIZ_KN_COLORS = [
    { name: "ಟೊಮೇಟೊ", color: "ಕೆಂಪು", emoji: "🍅" },
    { name: "ಎಲೆ", color: "ಹಸಿರು", emoji: "🍃" },
    { name: "ಹಾಲು", color: "ಬಿಳಿ", emoji: "🥛" },
    { name: "ಬಾಳೆಹಣ್ಣು", color: "ಹಳದಿ", emoji: "🍌" }
  ];

  const QUIZ_KN_VERBS = [
    { sentence: "ನೀನು ಎಲ್ಲಿಗೆ ___?", ans: "ಹೋಗುತ್ತಿದ್ದೀಯಾ", options: ["ಹೋಗುತ್ತಿದ್ದೀಯಾ", "ಹೋಗುತ್ತಿದ್ದೇನೆ", "ಹೋಗುತ್ತಿದ್ದಾರೆ"] },
    { sentence: "ನಾನು ಶಾಲೆಗೆ ___.", ans: "ಹೋಗುತ್ತಿದ್ದೇನೆ", options: ["ಹೋಗುತ್ತಿದ್ದೇನೆ", "ಹೋಗುತ್ತಿದ್ದೀಯಾ", "ಹೋಗುತ್ತಿದ್ದಾರೆ"] }
  ];

  const QUIZ_KN_COUNTS = [
    { name: "ಕಣ್ಣುಗಳು", count: "ಎರಡು", options: ["ಎರಡು", "ಮೂರು", "ನಾಲ್ಕು"], sentence: "ನನಗೆ ___ ಕಣ್ಣುಗಳಿವೆ." },
    { name: "ಕಾಲುಗಳು", count: "ನಾಲ್ಕು", options: ["ನಾಲ್ಕು", "ಎರಡು", "ಆರು"], sentence: "ಹಸುವಿಗೆ ___ ಕಾಲುಗಳಿವೆ." }
  ];

  function generateQuizQuestion(lang) {
    const categories = ["animals", "colors", "verbs", "special"];
    const chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    
    let sentence = "";
    let options = [];
    let answer = "";
    let completed = "";
    
    if (lang === "hi") {
      if (chosenCategory === "animals") {
        const item = QUIZ_HI_ANIMALS[Math.floor(Math.random() * QUIZ_HI_ANIMALS.length)];
        const correct = item.sound;
        sentence = `${item.emoji} ${item.name} ___ करती है।`;
        if (item.name === "शेर") {
          sentence = `${item.emoji} ${item.name} ___ है।`;
        }
        answer = correct;
        const others = QUIZ_HI_ANIMALS.filter(x => x.sound !== correct).map(x => x.sound);
        const wrong1 = others[Math.floor(Math.random() * others.length)];
        const wrong2 = others.filter(x => x !== wrong1)[Math.floor(Math.random() * others.filter(x => x !== wrong1).length)];
        options = [correct, wrong1, wrong2];
        completed = sentence.replace("___", correct);
      } 
      else if (chosenCategory === "colors") {
        const item = QUIZ_HI_COLORS[Math.floor(Math.random() * QUIZ_HI_COLORS.length)];
        const correct = item.color;
        sentence = `${item.emoji} ${item.name} का रंग ___ होता है।`;
        if (item.name === "आसमान") {
          sentence = `${item.emoji} ${item.name} का रंग ___ है।`;
        }
        answer = correct;
        const others = ["लाल", "हरा", "नीला", "पीला", "सफेद", "काला", "नारंगी", "गुलाबी"].filter(x => x !== correct);
        const wrong1 = others[Math.floor(Math.random() * others.length)];
        const wrong2 = others.filter(x => x !== wrong1)[Math.floor(Math.random() * others.filter(x => x !== wrong1).length)];
        options = [correct, wrong1, wrong2];
        completed = sentence.replace("___", correct);
      }
      else if (chosenCategory === "verbs") {
        const item = QUIZ_HI_VERBS[Math.floor(Math.random() * QUIZ_HI_VERBS.length)];
        sentence = item.sentence;
        answer = item.ans;
        options = [...item.options];
        completed = sentence.replace("___", answer);
      }
      else {
        const item = QUIZ_HI_COUNTS[Math.floor(Math.random() * QUIZ_HI_COUNTS.length)];
        sentence = item.sentence;
        answer = item.count;
        options = [...item.options];
        completed = sentence.replace("___", answer);
      }
    } else if (lang === "te") {
      if (chosenCategory === "animals") {
        const item = QUIZ_TE_ANIMALS[Math.floor(Math.random() * QUIZ_TE_ANIMALS.length)];
        const correct = item.sound;
        sentence = `${item.emoji} ${item.name} ___ అంటుంది.`;
        answer = correct;
        const others = QUIZ_TE_ANIMALS.filter(x => x.sound !== correct).map(x => x.sound);
        const wrong1 = others[Math.floor(Math.random() * others.length)] || "భౌ-భౌ";
        const wrong2 = others.filter(x => x !== wrong1)[Math.floor(Math.random() * others.filter(x => x !== wrong1).length)] || "మ్యావ్";
        options = [correct, wrong1, wrong2];
        completed = sentence.replace("___", correct);
      } 
      else if (chosenCategory === "colors") {
        const item = QUIZ_TE_COLORS[Math.floor(Math.random() * QUIZ_TE_COLORS.length)];
        const correct = item.color;
        sentence = `${item.emoji} ${item.name} ___ రంగులో ఉంటుంది.`;
        answer = correct;
        const others = ["ఎరుపు", "ఆకుపచ్చ", "తెలుపు", "పసుపు", "నలుపు", "నీలం"].filter(x => x !== correct);
        const wrong1 = others[Math.floor(Math.random() * others.length)];
        const wrong2 = others.filter(x => x !== wrong1)[Math.floor(Math.random() * others.filter(x => x !== wrong1).length)];
        options = [correct, wrong1, wrong2];
        completed = sentence.replace("___", correct);
      }
      else if (chosenCategory === "verbs") {
        const item = QUIZ_TE_VERBS[Math.floor(Math.random() * QUIZ_TE_VERBS.length)];
        sentence = item.sentence;
        answer = item.ans;
        options = [...item.options];
        completed = sentence.replace("___", answer);
      }
      else {
        const item = QUIZ_TE_COUNTS[Math.floor(Math.random() * QUIZ_TE_COUNTS.length)];
        sentence = item.sentence;
        answer = item.count;
        options = [...item.options];
        completed = sentence.replace("___", answer);
      }
    } else if (lang === "kn") {
      if (chosenCategory === "animals") {
        const item = QUIZ_KN_ANIMALS[Math.floor(Math.random() * QUIZ_KN_ANIMALS.length)];
        const correct = item.sound;
        sentence = `${item.emoji} ${item.name} ___ ಎನ್ನುತ್ತದೆ.`;
        answer = correct;
        const others = QUIZ_KN_ANIMALS.filter(x => x.sound !== correct).map(x => x.sound);
        const wrong1 = others[Math.floor(Math.random() * others.length)] || "ಬೌ-ಬೌ";
        const wrong2 = others.filter(x => x !== wrong1)[Math.floor(Math.random() * others.filter(x => x !== wrong1).length)] || "ಮಿಯಾವ್";
        options = [correct, wrong1, wrong2];
        completed = sentence.replace("___", correct);
      } 
      else if (chosenCategory === "colors") {
        const item = QUIZ_KN_COLORS[Math.floor(Math.random() * QUIZ_KN_COLORS.length)];
        const correct = item.color;
        sentence = `${item.emoji} ${item.name} ___ ಬಣ್ಣದ್ದಾಗಿದೆ.`;
        answer = correct;
        const others = ["ಕೆಂಪು", "ಹಸಿರು", "ಬಿಳಿ", "ಹಳದಿ", "ಕಪ್ಪು", "ನೀಲಿ"].filter(x => x !== correct);
        const wrong1 = others[Math.floor(Math.random() * others.length)];
        const wrong2 = others.filter(x => x !== wrong1)[Math.floor(Math.random() * others.filter(x => x !== wrong1).length)];
        options = [correct, wrong1, wrong2];
        completed = sentence.replace("___", correct);
      }
      else if (chosenCategory === "verbs") {
        const item = QUIZ_KN_VERBS[Math.floor(Math.random() * QUIZ_KN_VERBS.length)];
        sentence = item.sentence;
        answer = item.ans;
        options = [...item.options];
        completed = sentence.replace("___", answer);
      }
      else {
        const item = QUIZ_KN_COUNTS[Math.floor(Math.random() * QUIZ_KN_COUNTS.length)];
        sentence = item.sentence;
        answer = item.count;
        options = [...item.options];
        completed = sentence.replace("___", answer);
      }
    } else {
      if (chosenCategory === "animals") {
        const item = QUIZ_EN_ANIMALS[Math.floor(Math.random() * QUIZ_EN_ANIMALS.length)];
        const correct = item.sound;
        sentence = `A ${item.name} ${item.emoji} says ___ `;
        answer = correct;
        const others = QUIZ_EN_ANIMALS.filter(x => x.sound !== correct).map(x => x.sound);
        const wrong1 = others[Math.floor(Math.random() * others.length)];
        const wrong2 = others.filter(x => x !== wrong1)[Math.floor(Math.random() * others.filter(x => x !== wrong1).length)];
        options = [correct, wrong1, wrong2];
        completed = sentence.replace("___", correct);
      }
      else if (chosenCategory === "colors") {
        const item = QUIZ_EN_COLORS[Math.floor(Math.random() * QUIZ_EN_COLORS.length)];
        const correct = item.color;
        sentence = `The ${item.name} ${item.emoji} is ___ `;
        answer = correct;
        const others = ["blue", "green", "yellow", "red", "white", "orange", "purple", "pink"].filter(x => x !== correct);
        const wrong1 = others[Math.floor(Math.random() * others.length)];
        const wrong2 = others.filter(x => x !== wrong1)[Math.floor(Math.random() * others.filter(x => x !== wrong1).length)];
        options = [correct, wrong1, wrong2];
        completed = sentence.replace("___", correct);
      }
      else if (chosenCategory === "verbs") {
        const item = QUIZ_EN_VERBS[Math.floor(Math.random() * QUIZ_EN_VERBS.length)];
        sentence = item.sentence;
        answer = item.ans;
        options = [...item.options];
        completed = sentence.replace("___", answer);
      }
      else {
        const item = QUIZ_EN_ARTICLES[Math.floor(Math.random() * QUIZ_EN_ARTICLES.length)];
        sentence = item.sentence;
        answer = item.ans;
        options = [...item.options];
        completed = sentence.replace("___", answer);
      }
    }
    
    options = options.sort(() => Math.random() - 0.5);
    
    return {
      sentence,
      options,
      answer,
      completed
    };
  }

  function loadNextQuizQuestion(resetScore = false) {
    let lang = currentLanguage;
    if (resetScore) {
      quizScoreValue = 0;
      quizScore.innerText = (lang === "hi" ? `अंक: 0` : (lang === "te" ? `మార్కులు: 0` : (lang === "kn" ? `ಅಂಕಗಳು: 0` : `Score: 0`)));
    }
    
    const q = generateQuizQuestion(lang);
    renderQuizQuestion(q);
  }

  function renderQuizQuestion(q) {
    currentQuizAnswer = q.answer;
    currentQuizCompletedSentence = q.completed;
    currentQuizSentenceTemplate = q.sentence;
    
    const sentenceHTML = q.sentence.replace("___", `<span class="quiz-blank-box" id="quizBlankBox">?</span>`);
    quizSentence.innerHTML = sentenceHTML;
    
    quizOptionsGrid.innerHTML = "";
    
    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = `quiz-option-btn opt-${idx}`;
      btn.innerText = opt;
      btn.addEventListener("click", () => handleQuizOptionClick(opt, btn));
      quizOptionsGrid.appendChild(btn);
    });
    
    quizFeedbackBox.style.visibility = "hidden";
    btnQuizNext.style.display = "none";
    
    speakQuizPrompt();
  }

  function speakQuizPrompt() {
    if (!isSoundEnabled) return;
    window.speechSynthesis.cancel();
    
    let lang = currentLanguage;
    let textToSpeak = "";
    
    // Strip emojis before speech synthesis
    let cleanedSentence = currentQuizSentenceTemplate.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, '');
    
    if (lang === "hi") {
      textToSpeak = "खाली स्थान भरें: " + cleanedSentence.replace("___", "खाली स्थान");
    } else if (lang === "te") {
      textToSpeak = "ఖాళీ స్థలాన్ని పూరించండి: " + cleanedSentence.replace("___", "ఖాళీ స్థలం");
    } else if (lang === "kn") {
      textToSpeak = "ಖಾಲಿ ಜಾಗವನ್ನು ತುಂಬಿ: " + cleanedSentence.replace("___", "ಖಾಲಿ ಜಾಗ");
    } else {
      textToSpeak = "Fill in the blank: " + cleanedSentence.replace("___", "blank");
    }
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const activeVoice = getSpeechVoice(lang);
    if (activeVoice) utterance.voice = activeVoice;
    utterance.volume = 1.0;
    utterance.pitch = 1.0;
    utterance.rate = lang === "en" ? 0.95 : 0.88;
    window.speechSynthesis.speak(utterance);
  }

  async function handleQuizOptionClick(selectedOption, clickedBtn) {
    let lang = currentLanguage;
    
    if (selectedOption === currentQuizAnswer) {
      logEngine(`Quiz answer selected: '${selectedOption}' is CORRECT!`, 'log');
      
      const blankBox = document.getElementById("quizBlankBox");
      if (blankBox) {
        blankBox.innerText = selectedOption;
        blankBox.classList.add("filled");
      }
      
      document.querySelectorAll(".quiz-option-btn").forEach(b => {
        b.style.pointerEvents = "none";
        if (b.innerText === currentQuizAnswer) {
          b.classList.add("correct");
        }
      });
      
      quizScoreValue++;
      quizScore.innerText = (lang === "hi" ? `अंक: ${quizScoreValue}` : (lang === "te" ? `మార్కులు: ${quizScoreValue}` : (lang === "kn" ? `ಅಂಕಗಳು: ${quizScoreValue}` : `Score: ${quizScoreValue}`)));
      
      const praisesHi = ["बहुत सुंदर!", "शाबाश!", "बिल्कुल सही!", "अति उत्तम!"];
      const praisesEn = ["Super!", "Great Job!", "Correct!", "Fantastic!"];
      const praisesTe = ["చాలా బాగుంది!", "శభాష్!", "ఖచ్చితంగా సరైనది!", "అద్భుతం!"];
      const praisesKn = ["ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ!", "ಶಭಾಷ್!", "ಖಂಡಿತ ಸರಿಯಾಗಿದೆ!", "ಅದ್ಭುತ!"];
      
      let randomPraise = "";
      if (lang === "hi") randomPraise = praisesHi[Math.floor(Math.random() * praisesHi.length)];
      else if (lang === "te") randomPraise = praisesTe[Math.floor(Math.random() * praisesTe.length)];
      else if (lang === "kn") randomPraise = praisesKn[Math.floor(Math.random() * praisesKn.length)];
      else randomPraise = praisesEn[Math.floor(Math.random() * praisesEn.length)];
      
      quizFeedbackEmoji.innerText = "🎉";
      quizFeedbackText.innerText = randomPraise;
      quizFeedbackBox.style.visibility = "visible";
      
      triggerCelebration();
      
      window.speechSynthesis.cancel();
      let cleanCompleted = currentQuizCompletedSentence.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, '');
      const praisePhrase = (lang === "hi" || lang === "te" || lang === "kn")
        ? `${randomPraise} ${cleanCompleted}` 
        : `${randomPraise}! ${cleanCompleted}`;
      
      const utterance = new SpeechSynthesisUtterance(praisePhrase);
      const activeVoice = getSpeechVoice(lang);
      if (activeVoice) utterance.voice = activeVoice;
      utterance.volume = 1.0;
      utterance.pitch = 1.0;
      utterance.rate = lang === "en" ? 0.95 : 0.88;
      window.speechSynthesis.speak(utterance);
      
      btnQuizNext.style.display = "inline-block";
    } else {
      logEngine(`Quiz answer selected: '${selectedOption}' is WRONG.`, 'err');
      clickedBtn.classList.add("wrong");
      
      window.speechSynthesis.cancel();
      let feedbackPhrase = "";
      if (lang === "hi") feedbackPhrase = "सुंदर प्रयास! कोई और उत्तर चुनिए।";
      else if (lang === "te") feedbackPhrase = "మంచి ప్రయత్నం! మరొక పదాన్ని ఎంచుకోండి!";
      else if (lang === "kn") feedbackPhrase = "ಉತ್ತಮ ಪ್ರಯತ್ನ! ಮತ್ತೊಂದು ಪದವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ!";
      else feedbackPhrase = "Nice try! Let's choose another word!";
      
      const utterance = new SpeechSynthesisUtterance(feedbackPhrase);
      const activeVoice = getSpeechVoice(lang);
      if (activeVoice) utterance.voice = activeVoice;
      utterance.volume = 1.0;
      utterance.pitch = 1.0;
      utterance.rate = lang === "en" ? 0.95 : 0.88;
      window.speechSynthesis.speak(utterance);
    }
  }

  btnQuizSpeak.addEventListener("click", () => {
    if (btnQuizNext.style.display === "inline-block") {
      if (!isSoundEnabled) return;
      window.speechSynthesis.cancel();
      let lang = currentLanguage;
      let cleanCompleted = currentQuizCompletedSentence.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanCompleted);
      const activeVoice = getSpeechVoice(lang);
      if (activeVoice) utterance.voice = activeVoice;
      utterance.volume = 1.0;
      utterance.pitch = 1.0;
      utterance.rate = lang === "en" ? 0.95 : 0.88;
      window.speechSynthesis.speak(utterance);
    } else {
      speakQuizPrompt();
    }
  });

  btnQuizNext.addEventListener("click", () => {
    loadNextQuizQuestion(false);
  });

  // Initialization routines
  buildSelectionKeyboards();
  resizeCanvas();
  initSpeechRecognition();
  window.addEventListener("resize", resizeCanvas);

  // Trigger initial TTS
  setTimeout(() => {
    repeatPronunciation();
  }, 1000);
});
