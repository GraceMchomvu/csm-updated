const CHANNEL_ID = "UCPZvI54-Y9RCndQ1nwMZkqQ";
const CHANNEL_URL = "https://www.youtube.com/@ogillob";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const CACHE_MS = 10 * 60 * 1000;

let cache = { at: 0, sermons: [], latestLive: null };

function decodeXml(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
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
  const entries = xml.split("<entry>").slice(1);
  return entries
    .map((entry) => {
      const id = (entry.match(/<yt:videoId>\s*([^<\s]+)\s*<\/yt:videoId>/) ||
        [])[1];
      const title = decodeXml(
        (entry.match(/<title>([^<]*)<\/title>/) || [])[1] || ""
      );
      const published =
        (entry.match(/<published>([^<]+)<\/published>/) || [])[1] || "";
      const link =
        (entry.match(/<link[^>]*href="([^"]+)"/) || [])[1] || "";
      if (!id || !title) return null;
      return buildVideo(id, title, published, link);
    })
    .filter(Boolean)
    .slice(0, 15);
}

function pickLatestService(sermons) {
  const serviceLike = sermons.find((s) =>
    /service|live|sunday|saturday|thursday|tuesday|worship|prophetic/i.test(
      s.title
    )
  );
  return serviceLike || sermons[0] || null;
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "CSM-Website/1.0" },
    redirect: "follow",
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  return res.text();
}

async function detectLiveStream() {
  try {
    const html = await fetchText(
      `https://www.youtube.com/channel/${CHANNEL_ID}/live`
    );
    const isLive =
      /"isLiveNow"\s*:\s*true/i.test(html) ||
      /"isLiveContent"\s*:\s*true/i.test(html) ||
      /hqdefault_live\.jpg/i.test(html);
    if (!isLive) return null;

    const id =
      (html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/) || [])[1] ||
      (html.match(/watch\?v=([a-zA-Z0-9_-]{11})/) || [])[1];
    if (!id) return null;

    const title = decodeXml(
      (html.match(/<title>([^<]+)<\/title>/) || [])[1] || "Live Service"
    ).replace(/ - YouTube$/, "");

    return {
      ...buildVideo(
        id,
        title,
        new Date().toISOString(),
        `https://www.youtube.com/watch?v=${id}`
      ),
      isLive: true,
    };
  } catch {
    return null;
  }
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=180",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function onRequestGet(context) {
  const channelId = context.env.YOUTUBE_CHANNEL_ID || CHANNEL_ID;
  const channelUrl = context.env.YOUTUBE_CHANNEL_URL || CHANNEL_URL;
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  try {
    const now = Date.now();
    if (!cache.sermons.length || now - cache.at > CACHE_MS) {
      const xml = await fetchText(feedUrl);
      const sermons = parseFeed(xml);
      const live = await detectLiveStream();
      cache = {
        at: now,
        sermons,
        latestLive: live || pickLatestService(sermons),
      };
    }

    return jsonResponse({
      ok: true,
      channelId,
      channelUrl,
      sermons: cache.sermons,
      latestLive: cache.latestLive,
      updatedAt: new Date(cache.at).toISOString(),
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        error: error.message,
        sermons: cache.sermons,
        latestLive: cache.latestLive,
      },
      502
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
