// js/player.js - Audio Player & YouTube Music Interface

const Player = (() => {
  let audio = null;
  let currentStation = null;
  let isPlaying = false;
  let volume = 0.8;
  let swipeStartX = 0;
  let swipeStartY = 0;

  function init() {
    audio = new Audio();
    audio.volume = volume;

    audio.addEventListener('playing', () => {
      isPlaying = true;
      AppState.isPlaying = true;
      updatePlayButton();
      updateMiniPlayer();
      startWaveAnimation();
      updateMediaSession();
      if (typeof CarMode !== 'undefined' && CarMode.isOpen()) CarMode.updatePlayState();
    });

    audio.addEventListener('pause', () => {
      isPlaying = false;
      AppState.isPlaying = false;
      updatePlayButton();
      stopWaveAnimation();
      updateMediaSession();
      if (typeof CarMode !== 'undefined' && CarMode.isOpen()) CarMode.updatePlayState();
    });

    audio.addEventListener('error', () => {
      showBuffering(false);
      isPlaying = false;
      AppState.isPlaying = false;
      updatePlayButton();
      stopWaveAnimation();
      if (currentStation) currentStation.isOffline = true;
      // REQUIREMENT 2: Stop loading and show clean status message
      showToast('Station currently offline, try another.', 'error');
      showOfflineStatusBanner();
      updateMiniPlayer();
      updateMediaSession();
    });

    audio.addEventListener('waiting', () => {
      showBuffering(true);
    });

    audio.addEventListener('canplay', () => {
      showBuffering(false);
      if (currentStation) currentStation.isOffline = false;
      hideOfflineStatusBanner();
    });

    setupSwipeGestures();
    setupMediaSessionHandlers();
  }

  function showOfflineStatusBanner() {
    const banner = document.getElementById('playerOfflineBanner');
    if (banner) banner.style.display = 'flex';
  }

  function hideOfflineStatusBanner() {
    const banner = document.getElementById('playerOfflineBanner');
    if (banner) banner.style.display = 'none';
  }

  function play(station, forceOpen = false) {
    if (!station) return;
    const isSameStation = currentStation && (currentStation.id === station.id || (station.stationuuid && currentStation.stationuuid === station.stationuuid));

    if (isSameStation && isPlaying) {
      pause();
      return;
    }

    currentStation = station;
    AppState.currentStation = station;

    // Update station index in current browsing list or fallback to all stations
    if (!AppState.stationList || !AppState.stationList.length) {
      AppState.stationList = (typeof RadioData !== 'undefined' && RadioData.stations) ? RadioData.stations : [station];
    }
    const idx = AppState.stationList.findIndex(s => s.id === station.id || (station.stationuuid && s.stationuuid === station.stationuuid));
    if (idx !== -1) {
      AppState.stationIndex = idx;
    } else {
      AppState.stationList.push(station);
      AppState.stationIndex = AppState.stationList.length - 1;
    }

    // REQUIREMENT 2: Play selected station in HTML5 <audio> using station.url_resolved
    const streamUrl = station.url_resolved || station.stream || station.url;

    if (!streamUrl || !streamUrl.startsWith('https://')) {
      station.isOffline = true;
      isPlaying = false;
      AppState.isPlaying = false;
      showBuffering(false);
      updatePlayButton();
      showToast('Station currently offline, try another.', 'error');
      renderPlayerScreen(station);
      showOfflineStatusBanner();
      updateMiniPlayer();
      return;
    }

    if (audio) {
      showBuffering(true);
      audio.pause();
      audio.src = streamUrl;
      audio.load();
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          showBuffering(false);
          // Handled gracefully if browser autoplay policy or stream offline
        });
      }
    }

    // REQUIREMENT 4: Poll stream metadata every 12 seconds for the active station
    if (typeof NowPlaying !== 'undefined' && NowPlaying.setActiveStation) {
      NowPlaying.setActiveStation(station);
    }

    renderPlayerScreen(station);

    // Keep minimized by default: only open full player if it was ALREADY open or explicitly requested
    const playerScreenEl = document.getElementById('player-screen');
    const isAlreadyOpen = playerScreenEl && playerScreenEl.classList.contains('open');
    if (forceOpen || isAlreadyOpen) {
      openPlayerScreen();
    }

    updateMiniPlayer();

    updateMediaSession(station);
    if (typeof CarMode !== 'undefined' && CarMode.isOpen()) CarMode.render();
    if (typeof LyricsEngine !== 'undefined' && LyricsEngine.isOpen()) LyricsEngine.render();
  }

  function pause() {
    if (audio) audio.pause();
    isPlaying = false;
    AppState.isPlaying = false;
    updatePlayButton();
    updateMiniPlayer();
    stopWaveAnimation();
    updateMediaSession();
    if (typeof CarMode !== 'undefined' && CarMode.isOpen()) CarMode.updatePlayState();
  }

  function resume() {
    if (!audio || !currentStation) return;
    const streamUrl = currentStation.url_resolved || currentStation.stream || currentStation.url;
    if (!audio.src && streamUrl) audio.src = streamUrl;
    audio.play().catch(() => {});
    isPlaying = true;
    AppState.isPlaying = true;
    updatePlayButton();
    updateMiniPlayer();
    startWaveAnimation();
    updateMediaSession();
    if (typeof CarMode !== 'undefined' && CarMode.isOpen()) CarMode.updatePlayState();
  }

  function togglePlay() {
    if (isPlaying) pause();
    else resume();
    if (typeof CarMode !== 'undefined' && CarMode.isOpen()) CarMode.updatePlayState();
  }

  function next() {
    let list = AppState.stationList;
    if (!list || !list.length) {
      list = (typeof RadioData !== 'undefined' && RadioData.stations) ? RadioData.stations : [];
    }
    if (!list.length) return;
    AppState.stationIndex = (AppState.stationIndex + 1) % list.length;
    play(list[AppState.stationIndex]);
  }

  function prev() {
    let list = AppState.stationList;
    if (!list || !list.length) {
      list = (typeof RadioData !== 'undefined' && RadioData.stations) ? RadioData.stations : [];
    }
    if (!list.length) return;
    AppState.stationIndex = (AppState.stationIndex - 1 + list.length) % list.length;
    play(list[AppState.stationIndex]);
  }

  function setVolume(val) {
    volume = Math.max(0, Math.min(1, val));
    if (audio) audio.volume = volume;
    const slider = document.getElementById('volumeSlider');
    if (slider) slider.value = volume;
    const icon = document.getElementById('volumeIcon');
    if (icon) {
      if (volume === 0) icon.className = 'fas fa-volume-mute';
      else if (volume < 0.5) icon.className = 'fas fa-volume-down';
      else icon.className = 'fas fa-volume-up';
    }
    const pct = document.getElementById('volumePct');
    if (pct) pct.textContent = Math.round(volume * 100) + '%';
  }

  function renderPlayerScreen(station) {
    const screen = document.getElementById('player-screen');
    if (!screen) return;

    const isFav = AppState.favourites && AppState.favourites.includes(station.id);
    const songInfo = NowPlaying.getSongInfo(station.id);
    const volume = audio.volume;
    const isPlaying = !audio.paused;

    const wpUrl = (typeof AppState !== 'undefined' && AppState.settings && AppState.settings.wallpaper) || null;

    screen.innerHTML = `
      <!-- OPAQUE FROSTED BLURRED BACKGROUND (THEME + WALLPAPER + SOFT STATION GLOW) -->
      <div class="player-backdrop-wrap">
        ${wpUrl ? `<div class="player-wallpaper-layer" style="background-image: url('${wpUrl}');"></div>` : ''}
        <div class="player-ambient-glow" style="background: radial-gradient(circle at 50% 22%, ${station.color}30 0%, transparent 68%);"></div>
        <div class="player-frosted-overlay"></div>
      </div>
      <div class="player-content">
        <div class="player-header">
          <button class="icon-btn" onclick="Player.closePlayerScreen()" aria-label="Minimize Player">
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="player-header-title-box">
            <span class="player-header-title">${station.freq || 'LIVE FM'} • ON AIR</span>
            <span class="player-header-sub">${station.flag || '🌍'} ${station.city}, ${station.country}</span>
          </div>
          <div class="player-header-right-btns">
            <button class="icon-btn lyrics-btn" onclick="LyricsEngine.open()" aria-label="Live Song Lyrics" title="Live Song Lyrics & Translations">
              <i class="fas fa-quote-left"></i>
            </button>
            <button class="icon-btn car-mode-btn" onclick="CarMode.open()" aria-label="CarPlay & Android Auto Car Mode" title="Car Mode (CarPlay / Android Auto)">
              <i class="fas fa-car"></i>
            </button>
            <button class="icon-btn" onclick="shareStation('${station.id}')" aria-label="Share">
              <i class="fas fa-share-alt"></i>
            </button>
          </div>
        </div>

        <!-- OFFLINE STATUS BANNER (REQUIREMENT 2) -->
        <div id="playerOfflineBanner" class="player-offline-notice" style="display:${station.isOffline ? 'flex' : 'none'};">
          <i class="fas fa-exclamation-triangle"></i>
          <span>Station currently offline, try another.</span>
        </div>

        <!-- 50% TOP PART: CHANNEL LOGO + JUST NICHE SAME SIZE SONG THUMBNAIL -->
        <div class="player-dual-showcase">
          <!-- TOP 50% PART: PURE FM CHANNEL LOGO WITH FALLBACK (REQUIREMENT 3) -->
          <div class="player-channel-logo-card" style="background: linear-gradient(135deg, ${station.color}33, #10101c); border-color: ${station.color}77;">
            <div class="player-tuner-ring"></div>
            <div class="player-emblem-badge"><i class="fas fa-broadcast-tower"></i> ${station.freq || 'LIVE FM'}</div>
            <div class="player-logo-img-wrapper">
              <img class="player-channel-logo-img"
                   src="${getStationFavicon(station)}"
                   alt="${station.name}"
                   onerror="this.onerror=null;this.src='${RADIO_SVG_FALLBACK}';" />
            </div>
            <span class="player-logo-station-name">${station.name}</span>
            <div class="wave-container ${isPlaying ? 'playing' : ''}" id="waveContainer">
              <div class="wave-bar"></div><div class="wave-bar"></div>
              <div class="wave-bar"></div><div class="wave-bar"></div>
              <div class="wave-bar"></div><div class="wave-bar"></div>
              <div class="wave-bar"></div><div class="wave-bar"></div>
            </div>
          </div>

          <!-- JUST NICHE: SAME SIZE SONG THUMBNAIL WITH REAL ARTWORK -->
          <div class="player-song-thumb-card" onclick="Player.connectApp('spotify','${escapeQuotes(station.name)}','${escapeQuotes(songInfo.song)}','${escapeQuotes(songInfo.artist)}')" title="Click to open song in Spotify / YouTube Music">
            <img class="player-song-album-img"
                 id="playerMainSongThumb"
                 src="${songInfo.thumb}"
                 alt="${songInfo.song}"
                 loading="lazy"
                 onerror="this.onerror=null;this.src='${RADIO_SVG_FALLBACK}';" />
            <div class="player-song-sync-pill">
              <i class="fab fa-spotify"></i>
              <i class="fab fa-youtube"></i>
            </div>
          </div>
        </div>

        <!-- JUST NICHE: SONG NAME AND SINGER -->
        <div class="player-song-meta-box">
          <div class="player-song-meta-left">
            <h2 class="player-main-song-title" id="playerSongName">${songInfo.song}</h2>
            <p class="player-main-artist-name" id="playerArtistName"><i class="fas fa-microphone-alt"></i> ${songInfo.artist}</p>
            <span class="player-station-tagline">${station.flag || '🌍'} ${station.name} • ${station.city}</span>
          </div>
          <button class="fav-btn ${isFav ? 'active' : ''}" onclick="openCollectionModal('${station.id}')" id="playerFavBtn" aria-label="Save to Collection">
            <i class="fa${isFav ? 's' : 'r'} fa-heart"></i>
          </button>
        </div>

        <!-- STATUS ROW: GREEN BLINKING LIVE MUSIC OR SOLID RED AD / TALK / NEWS (REQUIREMENT 4) -->
        <div class="player-status-row" id="playerStatusRow">
          <span class="status-indicator-badge ${songInfo.badgeClass}">
            <span class="indicator-dot"></span>
            <span>${songInfo.badgeText}</span>
          </span>
          <span class="live-label"><i class="fas fa-broadcast-tower"></i> ON AIR</span>
        </div>

        <!-- PLAYBACK CONTROLS -->
        <div class="player-controls">
          <button class="ctrl-btn secondary" onclick="Player.prev()" aria-label="Previous Station">
            <i class="fas fa-step-backward"></i>
          </button>
          <button class="ctrl-btn play-pause" onclick="Player.togglePlay()" id="mainPlayBtn" aria-label="Play/Pause">
            <i class="fas ${isPlaying ? 'fa-pause' : 'fa-play'}" id="mainPlayIcon"></i>
          </button>
          <button class="ctrl-btn secondary" onclick="Player.next()" aria-label="Next Station">
            <i class="fas fa-step-forward"></i>
          </button>
        </div>

        <!-- VOLUME SLIDER -->
        <div class="player-volume">
          <button class="icon-btn" onclick="Player.setVolume(Player.getVolume() === 0 ? 0.8 : 0)" id="volumeIcon">
            <i class="fas fa-volume-up"></i>
          </button>
          <input type="range" id="volumeSlider" class="volume-slider"
                 min="0" max="1" step="0.01" value="${volume}"
                 oninput="Player.setVolume(parseFloat(this.value))" />
          <span class="volume-pct" id="volumePct">${Math.round(volume*100)}%</span>
        </div>

        <!-- DEDICATED INLINE SCROLLABLE LYRICS PANEL/DRAWER IN PLAYER UI (REQUIREMENT 5) -->
        <div class="player-lyrics-drawer" id="playerLyricsDrawer">
          <div class="player-lyrics-drawer-header" onclick="LyricsEngine.open()">
            <div class="lyrics-shortcut-left">
              <i class="fas fa-quote-left lyrics-shortcut-icon"></i>
              <div class="lyrics-shortcut-meta">
                <strong>Live Lyrics</strong>
                <small id="playerInlineLyricsSubtitle">Auto-synced via LRCLIB</small>
              </div>
            </div>
            <span class="lyrics-shortcut-pill"><i class="fas fa-expand-alt"></i> Full View</span>
          </div>
          <div class="player-inline-lyrics-body" id="playerInlineLyricsContent">
            ${(typeof LyricsEngine !== 'undefined' && LyricsEngine.getInlineHtml) ? LyricsEngine.getInlineHtml(station) : '<p class="inline-lyrics-hint">Waiting for live song metadata…</p>'}
          </div>
        </div>


        <!-- CONNECT TO SPOTIFY / YT MUSIC / SOUNDCLOUD / OTHERS SECTION -->
        <div class="player-connect-section">
          <div class="connect-header">
            <div class="connect-header-left">
              <i class="fas fa-link"></i>
              <span>CONNECT & ADD TO PLAYLIST</span>
            </div>
            <span class="connect-sub">Instant Song Sync</span>
          </div>

          <div class="connect-apps-row">
            <button class="connect-app-btn spotify" onclick="Player.connectApp('spotify','${escapeQuotes(station.name)}','${escapeQuotes(songInfo.song)}','${escapeQuotes(songInfo.artist)}')">
              <i class="fab fa-spotify"></i>
              <span>Spotify</span>
            </button>
            <button class="connect-app-btn youtube" onclick="Player.connectApp('youtube','${escapeQuotes(station.name)}','${escapeQuotes(songInfo.song)}','${escapeQuotes(songInfo.artist)}')">
              <i class="fab fa-youtube"></i>
              <span>YT Music</span>
            </button>
            <button class="connect-app-btn soundcloud" onclick="Player.connectApp('soundcloud','${escapeQuotes(station.name)}','${escapeQuotes(songInfo.song)}','${escapeQuotes(songInfo.artist)}')">
              <i class="fab fa-soundcloud"></i>
              <span>SoundCloud</span>
            </button>
            <button class="connect-app-btn others" onclick="Player.showMoreApps()">
              <i class="fas fa-ellipsis-h"></i>
              <span>Others ▾</span>
            </button>
          </div>

          <!-- EXPANDABLE OTHERS APPS (JioSaavn, Gaana, Wynk, Apple Music, Amazon, Deezer, Tidal) -->
          <div class="more-apps-panel" id="moreAppsPanel" style="display:none">
            <div class="more-apps-title"><i class="fas fa-globe"></i> Popular Worldwide & Indian Music Apps:</div>
            <div class="more-apps-grid">
              ${(RadioData.streamingApps || []).slice(3).map(app => `
                <button class="more-app-btn" style="--app-brand:${app.brand}"
                        onclick="Player.connectApp('${app.id}','${escapeQuotes(station.name)}','${escapeQuotes(songInfo.song)}','${escapeQuotes(songInfo.artist)}')">
                  <i class="${app.isBrandFa ? 'fab' : 'fas'} ${app.icon}" style="color:${app.brand}"></i>
                  <span>${app.name}</span>
                </button>`).join('')}
            </div>
          </div>
        </div>

        <!-- VINTAGE ROTATING CD PLAYER LOADING OVERLAY -->
        <div class="player-buffering" id="playerBuffering" style="display:none">
          <div class="connecting-overlay">
            <div class="vintage-cd-wrap">
              <div class="vintage-cd-disc">
                <div class="cd-groove-rings"></div>
                <div class="cd-center-label">
                  <div class="cd-spindle-hole"></div>
                  <span class="cd-label-brand">LIVE FM</span>
                </div>
              </div>
              <div class="cd-turntable-arm">
                <div class="turntable-pivot"></div>
                <div class="turntable-needle"></div>
              </div>
            </div>
            <span class="connecting-text"><i class="fas fa-satellite-dish"></i> Connecting live FM stream…</span>
          </div>
        </div>
      </div>`;

    if (isPlaying) startWaveAnimation();
  }

  function escapeQuotes(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  function connectApp(appId, stationName, songName, artist) {
    const app = RadioData.streamingApps.find(a => a.id === appId);
    if (!app) return;

    // Search query with song + singer/artist
    const queryTerm = `${songName} ${artist}`.trim();
    const encoded = encodeURIComponent(queryTerm);

    let targetUrl = '';
    switch(appId) {
      case 'spotify':    targetUrl = `https://open.spotify.com/search/${encoded}`; break;
      case 'youtube':    targetUrl = `https://music.youtube.com/search?q=${encoded}`; break;
      case 'soundcloud': targetUrl = `https://soundcloud.com/search?q=${encoded}`; break;
      case 'jiosaavn':   targetUrl = `https://www.jiosaavn.com/search/${encoded}`; break;
      case 'gaana':      targetUrl = `https://gaana.com/search/${encoded}`; break;
      case 'wynk':       targetUrl = `https://wynk.in/music/search/${encoded}`; break;
      case 'apple':      targetUrl = `https://music.apple.com/search?term=${encoded}`; break;
      case 'amazon':     targetUrl = `https://music.amazon.com/search/${encoded}`; break;
      case 'deezer':     targetUrl = `https://www.deezer.com/search/${encoded}`; break;
      case 'tidal':      targetUrl = `https://tidal.com/browse/search?q=${encoded}`; break;
      default:           targetUrl = app.url;
    }

    showToast(`Connecting to ${app.name}: "${songName}" by ${artist}`, 'success');
    setTimeout(() => {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  }

  function showMoreApps() {
    const panel = document.getElementById('moreAppsPanel');
    if (!panel) return;
    const isHidden = panel.style.display === 'none';
    panel.style.display = isHidden ? 'block' : 'none';
  }

  function openPlayerScreen() {
    const screen = document.getElementById('player-screen');
    if (screen) {
      if (currentStation) {
        renderPlayerScreen(currentStation);
      }
      screen.classList.add('open');
      document.body.classList.add('player-open');
    }
    const adBanner = document.getElementById('ad-banner');
    if (adBanner) adBanner.classList.remove('above-mini');
  }

  function closePlayerScreen() {
    const screen = document.getElementById('player-screen');
    if (screen) {
      screen.classList.remove('open');
      document.body.classList.remove('player-open');
    }
    updateMiniPlayer();
    const adBanner = document.getElementById('ad-banner');
    if (adBanner && currentStation) adBanner.classList.add('above-mini');
  }

  function updateMiniPlayer() {
    const mini = document.getElementById('mini-player');
    const adBanner = document.getElementById('ad-banner');
    if (!mini) return;

    if (!currentStation) {
      mini.classList.remove('visible');
      if (adBanner) adBanner.classList.remove('above-mini');
      return;
    }

    const songInfo = NowPlaying.getSongInfo(currentStation.id);
    const isFav = AppState.favourites && AppState.favourites.includes(currentStation.id);
    const freqClean = (currentStation.freq || 'FM').replace(' FM','').replace(' AM','');
    const freqBand = currentStation.freq && currentStation.freq.includes('AM') ? 'AM' : 'FM';

    mini.innerHTML = `
      <!-- CHANNEL LOGO WITH FALLBACK (TAP TO OPEN MAIN PLAYER) -->
      <div class="mini-art mini-logo-btn" onclick="event.stopPropagation(); Player.openPlayerScreen();"
           title="Tap Channel Logo to Open Main Player"
           style="background: linear-gradient(135deg, ${currentStation.color}44, #111122); border: 1.5px solid ${currentStation.color}66;">
        <img class="mini-station-logo-img"
             src="${getStationFavicon(currentStation)}"
             alt="${currentStation.name}"
             onerror="this.onerror=null;this.src='${RADIO_SVG_FALLBACK}';" />
        <span class="mini-expand-badge"><i class="fas fa-chevron-up"></i></span>
      </div>

      <!-- STATION INFO -->
      <div class="mini-info" onclick="Player.openPlayerScreen();">
        <span class="mini-name">${currentStation.name}</span>
        ${currentStation.isOffline ? `
          <span class="mini-offline-text"><i class="fas fa-exclamation-circle"></i> Station currently offline, try another.</span>
        ` : `
          <span class="mini-song">
            <span class="status-indicator-badge-mini ${songInfo.badgeClass}"><span class="indicator-dot"></span></span>
            ${songInfo.song} • <em>${songInfo.artist}</em>
          </span>
        `}
      </div>

      <!-- PLAYBACK CONTROLS (WORK DIRECTLY ON MINIMIZED BAR) -->
      <div class="mini-controls">
        <button class="icon-btn mini-ctrl-btn mini-fav-btn ${isFav ? 'active' : ''}" id="miniFavBtn"
                onclick="event.stopPropagation(); openCollectionModal('${currentStation.id}');"
                aria-label="Save to Favourites" title="${isFav ? 'Saved in Favourites' : 'Add to Favourites'}">
          <i class="fa${isFav ? 's' : 'r'} fa-heart"></i>
        </button>
        <button class="icon-btn mini-ctrl-btn" onclick="event.stopPropagation(); Player.prev();" aria-label="Previous Station" title="Previous Station">
          <i class="fas fa-step-backward"></i>
        </button>
        <button class="icon-btn mini-ctrl-btn mini-play" onclick="event.stopPropagation(); Player.togglePlay();" aria-label="Play/Pause" title="${isPlaying ? 'Pause' : 'Play'}">
          <i class="fas ${isPlaying ? 'fa-pause' : 'fa-play'}" id="miniPlayIcon"></i>
        </button>
        <button class="icon-btn mini-ctrl-btn" onclick="event.stopPropagation(); Player.next();" aria-label="Next Station" title="Next Station">
          <i class="fas fa-step-forward"></i>
        </button>
      </div>`;

    mini.classList.add('visible');
    if (adBanner) adBanner.classList.add('above-mini');
  }

  function updatePlayButton() {
    const icon = document.getElementById('mainPlayIcon');
    if (icon) {
      icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
    const miniIcon = document.getElementById('miniPlayIcon');
    if (miniIcon) {
      miniIcon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
  }

  function startWaveAnimation() {
    const wc = document.getElementById('waveContainer');
    if (wc) wc.classList.add('playing');
  }

  function stopWaveAnimation() {
    const wc = document.getElementById('waveContainer');
    if (wc) wc.classList.remove('playing');
  }

  function showBuffering(show) {
    const el = document.getElementById('playerBuffering');
    if (el) el.style.display = show ? 'flex' : 'none';
  }

  function setupSwipeGestures() {
    const screen = document.getElementById('player-screen');
    if (!screen) return;

    screen.addEventListener('touchstart', e => {
      swipeStartX = e.touches[0].clientX;
      swipeStartY = e.touches[0].clientY;
    }, { passive: true });

    screen.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - swipeStartX;
      const dy = e.changedTouches[0].clientY - swipeStartY;
      if (Math.abs(dy) > Math.abs(dx) && dy > 80) {
        closePlayerScreen();
        return;
      }
      if (Math.abs(dx) > 60 && Math.abs(dy) < 60) {
        if (dx < 0) next();
        else prev();
      }
    }, { passive: true });
  }

  function updateMediaSession(station, songInfo) {
    if (!('mediaSession' in navigator)) return;
    const st = station || currentStation;
    if (!st) return;
    const si = songInfo || (typeof NowPlaying !== 'undefined' ? NowPlaying.getSongInfo(st.id) : null);
    try {
      const art = (si && si.thumb) || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=512&auto=format&fit=crop&q=80';
      navigator.mediaSession.metadata = new MediaMetadata({
        title: (si && si.song) || st.name,
        artist: (si && si.artist) || `${st.city}, ${st.country}`,
        album: `${st.name} (${st.freq || 'Live FM'}) • RadioTym Car Mode`,
        artwork: [
          { src: art, sizes: '96x96', type: 'image/jpeg' },
          { src: art, sizes: '128x128', type: 'image/jpeg' },
          { src: art, sizes: '192x192', type: 'image/jpeg' },
          { src: art, sizes: '256x256', type: 'image/jpeg' },
          { src: art, sizes: '384x384', type: 'image/jpeg' },
          { src: art, sizes: '512x512', type: 'image/jpeg' }
        ]
      });
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    } catch(e) {}
  }

  function setupMediaSessionHandlers() {
    if (!('mediaSession' in navigator)) return;
    try {
      navigator.mediaSession.setActionHandler('play', () => resume());
      navigator.mediaSession.setActionHandler('pause', () => pause());
      navigator.mediaSession.setActionHandler('previoustrack', () => prev());
      navigator.mediaSession.setActionHandler('nexttrack', () => next());
      navigator.mediaSession.setActionHandler('stop', () => pause());
    } catch(e) {}
  }

  function getVolume() { return volume; }
  function getCurrentStation() { return currentStation; }
  function getIsPlaying() { return isPlaying; }

  return {
    init,
    play,
    pause,
    resume,
    togglePlay,
    next,
    prev,
    setVolume,
    getVolume,
    openPlayerScreen,
    closePlayerScreen,
    updateMiniPlayer,
    getCurrentStation,
    getIsPlaying,
    renderPlayerScreen,
    connectApp,
    showMoreApps,
    updateMediaSession,
  };
})();
