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
  const btnToggleSound = document.getElementById("btnToggleSound");
  const soundIcon = document.getElementById("soundIcon");
  const btnRepeatAudio = document.getElementById("btnRepeatAudio");

  // Keyboard boards
  const boardEnglishSingle = document.getElementById("boardEnglishSingle");
  const boardEnglishBlends = document.getElementById("boardEnglishBlends");
  const boardHindiSingle = document.getElementById("boardHindiSingle");
  const boardHindiBlends = document.getElementById("boardHindiBlends");
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

  function getSpeechVoice(isHindi) {
    if (isHindi) {
      // Hindi: look for hi-IN or hi- Any premium voice
      const targetVoices = voicesList.filter(v => v.lang.replace('_', '-').startsWith("hi-IN") || v.lang.startsWith("hi"));
      const premiumHiKeywords = ["Google हिन्दी", "Sangeeta", "Lekha", "Veena", "Heera", "Kalpana", "Microsoft"];
      for (const kw of premiumHiKeywords) {
        const match = targetVoices.find(v => v.name.toLowerCase().includes(kw.toLowerCase()));
        if (match) return match;
      }
      return targetVoices.length > 0 ? targetVoices[0] : null;
    } else {
      // English: search for premium en-US/en-GB voices
      const enVoices = voicesList.filter(v => v.lang.toLowerCase().startsWith("en"));
      
      // Prioritized warm, kid-friendly human voices
      const premiumEnKeywords = [
        "samantha",          // Apple premium US
        "google us english",  // Google US
        "google uk english",  // Google UK
        "aria",              // MS Edge neural
        "jenny",             // MS Edge neural
        "guy",               // MS Edge neural
        "serena",            // Apple premium UK
        "daniel",            // Apple premium UK
        "zira",              // Windows default
        "david",             // Windows default
        "karen"              // Apple premium AU
      ];
      
      for (const kw of premiumEnKeywords) {
        const match = enVoices.find(v => v.name.toLowerCase().includes(kw));
        if (match) return match;
      }
      
      // Fallback to en-US/en-GB standard
      const enUSGB = enVoices.filter(v => v.lang.toLowerCase().startsWith("en-us") || v.lang.toLowerCase().startsWith("en-gb"));
      if (enUSGB.length > 0) return enUSGB[0];
      
      return enVoices.length > 0 ? enVoices[0] : null;
    }
  }

  // Auditory sequencing rule builder
  function speakWordSequenced(letter, vocab, isHindi, praise = null) {
    if (!isSoundEnabled) return;

    // Clear any active speak calls
    window.speechSynthesis.cancel();
    
    const seqId = ++activeSequenceId;
    const activeVoice = getSpeechVoice(isHindi);
    logEngine(`Using voice profile: ${activeVoice ? activeVoice.name : "System Default"} (${isHindi ? "Hindi" : "English"})`, 'tts');

    const speakSegment = (phrase, prePauseMs = 0, rateOverride = null) => {
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
          if (activeVoice) utterance.voice = activeVoice;
          utterance.volume = 1.0;
          utterance.pitch = 1.0; // natural human pitch
          utterance.rate = rateOverride || (isHindi ? 0.88 : 0.95); // natural speed for kids
          
          utterance.onend = () => resolve();
          utterance.onerror = () => resolve();
          window.speechSynthesis.speak(utterance);
        }, prePauseMs);
      });
    };

    const runSequence = async () => {
      const checkAbort = () => seqId !== activeSequenceId;

      if (praise) {
        await speakSegment(praise);
        if (checkAbort()) return;
      }

      if (isHindi) {
        if (vocab.components) {
          // Hindi blend breakdown: "क और ष मिलकर बनता है क्ष। क्ष से कक्षा।"
          logEngine(`Audio out (Hindi Blend): "${vocab.components} मिलकर बनता है ${letter}। ${letter} से ${vocab.word}"`, 'tts');
          await speakSegment(`${vocab.components}`);
          if (checkAbort()) return;
          await speakSegment(`मिलकर बनता है ${letter}`, 250);
          if (checkAbort()) return;
          await speakSegment(`${letter} से ${vocab.word}`, 300);
        } else {
          // Hindi sequencing: "क से कमल"
          logEngine(`Audio out (Hindi): "${letter} से ${vocab.word}"`, 'tts');
          await speakSegment(`${letter} से ${vocab.word}`);
        }
      } else {
        const isBlend = letter.length > 1;
        if (!isBlend) {
          // English single letter: "A says ah. A for Apple... A, P, P, L, E"
          logEngine(`Audio out (Single Phonics): "${letter} says ${vocab.phonic || letter}. ${letter} for ${vocab.word}"`, 'tts');
          
          if (vocab.phonic) {
            await speakSegment(`${letter} says ${vocab.phonic}`, 0);
          } else {
            await speakSegment(`${letter}`, 0);
          }
          if (checkAbort()) return;
          
          await speakSegment(`${letter} is for ${vocab.word}`, 200);
          if (checkAbort()) return;
          
          const spelling = vocab.word.toUpperCase().split('').join(', ');
          await speakSegment(spelling, 250);
        } else {
          // English Multi-Letter Blend: "C, H says chuh. CH for Chair... C, H, A, I, R"
          logEngine(`Audio out (Blend Phonics): "${letter.split('').join(' ')} says ${vocab.phonic || letter}. ${letter} for ${vocab.word}"`, 'tts');
          
          const blendSpelling = letter.split('').join(', ');
          if (vocab.phonic) {
            await speakSegment(`${blendSpelling} says ${vocab.phonic}`, 0);
          } else {
            await speakSegment(`${blendSpelling}`, 0);
          }
          if (checkAbort()) return;
          
          await speakSegment(`${letter} is for ${vocab.word}`, 200);
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
  async function recognizeHandwriting(strokes, isHindi) {
    const itc = isHindi ? "hi-t-i0-handwrit" : "en-t-i0-handwrit";
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
        language: isHindi ? "hi" : "en"
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

  function getDynamicVocab(candidate, isHindi) {
    if (isHindi) {
      if (VOCABULARY_HI[candidate]) return VOCABULARY_HI[candidate];
      return { word: candidate, emoji: "✏️" };
    }
    
    const upper = candidate.toUpperCase().trim();
    if (VOCABULARY_EN_SINGLE[upper]) return VOCABULARY_EN_SINGLE[upper];
    if (VOCABULARY_EN_BLENDS[upper]) return VOCABULARY_EN_BLENDS[upper];
    
    // Dynamic lookup table for other common words they might write
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
    
    // Fallback: title-case the word
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
    octx.letterSpacing = (currentLanguage === "hi") ? "0px" : "-10px";
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

  function getDynamicVocab(candidate, isHindi) {
    if (isHindi) {
      if (VOCABULARY_HI[candidate]) return VOCABULARY_HI[candidate];
      if (VOCABULARY_HI_BLENDS[candidate]) return VOCABULARY_HI_BLENDS[candidate];
      return { word: candidate, emoji: "✏️" };
    }
    
    const upper = candidate.toUpperCase().trim();
    if (VOCABULARY_EN_SINGLE[upper]) return VOCABULARY_EN_SINGLE[upper];
    if (VOCABULARY_EN_BLENDS[upper]) return VOCABULARY_EN_BLENDS[upper];
    
    // Dynamic lookup table for other common words they might write
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
    
    // Fallback: title-case the word
    const titleCase = candidate.charAt(0).toUpperCase() + candidate.slice(1).toLowerCase();
    return { word: titleCase, emoji: "🎨" };
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
    
    let isHindi = currentLanguage === "hi";

    if (currentPlayMode === "trace") {
      // Trace mode: Guided tracing helper
      const score = calculateTracingScore();
      
      let stars = "";
      let text = "";
      let praise = "";

      if (score >= 80) {
        stars = "⭐⭐⭐";
        text = isHindi ? "अति उत्तम! बहुत सुंदर!" : "Excellent! Super neat!";
        praise = isHindi ? "अति उत्तम!" : "Excellent!";
      } else if (score >= 50) {
        stars = "⭐⭐";
        text = isHindi ? "बहुत बढ़िया! अच्छा प्रयास!" : "Good Job! Keep it up!";
        praise = isHindi ? "बहुत बढ़िया!" : "Good job!";
      } else if (score >= 15) {
        stars = "⭐";
        text = isHindi ? "सुंदर प्रयास! थोड़ा और सुधारें!" : "Nice Try! Keep tracing!";
        praise = isHindi ? "सुंदर प्रयास!" : "Nice try!";
      } else {
        stars = "✏️";
        text = isHindi ? "फिर से प्रयास करें! आप कर सकते हैं!" : "Let's practice some more!";
        praise = isHindi ? "फिर से प्रयास करें!" : "Let's practice!";
      }

      // Show rating overlay
      ratingStars.innerText = stars;
      ratingText.innerText = text;
      ratingOverlay.style.display = "flex";
      
      // Auto hide after 3 seconds
      setTimeout(() => {
        ratingOverlay.style.display = "none";
      }, 3000);

      logEngine(`[TRACING ENGINE] Tracing Score: ${score}% (${praise})`, 'log');
      triggerVocabularyMatch(activeLetter, null, praise);
    } else {
      // Free write mode: Real AI recognition via API
      logEngine(`[AI ENGINE] Evaluating strokes for free drawing...`, 'log');
      const candidates = await recognizeHandwriting(strokesData, isHindi);
      
      if (candidates.length === 0) {
        logEngine("AI could not recognize the writing. Try drawing again!", "err");
        alert("🤔 Hmmm, I couldn't guess that one. Try drawing again!");
        clearBoard();
        return;
      }

      // Check candidates and find the first matching vocabulary word
      let bestCandidate = null;
      let matchedVocab = null;

      for (const cand of candidates) {
        const cleaned = isHindi ? cand.trim() : cand.toUpperCase().trim();
        if (isHindi) {
          if (VOCABULARY_HI[cleaned]) {
            bestCandidate = cleaned;
            matchedVocab = VOCABULARY_HI[cleaned];
            break;
          }
          if (VOCABULARY_HI_BLENDS[cleaned]) {
            bestCandidate = cleaned;
            matchedVocab = VOCABULARY_HI_BLENDS[cleaned];
            break;
          }
        } else {
          if (VOCABULARY_EN_SINGLE[cleaned]) {
            bestCandidate = cleaned;
            matchedVocab = VOCABULARY_EN_SINGLE[cleaned];
            break;
          }
          if (VOCABULARY_EN_BLENDS[cleaned]) {
            bestCandidate = cleaned;
            matchedVocab = VOCABULARY_EN_BLENDS[cleaned];
            break;
          }
        }
      }

      if (!matchedVocab) {
        bestCandidate = candidates[0];
        matchedVocab = getDynamicVocab(bestCandidate, isHindi);
      }

      // Show AI Guess overlay
      ratingStars.innerText = "🤖 AI Guess!";
      ratingText.innerText = isHindi ? `मुझे लगता है आपने लिखा: ${bestCandidate}` : `I guess you wrote: ${bestCandidate}!`;
      ratingOverlay.style.display = "flex";
      
      setTimeout(() => {
        ratingOverlay.style.display = "none";
      }, 3000);

      const praise = isHindi ? `मुझे लगता है आपने लिखा ${bestCandidate}` : `I think you wrote ${bestCandidate}!`;
      logEngine(`AI prediction: '${bestCandidate}' -> '${matchedVocab.word}'`, 'log');
      triggerVocabularyMatch(bestCandidate, matchedVocab, praise);
    }
  }

  function triggerVocabularyMatch(letter, customVocab = null, praise = null) {
    let vocabData = customVocab;
    let isHindi = currentLanguage === "hi";

    if (!vocabData) {
      if (isHindi) {
        vocabData = currentTab === "single" ? VOCABULARY_HI[letter] : VOCABULARY_HI_BLENDS[letter];
      } else {
        vocabData = currentTab === "single" ? VOCABULARY_EN_SINGLE[letter] : VOCABULARY_EN_BLENDS[letter];
      }
    }

    if (!vocabData) {
      logEngine(`Letter/blend '${letter}' not found in active database.`, 'err');
      return;
    }

    logEngine(`Success! Match: '${letter}' -> Vocabulary: '${vocabData.word}'`, 'log');

    // Update vocabulary display cards
    vocabLetter.innerText = letter;
    vocabWord.innerText = vocabData.word;
    emojiIllustration.innerText = vocabData.emoji;

    // Apply animation burst celebration
    triggerCelebration();

    // Sequenced audio pronunciations
    speakWordSequenced(letter, vocabData, isHindi, praise);

    // Highlight key buttons in testing selection board
    highlightKeyboardKey(letter);

    // Whiteboard drawing is preserved for kids to look at. Clear is done manually or on next letter.
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
    let isHindi = currentLanguage === "hi";

    if (isHindi) {
      vocabData = VOCABULARY_HI[activeLetter];
    } else {
      vocabData = currentTab === "single" ? VOCABULARY_EN_SINGLE[activeLetter] : VOCABULARY_EN_BLENDS[activeLetter];
    }
    
    if (vocabData) {
      speakWordSequenced(activeLetter, vocabData, isHindi);
    }
  }

  btnRepeatAudio.addEventListener("click", repeatPronunciation);

  // 6. MODE SELECTION & LANGUAGE TOGGLES
  function setLanguageMode(mode) {
    if (currentLanguage === mode) return;
    currentLanguage = mode;

    if (mode === "en") {
      btnModeEn.classList.add("active");
      btnModeHi.classList.remove("active");
      keyboardTogglesRow.style.display = "flex";
      
      boardEnglishSingle.style.display = "flex";
      boardEnglishBlends.style.display = currentTab === "blends" ? "flex" : "none";
      boardHindiSingle.style.display = "none";
      boardHindiBlends.style.display = "none";
      
      // Update toggle buttons text
      tabEnSingle.innerText = "Single Letters";
      tabEnBlends.innerText = "Multi-Letter Blends";
      
      activeLetter = currentTab === "single" ? "A" : "CH";
      logEngine("Switched playroom learning mode to English.", "log");
    } else {
      btnModeEn.classList.remove("active");
      btnModeHi.classList.add("active");
      keyboardTogglesRow.style.display = "flex"; // Keep visible for Hindi blends too!
      
      boardEnglishSingle.style.display = "none";
      boardEnglishBlends.style.display = "none";
      boardHindiSingle.style.display = currentTab === "single" ? "flex" : "none";
      boardHindiBlends.style.display = currentTab === "blends" ? "flex" : "none";
      
      // Update toggle buttons text for Hindi
      tabEnSingle.innerText = "वर्णमाला (Letters)";
      tabEnBlends.innerText = "संयुक्त व्यंजन (Blends)";
      
      activeLetter = currentTab === "single" ? "अ" : "क्ष";
      logEngine("Switched playroom learning mode to Hindi Varnamala.", "log");
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

  // English keyboard toggles (letters vs blends)
  tabEnSingle.addEventListener("click", () => {
    tabEnSingle.classList.add("active");
    tabEnBlends.classList.remove("active");
    currentTab = "single";
    
    if (currentLanguage === "en") {
      boardEnglishSingle.style.display = "flex";
      boardEnglishBlends.style.display = "none";
      boardHindiSingle.style.display = "none";
      boardHindiBlends.style.display = "none";
      activeLetter = "A";
    } else {
      boardEnglishSingle.style.display = "none";
      boardEnglishBlends.style.display = "none";
      boardHindiSingle.style.display = "flex";
      boardHindiBlends.style.display = "none";
      activeLetter = "अ";
    }
    updateTraceGuideLetter();
    clearBoard();
    repeatPronunciation();
  });

  tabEnBlends.addEventListener("click", () => {
    tabEnSingle.classList.remove("active");
    tabEnBlends.classList.add("active");
    currentTab = "blends";
    
    if (currentLanguage === "en") {
      boardEnglishSingle.style.display = "none";
      boardEnglishBlends.style.display = "flex";
      boardHindiSingle.style.display = "none";
      boardHindiBlends.style.display = "none";
      activeLetter = "CH";
    } else {
      boardEnglishSingle.style.display = "none";
      boardEnglishBlends.style.display = "none";
      boardHindiSingle.style.display = "none";
      boardHindiBlends.style.display = "flex";
      activeLetter = "क्ष";
    }
    updateTraceGuideLetter();
    clearBoard();
    repeatPronunciation();
  });

  // Tracing guidelines guide updater
  function updateTraceGuideLetter() {
    traceGuide.innerText = activeLetter;
    // Set custom fonts or sizes for Hindi since it requires clean rendering space
    if (currentLanguage === "hi") {
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
  }

  function handleKeyboardSelection(char) {
    logEngine(`Manual testing key selected: '${char}'`, 'log');
    activeLetter = char;
    updateTraceGuideLetter();
    clearBoard();
    
    // If in trace mode, simulate success on click. In free mode, let them write or check directly.
    if (currentPlayMode === "trace") {
      hasDrawnAnything = true;
      evaluateDrawing();
    } else {
      // Just update displays and speak it directly
      const matched = getDynamicVocab(char, currentLanguage === "hi");
      triggerVocabularyMatch(char, matched);
    }
  }

  function highlightKeyboardKey(char) {
    // Clear highlights
    document.querySelectorAll(".key-btn").forEach(btn => btn.classList.remove("active"));
    
    // Add highlight class to matching buttons
    const activeButtons = document.querySelectorAll(`.key-btn[data-key="${char}"]`);
    activeButtons.forEach(btn => btn.classList.add("active"));
  }

  // 8. NAVIGATION AND PLAY MODES CONTROL
  function goToNextLetter() {
    let keys = [];
    if (currentLanguage === "hi") {
      keys = currentTab === "single" ? Object.keys(VOCABULARY_HI) : Object.keys(VOCABULARY_HI_BLENDS);
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
    let isHindi = currentLanguage === "hi";
    let targetWord = "";
    let vocabData = null;
    
    if (isHindi) {
      vocabData = currentTab === "single" ? VOCABULARY_HI[activeLetter] : VOCABULARY_HI_BLENDS[activeLetter];
    } else {
      vocabData = currentTab === "single" ? VOCABULARY_EN_SINGLE[activeLetter] : VOCABULARY_EN_BLENDS[activeLetter];
    }
    
    if (!vocabData) return;
    targetWord = vocabData.word;
    
    const spokenClean = spokenText.toLowerCase().trim();
    const targetClean = targetWord.toLowerCase().trim();
    
    // Forgiving check for kids: match if spoken contains target or vice versa
    const isMatch = spokenClean.includes(targetClean) || targetClean.includes(spokenClean);
    
    // Cancel any active TTS
    window.speechSynthesis.cancel();
    const seqId = ++activeSequenceId;
    
    const speakFeedback = (phrase) => {
      return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(phrase);
        const activeVoice = getSpeechVoice(isHindi);
        if (activeVoice) utterance.voice = activeVoice;
        utterance.pitch = 1.0;
        utterance.rate = isHindi ? 0.88 : 0.95;
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        window.speechSynthesis.speak(utterance);
      });
    };
    
    if (isMatch) {
      logEngine(`Pronunciation MATCH: "${spokenText}" matches target "${targetWord}"!`, "tts");
      triggerCelebration();
      if (isHindi) {
        await speakFeedback(`अरे वाह! बहुत सुंदर उच्चारण! आपने कहा ${targetWord}`);
      } else {
        await speakFeedback(`Awesome! Perfect pronunciation! You said ${targetWord}`);
      }
    } else {
      logEngine(`Pronunciation MISMATCH: "${spokenText}" did not match target "${targetWord}".`, "tts");
      if (isHindi) {
        await speakFeedback(`सुंदर प्रयास! एक बार फिर से बोलिए: ${targetWord}`);
      } else {
        await speakFeedback(`Nice try! Let's say it again: ${targetWord}`);
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
    
    let isHindi = currentLanguage === "hi";
    let vocabData = null;
    
    if (isHindi) {
      vocabData = currentTab === "single" ? VOCABULARY_HI[activeLetter] : VOCABULARY_HI_BLENDS[activeLetter];
    } else {
      vocabData = currentTab === "single" ? VOCABULARY_EN_SINGLE[activeLetter] : VOCABULARY_EN_BLENDS[activeLetter];
    }
    if (!vocabData) return;
    
    // Pronounce instruction prompt: "Now say: [word]!"
    window.speechSynthesis.cancel();
    const seqId = ++activeSequenceId;
    
    const promptPhrase = isHindi ? `अब आप बोलिए: ${vocabData.word}` : `Now your turn! Say: ${vocabData.word}`;
    const utterance = new SpeechSynthesisUtterance(promptPhrase);
    const activeVoice = getSpeechVoice(isHindi);
    if (activeVoice) utterance.voice = activeVoice;
    utterance.pitch = 1.0;
    utterance.rate = isHindi ? 0.88 : 0.95;
    
    utterance.onend = () => {
      // Start recording once speech ends
      if (seqId === activeSequenceId) {
        try {
          recognition.lang = isHindi ? "hi-IN" : "en-IN";
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

  function generateQuizQuestion(isHindi) {
    const categories = ["animals", "colors", "verbs", "special"];
    const chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    
    let sentence = "";
    let options = [];
    let answer = "";
    let completed = "";
    
    if (isHindi) {
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
    if (resetScore) {
      quizScoreValue = 0;
      let isHindi = currentLanguage === "hi";
      quizScore.innerText = isHindi ? `अंक: 0` : `Score: 0`;
    }
    
    let isHindi = currentLanguage === "hi";
    const q = generateQuizQuestion(isHindi);
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
    
    let isHindi = currentLanguage === "hi";
    let textToSpeak = "";
    
    // Strip emojis before speech synthesis
    let cleanedSentence = currentQuizSentenceTemplate.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, '');
    
    if (isHindi) {
      textToSpeak = "खाली स्थान भरें: " + cleanedSentence.replace("___", "खाली स्थान");
    } else {
      textToSpeak = "Fill in the blank: " + cleanedSentence.replace("___", "blank");
    }
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const activeVoice = getSpeechVoice(isHindi);
    if (activeVoice) utterance.voice = activeVoice;
    utterance.volume = 1.0;
    utterance.pitch = 1.0;
    utterance.rate = isHindi ? 0.88 : 0.95;
    window.speechSynthesis.speak(utterance);
  }

  async function handleQuizOptionClick(selectedOption, clickedBtn) {
    let isHindi = currentLanguage === "hi";
    
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
      quizScore.innerText = isHindi ? `अंक: ${quizScoreValue}` : `Score: ${quizScoreValue}`;
      
      const praisesHi = ["बहुत सुंदर!", "शाबाश!", "बिल्कुल सही!", "अति उत्तम!"];
      const praisesEn = ["Super!", "Great Job!", "Correct!", "Fantastic!"];
      
      const randomPraise = isHindi 
        ? praisesHi[Math.floor(Math.random() * praisesHi.length)] 
        : praisesEn[Math.floor(Math.random() * praisesEn.length)];
      
      quizFeedbackEmoji.innerText = "🎉";
      quizFeedbackText.innerText = randomPraise;
      quizFeedbackBox.style.visibility = "visible";
      
      triggerCelebration();
      
      window.speechSynthesis.cancel();
      let cleanCompleted = currentQuizCompletedSentence.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, '');
      const praisePhrase = isHindi 
        ? `${randomPraise} ${cleanCompleted}` 
        : `${randomPraise}! ${cleanCompleted}`;
      
      const utterance = new SpeechSynthesisUtterance(praisePhrase);
      const activeVoice = getSpeechVoice(isHindi);
      if (activeVoice) utterance.voice = activeVoice;
      utterance.volume = 1.0;
      utterance.pitch = 1.0;
      utterance.rate = isHindi ? 0.88 : 0.95;
      window.speechSynthesis.speak(utterance);
      
      btnQuizNext.style.display = "inline-block";
    } else {
      logEngine(`Quiz answer selected: '${selectedOption}' is WRONG.`, 'err');
      clickedBtn.classList.add("wrong");
      
      window.speechSynthesis.cancel();
      const feedbackPhrase = isHindi 
        ? "सुंदर प्रयास! कोई और उत्तर चुनिए।" 
        : "Nice try! Let's choose another word!";
      
      const utterance = new SpeechSynthesisUtterance(feedbackPhrase);
      const activeVoice = getSpeechVoice(isHindi);
      if (activeVoice) utterance.voice = activeVoice;
      utterance.volume = 1.0;
      utterance.pitch = 1.0;
      utterance.rate = isHindi ? 0.88 : 0.95;
      window.speechSynthesis.speak(utterance);
    }
  }

  btnQuizSpeak.addEventListener("click", () => {
    if (btnQuizNext.style.display === "inline-block") {
      if (!isSoundEnabled) return;
      window.speechSynthesis.cancel();
      let isHindi = currentLanguage === "hi";
      let cleanCompleted = currentQuizCompletedSentence.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanCompleted);
      const activeVoice = getSpeechVoice(isHindi);
      if (activeVoice) utterance.voice = activeVoice;
      utterance.volume = 1.0;
      utterance.pitch = 1.0;
      utterance.rate = isHindi ? 0.88 : 0.95;
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
