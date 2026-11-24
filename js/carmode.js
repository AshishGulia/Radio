// js/carmode.js - CarPlay & Android Auto Driving Interface and Screen Wake Lock

const CarMode = (() => {
  let wakeLock = null;
  let clockInterval = null;
  let isOpen = false;

  async function requestWakeLock() {
    try {
      if ('wakeLock' in navigator) {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => {
          wakeLock = null;
        });
      }
    } catch (err) {
      console.log('WakeLock error/denied:', err);
    }
  }

  function releaseWakeLock() {
    if (wakeLock) {
      wakeLock.release().catch(() => {});
      wakeLock = null;
    }
  }

  function open() {
    const screen = document.getElementById('car-mode-screen');
    if (!screen) return;

    isOpen = true;
    screen.style.display = 'flex';
    requestAnimationFrame(() => {
      screen.classList.add('open');
    });

    render();
    requestWakeLock();
    startClock();

    if (typeof showToast === 'function') {
      showToast('CarPlay & Android Auto Car Mode Active', 'success');
    }
  }

  function close() {
    const screen = document.getElementById('car-mode-screen');
    if (!screen) return;

    isOpen = false;
    screen.classList.remove('open');
    setTimeout(() => {
      screen.style.display = 'none';
    }, 320);

    releaseWakeLock();
    if (clockInterval) {
      clearInterval(clockInterval);
      clockInterval = null;
    }
  }

  function startClock() {
    if (clockInterval) clearInterval(clockInterval);
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
  }

  function updateClock() {
    const el = document.getElementById('carClockDisplay');
    if (!el) return;
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    el.textContent = `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  function render() {
    const screen = document.getElementById('car-mode-screen');
    if (!screen) return;

    const station = (typeof Player !== 'undefined' && Player.getCurrentStation()) || (RadioData.stations && RadioData.stations[0]);
    if (!station) return;

    const isPlaying = (typeof Player !== 'undefined') ? Player.getIsPlaying() : false;
    const isFav = AppState.favourites && AppState.favourites.includes(station.id);
    const songInfo = (typeof NowPlaying !== 'undefined') ? NowPlaying.getSongInfo(station.id) : { song: 'Live Broadcast', artist: station.name };
    const status = (typeof NowPlaying !== 'undefined') ? NowPlaying.getStatus(station.id) : 'music';
    const noteClass = status === 'music' ? 'note-green' : 'note-red';
    const freqClean = (station.freq || 'FM').replace(' FM', '').replace(' AM', '');
    const freqBand = station.freq && station.freq.includes('AM') ? 'AM' : 'FM';

    // 6 Big Presets for Quick Driver Access (user favorites first, then top stations)
    let presetStations = [];
    if (AppState.favourites && AppState.favourites.length) {
      presetStations = AppState.favourites.map(id => RadioData.getById(id)).filter(Boolean);
    }
    if (presetStations.length < 6) {
      const remaining = (RadioData.stations || []).filter(s => !presetStations.some(p => p.id === s.id));
      presetStations = presetStations.concat(remaining.slice(0, 6 - presetStations.length));
    }
    presetStations = presetStations.slice(0, 6);

    screen.innerHTML = `
      <div class="car-mode-container">
        <!-- TOP DRIVER BAR -->
        <div class="car-topbar">
          <button class="car-exit-btn" onclick="CarMode.close()" aria-label="Exit Car Mode">
            <i class="fas fa-chevron-left"></i> Exit Car
          </button>
          <div class="car-badge-pill">
            <i class="fas fa-car-side"></i> CARPLAY / ANDROID AUTO
          </div>
          <div class="car-clock" id="carClockDisplay">--:-- --</div>
        </div>

        <!-- MAIN DRIVER DISPLAY (GLANCEABLE FROM 3 FEET) -->
        <div class="car-center-showcase">
          <div class="car-station-hero" style="border-color:${station.color}88; background: linear-gradient(135deg, ${station.color}33, #090912);">
            <div class="car-freq-circle" style="background:${station.color}">
              <span class="car-freq-num">${freqClean}</span>
              <span class="car-freq-band">${freqBand}</span>
            </div>
            <div class="car-station-details">
              <span class="car-station-tag"><i class="fas fa-satellite-dish"></i> ${station.flag || '📻'} ${station.city || 'World'}, ${station.country || ''}</span>
              <h1 class="car-station-name">${station.name}</h1>
            </div>
          </div>

          <!-- NOW PLAYING TRACK DISPLAY -->
          <div class="car-nowplaying-card">
            <div class="car-np-status">
              <i class="fas fa-music ${noteClass} car-music-pulse"></i>
              <span>NOW STREAMING LIVE</span>
            </div>
            <div class="car-np-song" id="carSongTitle">${songInfo.song}</div>
            <div class="car-np-artist" id="carArtistTitle"><i class="fas fa-microphone-alt"></i> ${songInfo.artist}</div>
          </div>
        </div>

        <!-- MASSIVE DRIVER TOUCH CONTROLS -->
        <div class="car-controls-row">
          <button class="car-ctrl-btn car-fav-btn ${isFav ? 'active' : ''}" id="carFavBtn"
                  onclick="CarMode.toggleFav(${station.id})" aria-label="Save Favorite">
            <i class="fa${isFav ? 's' : 'r'} fa-heart"></i>
          </button>
          <button class="car-ctrl-btn car-prev-btn" onclick="Player.prev(); CarMode.render();" aria-label="Previous Station">
            <i class="fas fa-step-backward"></i>
          </button>
          <button class="car-ctrl-btn car-main-play" onclick="Player.togglePlay(); CarMode.updatePlayState();" id="carPlayBtn" aria-label="Play/Pause">
            <i class="fas ${isPlaying ? 'fa-pause' : 'fa-play'}" id="carPlayIcon"></i>
          </button>
          <button class="car-ctrl-btn car-next-btn" onclick="Player.next(); CarMode.render();" aria-label="Next Station">
            <i class="fas fa-step-forward"></i>
          </button>
        </div>

        <!-- PRESET CHANNELS FOR QUICK DRIVING SWITCH (1-TAP STATION BUTTONS) -->
        <div class="car-presets-section">
          <div class="car-presets-label"><i class="fas fa-sliders-h"></i> DRIVER PRESET CHANNELS</div>
          <div class="car-presets-scroll">
            ${presetStations.map((p, idx) => {
              const isCurr = p.id === station.id;
              return `
                <button class="car-preset-card ${isCurr ? 'active' : ''}" onclick="Player.play(RadioData.getById(${p.id})); CarMode.render();">
                  <span class="car-preset-num">P${idx + 1}</span>
                  <div class="car-preset-freq" style="color:${p.color}">${(p.freq || 'FM').replace(' FM','')}</div>
                  <div class="car-preset-name">${p.name}</div>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    updateClock();
  }

  function updatePlayState() {
    const isPlaying = (typeof Player !== 'undefined') ? Player.getIsPlaying() : false;
    const icon = document.getElementById('carPlayIcon');
    if (icon) {
      icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
  }

  function toggleFav(stationId) {
    if (typeof openCollectionModal === 'function') {
      openCollectionModal(stationId);
    }
  }

  return {
    open,
    close,
    render,
    updatePlayState,
    toggleFav,
    isOpen: () => isOpen
  };
})();
