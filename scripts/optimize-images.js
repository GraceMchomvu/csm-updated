/**
 * Compress and resize images under assets/images for faster page loads.
 * Requires ffmpeg on PATH.
 *
 * Usage: node scripts/optimize-images.js
 */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.join(__dirname, "..", "assets", "images");
const MAX_WIDTH = 1920;
const JPEG_Q = 5; // ffmpeg mjpeg quality (2=best, 31=worst). 4-6 is a good web balance.
const EXTS = new Set([".jpg", ".jpeg", ".png"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (EXTS.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

function optimizeOne(file) {
  const ext = path.extname(file).toLowerCase();
  const tmp = file + ".opt.tmp" + (ext === ".png" ? ".png" : ".jpg");
  const before = fs.statSync(file).size;

  const args = [
    "-y",
    "-i",
    file,
    "-vf",
    `scale='min(${MAX_WIDTH},iw)':-2`,
  ];

  if (ext === ".png") {
    // Keep PNG for icons/logos with transparency; still downscale.
    args.push("-compression_level", "9", tmp);
  } else {
    args.push("-q:v", String(JPEG_Q), tmp);
  }

  const result = spawnSync("ffmpeg", args, { encoding: "utf8" });
  if (result.status !== 0 || !fs.existsSync(tmp)) {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    return {
      file,
      ok: false,
      error: (result.stderr || "").split("\n").slice(-3).join(" "),
    };
  }

  const after = fs.statSync(tmp).size;
  if (after >= before * 0.98) {
    // Not worth replacing
    fs.unlinkSync(tmp);
    return { file, ok: true, skipped: true, before, after: before };
  }

  fs.renameSync(tmp, file);
  return { file, ok: true, before, after };
}

function main() {
  if (!fs.existsSync(ROOT)) {
    console.error("Missing", ROOT);
    process.exit(1);
  }

  const files = walk(ROOT);
  let saved = 0;
  let processed = 0;

  console.log(`Optimizing ${files.length} images (max width ${MAX_WIDTH}px)...`);

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const res = optimizeOne(file);
    processed += 1;
    if (!res.ok) {
      console.log(`FAIL  ${rel}: ${res.error || "ffmpeg error"}`);
      continue;
    }
    if (res.skipped) {
      console.log(`skip  ${rel}`);
      continue;
    }
    const delta = res.before - res.after;
    saved += delta;
    console.log(
      `ok    ${rel}  ${(res.before / 1024 / 1024).toFixed(2)}MB -> ${(
        res.after /
        1024 /
        1024
      ).toFixed(2)}MB  (-${(delta / 1024 / 1024).toFixed(2)}MB)`
    );
  }

  console.log(
    `\nDone. Processed ${processed}. Saved ${(saved / 1024 / 1024).toFixed(1)} MB.`
  );
}

main();
