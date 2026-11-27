// js/settings.js - Settings, Profile, Sleep Timer, CarPlay & Music 4K Wallpapers Logic

const SleepTimer = (() => {
  let timerId = null;
  let remainingSeconds = 0;
  let totalMinutes = 0;
  let originalVolume = 0.8;
  let isFading = false;
  let fadeInterval = null;

  function start(minutes) {
    cancel();
    if (!minutes || minutes <= 0) return;

    totalMinutes = minutes;
    remainingSeconds = Math.round(minutes * 60);
    if (typeof Player !== 'undefined') {
      originalVolume = Player.getVolume();
    }

    timerId = setInterval(() => {
      remainingSeconds--;
      updateUI();

      // Gentle fade-out in final 30 seconds
      if (remainingSeconds <= 30 && !isFading && typeof Player !== 'undefined') {
        isFading = true;
        startGentleFade();
      }

      if (remainingSeconds <= 0) {
        finish();
      }
    }, 1000);

    updateUI();
    if (typeof showToast === 'function') {
      showToast(`Sleep timer set for ${minutes} minute${minutes > 1 ? 's' : ''}`, 'success');
    }
  }

  function startGentleFade() {
    let currentVol = (typeof Player !== 'undefined') ? Player.getVolume() : 0.8;
    fadeInterval = setInterval(() => {
      if (remainingSeconds <= 0 || !isFading) {
        clearInterval(fadeInterval);
        return;
      }
      currentVol = Math.max(0, currentVol - (originalVolume / 30));
      if (typeof Player !== 'undefined') {
        Player.setVolume(currentVol);
      }
    }, 1000);
  }

  function finish() {
    cancel();
    if (typeof Player !== 'undefined') {
      Player.pause();
      setTimeout(() => {
        Player.setVolume(originalVolume);
      }, 500);
    }
    if (typeof showToast === 'function') {
      showToast('Sleep timer finished. Radio turned off. Goodnight!', 'info');
    }
  }

  function cancel() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    if (fadeInterval) {
      clearInterval(fadeInterval);
      fadeInterval = null;
    }
    if (isFading && typeof Player !== 'undefined') {
      Player.setVolume(originalVolume);
    }
    isFading = false;
    remainingSeconds = 0;
    totalMinutes = 0;
    updateUI();
  }

  function isActive() {
    return timerId !== null && remainingSeconds > 0;
  }

  function getRemainingText() {
    if (!isActive()) return 'Off';
    const m = Math.floor(remainingSeconds / 60);
    const s = remainingSeconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updateUI() {
    const displayEl = document.getElementById('sleepTimerDisplay');
    if (displayEl) {
      if (isActive()) {
        displayEl.innerHTML = `
          <div class="sleep-active-box">
            <div class="sleep-active-info">
              <i class="fas fa-moon sleep-pulsing-moon"></i>
              <div>
                <strong>Active: ${getRemainingText()} remaining</strong>
                <small>Smooth fade-out to sleep</small>
              </div>
            </div>
            <button class="btn-sm btn-cancel-sleep" onclick="Settings.cancelSleepTimer()">Turn Off</button>
          </div>
        `;
      } else {
        displayEl.innerHTML = `<span class="sleep-off-label"><i class="fas fa-moon"></i> Timer is currently Off</span>`;
      }
    }

    document.querySelectorAll('.sleep-preset-pill').forEach(btn => {
      const min = parseInt(btn.dataset.min, 10);
      btn.classList.toggle('active', isActive() && totalMinutes === min);
    });
  }

  return {
    start,
    cancel,
    isActive,
    getRemainingText,
    getTotalMinutes: () => totalMinutes,
    getRemainingSeconds: () => remainingSeconds,
    updateUI
  };
})();

const Settings = (() => {

  const WALLPAPERS = {
    light: [
      {
        id: 'light_1',
        title: 'Golden Acoustic Waves',
        desc: 'Sonic acoustic warmth & golden harmony',
        thumb: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&fm=webp&q=80&w=400',
        url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&fm=webp&q=85&w=1920'
      },
      {
        id: 'light_2',
        title: 'Fluid Dance Motion',
        desc: 'Dynamic stage dance lines & pastel flow',
        thumb: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&fm=webp&q=80&w=400',
        url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&fm=webp&q=85&w=1920'
      },
      {
        id: 'light_3',
        title: 'Sunlit Melody & Piano',
        desc: 'Melodic sheet resonance & sunlit keys',
        thumb: 'https://images.unsplash.com/photo-1520523839898-507127027582?auto=format&fit=crop&fm=webp&q=80&w=400',
        url: 'https://images.unsplash.com/photo-1520523839898-507127027582?auto=format&fit=crop&fm=webp&q=85&w=1920'
      },
      {
        id: 'light_4',
        title: 'Concert Light Spectrum',
        desc: 'Festive euphoric song beams & neon energy',
        thumb: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&fm=webp&q=80&w=400',
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&fm=webp&q=85&w=1920'
      },
      {
        id: 'light_5',
        title: 'Soundwave Harmony',
        desc: 'Party beats & rhythmic audio pulse flow',
        thumb: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&fm=webp&q=80&w=400',
        url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&fm=webp&q=85&w=1920'
      }
    ],
    dark: [
      {
        id: 'dark_1',
        title: 'Neon Cyber Beats',
        desc: 'Midnight synthwave & dark audio equalizer',
        thumb: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&fm=webp&q=80&w=400',
        url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&fm=webp&q=85&w=1920'
      },
      {
        id: 'dark_2',
        title: 'Midnight Dance Silhouette',
        desc: 'Dramatic club movement & expressive choreography',
        thumb: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&fm=webp&q=80&w=400',
        url: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&fm=webp&q=85&w=1920'
      },
      {
        id: 'dark_3',
        title: 'Deep Bass Spectrum',
        desc: 'Electronic festival lasers & violet bass vibrations',
        thumb: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&fm=webp&q=80&w=400',
        url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&fm=webp&q=85&w=1920'
      },
      {
        id: 'dark_4',
        title: 'Vinyl Grooves & Soul',
        desc: 'Midnight jazz acoustics & analog warmth',
        thumb: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?auto=format&fit=crop&fm=webp&q=80&w=400',
        url: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?auto=format&fit=crop&fm=webp&q=85&w=1920'
      },
      {
        id: 'dark_5',
        title: 'Cosmic Dance Symphony',
        desc: 'Euphoric disco song visualizer & purple nebula',
        thumb: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&fm=webp&q=80&w=400',
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&fm=webp&q=85&w=1920'
      }
    ]
  };

  let activeWallpaperFolder = 'light';

  function open() {
    const screen = document.getElementById('settings-screen');
    if (!screen) return;
    screen.classList.add('open');
    if (AppState.theme === 'dark') activeWallpaperFolder = 'dark';
    renderSettings();
  }

  function close() {
    const screen = document.getElementById('settings-screen');
    if (screen) screen.classList.remove('open');
  }

  function renderSettings() {
    const screen = document.getElementById('settings-screen');
    if (!screen) return;

    const s = AppState.settings;
    const prof = s.profile;
    const avatarSrc = prof.picture
      ? prof.picture
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(prof.name || 'User')}&background=6c63ff&color=fff&size=100`;

    const countryOptions = RadioData.countries
      .map(c => `<option value="${c.name}" ${s.country === c.name ? 'selected' : ''}>${c.flag} ${c.name}</option>`)
      .join('');

    const currentWp = s.wallpaper || null;
    const wpList = WALLPAPERS[activeWallpaperFolder] || [];

    const hasCloudSync = typeof SupabaseSync !== 'undefined' && SupabaseSync.isConfigured();
    const cloudUser = hasCloudSync ? SupabaseSync.getUser() : null;
    const safeEmail = (str) => String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    screen.innerHTML = `
      <div class="settings-container">
        <div class="settings-header">
          <button class="icon-btn" onclick="Settings.close()"><i class="fas fa-arrow-left"></i></button>
          <h2>Settings</h2>
          <div></div>
        </div>

        <div class="settings-body">

          ${hasCloudSync ? `
          <!-- Cloud Account Sync Section -->
          <div class="settings-section">
            <h3 class="section-title"><i class="fas fa-cloud"></i> Cloud Account Sync</h3>
            ${cloudUser ? `
              <div class="subscription-status premium" style="margin-bottom:12px;">
                <i class="fas fa-check-circle"></i>
                <div>
                  <strong>${safeEmail(cloudUser.email)}</strong>
                  <small>Favourites, collections & playlists synced</small>
                </div>
              </div>
              <div style="display:flex;gap:10px;flex-wrap:wrap;">
                <button class="btn-primary" style="flex:1;" onclick="Settings.syncCloudNow()">Sync Now</button>
                <button class="btn-outline" style="flex:1;" onclick="Settings.cloudSignOut()">Sign Out</button>
              </div>
            ` : `
              <div class="form-group">
                <label>Email</label>
                <input type="email" id="cloudAuthEmail" class="form-input" placeholder="you@radionerve.com" />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input type="password" id="cloudAuthPassword" class="form-input" placeholder="At least 6 characters" />
              </div>
              <div style="display:flex;gap:10px;flex-wrap:wrap;">
                <button class="btn-primary" style="flex:1;" onclick="Settings.cloudSignIn()">Sign In</button>
                <button class="btn-outline" style="flex:1;" onclick="Settings.cloudSignUp()">Create Account</button>
              </div>
            `}
          </div>
          ` : ''}

          <!-- Profile Section -->
          <div class="settings-section">
            <h3 class="section-title"><i class="fas fa-user-circle"></i> Profile</h3>
            <div class="profile-avatar-wrap">
              <div class="profile-avatar" id="profileAvatar"
                   style="background-image:url('${avatarSrc}')"
                   onclick="Settings.triggerAvatarUpload()"></div>
              <button class="btn-sm" onclick="Settings.triggerAvatarUpload()">Change Photo</button>
              <input type="file" id="avatarInput" accept="image/*" style="display:none" onchange="Settings.handleAvatarChange(this)" />
            </div>
            <div class="form-group">
              <label>Name</label>
              <input type="text" id="profileName" class="form-input" value="${prof.name || ''}" placeholder="Your name" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" id="profileEmail" class="form-input" value="${prof.email || ''}" placeholder="email@example.com" />
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" id="profilePhone" class="form-input" value="${prof.phone || ''}" placeholder="+91 00000 00000" />
            </div>
            <div class="form-group">
              <label>Country (270 Countries • affects Local Radio row)</label>
              <select id="countrySelect" class="form-input form-select" onchange="Settings.onCountryChange(this.value)">
                ${countryOptions}
              </select>
            </div>
            <div class="form-group">
              <label>Your State / Region (affects Local Stations)</label>
              <input type="text" id="stateInput" list="stateSuggestionsList" class="form-input" value="${AppState.userState || ''}" placeholder="Enter or pick your state…" />
              <datalist id="stateSuggestionsList">
                ${(RadioData.getStatesForCountry ? RadioData.getStatesForCountry(s.country || 'India') : []).map(st => `<option value="${st.name}">`).join('')}
              </datalist>
            </div>
            <button class="btn-primary" onclick="Settings.saveProfile()">Save Profile</button>
          </div>

          <!-- Appearance Section -->
          <div class="settings-section">
            <h3 class="section-title"><i class="fas fa-palette"></i> Appearance</h3>
            <div class="toggle-row">
              <span>Dark Mode</span>
              <label class="toggle-switch">
                <input type="checkbox" id="themeToggle" ${AppState.theme === 'dark' ? 'checked' : ''}
                       onchange="Settings.toggleTheme(this.checked)" />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <!-- 4K Music Wallpapers Section (2 Sub-Folders: Light & Dark) -->
          <div class="settings-section wallpaper-settings-section">
            <div class="wallpaper-section-header">
              <div>
                <h3 class="section-title"><i class="fas fa-image"></i> Music Wallpapers (4K WebP)</h3>
                <p class="section-subtitle">Real music, dance & song abstract backgrounds</p>
              </div>
              <button class="btn-reset-wallpaper" onclick="Settings.setWallpaper(null)" title="Reset to Default Theme Background">
                <i class="fas fa-undo"></i> Reset
              </button>
            </div>

            <!-- 2 SUB-FOLDERS TABS: Light Wallpapers & Dark Wallpapers -->
            <div class="wallpaper-subfolder-tabs">
              <button class="wp-subfolder-tab ${activeWallpaperFolder === 'light' ? 'active' : ''}" 
                      onclick="Settings.switchWallpaperFolder('light')">
                <i class="fas fa-sun"></i> Light Wallpapers (5)
              </button>
              <button class="wp-subfolder-tab ${activeWallpaperFolder === 'dark' ? 'active' : ''}" 
                      onclick="Settings.switchWallpaperFolder('dark')">
                <i class="fas fa-moon"></i> Dark Wallpapers (5)
              </button>
            </div>

            <!-- 5 4K WEBP WALLPAPERS IN ACTIVE SUBFOLDER -->
            <div class="wallpaper-items-grid" id="wallpaperItemsGrid">
              ${wpList.map(wp => {
                const isSelected = currentWp === wp.url;
                return `
                  <div class="wp-item-card ${isSelected ? 'active' : ''}" onclick="Settings.setWallpaper('${wp.url}')">
                    <img src="${wp.thumb}" alt="${wp.title}" class="wp-card-thumb" loading="lazy" />
                    <div class="wp-card-overlay">
                      <span class="wp-card-title">${wp.title}</span>
                      <span class="wp-card-desc">${wp.desc}</span>
                    </div>
                    ${isSelected ? `<span class="wp-active-check"><i class="fas fa-check-circle"></i></span>` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- SLEEP TIMER SECTION -->
          <div class="settings-section sleep-timer-section">
            <div class="sleep-timer-header">
              <div>
                <h3 class="section-title"><i class="fas fa-bed"></i> Sleep Timer</h3>
                <p class="section-subtitle">Turns off music automatically with smooth fade-out</p>
              </div>
            </div>

            <!-- ACTIVE COUNTDOWN DISPLAY -->
            <div id="sleepTimerDisplay" class="sleep-timer-display-box">
              ${SleepTimer.isActive() ? `
                <div class="sleep-active-box">
                  <div class="sleep-active-info">
                    <i class="fas fa-moon sleep-pulsing-moon"></i>
                    <div>
                      <strong>Active: ${SleepTimer.getRemainingText()} remaining</strong>
                      <small>Smooth fade-out to sleep</small>
                    </div>
                  </div>
                  <button class="btn-sm btn-cancel-sleep" onclick="Settings.cancelSleepTimer()">Turn Off</button>
                </div>
              ` : `
                <span class="sleep-off-label"><i class="fas fa-moon"></i> Timer is currently Off</span>
              `}
            </div>

            <!-- PRESET BUTTONS (15, 30, 45, 60, 90 mins) -->
            <div class="sleep-presets-row">
              <button class="sleep-preset-pill ${SleepTimer.isActive() && SleepTimer.getTotalMinutes() === 15 ? 'active' : ''}"
                      data-min="15" onclick="Settings.setSleepTimer(15)">15 Min</button>
              <button class="sleep-preset-pill ${SleepTimer.isActive() && SleepTimer.getTotalMinutes() === 30 ? 'active' : ''}"
                      data-min="30" onclick="Settings.setSleepTimer(30)">30 Min</button>
              <button class="sleep-preset-pill ${SleepTimer.isActive() && SleepTimer.getTotalMinutes() === 45 ? 'active' : ''}"
                      data-min="45" onclick="Settings.setSleepTimer(45)">45 Min</button>
              <button class="sleep-preset-pill ${SleepTimer.isActive() && SleepTimer.getTotalMinutes() === 60 ? 'active' : ''}"
                      data-min="60" onclick="Settings.setSleepTimer(60)">60 Min</button>
              <button class="sleep-preset-pill ${SleepTimer.isActive() && SleepTimer.getTotalMinutes() === 90 ? 'active' : ''}"
                      data-min="90" onclick="Settings.setSleepTimer(90)">90 Min</button>
            </div>

            <!-- CUSTOM SLEEP TIMER INPUT -->
            <div class="sleep-custom-row">
              <input type="number" id="customSleepInput" class="form-input sleep-custom-input" min="1" max="480" placeholder="Custom mins" />
              <button class="btn-sm btn-sleep-start" onclick="Settings.setCustomSleepTimer()">Set Timer</button>
            </div>
          </div>

          <!-- CARPLAY & ANDROID AUTO SECTION -->
          <div class="settings-section carplay-settings-section">
            <div class="carplay-section-header">
              <div>
                <h3 class="section-title"><i class="fas fa-car"></i> CarPlay & Android Auto</h3>
                <p class="section-subtitle">Vehicle dashboard integration & driver safety mode</p>
              </div>
            </div>
            <div class="carplay-card-banner">
              <div class="carplay-features-list">
                <div class="car-feat-item"><i class="fas fa-check-circle"></i> <span>Steering Wheel & Knob Controls (MediaSession API)</span></div>
                <div class="car-feat-item"><i class="fas fa-check-circle"></i> <span>Car Display Track, Artist & HD Channel Artwork</span></div>
                <div class="car-feat-item"><i class="fas fa-check-circle"></i> <span>Screen Wake Lock (No Dimming While Driving)</span></div>
                <div class="car-feat-item"><i class="fas fa-check-circle"></i> <span>1-Tap Driver Preset Buttons</span></div>
              </div>
              <button class="btn-primary car-launch-btn" onclick="CarMode.open()"><i class="fas fa-car-side"></i> Launch Car Mode Now</button>
            </div>
          </div>

          <!-- Ad Preferences Section -->
          <div class="settings-section">
            <h3 class="section-title"><i class="fas fa-ad"></i> Ad Preferences</h3>
            ${s.isPremium ? `<div class="premium-badge"><i class="fas fa-crown"></i> You are on Premium – No Ads!</div>` : `
            <div class="radio-group">
              <label class="radio-opt ${s.adPreference === '2-together' ? 'active' : ''}">
                <input type="radio" name="adPref" value="2-together" ${s.adPreference === '2-together' ? 'checked' : ''}
                       onchange="Settings.setAdPref('2-together')" />
                <span class="radio-info">
                  <strong>Show 2 ads together</strong>
                  <small>Two banner ads shown at once</small>
                </span>
              </label>
              <label class="radio-opt ${s.adPreference === '1-per-hour' ? 'active' : ''}">
                <input type="radio" name="adPref" value="1-per-hour" ${s.adPreference === '1-per-hour' ? 'checked' : ''}
                       onchange="Settings.setAdPref('1-per-hour')" />
                <span class="radio-info">
                  <strong>1 ad per hour</strong>
                  <small>Minimal, once per hour</small>
                </span>
              </label>
              <label class="radio-opt ${s.adPreference === 'no-ads' ? 'active' : ''}">
                <input type="radio" name="adPref" value="no-ads" ${s.adPreference === 'no-ads' ? 'checked' : ''}
                       onchange="Settings.setAdPref('no-ads')" />
                <span class="radio-info">
                  <strong>No Ads</strong>
                  <small>₹500/year – Subscribe below</small>
                </span>
              </label>
            </div>`}
          </div>

          <!-- Subscription Section -->
          <div class="settings-section">
            <h3 class="section-title"><i class="fas fa-crown"></i> Subscription</h3>
            ${s.isPremium
              ? `<div class="subscription-status premium">
                   <i class="fas fa-check-circle"></i>
                   <div>
                     <strong>Premium Active</strong>
                     <small>No ads, all features unlocked</small>
                   </div>
                 </div>
                 <button class="btn-outline" onclick="Settings.cancelPremium()">Cancel Subscription</button>`
              : `<div class="subscription-status free">
                   <i class="fas fa-info-circle"></i>
                   <div>
                     <strong>Free Plan</strong>
                     <small>Ads supported</small>
                   </div>
                 </div>
                 <div class="premium-promo">
                   <div class="premium-promo-top">
                     <i class="fas fa-crown"></i>
                     <span>Go Premium</span>
                   </div>
                   <ul class="premium-features">
                     <li><i class="fas fa-check"></i> No ads ever</li>
                     <li><i class="fas fa-check"></i> Offline listening</li>
                     <li><i class="fas fa-check"></i> HD audio streams</li>
                     <li><i class="fas fa-check"></i> Priority support</li>
                   </ul>
                   <div class="premium-price">₹500 <span>/ year</span></div>
                   <button class="btn-primary btn-premium" onclick="Settings.subscribe()">Subscribe Now</button>
                 </div>`
            }
          </div>

          <!-- About Section -->
          <div class="settings-section">
            <h3 class="section-title"><i class="fas fa-info-circle"></i> About</h3>
            <div class="about-info">
              <div class="about-row"><span>App Name</span><span>Radio Nerve</span></div>
              <div class="about-row"><span>Version</span><span>1.0.0</span></div>
              <div class="about-row"><span>Build</span><span>2024.11</span></div>
              <div class="about-row"><span>Platform</span><span>Web</span></div>
            </div>
          </div>

        </div>
      </div>`;
  }

  function switchWallpaperFolder(folder) {
    activeWallpaperFolder = folder;
    renderSettings();
  }

  function setWallpaper(url) {
    AppState.settings.wallpaper = url;
    saveState();
    applyWallpaper(url);
    renderSettings();
    if (url) showToast('Wallpaper applied ✨', 'success');
    else showToast('Reset to default gradient', 'info');
  }

  function applyWallpaper(url) {
    let backdrop = document.getElementById('app-wallpaper-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'app-wallpaper-backdrop';
      const appEl = document.getElementById('app');
      if (appEl) appEl.insertBefore(backdrop, appEl.firstChild);
      else document.body.appendChild(backdrop);
    }

    if (url) {
      backdrop.style.backgroundImage = `url('${url}')`;
      backdrop.classList.add('active');
    } else {
      backdrop.style.backgroundImage = 'none';
      backdrop.classList.remove('active');
    }
  }

  async function onCountryChange(country) {
    const stateInput = document.getElementById('stateInput');
    const datalist = document.getElementById('stateSuggestionsList');
    if (!RadioData.fetchStatesForCountry) return;
    const states = await RadioData.fetchStatesForCountry(country);
    if (datalist) {
      datalist.innerHTML = states.map(st => `<option value="${st.name}">`).join('');
    }
    if (stateInput && states.length) {
      stateInput.value = states[0].name;
    } else if (stateInput) {
      stateInput.value = '';
    }
  }

  function saveProfile() {
    const name  = document.getElementById('profileName')?.value.trim()  || '';
    const email = document.getElementById('profileEmail')?.value.trim() || '';
    const phone = document.getElementById('profilePhone')?.value.trim() || '';
    const country = document.getElementById('countrySelect')?.value || 'India';
    const userState = document.getElementById('stateInput')?.value.trim() || '';

    AppState.settings.profile.name  = name;
    AppState.settings.profile.email = email;
    AppState.settings.profile.phone = phone;
    AppState.settings.country = country;
    if (userState) {
      AppState.userState = userState;
    } else {
      const fallbackStates = RadioData.getStatesForCountry ? RadioData.getStatesForCountry(country) : [];
      AppState.userState = fallbackStates.length ? fallbackStates[0].name : country;
    }

    saveState();
    showToast('Profile saved!', 'success');

    // Refresh active discovery/home view if country/state changed
    if (AppState.currentTab === 'browse') App.renderBrowse();
    else if (AppState.currentTab === 'home') App.renderHome();
  }

  function toggleTheme(isDark) {
    const theme = isDark ? 'dark' : 'light';
    AppState.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    saveState();
  }

  function setAdPref(pref) {
    AppState.settings.adPreference = pref;
    saveState();
    document.querySelectorAll('.radio-opt').forEach(el => el.classList.remove('active'));
    const checked = document.querySelector(`input[value="${pref}"]`)?.closest('.radio-opt');
    if (checked) checked.classList.add('active');
    AdSystem.stopAdCycle();
    if (pref !== 'no-ads') AdSystem.startAdCycle();
    else AdSystem.hideBanner();
    showToast('Ad preference updated', 'success');
  }

  function subscribe() {
    if (confirm('Subscribe to Radio Nerve Premium for ₹500/year?\n\n(Demo: press OK to activate)')) {
      AppState.settings.isPremium = true;
      AppState.settings.adPreference = 'no-ads';
      saveState();
      AdSystem.stopAdCycle();
      showToast('🎉 Welcome to Premium!', 'success');
      renderSettings();
    }
  }

  function cancelPremium() {
    if (confirm('Cancel Premium subscription?\n\nYou will lose ad-free listening.')) {
      AppState.settings.isPremium = false;
      AppState.settings.adPreference = '1-per-hour';
      saveState();
      AdSystem.startAdCycle();
      showToast('Subscription cancelled', 'info');
      renderSettings();
    }
  }

  function triggerAvatarUpload() {
    document.getElementById('avatarInput')?.click();
  }

  function handleAvatarChange(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      AppState.settings.profile.picture = e.target.result;
      saveState();
      const avatar = document.getElementById('profileAvatar');
      if (avatar) avatar.style.backgroundImage = `url('${e.target.result}')`;
      showToast('Profile photo updated', 'success');
    };
    reader.readAsDataURL(file);
  }

  function setSleepTimer(minutes) {
    SleepTimer.start(minutes);
    renderSettings();
  }

  function setCustomSleepTimer() {
    const input = document.getElementById('customSleepInput');
    if (!input) return;
    const mins = parseInt(input.value, 10);
    if (isNaN(mins) || mins <= 0) {
      showToast('Please enter valid minutes', 'error');
      return;
    }
    SleepTimer.start(mins);
    input.value = '';
    renderSettings();
  }

  function cancelSleepTimer() {
    SleepTimer.cancel();
    showToast('Sleep timer turned off', 'info');
    renderSettings();
  }

  async function cloudSignIn() {
    const email = document.getElementById('cloudAuthEmail')?.value.trim() || '';
    const password = document.getElementById('cloudAuthPassword')?.value || '';
    if (!email || !password) {
      showToast('Enter email and password', 'error');
      return;
    }
    const { error } = await SupabaseSync.signIn(email, password);
    if (error) {
      showToast(error.message || 'Sign in failed', 'error');
      return;
    }
    showToast('Signed in & synced!', 'success');
    renderSettings();
  }

  async function cloudSignUp() {
    const email = document.getElementById('cloudAuthEmail')?.value.trim() || '';
    const password = document.getElementById('cloudAuthPassword')?.value || '';
    if (!email || password.length < 6) {
      showToast('Enter email and password (min 6 chars)', 'error');
      return;
    }
    const { data, error } = await SupabaseSync.signUp(email, password);
    if (error) {
      showToast(error.message || 'Sign up failed', 'error');
      return;
    }
    if (data && !data.session) {
      showToast('Check your email to confirm your account', 'info');
    } else {
      showToast('Account created & synced!', 'success');
    }
    renderSettings();
  }

  async function cloudSignOut() {
    await SupabaseSync.signOut();
    showToast('Signed out', 'info');
    renderSettings();
  }

  async function syncCloudNow() {
    const ok = await SupabaseSync.pushToCloud();
    showToast(ok ? 'Synced to cloud' : 'Sync failed', ok ? 'success' : 'error');
  }

  return {
    open, close, renderSettings, saveProfile, onCountryChange,
    toggleTheme, setAdPref, subscribe, cancelPremium,
    triggerAvatarUpload, handleAvatarChange,
    switchWallpaperFolder, setWallpaper, applyWallpaper,
    setSleepTimer, setCustomSleepTimer, cancelSleepTimer,
    cloudSignIn, cloudSignUp, cloudSignOut, syncCloudNow,
    WALLPAPERS
  };
})();
