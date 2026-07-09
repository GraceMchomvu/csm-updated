const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'assets', 'images');
const csm = path.join(root, 'csm');

// Rotate through CSM photos for any remaining template slots
const pool = [
  'worship-service-1.jpg',
  'worship-service-2.jpg',
  'congregation.jpg',
  'congregation-1.jpg',
  'congregation-2.jpg',
  'praise-worship-1.jpg',
  'praise-worship-2.jpg',
  'prayer-service-1.jpg',
  'prayer-service-2.jpg',
  'prayer-1.jpg',
  'prayer-ministry.jpg',
  'prophet-ministry-1.jpg',
  'prophet-ministry-2.jpg',
  'prophet-ministry-3.jpg',
  'prophecy-service-1.jpg',
  'testimony.jpg',
  'testimony-1.jpg',
  'testimony-2.jpg',
  'testimony-3.jpg',
  'testimony-4.jpg',
  'testimony-5.jpg',
  'IMG_0570.jpg',
  'IMG_0812.jpg',
  'IMG_1016.jpg',
  'IMG_1527.jpg',
  'IMG_1530.jpg',
];

const map = {
  // Hero / backgrounds
  'backgrounds/main-slider-1-1.jpg': 'worship-service-1.jpg',
  'backgrounds/main-slider-2-1.jpg': 'congregation.jpg',
  'backgrounds/main-slider-3-1.jpg': 'prophet-ministry-1.jpg',
  'backgrounds/main-slider-2-2.jpg': 'praise-worship-1.jpg',
  'backgrounds/main-slider-3-2.png': 'prophet-ministry-2.jpg',
  'backgrounds/join-one-bg.jpg': 'prayer-ministry.jpg',
  'backgrounds/testimonial-1-bg.jpg': 'prayer-service-1.jpg',
  'backgrounds/help-them-bg.jpg': 'worship-service-2.jpg',
  'backgrounds/footer-bg.jpg': 'congregation-2.jpg',
  'backgrounds/page-header-bg-1-1.jpg': 'praise-worship-2.jpg',
  'backgrounds/we-inspire-bg.jpg': 'prayer-1.jpg',
  'backgrounds/news-two-bg.jpg': 'congregation-1.jpg',
  'backgrounds/counters-two-bg.jpg': 'worship-service-1.jpg',
  'backgrounds/why-choose-bg.jpg': 'prophecy-service-1.jpg',

  // About / resources
  'resources/welcome-one-img-1.jpg': 'prophet-ministry-2.jpg',
  'resources/welcome-one-img-2.jpg': 'testimony-1.jpg',
  'resources/about-page-img-1.jpg': 'prophet-ministry-3.jpg',
  'resources/introduction-img-1.jpg': 'congregation-1.jpg',
  'resources/helping-one-left-img.jpg': 'prayer-1.jpg',
  'resources/three-boxes-img-1.jpg': 'testimony.jpg',
  'resources/become-a-volunteer.jpg': 'prayer-service-2.jpg',
  'resources/help-them-two-bg.jpg': 'worship-service-1.jpg',
  'resources/help-them-two-img-1.jpg': 'prophecy-service-1.jpg',
  'resources/we-inspire-img.jpg': 'testimony-2.jpg',
  'resources/need-help-img-1.jpg': 'prayer-ministry.jpg',
  'resources/contact-page-img-1.jpg': 'congregation.jpg',
  'resources/event-details-img-1.jpg': 'praise-worship-1.jpg',
  'resources/events-one-img-1.jpg': 'worship-service-1.jpg',
  'resources/events-one-img-2.jpg': 'prayer-service-1.jpg',
  'resources/events-one-img-3.jpg': 'prophet-ministry-1.jpg',
  'resources/events-page-img-1.jpg': 'worship-service-1.jpg',
  'resources/events-page-img-2.jpg': 'prayer-service-1.jpg',
  'resources/events-page-img-3.jpg': 'prophet-ministry-1.jpg',
  'resources/events-page-img-4.jpg': 'testimony-1.jpg',
  'resources/events-page-img-5.jpg': 'congregation-1.jpg',
  'resources/events-page-img-6.jpg': 'praise-worship-2.jpg',
  'resources/four-icon-img-1.jpg': 'worship-service-1.jpg',
  'resources/four-icon-img-2.jpg': 'prayer-1.jpg',
  'resources/four-icon-img-3.jpg': 'testimony.jpg',
  'resources/four-icon-img-4.jpg': 'prophet-ministry-2.jpg',
  'resources/causes-page-img-1.jpg': 'congregation-1.jpg',
  'resources/causes-page-img-2.jpg': 'praise-worship-1.jpg',
  'resources/causes-page-img-3.jpg': 'prayer-service-1.jpg',
  'resources/causes-page-img-4.jpg': 'testimony-2.jpg',
  'resources/causes-page-img-5.jpg': 'prophet-ministry-1.jpg',
  'resources/causes-page-img-6.jpg': 'worship-service-2.jpg',
  'resources/causes-details-img.jpg': 'prophet-ministry-2.jpg',
  'resources/causes-details-images-1.jpg': 'testimony-3.jpg',
  'resources/causes-details-images-2.jpg': 'testimony-4.jpg',
  'resources/causes-details-organizar-img-1.jpg': 'prophet-ministry-3.jpg',
  'resources/recent-donation-img-1.jpg': 'IMG_0570.jpg',
  'resources/recent-donation-img-2.jpg': 'IMG_0812.jpg',
  'resources/recent-donation-img-3.jpg': 'IMG_1016.jpg',
  'resources/recent-donation-img-4.jpg': 'IMG_1527.jpg',

  // Gallery
  'gallery/gallery-page-img-1.jpg': 'congregation-1.jpg',
  'gallery/gallery-page-img-2.jpg': 'praise-worship-1.jpg',
  'gallery/gallery-page-img-3.jpg': 'prayer-service-1.jpg',
  'gallery/gallery-page-img-4.jpg': 'prophet-ministry-1.jpg',
  'gallery/gallery-page-img-5.jpg': 'testimony-1.jpg',
  'gallery/gallery-page-img-6.jpg': 'prophecy-service-1.jpg',
  'gallery/gallery-page-img-7.jpg': 'congregation-2.jpg',
  'gallery/gallery-page-img-8.jpg': 'praise-worship-2.jpg',
  'gallery/gallery-page-img-9.jpg': 'testimony-2.jpg',
  'gallery/gallery-1-1.jpg': 'worship-service-1.jpg',
  'gallery/gallery-1-2.jpg': 'prayer-ministry.jpg',
  'gallery/gallery-1-3.jpg': 'testimony-3.jpg',
  'gallery/gallery-1-4.jpg': 'prophet-ministry-2.jpg',
  'gallery/gallery-1-5.jpg': 'congregation.jpg',

  // Team
  'team/team-page-img-1.jpg': 'prophet-ministry-1.jpg',
  'team/team-page-img-2.jpg': 'prophet-ministry-2.jpg',
  'team/team-page-img-3.jpg': 'prophet-ministry-3.jpg',
  'team/team-page-img-4.jpg': 'prayer-service-2.jpg',
  'team/team-page-img-5.jpg': 'testimony-5.jpg',
  'team/team-page-img-6.jpg': 'IMG_1530.jpg',

  // Blog / news
  'blog/news-one-img-1.jpg': 'worship-service-1.jpg',
  'blog/news-one-right-img-1.jpg': 'prophet-ministry-1.jpg',
  'blog/news-one-right-img-2.jpg': 'testimony-1.jpg',
  'blog/news-one-right-img-3.jpg': 'prayer-service-1.jpg',
  'blog/news-page-img-1.jpg': 'worship-service-1.jpg',
  'blog/news-page-img-2.jpg': 'prophet-ministry-1.jpg',
  'blog/news-page-img-3.jpg': 'testimony-1.jpg',
  'blog/news-page-img-4.jpg': 'prayer-service-1.jpg',
  'blog/news-page-img-5.jpg': 'congregation-1.jpg',
  'blog/news-page-img-6.jpg': 'praise-worship-1.jpg',
  'blog/news-details-img.jpg': 'prophet-ministry-2.jpg',
  'blog/author-1-1.jpg': 'prophet-ministry-3.jpg',
  'blog/comment-1-1.jpg': 'testimony-2.jpg',
  'blog/comment-1-2.jpg': 'testimony-3.jpg',
  'blog/lp-1-1.jpg': 'worship-service-2.jpg',
  'blog/lp-1-2.jpg': 'prayer-1.jpg',
  'blog/lp-1-3.jpg': 'testimony-4.jpg',

  // Testimonials
  'testimonial/testimonial-2-img-1.png': 'testimony-1.jpg',
  'testimonial/testimonial-2-img-2.png': 'testimony-2.jpg',
  'testimonial/testimonial-2-img-3.png': 'testimony-3.jpg',
};

const tinyPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO5nN7kAAAAASUVORK5CYII=',
  'base64'
);

const placeholders = [
  'resources/logo-1.png',
  'resources/logo-2.png',
  'resources/logo-3.png',
  'resources/welcome-one-heart-icon.png',
  'resources/help-them-two__donation-icon.png',
  'resources/causes-details-download-icon.png',
  'resources/brand-1-3.png',
  'shapes/main-slider-1-shape-1.png',
  'shapes/main-slider-3-shape-1.png',
];

function copy(srcName, destRel) {
  const src = path.join(csm, srcName);
  const dest = path.join(root, destRel);
  if (!fs.existsSync(src)) {
    console.log('MISSING SOURCE', srcName, 'for', destRel);
    return false;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  // If dest is .png but source is jpg, also keep as-is (browsers still render via webpack file-loader)
  console.log('OK', destRel);
  return true;
}

let i = 0;
for (const [dest, src] of Object.entries(map)) {
  if (!copy(src, dest)) {
    copy(pool[i % pool.length], dest);
    i++;
  }
}

for (const p of placeholders) {
  const dest = path.join(root, p);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (p.includes('logo')) {
    // Use ministry photo as temporary logo mark
    fs.copyFileSync(path.join(csm, 'prophet-ministry-1.jpg'), dest);
    console.log('LOGO', p);
  } else {
    fs.writeFileSync(dest, tinyPng);
    console.log('ICON', p);
  }
}

console.log('Mapped', Object.keys(map).length, 'photo slots from CSM.');
