const DEFAULT_CHANNEL_ID = "UCPZvI54-Y9RCndQ1nwMZkqQ";
const DEFAULT_CHANNEL_URL = "https://www.youtube.com/@ogillob";
const CACHE_MS = 10 * 60 * 1000;
const ALLOWED_ORIGINS = new Set([
  "https://www.csm.church",
  "https://csm.church",
]);

let cache = { at: 0, sermons: [], latestLive: null, channelId: "" };

function isValidChannelId(id) {
  return typeof id === "string" && /^UC[A-Za-z0-9_-]{22}$/.test(id);
}

function isValidVideoId(id) {
  return typeof id === "string" && /^[A-Za-z0-9_-]{11}$/.test(id);
}

function decodeXml(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function buildVideo(id, title, published, link) {
  if (!isValidVideoId(id)) return null;
  const autoplayEmbed = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`;
  const safeLink =
    typeof link === "string" &&
    link.startsWith("https://www.youtube.com/watch?v=")
      ? link
      : `https://www.youtube.com/watch?v=${id}`;
  return {
    id,
    title,
    published,
    url: safeLink,
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
    throw new Error(`HTTP ${res.status}`);
  }
  return res.text();
}

async function detectLiveStream(channelId) {
  try {
    const html = await fetchText(
      `https://www.youtube.com/channel/${channelId}/live`
    );
    const isLive =
      /"isLiveNow"\s*:\s*true/i.test(html) ||
      /"isLiveContent"\s*:\s*true/i.test(html) ||
      /hqdefault_live\.jpg/i.test(html);
    if (!isLive) return null;

    const id =
      (html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/) || [])[1] ||
      (html.match(/watch\?v=([a-zA-Z0-9_-]{11})/) || [])[1];
    if (!isValidVideoId(id)) return null;

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

function corsOrigin(request) {
  const origin = request.headers.get("Origin");
  if (origin && ALLOWED_ORIGINS.has(origin)) return origin;
  return "https://www.csm.church";
}

function jsonResponse(request, body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=180",
      "X-Content-Type-Options": "nosniff",
      "Access-Control-Allow-Origin": corsOrigin(request),
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      Vary: "Origin",
    },
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const channelId = isValidChannelId(env.YOUTUBE_CHANNEL_ID)
    ? env.YOUTUBE_CHANNEL_ID
    : DEFAULT_CHANNEL_ID;
  const channelUrl =
    typeof env.YOUTUBE_CHANNEL_URL === "string" &&
    env.YOUTUBE_CHANNEL_URL.startsWith("https://www.youtube.com/")
      ? env.YOUTUBE_CHANNEL_URL
      : DEFAULT_CHANNEL_URL;
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  try {
    const now = Date.now();
    if (
      !cache.sermons.length ||
      cache.channelId !== channelId ||
      now - cache.at > CACHE_MS
    ) {
      const xml = await fetchText(feedUrl);
      const sermons = parseFeed(xml);
      const live = await detectLiveStream(channelId);
      cache = {
        at: now,
        channelId,
        sermons,
        latestLive: live || pickLatestService(sermons),
      };
    }

    return jsonResponse(request, {
      ok: true,
      channelId,
      channelUrl,
      sermons: cache.sermons,
      latestLive: cache.latestLive,
      updatedAt: new Date(cache.at).toISOString(),
    });
  } catch {
    return jsonResponse(
      request,
      {
        ok: false,
        error: "Upstream unavailable",
        sermons: cache.sermons,
        latestLive: cache.latestLive,
      },
      502
    );
  }
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": corsOrigin(context.request),
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin",
    },
  });
}
