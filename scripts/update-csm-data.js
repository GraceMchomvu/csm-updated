const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'data.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

data.site = {
  name: 'Christ Synagogue Ministries',
  shortName: 'CSM',
  tagline: 'Helping People Find and Follow Jesus',
  location: 'Arusha, Tanzania',
  phone: '+255 769 075 062',
  phoneTel: '+255769075062',
  email: 'info@csm.church',
  facebook: 'https://web.facebook.com/Prophetbaraka.ogillo',
  tiktok: 'https://www.tiktok.com/@propheticpowertvp',
  maps: 'https://www.google.com/maps/search/?api=1&query=Arusha+Tanzania',
  prophet: 'Prophet Baraka David Ogillo',
  serviceTimes: 'Sat 2:00 PM · Sun 10:00 AM · Tue/Thu 6:00 PM EAT',
};

data.sliderOneCounter = [
  { count: 15, text: 'Years of Ministry' },
  { count: 1000, text: 'Lives Transformed' },
];

data.callToAction = {
  floatedText: 'Come Worship With Us',
  title: 'Join us this week and experience <br /> the power of God',
  button: { label: 'Plan Your Visit', url: '/contact' },
};

data.news = [
  {
    title: 'Latest Sunday Service',
    author: 'CSM',
    commentCount: '0',
    date: 'Jul 2026',
    thumbnail: '/blog/news-page-img-1.jpg',
    excerpt: "Be transformed by the teaching of God's Word from Prophet Baraka David Ogillo.",
    url: '/news-details',
  },
  {
    title: 'Latest Prophetic Ministry',
    author: 'CSM',
    commentCount: '0',
    date: 'Jul 2026',
    thumbnail: '/blog/news-page-img-2.jpg',
    excerpt: 'Receive personal prophetic words, divine guidance, and spiritual direction for your life.',
    url: '/news-details',
  },
  {
    title: 'Latest Worship Service',
    author: 'CSM',
    commentCount: '0',
    date: 'Jul 2026',
    thumbnail: '/blog/news-page-img-3.jpg',
    excerpt: 'A house alive with praise — experience dynamic worship at Christ Synagogue Ministries.',
    url: '/news-details',
  },
  {
    title: 'Prayer & Fellowship',
    author: 'CSM',
    commentCount: '0',
    date: 'Jul 2026',
    thumbnail: '/blog/news-page-img-4.jpg',
    excerpt: 'We gather throughout the week to worship, pray, and grow together in faith.',
    url: '/news-details',
  },
  {
    title: 'Testimony Moments',
    author: 'CSM',
    commentCount: '0',
    date: 'Jul 2026',
    thumbnail: '/blog/news-page-img-5.jpg',
    excerpt: 'Stories of healing, deliverance, and lives transformed by the power of the Holy Spirit.',
    url: '/news-details',
  },
  {
    title: 'Welcome Home to CSM',
    author: 'CSM',
    commentCount: '0',
    date: 'Jul 2026',
    thumbnail: '/blog/news-page-img-6.jpg',
    excerpt: 'No matter where you are on your spiritual journey, there is a place for you at CSM.',
    url: '/news-details',
  },
];

data.events = [
  { thumbnail: '/resources/events-page-img-1.jpg', title: 'Thursday Service', time: '6:00 PM EAT', date: '09 <br> Jul', url: '/events-details' },
  { thumbnail: '/resources/events-page-img-2.jpg', title: 'Saturday Service', time: '2:00 PM EAT', date: '11 <br> Jul', url: '/events-details' },
  { thumbnail: '/resources/events-page-img-3.jpg', title: 'Sunday Service', time: '10:00 AM EAT', date: '12 <br> Jul', url: '/events-details' },
  { thumbnail: '/resources/events-page-img-4.jpg', title: 'Tuesday Service', time: '6:00 PM EAT', date: '14 <br> Jul', url: '/events-details' },
  { thumbnail: '/resources/events-page-img-5.jpg', title: 'Praise & Worship', time: '10:00 AM EAT', date: '19 <br> Jul', url: '/events-details' },
  { thumbnail: '/resources/events-page-img-6.jpg', title: 'Prophetic Ministry', time: '6:00 PM EAT', date: '21 <br> Jul', url: '/events-details' },
];

data.causes = [
  {
    thumbnail: '/resources/causes-page-img-1.jpg',
    title: 'Support Weekly Worship Services',
    category: 'Worship',
    excerpt: 'Help us keep a Spirit-filled house of praise alive each week in Arusha.',
    amount: { raised: '12,500', goal: '25,000' },
    url: '/causes-details',
  },
  {
    thumbnail: '/resources/causes-page-img-2.jpg',
    title: 'Outreach & Community Care',
    category: 'Outreach',
    excerpt: 'Partner with CSM to reach families and communities with the Gospel.',
    amount: { raised: '8,400', goal: '20,000' },
    url: '/causes-details',
  },
  {
    thumbnail: '/resources/causes-page-img-3.jpg',
    title: 'Prayer & Healing Ministry',
    category: 'Ministry',
    excerpt: 'Support prayer gatherings that bring healing, deliverance, and hope.',
    amount: { raised: '6,750', goal: '15,000' },
    url: '/causes-details',
  },
  {
    thumbnail: '/resources/causes-page-img-4.jpg',
    title: 'Youth & Discipleship',
    category: 'Discipleship',
    excerpt: 'Equip the next generation to find and follow Jesus with purpose.',
    amount: { raised: '5,200', goal: '18,000' },
    url: '/causes-details',
  },
  {
    thumbnail: '/resources/causes-page-img-5.jpg',
    title: 'Prophetic Media & Sermons',
    category: 'Media',
    excerpt: 'Help share sermons and prophetic teaching beyond the church walls.',
    amount: { raised: '9,100', goal: '22,000' },
    url: '/causes-details',
  },
  {
    thumbnail: '/resources/causes-page-img-6.jpg',
    title: 'Welcome & Hospitality',
    category: 'Community',
    excerpt: 'Create a warm welcome for every visitor who walks into CSM.',
    amount: { raised: '4,800', goal: '12,000' },
    url: '/causes-details',
  },
];

data.volunteers = [
  {
    thumbnail: '/team/team-page-img-1.jpg',
    title: 'Prophet Baraka David Ogillo',
    designation: 'Founder & Senior Prophet',
    excerpt: 'Called to establish a ministry of healing, deliverance, and prophetic revelation in Arusha.',
    social: [
      { icon: 'fab fa-facebook-square', url: 'https://web.facebook.com/Prophetbaraka.ogillo' },
      { icon: 'fab fa-tiktok', url: 'https://www.tiktok.com/@propheticpowertvp' },
    ],
  },
  {
    thumbnail: '/team/team-page-img-2.jpg',
    title: 'Worship Team',
    designation: 'Praise & Worship',
    excerpt: 'Leading the house in dynamic praise and Spirit-filled worship each week.',
    social: [],
  },
  {
    thumbnail: '/team/team-page-img-3.jpg',
    title: 'Prayer Team',
    designation: 'Intercession',
    excerpt: 'Standing with families in faith for healing, breakthrough, and restoration.',
    social: [],
  },
  {
    thumbnail: '/team/team-page-img-4.jpg',
    title: 'Media Team',
    designation: 'Ministry Media',
    excerpt: 'Capturing and sharing sermons, testimonies, and moments from CSM.',
    social: [],
  },
  {
    thumbnail: '/team/team-page-img-5.jpg',
    title: 'Ushering Team',
    designation: 'Hospitality',
    excerpt: 'Welcoming every guest so they feel at home in the house of God.',
    social: [],
  },
  {
    thumbnail: '/team/team-page-img-6.jpg',
    title: 'Outreach Team',
    designation: 'Community',
    excerpt: 'Taking the Gospel beyond the walls and serving our city with love.',
    social: [],
  },
];

data.testimonials = [
  {
    thumbnail: '/testimonial/testimonial-2-img-1.png',
    excerpt:
      'I came to CSM broken and without hope. Through the prophetic ministry and the power of prayer, my life has been completely transformed. God restored my family and gave me a new purpose.',
    name: 'Sarah M.',
    designation: 'Church Member',
  },
  {
    thumbnail: '/testimonial/testimonial-2-img-2.png',
    excerpt:
      "The atmosphere at Christ Synagogue Ministries is unlike anything I've experienced. The presence of God is tangible, and the teaching has deepened my faith in ways I never imagined.",
    name: 'James K.',
    designation: 'Church Member',
  },
  {
    thumbnail: '/testimonial/testimonial-2-img-3.png',
    excerpt:
      "Prophet Ogillo's word over my life was precise and life-changing. I received healing, deliverance, and a fresh anointing. CSM is truly a place where miracles happen.",
    name: 'Grace N.',
    designation: 'Church Member',
  },
];

data.features = [
  {
    title: 'Worship',
    text: 'A house alive with praise — join us for Spirit-filled worship throughout the week.',
    icon: 'icon-heart',
    url: '/events',
    buttonLabel: 'Join Us',
  },
  {
    title: 'Prayer',
    text: 'Families gathering in faith for healing, breakthrough, and divine direction.',
    icon: 'icon-charity',
    url: '/events',
    buttonLabel: 'Pray With Us',
  },
  {
    title: 'Prophetic Ministry',
    text: 'Receive prophetic words and spiritual guidance under Prophet Baraka David Ogillo.',
    icon: 'icon-adoption',
    url: '/about',
    buttonLabel: 'Learn More',
  },
];

data.featuresTwo = [
  { title: 'Plan Your Visit', text: 'Karibu — you are welcome at CSM this week.', icon: 'icon-heart' },
  { title: 'Join a Service', text: 'Sat 2PM · Sun 10AM · Tue/Thu 6PM EAT.', icon: 'icon-adoption' },
  { title: 'Give & Partner', text: 'Support the work of Christ Synagogue Ministries.', icon: 'icon-donation-1' },
];

data.videoFeatures = [
  {
    title: 'Worship With Us',
    text: 'Experience dynamic praise and the presence of God in every service.',
    icon: 'icon-charity',
  },
  {
    title: 'Grow in Faith',
    text: 'Be transformed by the teaching of God’s Word each week.',
    icon: 'icon-generous',
  },
  {
    title: 'Find Your Purpose',
    text: 'A Spirit-filled community helping people find and follow Jesus.',
    icon: 'icon-fundraiser',
  },
];

data.blogHome = {
  sectionTitle: {
    title: 'Latest messages &amp; moments from <br> Christ Synagogue Ministries',
    subtitle: 'Powerful Word for Your Journey',
  },
  posts: [
    {
      title: 'Latest Sunday Service',
      url: '/news-details',
      date: 'Jul 2026',
      commentCount: 0,
      image: '/blog/news-one-img-1.jpg',
    },
    {
      title: 'Latest Prophetic Ministry',
      url: '/news-details',
      date: 'Jul 2026',
      commentCount: 0,
      image: '/blog/news-one-right-img-1.jpg',
    },
    {
      title: 'Latest Worship Service',
      url: '/news-details',
      date: 'Jul 2026',
      commentCount: 0,
      image: '/blog/news-one-right-img-2.jpg',
    },
    {
      title: 'Prayer & Fellowship',
      url: '/news-details',
      date: 'Jul 2026',
      commentCount: 0,
      image: '/blog/news-one-right-img-3.jpg',
    },
  ],
};

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Updated data.json with CSM content');
