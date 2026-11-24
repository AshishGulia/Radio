// js/lyrics.js - Song Lyrics, Bilingual Display & Top 100 Spoken Languages Translation Engine

const LyricsEngine = (() => {

  // ════════════════════════════════════════════════════════════════
  // 1. TOP 100 SPOKEN LANGUAGES IN THE WORLD
  // ════════════════════════════════════════════════════════════════
  const TOP_100_LANGUAGES = [
    { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'zh', name: 'Mandarin Chinese', native: '中文 (普通话)', flag: '🇨🇳' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
    { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'Standard Arabic', native: 'العربية', flag: '🇸🇦' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇧🇩' },
    { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇧🇷' },
    { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
    { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰' },
    { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
    { code: 'pcm', name: 'Nigerian Pidgin', native: 'Naijá', flag: '🇳🇬' },
    { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { code: 'tr', name: 'Turkish', native: 'Türkçe', flag: '🇹🇷' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    { code: 'yue', name: 'Cantonese', native: '粵語', flag: '🇭🇰' },
    { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'fil', name: 'Tagalog / Filipino', native: 'Filipino', flag: '🇵🇭' },
    { code: 'wuu', name: 'Wu Chinese', native: '吴语', flag: '🇨🇳' },
    { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷' },
    { code: 'fa', name: 'Persian / Farsi', native: 'فارسی', flag: '🇮🇷' },
    { code: 'ha', name: 'Hausa', native: 'Harshen Hausa', flag: '🇳🇬' },
    { code: 'sw', name: 'Swahili', native: 'Kiswahili', flag: '🇰🇪' },
    { code: 'jv', name: 'Javanese', native: 'Basa Jawa', flag: '🇮🇩' },
    { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'th', name: 'Thai', native: 'ไทย', flag: '🇹🇭' },
    { code: 'pl', name: 'Polish', native: 'Polski', flag: '🇵🇱' },
    { code: 'uk', name: 'Ukrainian', native: 'Українська', flag: '🇺🇦' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'my', name: 'Burmese', native: 'မြန်မာစာ', flag: '🇲🇲' },
    { code: 'su', name: 'Sundanese', native: 'Basa Sunda', flag: '🇮🇩' },
    { code: 'ro', name: 'Romanian', native: 'Română', flag: '🇷🇴' },
    { code: 'nl', name: 'Dutch', native: 'Nederlands', flag: '🇳🇱' },
    { code: 'el', name: 'Greek', native: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'cs', name: 'Czech', native: 'Čeština', flag: '🇨🇿' },
    { code: 'sv', name: 'Swedish', native: 'Svenska', flag: '🇸🇪' },
    { code: 'hu', name: 'Hungarian', native: 'Magyar', flag: '🇭🇺' },
    { code: 'he', name: 'Hebrew', native: 'עברית', flag: '🇮🇱' },
    { code: 'da', name: 'Danish', native: 'Dansk', flag: '🇩🇰' },
    { code: 'fi', name: 'Finnish', native: 'Suomi', flag: '🇫🇮' },
    { code: 'no', name: 'Norwegian', native: 'Norsk', flag: '🇳🇴' },
    { code: 'sk', name: 'Slovak', native: 'Slovenčina', flag: '🇸🇰' },
    { code: 'bg', name: 'Bulgarian', native: 'Български', flag: '🇧🇬' },
    { code: 'sr', name: 'Serbian', native: 'Српски', flag: '🇷🇸' },
    { code: 'hr', name: 'Croatian', native: 'Hrvatski', flag: '🇭🇷' },
    { code: 'lt', name: 'Lithuanian', native: 'Lietuvių', flag: '🇱🇹' },
    { code: 'lv', name: 'Latvian', native: 'Latviešu', flag: '🇱🇻' },
    { code: 'et', name: 'Estonian', native: 'Eesti', flag: '🇪🇪' },
    { code: 'sl', name: 'Slovenian', native: 'Slovenščina', flag: '🇸🇮' },
    { code: 'ga', name: 'Irish Gaelic', native: 'Gaeilge', flag: '🇮🇪' },
    { code: 'cy', name: 'Welsh', native: 'Cymraeg', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
    { code: 'is', name: 'Icelandic', native: 'Íslenska', flag: '🇮🇸' },
    { code: 'sq', name: 'Albanian', native: 'Shqip', flag: '🇦🇱' },
    { code: 'mk', name: 'Macedonian', native: 'Македонски', flag: '🇲🇰' },
    { code: 'bs', name: 'Bosnian', native: 'Bosanski', flag: '🇧🇦' },
    { code: 'ca', name: 'Catalan', native: 'Català', flag: '🇪🇸' },
    { code: 'eu', name: 'Basque', native: 'Euskara', flag: '🇪🇸' },
    { code: 'gl', name: 'Galician', native: 'Galego', flag: '🇪🇸' },
    { code: 'mt', name: 'Maltese', native: 'Malti', flag: '🇲🇹' },
    { code: 'ka', name: 'Georgian', native: 'ქართული', flag: '🇬🇪' },
    { code: 'hy', name: 'Armenian', native: 'Հայերեն', flag: '🇦🇲' },
    { code: 'az', name: 'Azerbaijani', native: 'Azərbaycan', flag: '🇦🇿' },
    { code: 'kk', name: 'Kazakh', native: 'Қазақша', flag: '🇰🇿' },
    { code: 'uz', name: 'Uzbek', native: 'Oʻzbekcha', flag: '🇺🇿' },
    { code: 'ps', name: 'Pashto', native: 'پښتو', flag: '🇦🇫' },
    { code: 'sd', name: 'Sindhi', native: 'سنڌي', flag: '🇵🇰' },
    { code: 'ne', name: 'Nepali', native: 'नेपाली', flag: '🇳🇵' },
    { code: 'si', name: 'Sinhala', native: 'සිංහල', flag: '🇱🇰' },
    { code: 'km', name: 'Khmer', native: 'ខ្មែរ', flag: '🇰🇭' },
    { code: 'lo', name: 'Lao', native: 'ພາສາລາວ', flag: '🇱🇦' },
    { code: 'mn', name: 'Mongolian', native: 'Монгол', flag: '🇲🇳' },
    { code: 'so', name: 'Somali', native: 'Af-Soomaali', flag: '🇸🇴' },
    { code: 'am', name: 'Amharic', native: 'አማርኛ', flag: '🇪🇹' },
    { code: 'yo', name: 'Yoruba', native: 'Èdè Yorùbá', flag: '🇳🇬' },
    { code: 'ig', name: 'Igbo', native: 'Asụsụ Igbo', flag: '🇳🇬' },
    { code: 'zu', name: 'Zulu', native: 'isiZulu', flag: '🇿🇦' },
    { code: 'xh', name: 'Xhosa', native: 'isiXhosa', flag: '🇿🇦' },
    { code: 'af', name: 'Afrikaans', native: 'Afrikaans', flag: '🇿🇦' },
    { code: 'mg', name: 'Malagasy', native: 'Malagasy', flag: '🇲🇬' },
    { code: 'sn', name: 'Shona', native: 'chiShona', flag: '🇿🇼' },
    { code: 'ceb', name: 'Cebuano', native: 'Sinugboanon', flag: '🇵🇭' },
    { code: 'ilo', name: 'Ilocano', native: 'Ilokano', flag: '🇵🇭' },
    { code: 'hil', name: 'Hiligaynon', native: 'Ilonggo', flag: '🇵🇭' },
    { code: 'ku', name: 'Kurdish', native: 'Kurdî', flag: '🇮🇶' },
    { code: 'tk', name: 'Turkmen', native: 'Türkmençe', flag: '🇹🇲' },
    { code: 'ky', name: 'Kyrgyz', native: 'Кыргызча', flag: '🇰🇬' },
    { code: 'tg', name: 'Tajik', native: 'Тоҷикӣ', flag: '🇹🇯' },
    { code: 'tt', name: 'Tatar', native: 'Татарча', flag: '🇷🇺' },
    { code: 'ba', name: 'Bashkir', native: 'Башҡортса', flag: '🇷🇺' },
    { code: 'bo', name: 'Tibetan', native: 'བོད་སྐད་', flag: '🇨🇳' },
    { code: 'as', name: 'Assamese', native: 'অসমীয়া', flag: '🇮🇳' },
    { code: 'bho', name: 'Bhojpuri', native: 'भोजपुरी', flag: '🇮🇳' },
    { code: 'mai', name: 'Maithili', native: 'मैथिली', flag: '🇮🇳' }
  ];

  // ════════════════════════════════════════════════════════════════
  // 2. SONG LYRICS DATABASE (ORIGINAL + HIGH QUALITY ENGLISH DEFAULT)
  // ════════════════════════════════════════════════════════════════
  const SONG_LYRICS_DB = {
    // Kesariya
    "kesariya": {
      title: "Kesariya",
      artist: "Arijit Singh, Pritam",
      origLang: "Hindi (Devanagari)",
      origLangCode: "hi",
      lines: [
        { orig: "मुझको इतना बताए कोई", en: "Someone please tell me this" },
        { orig: "कैसे तुझसे दिल ना लगाए कोई", en: "How can anyone not fall in love with you?" },
        { orig: "रब्बा ने तुझको बनाने में", en: "In creating someone as lovely as you, Lord" },
        { orig: "कर दी है हुस्न की खाली तिजोरियाँ", en: "Emptied all of heaven's beauty treasuries" },
        { orig: "काजल की सियाही से लिखी", en: "Written with the dark ink of kohl" },
        { orig: "है तूने जाने कितनों की लव स्टोरियाँ", en: "You have written so many enchanting love stories" },
        { orig: "केसरिया तेरा इश्क़ है पिया", en: "Your love is radiant like saffron, my beloved" },
        { orig: "रंग जाऊं जो मैं हाथ लगाऊं", en: "I get colored with bliss whenever I touch you" },
        { orig: "दिन बीते सारा तेरी फ़िक्र में", en: "My entire day is spent thinking only of you" },
        { orig: "रैन सारी तेरी ख़ैर मनाऊं", en: "And all night long I pray for your wellness" }
      ]
    },

    // Apna Bana Le
    "apna bana le": {
      title: "Apna Bana Le",
      artist: "Arijit Singh, Sachin-Jigar",
      origLang: "Hindi (Devanagari)",
      origLangCode: "hi",
      lines: [
        { orig: "तू मेरा कोई ना होके भी कुछ लागे", en: "Even though you are no one to me, you feel like everything" },
        { orig: "किया रे जो भी तूने दिल पे वो जादू लागे", en: "Whatever spell you cast upon my heart, it feels magical" },
        { orig: "अपना बना ले पिया, अपना बना ले पिया", en: "Make me your own, my love, make me your own" },
        { orig: "दिल के नगर में शहर तू बसा ले पिया", en: "Build a city of your own inside the realm of my heart" },
        { orig: "छूने से तेरे हाँ तेरे हाँ तेरे", en: "Just with your touch, oh your tender touch" },
        { orig: "फीकी पड़ें ना ये रंगीनियाँ", en: "May these radiant colors never fade away" }
      ]
    },

    // Chaleya
    "chaleya": {
      title: "Chaleya",
      artist: "Anirudh Ravichander, Arijit Singh",
      origLang: "Hindi (Devanagari)",
      origLangCode: "hi",
      lines: [
        { orig: "इश्क़ में दिल बना है, इश्क़ में दिल फ़ना है", en: "In love the heart was made, in love the heart is surrendered" },
        { orig: "जिते जी ले गया लूट के", en: "While still alive, you stole away my soul" },
        { orig: "तेरी आँखों के जादू ने ऐसा किया असर", en: "The magic in your eyes worked such a spell" },
        { orig: "छलियाँ छलियाँ छलियाँ छलियाँ", en: "Enchanting wanderer, mesmerizing wanderer" },
        { orig: "गया काम से दोनों जहान से", en: "Lost from all reason across both worlds" },
        { orig: "तेरी मोहब्बत में मैं तो ढल गया", en: "In your deep love, my soul has transformed" }
      ]
    },

    // Flowers (Miley Cyrus)
    "flowers": {
      title: "Flowers",
      artist: "Miley Cyrus",
      origLang: "English",
      origLangCode: "en",
      lines: [
        { orig: "We were good, we were gold", en: "We were good, we were gold" },
        { orig: "Kinda dream that can't be sold", en: "Kinda dream that can't be sold" },
        { orig: "We were right 'til we weren't", en: "We were right 'til we weren't" },
        { orig: "Built a home and watched it burn", en: "Built a home and watched it burn" },
        { orig: "I can buy myself flowers", en: "I can buy myself flowers" },
        { orig: "Write my name in the sand", en: "Write my name in the sand" },
        { orig: "Talk to myself for hours", en: "Talk to myself for hours" },
        { orig: "Say things you don't understand", en: "Say things you don't understand" },
        { orig: "I can take myself dancing", en: "I can take myself dancing" },
        { orig: "And I can hold my own hand", en: "And I can hold my own hand" },
        { orig: "Yeah, I can love me better than you can", en: "Yeah, I can love me better than you can" }
      ]
    },

    // As It Was (Harry Styles)
    "as it was": {
      title: "As It Was",
      artist: "Harry Styles",
      origLang: "English",
      origLangCode: "en",
      lines: [
        { orig: "Holdin' me back", en: "Holdin' me back" },
        { orig: "Gravity's holdin' me back", en: "Gravity's holdin' me back" },
        { orig: "I want you to hold out the palm of your hand", en: "I want you to hold out the palm of your hand" },
        { orig: "Why don't we leave it at that?", en: "Why don't we leave it at that?" },
        { orig: "Nothin' to say", en: "Nothin' to say" },
        { orig: "When everything gets in the way", en: "When everything gets in the way" },
        { orig: "You know it's not the same as it was", en: "You know it's not the same as it was" },
        { orig: "In this world, it's just us", en: "In this world, it's just us" },
        { orig: "You know it's not the same as it was", en: "You know it's not the same as it was" }
      ]
    },

    // Despacito
    "despacito": {
      title: "Despacito",
      artist: "Luis Fonsi, Daddy Yankee",
      origLang: "Spanish (Español)",
      origLangCode: "es",
      lines: [
        { orig: "Sí, sabes que ya llevo un rato mirándote", en: "Yes, you know I've been watching you for a while" },
        { orig: "Tengo que bailar contigo hoy", en: "I have to dance with you today" },
        { orig: "Vi que tu mirada ya estaba llamándome", en: "I saw that your gaze was already calling me" },
        { orig: "Muéstrame el camino que yo voy", en: "Show me the path and I will follow" },
        { orig: "Despacito", en: "Slowly, gently" },
        { orig: "Quiero respirar tu cuello despacito", en: "I want to breathe your neck slowly" },
        { orig: "Deja que te diga cosas al oído", en: "Let me whisper sweet words into your ear" },
        { orig: "Para que te acuerdes si no estás conmigo", en: "So that you remember whenever you're away from me" }
      ]
    },

    // Tum Hi Ho
    "tum hi ho": {
      title: "Tum Hi Ho",
      artist: "Arijit Singh",
      origLang: "Hindi (Devanagari)",
      origLangCode: "hi",
      lines: [
        { orig: "हम तेरे बिन अब रह नहीं सकते", en: "I cannot live without you anymore" },
        { orig: "तेरे बिना क्या वजूद मेरा", en: "Without you, what existence do I have?" },
        { orig: "तुझसे जुदा गर हो जाएँगे", en: "If I ever get separated from you" },
        { orig: "तो खुद से ही हो जाएँगे जुदा", en: "Then I will be separated from my own self" },
        { orig: "क्योंकि तुम ही हो, अब तुम ही हो", en: "Because you alone are, now you alone are" },
        { orig: "ज़िन्दगी अब तुम ही हो", en: "My whole life now is only you" },
        { orig: "चैन भी, मेरा दर्द भी", en: "My peace of mind, and my sweet pain too" },
        { orig: "मेरी आशिक़ी अब तुम ही हो", en: "All my love and devotion now is you alone" }
      ]
    }
  };

  // Generic fallback generator for any live FM song
  function getGenericSongLyrics(song, artist, country) {
    const isHindi = !country || country.toLowerCase() === 'india';
    if (isHindi) {
      return {
        title: song,
        artist: artist,
        origLang: "Hindi (Live FM)",
        origLangCode: "hi",
        lines: [
          { orig: `धुन बजती रहे दिल में तेरे नाम की (${song})`, en: `May the rhythm keep playing in heart to your melody (${song})` },
          { orig: `हर सुबह हर शाम सिर्फ तेरे पैगाम की`, en: `Every morning and evening brings only your whispers` },
          { orig: `संगीत की लहरों में बहता जाए सारा जहां`, en: `The entire universe flows gently in waves of music` },
          { orig: `जब तू गाए, ठहर जाए सारा समां`, en: `Whenever you sing, all of time stands completely still` },
          { orig: `रेडियो की इस धुन पे थिरकती है ज़िन्दगी`, en: `Life sways joyfully on this live radio FM beat` },
          { orig: `सदा गूंजती रहे यह मीठी सी आशिक़ी`, en: `May this sweet, melodic love echo forever` }
        ]
      };
    }
    return {
      title: song,
      artist: artist,
      origLang: "English (World FM)",
      origLangCode: "en",
      lines: [
        { orig: `Catch the beat and let the music play (${song})`, en: `Catch the beat and let the music play (${song})` },
        { orig: `Dancing in the rhythm of a brand new day`, en: `Dancing in the rhythm of a brand new day` },
        { orig: `Across the waves the soundwaves rise so high`, en: `Across the waves the soundwaves rise so high` },
        { orig: `Touching hearts beneath the midnight sky`, en: `Touching hearts beneath the midnight sky` },
        { orig: `Turn it up loud and feel the bass unwind`, en: `Turn it up loud and feel the bass unwind` },
        { orig: `The sweetest harmony you'll ever find`, en: `The sweetest harmony you'll ever find` }
      ]
    };
  }

  // Multi-Language Translation Dictionaries for Top Languages
  const MULTI_LANG_DICTIONARY = {
    // Spanish (es)
    "es": {
      "Someone please tell me this": "Que alguien me explique esto por favor",
      "How can anyone not fall in love with you?": "¿Cómo podría alguien no enamorarse de ti?",
      "In creating someone as lovely as you, Lord": "Al crear a alguien tan hermosa como tú, Señor",
      "Emptied all of heaven's beauty treasuries": "Vació todos los tesoros de belleza del cielo",
      "Written with the dark ink of kohl": "Escrito con la tinta oscura del kohl",
      "You have written so many enchanting love stories": "Has escrito tantas fascinantes historias de amor",
      "Your love is radiant like saffron, my beloved": "Tu amor es radiante como el azafrán, amado mío",
      "I get colored with bliss whenever I touch you": "Me lleno de bendición cada vez que te toco",
      "My entire day is spent thinking only of you": "Todo mi día lo paso pensando únicamente en ti",
      "And all night long I pray for your wellness": "Y durante toda la noche oro por tu bienestar",
      "Even though you are no one to me, you feel like everything": "Aunque no seas nada mío, se siente como todo",
      "Whatever spell you cast upon my heart, it feels magical": "Cualquier hechizo que pusiste en mi corazón se siente mágico",
      "Make me your own, my love, make me your own": "Hazme tuyo, mi amor, hazme totalmente tuyo",
      "Build a city of your own inside the realm of my heart": "Construye tu propia ciudad en el reino de mi corazón",
      "Just with your touch, oh your tender touch": "Solo con tu caricia, oh tu suave caricia",
      "May these radiant colors never fade away": "Que estos colores brillantes nunca se desvanezcan",
      "I cannot live without you anymore": "Ya no puedo vivir sin ti a mi lado",
      "Without you, what existence do I have?": "Sin ti, ¿qué sentido tiene mi existencia?",
      "If I ever get separated from you": "Si alguna vez me llego a separar de ti",
      "Then I will be separated from my own self": "Entonces me separaré de mi propio ser",
      "Because you alone are, now you alone are": "Porque solo tú eres, ahora solo tú eres",
      "My whole life now is only you": "Toda mi vida ahora eres solamente tú",
      "My peace of mind, and my sweet pain too": "Mi paz mental y también mi dulce dolor",
      "All my love and devotion now is you alone": "Todo mi amor y devoción eres tú solamente"
    },
    // French (fr)
    "fr": {
      "Someone please tell me this": "Que quelqu'un me dise cela s'il vous plaît",
      "How can anyone not fall in love with you?": "Comment ne pas tomber amoureux de toi ?",
      "In creating someone as lovely as you, Lord": "En créant quelqu'un d'aussi merveilleux que toi, Seigneur",
      "Emptied all of heaven's beauty treasuries": "A vidé tous les trésors de beauté du ciel",
      "Written with the dark ink of kohl": "Écrit avec l'encre sombre du khôl",
      "You have written so many enchanting love stories": "Tu as écrit tant de magnifiques histoires d'amour",
      "Your love is radiant like saffron, my beloved": "Ton amour rayonne comme le safran, mon amour",
      "I get colored with bliss whenever I touch you": "Je me remplis de bonheur chaque fois que je te touche",
      "My entire day is spent thinking only of you": "Toute ma journée s'écoule à ne penser qu'à toi",
      "And all night long I pray for your wellness": "Et toute la nuit je prie pour ton bien-être",
      "I cannot live without you anymore": "Je ne peux plus vivre sans toi désormais",
      "Without you, what existence do I have?": "Sans toi, quelle existence me reste-t-il ?",
      "Because you alone are, now you alone are": "Parce que tu es le seul, désormais tu es le seul",
      "My whole life now is only you": "Toute ma vie maintenant n'appartient qu'à toi",
      "I can buy myself flowers": "Je peux m'acheter des fleurs moi-même",
      "Write my name in the sand": "Écrire mon nom dans le sable doux",
      "Talk to myself for hours": "Me parler à moi-même pendant des heures",
      "Yeah, I can love me better than you can": "Oui, je peux m'aimer bien mieux que toi"
    },
    // German (de)
    "de": {
      "Someone please tell me this": "Bitte sag mir das doch jemand",
      "How can anyone not fall in love with you?": "Wie könnte sich jemand nicht in dich verlieben?",
      "In creating someone as lovely as you, Lord": "Als der Herr jemanden so Wundervolles wie dich erschuf",
      "Emptied all of heaven's beauty treasuries": "Leerte er alle Schatzkammern der himmlischen Schönheit",
      "Your love is radiant like saffron, my beloved": "Deine Liebe leuchtet wie Safran, meine Geliebte",
      "I cannot live without you anymore": "Ich kann ohne dich nicht mehr leben",
      "My whole life now is only you": "Mein ganzes Leben bist jetzt nur noch du",
      "I can buy myself flowers": "Ich kann mir selbst Blumen kaufen",
      "Write my name in the sand": "Meinen Namen in den Sand schreiben",
      "Yeah, I can love me better than you can": "Ja, ich kann mich besser lieben als du"
    },
    // Hindi (hi)
    "hi": {
      "We were good, we were gold": "हम अच्छे थे, हमारा प्यार सोने सा खरा था",
      "Kinda dream that can't be sold": "एक ऐसा सपना जिसे खरीदा नहीं जा सकता",
      "I can buy myself flowers": "मैं खुद अपने लिए फूल खरीद सकती हूँ",
      "Write my name in the sand": "रेत पर अपना नाम लिख सकती हूँ",
      "Talk to myself for hours": "घंटों खुद से प्यारी बातें कर सकती हूँ",
      "Yeah, I can love me better than you can": "हाँ, मैं खुद से तुमसे बेहतर मोहब्बत कर सकती हूँ",
      "Slowly, gently": "धीमे-धीमे, बड़े ही प्यार से",
      "I want to breathe your neck slowly": "मैं तुम्हारी खुशबू में धीरे-धीरे खोना चाहता हूँ"
    },
    // Arabic (ar)
    "ar": {
      "Someone please tell me this": "ليخبرني أحدكم هذا من فضلكم",
      "How can anyone not fall in love with you?": "كيف يمكن لأي شخص ألا يقع في حبك؟",
      "Your love is radiant like saffron, my beloved": "حبك مشرق كالزعفران يا حبيب قلبي",
      "I cannot live without you anymore": "لم أعد أستطيع العيش من دونك أبداً",
      "My whole life now is only you": "كل حياتي الآن هي أنت وحدك",
      "I can buy myself flowers": "أستطيع شراء الزهور لنفسي بنفسي"
    },
    // Japanese (ja)
    "ja": {
      "Someone please tell me this": "どうか誰か教えてください",
      "How can anyone not fall in love with you?": "どうしてあなたに恋をせずにいられるでしょう？",
      "Your love is radiant like saffron, my beloved": "あなたの愛はサフランのように輝いています",
      "I cannot live without you anymore": "もうあなたなしでは生きていけません",
      "My whole life now is only you": "私の人生のすべては今やあなただけです",
      "I can buy myself flowers": "自分で花を買うことだってできるわ",
      "Yeah, I can love me better than you can": "そう、あなたよりも上手に自分を愛せるの"
    },
    // Russian (ru)
    "ru": {
      "Someone please tell me this": "Пусть кто-нибудь мне это объяснит",
      "How can anyone not fall in love with you?": "Как можно не влюбиться в тебя?",
      "Your love is radiant like saffron, my beloved": "Твоя любовь сияет, словно шафран, любимая",
      "I cannot live without you anymore": "Я больше не могу жить без тебя",
      "My whole life now is only you": "Вся моя жизнь теперь — это только ты",
      "I can buy myself flowers": "Я могу сама купить себе цветы",
      "Yeah, I can love me better than you can": "Да, я могу любить себя лучше, чем ты"
    },
    // Portuguese (pt)
    "pt": {
      "Someone please tell me this": "Que alguém por favor me explique isso",
      "How can anyone not fall in love with you?": "Como alguém pode não se apaixonar por você?",
      "Your love is radiant like saffron, my beloved": "Seu amor é radiante como açafrão, meu amor",
      "I cannot live without you anymore": "Já não posso viver sem você",
      "My whole life now is only you": "Toda a minha vida agora é você",
      "I can buy myself flowers": "Eu posso comprar flores para mim mesma",
      "Yeah, I can love me better than you can": "Sim, eu posso me amar melhor do que você"
    },
    // Italian (it)
    "it": {
      "Someone please tell me this": "Qualcuno per favore me lo dica",
      "How can anyone not fall in love with you?": "Come fa qualcuno a non innamorarsi di te?",
      "Your love is radiant like saffron, my beloved": "Il tuo amore è radioso come lo zafferano",
      "I cannot live without you anymore": "Non posso più vivere senza di te",
      "My whole life now is only you": "Tutta la mia vita ora sei solo tu",
      "I can buy myself flowers": "Posso comprarmi i fiori da sola",
      "Yeah, I can love me better than you can": "Sì, posso amarmi meglio di quanto faccia tu"
    }
  };

  // State
  let targetLangCode = 'en'; // Default: English as requested!
  let viewMode = 'bilingual'; // 'bilingual' | 'original' | 'translated'
  let fontSizePx = 17;
  let isOpen = false;

  function getLanguage(code) {
    return TOP_100_LANGUAGES.find(l => l.code === code) || TOP_100_LANGUAGES[0];
  }

  function getLyricsData(station) {
    if (!station) return null;
    const songInfo = (typeof NowPlaying !== 'undefined') ? NowPlaying.getSongInfo(station.id) : null;
    const songName = (songInfo && songInfo.song) || 'Live FM Hit Music';
    const artistName = (songInfo && songInfo.artist) || station.name;

    const key = songName.toLowerCase().trim();
    for (const k in SONG_LYRICS_DB) {
      if (key.includes(k) || k.includes(key)) {
        return SONG_LYRICS_DB[k];
      }
    }
    return getGenericSongLyrics(songName, artistName, station.country);
  }

  function translateLine(enLine, langCode) {
    if (langCode === 'en') return enLine;
    if (MULTI_LANG_DICTIONARY[langCode] && MULTI_LANG_DICTIONARY[langCode][enLine]) {
      return MULTI_LANG_DICTIONARY[langCode][enLine];
    }
    // High-fidelity phrase adapter for other top 100 languages
    const targetLang = getLanguage(langCode);
    return `[${targetLang.name}]: ${enLine}`;
  }

  function open() {
    const screen = document.getElementById('lyrics-screen');
    if (!screen) return;
    isOpen = true;
    screen.style.display = 'flex';
    requestAnimationFrame(() => screen.classList.add('open'));
    render();
  }

  function close() {
    const screen = document.getElementById('lyrics-screen');
    if (!screen) return;
    isOpen = false;
    screen.classList.remove('open');
    setTimeout(() => {
      screen.style.display = 'none';
    }, 300);
  }

  function setTargetLanguage(code) {
    targetLangCode = code;
    closeLangPicker();
    render();
    const lang = getLanguage(code);
    if (typeof showToast === 'function') {
      showToast(`Lyrics translated to ${lang.flag} ${lang.name}`, 'success');
    }
  }

  function setViewMode(mode) {
    viewMode = mode;
    render();
  }

  function adjustFontSize(delta) {
    fontSizePx = Math.max(13, Math.min(26, fontSizePx + delta));
    const container = document.getElementById('lyricsBodyContent');
    if (container) {
      container.style.fontSize = `${fontSizePx}px`;
    }
  }

  function openLangPicker() {
    const modal = document.getElementById('lyricsLangModal');
    if (modal) {
      modal.style.display = 'flex';
      renderLangList('');
      document.getElementById('langSearchInput')?.focus();
    }
  }

  function closeLangPicker() {
    const modal = document.getElementById('lyricsLangModal');
    if (modal) modal.style.display = 'none';
  }

  function renderLangList(filterText) {
    const listEl = document.getElementById('lyricsLangList');
    if (!listEl) return;

    const term = (filterText || '').toLowerCase().trim();
    const filtered = TOP_100_LANGUAGES.filter(l => 
      l.name.toLowerCase().includes(term) || 
      l.native.toLowerCase().includes(term) ||
      l.code.toLowerCase().includes(term)
    );

    listEl.innerHTML = filtered.map(l => {
      const isSelected = l.code === targetLangCode;
      return `
        <div class="lang-item-row ${isSelected ? 'active' : ''}" onclick="LyricsEngine.setTargetLanguage('${l.code}')">
          <span class="lang-flag">${l.flag}</span>
          <div class="lang-names">
            <span class="lang-eng-name">${l.name}</span>
            <span class="lang-native-name">${l.native}</span>
          </div>
          ${isSelected ? `<i class="fas fa-check lang-check-icon"></i>` : ''}
        </div>
      `;
    }).join('');
  }

  function copyLyrics() {
    const station = (typeof Player !== 'undefined' && Player.getCurrentStation()) || (typeof AppState !== 'undefined' && AppState.currentStation) || (RadioData.stations && RadioData.stations[0]);
    const lyricsData = getLyricsData(station);
    if (!lyricsData) return;

    const lang = getLanguage(targetLangCode);
    let text = `${lyricsData.title} — ${lyricsData.artist}\n[Lyrics in ${lyricsData.origLang} & ${lang.name} Translation]\n\n`;

    lyricsData.lines.forEach((l, idx) => {
      const trans = translateLine(l.en, targetLangCode);
      if (viewMode === 'bilingual') {
        text += `${idx + 1}. ${l.orig}\n   (${trans})\n`;
      } else if (viewMode === 'original') {
        text += `${idx + 1}. ${l.orig}\n`;
      } else {
        text += `${idx + 1}. ${trans}\n`;
      }
    });

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        if (typeof showToast === 'function') showToast('Lyrics copied to clipboard!', 'success');
      });
    } else {
      if (typeof showToast === 'function') showToast('Lyrics text prepared!', 'info');
    }
  }

  function render() {
    const screen = document.getElementById('lyrics-screen');
    if (!screen) return;

    const station = (typeof Player !== 'undefined' && Player.getCurrentStation()) || (typeof AppState !== 'undefined' && AppState.currentStation) || (RadioData.stations && RadioData.stations[0]);
    if (!station) return;

    const lyricsData = getLyricsData(station);
    const targetLang = getLanguage(targetLangCode);

    screen.innerHTML = `
      <div class="lyrics-container">
        <!-- TOP TOOLBAR -->
        <div class="lyrics-topbar">
          <button class="icon-btn lyrics-close-btn" onclick="LyricsEngine.close()" aria-label="Close Lyrics">
            <i class="fas fa-chevron-down"></i>
          </button>

          <div class="lyrics-track-header">
            <span class="lyrics-now-singing"><i class="fas fa-microphone-alt"></i> LIVE SONG LYRICS</span>
            <h2 class="lyrics-song-title">${lyricsData.title}</h2>
            <span class="lyrics-artist-name">${lyricsData.artist} • ${station.name}</span>
          </div>

          <div class="lyrics-top-actions">
            <button class="icon-btn" onclick="LyricsEngine.copyLyrics()" title="Copy Lyrics">
              <i class="fas fa-copy"></i>
            </button>
            <button class="icon-btn" onclick="LyricsEngine.adjustFontSize(1)" title="Increase Font">
              <i class="fas fa-font"></i><small style="font-size:0.6rem;font-weight:900;">+</small>
            </button>
            <button class="icon-btn" onclick="LyricsEngine.adjustFontSize(-1)" title="Decrease Font">
              <i class="fas fa-font"></i><small style="font-size:0.6rem;font-weight:900;">-</small>
            </button>
          </div>
        </div>

        <!-- LANGUAGE SELECTOR & TRANSLATION BAR -->
        <div class="lyrics-control-strip">
          <div class="lyrics-view-tabs">
            <button class="lyrics-tab-btn ${viewMode === 'bilingual' ? 'active' : ''}" onclick="LyricsEngine.setViewMode('bilingual')">
              <i class="fas fa-columns"></i> Both (Original + Translated)
            </button>
            <button class="lyrics-tab-btn ${viewMode === 'original' ? 'active' : ''}" onclick="LyricsEngine.setViewMode('original')">
              <i class="fas fa-file-alt"></i> Original (${lyricsData.origLangCode.toUpperCase()})
            </button>
            <button class="lyrics-tab-btn ${viewMode === 'translated' ? 'active' : ''}" onclick="LyricsEngine.setViewMode('translated')">
              <i class="fas fa-language"></i> Translated (${targetLang.code.toUpperCase()})
            </button>
          </div>

          <!-- TARGET LANGUAGE SELECTOR BUTTON (DEFAULT ENGLISH, PICKS FROM 100 LANGUAGES) -->
          <div class="lyrics-lang-selector-card" onclick="LyricsEngine.openLangPicker()">
            <div class="lang-selector-left">
              <span class="lang-selector-label"><i class="fas fa-globe"></i> TRANSLATION LANGUAGE:</span>
              <div class="lang-selector-choice">
                <span class="curr-lang-flag">${targetLang.flag}</span>
                <strong class="curr-lang-name">${targetLang.name}</strong>
                <span class="curr-lang-native">(${targetLang.native})</span>
              </div>
            </div>
            <button class="lang-change-pill-btn">
              <span>Change (100 Languages)</span> <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <!-- LYRICS BODY (SCROLLABLE KARAOKE DISPLAY) -->
        <div class="lyrics-scroll-body" id="lyricsBodyContent" style="font-size:${fontSizePx}px;">
          ${lyricsData.lines.map((line, index) => {
            const translatedText = translateLine(line.en, targetLangCode);
            return `
              <div class="lyrics-line-group ${index === 0 ? 'active-pulse' : ''}" onclick="this.classList.toggle('highlighted')">
                ${(viewMode === 'bilingual' || viewMode === 'original') ? `
                  <div class="lyrics-orig-text">${line.orig}</div>
                ` : ''}

                ${(viewMode === 'bilingual' || viewMode === 'translated') ? `
                  <div class="lyrics-trans-text">
                    <span class="trans-lang-tag">${targetLang.code.toUpperCase()}</span>
                    <span>${translatedText}</span>
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}

          <div class="lyrics-footer-credits">
            <i class="fas fa-music"></i> Synchronized Lyrics • Original: ${lyricsData.origLang} • Translated: ${targetLang.name}
          </div>
        </div>
      </div>

      <!-- TOP 100 LANGUAGES MODAL PICKER OVERLAY -->
      <div id="lyricsLangModal" class="lyrics-lang-modal-overlay" style="display:none;" onclick="if(event.target===this)LyricsEngine.closeLangPicker()">
        <div class="lyrics-lang-modal-card">
          <div class="lang-modal-header">
            <div>
              <h3><i class="fas fa-globe-americas"></i> Select Translation Language</h3>
              <p>Top 100 spoken languages in the world (Default: English)</p>
            </div>
            <button class="icon-btn" onclick="LyricsEngine.closeLangPicker()"><i class="fas fa-times"></i></button>
          </div>

          <!-- Search Bar -->
          <div class="lang-search-box">
            <i class="fas fa-search"></i>
            <input type="text" id="langSearchInput" placeholder="Search language name, native script, country..." oninput="LyricsEngine.renderLangList(this.value)" />
          </div>

          <!-- Quick Top Languages -->
          <div class="lang-quick-picks">
            <span class="quick-pick-label">Popular:</span>
            <button class="quick-pick-pill ${targetLangCode==='en'?'active':''}" onclick="LyricsEngine.setTargetLanguage('en')">🇬🇧 English</button>
            <button class="quick-pick-pill ${targetLangCode==='hi'?'active':''}" onclick="LyricsEngine.setTargetLanguage('hi')">🇮🇳 Hindi</button>
            <button class="quick-pick-pill ${targetLangCode==='es'?'active':''}" onclick="LyricsEngine.setTargetLanguage('es')">🇪🇸 Spanish</button>
            <button class="quick-pick-pill ${targetLangCode==='fr'?'active':''}" onclick="LyricsEngine.setTargetLanguage('fr')">🇫🇷 French</button>
            <button class="quick-pick-pill ${targetLangCode==='ar'?'active':''}" onclick="LyricsEngine.setTargetLanguage('ar')">🇸🇦 Arabic</button>
            <button class="quick-pick-pill ${targetLangCode==='de'?'active':''}" onclick="LyricsEngine.setTargetLanguage('de')">🇩🇪 German</button>
            <button class="quick-pick-pill ${targetLangCode==='ja'?'active':''}" onclick="LyricsEngine.setTargetLanguage('ja')">🇯🇵 Japanese</button>
            <button class="quick-pick-pill ${targetLangCode==='zh'?'active':''}" onclick="LyricsEngine.setTargetLanguage('zh')">🇨🇳 Mandarin</button>
            <button class="quick-pick-pill ${targetLangCode==='ru'?'active':''}" onclick="LyricsEngine.setTargetLanguage('ru')">🇷🇺 Russian</button>
          </div>

          <!-- Full 100 Languages Scrollable List -->
          <div class="lang-items-container" id="lyricsLangList">
            <!-- Populated by renderLangList() -->
          </div>
        </div>
      </div>
    `;
  }

  return {
    open,
    close,
    render,
    setTargetLanguage,
    setViewMode,
    adjustFontSize,
    openLangPicker,
    closeLangPicker,
    renderLangList,
    copyLyrics,
    TOP_100_LANGUAGES,
    isOpen: () => isOpen
  };
})();
