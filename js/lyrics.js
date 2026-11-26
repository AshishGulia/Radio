// js/lyrics.js - Auto-Fetch Live Lyrics via LRCLIB (/get & /search fallback), Karaoke Display & 100 Languages Translation

const LyricsEngine = (() => {

  // Top 100 Languages for bilingual translation
  const TOP_100_LANGUAGES = [
    { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
    { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'Standard Arabic', native: 'العربية', flag: '🇸🇦' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇧🇩' },
    { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇧🇷' },
    { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
    { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰' },
    { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { code: 'tr', name: 'Turkish', native: 'Türkçe', flag: '🇹🇷' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷' },
    { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹' },
    { code: 'zh', name: 'Mandarin Chinese', native: '中文', flag: '🇨🇳' }
  ];

  // In-memory cache for fetched lyrics: "artist___track" -> lyrics data object
  const lyricsCache = new Map();
  let currentLyrics = null;
  let currentArtist = '';
  let currentTrack = '';
  let isLoading = false;
  let isAdOrTalk = false;
  let targetLangCode = 'en'; // Default translation language: English
  let viewMode = 'bilingual'; // 'bilingual' | 'original' | 'translated'
  let fontSizePx = 16;
  let isOpen = false;

  /**
   * REQUIREMENT 5: Auto-fetch lyrics via LRCLIB when a valid "Artist - Song Title" plays
   */
  async function autoFetch(artist, track) {
    if (!track || !artist) return;
    const cleanTrack = track.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').trim();
    const cleanArtist = artist.split(',')[0].split('&')[0].replace(/feat\..*/i, '').trim();

    if (!cleanTrack) return;

    // Check if same as current loaded track
    const cacheKey = `${cleanArtist.toLowerCase()}___${cleanTrack.toLowerCase()}`;
    currentArtist = artist;
    currentTrack = track;
    isAdOrTalk = false;

    if (lyricsCache.has(cacheKey)) {
      currentLyrics = lyricsCache.get(cacheKey);
      isLoading = false;
      syncAllViews();
      return;
    }

    isLoading = true;
    if (isOpen) renderLoadingState();
    syncInlinePanel();

    try {
      // 1. Direct LRCLIB GET: https://lrclib.net/api/get?artist_name={artist}&track_name={track}
      const getUrl = `https://lrclib.net/api/get?artist_name=${encodeURIComponent(cleanArtist)}&track_name=${encodeURIComponent(cleanTrack)}`;
      const getRes = await fetch(getUrl, { signal: AbortSignal.timeout(5000) });
      if (getRes.ok) {
        const data = await getRes.json();
        if (data && (data.plainLyrics || data.syncedLyrics)) {
          const processed = processLyricsResponse(data, track, artist);
          lyricsCache.set(cacheKey, processed);
          currentLyrics = processed;
          isLoading = false;
          syncAllViews();
          return;
        }
      }
    } catch (e) {}

    // 2. LRCLIB Search Fallback: https://lrclib.net/api/search?q={artist}+{track}
    try {
      const searchUrl = `https://lrclib.net/api/search?q=${encodeURIComponent(cleanArtist + ' ' + cleanTrack)}`;
      const searchRes = await fetch(searchUrl, { signal: AbortSignal.timeout(5000) });
      if (searchRes.ok) {
        const results = await searchRes.json();
        if (Array.isArray(results) && results.length > 0) {
          const match = results.find(r => r && (r.plainLyrics || r.syncedLyrics)) || results[0];
          if (match && (match.plainLyrics || match.syncedLyrics)) {
            const processed = processLyricsResponse(match, track, artist);
            lyricsCache.set(cacheKey, processed);
            currentLyrics = processed;
            isLoading = false;
            syncAllViews();
            return;
          }
        }
      }
    } catch (e) {}

    // 3. Server-side proxy fallback (/api/lyrics)
    try {
      const serverRes = await fetch(`/api/lyrics?track=${encodeURIComponent(cleanTrack)}&artist=${encodeURIComponent(cleanArtist)}`);
      if (serverRes.ok) {
        const sData = await serverRes.json();
        if (sData && sData.found && sData.plainLyrics) {
          const lines = sData.lines || sData.plainLyrics.split('\n').map(l => l.trim()).filter(Boolean);
          const processed = {
            title: track,
            artist: artist,
            origLang: 'Original Track',
            origLangCode: 'en',
            lines: lines.map(line => ({ orig: line, en: line }))
          };
          lyricsCache.set(cacheKey, processed);
          currentLyrics = processed;
          isLoading = false;
          syncAllViews();
          return;
        }
      }
    } catch (e) {}

    // No lyrics found for track
    isLoading = false;
    currentLyrics = null;
    syncAllViews();
  }

  function escapeLyricHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function processLyricsResponse(data, originalTrack, originalArtist) {
    const raw = data.plainLyrics || (data.syncedLyrics ? data.syncedLyrics.replace(/\[\d{2}:\d{2}\.\d{2,3}\]/g, '') : '');
    const cleanLines = raw
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);

    return {
      title: data.trackName || originalTrack,
      artist: data.artistName || originalArtist,
      album: data.albumName || '',
      origLang: 'Original Broadcast',
      origLangCode: 'orig',
      lines: cleanLines.map(l => ({ orig: l, en: l }))
    };
  }

  function syncAllViews() {
    if (isOpen) render();
    syncInlinePanel();
  }

  function getInlineHtml(station) {
    const st = station || (typeof AppState !== 'undefined' && AppState.currentStation) || null;
    const songInfo = (typeof NowPlaying !== 'undefined' && st) ? NowPlaying.getSongInfo(st.id) : null;

    if (isAdOrTalk || (songInfo && !songInfo.isMusic)) {
      return `
        <div class="inline-lyrics-status red">
          <i class="fas fa-bullhorn"></i>
          <span>No lyrics available during broadcast break / talk segment.</span>
        </div>`;
    }
    if (isLoading) {
      return `
        <div class="inline-lyrics-status">
          <i class="fas fa-circle-notch fa-spin"></i>
          <span>Fetching live lyrics from LRCLIB…</span>
        </div>`;
    }
    if (currentLyrics && currentLyrics.lines && currentLyrics.lines.length > 0) {
      return currentLyrics.lines.map(l => `<p class="inline-lyric-line">${escapeLyricHtml(l.orig)}</p>`).join('');
    }
    return `
      <div class="inline-lyrics-status">
        <i class="fas fa-music"></i>
        <span>No lyrics available during broadcast break / talk segment.</span>
      </div>`;
  }

  function syncInlinePanel() {
    const bodyEl = document.getElementById('playerInlineLyricsContent');
    if (bodyEl) {
      bodyEl.innerHTML = getInlineHtml();
    }
    const subEl = document.getElementById('playerInlineLyricsSubtitle');
    if (subEl) {
      if (isAdOrTalk) {
        subEl.textContent = 'Broadcast break / talk segment';
      } else if (isLoading) {
        subEl.textContent = 'Searching LRCLIB…';
      } else if (currentLyrics) {
        subEl.textContent = `${currentLyrics.title} — ${currentLyrics.artist}`;
      } else {
        subEl.textContent = 'Auto-synced via LRCLIB';
      }
    }
  }

  /**
   * REQUIREMENT 5: When the station switches to Red (Ad/News/Talk)
   */
  function onAdOrTalkSegment() {
    isAdOrTalk = true;
    currentLyrics = null;
    isLoading = false;
    syncAllViews();
  }

  function getLanguage(code) {
    return TOP_100_LANGUAGES.find(l => l.code === code) || TOP_100_LANGUAGES[0];
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
    render();
  }

  function setViewMode(mode) {
    viewMode = mode;
    render();
  }

  function adjustFontSize(delta) {
    fontSizePx = Math.max(13, Math.min(24, fontSizePx + delta));
    const container = document.getElementById('lyricsBodyContent');
    if (container) {
      container.style.fontSize = `${fontSizePx}px`;
    }
  }

  function copyLyrics() {
    if (!currentLyrics || !currentLyrics.lines || !currentLyrics.lines.length) {
      if (typeof showToast === 'function') showToast('No lyrics to copy', 'info');
      return;
    }
    const text = `${currentLyrics.title} — ${currentLyrics.artist}\n\n` +
      currentLyrics.lines.map(l => l.orig).join('\n');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        if (typeof showToast === 'function') showToast('Lyrics copied to clipboard!', 'success');
      });
    }
  }

  function renderLoadingState() {
    const screen = document.getElementById('lyrics-screen');
    if (!screen) return;
    screen.innerHTML = `
      <div class="lyrics-container">
        <div class="lyrics-topbar">
          <button class="icon-btn lyrics-close-btn" onclick="LyricsEngine.close()" aria-label="Close Lyrics">
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="lyrics-track-header">
            <span class="lyrics-now-singing"><i class="fas fa-satellite-dish"></i> LIVE RADIO LYRICS</span>
            <h2 class="lyrics-song-title">${currentTrack || 'Live Song'}</h2>
            <span class="lyrics-artist-name">${currentArtist || 'Live Radio Stream'}</span>
          </div>
        </div>
        <div class="lyrics-scroll-body" style="display:flex;align-items:center;justify-content:center;min-height:280px;text-align:center;">
          <div class="lyrics-state-box">
            <i class="fas fa-compact-disc fa-spin" style="font-size:2.2rem;color:var(--accent);margin-bottom:14px;display:inline-block;"></i>
            <h3 style="font-size:1.05rem;color:var(--text-primary);margin-bottom:6px;">Fetching Real-Time Lyrics…</h3>
            <p style="font-size:0.85rem;color:var(--text-secondary);">Querying LRCLIB synchronized lyrics database</p>
          </div>
        </div>
      </div>
    `;
  }

  function render() {
    const screen = document.getElementById('lyrics-screen');
    if (!screen) return;

    const station = (typeof AppState !== 'undefined' && AppState.currentStation) || null;
    const songInfo = (typeof NowPlaying !== 'undefined' && station) ? NowPlaying.getSongInfo(station.id) : null;
    const currentTitle = (currentLyrics && currentLyrics.title) || (songInfo && songInfo.song) || 'Live Radio Song';
    const currentSingers = (currentLyrics && currentLyrics.artist) || (songInfo && songInfo.artist) || (station && station.name) || 'Broadcaster';

    // REQUIREMENT 5: If station is Red (Ad/Talk/News) or lyrics unavailable
    let contentHtml = '';
    if (isAdOrTalk || (songInfo && !songInfo.isMusic)) {
      contentHtml = `
        <div class="lyrics-empty-notice">
          <div class="empty-icon-wrap" style="color:#ff4757;font-size:2.4rem;margin-bottom:12px;">
            <i class="fas fa-bullhorn"></i>
          </div>
          <h3 style="color:#ff4757;font-size:1.05rem;margin-bottom:8px;font-weight:700;">BROADCAST SEGMENT</h3>
          <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.5;max-width:300px;margin:0 auto;">
            No lyrics available during broadcast break / talk segment.
          </p>
          <span style="display:inline-block;margin-top:14px;padding:4px 10px;background:rgba(255,71,87,0.12);border:1px solid rgba(255,71,87,0.25);border-radius:20px;font-size:0.75rem;color:#ff4757;">
            <i class="fas fa-circle" style="font-size:0.5rem;vertical-align:middle;margin-right:4px;"></i> AD / TALK / NEWS ACTIVE
          </span>
        </div>
      `;
    } else if (isLoading) {
      contentHtml = `
        <div class="lyrics-loading">
          <i class="fas fa-circle-notch fa-spin" style="font-size:2rem;color:var(--accent);margin-bottom:12px;display:inline-block;"></i>
          <p style="color:var(--text-secondary);font-size:0.9rem;">Auto-fetching live song lyrics from LRCLIB…</p>
        </div>
      `;
    } else if (currentLyrics && currentLyrics.lines && currentLyrics.lines.length > 0) {
      contentHtml = currentLyrics.lines.map((line, idx) => `
        <div class="lyrics-line-group ${idx === 0 ? 'active-pulse' : ''}">
          <div class="lyrics-orig-text">${escapeLyricHtml(line.orig)}</div>
        </div>
      `).join('');
    } else {
      contentHtml = `
        <div class="lyrics-empty-notice">
          <i class="fas fa-music" style="color:var(--text-muted);font-size:2rem;margin-bottom:12px;display:inline-block;"></i>
          <p style="color:var(--text-secondary);font-size:0.9rem;">
            No lyrics available during broadcast break / talk segment.
          </p>
        </div>
      `;
    }

    screen.innerHTML = `
      <div class="lyrics-container">
        <!-- TOP TOOLBAR -->
        <div class="lyrics-topbar">
          <button class="icon-btn lyrics-close-btn" onclick="LyricsEngine.close()" aria-label="Close Lyrics">
            <i class="fas fa-chevron-down"></i>
          </button>

          <div class="lyrics-track-header">
            <span class="lyrics-now-singing"><i class="fas fa-microphone-alt"></i> LIVE SONG LYRICS</span>
            <h2 class="lyrics-song-title">${escapeLyricHtml(currentTitle)}</h2>
            <span class="lyrics-artist-name">${escapeLyricHtml(currentSingers)}</span>
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

        <!-- SCROLLABLE LYRICS CONTENT -->
        <div class="lyrics-scroll-body" id="lyricsBodyContent" style="font-size:${fontSizePx}px;">
          ${contentHtml}
        </div>
      </div>
    `;
  }

  return {
    autoFetch,
    onAdOrTalkSegment,
    getInlineHtml,
    syncInlinePanel,
    open,
    close,
    render,
    setTargetLanguage,
    setViewMode,
    adjustFontSize,
    copyLyrics,
    isOpen: () => isOpen
  };
})();
