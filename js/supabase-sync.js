// js/supabase-sync.js - Optional Supabase Auth & Cloud Sync for Favourites, Collections, Playlists & Settings

const SupabaseSync = (() => {
  let client = null;
  let configured = false;
  let currentUser = null;
  let pushTimer = null;
  let isApplyingRemote = false;

  async function init() {
    try {
      const res = await fetch('/api/config', { cache: 'no-store' });
      if (!res.ok) return;
      const cfg = await res.json();
      if (!cfg || !cfg.supabaseUrl || !cfg.supabaseAnonKey) return;
      if (typeof window.supabase === 'undefined' || !window.supabase.createClient) return;

      client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
      configured = true;

      const { data } = await client.auth.getSession();
      if (data && data.session && data.session.user) {
        currentUser = data.session.user;
        await pullFromCloud();
      }

      client.auth.onAuthStateChange(async (_event, session) => {
        const nextUser = session && session.user ? session.user : null;
        const changed = (nextUser ? nextUser.id : null) !== (currentUser ? currentUser.id : null);
        currentUser = nextUser;
        if (currentUser && changed) {
          await pullFromCloud();
        }
        if (typeof Settings !== 'undefined' && document.getElementById('settings-screen')?.classList.contains('open')) {
          Settings.renderSettings();
        }
      });
    } catch (err) {
      // Fall back silently to localStorage mode
    }
  }

  function isConfigured() {
    return configured && client !== null;
  }

  function getUser() {
    return currentUser;
  }

  function buildPayload() {
    const savedStations = {};
    (AppState.favourites || []).forEach(id => {
      const st = (typeof RadioData !== 'undefined' && RadioData.getById) ? RadioData.getById(id) : null;
      if (st) savedStations[String(id)] = st;
    });

    return {
      id: currentUser.id,
      email: AppState.settings.profile.email || currentUser.email || '',
      name: AppState.settings.profile.name || '',
      phone: AppState.settings.profile.phone || '',
      country: AppState.settings.country || 'India',
      user_state: AppState.userState || 'Maharashtra',
      theme: AppState.theme || 'dark',
      wallpaper: AppState.settings.wallpaper || null,
      ad_preference: AppState.settings.adPreference || '1-per-hour',
      is_premium: Boolean(AppState.settings.isPremium),
      favourites: AppState.favourites || [],
      collections: AppState.collections || [],
      playlists: AppState.playlists || [],
      saved_stations: savedStations,
      updated_at: new Date().toISOString()
    };
  }

  async function pullFromCloud() {
    if (!isConfigured() || !currentUser) return false;
    try {
      const { data, error } = await client
        .from('user_state')
        .select('*')
        .eq('id', currentUser.id)
        .maybeSingle();

      if (error) {
        return false;
      }

      if (!data) {
        await pushToCloud();
        return true;
      }

      isApplyingRemote = true;
      try {
        if (data.saved_stations && typeof RadioData !== 'undefined' && RadioData.liveStationsMap) {
          Object.assign(RadioData.liveStationsMap, data.saved_stations);
        }
        if (Array.isArray(data.collections) && data.collections.length) {
          AppState.collections = data.collections;
        }
        if (Array.isArray(data.playlists) && data.playlists.length) {
          AppState.playlists = data.playlists;
        }
        if (Array.isArray(data.favourites)) {
          AppState.favourites = data.favourites.map(String);
        }
        if (data.user_state) AppState.userState = data.user_state;
        if (data.theme) {
          AppState.theme = data.theme;
          document.documentElement.setAttribute('data-theme', data.theme);
          const icon = document.getElementById('themeIcon');
          if (icon) icon.className = data.theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
        AppState.settings = {
          ...AppState.settings,
          country: data.country || AppState.settings.country,
          wallpaper: data.wallpaper !== undefined ? data.wallpaper : AppState.settings.wallpaper,
          adPreference: data.ad_preference || AppState.settings.adPreference,
          isPremium: typeof data.is_premium === 'boolean' ? data.is_premium : AppState.settings.isPremium,
          profile: {
            ...AppState.settings.profile,
            name: data.name || AppState.settings.profile.name,
            email: data.email || currentUser.email || AppState.settings.profile.email,
            phone: data.phone || AppState.settings.profile.phone
          }
        };

        if (typeof syncFavouritesFromCollections === 'function') {
          syncFavouritesFromCollections();
        } else if (typeof saveState === 'function') {
          saveState();
        }
        if (typeof Settings !== 'undefined' && Settings.applyWallpaper) {
          Settings.applyWallpaper(AppState.settings.wallpaper);
        }
        if (typeof App !== 'undefined' && App.renderTab) {
          App.renderTab(AppState.currentTab || 'home');
        }
      } finally {
        isApplyingRemote = false;
      }
      return true;
    } catch (err) {
      isApplyingRemote = false;
      return false;
    }
  }

  async function pushToCloud() {
    if (!isConfigured() || !currentUser || isApplyingRemote) return false;
    try {
      const payload = buildPayload();
      const { error } = await client
        .from('user_state')
        .upsert(payload, { onConflict: 'id' });
      return !error;
    } catch (err) {
      return false;
    }
  }

  function schedulePush() {
    if (!isConfigured() || !currentUser || isApplyingRemote) return;
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(() => {
      pushToCloud();
    }, 900);
  }

  async function signIn(email, password) {
    if (!isConfigured()) return { error: { message: 'Supabase not configured yet' } };
    const res = await client.auth.signInWithPassword({ email, password });
    if (!res.error && res.data?.user) {
      currentUser = res.data.user;
      await pullFromCloud();
    }
    return res;
  }

  async function signUp(email, password) {
    if (!isConfigured()) return { error: { message: 'Supabase not configured yet' } };
    const res = await client.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin }
    });
    if (!res.error && res.data?.user && res.data?.session) {
      currentUser = res.data.user;
      await pushToCloud();
    }
    return res;
  }

  async function signOut() {
    if (!isConfigured()) return;
    await client.auth.signOut();
    currentUser = null;
  }

  return {
    init,
    isConfigured,
    getUser,
    pullFromCloud,
    pushToCloud,
    schedulePush,
    signIn,
    signUp,
    signOut
  };
})();
