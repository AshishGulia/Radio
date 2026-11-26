// js/app.js - Core App Logic, Routing & View Builders

// ─── GLOBAL APPLICATION STATE ────────────────────────────────────────────────
const DEFAULT_COLLECTIONS = [
  { id: 'all', name: 'All Favourites', icon: 'fa-heart', color: '#ff4757', stationIds: [] },
  { id: 'driving', name: 'Driving Beats', icon: 'fa-car', color: '#ffa502', stationIds: [] },
  { id: 'latenight', name: 'Late Night Chill', icon: 'fa-moon', color: '#70a1ff', stationIds: [] },
  { id: 'workout', name: 'Workout Energy', icon: 'fa-bolt', color: '#2ed573', stationIds: [] }
];

const DEFAULT_PLAYLISTS = [
  { id: 'liked_songs', name: 'Liked Songs', icon: 'fa-heart', color: '#ff4757', songs: [] }
];

const AppState = {
  currentTab: 'home',
  currentStation: null,
  isPlaying: false,
  favourites: [],
  collections: JSON.parse(JSON.stringify(DEFAULT_COLLECTIONS)),
  playlists: JSON.parse(JSON.stringify(DEFAULT_PLAYLISTS)),
  activeCollectionId: null,
  activePlaylistId: null,
  favouritesSection: null, // null = show only 2 buttons; 'collections' or 'playlists' when opened
  favouritesSegment: 'collections',
  userState: 'Maharashtra',
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
function escapeQuotes(str) {
  if (!str) return '';
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function saveState() {
  try {
    const savedStations = {};
    (AppState.favourites || []).forEach(id => {
      const st = (typeof RadioData !== 'undefined' && RadioData.getById) ? RadioData.getById(id) : null;
      if (st) savedStations[String(id)] = st;
    });
    localStorage.setItem('radiowave_state', JSON.stringify({
      favourites: AppState.favourites,
      collections: AppState.collections,
      playlists: AppState.playlists,
      favouritesSegment: AppState.favouritesSegment,
      userState: AppState.userState,
      theme: AppState.theme,
      settings: AppState.settings,
      savedStations
    }));
  } catch(e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem('radiowave_state');
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved.theme)             AppState.theme = saved.theme;
    if (saved.userState)         AppState.userState = saved.userState;
    if (saved.favouritesSegment) AppState.favouritesSegment = saved.favouritesSegment;
    if (saved.settings)          AppState.settings = { ...AppState.settings, ...saved.settings };
    if (saved.savedStations && typeof RadioData !== 'undefined' && RadioData.liveStationsMap) {
      Object.assign(RadioData.liveStationsMap, saved.savedStations);
    }
    if (saved.collections && Array.isArray(saved.collections) && saved.collections.length) {
      AppState.collections = saved.collections;
    } else {
      AppState.collections = JSON.parse(JSON.stringify(DEFAULT_COLLECTIONS));
    }
    if (saved.playlists && Array.isArray(saved.playlists) && saved.playlists.length) {
      AppState.playlists = saved.playlists;
    } else {
      AppState.playlists = JSON.parse(JSON.stringify(DEFAULT_PLAYLISTS));
    }
    if (saved.favourites && Array.isArray(saved.favourites)) {
      AppState.favourites = saved.favourites.map(String);
      // If 'all' collection is empty, backfill with saved favourites
      if (AppState.collections[0] && (!AppState.collections[0].stationIds || !AppState.collections[0].stationIds.length)) {
        AppState.collections[0].stationIds = [...AppState.favourites];
      }
    }
    syncFavouritesFromCollections();
  } catch(e) {}
}

// ─── COLLECTIONS & FAVOURITES SYNC ───────────────────────────────────────────
function syncFavouritesFromCollections() {
  const set = new Set();
  (AppState.collections || []).forEach(col => {
    (col.stationIds || []).forEach(id => {
      if (id !== null && id !== undefined && id !== '') set.add(String(id));
    });
  });
  AppState.favourites = Array.from(set);
  saveState();
}

function updateFavouriteButtonsUI(stationId) {
  const sid = String(stationId);
  const isFav = (AppState.favourites || []).map(String).includes(sid);

  // Update player fav button if open
  const playerBtn = document.getElementById('playerFavBtn');
  if (playerBtn && AppState.currentStation && String(AppState.currentStation.id) === sid) {
    playerBtn.className = `fav-btn ${isFav ? 'active' : ''}`;
    playerBtn.innerHTML = `<i class="fa${isFav ? 's' : 'r'} fa-heart"></i>`;
  }

  // Update minimal station row buttons across views
  document.querySelectorAll(`[data-station-id="${sid}"] .row-fav-btn`).forEach(btn => {
    btn.className = `row-fav-btn ${isFav ? 'active' : ''}`;
    btn.innerHTML = `<i class="fa${isFav ? 's' : 'r'} fa-heart"></i>`;
  });

  // Update mini player fav button if present
  const miniFavBtn = document.getElementById('miniFavBtn');
  if (miniFavBtn && AppState.currentStation && String(AppState.currentStation.id) === sid) {
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
  const sid = String(station.id);

  modal.innerHTML = `
    <div class="col-modal-backdrop" onclick="closeCollectionModal()"></div>
    <div class="col-modal-content">
      <div class="col-modal-handle"></div>
      
      <div class="col-modal-header">
        <div class="col-modal-station-info">
          <div class="col-modal-freq-logo" style="background:${station.color}22;border:1px solid ${station.color}55;">
            <img src="${getStationFavicon(station)}" alt="${escapeQuotes(station.name)}"
                 style="width:30px;height:30px;object-fit:contain;border-radius:6px;"
                 onerror="handleImageError(this)" />
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
          const hasStation = (col.stationIds || []).map(String).includes(sid);
          return `
            <div class="col-check-item ${hasStation ? 'selected' : ''}" 
                 onclick="toggleStationInCollection('${col.id}', '${escapeQuotes(sid)}', this)">
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
                 onkeydown="if(event.key==='Enter') createNewCollection('${escapeQuotes(sid)}')" />
          <button class="btn-create-col" onclick="createNewCollection('${escapeQuotes(sid)}')">Create</button>
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

  const sid = String(stationId);
  const idx = col.stationIds.findIndex(id => String(id) === sid);
  const checkIcon = itemEl ? itemEl.querySelector('.col-item-checkbox i') : null;
  const countEl = itemEl ? itemEl.querySelector('.col-item-count') : null;

  if (idx === -1) {
    col.stationIds.push(sid);
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
  updateFavouriteButtonsUI(sid);

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

  const sid = stationId ? String(stationId) : null;
  const newCol = {
    id,
    name,
    icon: randomIcon,
    color: randomColor,
    stationIds: sid ? [sid] : []
  };

  AppState.collections.push(newCol);
  syncFavouritesFromCollections();
  saveState();
  showToast(`Collection "${name}" created!`, 'success');

  if (sid) {
    updateFavouriteButtonsUI(sid);
    openCollectionModal(sid);
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

// ─── PLAYLIST MODAL & SONG MANAGEMENT ────────────────────────────────────────
function openPlaylistModal(stationId) {
  const station = RadioData.getById(stationId);
  if (!station) return;
  const songInfo = NowPlaying.getSongInfo(stationId);
  const modal = document.getElementById('collection-modal');
  if (!modal) return;

  const songObj = {
    id: 'song_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    title: songInfo.song,
    artist: songInfo.artist,
    stationName: station.name,
    stationId: String(station.id),
    thumb: songInfo.thumb || getStationFavicon(station),
    addedAt: Date.now()
  };

  AppState._pendingSongs = AppState._pendingSongs || {};
  const tempKey = 'song_temp_' + Date.now();
  AppState._pendingSongs[tempKey] = songObj;

  const playlists = AppState.playlists || [];

  modal.innerHTML = `
    <div class="col-modal-backdrop" onclick="closeCollectionModal()"></div>
    <div class="col-modal-content">
      <div class="col-modal-handle"></div>
      
      <div class="col-modal-header">
        <div class="col-modal-station-info">
          <div class="col-modal-freq-logo" style="background:${station.color}22;border:1px solid ${station.color}55;">
            <img src="${songObj.thumb}" alt="${escapeQuotes(songInfo.song)}"
                 style="width:30px;height:30px;object-fit:cover;border-radius:6px;"
                 onerror="handleImageError(this)" />
          </div>
          <div class="col-modal-text">
            <h3 class="col-modal-title">Save Song to Playlist</h3>
            <p class="col-modal-subtitle">${escapeQuotes(songInfo.song)} • ${escapeQuotes(songInfo.artist)}</p>
          </div>
        </div>
        <button class="col-modal-close" onclick="closeCollectionModal()" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="col-modal-section-title">
        <i class="fas fa-list-music"></i> Choose Playlist(s):
      </div>

      <div class="col-list" id="playlistOptionsList">
        ${playlists.map(pl => {
          const hasSong = (pl.songs || []).some(s => s.title.toLowerCase() === songObj.title.toLowerCase() && s.artist.toLowerCase() === songObj.artist.toLowerCase());
          return `
            <div class="col-check-item ${hasSong ? 'selected' : ''}" 
                 onclick="toggleSongInPlaylist('${pl.id}', '${tempKey}', this)">
              <div class="col-item-left">
                <span class="col-item-icon" style="background:${pl.color}22;color:${pl.color}">
                  <i class="fas ${pl.icon || 'fa-music'}"></i>
                </span>
                <div class="col-item-meta">
                  <span class="col-item-name">${pl.name}</span>
                  <span class="col-item-count">${(pl.songs || []).length} songs</span>
                </div>
              </div>
              <div class="col-item-checkbox">
                <i class="fas ${hasSong ? 'fa-check-circle' : 'fa-circle'}"></i>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- CREATE NEW PLAYLIST INLINE -->
      <div class="col-create-section">
        <div class="col-create-input-wrap">
          <i class="fas fa-plus-circle"></i>
          <input type="text" id="newPlaylistInput" placeholder="New playlist name (e.g. Punjabi Party)…" 
                 onkeydown="if(event.key==='Enter') createNewPlaylistWithSong('${tempKey}')" />
          <button class="btn-create-col" onclick="createNewPlaylistWithSong('${tempKey}')">Create</button>
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

function toggleSongInPlaylist(playlistId, tempKey, itemEl) {
  const songObj = AppState._pendingSongs ? AppState._pendingSongs[tempKey] : null;
  if (!songObj) return;

  const pl = AppState.playlists.find(p => p.id === playlistId);
  if (!pl) return;
  if (!pl.songs) pl.songs = [];

  const idx = pl.songs.findIndex(s => s.title.toLowerCase() === songObj.title.toLowerCase() && s.artist.toLowerCase() === songObj.artist.toLowerCase());
  const checkIcon = itemEl ? itemEl.querySelector('.col-item-checkbox i') : null;
  const countEl = itemEl ? itemEl.querySelector('.col-item-count') : null;

  if (idx === -1) {
    pl.songs.unshift(songObj);
    if (itemEl) itemEl.classList.add('selected');
    if (checkIcon) checkIcon.className = 'fas fa-check-circle';
    showToast(`Added to playlist "${pl.name}" 🎵`, 'success');
  } else {
    pl.songs.splice(idx, 1);
    if (itemEl) itemEl.classList.remove('selected');
    if (checkIcon) checkIcon.className = 'fas fa-circle';
    showToast(`Removed from playlist "${pl.name}"`, 'info');
  }

  if (countEl) {
    countEl.textContent = `${pl.songs.length} songs`;
  }

  saveState();
  if (AppState.currentTab === 'favourites') {
    App.renderFavourites();
  }
}

function createNewPlaylistWithSong(tempKey) {
  const songObj = AppState._pendingSongs ? AppState._pendingSongs[tempKey] : null;
  const input = document.getElementById('newPlaylistInput');
  if (!input) return;
  const name = input.value.trim();
  if (!name) {
    showToast('Please enter a playlist name', 'info');
    return;
  }

  const id = 'pl_' + Date.now();
  const colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#9b59b6', '#e056fd', '#00d2d3'];
  const icons = ['fa-music', 'fa-headphones', 'fa-compact-disc', 'fa-fire', 'fa-heart', 'fa-star'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  const newPl = {
    id,
    name,
    icon: randomIcon,
    color: randomColor,
    songs: songObj ? [songObj] : []
  };

  AppState.playlists.push(newPl);
  saveState();
  showToast(`Playlist "${name}" created!`, 'success');

  if (songObj && songObj.stationId) {
    openPlaylistModal(songObj.stationId);
  } else {
    closeCollectionModal();
  }

  if (AppState.currentTab === 'favourites') {
    App.renderFavourites();
  }
}

function openNewPlaylistPrompt() {
  const name = prompt('Enter name for the new song playlist (e.g. Late Night Vibes, Workout Hits):');
  if (!name || !name.trim()) return;

  const id = 'pl_' + Date.now();
  const colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#9b59b6', '#e056fd', '#00d2d3'];
  const icons = ['fa-music', 'fa-headphones', 'fa-compact-disc', 'fa-fire', 'fa-heart', 'fa-star'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  AppState.playlists.push({
    id,
    name: name.trim(),
    icon: randomIcon,
    color: randomColor,
    songs: []
  });
  saveState();
  showToast(`Playlist "${name.trim()}" created!`, 'success');
  if (AppState.currentTab === 'favourites') {
    App.renderFavourites();
  }
}

function deletePlaylist(playlistId) {
  if (playlistId === 'liked_songs') {
    showToast('Cannot delete default Liked Songs playlist', 'info');
    return;
  }
  const idx = AppState.playlists.findIndex(p => p.id === playlistId);
  if (idx !== -1) {
    const name = AppState.playlists[idx].name;
    AppState.playlists.splice(idx, 1);
    if (AppState.activePlaylistId === playlistId) {
      AppState.activePlaylistId = null;
    }
    saveState();
    showToast(`Playlist "${name}" deleted`, 'info');
    if (AppState.currentTab === 'favourites') {
      App.renderFavourites();
    }
  }
}

function removeSongFromPlaylist(playlistId, songId) {
  const pl = AppState.playlists.find(p => p.id === playlistId);
  if (!pl) return;
  pl.songs = (pl.songs || []).filter(s => s.id !== songId);
  saveState();
  showToast('Song removed from playlist', 'info');
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

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isNonEnglishName(name) {
  if (!name) return false;
  return /[^\x00-\x7F]/.test(name);
}

function buildHomeThumbnailCard(station) {
  const sid = String(station.id || station.stationuuid);
  const faviconUrl = getStationFavicon(station);
  const nonEnglish = isNonEnglishName(station.name);

  return `
    <div class="home-thumb-card" onclick="App.openStation('${escapeQuotes(sid)}')">
      <div class="home-thumb-logo-box" style="background:${station.color}22;border:1px solid ${station.color}44;">
        <img class="home-thumb-img" src="${escapeHtml(faviconUrl)}" alt="${escapeHtml(station.name)}" loading="lazy" onerror="handleImageError(this)" />
        <span class="home-thumb-flag">${station.flag || '🌍'}</span>
      </div>
      ${nonEnglish ? `<span class="home-thumb-non-eng-name">${escapeHtml(station.name)}</span>` : ''}
    </div>
  `;
}

const CATEGORY_FEATURED = [
  { id: 'bollywood', name: 'Bollywood', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80', color: '#ff4757' },
  { id: 'pop', name: 'Pop Hits', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80', color: '#ffa502' },
  { id: 'rock', name: 'Rock & Metal', img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&auto=format&fit=crop&q=80', color: '#2ed573' },
  { id: 'classical', name: 'Classical', img: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&auto=format&fit=crop&q=80', color: '#1e90ff' },
  { id: 'jazz', name: 'Jazz & Blues', img: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&auto=format&fit=crop&q=80', color: '#9b59b6' },
  { id: 'electronic', name: 'Dance / EDM', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80', color: '#00d2d3' },
  { id: 'lo-fi', name: 'Lo-Fi Beats', img: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&auto=format&fit=crop&q=80', color: '#70a1ff' },
  { id: 'hip-hop', name: 'Hip-Hop', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80', color: '#ff6b35' },
  { id: 'ambient', name: 'Ambient', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80', color: '#26de81' },
  { id: 'punjabi', name: 'Punjabi', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80', color: '#ff3838' },
  { id: 'sufi', name: 'Sufi Music', img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&auto=format&fit=crop&q=80', color: '#10ac84' },
  { id: 'retro', name: 'Retro 80s/90s', img: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=400&auto=format&fit=crop&q=80', color: '#f39c12' },
  { id: 'k-pop', name: 'K-Pop', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&auto=format&fit=crop&q=80', color: '#ff84c1' },
  { id: 'latin', name: 'Latin', img: 'https://images.unsplash.com/photo-1545128485-c400e7702796?w=400&auto=format&fit=crop&q=80', color: '#fc5c65' },
  { id: 'country', name: 'Country', img: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&auto=format&fit=crop&q=80', color: '#c8a96e' },
  { id: 'r-and-b', name: 'R&B / Soul', img: 'https://images.unsplash.com/photo-1520523839898-507127027582?w=400&auto=format&fit=crop&q=80', color: '#a55eea' },
  { id: 'reggae', name: 'Reggae', img: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&auto=format&fit=crop&q=80', color: '#26de81' },
  { id: 'indie', name: 'Indie Pop', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop&q=80', color: '#6c5ce7' },
  { id: 'ghazal', name: 'Ghazal', img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&auto=format&fit=crop&q=80', color: '#e056fd' },
  { id: 'devotional', name: 'Devotional', img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&auto=format&fit=crop&q=80', color: '#ffa801' },
  { id: 'gospel', name: 'Gospel', img: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&auto=format&fit=crop&q=80', color: '#fd9644' },
  { id: 'tamil', name: 'Tamil FM', img: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&auto=format&fit=crop&q=80', color: '#e84118' },
  { id: 'telugu', name: 'Telugu Beats', img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&auto=format&fit=crop&q=80', color: '#1e3799' }
];

function buildHomeGenreThumbnailCard(cat) {
  return `
    <div class="home-genre-thumb-card" onclick="App.openCategory('${cat.id}')">
      <div class="home-genre-img-wrap" style="border:1.5px solid ${cat.color}66;">
        <img class="home-genre-img" src="${cat.img}" alt="${escapeHtml(cat.name)}" loading="lazy" />
        <div class="home-genre-overlay"></div>
        <span class="home-genre-name">${escapeHtml(cat.name)}</span>
      </div>
    </div>
  `;
}

// ─── STATION ROW ITEM (MINIMAL: logo favicon + name + green/red status + fav) ──────
function buildStationCard(station, opts = {}) {
  const sid = String(station.id);
  const isFav = AppState.favourites && AppState.favourites.map(String).includes(sid);
  const info = NowPlaying.getSongInfo(station.id);
  const faviconUrl = getStationFavicon(station);
  const statusBorderClass = info.isMusic ? 'live-music-border' : 'live-ad-border';

  return `
    <div class="station-row ${statusBorderClass}" onclick="App.openStation('${escapeQuotes(sid)}')" data-station-id="${escapeHtml(sid)}">
      <!-- STATION LOGO WITH MINIMALIST SVG FALLBACK (REQUIREMENT 3) -->
      <div class="row-station-logo-box" style="background:${station.color}22;border:1px solid ${station.color}44;">
        <img class="row-station-logo-img"
             src="${escapeHtml(faviconUrl)}"
             alt="${escapeHtml(station.name)}"
             loading="lazy"
             onerror="handleImageError(this)" />
        <span class="row-flag-badge">${station.flag || '🌍'}</span>
      </div>

      <!-- STATION NAME + SUBTEXT + LIVE SONG/AD STATUS BADGE (REQUIREMENT 4) -->
      <div class="row-name-wrap">
        <div class="row-name-top">
          <span class="row-station-name">${escapeHtml(station.name)}</span>
          <!-- LIVE STATUS BADGE: GREEN BLINKING LIVE MUSIC OR RED SOLID AD/TALK -->
          <span class="status-indicator-badge-mini ${info.badgeClass}">
            <span class="indicator-dot"></span>
            <span>${info.badgeText}</span>
          </span>
        </div>
        <div class="row-station-sub-line">
          <span class="row-station-sub">${station.city ? `${escapeHtml(station.city)}, ` : ''}${escapeHtml(station.country || 'Global')}</span>
          ${station.bitrate ? `<span class="row-bitrate-pill">${station.bitrate}k</span>` : ''}
          ${station.codec ? `<span class="row-codec-pill">${escapeHtml(station.codec)}</span>` : ''}
        </div>
      </div>

      <!-- FAV / COLLECTION SAVE BUTTON -->
      <button class="row-fav-btn ${isFav ? 'active' : ''}"
              onclick="event.stopPropagation();openCollectionModal('${escapeQuotes(sid)}')"
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
    if (tab === 'favourites') {
      AppState.favouritesSection = null;
      AppState.activeCollectionId = null;
      AppState.activePlaylistId = null;
    }
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    switch (tab) {
      case 'home':       this.renderHome();       break;
      case 'favourites': this.renderFavourites(); break;
      case 'browse':     this.renderBrowse();     break;
    }
  },

  // ─── TAB 1: HOME (LOCAL, GLOBAL, GENRE ROWS WITH HORIZONTAL SLIDES) ────────
  renderHome() {
    const content = document.getElementById('content');
    if (!content) return;

    const userCountry = AppState.settings.country || 'India';
    const countryStates = (typeof RadioData !== 'undefined' && RadioData.getStatesForCountry)
      ? RadioData.getStatesForCountry(userCountry)
      : [];
    if (!AppState.userState && countryStates.length) {
      AppState.userState = countryStates[0].name;
    }
    const userState = AppState.userState || (countryStates[0] ? countryStates[0].name : userCountry);

    let localStations = (typeof RadioData !== 'undefined' && RadioData.getStationsByState)
      ? RadioData.getStationsByState(userCountry, userState)
      : [];
    if (!localStations.length && typeof RadioData !== 'undefined' && RadioData.getByCountry) {
      localStations = RadioData.getByCountry(userCountry);
    }
    if (!localStations.length && typeof RadioData !== 'undefined' && RadioData.stations) {
      localStations = RadioData.stations.slice(0, 18);
    }
    localStations = localStations.slice(0, 18);

    const globalStations = (typeof RadioData !== 'undefined' && RadioData.stations) ? RadioData.stations.slice(0, 18) : [];

    content.innerHTML = `
      <div class="tab-content home-tab">
        <!-- SEARCH BAR -->
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

        <!-- ROW 1: LOCAL STATIONS (USER'S STATE & ALL STATES ACCESS) -->
        <div class="home-section-block">
          <div class="home-section-header">
            <div>
              <h3><i class="fas fa-map-marker-alt" style="color:var(--accent);"></i> Local Stations (${escapeHtml(userState)})</h3>
              <span class="home-section-sub">${escapeHtml(userCountry)} • State: <strong>${escapeHtml(userState)}</strong></span>
            </div>
            <button class="see-all-btn" onclick="App.openLocalStateView()" title="Explore all states and their radio stations">
              See All <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <div class="home-horizontal-slider">
            ${localStations.map(s => buildHomeThumbnailCard(s)).join('')}
          </div>
        </div>

        <!-- ROW 2: GLOBAL STATIONS -->
        <div class="home-section-block">
          <div class="home-section-header">
            <h3><i class="fas fa-globe" style="color:var(--accent);"></i> Global Stations</h3>
            <button class="see-all-btn" onclick="App.renderTab('browse')" title="Browse all ${RadioData.countries ? RadioData.countries.length : 270} countries">
              See All <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <div class="home-horizontal-slider">
            ${globalStations.map(s => buildHomeThumbnailCard(s)).join('')}
          </div>
        </div>

        <!-- ROW 3: GENRES LIST (ONLY GENRES — TAP FOR WORLDWIDE POPULAR MIX) -->
        <div class="home-section-block">
          <div class="home-section-header">
            <h3><i class="fas fa-music" style="color:var(--accent);"></i> Genres</h3>
            <button class="see-all-btn" onclick="App.openAllGenresView()" title="View all music genres">
              See All <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <div class="home-horizontal-slider">
            ${CATEGORY_FEATURED.map(cat => buildHomeGenreThumbnailCard(cat)).join('')}
          </div>
        </div>
      </div>
    `;
  },

  localStatesList: [],

  async openLocalStateView() {
    const content = document.getElementById('content');
    if (!content) return;

    const userCountry = AppState.settings.country || 'India';
    const countryObj = (RadioData.countries || []).find(c => c.name.toLowerCase() === userCountry.toLowerCase());
    const flag = countryObj ? countryObj.flag : '🌍';

    // Immediately show curated/preset states while fetching full live list of states
    let states = RadioData.getStatesForCountry ? RadioData.getStatesForCountry(userCountry) : [];
    if (!AppState.userState && states.length) {
      AppState.userState = states[0].name;
    }
    const selectedState = AppState.userState || (states[0] ? states[0].name : userCountry);

    this.localStatesList = states;

    const renderStatesChips = (list, activeState) => {
      // Put user's current state first or keep clean order with active highlight
      const sorted = [...list].sort((a, b) => {
        if (a.name.toLowerCase() === (activeState || '').toLowerCase()) return -1;
        if (b.name.toLowerCase() === (activeState || '').toLowerCase()) return 1;
        return a.name.localeCompare(b.name);
      });
      if (!sorted.length) {
        return `<span class="state-chip active">${escapeHtml(activeState)}</span>`;
      }
      return sorted.map(st => {
        const isSelected = st.name.toLowerCase() === (activeState || '').toLowerCase();
        return `
          <button class="state-chip ${isSelected ? 'active' : ''}"
                  data-state-name="${escapeHtml(st.name.toLowerCase())}"
                  onclick="App.selectLocalState('${escapeQuotes(st.name)}')">
            <i class="fas fa-map-pin"></i>
            <span>${escapeHtml(st.name)}</span>
            ${st.stationcount ? `<small style="opacity:0.75">(${st.stationcount})</small>` : ''}
          </button>`;
      }).join('');
    };

    content.innerHTML = `
      <div class="tab-content local-states-tab">
        <div class="local-states-header">
          <button class="icon-btn back-btn" onclick="App.renderTab('home')" aria-label="Back">
            <i class="fas fa-arrow-left"></i>
          </button>
          <div class="local-states-title-wrap">
            <h2 class="list-title">${flag} ${escapeHtml(userCountry)} States</h2>
            <span class="home-section-sub">Select any state to listen to local radio channels inside it</span>
          </div>
          <span class="state-badge-count" id="statesCountBadge">${states.length || 1} States</span>
        </div>

        <div class="state-search-bar">
          <i class="fas fa-search"></i>
          <input type="text" id="localStateSearchInput"
                 placeholder="Search states in ${escapeHtml(userCountry)}…"
                 oninput="App.filterLocalStates(this.value)" />
        </div>

        <div class="state-chips-scroll" id="localStateChipsScroll">
          ${renderStatesChips(states, selectedState)}
        </div>

        <div class="state-stations-section">
          <div class="state-stations-header">
            <h3 class="row-title" id="selectedStateHeading">📻 Radios in ${escapeHtml(selectedState)}</h3>
            <span class="state-badge-count" id="stateStationsCount">Loading…</span>
          </div>
          <div id="stateStationsContainer">
            <div class="stations-list-view">${this.renderSkeletons()}</div>
          </div>
        </div>
      </div>
    `;

    // Load stations for active state right away
    this.loadStationsForState(userCountry, selectedState);

    // Fetch live list of all states in this country from Radio-Browser & merge
    if (RadioData.fetchStatesForCountry) {
      const liveStates = await RadioData.fetchStatesForCountry(userCountry);
      if (liveStates && liveStates.length) {
        this.localStatesList = liveStates;
        const chipsWrap = document.getElementById('localStateChipsScroll');
        const countBadge = document.getElementById('statesCountBadge');
        if (chipsWrap) {
          chipsWrap.innerHTML = renderStatesChips(liveStates, AppState.userState || selectedState);
          const qInput = document.getElementById('localStateSearchInput');
          if (qInput && qInput.value.trim()) this.filterLocalStates(qInput.value);
        }
        if (countBadge) {
          countBadge.textContent = `${liveStates.length} States`;
        }
      }
    }
  },

  filterLocalStates(query) {
    const q = (query || '').toLowerCase().trim();
    document.querySelectorAll('#localStateChipsScroll .state-chip').forEach(chip => {
      const name = chip.dataset.stateName || '';
      chip.style.display = (!q || name.includes(q)) ? 'inline-flex' : 'none';
    });
  },

  selectLocalState(stateName) {
    AppState.userState = stateName;
    saveState();

    document.querySelectorAll('#localStateChipsScroll .state-chip').forEach(chip => {
      const isMatch = (chip.dataset.stateName || '') === stateName.toLowerCase();
      chip.classList.toggle('active', isMatch);
    });

    const heading = document.getElementById('selectedStateHeading');
    if (heading) heading.textContent = `📻 Radios in ${stateName}`;

    const userCountry = AppState.settings.country || 'India';
    this.loadStationsForState(userCountry, stateName);
  },

  async loadStationsForState(country, stateName) {
    const container = document.getElementById('stateStationsContainer');
    const countEl = document.getElementById('stateStationsCount');
    if (!container) return;

    container.innerHTML = `<div class="stations-list-view">${this.renderSkeletons()}</div>`;
    if (countEl) countEl.textContent = 'Loading…';

    const apiCountry = RadioData.getCountryApiName ? RadioData.getCountryApiName(country) : country;
    const countryCode = RadioData.getCountryCode ? RadioData.getCountryCode(country) : '';

    // 1. Curated stations matching state/cities
    const curated = RadioData.getStationsByState ? RadioData.getStationsByState(country, stateName) : [];

    // 2. Live HTTPS stations for this state from Radio-Browser API
    let live = [];
    try {
      const res = await RadioData.fetchLiveStations({
        country: apiCountry,
        countrycode: countryCode,
        state: stateName,
        limit: 50
      });
      if (res && !res.isLocalFallback && res.stations) {
        live = res.stations;
      }
      // If strict `state` returned fewer than 5 results, also search by city/state name inside country
      if (live.length < 5) {
        const resByName = await RadioData.fetchLiveStations({
          country: apiCountry,
          countrycode: countryCode,
          query: stateName,
          limit: 30
        });
        if (resByName && !resByName.isLocalFallback && resByName.stations) {
          live = [...live, ...resByName.stations];
        }
      }
    } catch (e) {}

    // Deduplicate combined stations (curated + live)
    const seen = new Set();
    const combined = [];
    [...curated, ...live].forEach(st => {
      if (!st) return;
      const key = (st.stationuuid || st.name || '').toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      combined.push(st);
    });

    // If still empty for a small state/territory, fetch top live stations from that country as fallback note
    if (!combined.length) {
      const countryRes = await RadioData.fetchLiveStations({
        country: apiCountry,
        countrycode: countryCode,
        limit: 30
      });
      const fallbackStations = (countryRes && countryRes.stations) ? countryRes.stations : RadioData.getByCountry(country);
      AppState.stationList = fallbackStations;
      if (countEl) countEl.textContent = `${fallbackStations.length} in ${country}`;
      if (!fallbackStations.length) {
        container.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-broadcast-tower"></i>
            <p>No radio channels found for ${escapeHtml(stateName)}</p>
            <small>Try selecting another state above.</small>
          </div>`;
        return;
      }
      container.innerHTML = `
        <div class="genre-no-local-note" style="margin-bottom:12px;">
          <i class="fas fa-info-circle"></i> Showing popular ${escapeHtml(country)} radio stations (state-specific streams unavailable for ${escapeHtml(stateName)}).
        </div>
        <div class="stations-list-view">
          ${fallbackStations.map(s => buildStationCard(s)).join('')}
        </div>`;
      return;
    }

    AppState.stationList = combined;
    if (countEl) countEl.textContent = `${combined.length} radios`;

    container.innerHTML = `
      <div class="stations-list-view">
        ${combined.map(s => buildStationCard(s)).join('')}
      </div>`;
  },

  openAllGenresView() {
    this.openAllGenres();
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

  // ─── TAB 2: FAVOURITES (ONLY 2 BUTTONS: UPPER COLLECTIONS, LOWER PLAYLISTS) ──
  renderFavourites() {
    const content = document.getElementById('content');
    if (!content) return;

    // Ensure collections & playlists exist
    if (!AppState.collections || !AppState.collections.length) {
      AppState.collections = JSON.parse(JSON.stringify(DEFAULT_COLLECTIONS));
      if (AppState.favourites.length) {
        AppState.collections[0].stationIds = [...AppState.favourites];
      }
    }
    if (!AppState.playlists || !AppState.playlists.length) {
      AppState.playlists = JSON.parse(JSON.stringify(DEFAULT_PLAYLISTS));
    }

    const totalChannels = AppState.collections.reduce((acc, c) => acc + (c.stationIds || []).length, 0);
    const totalSongs = AppState.playlists.reduce((acc, p) => acc + (p.songs || []).length, 0);
    const section = AppState.favouritesSection; // null | 'collections' | 'playlists'

    // ROOT VIEW: SHOW ONLY 2 BUTTONS (UPPER: COLLECTIONS, LOWER: PLAYLISTS)
    if (!section) {
      content.innerHTML = `
        <div class="tab-content favs-tab">
          <div class="favs-tab-header">
            <h2 class="tab-heading">❤️ Favourites</h2>
          </div>

          <div class="favs-segments-stack">
            <!-- UPPER BUTTON: COLLECTIONS -->
            <button class="favs-big-button upper-btn"
                    onclick="App.openFavouritesSection('collections')"
                    title="Open Collections">
              <div class="favs-btn-icon col-icon">
                <i class="fas fa-layer-group"></i>
              </div>
              <div class="favs-btn-text">
                <span class="favs-btn-title">Collections</span>
                <span class="favs-btn-sub">${AppState.collections.length} Collections • ${totalChannels} Saved Channels</span>
              </div>
              <i class="fas fa-chevron-right favs-btn-chevron"></i>
            </button>

            <!-- LOWER BUTTON: PLAYLISTS -->
            <button class="favs-big-button lower-btn"
                    onclick="App.openFavouritesSection('playlists')"
                    title="Open Playlists">
              <div class="favs-btn-icon pl-icon">
                <i class="fas fa-list-music"></i>
              </div>
              <div class="favs-btn-text">
                <span class="favs-btn-title">Playlists</span>
                <span class="favs-btn-sub">${AppState.playlists.length} Playlists • ${totalSongs} Saved Songs</span>
              </div>
              <i class="fas fa-chevron-right favs-btn-chevron"></i>
            </button>
          </div>
        </div>
      `;
      return;
    }

    // SUB-VIEW WHEN COLLECTIONS OR PLAYLISTS IS OPENED
    const isCollections = section === 'collections';
    const showingDetail = (isCollections && AppState.activeCollectionId) || (!isCollections && AppState.activePlaylistId);

    content.innerHTML = `
      <div class="tab-content favs-tab">
        ${!showingDetail ? `
          <div class="list-header" style="margin-bottom:14px;">
            <button class="icon-btn back-btn" onclick="App.openFavouritesSection(null)" title="Back to Favourites">
              <i class="fas fa-arrow-left"></i>
            </button>
            <h2 class="list-title">${isCollections ? 'Collections' : 'Playlists'}</h2>
            <div></div>
          </div>
        ` : ''}

        <div class="favs-segment-body">
          ${isCollections ? this.renderChannelsSegment() : this.renderPlaylistsSegment()}
        </div>
      </div>
    `;
  },

  openFavouritesSection(section) {
    AppState.favouritesSection = section;
    AppState.activeCollectionId = null;
    AppState.activePlaylistId = null;
    if (section) {
      AppState.favouritesSegment = section;
    }
    saveState();
    this.renderFavourites();
  },

  switchFavouritesSegment(seg) {
    this.openFavouritesSection(seg);
  },

  renderChannelsSegment() {
    if (AppState.activeCollectionId) {
      const col = AppState.collections.find(c => c.id === AppState.activeCollectionId);
      if (!col) {
        AppState.activeCollectionId = null;
        return this.renderChannelsSegment();
      }

      const stations = (col.stationIds || [])
        .map(id => RadioData.getById(id))
        .filter(Boolean);

      AppState.stationList = stations;

      return `
        <div class="collection-detail-wrap">
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
        </div>
      `;
    }

    return `
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
    `;
  },

  renderPlaylistsSegment() {
    if (AppState.activePlaylistId) {
      const pl = AppState.playlists.find(p => p.id === AppState.activePlaylistId);
      if (!pl) {
        AppState.activePlaylistId = null;
        return this.renderPlaylistsSegment();
      }

      const songs = pl.songs || [];

      return `
        <div class="collection-detail-wrap">
          <div class="collection-detail-header">
            <button class="icon-btn back-btn" onclick="AppState.activePlaylistId=null;App.renderFavourites()" title="Back to Playlists">
              <i class="fas fa-arrow-left"></i>
            </button>
            <div class="collection-detail-title-wrap">
              <span class="col-detail-icon" style="background:${pl.color}22;color:${pl.color}">
                <i class="fas ${pl.icon || 'fa-music'}"></i>
              </span>
              <div>
                <h2 class="list-title">${pl.name}</h2>
                <span class="count-badge">${songs.length} saved songs</span>
              </div>
            </div>
            ${pl.id !== 'liked_songs' ? `
              <button class="icon-btn col-delete-header-btn" onclick="deletePlaylist('${pl.id}')" title="Delete Playlist">
                <i class="fas fa-trash-alt"></i>
              </button>
            ` : '<div></div>'}
          </div>

          ${songs.length ? `
            <div class="songs-list-view">
              ${songs.map(song => `
                <div class="song-row-item" onclick="App.connectSavedSong('spotify', '${pl.id}', '${song.id}')">
                  <img class="song-row-thumb" src="${song.thumb}" alt="${escapeQuotes(song.title)}" onerror="handleImageError(this)" />
                  <div class="song-row-meta">
                    <h4 class="song-row-title">${escapeHtml(song.title)}</h4>
                    <p class="song-row-artist"><i class="fas fa-microphone-alt"></i> ${escapeHtml(song.artist)}</p>
                    <span class="song-row-source"><i class="fas fa-broadcast-tower"></i> ${escapeHtml(song.stationName || 'Radio Station')}</span>
                  </div>
                  <div class="song-row-actions" onclick="event.stopPropagation()">
                    <button class="icon-btn song-action-btn" onclick="App.connectSavedSong('spotify', '${pl.id}', '${song.id}')" title="Play on Spotify">
                      <i class="fab fa-spotify" style="color:#1DB954"></i>
                    </button>
                    <button class="icon-btn song-action-btn" onclick="removeSongFromPlaylist('${pl.id}', '${song.id}')" title="Remove from playlist">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="empty-state">
              <i class="fas fa-music"></i>
              <p>No songs saved in "${pl.name}" yet</p>
              <small>Tap the bookmark 🔖 icon in the music player while any song is playing to save it here.</small>
              <button class="btn-primary" onclick="App.renderTab('home')">Listen to Live Radio</button>
            </div>
          `}
        </div>
      `;
    }

    return `
      <div class="collections-grid">
        ${AppState.playlists.pl ? '' : ''}
        ${AppState.playlists.map(pl => {
          const count = (pl.songs || []).length;
          const previewSongs = (pl.songs || []).slice(0, 3);

          return `
            <div class="collection-folder-card" onclick="AppState.activePlaylistId='${pl.id}';App.renderFavourites()">
              <div class="col-folder-top">
                <span class="col-folder-icon" style="background:${pl.color}22;color:${pl.color}">
                  <i class="fas ${pl.icon || 'fa-music'}"></i>
                </span>
                <span class="col-folder-count-pill">${count} songs</span>
              </div>
              <div class="col-folder-info">
                <h3 class="col-folder-title">${pl.name}</h3>
                <div class="col-folder-preview">
                  ${previewSongs.length ? previewSongs.map(s => `
                    <span class="preview-mini-pill" style="border-left:3px solid ${pl.color}">
                      ${s.title}
                    </span>
                  `).join('') : '<span class="preview-empty-text">Empty playlist</span>'}
                </div>
              </div>
              <div class="col-folder-footer">
                <span class="col-folder-view-btn">View Playlist <i class="fas fa-chevron-right"></i></span>
                ${pl.id !== 'liked_songs' ? `
                  <button class="col-folder-del-mini" onclick="event.stopPropagation();deletePlaylist('${pl.id}')" title="Delete">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}

        <!-- CREATE NEW PLAYLIST CARD -->
        <div class="collection-folder-card create-card" onclick="openNewPlaylistPrompt()">
          <div class="create-col-inner">
            <div class="create-col-icon"><i class="fas fa-plus"></i></div>
            <span class="create-col-label">New Playlist</span>
            <small class="create-col-hint">Save playing songs</small>
          </div>
        </div>
      </div>
    `;
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
                <div class="all-country-item" onclick="App.selectBrowseCountry('${escapeQuotes(c.name)}')" data-country-name="${escapeHtml(c.name.toLowerCase())}">
                  <span class="country-item-flag">${c.flag}</span>
                  <span class="country-item-name">${escapeHtml(c.name)}</span>
                  <span class="country-station-tag">${RadioData.getByCountry(c.name).length} curated</span>
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

  browseOffset: 0,
  browseStations: [],
  browseHasMore: false,

  async renderBrowseGrid(country, isAppend = false) {
    const grid = document.getElementById('browseGrid');
    if (!grid) return;

    const apiCountry = RadioData.getCountryApiName ? RadioData.getCountryApiName(country) : country;
    const countryCode = RadioData.getCountryCode ? RadioData.getCountryCode(country) : '';
    const tagFilter = (AppState.currentFilter && AppState.currentFilter.type !== 'all') ? AppState.currentFilter.type : '';

    if (!isAppend) {
      this.browseOffset = 0;
      this.browseStations = [];
      grid.innerHTML = `<div class="stations-list-view">${this.renderSkeletons()}</div>`;
    } else {
      const btn = document.getElementById('browseLoadMoreBtn');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> <span>Loading Next 50…</span>';
      }
    }

    let result = await RadioData.fetchLiveStations({
      country: apiCountry,
      tag: tagFilter,
      offset: this.browseOffset,
      limit: 50
    });

    // If territory/country name didn't match directly, retry using ISO countrycode
    if ((!result.stations || !result.stations.length) && countryCode) {
      result = await RadioData.fetchLiveStations({
        countrycode: countryCode,
        tag: tagFilter,
        offset: this.browseOffset,
        limit: 50
      });
    }

    const fetched = result.stations || [];
    if (isAppend) {
      this.browseStations.push(...fetched);
    } else {
      this.browseStations = fetched;
    }

    let stations = [...this.browseStations];
    if (AppState.currentFilter.sort === 'az') {
      stations.sort((a,b) => a.name.localeCompare(b.name));
    } else if (AppState.currentFilter.sort === 'za') {
      stations.sort((a,b) => b.name.localeCompare(a.name));
    }

    AppState.stationList = stations;
    this.browseHasMore = fetched.length >= 50;

    if (!stations.length) {
      grid.innerHTML = `<div class="empty-state"><i class="fas fa-broadcast-tower"></i><p>No live HTTPS stations found for ${escapeHtml(country)}</p></div>`;
      return;
    }

    grid.innerHTML = `
      <div class="browse-country-badge">
        <span>Live Stations in <strong>${escapeHtml(country)}</strong> — ${stations.length} channels</span>
      </div>
      <div class="stations-list-view">
        ${stations.map(s => buildStationCard(s)).join('')}
      </div>
      ${this.browseHasMore ? `
        <div class="load-more-container" style="padding-bottom:24px;">
          <button class="load-more-btn" id="browseLoadMoreBtn" onclick="App.loadMoreBrowseStations('${escapeQuotes(country)}')">
            <i class="fas fa-plus-circle"></i>
            <span>Load More Stations (+50)</span>
          </button>
        </div>
      ` : ''}`;
  },

  loadMoreBrowseStations(country) {
    this.browseOffset += 50;
    this.renderBrowseGrid(country, true);
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

  genreOffset: 0,
  genreStations: [],
  genreHasMore: false,
  activeGenreId: null,

  async renderGenreView(catId, isAppend = false) {
    const win = document.getElementById('genre-window');
    if (!win) return;

    const cat = RadioData.categories.find(c => c.id === catId) || {
      id: catId,
      name: catId.charAt(0).toUpperCase() + catId.slice(1),
      icon: 'fa-music',
      color: '#ff4757',
      desc: 'World Radio Channels'
    };

    const tagSearchMap = {
      'lo-fi': 'lofi',
      'hip-hop': 'hiphop',
      'r-and-b': 'rnb',
      'k-pop': 'kpop',
      'electronic': 'electronic'
    };
    const apiTag = tagSearchMap[catId] || catId;

    if (!isAppend) {
      this.genreOffset = 0;
      this.activeGenreId = catId;
      AppState.categoryFilter = catId;
      const curated = RadioData.getByCategory(catId);
      this.genreStations = [...curated];

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
            <span class="genre-window-count-badge" id="genreWindowCountBadge">Loading…</span>
          </div>

          <!-- SCROLLABLE DEDICATED WINDOW BODY -->
          <div class="genre-window-body">
            <!-- GENRE HERO BANNER -->
            <div class="genre-header-banner" style="background: linear-gradient(135deg, ${cat.color}28 0%, rgba(10,10,22,0.95) 100%); border-left: 4px solid ${cat.color}">
              <div class="genre-banner-content">
                <div class="genre-banner-icon" style="background:${cat.color}35; color:${cat.color}">
                  <i class="fas ${cat.icon}"></i>
                </div>
                <div class="genre-banner-meta">
                  <div class="genre-banner-topline">
                    <span class="genre-pill-tag">WORLDWIDE POPULAR</span>
                    <span class="genre-total-badge" id="genreHeroCountBadge">
                      <i class="fas fa-globe"></i> All Countries Mixed
                    </span>
                  </div>
                  <h2 class="genre-banner-name">${cat.name}</h2>
                  <p class="genre-banner-desc">${cat.desc || 'Most popular ' + cat.name + ' stations from across the world'}</p>
                </div>
              </div>
            </div>

            <!-- WORLDWIDE POPULAR STATIONS MIXED ACROSS COUNTRIES -->
            <div class="genre-all-list-section">
              <div class="row-header">
                <h3 class="row-title">🌍 Most Popular ${cat.name} Worldwide (All Countries Mix)</h3>
                <span class="section-count-pill" id="genreMixCountPill">${curated.length} loaded</span>
              </div>
              <div id="genreWorldListWrap">
                <div class="stations-list-view">
                  ${curated.length ? curated.map(s => buildStationCard(s)).join('') : this.renderSkeletons()}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      win.style.display = 'block';
      requestAnimationFrame(() => win.classList.add('open'));
    } else {
      const loadBtn = document.getElementById('genreLoadMoreBtn');
      if (loadBtn) {
        loadBtn.disabled = true;
        loadBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> <span>Loading More Popular…</span>';
      }
    }

    // Fetch most popular worldwide stations in this genre (sorted by votes, all countries mixed)
    const res = await RadioData.fetchLiveStations({
      tag: apiTag,
      offset: this.genreOffset,
      limit: 60
    });

    if (this.activeGenreId !== catId) return; // user closed/switched genre

    const fetched = (res && !res.isLocalFallback && res.stations) ? res.stations : [];
    const seen = new Set(this.genreStations.map(s => (s.stationuuid || s.name || '').toLowerCase()));

    fetched.forEach(st => {
      const key = (st.stationuuid || st.name || '').toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        this.genreStations.push(st);
      }
    });

    // Mix across countries while prioritizing popularity (round-robin country interleaving sorted by votes)
    const byVotes = [...this.genreStations].sort((a, b) => (b.votes || 0) - (a.votes || 0));
    const mixed = [];
    const buckets = new Map();
    byVotes.forEach(st => {
      const cKey = (st.country || 'Worldwide').toLowerCase();
      if (!buckets.has(cKey)) buckets.set(cKey, []);
      buckets.get(cKey).push(st);
    });
    let added = true;
    while (added) {
      added = false;
      for (const [, list] of buckets) {
        if (list.length) {
          mixed.push(list.shift());
          added = true;
        }
      }
    }

    this.genreStations = mixed;
    AppState.stationList = mixed;
    this.genreHasMore = fetched.length >= 50;

    const topBadge = document.getElementById('genreWindowCountBadge');
    const heroBadge = document.getElementById('genreHeroCountBadge');
    const mixPill = document.getElementById('genreMixCountPill');
    const listWrap = document.getElementById('genreWorldListWrap');

    const uniqueCountries = new Set(mixed.map(s => s.country).filter(Boolean)).size;
    if (topBadge) topBadge.textContent = `${mixed.length} channels`;
    if (heroBadge) heroBadge.innerHTML = `<i class="fas fa-globe"></i> ${mixed.length} Stations • ${uniqueCountries} Countries`;
    if (mixPill) mixPill.textContent = `${mixed.length} popular`;

    if (listWrap) {
      if (!mixed.length) {
        listWrap.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-broadcast-tower"></i>
            <p>No stations found in ${escapeHtml(cat.name)}</p>
            <button class="btn-primary" onclick="App.closeGenreWindow()">Close Window</button>
          </div>`;
      } else {
        listWrap.innerHTML = `
          <div class="stations-list-view">
            ${mixed.map(s => buildStationCard(s)).join('')}
          </div>
          ${this.genreHasMore ? `
            <div class="load-more-container" style="padding:16px 0 28px;">
              <button class="load-more-btn" id="genreLoadMoreBtn" onclick="App.loadMoreGenreStations('${escapeQuotes(catId)}')">
                <i class="fas fa-plus-circle"></i>
                <span>Load More Popular Stations (+60)</span>
              </button>
            </div>
          ` : ''}`;
      }
    }
  },

  loadMoreGenreStations(catId) {
    this.genreOffset += 60;
    this.renderGenreView(catId, true);
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

  connectSavedSong(appId, playlistId, songId) {
    const pl = (AppState.playlists || []).find(p => p.id === playlistId);
    if (!pl || !pl.songs) return;
    const song = pl.songs.find(s => s.id === songId);
    if (!song) return;
    Player.connectApp(appId, song.stationName || 'Radio', song.title, song.artist);
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
