// js/app.js - Core App Logic, Routing & View Builders

// ─── GLOBAL APPLICATION STATE ────────────────────────────────────────────────
const DEFAULT_COLLECTIONS = [
  { id: 'all', name: 'All Favourites', icon: 'fa-heart', color: '#ff4757', stationIds: [] },
  { id: 'driving', name: 'Driving Beats', icon: 'fa-car', color: '#ffa502', stationIds: [] },
  { id: 'latenight', name: 'Late Night Chill', icon: 'fa-moon', color: '#70a1ff', stationIds: [] },
  { id: 'workout', name: 'Workout Energy', icon: 'fa-bolt', color: '#2ed573', stationIds: [] }
];

const AppState = {
  currentTab: 'home',
  currentStation: null,
  isPlaying: false,
  favourites: [],
  collections: JSON.parse(JSON.stringify(DEFAULT_COLLECTIONS)),
  activeCollectionId: null,
  theme: 'dark',
  settings: {
    country: 'India',
    adPreference: '1-per-hour',
    isPremium: false,
    profile: { name: '', email: '', phone: '', picture: null },
    wallpaper: null
  },
  currentFilter: { type: 'all', sort: 'default' },
  stationList: [],
  stationIndex: 0,
  browseCountry: 'India',
  categoryFilter: null,
};

// ─── PERSISTENCE (localStorage) ──────────────────────────────────────────────
function saveState() {
  try {
    localStorage.setItem('radiowave_state', JSON.stringify({
      favourites: AppState.favourites,
      collections: AppState.collections,
      theme: AppState.theme,
      settings: AppState.settings,
    }));
  } catch(e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem('radiowave_state');
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved.theme)       AppState.theme = saved.theme;
    if (saved.settings)    AppState.settings = { ...AppState.settings, ...saved.settings };
    if (saved.collections && Array.isArray(saved.collections) && saved.collections.length) {
      AppState.collections = saved.collections;
    } else {
      AppState.collections = JSON.parse(JSON.stringify(DEFAULT_COLLECTIONS));
    }
    if (saved.favourites && Array.isArray(saved.favourites)) {
      AppState.favourites = saved.favourites;
      // If 'all' collection is empty, backfill with saved favourites
      if (AppState.collections[0] && (!AppState.collections[0].stationIds || !AppState.collections[0].stationIds.length)) {
        AppState.collections[0].stationIds = [...saved.favourites];
      }
    }
    syncFavouritesFromCollections();
  } catch(e) {}
}

// ─── COLLECTIONS & FAVOURITES SYNC ───────────────────────────────────────────
function syncFavouritesFromCollections() {
  const set = new Set();
  (AppState.collections || []).forEach(col => {
    (col.stationIds || []).forEach(id => set.add(Number(id)));
  });
  AppState.favourites = Array.from(set);
  saveState();
}

function updateFavouriteButtonsUI(stationId) {
  const isFav = AppState.favourites.includes(stationId);

  // Update player fav button if open
  const playerBtn = document.getElementById('playerFavBtn');
  if (playerBtn) {
    playerBtn.className = `fav-btn ${isFav ? 'active' : ''}`;
    playerBtn.innerHTML = `<i class="fa${isFav ? 's' : 'r'} fa-heart"></i>`;
  }

  // Update minimal station row buttons across views
  document.querySelectorAll(`[data-station-id="${stationId}"] .row-fav-btn`).forEach(btn => {
    btn.className = `row-fav-btn ${isFav ? 'active' : ''}`;
    btn.innerHTML = `<i class="fa${isFav ? 's' : 'r'} fa-heart"></i>`;
  });

  // Update mini player fav button if present
  const miniFavBtn = document.getElementById('miniFavBtn');
  if (miniFavBtn && AppState.currentStation && AppState.currentStation.id === stationId) {
    miniFavBtn.className = `icon-btn mini-ctrl-btn mini-fav-btn ${isFav ? 'active' : ''}`;
    miniFavBtn.innerHTML = `<i class="fa${isFav ? 's' : 'r'} fa-heart"></i>`;
    miniFavBtn.title = isFav ? 'Saved in Favourites' : 'Add to Favourites';
  }
}

// ─── UI HELPERS & NOTIFICATIONS ───────────────────────────────────────────────
function showToast(msg, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
  toast.innerHTML = `<i class="fas ${icons[type] || 'fa-info-circle'}"></i> <span>${msg}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

function addRipple(el) {
  el.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = el.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top  = `${e.clientY - rect.top}px`;
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

function toggleFavourite(stationId) {
  openCollectionModal(stationId);
}

// ─── COLLECTION MODAL ACTIONS ────────────────────────────────────────────────
function openCollectionModal(stationId) {
  const station = RadioData.getById(stationId);
  if (!station) return;
  const modal = document.getElementById('collection-modal');
  if (!modal) return;

  const collections = AppState.collections || [];

  modal.innerHTML = `
    <div class="col-modal-backdrop" onclick="closeCollectionModal()"></div>
    <div class="col-modal-content">
      <div class="col-modal-handle"></div>
      
      <div class="col-modal-header">
        <div class="col-modal-station-info">
          <div class="col-modal-freq-logo" style="background:${station.color}">
            <span class="freq-num">${(station.freq || 'FM').replace(' FM','').replace(' AM','')}</span>
            <span class="freq-band">${station.freq && station.freq.includes('AM') ? 'AM' : 'FM'}</span>
          </div>
          <div class="col-modal-text">
            <h3 class="col-modal-title">Save to Collection</h3>
            <p class="col-modal-subtitle">${station.name} • ${station.city}</p>
          </div>
        </div>
        <button class="col-modal-close" onclick="closeCollectionModal()" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="col-modal-section-title">
        <i class="fas fa-layer-group"></i> Choose Collection(s):
      </div>

      <div class="col-list" id="collectionOptionsList">
        ${collections.map(col => {
          const hasStation = (col.stationIds || []).includes(station.id);
          return `
            <div class="col-check-item ${hasStation ? 'selected' : ''}" 
                 onclick="toggleStationInCollection('${col.id}', ${station.id}, this)">
              <div class="col-item-left">
                <span class="col-item-icon" style="background:${col.color}22;color:${col.color}">
                  <i class="fas ${col.icon || 'fa-folder'}"></i>
                </span>
                <div class="col-item-meta">
                  <span class="col-item-name">${col.name}</span>
                  <span class="col-item-count">${(col.stationIds || []).length} stations</span>
                </div>
              </div>
              <div class="col-item-checkbox">
                <i class="fas ${hasStation ? 'fa-check-circle' : 'fa-circle'}"></i>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- CREATE NEW COLLECTION INLINE -->
      <div class="col-create-section">
        <div class="col-create-input-wrap">
          <i class="fas fa-folder-plus"></i>
          <input type="text" id="newCollectionInput" placeholder="New collection name (e.g. Morning Beats)…" 
                 onkeydown="if(event.key==='Enter') createNewCollection(${station.id})" />
          <button class="btn-create-col" onclick="createNewCollection(${station.id})">Create</button>
        </div>
      </div>

      <div class="col-modal-footer">
        <button class="btn-primary col-done-btn" onclick="closeCollectionModal()">
          <i class="fas fa-check"></i> Done
        </button>
      </div>
    </div>
  `;

  modal.style.display = 'block';
  requestAnimationFrame(() => modal.classList.add('show'));
}

function closeCollectionModal() {
  const modal = document.getElementById('collection-modal');
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 250);
}

function toggleStationInCollection(collectionId, stationId, itemEl) {
  const col = AppState.collections.find(c => c.id === collectionId);
  if (!col) return;
  if (!col.stationIds) col.stationIds = [];

  const idx = col.stationIds.indexOf(stationId);
  const checkIcon = itemEl ? itemEl.querySelector('.col-item-checkbox i') : null;
  const countEl = itemEl ? itemEl.querySelector('.col-item-count') : null;

  if (idx === -1) {
    col.stationIds.push(stationId);
    if (itemEl) itemEl.classList.add('selected');
    if (checkIcon) {
      checkIcon.className = 'fas fa-check-circle';
    }
    showToast(`Added to "${col.name}" ❤️`, 'success');
  } else {
    col.stationIds.splice(idx, 1);
    if (itemEl) itemEl.classList.remove('selected');
    if (checkIcon) {
      checkIcon.className = 'fas fa-circle';
    }
    showToast(`Removed from "${col.name}"`, 'info');
  }

  if (countEl) {
    countEl.textContent = `${col.stationIds.length} stations`;
  }

  syncFavouritesFromCollections();
  updateFavouriteButtonsUI(stationId);

  // If favourites tab is active, re-render
  if (AppState.currentTab === 'favourites') {
    App.renderFavourites();
  }
}

function createNewCollection(stationId) {
  const input = document.getElementById('newCollectionInput');
  if (!input) return;
  const name = input.value.trim();
  if (!name) {
    showToast('Please enter a collection name', 'info');
    return;
  }

  const id = 'col_' + Date.now();
  const colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#9b59b6', '#e056fd', '#00d2d3'];
  const icons = ['fa-music', 'fa-headphones', 'fa-compact-disc', 'fa-fire', 'fa-heart', 'fa-star'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  const newCol = {
    id,
    name,
    icon: randomIcon,
    color: randomColor,
    stationIds: stationId ? [stationId] : []
  };

  AppState.collections.push(newCol);
  syncFavouritesFromCollections();
  saveState();
  showToast(`Collection "${name}" created!`, 'success');

  if (stationId) {
    updateFavouriteButtonsUI(stationId);
    openCollectionModal(stationId);
  }

  if (AppState.currentTab === 'favourites') {
    App.renderFavourites();
  }
}

function deleteCollection(collectionId) {
  if (collectionId === 'all') {
    showToast('Cannot delete default collection', 'info');
    return;
  }
  const idx = AppState.collections.findIndex(c => c.id === collectionId);
  if (idx !== -1) {
    const name = AppState.collections[idx].name;
    AppState.collections.splice(idx, 1);
    if (AppState.activeCollectionId === collectionId) {
      AppState.activeCollectionId = null;
    }
    syncFavouritesFromCollections();
    saveState();
    showToast(`Collection "${name}" deleted`, 'info');
    if (AppState.currentTab === 'favourites') {
      App.renderFavourites();
    }
  }
}

function openNewCollectionPrompt() {
  const name = prompt('Enter name for the new collection (e.g. Punjabi Beats, Driving Chill):');
  if (!name || !name.trim()) return;
  
  const id = 'col_' + Date.now();
  const colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#9b59b6', '#e056fd', '#00d2d3'];
  const icons = ['fa-music', 'fa-headphones', 'fa-compact-disc', 'fa-fire', 'fa-heart', 'fa-star'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  AppState.collections.push({
    id,
    name: name.trim(),
    icon: randomIcon,
    color: randomColor,
    stationIds: []
  });
  saveState();
  showToast(`Collection "${name.trim()}" created!`, 'success');
  if (AppState.currentTab === 'favourites') {
    App.renderFavourites();
  }
}

function shareStation(stationId) {
  const station = RadioData.getById(stationId);
  if (!station) return;
  const songInfo = NowPlaying.getSongInfo(stationId);
  const shareText = `Listening to ${station.name} (${station.city}) on RadioTym! Now playing: "${songInfo.song}" by ${songInfo.artist}`;

  if (navigator.share) {
    navigator.share({
      title: station.name,
      text: shareText,
      url: window.location.href,
    }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(shareText)
      .then(() => showToast('Share link copied to clipboard!', 'success'))
      .catch(() => showToast('Share not supported', 'info'));
  }
}

// ─── STATION ROW ITEM (MINIMAL: logo freq + name + breathing note + fav) ──────
// ─── STATION ROW ITEM (MINIMAL: logo favicon + name + green/red status + fav) ──────
function buildStationCard(station, opts = {}) {
  const isFav = AppState.favourites && AppState.favourites.includes(station.id);
  const info = NowPlaying.getSongInfo(station.id);
  const faviconUrl = getStationFavicon(station);
  const statusBorderClass = info.isMusic ? 'live-music-border' : 'live-ad-border';

  return `
    <div class="station-row ${statusBorderClass}" onclick="App.openStation('${station.id}')" data-station-id="${station.id}">
      <!-- STATION LOGO WITH MINIMALIST SVG FALLBACK (REQUIREMENT 3) -->
      <div class="row-station-logo-box" style="background:${station.color}22;border:1px solid ${station.color}44;">
        <img class="row-station-logo-img"
             src="${faviconUrl}"
             alt="${escapeQuotes(station.name)}"
             loading="lazy"
             onerror="this.onerror=null;this.src='${RADIO_SVG_FALLBACK}';" />
        <span class="row-flag-badge">${station.flag || '🌍'}</span>
      </div>

      <!-- STATION NAME + SUBTEXT + LIVE SONG/AD STATUS BADGE (REQUIREMENT 4) -->
      <div class="row-name-wrap">
        <div class="row-name-top">
          <span class="row-station-name">${station.name}</span>
          <!-- LIVE STATUS BADGE: GREEN BLINKING LIVE MUSIC OR RED SOLID AD/TALK -->
          <span class="status-indicator-badge-mini ${info.badgeClass}">
            <span class="indicator-dot"></span>
            <span>${info.badgeText}</span>
          </span>
        </div>
        <div class="row-station-sub-line">
          <span class="row-station-sub">${station.city ? `${station.city}, ` : ''}${station.country || 'Global'}</span>
          ${station.bitrate ? `<span class="row-bitrate-pill">${station.bitrate}k</span>` : ''}
          ${station.codec ? `<span class="row-codec-pill">${station.codec}</span>` : ''}
        </div>
      </div>

      <!-- FAV / COLLECTION SAVE BUTTON -->
      <button class="row-fav-btn ${isFav ? 'active' : ''}"
              onclick="event.stopPropagation();openCollectionModal('${station.id}')"
              aria-label="Save to Collection">
        <i class="fa${isFav ? 's' : 'r'} fa-heart"></i>
      </button>
    </div>`;
}

function buildSkeletonCard() {
  return `
    <div class="station-row skeleton-row">
      <div class="row-station-logo-box skeleton-box"></div>
      <div class="row-name-wrap">
        <div class="skeleton-line sk-title"></div>
        <div class="skeleton-line sk-sub"></div>
      </div>
    </div>`;
}

function buildCategoryCard(cat) {
  const count = RadioData.getByCategory ? RadioData.getByCategory(cat.id).length : 20;
  return `
    <div class="genre-row-chip" onclick="App.selectLiveGenre('${cat.id}')">
      <span class="genre-chip-icon" style="background:${cat.color}22;color:${cat.color}">
        <i class="fas ${cat.icon}"></i>
      </span>
      <span class="genre-chip-name">${cat.name}</span>
      <span class="genre-chip-badge">${count}</span>
    </div>`;
}

// ─── APP CORE CONTROLLER ──────────────────────────────────────────────────────
const App = {
  // REQUIREMENT 1: Radio-Browser API live filter state and pagination
  liveFilter: {
    query: '',
    country: '',
    tag: '',
    offset: 0,
    limit: 50
  },
  liveStations: [],
  isLoadingStations: false,
  hasMoreStations: true,
  searchDebounceTimer: null,

  // Curated country quick filter list
  popularCountries: [
    { name: 'All', label: 'All Countries', flag: '🌍' },
    { name: 'India', label: 'India', flag: '🇮🇳' },
    { name: 'United States', label: 'USA', flag: '🇺🇸' },
    { name: 'United Kingdom', label: 'UK', flag: '🇬🇧' },
    { name: 'Germany', label: 'Germany', flag: '🇩🇪' },
    { name: 'France', label: 'France', flag: '🇫🇷' },
    { name: 'Brazil', label: 'Brazil', flag: '🇧🇷' },
    { name: 'Japan', label: 'Japan', flag: '🇯🇵' },
    { name: 'Canada', label: 'Canada', flag: '🇨🇦' },
    { name: 'Spain', label: 'Spain', flag: '🇪🇸' },
    { name: 'Australia', label: 'Australia', flag: '🇦🇺' },
    { name: 'Italy', label: 'Italy', flag: '🇮🇹' }
  ],

  // Curated music genres quick filter list
  popularGenres: [
    { id: '', name: 'All Genres', icon: 'fa-globe' },
    { id: 'pop', name: 'Pop', icon: 'fa-fire' },
    { id: 'rock', name: 'Rock', icon: 'fa-guitar' },
    { id: 'classical', name: 'Classical', icon: 'fa-feather' },
    { id: 'jazz', name: 'Jazz', icon: 'fa-saxophone' },
    { id: 'bollywood', name: 'Bollywood', icon: 'fa-film' },
    { id: 'dance', name: 'Dance / EDM', icon: 'fa-bolt' },
    { id: 'country', name: 'Country', icon: 'fa-hat-cowboy' },
    { id: 'lofi', name: 'Lo-Fi Chill', icon: 'fa-headphones' },
    { id: 'hiphop', name: 'Hip Hop', icon: 'fa-microphone' },
    { id: 'reggae', name: 'Reggae', icon: 'fa-compact-disc' },
    { id: 'ambient', name: 'Ambient', icon: 'fa-cloud' }
  ],

  init() {
    loadState();
    document.documentElement.setAttribute('data-theme', AppState.theme);
    if (typeof Settings !== 'undefined' && Settings.applyWallpaper && AppState.settings.wallpaper) {
      Settings.applyWallpaper(AppState.settings.wallpaper);
    }
    Player.init();
    this.bindNav();
    this.renderTab('home');
    if (typeof AdSystem !== 'undefined') AdSystem.init();
    this.bindSearch();

    // REQUIREMENT 4: Real-time Live ICY status update listener
    NowPlaying.onStatusChange((stationId, info) => {
      // Update badge on station card
      document.querySelectorAll(`[data-station-id="${stationId}"] .status-indicator-badge-mini`).forEach(el => {
        el.className = `status-indicator-badge-mini ${info.badgeClass}`;
        el.innerHTML = `<span class="indicator-dot"></span><span>${info.badgeText}</span>`;
      });
      // Update border on station card
      document.querySelectorAll(`[data-station-id="${stationId}"]`).forEach(card => {
        card.classList.toggle('live-music-border', info.isMusic);
        card.classList.toggle('live-ad-border', !info.isMusic);
      });
      // Update mini player if current station
      if (AppState.currentStation && (AppState.currentStation.id === stationId || AppState.currentStation.stationuuid === stationId)) {
        Player.updateMiniPlayer();
      }
    });
  },

  bindNav() {
    document.querySelectorAll('.nav-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        this.renderTab(tab);
      });
      addRipple(btn);
    });
  },

  renderTab(tab) {
    AppState.currentTab = tab;
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    switch (tab) {
      case 'home':       this.renderHome();       break;
      case 'favourites': this.renderFavourites(); break;
      case 'browse':     this.renderBrowse();     break;
    }
  },

  // ─── TAB 1: HOME (DYNAMIC LIVE RADIO-BROWSER FEED + PAGINATION) ──────────────
  renderHome() {
    const content = document.getElementById('content');
    if (!content) return;

    content.innerHTML = `
      <div class="tab-content home-tab">
        <!-- SEARCH BAR (SEARCHES NAME, SINGER, KEYWORDS ON RADIO-BROWSER) -->
        <div class="search-bar-wrap">
          <div class="search-bar">
            <i class="fas fa-search"></i>
            <input type="text" id="searchInput"
                   placeholder="Search worldwide live radio, song, artist…"
                   value="${this.liveFilter.query}"
                   oninput="App.handleLiveSearch(this.value)" />
            <button class="search-clear" id="searchClear" onclick="App.clearLiveSearch()"
                    style="${this.liveFilter.query ? 'display:block' : 'display:none'}">✕</button>
          </div>
        </div>

        <!-- POPULAR COUNTRIES FILTER RIBBON -->
        <div class="filter-chips-section">
          <div class="filter-section-title"><i class="fas fa-globe-americas"></i> Filter by Country:</div>
          <div class="chips-scroll-row" id="countryFilterChips">
            ${this.popularCountries.map(c => `
              <button class="filter-chip ${(c.name === 'All' && !this.liveFilter.country) || this.liveFilter.country === c.name ? 'active' : ''}"
                      onclick="App.selectLiveCountry('${c.name}')">
                <span class="chip-flag">${c.flag}</span>
                <span class="chip-name">${c.label}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- GENRE / TAG FILTER RIBBON -->
        <div class="filter-chips-section" style="margin-top:8px;">
          <div class="filter-section-title"><i class="fas fa-music"></i> Filter by Genre:</div>
          <div class="chips-scroll-row" id="genreFilterChips">
            ${this.popularGenres.map(g => `
              <button class="filter-chip ${(g.id === '' && !this.liveFilter.tag) || this.liveFilter.tag === g.id ? 'active' : ''}"
                      onclick="App.selectLiveGenre('${g.id}')">
                <i class="fas ${g.icon} chip-icon"></i>
                <span class="chip-name">${g.name}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- LIVE STREAM FEED STATUS BAR -->
        <div class="live-feed-header">
          <div class="feed-header-left">
            <span class="feed-pulse-dot"></span>
            <h3 class="feed-title">Live Global Stations</h3>
          </div>
          <span class="feed-count-pill" id="feedCountPill">
            ${this.liveStations.length ? `${this.liveStations.length} channels` : 'Fetching…'}
          </span>
        </div>

        <!-- STATIONS LIST VIEW (HTTPS ONLY) -->
        <div class="stations-list-view" id="liveStationsContainer">
          ${this.liveStations.length ? this.liveStations.map(s => buildStationCard(s)).join('') : this.renderSkeletons()}
        </div>

        <!-- REQUIREMENT 1: LOAD MORE BUTTON (INCREMENTS OFFSET BY 50) -->
        <div class="load-more-container" id="loadMoreContainer" style="display:${this.hasMoreStations ? 'flex' : 'none'};">
          <button class="load-more-btn" id="loadMoreBtn" onclick="App.loadMoreStations()">
            <i class="fas fa-plus-circle"></i>
            <span>Load More Stations (+50)</span>
          </button>
        </div>
      </div>`;

    // If stations not loaded yet, initiate fetch
    if (!this.liveStations.length) {
      this.loadLiveStations(false);
    }
  },

  renderSkeletons() {
    return Array(6).fill(0).map(() => buildSkeletonCard()).join('');
  },

  // ── REQUIREMENT 1: FETCH STATIONS FROM RADIO-BROWSER API ────────────────────
  async loadLiveStations(isAppend = false) {
    if (this.isLoadingStations) return;
    this.isLoadingStations = true;

    const container = document.getElementById('liveStationsContainer');
    const loadBtn = document.getElementById('loadMoreBtn');
    const pill = document.getElementById('feedCountPill');

    if (!isAppend) {
      this.liveFilter.offset = 0;
      if (container) container.innerHTML = this.renderSkeletons();
    } else {
      if (loadBtn) {
        loadBtn.disabled = true;
        loadBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> <span>Loading Next 50 Stations…</span>';
      }
    }

    try {
      // Query parameters: limit=50, offset={offset}, hidebroken=true, order=votes, reverse=true
      // With &name={query}, &country={country}, &tag={genre}
      const result = await RadioData.fetchLiveStations(this.liveFilter);
      const fetched = result.stations || [];

      if (isAppend) {
        this.liveStations.push(...fetched);
      } else {
        this.liveStations = fetched;
      }

      // Update global playback playlist
      AppState.stationList = this.liveStations;

      // Render stations
      if (container) {
        if (!this.liveStations.length) {
          container.innerHTML = `
            <div class="empty-state">
              <i class="fas fa-broadcast-tower"></i>
              <p>No HTTPS radio stations found</p>
              <small>Try selecting another country or clearing the search query.</small>
              <button class="btn-primary" onclick="App.clearLiveSearch()" style="margin-top:10px;">Reset Filters</button>
            </div>`;
        } else {
          container.innerHTML = this.liveStations.map(s => buildStationCard(s)).join('');
        }
      }

      // Update count badge
      if (pill) pill.textContent = `${this.liveStations.length} channels`;

      // Check if more stations available (less than 50 means reached the end)
      const loadContainer = document.getElementById('loadMoreContainer');
      if (fetched.length < 50) {
        this.hasMoreStations = false;
        if (loadContainer) loadContainer.style.display = 'none';
      } else {
        this.hasMoreStations = true;
        if (loadContainer) loadContainer.style.display = 'flex';
      }
    } catch (e) {
      if (container && !isAppend) {
        container.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-wifi"></i>
            <p>Could not connect to Radio-Browser</p>
            <button class="btn-primary" onclick="App.loadLiveStations(false)">Retry</button>
          </div>`;
      }
    } finally {
      this.isLoadingStations = false;
      if (loadBtn) {
        loadBtn.disabled = false;
        loadBtn.innerHTML = '<i class="fas fa-plus-circle"></i> <span>Load More Stations (+50)</span>';
      }
    }
  },

  // REQUIREMENT 1: Load more increments offset by 50
  loadMoreStations() {
    this.liveFilter.offset += 50;
    this.loadLiveStations(true);
  },

  // REQUIREMENT 1: Country filter reset offset to 0
  selectLiveCountry(country) {
    this.liveFilter.country = (country === 'All') ? '' : country;
    this.liveFilter.offset = 0;

    // Update chip styling
    document.querySelectorAll('#countryFilterChips .filter-chip').forEach(btn => {
      const match = (country === 'All' && btn.textContent.includes('All')) || btn.textContent.includes(country);
      btn.classList.toggle('active', match);
    });

    this.loadLiveStations(false);
  },

  // REQUIREMENT 1: Genre filter reset offset to 0
  selectLiveGenre(tag) {
    this.liveFilter.tag = tag;
    this.liveFilter.offset = 0;

    // Update chip styling
    document.querySelectorAll('#genreFilterChips .filter-chip').forEach(btn => {
      const match = (!tag && btn.textContent.includes('All Genres')) || (tag && btn.textContent.toLowerCase().includes(tag.toLowerCase()));
      btn.classList.toggle('active', match);
    });

    this.loadLiveStations(false);
  },

  // REQUIREMENT 1: Search appends &name={query} and resets offset to 0
  handleLiveSearch(query) {
    const clearBtn = document.getElementById('searchClear');
    if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';

    if (this.searchDebounceTimer) clearTimeout(this.searchDebounceTimer);
    this.searchDebounceTimer = setTimeout(() => {
      this.liveFilter.query = query.trim();
      this.liveFilter.offset = 0;
      this.loadLiveStations(false);
    }, 350);
  },

  clearLiveSearch() {
    const input = document.getElementById('searchInput');
    if (input) input.value = '';
    const clearBtn = document.getElementById('searchClear');
    if (clearBtn) clearBtn.style.display = 'none';

    this.liveFilter.query = '';
    this.liveFilter.offset = 0;
    this.loadLiveStations(false);
  },

  bindSearch() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.clearLiveSearch();
    });
  },

  // ─── TAB 2: FAVOURITES & COLLECTIONS ───────────────────────────────────────
  renderFavourites() {
    const content = document.getElementById('content');
    if (!content) return;

    // Ensure collections exist
    if (!AppState.collections || !AppState.collections.length) {
      AppState.collections = JSON.parse(JSON.stringify(DEFAULT_COLLECTIONS));
      if (AppState.favourites.length) {
        AppState.collections[0].stationIds = [...AppState.favourites];
      }
    }

    // VIEW A: If an active collection is selected, show stations inside that collection
    if (AppState.activeCollectionId) {
      const col = AppState.collections.find(c => c.id === AppState.activeCollectionId);
      if (!col) {
        AppState.activeCollectionId = null;
        this.renderFavourites();
        return;
      }

      const stations = (col.stationIds || [])
        .map(id => RadioData.getById(id))
        .filter(Boolean);

      AppState.stationList = stations;

      content.innerHTML = `
        <div class="tab-content favs-tab">
          <div class="collection-detail-header">
            <button class="icon-btn back-btn" onclick="AppState.activeCollectionId=null;App.renderFavourites()" title="Back to Collections">
              <i class="fas fa-arrow-left"></i>
            </button>
            <div class="collection-detail-title-wrap">
              <span class="col-detail-icon" style="background:${col.color}22;color:${col.color}">
                <i class="fas ${col.icon || 'fa-folder'}"></i>
              </span>
              <div>
                <h2 class="list-title">${col.name}</h2>
                <span class="count-badge">${stations.length} stations inside</span>
              </div>
            </div>
            ${col.id !== 'all' ? `
              <button class="icon-btn col-delete-header-btn" onclick="deleteCollection('${col.id}')" title="Delete Collection">
                <i class="fas fa-trash-alt"></i>
              </button>
            ` : '<div></div>'}
          </div>

          ${stations.length ? `
            <div class="stations-list-view">
              ${stations.map(s => buildStationCard(s)).join('')}
            </div>
          ` : `
            <div class="empty-state">
              <i class="fas fa-folder-open"></i>
              <p>No stations saved in "${col.name}" yet</p>
              <small>Tap the ❤️ icon on any FM channel to save it in "${col.name}".</small>
              <button class="btn-primary" onclick="App.renderTab('home')">Explore Channels</button>
            </div>
          `}
        </div>`;
      return;
    }

    // VIEW B: Collections Grid / Overview
    const totalFavsCount = AppState.favourites.length;

    content.innerHTML = `
      <div class="tab-content favs-tab">
        <div class="favs-tab-header">
          <div>
            <h2 class="tab-heading">❤️ Collections & Favourites</h2>
            <p class="tab-subheading">${AppState.collections.length} Collections • ${totalFavsCount} Total Saved Stations</p>
          </div>
        </div>

        <!-- COLLECTIONS FOLDERS GRID -->
        <div class="collections-grid">
          ${AppState.collections.map(col => {
            const count = (col.stationIds || []).length;
            const previewStations = (col.stationIds || [])
              .slice(0, 3)
              .map(id => RadioData.getById(id))
              .filter(Boolean);

            return `
              <div class="collection-folder-card" onclick="AppState.activeCollectionId='${col.id}';App.renderFavourites()">
                <div class="col-folder-top">
                  <span class="col-folder-icon" style="background:${col.color}22;color:${col.color}">
                    <i class="fas ${col.icon || 'fa-folder'}"></i>
                  </span>
                  <span class="col-folder-count-pill">${count} stations</span>
                </div>
                <div class="col-folder-info">
                  <h3 class="col-folder-title">${col.name}</h3>
                  <div class="col-folder-preview">
                    ${previewStations.length ? previewStations.map(st => `
                      <span class="preview-mini-pill" style="border-left:3px solid ${st.color}">
                        ${st.name}
                      </span>
                    `).join('') : '<span class="preview-empty-text">Empty collection</span>'}
                  </div>
                </div>
                <div class="col-folder-footer">
                  <span class="col-folder-view-btn">View Stations <i class="fas fa-chevron-right"></i></span>
                  ${col.id !== 'all' ? `
                    <button class="col-folder-del-mini" onclick="event.stopPropagation();deleteCollection('${col.id}')" title="Delete">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}

          <!-- CREATE NEW COLLECTION CARD -->
          <div class="collection-folder-card create-card" onclick="openNewCollectionPrompt()">
            <div class="create-col-inner">
              <div class="create-col-icon"><i class="fas fa-plus"></i></div>
              <span class="create-col-label">New Collection</span>
              <small class="create-col-hint">Group your favourite channels</small>
            </div>
          </div>
        </div>
      </div>`;
  },

  // ─── TAB 3: BROWSE BY COUNTRY (LAYOUT 3 OF 2 ROWS + OTHER COUNTRIES) ────────
  renderBrowse() {
    const content = document.getElementById('content');
    if (!content) return;

    // Top row major countries list
    const topCountries = [
      { name: "India",       flag: "🇮🇳" },
      { name: "UK",          flag: "🇬🇧" },
      { name: "USA",         flag: "🇺🇸" },
      { name: "France",      flag: "🇫🇷" },
      { name: "Germany",     flag: "🇩🇪" },
      { name: "Brazil",      flag: "🇧🇷" },
      { name: "Japan",       flag: "🇯🇵" },
      { name: "Australia",   flag: "🇦🇺" },
      { name: "Canada",      flag: "🇨🇦" },
      { name: "UAE",         flag: "🇦🇪" },
      { name: "Singapore",   flag: "🇸🇬" },
      { name: "Italy",       flag: "🇮🇹" },
      { name: "Spain",       flag: "🇪🇸" },
      { name: "Russia",      flag: "🇷🇺" },
      { name: "South Korea", flag: "🇰🇷" },
    ];

    let selectedCountry = AppState.browseCountry || 'India';

    content.innerHTML = `
      <div class="tab-content browse-tab">
        <div class="browse-header-row">
          <div>
            <h2 class="tab-heading">🌍 Browse by Country</h2>
            <p class="tab-subheading">Select any country to view its local FM radio channels</p>
          </div>
          <button class="icon-btn filter-btn" onclick="App.toggleFilterPanel()" title="Filter Stations">
            <i class="fas fa-sliders-h"></i>
          </button>
        </div>

        <!-- FILTER PANEL (Filter by music types or Alphabetical A-Z) -->
        <div class="filter-panel" id="filterPanel" style="display:none">
          <div class="filter-row">
            <select class="form-input" id="filterType" onchange="App.applyFilter()">
              <option value="all">Filter by Music Type (All)</option>
              ${RadioData.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
            </select>
            <select class="form-input" id="filterSort" onchange="App.applyFilter()">
              <option value="default">Sort: Default</option>
              <option value="az">Alphabetical: A → Z</option>
              <option value="za">Alphabetical: Z → A</option>
            </select>
          </div>
        </div>

        <!-- UPPER ROW: COUNTRY BUTTONS (India selected by default) -->
        <div class="country-ribbon-label"><i class="fas fa-globe"></i> Popular Countries (Click to change):</div>
        <div class="country-tabs-scroll" id="countryTabsScroll">
          ${topCountries.map(c => `
            <button class="country-tab ${c.name === selectedCountry ? 'active' : ''}"
                    onclick="App.selectBrowseCountry('${c.name}', this)"
                    data-country="${c.name}">
              <span class="ctab-flag">${c.flag}</span>
              <span class="ctab-name">${c.name}</span>
            </button>`).join('')}
        </div>

        <!-- 2-ROW GRID OF THUMBNAILS (MAX 4 PER SCREEN, THEN SCROLLABLE LIST BELOW) -->
        <div id="browseGrid" class="browse-grid"></div>

        <!-- NICHE WALE ME OTHER / ALL COUNTRIES KA BUTTON -->
        <div class="other-countries-section">
          <button class="btn-outline expand-btn" onclick="App.toggleOtherCountries(this)">
            <span class="btn-left-content">
              <i class="fas fa-flag"></i>
              <strong>All Countries (${RadioData.countries.length} World Countries)</strong>
            </span>
            <i class="fas fa-chevron-down expand-icon" id="otherCountriesIcon"></i>
          </button>

          <!-- ALL COUNTRIES LIST WITH FLAGS IN FRONT OF NAMES -->
          <div class="other-countries-list" id="otherCountriesList" style="display:none">
            <div class="country-search-bar">
              <i class="fas fa-search"></i>
              <input type="text" id="allCountrySearchInput" placeholder="Search country (e.g. Spain, Brazil, Canada)…"
                     oninput="App.filterAllCountriesList(this.value)" />
            </div>

            <div class="all-countries-grid" id="allCountriesGrid">
              ${RadioData.countries.map(c => `
                <div class="all-country-item" onclick="App.selectBrowseCountry('${c.name}')" data-country-name="${c.name.toLowerCase()}">
                  <span class="country-item-flag">${c.flag}</span>
                  <span class="country-item-name">${c.name}</span>
                  <span class="country-station-tag">${RadioData.getByCountry(c.name).length} stations</span>
                  <i class="fas fa-chevron-right country-arrow"></i>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>`;

    this.renderBrowseGrid(selectedCountry);
  },

  selectBrowseCountry(country, btnEl) {
    AppState.browseCountry = country;

    // Update active state in top scroll
    document.querySelectorAll('.country-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.country === country);
    });

    // If selected from Other Countries list, close drawer and scroll to top
    const otherList = document.getElementById('otherCountriesList');
    if (otherList && otherList.style.display !== 'none') {
      otherList.style.display = 'none';
      const icon = document.getElementById('otherCountriesIcon');
      if (icon) icon.style.transform = '';
    }

    // Scroll active country tab into view
    const activeTab = document.querySelector(`[data-country="${country}"]`);
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    this.renderBrowseGrid(country);
    showToast(`Loaded ${country} radio stations`, 'info');
  },

  renderBrowseGrid(country) {
    const grid = document.getElementById('browseGrid');
    if (!grid) return;

    let stations = RadioData.getByCountry(country);
    AppState.stationList = stations;

    if (!stations.length) {
      grid.innerHTML = `<div class="empty-state"><i class="fas fa-broadcast-tower"></i><p>No stations found for ${country}</p></div>`;
      return;
    }

    // Apply active filter if any
    if (AppState.currentFilter.type !== 'all') {
      stations = stations.filter(s => s.category.includes(AppState.currentFilter.type));
    }
    if (AppState.currentFilter.sort === 'az') {
      stations.sort((a,b) => a.name.localeCompare(b.name));
    } else if (AppState.currentFilter.sort === 'za') {
      stations.sort((a,b) => b.name.localeCompare(a.name));
    }

    // All stations as plain vertical list rows (no grid)
    grid.innerHTML = `
      <div class="browse-country-badge">
        <span>Stations in <strong>${country}</strong> — ${stations.length} channels</span>
      </div>
      <div class="stations-list-view">
        ${stations.map(s => buildStationCard(s)).join('')}
      </div>`;
  },

  toggleOtherCountries(btn) {
    const list = document.getElementById('otherCountriesList');
    const icon = document.getElementById('otherCountriesIcon');
    if (!list) return;
    const isHidden = list.style.display === 'none';
    list.style.display = isHidden ? 'block' : 'none';
    if (icon) icon.style.transform = isHidden ? 'rotate(180deg)' : '';
  },

  filterAllCountriesList(query) {
    const q = query.toLowerCase().trim();
    const items = document.querySelectorAll('.all-country-item');
    items.forEach(item => {
      const name = item.dataset.countryName || '';
      item.style.display = (!q || name.includes(q)) ? 'flex' : 'none';
    });
  },

  toggleFilterPanel() {
    const panel = document.getElementById('filterPanel');
    if (panel) {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }
  },

  applyFilter() {
    const typeEl = document.getElementById('filterType');
    const sortEl = document.getElementById('filterSort');
    if (!typeEl || !sortEl) return;

    AppState.currentFilter.type = typeEl.value;
    AppState.currentFilter.sort = sortEl.value;

    if (AppState.currentTab === 'browse') {
      this.renderBrowseGrid(AppState.browseCountry);
    } else {
      const grid = document.getElementById('stationListGrid');
      if (grid) grid.innerHTML = this.getFilteredCards(AppState.stationList);
    }
  },

  getFilteredCards(stations) {
    let list = [...stations];
    if (AppState.currentFilter.type !== 'all') {
      list = list.filter(s => s.category.includes(AppState.currentFilter.type));
    }
    if (AppState.currentFilter.sort === 'az') {
      list.sort((a,b) => a.name.localeCompare(b.name));
    } else if (AppState.currentFilter.sort === 'za') {
      list.sort((a,b) => b.name.localeCompare(a.name));
    }

    if (!list.length) {
      return `<div class="empty-state"><i class="fas fa-broadcast-tower"></i><p>No stations matching criteria</p></div>`;
    }
    // Pure list rows — no grid split
    return `<div class="stations-list-view">${list.map(s => buildStationCard(s)).join('')}</div>`;
  },

  // ─── SEE ALL STATIONS FOR ROW OR CATEGORY ──────────────────────────────────
  openList(listId) {
    let stations = [];
    let title = '';
    if (listId === 'local') {
      stations = RadioData.getByCountry(AppState.settings.country);
      title = `📻 Local Radio – ${AppState.settings.country}`;
      this.renderStationList(title, stations);
    } else if (listId === 'world') {
      stations = RadioData.getPopular();
      title = '🌍 Popular Worldwide';
      this.renderStationList(title, stations);
    } else if (listId === 'genres') {
      this.openAllGenres();
    } else {
      stations = RadioData.getByCategory(listId);
      title = `${listId.charAt(0).toUpperCase() + listId.slice(1)} Stations`;
      this.renderStationList(title, stations);
    }
  },

  openAllGenres() {
    const content = document.getElementById('content');
    if (!content) return;

    const sorted = [...RadioData.categories].sort((a,b) => a.name.localeCompare(b.name));

    content.innerHTML = `
      <div class="tab-content list-tab all-genres-tab">
        <div class="list-header">
          <button class="icon-btn back-btn" onclick="App.renderTab(AppState.currentTab)" aria-label="Back">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h2 class="list-title"><i class="fas fa-layer-group"></i> All Genres <span class="count-badge">${sorted.length}</span></h2>
          <div></div>
        </div>

        <div class="search-bar-wrap" style="padding: 6px 16px 14px;">
          <div class="search-bar">
            <i class="fas fa-search"></i>
            <input type="text" id="genreSearchInput" placeholder="Search music genre (e.g. Rock, Sufi, Pop)…" oninput="App.filterGenresList(this.value)" />
          </div>
        </div>

        <div class="genre-list-rows-wrap" id="allGenresList">
          ${sorted.map(cat => {
            const count = RadioData.getByCategory(cat.id).length;
            return `
              <div class="genre-list-row" onclick="App.openCategory('${cat.id}')" data-genre-name="${cat.name.toLowerCase()}">
                <div class="genre-row-left">
                  <span class="genre-icon-square" style="background:${cat.color}">
                    <i class="fas ${cat.icon}"></i>
                  </span>
                  <div class="genre-row-meta">
                    <span class="genre-row-title">${cat.name}</span>
                    <span class="genre-row-desc">${cat.desc || 'World Radio Channels'}</span>
                  </div>
                </div>
                <div class="genre-row-right">
                  <span class="genre-count-tag">${count} stations</span>
                  <i class="fas fa-chevron-right genre-row-chevron"></i>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  filterGenresList(query) {
    const q = (query || '').toLowerCase().trim();
    document.querySelectorAll('#allGenresList .genre-list-row').forEach(row => {
      const name = row.dataset.genreName || '';
      row.style.display = (!q || name.includes(q)) ? 'flex' : 'none';
    });
  },

  openCategory(catId) {
    this.renderGenreView(catId);
  },

  closeGenreWindow() {
    const win = document.getElementById('genre-window');
    if (!win) return;
    win.classList.remove('open');
    setTimeout(() => {
      win.style.display = 'none';
    }, 320);
  },

  renderGenreView(catId) {
    const win = document.getElementById('genre-window');
    if (!win) return;

    const cat = RadioData.categories.find(c => c.id === catId) || {
      id: catId,
      name: catId.charAt(0).toUpperCase() + catId.slice(1),
      icon: 'fa-music',
      color: '#ff4757',
      desc: 'World Radio Channels'
    };

    const allStations = RadioData.getByCategory(catId);
    AppState.stationList = allStations;
    AppState.categoryFilter = catId;

    const userCountry = AppState.settings.country || 'India';
    const localStations = allStations.filter(s => s.country && s.country.toLowerCase() === userCountry.toLowerCase());
    const globalStations = allStations.filter(s => !s.country || s.country.toLowerCase() !== userCountry.toLowerCase());

    win.innerHTML = `
      <div class="genre-window-container">
        <!-- SEPARATE WINDOW TOP BAR (TITLE, GENRE BADGE & CLOSE BUTTON) -->
        <div class="genre-window-topbar">
          <button class="genre-window-close-btn" onclick="App.closeGenreWindow()" aria-label="Close Genre Window" title="Close Window">
            <i class="fas fa-times"></i>
          </button>
          <div class="genre-window-topbar-title">
            <span class="topbar-genre-badge" style="background:${cat.color}25; color:${cat.color}">
              <i class="fas ${cat.icon}"></i> ${cat.name}
            </span>
          </div>
          <span class="genre-window-count-badge">${allStations.length} channels</span>
        </div>

        <!-- SCROLLABLE DEDICATED WINDOW BODY -->
        <div class="genre-window-body">
          <!-- GENRE HERO BANNER WITH TOTAL STATIONS INSIDE -->
          <div class="genre-header-banner" style="background: linear-gradient(135deg, ${cat.color}28 0%, rgba(10,10,22,0.95) 100%); border-left: 4px solid ${cat.color}">
            <div class="genre-banner-content">
              <div class="genre-banner-icon" style="background:${cat.color}35; color:${cat.color}">
                <i class="fas ${cat.icon}"></i>
              </div>
              <div class="genre-banner-meta">
                <div class="genre-banner-topline">
                  <span class="genre-pill-tag">EXPLORE GENRE</span>
                  <span class="genre-total-badge">
                    <i class="fas fa-broadcast-tower"></i> ${allStations.length} Stations Inside
                  </span>
                </div>
                <h2 class="genre-banner-name">${cat.name}</h2>
                <p class="genre-banner-desc">${cat.desc || 'Live FM stations playing ' + cat.name}</p>
              </div>
            </div>
          </div>

          ${!allStations.length ? `
            <div class="empty-state">
              <i class="fas fa-broadcast-tower"></i>
              <p>No stations found in ${cat.name}</p>
              <button class="btn-primary" onclick="App.closeGenreWindow()">Close Window</button>
            </div>
          ` : `
            <!-- SECTION 1: LOCAL STATIONS ROW (2 ROWS OF CHANNELS) -->
            ${localStations.length ? `
              <div class="scroll-row genre-scroll-section">
                <div class="row-header">
                  <div>
                    <h3 class="row-title">📻 Local ${cat.name} Radios (${userCountry})</h3>
                    <span class="section-count-pill">${localStations.length} stations</span>
                  </div>
                </div>
                <div class="cards-scroll-2rows" id="scroll-genre-local">
                  ${localStations.map(s => buildStationCard(s)).join('')}
                </div>
              </div>
            ` : `
              <div class="genre-no-local-note">
                <i class="fas fa-info-circle"></i> No local ${userCountry} stations in ${cat.name}. Check world stations below!
              </div>
            `}

            <!-- SECTION 2: GLOBAL STATIONS ROW (2 ROWS OF CHANNELS) -->
            ${globalStations.length ? `
              <div class="scroll-row genre-scroll-section">
                <div class="row-header">
                  <div>
                    <h3 class="row-title">🌍 Global ${cat.name} Stations (Worldwide)</h3>
                    <span class="section-count-pill">${globalStations.length} stations</span>
                  </div>
                </div>
                <div class="cards-scroll-2rows" id="scroll-genre-global">
                  ${globalStations.map(s => buildStationCard(s)).join('')}
                </div>
              </div>
            ` : ''}

            <!-- SECTION 3: ALL STATIONS IN LIST VIEW -->
            <div class="genre-all-list-section">
              <div class="row-header">
                <h3 class="row-title">📋 All ${cat.name} Stations</h3>
                <span class="section-count-pill">${allStations.length} total</span>
              </div>
              <div class="stations-list-view">
                ${allStations.map(s => buildStationCard(s)).join('')}
              </div>
            </div>
          `}
        </div>
      </div>
    `;

    win.style.display = 'block';
    requestAnimationFrame(() => win.classList.add('open'));
  },

  renderStationList(title, stations, catId = null) {
    const content = document.getElementById('content');
    if (!content) return;

    AppState.stationList = stations;

    content.innerHTML = `
      <div class="tab-content list-tab">
        <div class="list-header">
          <button class="icon-btn back-btn" onclick="App.renderTab(AppState.currentTab)">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h2 class="list-title">${title}</h2>
          <button class="icon-btn filter-btn" onclick="App.toggleFilterPanel()">
            <i class="fas fa-sliders-h"></i>
          </button>
        </div>

        <div class="filter-panel" id="filterPanel" style="display:none">
          <div class="filter-row">
            <select class="form-input" id="filterType" onchange="App.applyFilter()">
              <option value="all">All Genres</option>
              ${RadioData.categories.map(c => `<option value="${c.id}" ${c.id===catId?'selected':''}>${c.name}</option>`).join('')}
            </select>
            <select class="form-input" id="filterSort" onchange="App.applyFilter()">
              <option value="default">Default</option>
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
            </select>
          </div>
        </div>

        <div id="stationListGrid" class="station-list-grid">
          ${this.getFilteredCards(stations)}
        </div>
      </div>`;
  },

  openStation(stationId) {
    const station = RadioData.getById(stationId);
    if (!station) return;
    if (!AppState.stationList || !AppState.stationList.length) {
      AppState.stationList = RadioData.stations;
    }
    const idx = AppState.stationList.findIndex(s => String(s.id) === String(station.id) || (station.stationuuid && s.stationuuid === station.stationuuid));
    if (idx !== -1) {
      AppState.stationIndex = idx;
    } else {
      AppState.stationList.push(station);
      AppState.stationIndex = AppState.stationList.length - 1;
    }
    Player.play(station);
  },
};

// ─── STATION LIST ITEM (alias → same minimal row as card) ────────────────────
function buildStationListItem(station) {
  return buildStationCard(station);
}

// ─── BOOTSTRAP APP ON LOAD ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
