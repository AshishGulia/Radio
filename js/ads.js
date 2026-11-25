// js/ads.js - Ad System Logic

const AdSystem = (() => {
  let lastAdTime = 0;
  let adCount = 0;
  let bannerInterval = null;
  let isFullscreenOpen = false;

  function getPreference() {
    return AppState.settings.adPreference;
  }

  function isPremium() {
    return AppState.settings.isPremium;
  }

  const defaultAds = [
    { id: 'b1', type: 'banner', text: '🎵 Upgrade to RadioTym Premium for uninterrupted music & zero ads!', cta: 'Go Premium', link: '#settings' },
    { id: 'b2', type: 'banner', text: '🎧 Discover top trending Hindi & Global hits right here on RadioTym.', cta: 'Explore', link: '#explore' },
    { id: 'fs1', type: 'fullscreen', title: 'RadioTym Premium', text: 'Listen to thousands of live FM stations with studio-quality audio, no ads, and custom wallpapers.', cta: 'Try Premium Free', link: '#settings' }
  ];

  function getAdsPool() {
    return (typeof RadioData !== 'undefined' && Array.isArray(RadioData.ads) && RadioData.ads.length)
      ? RadioData.ads
      : defaultAds;
  }

  function getRandomAd(type) {
    const pool = getAdsPool().filter(a => a.type === type);
    return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
  }

  function getRandomBannerAds(count) {
    const pool = getAdsPool().filter(a => a.type === 'banner');
    if (!pool.length) return [];
    const result = [];
    const used = new Set();
    while (result.length < count && result.length < pool.length) {
      const idx = Math.floor(Math.random() * pool.length);
      if (!used.has(idx)) { used.add(idx); result.push(pool[idx]); }
    }
    return result;
  }

  function renderBannerAd(ad) {
    return `
      <div class="ad-banner-inner" data-ad-id="${ad.id}">
        <span class="ad-label">Ad</span>
        <p class="ad-text">${ad.text}</p>
        <a class="ad-cta" href="${ad.link}">${ad.cta}</a>
        <button class="ad-close" onclick="AdSystem.hideBanner()">✕</button>
      </div>`;
  }

  function showBanner() {
    if (isPremium()) return;
    const pref = getPreference();
    if (pref === 'no-ads') return;

    const container = document.getElementById('ad-banner');
    if (!container) return;

    const count = pref === '2-together' ? 2 : 1;
    const ads = getRandomBannerAds(count);

    container.innerHTML = ads.map(renderBannerAd).join('');
    container.classList.add('visible');
    lastAdTime = Date.now();
    adCount++;
  }

  function hideBanner() {
    const container = document.getElementById('ad-banner');
    if (container) {
      container.classList.remove('visible');
      container.innerHTML = '';
    }
  }

  function showFullscreen() {
    if (isPremium()) return;
    if (isFullscreenOpen) return;
    const pref = getPreference();
    if (pref === 'no-ads') return;

    const ad = getRandomAd('fullscreen');
    if (!ad) return;

    const overlay = document.getElementById('ad-fullscreen');
    if (!overlay) return;

    overlay.innerHTML = `
      <div class="ad-fullscreen-inner">
        <div class="ad-fullscreen-top">
          <span class="ad-label-big">Advertisement</span>
          <button class="ad-skip" id="adSkipBtn" disabled>Skip in 5s</button>
        </div>
        <img src="${ad.image}" alt="Ad" class="ad-fullscreen-img" />
        <div class="ad-fullscreen-body">
          <p class="ad-fullscreen-text">${ad.text}</p>
          <a class="btn-primary ad-fullscreen-cta" href="${ad.link}">${ad.cta}</a>
        </div>
      </div>`;

    overlay.classList.add('visible');
    isFullscreenOpen = true;

    // Enable skip after 5 seconds
    let countdown = 5;
    const skipBtn = document.getElementById('adSkipBtn');
    const timer = setInterval(() => {
      countdown--;
      if (skipBtn) {
        if (countdown <= 0) {
          skipBtn.textContent = 'Skip Ad ✕';
          skipBtn.disabled = false;
          skipBtn.onclick = closeFullscreen;
          clearInterval(timer);
        } else {
          skipBtn.textContent = `Skip in ${countdown}s`;
        }
      } else {
        clearInterval(timer);
      }
    }, 1000);
  }

  function closeFullscreen() {
    const overlay = document.getElementById('ad-fullscreen');
    if (overlay) {
      overlay.classList.remove('visible');
      overlay.innerHTML = '';
    }
    isFullscreenOpen = false;
  }

  function shouldShowAd() {
    if (isPremium()) return false;
    const pref = getPreference();
    if (pref === 'no-ads') return false;
    if (pref === '1-per-hour') {
      return Date.now() - lastAdTime > 60 * 60 * 1000;
    }
    // '2-together' shows every 20 minutes
    return Date.now() - lastAdTime > 20 * 60 * 1000;
  }

  function tryShowAd(type = 'banner') {
    if (!shouldShowAd()) return;
    if (type === 'fullscreen') showFullscreen();
    else showBanner();
  }

  function startAdCycle() {
    if (bannerInterval) clearInterval(bannerInterval);
    if (isPremium()) return;

    // Show first banner after 2 minutes
    setTimeout(() => {
      showBanner();
    }, 2 * 60 * 1000);

    // Then cycle based on preference
    const intervalMs = getPreference() === '1-per-hour'
      ? 60 * 60 * 1000
      : 20 * 60 * 1000;

    bannerInterval = setInterval(() => {
      if (!isPremium()) showBanner();
    }, intervalMs);
  }

  function stopAdCycle() {
    if (bannerInterval) { clearInterval(bannerInterval); bannerInterval = null; }
    hideBanner();
    closeFullscreen();
  }

  function init() {
    if (!isPremium()) {
      startAdCycle();
      // Show a banner immediately on first load after short delay
      setTimeout(showBanner, 8000);
    }
  }

  return {
    init,
    showBanner,
    hideBanner,
    showFullscreen,
    closeFullscreen,
    tryShowAd,
    startAdCycle,
    stopAdCycle,
  };
})();
