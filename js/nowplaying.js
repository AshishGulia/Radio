// js/nowplaying.js - Live ICY stream metadata polling (every 12s), Song vs Ad/Talk/News Detection & Auto-Lyrics Trigger

const NowPlaying = (() => {
  // stationId -> { status, isMusic, song, artist, streamTitle, thumb, lastChecked }
  const stationCache = {};
  let activeStation = null;
  let pollIntervalId = null;
  const POLL_INTERVAL_MS = 12000; // Requirement 4: Poll every 12 seconds
  const listeners = [];
  const artworkCache = new Map();
  const pendingFetches = new Set();

  // AD & TALK KEYWORDS SPECIFIED IN USER REQUIREMENT 4:
  // commercial, advert, promo, news, podcast, talk, jingle, station id, weather, traffic, sponsor
  const AD_TALK_KEYWORDS = [
    'commercial',
    'advert',
    'promo',
    'news',
    'podcast',
    'talk',
    'jingle',
    'station id',
    'weather',
    'traffic',
    'sponsor',
    'advertising',
    'advertisement',
    'break'
  ];

  // PRIMARY TAGS FOR TALK / NEWS / SPORTS (FORCE RED)
  const TALK_TAGS = ['news', 'talk', 'podcast', 'sports', 'spoken', 'speech', 'conversation', 'comedy'];

  // Curated genre fallback pools if a stream has no ICY metadata or during offline
  const GENRE_SONG_POOLS = {
    bollywood: [
      { song: "Kesariya", artist: "Arijit Singh, Pritam", defaultThumb: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/01/ef/35/01ef35ac-c046-656c-638f-928c4af51c8d/196589554871.jpg/600x600bb.jpg" },
      { song: "Apna Bana Le", artist: "Arijit Singh, Sachin-Jigar", defaultThumb: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/2e/0b/c0/2e0bc070-112f-a827-6ad8-6bc64f7caaff/840214460180.png/600x600bb.jpg" },
      { song: "Chaleya", artist: "Anirudh Ravichander, Arijit Singh", defaultThumb: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/1e/ff/32/1eff3216-190d-6fd9-8f68-acbba846e6ee/8903431956026_cover.jpg/600x600bb.jpg" },
      { song: "Tum Hi Ho", artist: "Arijit Singh, Mithoon", defaultThumb: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/43/fa/ad/43faad50-c651-6c2e-4cb8-8c1d55e0efaa/887158784119.jpg/600x600bb.jpg" }
    ],
    pop: [
      { song: "Flowers", artist: "Miley Cyrus", defaultThumb: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8c/67/ff/8c67ff91-31c3-3fef-1884-ce3ec89f3af4/196589946874.jpg/600x600bb.jpg" },
      { song: "Blinding Lights", artist: "The Weeknd", defaultThumb: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/61/e7/3f/61e73f94-018d-5f50-50ec-8521952bc72e/20UM1IM11629.rgb.jpg/600x600bb.jpg" },
      { song: "As It Was", artist: "Harry Styles", defaultThumb: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/2a/19/fb/2a19fb85-2f70-9e44-f2a9-82abe679b88e/886449990061.jpg/600x600bb.jpg" },
      { song: "Levitating", artist: "Dua Lipa", defaultThumb: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/6c/11/d6/6c11d681-aa3a-d59e-4c2e-f77e181026ab/190295092665.jpg/600x600bb.jpg" }
    ],
    rock: [
      { song: "Viva La Vida", artist: "Coldplay", defaultThumb: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bc/99/3d/bc993d0f-4886-f138-04ff-cb6ca9bb58f1/0724386383358.jpg/600x600bb.jpg" },
      { song: "Sweet Child O' Mine", artist: "Guns N' Roses", defaultThumb: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/6e/c3/8b/6ec38b7e-9057-0a2a-d948-47d0669d2d0b/00602567484433.rgb.jpg/600x600bb.jpg" }
    ],
    electronic: [
      { song: "Titanium", artist: "David Guetta ft. Sia", defaultThumb: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/35/66/b6/3566b6c8-5801-b541-692a-fa1372b84eb4/5099908412658.jpg/600x600bb.jpg" },
      { song: "Wake Me Up", artist: "Avicii", defaultThumb: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/d5/43/46/d5434651-7f81-9b16-52bb-b1e6a9783f60/13UMGIM22363.rgb.jpg/600x600bb.jpg" }
    ]
  };

  /**
   * REQUIREMENT 4: Parse StreamTitle against criteria
   */
  function evaluateStreamTitle(streamTitle, station) {
    const stationName = (station && station.name ? station.name : '').trim();
    const stationNameLower = stationName.toLowerCase();
    const tagsLower = (station && station.tags ? station.tags : (station && Array.isArray(station.category) ? station.category.join(',') : '')).toLowerCase();

    // 1. Check if station primary tags are news, talk, podcast, or sports -> Force RED
    const isTalkStation = TALK_TAGS.some(tag => tagsLower.includes(tag));
    if (isTalkStation) {
      return {
        status: 'ad',
        isMusic: false,
        badgeText: 'AD / TALK / NEWS',
        badgeClass: 'status-red',
        artist: stationName || 'RadioTym Broadcast',
        song: 'Live News & Talk Segment',
        streamTitle: streamTitle || 'News / Talk'
      };
    }

    // 2. If StreamTitle is missing
    if (!streamTitle || typeof streamTitle !== 'string' || !streamTitle.trim()) {
      return {
        status: 'ad',
        isMusic: false,
        badgeText: 'AD / TALK / NEWS',
        badgeClass: 'status-red',
        artist: stationName || 'RadioTym Airwaves',
        song: 'Station Intermission / Break',
        streamTitle: ''
      };
    }

    const titleTrimmed = streamTitle.trim();
    const titleLower = titleTrimmed.toLowerCase();

    // 3. Exact repetition or match of station name -> Force RED
    if (titleLower === stationNameLower || (stationNameLower.length > 3 && titleLower.includes(stationNameLower) && !titleLower.includes(' - '))) {
      return {
        status: 'ad',
        isMusic: false,
        badgeText: 'AD / TALK / NEWS',
        badgeClass: 'status-red',
        artist: stationName,
        song: 'Station ID / Jingle',
        streamTitle: titleTrimmed
      };
    }

    // 4. Check for Ad / Talk keywords specified in Requirement 4 -> Force RED
    const hasAdKeyword = AD_TALK_KEYWORDS.some(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      return regex.test(titleLower);
    });
    if (hasAdKeyword) {
      return {
        status: 'ad',
        isMusic: false,
        badgeText: 'AD / TALK / NEWS',
        badgeClass: 'status-red',
        artist: stationName,
        song: 'Commercial Sponsor Break',
        streamTitle: titleTrimmed
      };
    }

    // 5. Check if StreamTitle follows a valid "Artist - Song Title" format
    // Common separators: " - ", " – ", " — ", " : "
    const splitParts = titleTrimmed.split(/\s+[-–—:]\s+/);
    if (splitParts.length >= 2 && splitParts[0].trim().length > 0 && splitParts[1].trim().length > 0) {
      const candidateArtist = splitParts[0].trim();
      const candidateSong = splitParts.slice(1).join(' - ').trim();

      // Ensure candidate artist is not merely the station name
      if (candidateArtist.toLowerCase() === stationNameLower) {
        return {
          status: 'ad',
          isMusic: false,
          badgeText: 'AD / TALK / NEWS',
          badgeClass: 'status-red',
          artist: stationName,
          song: candidateSong || 'Station Promo',
          streamTitle: titleTrimmed
        };
      }

      // Valid "Artist - Song Title" detected -> Blinking Green Dot + "LIVE MUSIC"
      return {
        status: 'music',
        isMusic: true,
        badgeText: 'LIVE MUSIC',
        badgeClass: 'status-green',
        artist: candidateArtist,
        song: candidateSong,
        streamTitle: titleTrimmed
      };
    }

    // If stream title doesn't follow "Artist - Song Title" format, mark as AD / TALK / NEWS
    return {
      status: 'ad',
      isMusic: false,
      badgeText: 'AD / TALK / NEWS',
      badgeClass: 'status-red',
      artist: stationName || 'Radio Broadcast',
      song: titleTrimmed,
      streamTitle: titleTrimmed
    };
  }

  /**
   * Poll active stream metadata every 12 seconds
   */
  async function pollActiveStream() {
    if (!activeStation) return;
    const streamUrl = activeStation.url_resolved || activeStation.stream || activeStation.url;
    if (!streamUrl || !streamUrl.startsWith('https://')) return;

    try {
      const res = await fetch(`/api/icy-meta?url=${encodeURIComponent(streamUrl)}`);
      if (res.ok) {
        const data = await res.json();
        const rawTitle = data.found && data.streamTitle ? data.streamTitle : '';
        const evaluated = evaluateStreamTitle(rawTitle, activeStation);

        // Update station cache
        stationCache[activeStation.id] = {
          ...stationCache[activeStation.id],
          ...evaluated,
          lastChecked: Date.now()
        };

        // If GREEN (Song Playing), trigger auto-lyrics, recent song history, and real album cover
        if (evaluated.isMusic) {
          if (typeof App !== 'undefined' && App.recordRecentSong) {
            App.recordRecentSong({
              song: evaluated.song,
              artist: evaluated.artist,
              stationId: activeStation.id,
              stationName: activeStation.name,
              thumb: (stationCache[activeStation.id] && stationCache[activeStation.id].thumb) || ''
            });
          }
          // REQUIREMENT 5: Auto-fetch lyrics when a song plays
          if (typeof LyricsEngine !== 'undefined' && LyricsEngine.autoFetch) {
            LyricsEngine.autoFetch(evaluated.artist, evaluated.song);
          }
          // Fetch HD Album cover from iTunes
          fetchRealArtwork(evaluated.song, evaluated.artist, activeStation.id);
        } else {
          // Red segment
          if (typeof LyricsEngine !== 'undefined' && LyricsEngine.onAdOrTalkSegment) {
            LyricsEngine.onAdOrTalkSegment();
          }
        }

        // Update UI dynamically
        applyLiveMetadataToUI(activeStation.id, evaluated);
        notifyListeners(activeStation.id, evaluated);
      }
    } catch (e) {
      // Network hiccup, retain current state
    }
  }

  /**
   * Start 12-second polling loop for active station
   */
  function setActiveStation(station) {
    activeStation = station;
    if (!station) {
      if (pollIntervalId) clearInterval(pollIntervalId);
      pollIntervalId = null;
      return;
    }

    // Initial check immediately
    pollActiveStream();

    // Setup 12s interval
    if (pollIntervalId) clearInterval(pollIntervalId);
    pollIntervalId = setInterval(pollActiveStream, POLL_INTERVAL_MS);
  }

  /**
   * Asynchronously fetch real HD artwork from iTunes
   */
  async function fetchRealArtwork(song, artist, stationId) {
    const key = `${(song || '').toLowerCase().trim()}___${(artist || '').toLowerCase().trim()}`;
    if (artworkCache.has(key)) {
      const thumb = artworkCache.get(key);
      updateActivePlayerCover(stationId, thumb);
      return thumb;
    }
    if (pendingFetches.has(key)) return null;
    pendingFetches.add(key);

    try {
      const term = `${song} ${artist}`.trim();
      const res = await fetch(`/api/cover?term=${encodeURIComponent(term)}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.found && data.thumb) {
          artworkCache.set(key, data.thumb);
          if (stationCache[stationId]) {
            stationCache[stationId].thumb = data.thumb;
          }
          if (typeof App !== 'undefined' && App.updateRecentSongThumb) {
            App.updateRecentSongThumb(song, artist, data.thumb);
          }
          updateActivePlayerCover(stationId, data.thumb);
          pendingFetches.delete(key);
          return data.thumb;
        }
      }
    } catch (e) {}

    pendingFetches.delete(key);
    return null;
  }

  /**
   * Update Player and Mini Player DOM elements
   */
  function applyLiveMetadataToUI(stationId, info) {
    const current = (typeof AppState !== 'undefined') ? AppState.currentStation : null;
    if (!current || String(current.id) !== String(stationId)) return;

    // Update Song Title & Artist in player screen
    const songTitleEl = document.getElementById('playerSongName');
    if (songTitleEl) songTitleEl.textContent = info.song;

    const artistEl = document.getElementById('playerArtistName');
    if (artistEl) {
      artistEl.innerHTML = `<i class="fas fa-microphone-alt"></i> ${info.artist}`;
    }

    // Update Status Indicator Badges (Full Player)
    const statusContainer = document.getElementById('playerStatusRow');
    if (statusContainer) {
      statusContainer.innerHTML = `
        <span class="status-indicator-badge ${info.badgeClass}">
          <span class="indicator-dot"></span>
          <span>${info.badgeText}</span>
        </span>
        <span class="live-label"><i class="fas fa-broadcast-tower"></i> ON AIR</span>
      `;
    }

    // Update Mini Player Status & Info
    const miniSongEl = document.querySelector('.mini-info .mini-song');
    if (miniSongEl) {
      miniSongEl.innerHTML = `<span class="status-indicator-badge-mini ${info.badgeClass}"><span class="indicator-dot"></span></span> ${info.song} • <em>${info.artist}</em>`;
    }

    // Update MediaSession Lockscreen metadata
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: info.song,
        artist: info.artist,
        album: current.name || 'RadioTym',
        artwork: [
          { src: info.thumb || current.favicon || RADIO_SVG_FALLBACK, sizes: '512x512', type: 'image/jpeg' }
        ]
      });
    }
  }

  function updateActivePlayerCover(stationId, thumbUrl) {
    const current = (typeof AppState !== 'undefined') ? AppState.currentStation : null;
    if (current && String(current.id) === String(stationId)) {
      const mainImg = document.getElementById('playerMainSongThumb');
      if (mainImg) mainImg.src = thumbUrl;
    }
  }

  /**
   * Get cached or tag-inferred info for station (for unpolled list cards vs polled active stations)
   */
  function getSongInfo(stationId) {
    if (stationCache[stationId]) {
      return stationCache[stationId];
    }

    const station = (typeof RadioData !== 'undefined' && RadioData.getById) ? RadioData.getById(stationId) : null;
    const tagsLower = (station && station.tags ? station.tags : (station && Array.isArray(station.category) ? station.category.join(',') : '')).toLowerCase();
    const isTalkTag = TALK_TAGS.some(tag => tagsLower.includes(tag));

    const defaultAdThumb = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=80";
    const defaultMusicThumb = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80";

    const result = isTalkTag ? {
      song: 'Live News & Talk Segment',
      artist: (station && station.name) || 'Radio Broadcast',
      status: 'ad',
      isMusic: false,
      badgeText: 'AD / TALK / NEWS',
      badgeClass: 'status-red',
      thumb: defaultAdThumb,
      lastChecked: 0
    } : {
      song: (station && station.name) ? `${station.name} Live` : 'Live Radio Stream',
      artist: (station && station.country) || 'Tuning ICY Metadata…',
      status: 'music',
      isMusic: true,
      badgeText: 'LIVE MUSIC',
      badgeClass: 'status-green',
      thumb: defaultMusicThumb,
      lastChecked: 0
    };

    stationCache[stationId] = result;
    return result;
  }

  function getStatus(stationId) {
    const info = getSongInfo(stationId);
    return info.status;
  }

  /**
   * HTML status badge generator for station list rows
   */
  function getBadgeHTML(stationId) {
    const info = getSongInfo(stationId);
    return `
      <span class="status-indicator-badge ${info.badgeClass}">
        <span class="indicator-dot"></span>
        <span>${info.badgeText}</span>
      </span>
    `;
  }

  function onStatusChange(fn) {
    listeners.push(fn);
  }

  function notifyListeners(stationId, info) {
    listeners.forEach(fn => {
      try { fn(stationId, info); } catch (e) {}
    });
  }

  return {
    setActiveStation,
    pollActiveStream,
    getSongInfo,
    getStatus,
    getBadgeHTML,
    evaluateStreamTitle,
    fetchRealArtwork,
    onStatusChange
  };
})();
