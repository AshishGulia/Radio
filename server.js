import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from root directory
app.use(express.static(__dirname));

// 0. API: Public runtime configuration for Supabase client
app.get('/api/config', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.json({
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || ''
  });
});

// In-memory caches for fast, zero-delay responses
const coverCache = new Map();
const lyricsCache = new Map();
const stationsCache = new Map();

// Radio-Browser API mirrors for high availability
const RADIO_BROWSER_MIRRORS = [
  'https://de1.api.radio-browser.info',
  'https://at1.api.radio-browser.info',
  'https://nl1.api.radio-browser.info'
];

// 1. API: Radio-Browser Stations Proxy with HTTPS filtering & Pagination
app.get('/api/stations', async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || '50', 10), 100);
  const offset = parseInt(req.query.offset || '0', 10);
  const name = (req.query.name || '').trim();
  const country = (req.query.country || '').trim();
  const countrycode = (req.query.countrycode || '').trim();
  const state = (req.query.state || '').trim();
  const tag = (req.query.tag || '').trim();

  const cacheKey = `stations_${limit}_${offset}_${name.toLowerCase()}_${country.toLowerCase()}_${countrycode.toLowerCase()}_${state.toLowerCase()}_${tag.toLowerCase()}`;
  if (stationsCache.has(cacheKey)) {
    return res.json(stationsCache.get(cacheKey));
  }

  // Construct query parameters
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
    hidebroken: 'true',
    order: 'votes',
    reverse: 'true'
  });
  if (name) params.append('name', name);
  if (country && country.toLowerCase() !== 'all') params.append('country', country);
  if (countrycode) params.append('countrycode', countrycode.toUpperCase());
  if (state) params.append('state', state);
  if (tag && tag.toLowerCase() !== 'all') params.append('tag', tag);

  for (const mirror of RADIO_BROWSER_MIRRORS) {
    try {
      const url = `${mirror}/json/stations/search?${params.toString()}`;
      const response = await fetch(url, {
        headers: { 'User-Agent': 'RadioNerve/2.0' },
        signal: AbortSignal.timeout(6000)
      });
      if (response.ok) {
        const rawStations = await response.json();
        // Mixed content rule: ONLY HTTPS streams (url_resolved starts with https://)
        const httpsStations = (rawStations || []).filter(s =>
          s && typeof s.url_resolved === 'string' && s.url_resolved.startsWith('https://')
        );

        const result = {
          success: true,
          offset,
          limit,
          totalReturned: httpsStations.length,
          stations: httpsStations
        };

        stationsCache.set(cacheKey, result);
        // Expire cache after 3 minutes
        setTimeout(() => stationsCache.delete(cacheKey), 3 * 60 * 1000);

        return res.json(result);
      }
    } catch (err) {
      // Try next mirror
    }
  }

  // Fallback empty response if all mirrors fail
  return res.json({ success: false, offset, limit, stations: [], message: 'Radio-Browser mirrors unreachable' });
});

// 1b. API: Radio-Browser States List for a Country
app.get('/api/states', async (req, res) => {
  const country = (req.query.country || '').trim();
  const cacheKey = `states_${country.toLowerCase()}`;
  if (stationsCache.has(cacheKey)) {
    return res.json(stationsCache.get(cacheKey));
  }

  for (const mirror of RADIO_BROWSER_MIRRORS) {
    try {
      const url = country
        ? `${mirror}/json/states/${encodeURIComponent(country)}/`
        : `${mirror}/json/states`;
      const response = await fetch(url, {
        headers: { 'User-Agent': 'RadioNerve/2.0' },
        signal: AbortSignal.timeout(6000)
      });
      if (response.ok) {
        const rawStates = await response.json();
        const result = { success: true, country, states: rawStates || [] };
        stationsCache.set(cacheKey, result);
        setTimeout(() => stationsCache.delete(cacheKey), 10 * 60 * 1000);
        return res.json(result);
      }
    } catch (err) {
      // Try next mirror
    }
  }

  return res.json({ success: false, country, states: [] });
});

// 2. API: Live ICY Stream Metadata Poller (reads StreamTitle from stream every 12s)
app.get('/api/icy-meta', async (req, res) => {
  const streamUrl = (req.query.url || '').trim();
  if (!streamUrl || !streamUrl.startsWith('https://')) {
    return res.json({ found: false, error: 'Valid HTTPS stream url required' });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(streamUrl, {
      headers: {
        'Icy-MetaData': '1',
        'User-Agent': 'RadioNerve-ICY-Parser/2.0'
      },
      signal: controller.signal
    });

    const metaintHeader = response.headers.get('icy-metaint');
    if (!metaintHeader) {
      clearTimeout(timeoutId);
      controller.abort();
      return res.json({ found: false, reason: 'no-icy-metaint' });
    }

    const metaint = parseInt(metaintHeader, 10);
    if (!metaint || metaint <= 0 || metaint > 65536) {
      clearTimeout(timeoutId);
      controller.abort();
      return res.json({ found: false, reason: 'invalid-metaint' });
    }

    const reader = response.body.getReader();
    let total = 0;
    const chunks = [];
    while (total < metaint + 2048) {
      const { value, done } = await reader.read();
      if (done) break;
      chunks.push(value);
      total += value.length;
    }
    clearTimeout(timeoutId);
    controller.abort();

    const combined = Buffer.concat(chunks);
    if (combined.length > metaint) {
      const lenByte = combined[metaint];
      const metaLen = lenByte * 16;
      if (metaLen > 0 && combined.length >= metaint + 1 + metaLen) {
        const metaStr = combined.subarray(metaint + 1, metaint + 1 + metaLen).toString('utf8');
        const match = metaStr.match(/StreamTitle=['"](.*?)['"];/i) || metaStr.match(/StreamTitle=(.*?);/i);
        if (match && match[1]) {
          const rawTitle = match[1].trim();
          return res.json({
            found: true,
            streamTitle: rawTitle
          });
        }
      }
    }
  } catch (err) {
    clearTimeout(timeoutId);
  }

  return res.json({ found: false });
});

// 3. API: Real Song Album Cover Fetcher (via iTunes Search API with HD art)
app.get('/api/cover', async (req, res) => {
  const query = (req.query.term || '').trim();
  if (!query) return res.status(400).json({ error: 'Missing term query parameter' });

  const cacheKey = query.toLowerCase();
  if (coverCache.has(cacheKey)) {
    return res.json(coverCache.get(cacheKey));
  }

  try {
    let url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=3`;
    let response = await fetch(url);
    let data = response.ok ? await response.json() : null;

    if (!data || !data.results || data.results.length === 0) {
      const cleanTitle = query.split(',')[0].replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').trim();
      if (cleanTitle !== query) {
        url = `https://itunes.apple.com/search?term=${encodeURIComponent(cleanTitle)}&media=music&limit=3`;
        response = await fetch(url);
        data = response.ok ? await response.json() : null;
      }
    }

    if (data && data.results && data.results.length > 0) {
      const track = data.results.find(t => t.kind === 'song') || data.results[0];
      const rawArt = track.artworkUrl100 || track.artworkUrl60 || '';
      const hdArt = rawArt ? rawArt.replace(/\/[0-9]+x[0-9]+bb\.jpg$/, '/600x600bb.jpg') : '';

      const result = {
        found: true,
        thumb: hdArt || rawArt,
        trackName: track.trackName || track.collectionName,
        artistName: track.artistName,
        albumName: track.collectionName,
        releaseYear: track.releaseDate ? track.releaseDate.substring(0, 4) : ''
      };
      coverCache.set(cacheKey, result);
      return res.json(result);
    }
  } catch (err) {
    console.error('Error in /api/cover:', err.message);
  }

  return res.json({ found: false });
});

// 4. API: Real Song Lyrics Fetcher (via LRCLIB /get + /search fallback & lyrics.ovh)
app.get('/api/lyrics', async (req, res) => {
  const track = (req.query.track || '').trim();
  const artist = (req.query.artist || '').trim();
  if (!track) return res.status(400).json({ error: 'Missing track query parameter' });

  const cacheKey = `${track.toLowerCase()}___${artist.toLowerCase()}`;
  if (lyricsCache.has(cacheKey)) {
    return res.json(lyricsCache.get(cacheKey));
  }

  const cleanTrack = track.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').trim();
  const cleanArtist = artist ? artist.split(',')[0].split('&')[0].replace(/feat\..*/i, '').trim() : '';

  // 1. Try LRCLIB exact get
  try {
    const lrclibUrl = `https://lrclib.net/api/get?artist_name=${encodeURIComponent(cleanArtist)}&track_name=${encodeURIComponent(cleanTrack)}`;
    const lrclibRes = await fetch(lrclibUrl, { headers: { 'User-Agent': 'RadioNerve-Player/2.0' } });
    if (lrclibRes.ok) {
      const data = await lrclibRes.json();
      if (data && (data.plainLyrics || data.syncedLyrics)) {
        const plain = (data.plainLyrics || data.syncedLyrics.replace(/\[\d{2}:\d{2}\.\d{2,3}\]/g, '')).trim();
        const lines = plain.split('\n').map(l => l.trim()).filter(Boolean);
        const result = {
          found: true,
          source: 'lrclib-get',
          title: data.trackName || track,
          artist: data.artistName || artist,
          plainLyrics: plain,
          lines: lines
        };
        lyricsCache.set(cacheKey, result);
        return res.json(result);
      }
    }
  } catch (err) {}

  // 2. Try LRCLIB search fallback
  try {
    const searchParam = `${cleanArtist} ${cleanTrack}`.trim();
    const searchUrl = `https://lrclib.net/api/search?q=${encodeURIComponent(searchParam)}`;
    const searchRes = await fetch(searchUrl, { headers: { 'User-Agent': 'RadioNerve-Player/2.0' } });
    if (searchRes.ok) {
      const items = await searchRes.json();
      if (Array.isArray(items) && items.length > 0) {
        const best = items.find(i => i && (i.plainLyrics || i.syncedLyrics)) || items[0];
        if (best && (best.plainLyrics || best.syncedLyrics)) {
          const plain = (best.plainLyrics || best.syncedLyrics.replace(/\[\d{2}:\d{2}\.\d{2,3}\]/g, '')).trim();
          const lines = plain.split('\n').map(l => l.trim()).filter(Boolean);
          const result = {
            found: true,
            source: 'lrclib-search',
            title: best.trackName || track,
            artist: best.artistName || artist,
            plainLyrics: plain,
            lines: lines
          };
          lyricsCache.set(cacheKey, result);
          return res.json(result);
        }
      }
    }
  } catch (err) {}

  // 3. Try lyrics.ovh fallback
  if (cleanArtist) {
    try {
      const ovhUrl = `https://api.lyrics.ovh/v1/${encodeURIComponent(cleanArtist)}/${encodeURIComponent(cleanTrack)}`;
      const ovhRes = await fetch(ovhUrl);
      if (ovhRes.ok) {
        const data = await ovhRes.json();
        if (data && data.lyrics) {
          const plain = data.lyrics.trim();
          const lines = plain.split('\n').map(l => l.trim()).filter(Boolean);
          const result = {
            found: true,
            source: 'lyrics.ovh',
            title: track,
            artist: artist,
            plainLyrics: plain,
            lines: lines
          };
          lyricsCache.set(cacheKey, result);
          return res.json(result);
        }
      }
    } catch (err) {}
  }

  return res.json({ found: false });
});

// SPA fallback for non-API routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Radio Nerve server running at http://0.0.0.0:${PORT}`);
  });
}

export default app;
