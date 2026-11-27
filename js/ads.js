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
    { id: 'b1', type: 'banner', text: '🎵 Upgrade to Radio Nerve Premium for uninterrupted music & zero ads!', cta: 'Go Premium', link: '#settings' },
    { id: 'b2', type: 'banner', text: '🎧 Discover top trending Hindi & Global hits right here on Radio Nerve.', cta: 'Explore', link: '#explore' },
    { id: 'fs1', type: 'fullscreen', title: 'Radio Nerve Premium', text: 'Listen to thousands of live FM stations with studio-quality audio, no ads, and custom wallpapers.', cta: 'Try Premium Free', link: '#settings' }
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
    // Redirect all popup/fullscreen ads to lower ribbon banner
    showBanner();
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
      showBanner();
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
