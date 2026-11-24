// js/nowplaying.js - Now Playing status simulation & live song/artist tracker

const NowPlaying = (() => {
  const statuses = {};   // stationId → { status, changedAt }
  const CHANGE_INTERVAL = 3 * 60 * 1000; // 3 minutes rotation
  let listeners = [];

  function randomStatus(id) {
    // 75% chance music is playing, 15% podcast, 10% ad
    const r = Math.random();
    if (r < 0.75) return 'music';
    if (r < 0.90) return 'podcast';
    return 'ad';
  }

  function getStatus(stationId) {
    if (!statuses[stationId]) {
      statuses[stationId] = {
        status: randomStatus(stationId),
        changedAt: Date.now()
      };
    }
    const entry = statuses[stationId];
    if (Date.now() - entry.changedAt > CHANGE_INTERVAL) {
      entry.status = randomStatus(stationId);
      entry.changedAt = Date.now();
      notifyListeners(stationId, entry.status);
    }
    return entry.status;
  }

  function getIcon(status) {
    switch (status) {
      case 'music':   return '<i class="fas fa-music status-icon music"></i>';
      case 'podcast': return '<i class="fas fa-microphone status-icon podcast"></i>';
      case 'ad':      return '<i class="fas fa-video status-icon ad"></i>';
      default:        return '<i class="fas fa-music status-icon music"></i>';
    }
  }

  function getLabel(status) {
    switch (status) {
      case 'music':   return 'Music';
      case 'podcast': return 'Podcast';
      case 'ad':      return 'Ad Break';
      default:        return 'Live';
    }
  }

  function getHindiLabel(status) {
    switch (status) {
      case 'music':   return 'Music';
      case 'podcast': return 'Podcast';
      case 'ad':      return 'Ad Break';
      default:        return 'On Air';
    }
  }

  function getLiveDot(status) {
    return `<span class="live-dot ${status}"></span>`;
  }

  function getBadgeHTML(stationId) {
    const st = getStatus(stationId);
    const noteClass = st === 'music' ? 'note-green' : 'note-red';
    return `<span class="status-badge ${st}"><i class="fas fa-music row-music-note ${noteClass}"></i></span>`;
  }

  function getStatusPillHTML(stationId) {
    const st = getStatus(stationId);
    const noteClass = st === 'music' ? 'note-green' : 'note-red';
    return `<span class="player-music-status-pill ${st}"><i class="fas fa-music player-music-note ${noteClass}"></i></span>`;
  }

  function getSongInfo(stationId) {
    const data = RadioData.nowPlayingData && RadioData.nowPlayingData[stationId];
    const status = getStatus(stationId);

    const defaultMusicThumb = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80";
    const defaultPodcastThumb = "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=200&auto=format&fit=crop&q=80";
    const defaultAdThumb = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&auto=format&fit=crop&q=80";

    if (status === 'ad') {
      return {
        song: 'Commercial Sponsor Break',
        artist: 'Radio Sponsor & Ads',
        thumb: defaultAdThumb,
        status: 'ad',
        isPlayingSong: false
      };
    }
    if (status === 'podcast') {
      return {
        song: 'Live Radio Talk & Podcast',
        artist: 'RJ & Studio Guests on Air',
        thumb: defaultPodcastThumb,
        status: 'podcast',
        isPlayingSong: false
      };
    }
    if (data) {
      return {
        song: data.song,
        artist: data.artist,
        thumb: data.thumb || defaultMusicThumb,
        status: 'music',
        isPlayingSong: true
      };
    }
    return {
      song: 'Live FM Hit Music',
      artist: 'On Air Broadcast',
      thumb: defaultMusicThumb,
      status: 'music',
      isPlayingSong: true
    };
  }

  function onStatusChange(fn) {
    listeners.push(fn);
  }

  function notifyListeners(stationId, status) {
    listeners.forEach(fn => {
      try { fn(stationId, status); } catch(e) {}
    });
  }

  // Poll every 30 seconds to update time-based status shifts
  function startPolling() {
    setInterval(() => {
      Object.keys(statuses).forEach(id => {
        const entry = statuses[id];
        if (Date.now() - entry.changedAt > CHANGE_INTERVAL) {
          const prev = entry.status;
          entry.status = randomStatus(id);
          entry.changedAt = Date.now();
          if (entry.status !== prev) notifyListeners(id, entry.status);
        }
      });
    }, 30000);
  }

  startPolling();

  return {
    getStatus,
    getIcon,
    getLabel,
    getHindiLabel,
    getLiveDot,
    getBadgeHTML,
    getStatusPillHTML,
    getSongInfo,
    onStatusChange
  };
})();
