const https = require('https');

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCPZvI54-Y9RCndQ1nwMZkqQ';
const CHANNEL_URL = process.env.YOUTUBE_CHANNEL_URL || 'https://www.youtube.com/@ogillob';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const CACHE_MS = 10 * 60 * 1000; // refresh at most every 10 minutes

let cache = { at: 0, sermons: [], latestLive: null };

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'CSM-Website/1.0' } }, (res) => {
        if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
          return fetchText(new URL(res.headers.location, url).href).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve({ html: data, finalUrl: url, status: res.statusCode }));
      })
      .on('error', reject);
  });
}

function decodeXml(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function buildVideo(id, title, published, link) {
  const autoplayEmbed = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`;
  return {
    id,
    title,
    published,
    url: link || `https://www.youtube.com/watch?v=${id}`,
    embedUrl: `https://www.youtube.com/embed/${id}`,
    autoplayEmbedUrl: autoplayEmbed,
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  };
}

function parseFeed(xml) {
  const entries = xml.split('<entry>').slice(1);
  return entries
    .map((entry) => {
      const id = (entry.match(/<yt:videoId>\s*([^<\s]+)\s*<\/yt:videoId>/) || [])[1];
      const title = decodeXml((entry.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
      const published = (entry.match(/<published>([^<]+)<\/published>/) || [])[1] || '';
      const link = (entry.match(/<link[^>]*href="([^"]+)"/) || [])[1] || '';
      if (!id || !title) return null;
      return buildVideo(id, title, published, link);
    })
    .filter(Boolean)
    .slice(0, 15);
}

function pickLatestService(sermons) {
  const serviceLike = sermons.find((s) =>
    /service|live|sunday|saturday|thursday|tuesday|worship|prophetic/i.test(s.title)
  );
  return serviceLike || sermons[0] || null;
}

async function detectLiveStream() {
  try {
    const livePage = await fetchText(`https://www.youtube.com/channel/${CHANNEL_ID}/live`);
    const html = livePage.html || '';
    // If currently live, page usually contains isLiveContent / watching now markers and a videoId
    const isLive =
      /"isLiveNow"\s*:\s*true/i.test(html) ||
      /"isLiveContent"\s*:\s*true/i.test(html) ||
      /hqdefault_live\.jpg/i.test(html);
    if (!isLive) return null;

    const id =
      (html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/) || [])[1] ||
      (html.match(/watch\?v=([a-zA-Z0-9_-]{11})/) || [])[1];
    if (!id) return null;

    const title =
      decodeXml((html.match(/<title>([^<]+)<\/title>/) || [])[1] || 'Live Service').replace(
        / - YouTube$/,
        ''
      );

    return {
      ...buildVideo(id, title, new Date().toISOString(), `https://www.youtube.com/watch?v=${id}`),
      isLive: true,
    };
  } catch {
    return null;
  }
}

module.exports = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=180');

  try {
    const now = Date.now();
    if (!cache.sermons.length || now - cache.at > CACHE_MS) {
      const feed = await fetchText(FEED_URL);
      const sermons = parseFeed(feed.html);
      const live = await detectLiveStream();
      cache = {
        at: now,
        sermons,
        latestLive: live || pickLatestService(sermons),
      };
    }

    res.end(
      JSON.stringify({
        ok: true,
        channelId: CHANNEL_ID,
        channelUrl: CHANNEL_URL,
        sermons: cache.sermons,
        latestLive: cache.latestLive,
        updatedAt: new Date(cache.at).toISOString(),
      })
    );
  } catch (error) {
    res.statusCode = 502;
    res.end(
      JSON.stringify({
        ok: false,
        error: error.message,
        sermons: cache.sermons,
        latestLive: cache.latestLive,
      })
    );
  }
};
