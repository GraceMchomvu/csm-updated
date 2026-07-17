/**
 * Apply Cloudflare Security Insights fixes for csm.church.
 *
 * Requires CLOUDFLARE_API_TOKEN with Zone:DNS Edit, Zone:Settings Edit,
 * and Zone:Bot Management Edit (or Account Cloudflare Workers / Zone permissions).
 *
 * Usage (PowerShell):
 *   $env:CLOUDFLARE_API_TOKEN = "your-token"
 *   node scripts/fix-csm-cloudflare-security.js
 *
 * Fixes:
 *  - Always Use HTTPS
 *  - HSTS (edge certificates)
 *  - Bot Fight Mode
 *  - AI Labyrinth (crawler_protection)
 *  - DMARC TXT record (_dmarc)
 *  - Security.txt (managed via Cloudflare if available; site file also shipped in static/)
 */

const DOMAIN = "csm.church";
const API = "https://api.cloudflare.com/client/v4";
const DMARC_VALUE =
  "v=DMARC1; p=none; rua=mailto:info@csm.church; ruf=mailto:info@csm.church; fo=1; adkim=r; aspf=r";

async function cf(path, { method = "GET", body } = {}) {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token) {
    throw new Error(
      "Set CLOUDFLARE_API_TOKEN first. Create one at https://dash.cloudflare.com/profile/api-tokens"
    );
  }
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!json.success) {
    const msg = (json.errors || [])
      .map((e) => e.message)
      .join("; ");
    throw new Error(`${method} ${path} failed: ${msg || res.status}`);
  }
  return json.result;
}

function log(ok, label, detail = "") {
  const mark = ok ? "OK" : "SKIP";
  console.log(`[${mark}] ${label}${detail ? ` — ${detail}` : ""}`);
}

async function main() {
  console.log(`\nFixing Cloudflare security settings for ${DOMAIN}...\n`);

  const zones = await cf(`/zones?name=${DOMAIN}`);
  const zone = zones[0];
  if (!zone) throw new Error(`Zone not found for ${DOMAIN}`);
  const zoneId = zone.id;
  console.log(`Zone: ${zone.name} (${zoneId})\n`);

  // 1) Always Use HTTPS
  try {
    await cf(`/zones/${zoneId}/settings/always_use_https`, {
      method: "PATCH",
      body: { value: "on" },
    });
    log(true, "Always Use HTTPS enabled");
  } catch (e) {
    log(false, "Always Use HTTPS", e.message);
  }

  // 2) HSTS (edge)
  try {
    await cf(`/zones/${zoneId}/settings/security_header`, {
      method: "PATCH",
      body: {
        value: {
          strict_transport_security: {
            enabled: true,
            max_age: 31536000,
            include_subdomains: true,
            preload: true,
            nosniff: true,
          },
        },
      },
    });
    log(true, "HSTS enabled (1 year, includeSubDomains, preload)");
  } catch (e) {
    log(false, "HSTS", e.message);
  }

  // 3) Bot Fight Mode + AI Labyrinth
  try {
    await cf(`/zones/${zoneId}/bot_management`, {
      method: "PUT",
      body: {
        fight_mode: true,
        crawler_protection: "enabled",
      },
    });
    log(true, "Bot Fight Mode + AI Labyrinth enabled");
  } catch (e) {
    // Free plans sometimes use a different endpoint / partial support
    try {
      await cf(`/zones/${zoneId}/settings/bot_fight_mode`, {
        method: "PATCH",
        body: { value: "on" },
      });
      log(true, "Bot Fight Mode enabled (settings API)");
    } catch (e2) {
      log(false, "Bot Fight Mode / AI Labyrinth", `${e.message}; ${e2.message}`);
    }
  }

  // 4) DMARC DNS record
  try {
    const existing = await cf(
      `/zones/${zoneId}/dns_records?type=TXT&name=_dmarc.${DOMAIN}`
    );
    if (existing.length) {
      const rec = existing[0];
      const content = (rec.content || "").replace(/^"|"$/g, "");
      if (content.includes("v=DMARC1")) {
        log(true, "DMARC already present", content);
      } else {
        await cf(`/zones/${zoneId}/dns_records/${rec.id}`, {
          method: "PATCH",
          body: {
            type: "TXT",
            name: `_dmarc.${DOMAIN}`,
            content: DMARC_VALUE,
            ttl: 3600,
          },
        });
        log(true, "DMARC TXT updated", DMARC_VALUE);
      }
    } else {
      await cf(`/zones/${zoneId}/dns_records`, {
        method: "POST",
        body: {
          type: "TXT",
          name: `_dmarc.${DOMAIN}`,
          content: DMARC_VALUE,
          ttl: 3600,
        },
      });
      log(true, "DMARC TXT created", DMARC_VALUE);
    }
  } catch (e) {
    log(false, "DMARC", e.message);
  }

  console.log(`
Done.

Also deploy the site so these static files go live:
  - /.well-known/security.txt
  - Strict-Transport-Security in _headers

After DNS propagates, verify:
  nslookup -type=TXT _dmarc.csm.church
  curl.exe -sI http://csm.church   (should 301 to https)
  curl.exe -sI https://www.csm.church | findstr Strict
`);
}

main().catch((err) => {
  console.error("\nFailed:", err.message);
  process.exit(1);
});
