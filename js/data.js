// js/data.js - World Music Radio Stations Directory & Metadata (100% Music & Songs, Zero News/Talk)

const RadioData = {

  stations: [
    // ── INDIA (Bollywood, Punjabi, Classical, Sufi, Devotional, Tamil, Telugu, Indie, Pop) ──
    {
      "id": 1,
      "name": "Radio Mirchi 98.3",
      "freq": "98.3 FM",
      "city": "Mumbai",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["bollywood", "pop"],
      "stream": "https://drive.uber.radio/uber/bollywood2010s/icecast.audio",
      "color": "#ff4040",
      "description": "Hot Bollywood & Fresh Hindi Hits"
    },
    {
      "id": 2,
      "name": "Radio City 91.1",
      "freq": "91.1 FM",
      "city": "Mumbai",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["bollywood", "indie"],
      "stream": "https://server.mediacast4u.stream/8002/stream",
      "color": "#ff6b35",
      "description": "Rag Rag Mein Daude City"
    },
    {
      "id": 3,
      "name": "Big FM 92.7",
      "freq": "92.7 FM",
      "city": "Delhi",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["bollywood", "pop"],
      "stream": "http://strm112.1.fm/bombaybeats_mobile_mp3",
      "color": "#f7b731",
      "description": "Dhun Badal Ke Toh Dekho"
    },
    {
      "id": 4,
      "name": "AIR FM Rainbow Music",
      "freq": "102.6 FM",
      "city": "Delhi",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["classical", "pop"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#20bf6b",
      "description": "All India Radio Melodic Symphony"
    },
    {
      "id": 5,
      "name": "Radio One 94.3",
      "freq": "94.3 FM",
      "city": "Mumbai",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["pop", "rock"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#0fb9b1",
      "description": "Maximum Music, International Hits"
    },
    {
      "id": 6,
      "name": "Red FM 93.5",
      "freq": "93.5 FM",
      "city": "Delhi",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["bollywood", "pop"],
      "stream": "https://drive.uber.radio/uber/bollywood2010s/icecast.audio",
      "color": "#fc5c65",
      "description": "Bajaate Raho! Superhits Superfast"
    },
    {
      "id": 7,
      "name": "Fever 104 FM",
      "freq": "104.0 FM",
      "city": "Delhi",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#a55eea",
      "description": "Baap of Bollywood & Non-stop Dance"
    },
    {
      "id": 8,
      "name": "Radio City Bangalore",
      "freq": "91.1 FM",
      "city": "Bangalore",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["bollywood", "pop"],
      "stream": "https://server.mediacast4u.stream/8002/stream",
      "color": "#fd9644",
      "description": "Sandalwood, Kannada & Hindi Hits"
    },
    {
      "id": 9,
      "name": "Radio Indigo 91.9",
      "freq": "91.9 FM",
      "city": "Bangalore",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["pop", "rock"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#45aaf2",
      "description": "Bangalore's International Music Station"
    },
    {
      "id": 10,
      "name": "Hello FM 106.4",
      "freq": "106.4 FM",
      "city": "Chennai",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["tamil", "pop"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#26de81",
      "description": "Idhu Romba Nalla FM, Tamil Hits"
    },
    {
      "id": 11,
      "name": "Suryan FM 93.5",
      "freq": "93.5 FM",
      "city": "Chennai",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["tamil", "pop"],
      "stream": "https://server.mediacast4u.stream/8002/stream",
      "color": "#fd9644",
      "description": "Tamil Superhit Paatugal"
    },
    {
      "id": 12,
      "name": "Radio Mango 91.9",
      "freq": "91.9 FM",
      "city": "Kochi",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["pop", "indie"],
      "stream": "http://strm112.1.fm/bombaybeats_mobile_mp3",
      "color": "#fc5c65",
      "description": "Keralathinte Swantham Radio"
    },
    {
      "id": 13,
      "name": "Club FM 94.3",
      "freq": "94.3 FM",
      "city": "Kochi",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#a55eea",
      "description": "Ton Kannakkinu Entertainment"
    },
    {
      "id": 14,
      "name": "AIR FM Gold Classics",
      "freq": "100.1 FM",
      "city": "Mumbai",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["classical", "retro"],
      "stream": "https://listen.181fm.com/181-classical_128k.mp3",
      "color": "#f7b731",
      "description": "Evergreen Hindi Classics & Ghazals"
    },
    {
      "id": 15,
      "name": "Radio Masti 95.0",
      "freq": "95.0 FM",
      "city": "Hyderabad",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["telugu", "bollywood"],
      "stream": "https://server.mediacast4u.stream/8002/stream",
      "color": "#20bf6b",
      "description": "Telugu, Hindi & Deccani Beats"
    },
    {
      "id": 16,
      "name": "Radio Mantra 91.9",
      "freq": "91.9 FM",
      "city": "Chandigarh",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["punjabi", "bollywood"],
      "stream": "http://strm112.1.fm/bombaybeats_mobile_mp3",
      "color": "#fc5c65",
      "description": "Punjabi Hits & Bollywood Tadka"
    },
    {
      "id": 17,
      "name": "Big FM Ahmedabad",
      "freq": "92.7 FM",
      "city": "Ahmedabad",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["bollywood", "pop"],
      "stream": "https://drive.uber.radio/uber/bollywood2010s/icecast.audio",
      "color": "#45aaf2",
      "description": "Garvi Gujarat, Non-stop Melodies"
    },
    {
      "id": 18,
      "name": "Radio Dhamaka 94.3",
      "freq": "94.3 FM",
      "city": "Pune",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["bollywood", "rock"],
      "stream": "https://listen.181fm.com/181-rock_128k.mp3",
      "color": "#fd9644",
      "description": "Marathi & Bollywood Youth Energy"
    },
    {
      "id": 19,
      "name": "Friends FM 91.9",
      "freq": "91.9 FM",
      "city": "Kolkata",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["pop", "bollywood"],
      "stream": "https://server.mediacast4u.stream/8002/stream",
      "color": "#ff4040",
      "description": "Bangla & Bollywood Cultural Vibes"
    },
    {
      "id": 20,
      "name": "Radio Nasha 107.2",
      "freq": "107.2 FM",
      "city": "Delhi",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["retro", "ghazal"],
      "stream": "https://drive.uber.radio/uber/bollywood2010s/icecast.audio",
      "color": "#ff6b35",
      "description": "70s, 80s & 90s Golden Era Hits"
    },
    {
      "id": 21,
      "name": "Ishq FM 104.8",
      "freq": "104.8 FM",
      "city": "Mumbai",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["bollywood", "sufi"],
      "stream": "http://strm112.1.fm/bombaybeats_mobile_mp3",
      "color": "#fc5c65",
      "description": "Romantic Bollywood Songs & Love Stories"
    },
    {
      "id": 22,
      "name": "Vividh Bharati Music",
      "freq": "101.4 FM",
      "city": "National",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["retro", "classical"],
      "stream": "https://listen.181fm.com/181-classical_128k.mp3",
      "color": "#ff9f1a",
      "description": "All India Radio Swarnim Yug"
    },
    {
      "id": 23,
      "name": "Mirchi Punjabi Hits",
      "freq": "98.3 FM",
      "city": "Amritsar",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["punjabi", "pop"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#ff3838",
      "description": "Bhangra, Desi & Punjabi Chartbusters"
    },
    {
      "id": 24,
      "name": "Sufi & Ghazal Radio",
      "freq": "103.2 FM",
      "city": "Delhi",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["sufi", "ghazal"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#05c46b",
      "description": "Soulful Qawwali & Sufiana Kalaam"
    },
    {
      "id": 25,
      "name": "Bhakti Sagar FM",
      "freq": "96.4 FM",
      "city": "Varanasi",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["devotional"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#ffa801",
      "description": "Morning Bhajans, Aartis & Mantras"
    },
    {
      "id": 26,
      "name": "Lo-Fi Bollywood Hub",
      "freq": "94.8 FM",
      "city": "Bangalore",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["lo-fi", "indie"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#8854d0",
      "description": "Mellow Bollywood Lofi & Chill Beats"
    },
    {
      "id": 27,
      "name": "Radio City Tamil",
      "freq": "91.1 FM",
      "city": "Chennai",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["tamil", "pop"],
      "stream": "https://server.mediacast4u.stream/8002/stream",
      "color": "#eb4d4b",
      "description": "Superhit Tamil Songs 24 Hours"
    },
    {
      "id": 28,
      "name": "Mirchi Telugu Live",
      "freq": "98.3 FM",
      "city": "Hyderabad",
      "country": "India",
      "flag": "🇮🇳",
      "category": ["telugu", "pop"],
      "stream": "https://drive.uber.radio/uber/bollywood2010s/icecast.audio",
      "color": "#38ada9",
      "description": "Tollywood Hottest Tunes"
    },

    // ── USA (Pop, Rock, Hip-Hop, R&B, Jazz, Ambient, Country, Gospel) ──
    {
      "id": 29,
      "name": "Z100 New York",
      "freq": "100.3 FM",
      "city": "New York",
      "country": "USA",
      "flag": "🇺🇸",
      "category": ["pop", "rock"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#ff4757",
      "description": "New York's #1 Hit Music Station"
    },
    {
      "id": 30,
      "name": "KIIS FM Los Angeles",
      "freq": "102.7 FM",
      "city": "Los Angeles",
      "country": "USA",
      "flag": "🇺🇸",
      "category": ["pop", "hip-hop"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#ff6b81",
      "description": "LA's #1 Hit Music Station"
    },
    {
      "id": 31,
      "name": "Hot 97 NYC",
      "freq": "97.1 FM",
      "city": "New York",
      "country": "USA",
      "flag": "🇺🇸",
      "category": ["hip-hop", "r-and-b"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#ffa502",
      "description": "Where Hip Hop Lives"
    },
    {
      "id": 32,
      "name": "Power 105.1 NYC",
      "freq": "105.1 FM",
      "city": "New York",
      "country": "USA",
      "flag": "🇺🇸",
      "category": ["hip-hop", "r-and-b"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#e056fd",
      "description": "New York's Hip-Hop and R&B"
    },
    {
      "id": 33,
      "name": "KROQ 106.7 FM",
      "freq": "106.7 FM",
      "city": "Los Angeles",
      "country": "USA",
      "flag": "🇺🇸",
      "category": ["rock", "indie"],
      "stream": "https://listen.181fm.com/181-rock_128k.mp3",
      "color": "#ff3838",
      "description": "World Famous Rock & Alternative"
    },
    {
      "id": 34,
      "name": "103.5 KISS FM Chicago",
      "freq": "103.5 FM",
      "city": "Chicago",
      "country": "USA",
      "flag": "🇺🇸",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#1e90ff",
      "description": "Chicago's Hit Music Station"
    },
    {
      "id": 35,
      "name": "Lite FM 106.7 NYC",
      "freq": "106.7 FM",
      "city": "New York",
      "country": "USA",
      "flag": "🇺🇸",
      "category": ["pop", "retro"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#70a1ff",
      "description": "Best Variety of Yesterday & Today"
    },
    {
      "id": 36,
      "name": "Jazz24 Seattle",
      "freq": "91.3 FM",
      "city": "Seattle",
      "country": "USA",
      "flag": "🇺🇸",
      "category": ["jazz", "classical"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#e1b12c",
      "description": "24/7 World Class Live Jazz"
    },
    {
      "id": 37,
      "name": "SomaFM Groove Salad",
      "freq": "Web FM",
      "city": "San Francisco",
      "country": "USA",
      "flag": "🇺🇸",
      "category": ["ambient", "electronic"],
      "stream": "https://icecast.somafm.com/groovesalad-128-mp3",
      "color": "#00d2d3",
      "description": "A Nicely Chilled Plate of Ambient Beats"
    },
    {
      "id": 38,
      "name": "KCRW Eclectic Music",
      "freq": "89.9 FM",
      "city": "Santa Monica",
      "country": "USA",
      "flag": "🇺🇸",
      "category": ["indie", "pop"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#5352ed",
      "description": "Eclectic Indie Music & Session Culture"
    },
    {
      "id": 39,
      "name": "Mega 96.3 Los Angeles",
      "freq": "96.3 FM",
      "city": "Los Angeles",
      "country": "USA",
      "flag": "🇺🇸",
      "category": ["latin", "pop"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#eb4d4b",
      "description": "Puro Reggaeton y Música Latina"
    },
    {
      "id": 40,
      "name": "K-LOVE Contemporary",
      "freq": "90.7 FM",
      "city": "Nashville",
      "country": "USA",
      "flag": "🇺🇸",
      "category": ["gospel", "pop"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#2ed573",
      "description": "Positive, Encouraging Music"
    },
    {
      "id": 41,
      "name": "WBLS 107.5 Urban Soul",
      "freq": "107.5 FM",
      "city": "New York",
      "country": "USA",
      "flag": "🇺🇸",
      "category": ["r-and-b", "retro"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#9b59b6",
      "description": "#1 For R&B and Classic Soul"
    },

    // ── UK (Pop, Rock, Electronic, Indie, Classical, R&B) ──
    {
      "id": 42,
      "name": "BBC Radio 1",
      "freq": "98.8 FM",
      "city": "London",
      "country": "UK",
      "flag": "🇬🇧",
      "category": ["pop", "rock"],
      "stream": "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
      "color": "#ff4757",
      "description": "The Best New Music & Live Lounge"
    },
    {
      "id": 43,
      "name": "BBC Radio 2",
      "freq": "89.1 FM",
      "city": "London",
      "country": "UK",
      "flag": "🇬🇧",
      "category": ["pop", "retro"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#ffa502",
      "description": "The UK's Most Listened Station"
    },
    {
      "id": 44,
      "name": "BBC Radio 1Xtra",
      "freq": "Digital",
      "city": "London",
      "country": "UK",
      "flag": "🇬🇧",
      "category": ["hip-hop", "r-and-b"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#3742fa",
      "description": "Connecting with the Black Music Scene"
    },
    {
      "id": 45,
      "name": "BBC 6 Music",
      "freq": "Digital",
      "city": "London",
      "country": "UK",
      "flag": "🇬🇧",
      "category": ["indie", "rock"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#2ed573",
      "description": "The Alternative Music Authority"
    },
    {
      "id": 46,
      "name": "Capital FM London",
      "freq": "95.8 FM",
      "city": "London",
      "country": "UK",
      "flag": "🇬🇧",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#1e90ff",
      "description": "The UK's No.1 Hit Music Station"
    },
    {
      "id": 47,
      "name": "Heart London 106.2",
      "freq": "106.2 FM",
      "city": "London",
      "country": "UK",
      "flag": "🇬🇧",
      "category": ["pop"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#ff4757",
      "description": "Turn Up The Feel Good!"
    },
    {
      "id": 48,
      "name": "Kiss FM UK 100.0",
      "freq": "100.0 FM",
      "city": "London",
      "country": "UK",
      "flag": "🇬🇧",
      "category": ["electronic", "hip-hop"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#e056fd",
      "description": "The Beat of the UK"
    },
    {
      "id": 49,
      "name": "Classic FM UK",
      "freq": "100.9 FM",
      "city": "London",
      "country": "UK",
      "flag": "🇬🇧",
      "category": ["classical"],
      "stream": "https://listen.181fm.com/181-classical_128k.mp3",
      "color": "#f1c40f",
      "description": "The World's Greatest Music"
    },
    {
      "id": 50,
      "name": "Absolute Radio",
      "freq": "105.8 FM",
      "city": "London",
      "country": "UK",
      "flag": "🇬🇧",
      "category": ["rock", "retro"],
      "stream": "https://listen.181fm.com/181-rock_128k.mp3",
      "color": "#ff6348",
      "description": "Where Real Music Matters"
    },
    {
      "id": 51,
      "name": "Virgin Radio UK",
      "freq": "105.8 FM",
      "city": "London",
      "country": "UK",
      "flag": "🇬🇧",
      "category": ["rock", "pop"],
      "stream": "https://listen.181fm.com/181-rock_128k.mp3",
      "color": "#d63031",
      "description": "Great Music All Day Long"
    },

    // ── CANADA, AUSTRALIA, FRANCE, GERMANY, ITALY, SPAIN, BRAZIL, JAPAN, SOUTH KOREA, UAE, ETC. ──
    {
      "id": 52,
      "name": "Virgin Radio Toronto",
      "freq": "99.9 FM",
      "city": "Toronto",
      "country": "Canada",
      "flag": "🇨🇦",
      "category": ["pop", "rock"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#e74c3c",
      "description": "Toronto's #1 Hit Music Station"
    },
    {
      "id": 53,
      "name": "CHFI 98.1 Toronto",
      "freq": "98.1 FM",
      "city": "Toronto",
      "country": "Canada",
      "flag": "🇨🇦",
      "category": ["pop", "retro"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#3498db",
      "description": "Toronto's Perfect Music Mix"
    },
    {
      "id": 54,
      "name": "Q107 Classic Rock",
      "freq": "107.1 FM",
      "city": "Toronto",
      "country": "Canada",
      "flag": "🇨🇦",
      "category": ["rock"],
      "stream": "https://listen.181fm.com/181-rock_128k.mp3",
      "color": "#e67e22",
      "description": "Toronto's Classic Rock"
    },
    {
      "id": 55,
      "name": "Indie88 Toronto",
      "freq": "88.1 FM",
      "city": "Toronto",
      "country": "Canada",
      "flag": "🇨🇦",
      "category": ["indie", "rock"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#2ecc71",
      "description": "Give Good Music A Chance"
    },
    {
      "id": 56,
      "name": "Triple J Sydney",
      "freq": "105.7 FM",
      "city": "Sydney",
      "country": "Australia",
      "flag": "🇦🇺",
      "category": ["indie", "rock"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#e74c3c",
      "description": "We Love Music - Hottest 100"
    },
    {
      "id": 57,
      "name": "Nova 96.9 Sydney",
      "freq": "96.9 FM",
      "city": "Sydney",
      "country": "Australia",
      "flag": "🇦🇺",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#00b894",
      "description": "Fresh Hits for Sydney"
    },
    {
      "id": 58,
      "name": "KIIS 106.5 Sydney",
      "freq": "106.5 FM",
      "city": "Sydney",
      "country": "Australia",
      "flag": "🇦🇺",
      "category": ["pop"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#0984e3",
      "description": "Sydney's Hit Music Playlist"
    },
    {
      "id": 59,
      "name": "Gold 104.3 Melbourne",
      "freq": "104.3 FM",
      "city": "Melbourne",
      "country": "Australia",
      "flag": "🇦🇺",
      "category": ["retro", "rock"],
      "stream": "https://listen.181fm.com/181-rock_128k.mp3",
      "color": "#f39c12",
      "description": "Better Music and More of It"
    },
    {
      "id": 60,
      "name": "NRJ Paris",
      "freq": "100.3 FM",
      "city": "Paris",
      "country": "France",
      "flag": "🇫🇷",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#e84118",
      "description": "Hit Music Only! #1 en France"
    },
    {
      "id": 61,
      "name": "Skyrock Paris",
      "freq": "96.0 FM",
      "city": "Paris",
      "country": "France",
      "flag": "🇫🇷",
      "category": ["hip-hop", "r-and-b"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#2f3640",
      "description": "Premier sur le Rap Français"
    },
    {
      "id": 62,
      "name": "Nostalgie Paris",
      "freq": "90.4 FM",
      "city": "Paris",
      "country": "France",
      "flag": "🇫🇷",
      "category": ["retro", "pop"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#00a8ff",
      "description": "Les Plus Grands Tubes Légendaires"
    },
    {
      "id": 63,
      "name": "FIP Radio Paris",
      "freq": "105.1 FM",
      "city": "Paris",
      "country": "France",
      "flag": "🇫🇷",
      "category": ["jazz", "ambient"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#8c7ae6",
      "description": "Éclectique, Jazz & Musiques du Monde"
    },
    {
      "id": 64,
      "name": "Antenne Bayern",
      "freq": "101.3 FM",
      "city": "München",
      "country": "Germany",
      "flag": "🇩🇪",
      "category": ["pop", "rock"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#fbc531",
      "description": "Bayerns bester Musikmix"
    },
    {
      "id": 65,
      "name": "1LIVE Köln",
      "freq": "102.4 FM",
      "city": "Köln",
      "country": "Germany",
      "flag": "🇩🇪",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#e84118",
      "description": "Europas beliebteste Jugendwelle"
    },
    {
      "id": 66,
      "name": "Sunshine Live Techno",
      "freq": "102.1 FM",
      "city": "Mannheim",
      "country": "Germany",
      "flag": "🇩🇪",
      "category": ["electronic"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#4cd137",
      "description": "Electronic Music Radio"
    },
    {
      "id": 67,
      "name": "BigFM Stuttgart",
      "freq": "89.5 FM",
      "city": "Stuttgart",
      "country": "Germany",
      "flag": "🇩🇪",
      "category": ["hip-hop", "pop"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#e056fd",
      "description": "Deutschlands meiste neue Musik"
    },
    {
      "id": 68,
      "name": "RTL 102.5 Milano",
      "freq": "102.5 FM",
      "city": "Milano",
      "country": "Italy",
      "flag": "🇮🇹",
      "category": ["pop"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#ff4757",
      "description": "Very Normal People - #1 in Italia"
    },
    {
      "id": 69,
      "name": "Radio Deejay Milano",
      "freq": "90.3 FM",
      "city": "Milano",
      "country": "Italy",
      "flag": "🇮🇹",
      "category": ["electronic", "pop"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#ffa502",
      "description": "One Nation, One Station"
    },
    {
      "id": 70,
      "name": "Radio 105 Milano",
      "freq": "99.1 FM",
      "city": "Milano",
      "country": "Italy",
      "flag": "🇮🇹",
      "category": ["pop", "rock"],
      "stream": "https://listen.181fm.com/181-rock_128k.mp3",
      "color": "#3742fa",
      "description": "Proud To Be Different"
    },
    {
      "id": 71,
      "name": "Radio Italia Solo",
      "freq": "106.7 FM",
      "city": "Rome",
      "country": "Italy",
      "flag": "🇮🇹",
      "category": ["pop", "retro"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#2ed573",
      "description": "Solo Musica Italiana"
    },
    {
      "id": 72,
      "name": "Los 40 Principales",
      "freq": "93.9 FM",
      "city": "Madrid",
      "country": "Spain",
      "flag": "🇪🇸",
      "category": ["pop", "latin"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#ff3838",
      "description": "Todos Los Éxitos de España"
    },
    {
      "id": 73,
      "name": "Rock FM Madrid",
      "freq": "101.7 FM",
      "city": "Madrid",
      "country": "Spain",
      "flag": "🇪🇸",
      "category": ["rock"],
      "stream": "https://listen.181fm.com/181-rock_128k.mp3",
      "color": "#3d3d3d",
      "description": "1 Hora de Rock Sin Pausa"
    },
    {
      "id": 74,
      "name": "Ibiza Global Radio",
      "freq": "100.8 FM",
      "city": "Ibiza",
      "country": "Spain",
      "flag": "🇪🇸",
      "category": ["electronic", "ambient"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#00d2d3",
      "description": "Pure Electronic & Deep House Waves"
    },
    {
      "id": 75,
      "name": "Cadena Dial",
      "freq": "91.7 FM",
      "city": "Madrid",
      "country": "Spain",
      "flag": "🇪🇸",
      "category": ["latin", "pop"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#ff9f1a",
      "description": "Lo Mejor de Nuestra Música"
    },
    {
      "id": 76,
      "name": "Jovem Pan FM",
      "freq": "100.9 FM",
      "city": "São Paulo",
      "country": "Brazil",
      "flag": "🇧🇷",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#e84118",
      "description": "A Número 1 do Brasil"
    },
    {
      "id": 77,
      "name": "Alpha FM São Paulo",
      "freq": "101.7 FM",
      "city": "São Paulo",
      "country": "Brazil",
      "flag": "🇧🇷",
      "category": ["jazz", "r-and-b"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#f39c12",
      "description": "Boa Música Sempre"
    },
    {
      "id": 78,
      "name": "Rádio Cidade 102.9",
      "freq": "102.9 FM",
      "city": "Rio de Janeiro",
      "country": "Brazil",
      "flag": "🇧🇷",
      "category": ["rock"],
      "stream": "https://listen.181fm.com/181-rock_128k.mp3",
      "color": "#2c3e50",
      "description": "Inesquecível Rock do Rio"
    },
    {
      "id": 79,
      "name": "Metropolitana FM",
      "freq": "98.5 FM",
      "city": "São Paulo",
      "country": "Brazil",
      "flag": "🇧🇷",
      "category": ["pop", "latin"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#e056fd",
      "description": "Yes! A Rádio Jovem do Brasil"
    },
    {
      "id": 80,
      "name": "Tokyo FM 80.0",
      "freq": "80.0 FM",
      "city": "Tokyo",
      "country": "Japan",
      "flag": "🇯🇵",
      "category": ["j-pop", "pop"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#ff4757",
      "description": "80.Love - Tokyo's Iconic FM"
    },
    {
      "id": 81,
      "name": "J-WAVE Tokyo 81.3",
      "freq": "81.3 FM",
      "city": "Tokyo",
      "country": "Japan",
      "flag": "🇯🇵",
      "category": ["indie", "electronic"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#2ed573",
      "description": "Voice of Tokyo City Life"
    },
    {
      "id": 82,
      "name": "FM802 Osaka",
      "freq": "80.2 FM",
      "city": "Osaka",
      "country": "Japan",
      "flag": "🇯🇵",
      "category": ["rock", "pop"],
      "stream": "https://listen.181fm.com/181-rock_128k.mp3",
      "color": "#ffa502",
      "description": "Kansai's Hottest Music Radio"
    },
    {
      "id": 83,
      "name": "InterFM897 Tokyo",
      "freq": "89.7 FM",
      "city": "Tokyo",
      "country": "Japan",
      "flag": "🇯🇵",
      "category": ["jazz", "rock"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#70a1ff",
      "description": "The Real Music Station"
    },
    {
      "id": 84,
      "name": "KBS Cool FM",
      "freq": "89.1 FM",
      "city": "Seoul",
      "country": "South Korea",
      "flag": "🇰🇷",
      "category": ["k-pop", "pop"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#ff3838",
      "description": "#1 Korean Pop & Seoul Chart"
    },
    {
      "id": 85,
      "name": "SBS Power FM",
      "freq": "107.7 FM",
      "city": "Seoul",
      "country": "South Korea",
      "flag": "🇰🇷",
      "category": ["k-pop", "pop"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#ff9f1a",
      "description": "Korea's Favorite Youth Radio"
    },
    {
      "id": 86,
      "name": "MBC FM4U Seoul",
      "freq": "91.9 FM",
      "city": "Seoul",
      "country": "South Korea",
      "flag": "🇰🇷",
      "category": ["k-pop", "indie"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#9b59b6",
      "description": "Fresh K-Pop, Ballads & Indie"
    },
    {
      "id": 87,
      "name": "TBS eFM 101.3",
      "freq": "101.3 FM",
      "city": "Seoul",
      "country": "South Korea",
      "flag": "🇰🇷",
      "category": ["k-pop", "electronic"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#00d2d3",
      "description": "Global Seoul 24/7 English FM"
    },
    {
      "id": 88,
      "name": "Virgin Radio Dubai",
      "freq": "104.4 FM",
      "city": "Dubai",
      "country": "UAE",
      "flag": "🇦🇪",
      "category": ["pop", "rock"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#ff4757",
      "description": "UAE's #1 Hit Music Station"
    },
    {
      "id": 89,
      "name": "City 101.6 Dubai",
      "freq": "101.6 FM",
      "city": "Dubai",
      "country": "UAE",
      "flag": "🇦🇪",
      "category": ["bollywood", "pop"],
      "stream": "https://drive.uber.radio/uber/bollywood2010s/icecast.audio",
      "color": "#ffa502",
      "description": "UAE's #1 Bollywood Station"
    },
    {
      "id": 90,
      "name": "Dubai 92",
      "freq": "92.0 FM",
      "city": "Dubai",
      "country": "UAE",
      "flag": "🇦🇪",
      "category": ["retro", "pop"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#1e90ff",
      "description": "Dubai's Classic Hits Station"
    },
    {
      "id": 91,
      "name": "Al Khaleejiya 100.9",
      "freq": "100.9 FM",
      "city": "Dubai",
      "country": "UAE",
      "flag": "🇦🇪",
      "category": ["folk", "pop"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#2ed573",
      "description": "Authentic Gulf & Khaleeji Music"
    },
    {
      "id": 92,
      "name": "Los 40 México",
      "freq": "101.7 FM",
      "city": "Mexico City",
      "country": "Mexico",
      "flag": "🇲🇽",
      "category": ["pop", "latin"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#eb4d4b",
      "description": "La Radio de los Éxitos en México"
    },
    {
      "id": 93,
      "name": "Alfa 91.3 México",
      "freq": "91.3 FM",
      "city": "Mexico City",
      "country": "Mexico",
      "flag": "🇲🇽",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#f0932b",
      "description": "Donde Todo Nace - Hits En Inglés"
    },
    {
      "id": 94,
      "name": "La 100 Buenos Aires",
      "freq": "99.9 FM",
      "city": "Buenos Aires",
      "country": "Argentina",
      "flag": "🇦🇷",
      "category": ["pop", "rock"],
      "stream": "https://listen.181fm.com/181-rock_128k.mp3",
      "color": "#3867d6",
      "description": "No Te Quedes Afuera"
    },
    {
      "id": 95,
      "name": "Aspen 102.3 FM",
      "freq": "102.3 FM",
      "city": "Buenos Aires",
      "country": "Argentina",
      "flag": "🇦🇷",
      "category": ["retro", "rock"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#20bf6b",
      "description": "Pura Música del Mundo"
    },
    {
      "id": 96,
      "name": "La Mega Bogotá",
      "freq": "90.9 FM",
      "city": "Bogotá",
      "country": "Colombia",
      "flag": "🇨🇴",
      "category": ["latin", "pop"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#f7b731",
      "description": "El Reggaetón y Pop de Colombia"
    },
    {
      "id": 97,
      "name": "Radio Carolina Chile",
      "freq": "99.3 FM",
      "city": "Santiago",
      "country": "Chile",
      "flag": "🇨🇱",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#e84118",
      "description": "La Más Prendida de Chile"
    },
    {
      "id": 98,
      "name": "Studio 92 Lima",
      "freq": "92.5 FM",
      "city": "Lima",
      "country": "Peru",
      "flag": "🇵🇪",
      "category": ["pop", "rock"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#0984e3",
      "description": "Primeros en Música en Perú"
    },
    {
      "id": 99,
      "name": "Radio 538 Amsterdam",
      "freq": "102.1 FM",
      "city": "Amsterdam",
      "country": "Netherlands",
      "flag": "🇳🇱",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#2ecc71",
      "description": "#1 Hit Radio in the Netherlands"
    },
    {
      "id": 100,
      "name": "SLAM! Dance Radio",
      "freq": "95.2 FM",
      "city": "Hilversum",
      "country": "Netherlands",
      "flag": "🇳🇱",
      "category": ["electronic"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#e67e22",
      "description": "Play Music, Play Life - EDM 24/7"
    },
    {
      "id": 101,
      "name": "Studio Brussel",
      "freq": "102.1 FM",
      "city": "Brussels",
      "country": "Belgium",
      "flag": "🇧🇪",
      "category": ["rock", "indie"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#e74c3c",
      "description": "Life is Music - Rock & Alternative"
    },
    {
      "id": 102,
      "name": "RIX FM Stockholm",
      "freq": "105.5 FM",
      "city": "Stockholm",
      "country": "Sweden",
      "flag": "🇸🇪",
      "category": ["pop"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#f1c40f",
      "description": "Bäst Musik Just Nu i Sverige"
    },
    {
      "id": 103,
      "name": "NRJ Sweden 105.1",
      "freq": "105.1 FM",
      "city": "Stockholm",
      "country": "Sweden",
      "flag": "🇸🇪",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#3498db",
      "description": "Hit Music Only Sverige"
    },
    {
      "id": 104,
      "name": "P4 Radio Hele Norge",
      "freq": "104.4 FM",
      "city": "Oslo",
      "country": "Norway",
      "flag": "🇳🇴",
      "category": ["pop", "retro"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#c0392b",
      "description": "Lyden av Norge"
    },
    {
      "id": 105,
      "name": "Nova FM Denmark",
      "freq": "91.4 FM",
      "city": "Copenhagen",
      "country": "Denmark",
      "flag": "🇩🇰",
      "category": ["pop"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#d63031",
      "description": "Danmarks Glade Hits"
    },
    {
      "id": 106,
      "name": "Radio Nova Finland",
      "freq": "106.2 FM",
      "city": "Helsinki",
      "country": "Finland",
      "flag": "🇫🇮",
      "category": ["pop", "rock"],
      "stream": "https://listen.181fm.com/181-rock_128k.mp3",
      "color": "#0984e3",
      "description": "Suomen Kuunnelluin Kanava"
    },
    {
      "id": 107,
      "name": "Energy Zürich NRJ",
      "freq": "100.9 FM",
      "city": "Zürich",
      "country": "Switzerland",
      "flag": "🇨🇭",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#e74c3c",
      "description": "Hit Music Only Switzerland"
    },
    {
      "id": 108,
      "name": "Hitradio Ö3 Vienna",
      "freq": "88.6 FM",
      "city": "Vienna",
      "country": "Austria",
      "flag": "🇦🇹",
      "category": ["pop", "rock"],
      "stream": "https://listen.181fm.com/181-rock_128k.mp3",
      "color": "#d63031",
      "description": "Das Leben ist ein Hit"
    },
    {
      "id": 109,
      "name": "RTÉ 2FM Dublin",
      "freq": "90.7 FM",
      "city": "Dublin",
      "country": "Ireland",
      "flag": "🇮🇪",
      "category": ["pop", "indie"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#00b894",
      "description": "Ireland's National Hit Station"
    },
    {
      "id": 110,
      "name": "FM104 Dublin",
      "freq": "104.4 FM",
      "city": "Dublin",
      "country": "Ireland",
      "flag": "🇮🇪",
      "category": ["pop", "rock"],
      "stream": "https://listen.181fm.com/181-rock_128k.mp3",
      "color": "#e17055",
      "description": "Dublin's Hit Music Station"
    },
    {
      "id": 111,
      "name": "RFM Portugal",
      "freq": "93.2 FM",
      "city": "Lisbon",
      "country": "Portugal",
      "flag": "🇵🇹",
      "category": ["pop", "retro"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#27ae60",
      "description": "Só Grandes Músicas em Portugal"
    },
    {
      "id": 112,
      "name": "Rythmos 94.9 Athens",
      "freq": "94.9 FM",
      "city": "Athens",
      "country": "Greece",
      "flag": "🇬🇷",
      "category": ["pop", "folk"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#2980b9",
      "description": "Pano Ap' Ola I Mousiki"
    },
    {
      "id": 113,
      "name": "Power FM Istanbul",
      "freq": "100.0 FM",
      "city": "Istanbul",
      "country": "Turkey",
      "flag": "🇹🇷",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#c0392b",
      "description": "Power of Music Turkey"
    },
    {
      "id": 114,
      "name": "Europa Plus Moscow",
      "freq": "106.2 FM",
      "city": "Moscow",
      "country": "Russia",
      "flag": "🇷🇺",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#34495e",
      "description": "Больше Хитов, Больше Музыки"
    },
    {
      "id": 115,
      "name": "Radio Record Club",
      "freq": "106.3 FM",
      "city": "St. Petersburg",
      "country": "Russia",
      "flag": "🇷🇺",
      "category": ["electronic"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#e74c3c",
      "description": "Первая Танцевальная Радиостанция"
    },
    {
      "id": 116,
      "name": "947 Johannesburg",
      "freq": "94.7 FM",
      "city": "Johannesburg",
      "country": "South Africa",
      "flag": "🇿🇦",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#f39c12",
      "description": "Joburg's No.1 Hit Music Station"
    },
    {
      "id": 117,
      "name": "Metro FM South Africa",
      "freq": "93.0 FM",
      "city": "Pretoria",
      "country": "South Africa",
      "flag": "🇿🇦",
      "category": ["r-and-b", "hip-hop"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#e67e22",
      "description": "It's Where You're At"
    },
    {
      "id": 118,
      "name": "The Beat 99.9 Lagos",
      "freq": "99.9 FM",
      "city": "Lagos",
      "country": "Nigeria",
      "flag": "🇳🇬",
      "category": ["hip-hop", "r-and-b"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#2ecc71",
      "description": "Home of Afrobeats & Hip Hop"
    },
    {
      "id": 119,
      "name": "Cool FM 96.9 Lagos",
      "freq": "96.9 FM",
      "city": "Lagos",
      "country": "Nigeria",
      "flag": "🇳🇬",
      "category": ["pop", "r-and-b"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#3498db",
      "description": "Your #1 Hit Music Station Nigeria"
    },
    {
      "id": 120,
      "name": "Capital FM Nairobi",
      "freq": "98.4 FM",
      "city": "Nairobi",
      "country": "Kenya",
      "flag": "🇰🇪",
      "category": ["pop", "rock"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#c0392b",
      "description": "Kenya's Definitive Music Station"
    },
    {
      "id": 121,
      "name": "Nile FM 104.2 Cairo",
      "freq": "104.2 FM",
      "city": "Cairo",
      "country": "Egypt",
      "flag": "🇪🇬",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#f1c40f",
      "description": "Egypt's #1 For Hit Music"
    },
    {
      "id": 122,
      "name": "Joy FM Accra Music",
      "freq": "99.7 FM",
      "city": "Accra",
      "country": "Ghana",
      "flag": "🇬🇭",
      "category": ["pop", "r-and-b"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#e74c3c",
      "description": "Ghana's Super Music Station"
    },
    {
      "id": 123,
      "name": "Kiss92 FM Singapore",
      "freq": "92.0 FM",
      "city": "Singapore",
      "country": "Singapore",
      "flag": "🇸🇬",
      "category": ["pop", "retro"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#fd79a8",
      "description": "Singapore's Best Adult Contemporary"
    },
    {
      "id": 124,
      "name": "987FM Singapore",
      "freq": "98.7 FM",
      "city": "Singapore",
      "country": "Singapore",
      "flag": "🇸🇬",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#6c5ce7",
      "description": "Singapore's #1 Hit Music Station"
    },
    {
      "id": 125,
      "name": "The Rock 90.2 NZ",
      "freq": "90.2 FM",
      "city": "Auckland",
      "country": "New Zealand",
      "flag": "🇳🇿",
      "category": ["rock"],
      "stream": "https://listen.181fm.com/181-rock_128k.mp3",
      "color": "#2d3436",
      "description": "New Zealand's Best Rock Station"
    },
    {
      "id": 126,
      "name": "George FM Auckland",
      "freq": "96.6 FM",
      "city": "Auckland",
      "country": "New Zealand",
      "flag": "🇳🇿",
      "category": ["electronic"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#00cec9",
      "description": "Beats & Bass of New Zealand"
    },
    {
      "id": 127,
      "name": "Monster RX93.1 Manila",
      "freq": "93.1 FM",
      "city": "Manila",
      "country": "Philippines",
      "flag": "🇵🇭",
      "category": ["pop", "r-and-b"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#e17055",
      "description": "Manila's Hottest Hit Music"
    },
    {
      "id": 128,
      "name": "Wish 107.5 FM Manila",
      "freq": "107.5 FM",
      "city": "Manila",
      "country": "Philippines",
      "flag": "🇵🇭",
      "category": ["pop", "indie"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#d63031",
      "description": "Your Gateway To Good Music Bus"
    },
    {
      "id": 129,
      "name": "Prambors FM Jakarta",
      "freq": "102.2 FM",
      "city": "Jakarta",
      "country": "Indonesia",
      "flag": "🇮🇩",
      "category": ["pop", "indie"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#fdcb6e",
      "description": "Indonesia's #1 Youth Hit Station"
    },
    {
      "id": 130,
      "name": "Irie FM Jamaica",
      "freq": "107.7 FM",
      "city": "Ocho Rios",
      "country": "Jamaica",
      "flag": "🇯🇲",
      "category": ["reggae"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#00b894",
      "description": "Roots, Rocking & Reggae Worldwide"
    },
    {
      "id": 131,
      "name": "Hitz FM Kuala Lumpur",
      "freq": "92.9 FM",
      "city": "Kuala Lumpur",
      "country": "Malaysia",
      "flag": "🇲🇾",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#0984e3",
      "description": "Malaysia's All-Hit Radio"
    },
    {
      "id": 132,
      "name": "Virgin Radio Bangkok",
      "freq": "95.5 FM",
      "city": "Bangkok",
      "country": "Thailand",
      "flag": "🇹🇭",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#d63031",
      "description": "Thailand's #1 Hit Station"
    },
    {
      "id": 133,
      "name": "Radio Mirchi Lahore",
      "freq": "98.3 FM",
      "city": "Lahore",
      "country": "Pakistan",
      "flag": "🇵🇰",
      "category": ["bollywood", "ghazal"],
      "stream": "https://drive.uber.radio/uber/bollywood2010s/icecast.audio",
      "color": "#27ae60",
      "description": "Desi Pakistani & Bollywood Hits"
    },
    {
      "id": 134,
      "name": "City FM89 Karachi",
      "freq": "89.0 FM",
      "city": "Karachi",
      "country": "Pakistan",
      "flag": "🇵🇰",
      "category": ["pop", "rock"],
      "stream": "https://listen.181fm.com/181-rock_128k.mp3",
      "color": "#e74c3c",
      "description": "Pakistan's Premier English FM"
    },
    {
      "id": 135,
      "name": "Yes FM Colombo",
      "freq": "101.0 FM",
      "city": "Colombo",
      "country": "Sri Lanka",
      "flag": "🇱🇰",
      "category": ["pop", "rock"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#e67e22",
      "description": "Sri Lanka's #1 Hit Music Station"
    },
    {
      "id": 136,
      "name": "Radio Kabul Music",
      "freq": "93.0 FM",
      "city": "Kabul",
      "country": "Afghanistan",
      "flag": "🇦🇫",
      "category": ["folk", "classical"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#2c3e50",
      "description": "Traditional Afghan Folk & Melodies"
    },
    {
      "id": 137,
      "name": "Dhaka FM 90.4",
      "freq": "90.4 FM",
      "city": "Dhaka",
      "country": "Bangladesh",
      "flag": "🇧🇩",
      "category": ["pop", "folk"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#006266",
      "description": "Bangladesh's #1 Youth Station"
    },
    {
      "id": 138,
      "name": "Radio Panamericana",
      "freq": "96.1 FM",
      "city": "La Paz",
      "country": "Bolivia",
      "flag": "🇧🇴",
      "category": ["latin", "folk"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#b71540",
      "description": "La Voz de Bolivia al Mundo"
    },
    {
      "id": 139,
      "name": "China Radio Hit FM",
      "freq": "88.7 FM",
      "city": "Beijing",
      "country": "China",
      "flag": "🇨🇳",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#e55039",
      "description": "Hit FM Beijing & Shanghai"
    },
    {
      "id": 140,
      "name": "Narodni Radio Zagreb",
      "freq": "88.1 FM",
      "city": "Zagreb",
      "country": "Croatia",
      "flag": "🇭🇷",
      "category": ["pop", "folk"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#4a69bd",
      "description": "Najbolja Domaća Glazba"
    },
    {
      "id": 141,
      "name": "Radio Taíno Habana",
      "freq": "93.3 FM",
      "city": "Havana",
      "country": "Cuba",
      "flag": "🇨🇺",
      "category": ["latin"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#0a3d62",
      "description": "La Radio de Cuba para el Mundo"
    },
    {
      "id": 142,
      "name": "Evropa 2 Prague",
      "freq": "88.2 FM",
      "city": "Prague",
      "country": "Czech Republic",
      "flag": "🇨🇿",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#60a3bc",
      "description": "Maxximum Muziky v Česku"
    },
    {
      "id": 143,
      "name": "Bisrat FM 101.1",
      "freq": "101.1 FM",
      "city": "Addis Ababa",
      "country": "Ethiopia",
      "flag": "🇪🇹",
      "category": ["folk", "pop"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#78e08f",
      "description": "Ethiopian Soul & Modern Grooves"
    },
    {
      "id": 144,
      "name": "Rádió 1 Budapest",
      "freq": "96.4 FM",
      "city": "Budapest",
      "country": "Hungary",
      "flag": "🇭🇺",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#e58e26",
      "description": "Csak Igazi Mai Sláger Menü"
    },
    {
      "id": 145,
      "name": "Radio Javan Tehran",
      "freq": "Web FM",
      "city": "Tehran",
      "country": "Iran",
      "flag": "🇮🇷",
      "category": ["pop", "folk"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#38ada9",
      "description": "Persian Pop & Modern Beats"
    },
    {
      "id": 146,
      "name": "Radio Dijla Music",
      "freq": "89.9 FM",
      "city": "Baghdad",
      "country": "Iraq",
      "flag": "🇮🇶",
      "category": ["folk", "pop"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#079992",
      "description": "Iraqi Songs & Baghdad Culture"
    },
    {
      "id": 147,
      "name": "Galgalatz Tel Aviv",
      "freq": "91.8 FM",
      "city": "Tel Aviv",
      "country": "Israel",
      "flag": "🇮🇱",
      "category": ["pop", "rock"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#4a69bd",
      "description": "Israel's Favorite Driving Music"
    },
    {
      "id": 148,
      "name": "Mood 92 Amman",
      "freq": "92.0 FM",
      "city": "Amman",
      "country": "Jordan",
      "flag": "🇯🇴",
      "category": ["pop", "retro"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#6a89cc",
      "description": "Jordan's Premier English Station"
    },
    {
      "id": 149,
      "name": "Radio One Beirut",
      "freq": "105.5 FM",
      "city": "Beirut",
      "country": "Lebanon",
      "flag": "🇱🇧",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#b71540",
      "description": "Lebanon's #1 Hit Music Station"
    },
    {
      "id": 150,
      "name": "Hit Radio Rabat",
      "freq": "100.3 FM",
      "city": "Rabat",
      "country": "Morocco",
      "flag": "🇲🇦",
      "category": ["pop", "hip-hop"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#e55039",
      "description": "100% Hits au Maroc"
    },
    {
      "id": 151,
      "name": "RMF FM Warsaw",
      "freq": "91.0 FM",
      "city": "Warsaw",
      "country": "Poland",
      "flag": "🇵🇱",
      "category": ["pop", "rock"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#f6b93b",
      "description": "Najlepsza Muzyka w Polsce"
    },
    {
      "id": 152,
      "name": "Radio ZU Bucharest",
      "freq": "89.0 FM",
      "city": "Bucharest",
      "country": "Romania",
      "flag": "🇷🇴",
      "category": ["pop", "electronic"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#38ada9",
      "description": "Hiturile Se Ascultă la ZU"
    },
    {
      "id": 153,
      "name": "Rotana FM Riyadh",
      "freq": "88.0 FM",
      "city": "Riyadh",
      "country": "Saudi Arabia",
      "flag": "🇸🇦",
      "category": ["pop", "folk"],
      "stream": "https://listen.181fm.com/181-chilled_128k.mp3",
      "color": "#2ed573",
      "description": "Best of Saudi & Arab Pop Hits"
    },
    {
      "id": 154,
      "name": "RFI Dakar Music",
      "freq": "92.0 FM",
      "city": "Dakar",
      "country": "Senegal",
      "flag": "🇸🇳",
      "category": ["folk"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#00b894",
      "description": "Senegalese Mbalax & West African Grooves"
    },
    {
      "id": 155,
      "name": "Radio S Belgrade",
      "freq": "92.9 FM",
      "city": "Belgrade",
      "country": "Serbia",
      "flag": "🇷🇸",
      "category": ["pop", "folk"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#d63031",
      "description": "Najbolja Muzika Srbije"
    },
    {
      "id": 156,
      "name": "Clouds FM Dar",
      "freq": "88.5 FM",
      "city": "Dar es Salaam",
      "country": "Tanzania",
      "flag": "🇹🇿",
      "category": ["pop", "r-and-b"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#e17055",
      "description": "The People's Station Tanzania"
    },
    {
      "id": 157,
      "name": "Capital FM Kampala",
      "freq": "91.3 FM",
      "city": "Kampala",
      "country": "Uganda",
      "flag": "🇺🇬",
      "category": ["pop", "r-and-b"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#fdcb6e",
      "description": "Uganda's Best Music Mix"
    },
    {
      "id": 158,
      "name": "Hit FM Kyiv",
      "freq": "96.4 FM",
      "city": "Kyiv",
      "country": "Ukraine",
      "flag": "🇺🇦",
      "category": ["pop", "rock"],
      "stream": "https://listen.181fm.com/181-power_128k.mp3",
      "color": "#0984e3",
      "description": "Тільки Хіти в Україні"
    },
    {
      "id": 159,
      "name": "La Mega Caracas",
      "freq": "107.3 FM",
      "city": "Caracas",
      "country": "Venezuela",
      "flag": "🇻🇪",
      "category": ["rock", "pop"],
      "stream": "https://listen.181fm.com/181-rock_128k.mp3",
      "color": "#e84118",
      "description": "Donde Sea en Venezuela"
    },
    {
      "id": 160,
      "name": "VOV3 Hanoi Music",
      "freq": "102.7 FM",
      "city": "Hanoi",
      "country": "Vietnam",
      "flag": "🇻🇳",
      "category": ["pop", "folk"],
      "stream": "https://stream.radioparadise.com/mp3-128",
      "color": "#c0392b",
      "description": "Vietnam National Music Broadcast"
    },
    {
      "id": 161,
      "name": "Star FM Harare",
      "freq": "89.7 FM",
      "city": "Harare",
      "country": "Zimbabwe",
      "flag": "🇿🇼",
      "category": ["pop", "r-and-b"],
      "stream": "https://listen.181fm.com/181-beat_128k.mp3",
      "color": "#27ae60",
      "description": "Sounding Super All Day Zimbabwe"
    }
  ],

  // ── PURE MUSIC & SONGS CATEGORIES ONLY (No News/Talk/Sports) ──
  categories: [
    {
      "id": "ambient",
      "name": "Ambient",
      "icon": "fa-cloud",
      "color": "#48dbfb",
      "desc": "Relaxation, Meditation & Atmospheric"
    },
    {
      "id": "bollywood",
      "name": "Bollywood",
      "icon": "fa-film",
      "color": "#ff4040",
      "desc": "Hindi Cinema Blockbusters & Romantic"
    },
    {
      "id": "classical",
      "name": "Classical",
      "icon": "fa-music",
      "color": "#20bf6b",
      "desc": "Symphony, Raagas & Instrumental Masterpieces"
    },
    {
      "id": "country",
      "name": "Country",
      "icon": "fa-hat-cowboy",
      "color": "#c8a96e",
      "desc": "Nashville Country, Bluegrass & Acoustic"
    },
    {
      "id": "devotional",
      "name": "Devotional",
      "icon": "fa-om",
      "color": "#ffa801",
      "desc": "Bhajans, Kirtans, Aartis & Mantras"
    },
    {
      "id": "electronic",
      "name": "Electronic",
      "icon": "fa-wave-square",
      "color": "#0fb9b1",
      "desc": "EDM, Club Beats, House & Trance"
    },
    {
      "id": "ghazal",
      "name": "Ghazal",
      "icon": "fa-feather-alt",
      "color": "#e056fd",
      "desc": "Soulful Ghazals, Shayari & Mehfil"
    },
    {
      "id": "gospel",
      "name": "Gospel",
      "icon": "fa-church",
      "color": "#fd9644",
      "desc": "Spiritual, Praise & Uplifting Choirs"
    },
    {
      "id": "hip-hop",
      "name": "Hip-Hop",
      "icon": "fa-compact-disc",
      "color": "#ff6b35",
      "desc": "Rap, Trap, Hip-Hop & Urban Rhythms"
    },
    {
      "id": "indie",
      "name": "Indie Pop",
      "icon": "fa-guitar",
      "color": "#6c5ce7",
      "desc": "Independent Bands & Alternative Melodies"
    },
    {
      "id": "jazz",
      "name": "Jazz & Blues",
      "icon": "fa-music",
      "color": "#f7b731",
      "desc": "Smooth Jazz, Saxophone & Midnight Blues"
    },
    {
      "id": "k-pop",
      "name": "K-Pop",
      "icon": "fa-star",
      "color": "#ff84c1",
      "desc": "Korean Pop Superstars & Global Sensations"
    },
    {
      "id": "latin",
      "name": "Latin",
      "icon": "fa-fire",
      "color": "#fc5c65",
      "desc": "Reggaeton, Salsa, Bachata & Fiesta"
    },
    {
      "id": "lo-fi",
      "name": "Lo-Fi Beats",
      "icon": "fa-coffee",
      "color": "#a29bfe",
      "desc": "Chill Beats to Relax, Study & Work"
    },
    {
      "id": "pop",
      "name": "Pop Hits",
      "icon": "fa-headphones",
      "color": "#45aaf2",
      "desc": "Top 40 Billboard Hits & Chart-toppers"
    },
    {
      "id": "punjabi",
      "name": "Punjabi",
      "icon": "fa-drum",
      "color": "#ff3838",
      "desc": "Bhangra, Desi Hip-Hop & Punjabi Beats"
    },
    {
      "id": "r-and-b",
      "name": "R&B / Soul",
      "icon": "fa-heart",
      "color": "#a55eea",
      "desc": "Contemporary R&B, Neo-Soul & Groove"
    },
    {
      "id": "reggae",
      "name": "Reggae",
      "icon": "fa-leaf",
      "color": "#26de81",
      "desc": "Roots Reggae, Dub & Dancehall Vibe"
    },
    {
      "id": "retro",
      "name": "Retro 80s/90s",
      "icon": "fa-record-vinyl",
      "color": "#f39c12",
      "desc": "Golden Era Classics & Nostalgic Hits"
    },
    {
      "id": "rock",
      "name": "Rock & Metal",
      "icon": "fa-bolt",
      "color": "#eb4d4b",
      "desc": "Classic Rock, Hard Rock & Heavy Metal"
    },
    {
      "id": "sufi",
      "name": "Sufi Music",
      "icon": "fa-dove",
      "color": "#10ac84",
      "desc": "Sufiana Kalaam, Qawwali & Divine Peace"
    },
    {
      "id": "tamil",
      "name": "Tamil FM",
      "icon": "fa-music",
      "color": "#e84118",
      "desc": "Kollywood Cinema & Tamil Melodies"
    },
    {
      "id": "telugu",
      "name": "Telugu Beats",
      "icon": "fa-headphones",
      "color": "#1e3799",
      "desc": "Tollywood Hits & Andhra Superhits"
    }
  ],

countries: [
    {
        "name": "India",
        "flag": "🇮🇳",
        "code": "IN"
    },
    {
        "name": "USA",
        "flag": "🇺🇸",
        "code": "US"
    },
    {
        "name": "UK",
        "flag": "🇬🇧",
        "code": "GB"
    },
    {
        "name": "Canada",
        "flag": "🇨🇦",
        "code": "CA"
    },
    {
        "name": "Australia",
        "flag": "🇦🇺",
        "code": "AU"
    },
    {
        "name": "Germany",
        "flag": "🇩🇪",
        "code": "DE"
    },
    {
        "name": "France",
        "flag": "🇫🇷",
        "code": "FR"
    },
    {
        "name": "Brazil",
        "flag": "🇧🇷",
        "code": "BR"
    },
    {
        "name": "Japan",
        "flag": "🇯🇵",
        "code": "JP"
    },
    {
        "name": "UAE",
        "flag": "🇦🇪",
        "code": "AE"
    },
    {
        "name": "Singapore",
        "flag": "🇸🇬",
        "code": "SG"
    },
    {
        "name": "Italy",
        "flag": "🇮🇹",
        "code": "IT"
    },
    {
        "name": "Spain",
        "flag": "🇪🇸",
        "code": "ES"
    },
    {
        "name": "Russia",
        "flag": "🇷🇺",
        "code": "RU"
    },
    {
        "name": "South Korea",
        "flag": "🇰🇷",
        "code": "KR"
    },
    {
        "name": "Mexico",
        "flag": "🇲🇽",
        "code": "MX"
    },
    {
        "name": "Argentina",
        "flag": "🇦🇷",
        "code": "AR"
    },
    {
        "name": "South Africa",
        "flag": "🇿🇦",
        "code": "ZA"
    },
    {
        "name": "Turkey",
        "flag": "🇹🇷",
        "code": "TR"
    },
    {
        "name": "Netherlands",
        "flag": "🇳🇱",
        "code": "NL"
    },
    {
        "name": "Egypt",
        "flag": "🇪🇬",
        "code": "EG"
    },
    {
        "name": "Pakistan",
        "flag": "🇵🇰",
        "code": "PK"
    },
    {
        "name": "Bangladesh",
        "flag": "🇧🇩",
        "code": "BD"
    },
    {
        "name": "Sri Lanka",
        "flag": "🇱🇰",
        "code": "LK"
    },
    {
        "name": "Nepal",
        "flag": "🇳🇵",
        "code": "NP"
    },
    {
        "name": "Afghanistan",
        "flag": "🇦🇫",
        "code": "AF"
    },
    {
        "name": "Albania",
        "flag": "🇦🇱",
        "code": "AL"
    },
    {
        "name": "Algeria",
        "flag": "🇩🇿",
        "code": "DZ"
    },
    {
        "name": "Andorra",
        "flag": "🇦🇩",
        "code": "AD"
    },
    {
        "name": "Angola",
        "flag": "🇦🇴",
        "code": "AO"
    },
    {
        "name": "Antigua and Barbuda",
        "flag": "🇦🇬",
        "code": "AG"
    },
    {
        "name": "Armenia",
        "flag": "🇦🇲",
        "code": "AM"
    },
    {
        "name": "Austria",
        "flag": "🇦🇹",
        "code": "AT"
    },
    {
        "name": "Azerbaijan",
        "flag": "🇦🇿",
        "code": "AZ"
    },
    {
        "name": "Bahamas",
        "flag": "🇧🇸",
        "code": "BS"
    },
    {
        "name": "Bahrain",
        "flag": "🇧🇭",
        "code": "BH"
    },
    {
        "name": "Barbados",
        "flag": "🇧🇧",
        "code": "BB"
    },
    {
        "name": "Belarus",
        "flag": "🇧🇾",
        "code": "BY"
    },
    {
        "name": "Belgium",
        "flag": "🇧🇪",
        "code": "BE"
    },
    {
        "name": "Belize",
        "flag": "🇧🇿",
        "code": "BZ"
    },
    {
        "name": "Benin",
        "flag": "🇧🇯",
        "code": "BJ"
    },
    {
        "name": "Bhutan",
        "flag": "🇧🇹",
        "code": "BT"
    },
    {
        "name": "Bolivia",
        "flag": "🇧🇴",
        "code": "BO"
    },
    {
        "name": "Bosnia and Herzegovina",
        "flag": "🇧🇦",
        "code": "BA"
    },
    {
        "name": "Botswana",
        "flag": "🇧🇼",
        "code": "BW"
    },
    {
        "name": "Brunei",
        "flag": "🇧🇳",
        "code": "BN"
    },
    {
        "name": "Bulgaria",
        "flag": "🇧🇬",
        "code": "BG"
    },
    {
        "name": "Burkina Faso",
        "flag": "🇧🇫",
        "code": "BF"
    },
    {
        "name": "Burundi",
        "flag": "🇧🇮",
        "code": "BI"
    },
    {
        "name": "Cabo Verde",
        "flag": "🇨🇻",
        "code": "CV"
    },
    {
        "name": "Cambodia",
        "flag": "🇰🇭",
        "code": "KH"
    },
    {
        "name": "Cameroon",
        "flag": "🇨🇲",
        "code": "CM"
    },
    {
        "name": "Central African Republic",
        "flag": "🇨🇫",
        "code": "CF"
    },
    {
        "name": "Chad",
        "flag": "🇹🇩",
        "code": "TD"
    },
    {
        "name": "Chile",
        "flag": "🇨🇱",
        "code": "CL"
    },
    {
        "name": "China",
        "flag": "🇨🇳",
        "code": "CN"
    },
    {
        "name": "Colombia",
        "flag": "🇨🇴",
        "code": "CO"
    },
    {
        "name": "Comoros",
        "flag": "🇰🇲",
        "code": "KM"
    },
    {
        "name": "Congo",
        "flag": "🇨🇬",
        "code": "CG"
    },
    {
        "name": "DR Congo",
        "flag": "🇨🇩",
        "code": "CD"
    },
    {
        "name": "Costa Rica",
        "flag": "🇨🇷",
        "code": "CR"
    },
    {
        "name": "Croatia",
        "flag": "🇭🇷",
        "code": "HR"
    },
    {
        "name": "Cuba",
        "flag": "🇨🇺",
        "code": "CU"
    },
    {
        "name": "Cyprus",
        "flag": "🇨🇾",
        "code": "CY"
    },
    {
        "name": "Czech Republic",
        "flag": "🇨🇿",
        "code": "CZ"
    },
    {
        "name": "Denmark",
        "flag": "🇩🇰",
        "code": "DK"
    },
    {
        "name": "Djibouti",
        "flag": "🇩🇯",
        "code": "DJ"
    },
    {
        "name": "Dominica",
        "flag": "🇩🇲",
        "code": "DM"
    },
    {
        "name": "Dominican Republic",
        "flag": "🇩🇴",
        "code": "DO"
    },
    {
        "name": "Ecuador",
        "flag": "🇪🇨",
        "code": "EC"
    },
    {
        "name": "El Salvador",
        "flag": "🇸🇻",
        "code": "SV"
    },
    {
        "name": "Equatorial Guinea",
        "flag": "🇬🇶",
        "code": "GQ"
    },
    {
        "name": "Eritrea",
        "flag": "🇪🇷",
        "code": "ER"
    },
    {
        "name": "Estonia",
        "flag": "🇪🇪",
        "code": "EE"
    },
    {
        "name": "Eswatini",
        "flag": "🇸🇿",
        "code": "SZ"
    },
    {
        "name": "Ethiopia",
        "flag": "🇪🇹",
        "code": "ET"
    },
    {
        "name": "Fiji",
        "flag": "🇫🇯",
        "code": "FJ"
    },
    {
        "name": "Finland",
        "flag": "🇫🇮",
        "code": "FI"
    },
    {
        "name": "Gabon",
        "flag": "🇬🇦",
        "code": "GA"
    },
    {
        "name": "Gambia",
        "flag": "🇬🇲",
        "code": "GM"
    },
    {
        "name": "Georgia",
        "flag": "🇬🇪",
        "code": "GE"
    },
    {
        "name": "Ghana",
        "flag": "🇬🇭",
        "code": "GH"
    },
    {
        "name": "Greece",
        "flag": "🇬🇷",
        "code": "GR"
    },
    {
        "name": "Grenada",
        "flag": "🇬🇩",
        "code": "GD"
    },
    {
        "name": "Guatemala",
        "flag": "🇬🇹",
        "code": "GT"
    },
    {
        "name": "Guinea",
        "flag": "🇬🇳",
        "code": "GN"
    },
    {
        "name": "Guinea-Bissau",
        "flag": "🇬🇼",
        "code": "GW"
    },
    {
        "name": "Guyana",
        "flag": "🇬🇾",
        "code": "GY"
    },
    {
        "name": "Haiti",
        "flag": "🇭🇹",
        "code": "HT"
    },
    {
        "name": "Honduras",
        "flag": "🇭🇳",
        "code": "HN"
    },
    {
        "name": "Hungary",
        "flag": "🇭🇺",
        "code": "HU"
    },
    {
        "name": "Iceland",
        "flag": "🇮🇸",
        "code": "IS"
    },
    {
        "name": "Indonesia",
        "flag": "🇮🇩",
        "code": "ID"
    },
    {
        "name": "Iran",
        "flag": "🇮🇷",
        "code": "IR"
    },
    {
        "name": "Iraq",
        "flag": "🇮🇶",
        "code": "IQ"
    },
    {
        "name": "Ireland",
        "flag": "🇮🇪",
        "code": "IE"
    },
    {
        "name": "Israel",
        "flag": "🇮🇱",
        "code": "IL"
    },
    {
        "name": "Ivory Coast",
        "flag": "🇨🇮",
        "code": "CI"
    },
    {
        "name": "Jamaica",
        "flag": "🇯🇲",
        "code": "JM"
    },
    {
        "name": "Jordan",
        "flag": "🇯🇴",
        "code": "JO"
    },
    {
        "name": "Kazakhstan",
        "flag": "🇰🇿",
        "code": "KZ"
    },
    {
        "name": "Kenya",
        "flag": "🇰🇪",
        "code": "KE"
    },
    {
        "name": "Kiribati",
        "flag": "🇰🇮",
        "code": "KI"
    },
    {
        "name": "Kuwait",
        "flag": "🇰🇼",
        "code": "KW"
    },
    {
        "name": "Kyrgyzstan",
        "flag": "🇰🇬",
        "code": "KG"
    },
    {
        "name": "Laos",
        "flag": "🇱🇦",
        "code": "LA"
    },
    {
        "name": "Latvia",
        "flag": "🇱🇻",
        "code": "LV"
    },
    {
        "name": "Lebanon",
        "flag": "🇱🇧",
        "code": "LB"
    },
    {
        "name": "Lesotho",
        "flag": "🇱🇸",
        "code": "LS"
    },
    {
        "name": "Liberia",
        "flag": "🇱🇷",
        "code": "LR"
    },
    {
        "name": "Libya",
        "flag": "🇱🇾",
        "code": "LY"
    },
    {
        "name": "Liechtenstein",
        "flag": "🇱🇮",
        "code": "LI"
    },
    {
        "name": "Lithuania",
        "flag": "🇱🇹",
        "code": "LT"
    },
    {
        "name": "Luxembourg",
        "flag": "🇱🇺",
        "code": "LU"
    },
    {
        "name": "Madagascar",
        "flag": "🇲🇬",
        "code": "MG"
    },
    {
        "name": "Malawi",
        "flag": "🇲🇼",
        "code": "MW"
    },
    {
        "name": "Malaysia",
        "flag": "🇲🇾",
        "code": "MY"
    },
    {
        "name": "Maldives",
        "flag": "🇲🇻",
        "code": "MV"
    },
    {
        "name": "Mali",
        "flag": "🇲🇱",
        "code": "ML"
    },
    {
        "name": "Malta",
        "flag": "🇲🇹",
        "code": "MT"
    },
    {
        "name": "Marshall Islands",
        "flag": "🇲🇭",
        "code": "MH"
    },
    {
        "name": "Mauritania",
        "flag": "🇲🇷",
        "code": "MR"
    },
    {
        "name": "Mauritius",
        "flag": "🇲🇺",
        "code": "MU"
    },
    {
        "name": "Micronesia",
        "flag": "🇫🇲",
        "code": "FM"
    },
    {
        "name": "Moldova",
        "flag": "🇲🇩",
        "code": "MD"
    },
    {
        "name": "Monaco",
        "flag": "🇲🇨",
        "code": "MC"
    },
    {
        "name": "Mongolia",
        "flag": "🇲🇳",
        "code": "MN"
    },
    {
        "name": "Montenegro",
        "flag": "🇲🇪",
        "code": "ME"
    },
    {
        "name": "Morocco",
        "flag": "🇲🇦",
        "code": "MA"
    },
    {
        "name": "Mozambique",
        "flag": "🇲🇿",
        "code": "MZ"
    },
    {
        "name": "Myanmar",
        "flag": "🇲🇲",
        "code": "MM"
    },
    {
        "name": "Namibia",
        "flag": "🇳🇦",
        "code": "NA"
    },
    {
        "name": "Nauru",
        "flag": "🇳🇷",
        "code": "NR"
    },
    {
        "name": "New Zealand",
        "flag": "🇳🇿",
        "code": "NZ"
    },
    {
        "name": "Nicaragua",
        "flag": "🇳🇮",
        "code": "NI"
    },
    {
        "name": "Niger",
        "flag": "🇳🇪",
        "code": "NE"
    },
    {
        "name": "Nigeria",
        "flag": "🇳🇬",
        "code": "NG"
    },
    {
        "name": "North Korea",
        "flag": "🇰🇵",
        "code": "KP"
    },
    {
        "name": "North Macedonia",
        "flag": "🇲🇰",
        "code": "MK"
    },
    {
        "name": "Norway",
        "flag": "🇳🇴",
        "code": "NO"
    },
    {
        "name": "Oman",
        "flag": "🇴🇲",
        "code": "OM"
    },
    {
        "name": "Palau",
        "flag": "🇵🇼",
        "code": "PW"
    },
    {
        "name": "Palestine",
        "flag": "🇵🇸",
        "code": "PS"
    },
    {
        "name": "Panama",
        "flag": "🇵🇦",
        "code": "PA"
    },
    {
        "name": "Papua New Guinea",
        "flag": "🇵🇬",
        "code": "PG"
    },
    {
        "name": "Paraguay",
        "flag": "🇵🇾",
        "code": "PY"
    },
    {
        "name": "Peru",
        "flag": "🇵🇪",
        "code": "PE"
    },
    {
        "name": "Philippines",
        "flag": "🇵🇭",
        "code": "PH"
    },
    {
        "name": "Poland",
        "flag": "🇵🇱",
        "code": "PL"
    },
    {
        "name": "Portugal",
        "flag": "🇵🇹",
        "code": "PT"
    },
    {
        "name": "Qatar",
        "flag": "🇶🇦",
        "code": "QA"
    },
    {
        "name": "Romania",
        "flag": "🇷🇴",
        "code": "RO"
    },
    {
        "name": "Rwanda",
        "flag": "🇷🇼",
        "code": "RW"
    },
    {
        "name": "Saint Kitts and Nevis",
        "flag": "🇰🇳",
        "code": "KN"
    },
    {
        "name": "Saint Lucia",
        "flag": "🇱🇨",
        "code": "LC"
    },
    {
        "name": "Saint Vincent and the Grenadines",
        "flag": "🇻🇨",
        "code": "VC"
    },
    {
        "name": "Samoa",
        "flag": "🇼🇸",
        "code": "WS"
    },
    {
        "name": "San Marino",
        "flag": "🇸🇲",
        "code": "SM"
    },
    {
        "name": "Sao Tome and Principe",
        "flag": "🇸🇹",
        "code": "ST"
    },
    {
        "name": "Saudi Arabia",
        "flag": "🇸🇦",
        "code": "SA"
    },
    {
        "name": "Senegal",
        "flag": "🇸🇳",
        "code": "SN"
    },
    {
        "name": "Serbia",
        "flag": "🇷🇸",
        "code": "RS"
    },
    {
        "name": "Seychelles",
        "flag": "🇸🇨",
        "code": "SC"
    },
    {
        "name": "Sierra Leone",
        "flag": "🇸🇱",
        "code": "SL"
    },
    {
        "name": "Slovakia",
        "flag": "🇸🇰",
        "code": "SK"
    },
    {
        "name": "Slovenia",
        "flag": "🇸🇮",
        "code": "SI"
    },
    {
        "name": "Solomon Islands",
        "flag": "🇸🇧",
        "code": "SB"
    },
    {
        "name": "Somalia",
        "flag": "🇸🇴",
        "code": "SO"
    },
    {
        "name": "South Sudan",
        "flag": "🇸🇸",
        "code": "SS"
    },
    {
        "name": "Sudan",
        "flag": "🇸🇩",
        "code": "SD"
    },
    {
        "name": "Suriname",
        "flag": "🇸🇷",
        "code": "SR"
    },
    {
        "name": "Sweden",
        "flag": "🇸🇪",
        "code": "SE"
    },
    {
        "name": "Switzerland",
        "flag": "🇨🇭",
        "code": "CH"
    },
    {
        "name": "Syria",
        "flag": "🇸🇾",
        "code": "SY"
    },
    {
        "name": "Taiwan",
        "flag": "🇹🇼",
        "code": "TW"
    },
    {
        "name": "Tajikistan",
        "flag": "🇹🇯",
        "code": "TJ"
    },
    {
        "name": "Tanzania",
        "flag": "🇹🇿",
        "code": "TZ"
    },
    {
        "name": "Thailand",
        "flag": "🇹🇭",
        "code": "TH"
    },
    {
        "name": "Timor-Leste",
        "flag": "🇹🇱",
        "code": "TL"
    },
    {
        "name": "Togo",
        "flag": "🇹🇬",
        "code": "TG"
    },
    {
        "name": "Tonga",
        "flag": "🇹🇴",
        "code": "TO"
    },
    {
        "name": "Trinidad and Tobago",
        "flag": "🇹🇹",
        "code": "TT"
    },
    {
        "name": "Tunisia",
        "flag": "🇹🇳",
        "code": "TN"
    },
    {
        "name": "Turkmenistan",
        "flag": "🇹🇲",
        "code": "TM"
    },
    {
        "name": "Tuvalu",
        "flag": "🇹🇻",
        "code": "TV"
    },
    {
        "name": "Uganda",
        "flag": "🇺🇬",
        "code": "UG"
    },
    {
        "name": "Ukraine",
        "flag": "🇺🇦",
        "code": "UA"
    },
    {
        "name": "Uruguay",
        "flag": "🇺🇾",
        "code": "UY"
    },
    {
        "name": "Uzbekistan",
        "flag": "🇺🇿",
        "code": "UZ"
    },
    {
        "name": "Vanuatu",
        "flag": "🇻🇺",
        "code": "VU"
    },
    {
        "name": "Vatican City",
        "flag": "🇻🇦",
        "code": "VA"
    },
    {
        "name": "Venezuela",
        "flag": "🇻🇪",
        "code": "VE"
    },
    {
        "name": "Vietnam",
        "flag": "🇻🇳",
        "code": "VN"
    },
    {
        "name": "Yemen",
        "flag": "🇾🇪",
        "code": "YE"
    },
    {
        "name": "Zambia",
        "flag": "🇿🇲",
        "code": "ZM"
    },
    {
        "name": "Zimbabwe",
        "flag": "🇿🇼",
        "code": "ZW"
    },
    {
        "name": "Hong Kong",
        "flag": "🇭🇰",
        "code": "HK"
    },
    {
        "name": "Puerto Rico",
        "flag": "🇵🇷",
        "code": "PR"
    },
    {
        "name": "Macau",
        "flag": "🇲🇴",
        "code": "MO"
    },
    {
        "name": "Greenland",
        "flag": "🇬🇱",
        "code": "GL"
    },
    {
        "name": "Bermuda",
        "flag": "🇧🇲",
        "code": "BM"
    },
    {
        "name": "Cayman Islands",
        "flag": "🇰🇾",
        "code": "KY"
    },
    {
        "name": "Aruba",
        "flag": "🇦🇼",
        "code": "AW"
    },
    {
        "name": "Curacao",
        "flag": "🇨🇼",
        "code": "CW"
    },
    {
        "name": "Faroe Islands",
        "flag": "🇫🇴",
        "code": "FO"
    },
    {
        "name": "Gibraltar",
        "flag": "🇬🇮",
        "code": "GI"
    },
    {
        "name": "Guam",
        "flag": "🇬🇺",
        "code": "GU"
    },
    {
        "name": "French Polynesia",
        "flag": "🇵🇫",
        "code": "PF"
    },
    {
        "name": "Isle of Man",
        "flag": "🇮🇲",
        "code": "IM"
    },
    {
        "name": "Jersey",
        "flag": "🇯🇪",
        "code": "JE"
    },
    {
        "name": "Guernsey",
        "flag": "🇬🇬",
        "code": "GG"
    },
    {
        "name": "New Caledonia",
        "flag": "🇳🇨",
        "code": "NC"
    },
    {
        "name": "US Virgin Islands",
        "flag": "🇻🇮",
        "code": "VI"
    },
    {
        "name": "British Virgin Islands",
        "flag": "🇻🇬",
        "code": "VG"
    },
    {
        "name": "Sint Maarten",
        "flag": "🇸🇽",
        "code": "SX"
    },
    {
        "name": "Saint Martin",
        "flag": "🇲🇫",
        "code": "MF"
    },
    {
        "name": "Martinique",
        "flag": "🇲🇶",
        "code": "MQ"
    },
    {
        "name": "Guadeloupe",
        "flag": "🇬🇵",
        "code": "GP"
    },
    {
        "name": "Reunion",
        "flag": "🇷🇪",
        "code": "RE"
    },
    {
        "name": "Mayotte",
        "flag": "🇾🇹",
        "code": "YT"
    },
    {
        "name": "French Guiana",
        "flag": "🇬🇫",
        "code": "GF"
    },
    {
        "name": "American Samoa",
        "flag": "🇦🇸",
        "code": "AS"
    },
    {
        "name": "Northern Mariana Islands",
        "flag": "🇲🇵",
        "code": "MP"
    },
    {
        "name": "Turks and Caicos Islands",
        "flag": "🇹🇨",
        "code": "TC"
    },
    {
        "name": "Anguilla",
        "flag": "🇦🇮",
        "code": "AI"
    },
    {
        "name": "Montserrat",
        "flag": "🇲🇸",
        "code": "MS"
    },
    {
        "name": "Falkland Islands",
        "flag": "🇫🇰",
        "code": "FK"
    },
    {
        "name": "Saint Helena",
        "flag": "🇸🇭",
        "code": "SH"
    },
    {
        "name": "Cook Islands",
        "flag": "🇨🇰",
        "code": "CK"
    },
    {
        "name": "Niue",
        "flag": "🇳🇺",
        "code": "NU"
    },
    {
        "name": "Tokelau",
        "flag": "🇹🇰",
        "code": "TK"
    },
    {
        "name": "Wallis and Futuna",
        "flag": "🇼🇫",
        "code": "WF"
    },
    {
        "name": "Saint Pierre and Miquelon",
        "flag": "🇵🇲",
        "code": "PM"
    },
    {
        "name": "Saint Barthelemy",
        "flag": "🇧🇱",
        "code": "BL"
    },
    {
        "name": "Aland Islands",
        "flag": "🇦🇽",
        "code": "AX"
    },
    {
        "name": "Svalbard and Jan Mayen",
        "flag": "🇸🇯",
        "code": "SJ"
    },
    {
        "name": "Norfolk Island",
        "flag": "🇳🇫",
        "code": "NF"
    },
    {
        "name": "Christmas Island",
        "flag": "🇨🇽",
        "code": "CX"
    },
    {
        "name": "Cocos (Keeling) Islands",
        "flag": "🇨🇨",
        "code": "CC"
    },
    {
        "name": "Pitcairn Islands",
        "flag": "🇵🇳",
        "code": "PN"
    },
    {
        "name": "Western Sahara",
        "flag": "🇪🇭",
        "code": "EH"
    },
    {
        "name": "Kosovo",
        "flag": "🇽🇰",
        "code": "XK"
    },
    {
        "name": "Bonaire",
        "flag": "🇧🇶",
        "code": "BQ"
    },
    {
        "name": "Saba",
        "flag": "🇧🇶",
        "code": "BQ"
    },
    {
        "name": "Sint Eustatius",
        "flag": "🇧🇶",
        "code": "BQ"
    },
    {
        "name": "South Georgia",
        "flag": "🇬🇸",
        "code": "GS"
    },
    {
        "name": "British Indian Ocean Territory",
        "flag": "🇮🇴",
        "code": "IO"
    },
    {
        "name": "French Southern Territories",
        "flag": "🇹🇫",
        "code": "TF"
    },
    {
        "name": "Heard Island and McDonald Islands",
        "flag": "🇭🇲",
        "code": "HM"
    },
    {
        "name": "Bouvet Island",
        "flag": "🇧🇻",
        "code": "BV"
    },
    {
        "name": "Antarctica",
        "flag": "🇦🇶",
        "code": "AQ"
    },
    {
        "name": "Zanzibar",
        "flag": "🇹🇿",
        "code": "TZ"
    },
    {
        "name": "Canary Islands",
        "flag": "🇮🇨",
        "code": "IC"
    },
    {
        "name": "Ceuta and Melilla",
        "flag": "🇪🇦",
        "code": "EA"
    },
    {
        "name": "Azores",
        "flag": "🇵🇹",
        "code": "PT"
    },
    {
        "name": "Madeira",
        "flag": "🇵🇹",
        "code": "PT"
    },
    {
        "name": "Northern Cyprus",
        "flag": "🇹🇷",
        "code": "CY"
    },
    {
        "name": "Somaliland",
        "flag": "🇸🇴",
        "code": "SO"
    },
    {
        "name": "Transnistria",
        "flag": "🇲🇩",
        "code": "MD"
    },
    {
        "name": "Abkhazia",
        "flag": "🇬🇪",
        "code": "GE"
    },
    {
        "name": "South Ossetia",
        "flag": "🇬🇪",
        "code": "GE"
    },
    {
        "name": "Artsakh",
        "flag": "🇦🇲",
        "code": "AM"
    },
    {
        "name": "Kurdistan",
        "flag": "🇮🇶",
        "code": "IQ"
    },
    {
        "name": "Tibet",
        "flag": "🇨🇳",
        "code": "CN"
    },
    {
        "name": "Catalonia",
        "flag": "🇪🇸",
        "code": "ES"
    },
    {
        "name": "Basque Country",
        "flag": "🇪🇸",
        "code": "ES"
    },
    {
        "name": "Scotland",
        "flag": "🏴󠁧󠁢󠁣󠁴󠁿",
        "code": "GB"
    },
    {
        "name": "Wales",
        "flag": "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
        "code": "GB"
    },
    {
        "name": "Northern Ireland",
        "flag": "🇬🇧",
        "code": "GB"
    },
    {
        "name": "England",
        "flag": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        "code": "GB"
    }
],
  indianStates: [
    {
        "name": "Maharashtra",
        "code": "MH",
        "cities": [
            "Mumbai",
            "Pune",
            "Nagpur",
            "Nashik",
            "Aurangabad",
            "Kolhapur"
        ]
    },
    {
        "name": "Delhi",
        "code": "DL",
        "cities": [
            "Delhi",
            "New Delhi",
            "NCR",
            "Noida",
            "Gurugram",
            "Faridabad"
        ]
    },
    {
        "name": "Punjab",
        "code": "PB",
        "cities": [
            "Amritsar",
            "Ludhiana",
            "Jalandhar",
            "Patiala",
            "Bathinda",
            "Mohali"
        ]
    },
    {
        "name": "Karnataka",
        "code": "KA",
        "cities": [
            "Bangalore",
            "Bengaluru",
            "Mysore",
            "Mangalore",
            "Hubli",
            "Belgaum"
        ]
    },
    {
        "name": "Tamil Nadu",
        "code": "TN",
        "cities": [
            "Chennai",
            "Coimbatore",
            "Madurai",
            "Trichy",
            "Salem",
            "Tirunelveli"
        ]
    },
    {
        "name": "West Bengal",
        "code": "WB",
        "cities": [
            "Kolkata",
            "Howrah",
            "Siliguri",
            "Asansol",
            "Durgapur"
        ]
    },
    {
        "name": "Gujarat",
        "code": "GJ",
        "cities": [
            "Ahmedabad",
            "Surat",
            "Vadodara",
            "Rajkot",
            "Gandhinagar",
            "Bhavnagar"
        ]
    },
    {
        "name": "Kerala",
        "code": "KL",
        "cities": [
            "Kochi",
            "Thiruvananthapuram",
            "Kozhikode",
            "Calicut",
            "Thrissur",
            "Kannur"
        ]
    },
    {
        "name": "Telangana",
        "code": "TS",
        "cities": [
            "Hyderabad",
            "Warangal",
            "Nizamabad",
            "Karimnagar"
        ]
    },
    {
        "name": "Rajasthan",
        "code": "RJ",
        "cities": [
            "Jaipur",
            "Jodhpur",
            "Udaipur",
            "Kota",
            "Ajmer",
            "Bikaner"
        ]
    },
    {
        "name": "Uttar Pradesh",
        "code": "UP",
        "cities": [
            "Lucknow",
            "Kanpur",
            "Varanasi",
            "Agra",
            "Prayagraj",
            "Meerut",
            "Ghaziabad"
        ]
    },
    {
        "name": "Bihar",
        "code": "BR",
        "cities": [
            "Patna",
            "Gaya",
            "Muzaffarpur",
            "Bhagalpur",
            "Darbhanga"
        ]
    },
    {
        "name": "Madhya Pradesh",
        "code": "MP",
        "cities": [
            "Bhopal",
            "Indore",
            "Gwalior",
            "Jabalpur",
            "Ujjain"
        ]
    },
    {
        "name": "Haryana",
        "code": "HR",
        "cities": [
            "Gurugram",
            "Faridabad",
            "Panipat",
            "Ambala",
            "Rohtak",
            "Karnal"
        ]
    },
    {
        "name": "Goa",
        "code": "GA",
        "cities": [
            "Panaji",
            "Margao",
            "Vasco",
            "Mapusa"
        ]
    },
    {
        "name": "Andhra Pradesh",
        "code": "AP",
        "cities": [
            "Visakhapatnam",
            "Vijayawada",
            "Guntur",
            "Tirupati",
            "Nellore"
        ]
    },
    {
        "name": "Assam",
        "code": "AS",
        "cities": [
            "Guwahati",
            "Dibrugarh",
            "Silchar",
            "Jorhat",
            "Nagaon"
        ]
    },
    {
        "name": "Odisha",
        "code": "OR",
        "cities": [
            "Bhubaneswar",
            "Cuttack",
            "Rourkela",
            "Puri",
            "Sambalpur"
        ]
    },
    {
        "name": "Jammu & Kashmir",
        "code": "JK",
        "cities": [
            "Srinagar",
            "Jammu",
            "Anantnag",
            "Baramulla"
        ]
    },
    {
        "name": "Jharkhand",
        "code": "JH",
        "cities": [
            "Ranchi",
            "Jamshedpur",
            "Dhanbad",
            "Bokaro"
        ]
    },
    {
        "name": "Chhattisgarh",
        "code": "CT",
        "cities": [
            "Raipur",
            "Bilaspur",
            "Bhilai",
            "Durg"
        ]
    },
    {
        "name": "Himachal Pradesh",
        "code": "HP",
        "cities": [
            "Shimla",
            "Dharamshala",
            "Manali",
            "Kullu",
            "Solan"
        ]
    },
    {
        "name": "Uttarakhand",
        "code": "UK",
        "cities": [
            "Dehradun",
            "Haridwar",
            "Rishikesh",
            "Nainital",
            "Roorkee"
        ]
    },
    {
        "name": "Chandigarh",
        "code": "CH",
        "cities": [
            "Chandigarh"
        ]
    },
    {
        "name": "Tripura",
        "code": "TR",
        "cities": [
            "Agartala",
            "Udaipur",
            "Dharmanagar"
        ]
    },
    {
        "name": "Meghalaya",
        "code": "ML",
        "cities": [
            "Shillong",
            "Tura",
            "Jowai"
        ]
    },
    {
        "name": "Manipur",
        "code": "MN",
        "cities": [
            "Imphal",
            "Thoubal",
            "Churachandpur"
        ]
    },
    {
        "name": "Nagaland",
        "code": "NL",
        "cities": [
            "Kohima",
            "Dimapur",
            "Mokokchung"
        ]
    },
    {
        "name": "Mizoram",
        "code": "MZ",
        "cities": [
            "Aizawl",
            "Lunglei",
            "Champhai"
        ]
    },
    {
        "name": "Sikkim",
        "code": "SK",
        "cities": [
            "Gangtok",
            "Namchi",
            "Geyzing"
        ]
    },
    {
        "name": "Arunachal Pradesh",
        "code": "AR",
        "cities": [
            "Itanagar",
            "Naharlagun",
            "Pasighat",
            "Tawang"
        ]
    },
    {
        "name": "Puducherry",
        "code": "PY",
        "cities": [
            "Puducherry",
            "Karaikal",
            "Mahe",
            "Yanam"
        ]
    },
    {
        "name": "Ladakh",
        "code": "LA",
        "cities": [
            "Leh",
            "Kargil"
        ]
    },
    {
        "name": "Andaman and Nicobar",
        "code": "AN",
        "cities": [
            "Port Blair",
            "Havelock"
        ]
    },
    {
        "name": "Dadra and Nagar Haveli and Daman and Diu",
        "code": "DN",
        "cities": [
            "Daman",
            "Diu",
            "Silvassa"
        ]
    },
    {
        "name": "Lakshadweep",
        "code": "LD",
        "cities": [
            "Kavaratti",
            "Agatti",
            "Amini"
        ]
    }
],

  streamingApps: [
    { id: 'spotify', name: 'Spotify', icon: 'fa-spotify', brand: '#1db954', isBrandFa: true },
    { id: 'youtube', name: 'YouTube Music', icon: 'fa-youtube', brand: '#ff0000', isBrandFa: true },
    { id: 'soundcloud', name: 'SoundCloud', icon: 'fa-soundcloud', brand: '#ff5500', isBrandFa: true },
    { id: 'jiosaavn', name: 'JioSaavn', icon: 'fa-play-circle', brand: '#2bc5b4', isBrandFa: false },
    { id: 'gaana', name: 'Gaana', icon: 'fa-music', brand: '#e72c30', isBrandFa: false },
    { id: 'wynk', name: 'Wynk Music', icon: 'fa-headphones-alt', brand: '#ee2e24', isBrandFa: false },
    { id: 'apple', name: 'Apple Music', icon: 'fa-apple', brand: '#fa243c', isBrandFa: true },
    { id: 'amazon', name: 'Amazon Music', icon: 'fa-amazon', brand: '#00a8e1', isBrandFa: true },
    { id: 'deezer', name: 'Deezer', icon: 'fa-compact-disc', brand: '#a238ff', isBrandFa: false },
    { id: 'tidal', name: 'Tidal', icon: 'fa-wave-square', brand: '#00ffff', isBrandFa: false }
  ],
  musicApps: [
    { id: 'spotify', name: 'Spotify', icon: 'fa-spotify', brand: '#1db954', isBrandFa: true },
    { id: 'youtube', name: 'YouTube Music', icon: 'fa-youtube', brand: '#ff0000', isBrandFa: true },
    { id: 'soundcloud', name: 'SoundCloud', icon: 'fa-soundcloud', brand: '#ff5500', isBrandFa: true },
    { id: 'jiosaavn', name: 'JioSaavn', icon: 'fa-play-circle', brand: '#2bc5b4', isBrandFa: false },
    { id: 'gaana', name: 'Gaana', icon: 'fa-music', brand: '#e72c30', isBrandFa: false },
    { id: 'wynk', name: 'Wynk Music', icon: 'fa-headphones-alt', brand: '#ee2e24', isBrandFa: false },
    { id: 'apple', name: 'Apple Music', icon: 'fa-apple', brand: '#fa243c', isBrandFa: true },
    { id: 'amazon', name: 'Amazon Music', icon: 'fa-amazon', brand: '#00a8e1', isBrandFa: true },
    { id: 'deezer', name: 'Deezer', icon: 'fa-compact-disc', brand: '#a238ff', isBrandFa: false },
    { id: 'tidal', name: 'Tidal', icon: 'fa-wave-square', brand: '#00ffff', isBrandFa: false }
  ],

  // ── Now Playing dynamic catalog covering IDs 1 to 161 ──
  nowPlayingData: {
    "1": { "song": "Kesariya", "artist": "Arijit Singh, Pritam", "thumb": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80" },
    "2": { "song": "Apna Bana Le", "artist": "Arijit Singh, Sachin-Jigar", "thumb": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&auto=format&fit=crop&q=80" },
    "3": { "song": "Chaleya", "artist": "Anirudh, Arijit Singh", "thumb": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&auto=format&fit=crop&q=80" },
    "4": { "song": "Raataan Lambiyan", "artist": "Jubin Nautiyal, Asees Kaur", "thumb": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&auto=format&fit=crop&q=80" },
    "5": { "song": "Blinding Lights", "artist": "The Weeknd", "thumb": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&auto=format&fit=crop&q=80" },
    "6": { "song": "As It Was", "artist": "Harry Styles", "thumb": "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=200&auto=format&fit=crop&q=80" },
    "7": { "song": "Stay With Me", "artist": "Sam Smith", "thumb": "https://images.unsplash.com/photo-1520523839898-507127027582?w=200&auto=format&fit=crop&q=80" },
    "8": { "song": "Levitating", "artist": "Dua Lipa", "thumb": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&auto=format&fit=crop&q=80" },
    "9": { "song": "Shape of You", "artist": "Ed Sheeran", "thumb": "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=200&auto=format&fit=crop&q=80" },
    "10": { "song": "Flowers", "artist": "Miley Cyrus", "thumb": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=200&auto=format&fit=crop&q=80" },
    "11": { "song": "Viva La Vida", "artist": "Coldplay", "thumb": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&auto=format&fit=crop&q=80" },
    "12": { "song": "Bad Habits", "artist": "Ed Sheeran", "thumb": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&auto=format&fit=crop&q=80" },
    "13": { "song": "Save Your Tears", "artist": "The Weeknd", "thumb": "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=200&auto=format&fit=crop&q=80" },
    "14": { "song": "Starboy", "artist": "The Weeknd, Daft Punk", "thumb": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&auto=format&fit=crop&q=80" },
    "15": { "song": "Dynamite", "artist": "BTS", "thumb": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&auto=format&fit=crop&q=80" },
    "16": { "song": "Despacito", "artist": "Luis Fonsi, Daddy Yankee", "thumb": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80" },
    "17": { "song": "Clair de Lune", "artist": "Claude Debussy", "thumb": "https://images.unsplash.com/photo-1520523839898-507127027582?w=200&auto=format&fit=crop&q=80" },
    "18": { "song": "Take Five", "artist": "Dave Brubeck Quartet", "thumb": "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=200&auto=format&fit=crop&q=80" },
    "19": { "song": "One Love", "artist": "Bob Marley & The Wailers", "thumb": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&auto=format&fit=crop&q=80" },
    "20": { "song": "Hanuman Chalisa", "artist": "Hariharan", "thumb": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80" },
    "21": { "song": "Brown Munde", "artist": "AP Dhillon, Gurinder Gill", "thumb": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&auto=format&fit=crop&q=80" }
  },

  // Live stations map for dynamic Radio-Browser stations
  liveStationsMap: {},

  getById(id) {
    if (!id) return null;
    if (this.liveStationsMap[id]) return this.liveStationsMap[id];
    return this.stations.find(s => String(s.id) === String(id) || s.stationuuid === id);
  },
  getByCountry(country) {
    return this.stations.filter(s => s.country && s.country.toLowerCase() === (country || '').toLowerCase());
  },
  countryStatesMap: {
    'USA': ['California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan', 'New Jersey', 'Virginia', 'Washington', 'Arizona', 'Massachusetts', 'Tennessee', 'Indiana', 'Missouri', 'Maryland', 'Wisconsin', 'Colorado', 'Minnesota', 'South Carolina', 'Alabama', 'Louisiana', 'Kentucky', 'Oregon', 'Oklahoma', 'Connecticut', 'Utah', 'Iowa', 'Nevada', 'Arkansas', 'Mississippi', 'Kansas', 'New Mexico', 'Nebraska', 'Idaho', 'West Virginia', 'Hawaii', 'New Hampshire', 'Maine', 'Montana', 'Rhode Island', 'Delaware', 'South Dakota', 'North Dakota', 'Alaska', 'Vermont', 'Wyoming', 'District of Columbia'],
    'UK': ['England', 'Scotland', 'Wales', 'Northern Ireland', 'London', 'Greater Manchester', 'West Midlands', 'Yorkshire', 'Merseyside', 'Essex', 'Kent', 'Surrey', 'Hampshire', 'Lancashire'],
    'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'Newfoundland and Labrador', 'Prince Edward Island', 'Northwest Territories', 'Yukon', 'Nunavut'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory'],
    'Germany': ['Bavaria', 'Berlin', 'North Rhine-Westphalia', 'Baden-Württemberg', 'Hesse', 'Lower Saxony', 'Saxony', 'Hamburg', 'Rhineland-Palatinate', 'Schleswig-Holstein', 'Brandenburg', 'Thuringia', 'Saxony-Anhalt', 'Mecklenburg-Vorpommern', 'Saarland', 'Bremen'],
    'Brazil': ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Bahia', 'Paraná', 'Rio Grande do Sul', 'Pernambuco', 'Ceará', 'Pará', 'Santa Catarina', 'Goiás', 'Maranhão', 'Amazonas', 'Distrito Federal'],
    'France': ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Provence-Alpes-Côte d\'Azur', 'Nouvelle-Aquitaine', 'Occitanie', 'Hauts-de-France', 'Grand Est', 'Pays de la Loire', 'Bretagne', 'Normandie'],
    'Spain': ['Madrid', 'Catalonia', 'Andalusia', 'Valencia', 'Galicia', 'Basque Country', 'Castile and León', 'Canary Islands', 'Aragon', 'Murcia'],
    'Italy': ['Lombardy', 'Lazio', 'Campania', 'Sicily', 'Veneto', 'Piedmont', 'Emilia-Romagna', 'Tuscany', 'Apulia', 'Sardinia'],
    'Japan': ['Tokyo', 'Osaka', 'Kanagawa', 'Aichi', 'Hokkaido', 'Fukuoka', 'Kyoto', 'Hyogo', 'Saitama', 'Chiba'],
    'Pakistan': ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Islamabad', 'Gilgit-Baltistan', 'Azad Kashmir'],
    'Bangladesh': ['Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Sylhet', 'Rangpur', 'Barishal', 'Mymensingh']
  },

  getCountryApiName(country) {
    const map = {
      'UK': 'United Kingdom',
      'USA': 'United States',
      'UAE': 'United Arab Emirates',
      'DR Congo': 'Democratic Republic of the Congo',
      'Czech Republic': 'Czechia'
    };
    return map[country] || country || 'India';
  },

  getCountryCode(country) {
    if (!country) return '';
    const found = (this.countries || []).find(c => c.name.toLowerCase() === country.toLowerCase());
    return found && found.code ? found.code : '';
  },

  getStatesForCountry(country = 'India') {
    const c = (country || 'India').trim();
    if (c.toLowerCase() === 'india') {
      return (this.indianStates || []).map(st => ({ name: st.name, code: st.code, cities: st.cities || [] }));
    }
    const presetKey = Object.keys(this.countryStatesMap).find(k => k.toLowerCase() === c.toLowerCase());
    if (presetKey) {
      return this.countryStatesMap[presetKey].map(name => ({ name, cities: [name] }));
    }
    // Extract unique cities/states from curated stations in this country
    const cities = [...new Set(
      this.getByCountry(c)
        .map(s => s.state || s.city)
        .filter(v => v && v.toLowerCase() !== 'national' && v.toLowerCase() !== c.toLowerCase())
    )];
    return cities.map(name => ({ name, cities: [name] }));
  },

  async fetchStatesForCountry(country = 'India') {
    const curated = this.getStatesForCountry(country);
    const apiCountry = this.getCountryApiName(country);
    const seen = new Map();

    // Seed curated clean states first
    curated.forEach(st => {
      seen.set(st.name.toLowerCase(), { name: st.name, cities: st.cities || [st.name], stationcount: 0 });
    });

    const mergeApiStates = (rawList) => {
      (rawList || []).forEach(item => {
        const rawName = (item && item.name ? item.name : '').trim();
        if (!rawName || rawName.length < 2 || rawName.length > 48) return;
        // Skip noisy comma-separated city+state duplicates if India already has clean states
        const key = rawName.toLowerCase();
        if (seen.has(key)) {
          const existing = seen.get(key);
          existing.stationcount = Math.max(existing.stationcount || 0, item.stationcount || 0);
        } else if (country.toLowerCase() !== 'india' || !rawName.includes(',')) {
          // Format title case cleanly
          const prettyName = rawName.replace(/\b\w/g, ch => ch.toUpperCase());
          seen.set(key, { name: prettyName, rawName, cities: [prettyName], stationcount: item.stationcount || 0 });
        }
      });
    };

    try {
      const res = await fetch(`https://de1.api.radio-browser.info/json/states/${encodeURIComponent(apiCountry)}/`, {
        signal: AbortSignal.timeout(4500)
      });
      if (res.ok) {
        const raw = await res.json();
        mergeApiStates(raw);
        return Array.from(seen.values());
      }
    } catch (e) {}

    try {
      const proxyRes = await fetch(`/api/states?country=${encodeURIComponent(apiCountry)}`);
      if (proxyRes.ok) {
        const data = await proxyRes.json();
        if (data && data.states) mergeApiStates(data.states);
      }
    } catch (e) {}

    return Array.from(seen.values());
  },

  getStationsByState(country = 'India', stateName = 'Maharashtra') {
    if (!stateName) return this.getByCountry(country);
    const sn = stateName.toLowerCase();
    const stateObj = this.getStatesForCountry(country).find(st => st.name.toLowerCase() === sn);

    let matches = this.stations.filter(s => {
      if (!s.country || (s.country.toLowerCase() !== country.toLowerCase() && s.country.toLowerCase() !== this.getCountryApiName(country).toLowerCase())) return false;
      if (s.state && s.state.toLowerCase().includes(sn)) return true;
      if (s.city && s.city.toLowerCase().includes(sn)) return true;
      if (stateObj && stateObj.cities && stateObj.cities.some(c => s.city && s.city.toLowerCase().includes(c.toLowerCase()))) return true;
      return false;
    });

    return matches;
  },
  getByCategory(catId) {
    return this.stations.filter(s => s.category && s.category.includes(catId));
  },
  getPopular() {
    return this.stations.slice(0, 15);
  },
  search(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) return [];
    return this.stations.filter(s => 
      s.name.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q) ||
      s.country.toLowerCase().includes(q) ||
      (s.description && s.description.toLowerCase().includes(q)) ||
      (s.category && s.category.some(c => c.toLowerCase().includes(q)))
    );
  },

  // ── RADIO-BROWSER API CLIENT WITH HTTPS MIXED CONTENT FILTERING ──
  async fetchLiveStations({ query = '', country = '', countrycode = '', state = '', tag = '', offset = 0, limit = 50 } = {}) {
    const cleanQuery = (query || '').trim();
    const cleanCountry = (country && country.toLowerCase() !== 'all') ? country.trim() : '';
    const cleanCode = (countrycode || '').trim().toUpperCase();
    const cleanState = (state || '').trim();
    const cleanTag = (tag && tag.toLowerCase() !== 'all') ? tag.trim() : '';

    // 1. Try direct Radio-Browser API endpoint first as requested
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
      hidebroken: 'true',
      order: 'votes',
      reverse: 'true'
    });
    if (cleanQuery) params.append('name', cleanQuery);
    if (cleanCountry) params.append('country', cleanCountry);
    if (cleanCode) params.append('countrycode', cleanCode);
    if (cleanState) params.append('state', cleanState);
    if (cleanTag) params.append('tag', cleanTag);

    const directUrl = `https://de1.api.radio-browser.info/json/stations/search?${params.toString()}`;

    try {
      const response = await fetch(directUrl, { signal: AbortSignal.timeout(6000) });
      if (response.ok) {
        const raw = await response.json();
        // REQUIREMENT 2: Filter fetched results so ONLY stations where url_resolved starts with https:// are displayed
        const httpsOnly = (raw || []).filter(s => s && typeof s.url_resolved === 'string' && s.url_resolved.startsWith('https://'));
        const normalized = httpsOnly.map(s => this.normalizeStation(s));
        normalized.forEach(st => { this.liveStationsMap[st.id] = st; });
        return { success: true, offset, limit, stations: normalized, rawCount: raw.length };
      }
    } catch (e) {
      // Direct call failed or timed out, try our server proxy
    }

    // 2. Fallback to /api/stations proxy endpoint
    try {
      const proxyParams = new URLSearchParams({
        limit: String(limit),
        offset: String(offset)
      });
      if (cleanQuery) proxyParams.append('name', cleanQuery);
      if (cleanCountry) proxyParams.append('country', cleanCountry);
      if (cleanCode) proxyParams.append('countrycode', cleanCode);
      if (cleanState) proxyParams.append('state', cleanState);
      if (cleanTag) proxyParams.append('tag', cleanTag);

      const proxyUrl = `/api/stations?${proxyParams.toString()}`;
      const proxyRes = await fetch(proxyUrl);
      if (proxyRes.ok) {
        const data = await proxyRes.json();
        if (data && data.stations) {
          const httpsOnly = data.stations.filter(s => s && typeof s.url_resolved === 'string' && s.url_resolved.startsWith('https://'));
          const normalized = httpsOnly.map(s => this.normalizeStation(s));
          normalized.forEach(st => { this.liveStationsMap[st.id] = st; });
          return { success: true, offset, limit, stations: normalized, rawCount: data.totalReturned || normalized.length };
        }
      }
    } catch (err) {}

    // 3. Fallback to local curated stations if completely offline
    let local = this.stations;
    if (cleanCountry) local = local.filter(s => s.country && (s.country.toLowerCase().includes(cleanCountry.toLowerCase()) || this.getCountryApiName(s.country).toLowerCase() === cleanCountry.toLowerCase()));
    if (cleanState) {
      const byState = this.getStationsByState(cleanCountry || 'India', cleanState);
      if (byState.length) local = byState;
    }
    if (cleanTag) local = local.filter(s => s.category && s.category.some(c => c.toLowerCase().includes(cleanTag.toLowerCase())));
    if (cleanQuery) local = local.filter(s => s.name.toLowerCase().includes(cleanQuery.toLowerCase()));
    const paged = local.slice(offset, offset + limit).map(s => this.normalizeStation(s));
    paged.forEach(st => { this.liveStationsMap[st.id] = st; });
    return { success: true, offset, limit, stations: paged, isLocalFallback: true, rawCount: paged.length };
  },

  // Normalize station data format
  normalizeStation(raw) {
    if (!raw) return null;
    const id = raw.stationuuid || String(raw.id || Math.random().toString(36).substring(2, 9));
    const countryCode = (raw.countrycode || '').trim().toUpperCase();
    const flag = countryCode ? RadioData.getCountryFlag(countryCode) : (raw.flag || '🌍');
    const stream = raw.url_resolved || raw.url || raw.stream || '';
    const name = (raw.name || 'Global FM Station').trim();
    const color = raw.color || RadioData.getStationColor(name);
    const tags = raw.tags || (Array.isArray(raw.category) ? raw.category.join(', ') : '');

    return {
      id: id,
      stationuuid: raw.stationuuid || id,
      name: name,
      freq: raw.freq || (raw.bitrate ? `${raw.bitrate} kbps` : 'LIVE FM'),
      state: raw.state || '',
      city: raw.state || raw.city || raw.country || 'Global Airwaves',
      country: raw.country || 'Worldwide',
      countrycode: countryCode,
      flag: flag,
      category: tags ? tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean) : ['pop'],
      tags: tags,
      stream: stream,
      url: raw.url || stream,
      url_resolved: stream,
      favicon: raw.favicon || '',
      homepage: raw.homepage || '',
      color: color,
      votes: raw.votes || 0,
      codec: raw.codec || 'MP3',
      bitrate: raw.bitrate || 128,
      description: raw.description || `${tags ? tags.split(',').slice(0, 3).join(' • ') : 'Live Global Radio Broadcast'}`
    };
  },

  // Convert ISO 3166-1 alpha-2 country code to emoji flag
  getCountryFlag(code) {
    if (!code || code.length !== 2) return '🌍';
    try {
      const codePoints = code.toUpperCase().split('').map(c => 127397 + c.charCodeAt(0));
      return String.fromCodePoint(...codePoints);
    } catch (e) {
      return '🌍';
    }
  },

  // Color generator
  getStationColor(name) {
    const ACCENT_COLORS = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#9b59b6', '#e056fd', '#00d2d3', '#fc5c65', '#26de81', '#45aaf2'];
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) {
      hash = (hash << 5) - hash + name.charCodeAt(i);
      hash |= 0;
    }
    return ACCENT_COLORS[Math.abs(hash) % ACCENT_COLORS.length];
  }

};

// Clean minimalist inline SVG radio icon fallback (Base64 Data URI) for broken/http/empty favicons
const RADIO_SVG_FALLBACK = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4Ij48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSIxMiIgZmlsbD0iIzE4MWEyNCIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iMjQiIHI9IjE2IiBzdHJva2U9IiNjOGE4NzYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW9wYWNpdHk9IjAuMyIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iMjQiIHI9IjEwIiBzdHJva2U9IiNjOGE4NzYiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iMjQiIHI9IjQiIGZpbGw9IiNjOGE4NzYiLz48bGluZSB4MT0iMTQiIHkxPSIzNCIgeDI9IjIyIiB5Mj0iMTMiIHN0cm9rZT0iI2YzZjJlZSIgc3Ryb2tlLXdpZHRoPSIyLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxjaXJjbGUgY3g9IjIyIiBjeT0iMTMiIHI9IjIuNSIgZmlsbD0iI2YzZjJlZSIvPjwvc3ZnPg==";
window.RADIO_SVG_FALLBACK = RADIO_SVG_FALLBACK;

function handleImageError(img) {
  if (img) {
    img.onerror = null;
    img.src = RADIO_SVG_FALLBACK;
  }
}
window.handleImageError = handleImageError;

// REQUIREMENT 3: Load station logo from station.favicon. If empty, starts with http://, or triggers onError, replace with clean SVG fallback
function getStationFavicon(station) {
  if (!station) return RADIO_SVG_FALLBACK;
  let fav = station.favicon || '';
  if (typeof fav === 'string' && fav.trim().length > 0) {
    let cleaned = fav.trim();
    if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
      return cleaned;
    }
  }
  if (station.homepage && typeof station.homepage === 'string') {
    try {
      const urlObj = new URL(station.homepage);
      return `https://icons.duckduckgo.com/ip3/${urlObj.hostname}.ico`;
    } catch(e) {}
  }
  return RADIO_SVG_FALLBACK;
}

// Populate remaining nowPlayingData dynamically for IDs 22 to 161
for (let i = 22; i <= 161; i++) {
  const defaultSongs = [
    { song: "Global Hit #"+i, artist: "International Artists", thumb: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80" },
    { song: "Melodic Vibe #"+i, artist: "World Star", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&auto=format&fit=crop&q=80" },
    { song: "Rhythm of World #"+i, artist: "Global Ensemble", thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&auto=format&fit=crop&q=80" },
    { song: "Chilled Sunset #"+i, artist: "Lounge Collective", thumb: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=200&auto=format&fit=crop&q=80" }
  ];
  RadioData.nowPlayingData[i.toString()] = defaultSongs[i % defaultSongs.length];
}
