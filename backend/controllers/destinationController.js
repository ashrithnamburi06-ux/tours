// backend/controllers/destinationController.js
const asyncHandler = require('express-async-handler');
const Destination = require('../models/destinationModel');
const Category = require('../models/categoryModel');
const Package = require('../models/packageModel');
const Guider = require('../models/guiderModel');
const Inspiration = require('../models/inspirationModel');
const FAQ = require('../models/faqModel');
const slugify = require('../utils/slugify');
const { publicListFilter } = require('../middleware/optionalAuthMiddleware');

// Seed Database with Indian-only compliant data
const seedDestinationsAndPackages = asyncHandler(async (req, res) => {
  const categoriesData = [
    { name: 'Adventure Tour', description: 'Trekking, hiking, and active exploration in India.' },
    { name: 'Beach Escape', description: 'Sun, sand, and tropical shores of coastal India.' },
    { name: 'Mountain Holiday', description: 'Cool hill stations and majestic Himalayan valleys.' },
    { name: 'Heritage Tour', description: 'Majestic forts, palaces, and historic monuments of India.' },
    { name: 'Spiritual Circuit', description: 'Sacred pilgrimages and majestic temple towns.' },
    { name: 'Honeymoon Special', description: 'Romantic getaways tailored for couples in India.' }
  ];

  const destinationsData = [
    { name: 'Goa', state: 'Goa', description: "India's premier beach destination, with sun, sand, and historic churches.", image: 'images/destination-img1.jpg' },
    { name: 'Kerala', state: 'Kerala', description: "God's Own Country, famous for its tranquil backwaters, beaches, and lush greenery.", image: 'images/destination-img2.jpg' },
    { name: 'Kashmir', state: 'Jammu & Kashmir', description: "Paradise on Earth, known for its snow-capped peaks, houseboats on Dal Lake, and royal gardens.", image: 'images/destination-img3.jpg' },
    { name: 'Rajasthan', state: 'Rajasthan', description: "Land of Kings, featuring majestic forts, royal palaces, and vibrant desert culture.", image: 'images/destination-img4.jpg' },
    { name: 'Shimla', state: 'Himachal Pradesh', description: "Beautiful hill station and former summer capital of British India, with colonial architecture.", image: 'images/destination-img5.jpg' },
    { name: 'Manali', state: 'Himachal Pradesh', description: "Adventure capital of India, perfect for skiing, trekking, and scenic paragliding.", image: 'images/destination-img6.jpg' },
    { name: 'Munnar', state: 'Kerala', description: "Picturesque town famous for its sprawling tea plantations, mountain streams, and mist-covered hills.", image: 'images/destination-img7.jpg' },
    { name: 'Ooty', state: 'Tamil Nadu', description: "The Queen of Hill Stations, known for its lush tea gardens, botanical gardens, and toy train.", image: 'images/destination4-img1.jpg' },
    { name: 'Ladakh', state: 'Ladakh', description: "The land of high passes, pristine high-altitude lakes, and beautiful Buddhist monasteries.", image: 'images/destination4-img2.jpg' },
    { name: 'Coorg', state: 'Karnataka', description: "The Scotland of India, famous for coffee plantations, waterfalls, and mist-shrouded hills.", image: 'images/destination4-img3.jpg' },
    { name: 'Andaman', state: 'Andaman & Nicobar Islands', description: "Stunning tropical islands with white-sand beaches, active marine life, and historic cellular spots.", image: 'images/tour-package-img10.jpg' },
    { name: 'Hyderabad', state: 'Telangana', description: "City of Pearls, blends historical sites like Charminar with modern high-tech centers.", image: 'images/tour-package-img11.jpg' },
    { name: 'Tirupati', state: 'Andhra Pradesh', description: "Highly sacred spiritual town housing the world-famous Lord Venkateswara Temple.", image: 'images/tour-package-img12.jpg' },
    { name: 'Mysore', state: 'Karnataka', description: "Heritage city famous for the majestic Mysore Palace, silk, and rich royal traditions.", image: 'images/tour-package-img13.jpg' }
  ];

  const packagesData = [
    {
      title: 'Goa Beach Escape',
      description: 'Unwind on the golden sands of Calangute and Baga beach. Experience thrilling water sports, explore historic Portuguese churches, and enjoy beautiful sunset cruises along the Mandovi River.',
      price: 349,
      duration: '4 Days / 3 Nights',
      images: ['images/tour-package-img1.jpg'],
      destSlug: 'goa',
      catSlug: 'beach-escape',
      featured: true
    },
    {
      title: 'Kerala Backwaters & Houseboat Cruise',
      description: 'Sail through palm-fringed backwaters of Alleppey in a traditional luxury Kettuvallam. Wander through Munnar\'s sprawling tea gardens and experience Kathakali cultural performances.',
      price: 499,
      duration: '5 Days / 4 Nights',
      images: ['images/tour-package-img2.jpg'],
      destSlug: 'kerala',
      catSlug: 'honeymoon-special',
      featured: true
    },
    {
      title: 'Kashmir Paradise & Shikara Luxury',
      description: 'Cruise on the tranquil waters of Dal Lake in a classic Shikara. Wander through beautiful Mughal Gardens, experience snow paragliding in Gulmarg, and enjoy serene Alpine valleys of Pahalgam.',
      price: 649,
      duration: '6 Days / 5 Nights',
      images: ['images/tour-package-img3.jpg'],
      destSlug: 'kashmir',
      catSlug: 'mountain-holiday',
      featured: true
    },
    {
      title: 'Heritage Golden Triangle Tour',
      description: 'Journey through India\'s rich history. Explore the historic lanes of Old Delhi, stand in awe before the majestic Taj Mahal in Agra, and discover the royal Pink City forts of Jaipur.',
      price: 599,
      duration: '5 Days / 4 Nights',
      images: ['images/tour-package-img4.jpg'],
      destSlug: 'rajasthan',
      catSlug: 'heritage-tour',
      featured: true
    },
    {
      title: 'Rajasthan Heritage & Desert Safari',
      description: 'Explore majestic forts and palaces in Jaipur, Jodhpur, and Udaipur. Stay in heritage Havelis, witness cultural folk dances, and enjoy sunset camel safaris over the dunes of Jaisalmer.',
      price: 799,
      duration: '7 Days / 6 Nights',
      images: ['images/tour-package-img5.jpg'],
      destSlug: 'rajasthan',
      catSlug: 'heritage-tour',
      featured: false
    },
    {
      title: 'Andaman Exotic Honeymoon Escape',
      description: 'Indulge in romantic sunset walks on Radhanagar Beach (Asia\'s finest). Experience premium sea walks, scuba diving in Havelock, and explore historic landmarks with candle-lit beachside dinners.',
      price: 899,
      duration: '6 Days / 5 Nights',
      images: ['images/tour-package-img6.jpg'],
      destSlug: 'andaman',
      catSlug: 'honeymoon-special',
      featured: true
    },
    {
      title: 'Hyderabad Heritage & Nizami Cuisine Tour',
      description: 'Immerse yourself in history at Golconda Fort, the royal Chowmahalla Palace, and the legendary Charminar. Savor authentic world-famous Hyderabadi Biryani and shopping at Laad Bazaar.',
      price: 299,
      duration: '3 Days / 2 Nights',
      images: ['images/tour-package-img7.jpg'],
      destSlug: 'hyderabad',
      catSlug: 'heritage-tour',
      featured: false
    },
    {
      title: 'South India Temple Tour',
      description: 'A spiritual pilgrimage covering the grand temples of Tirupati, Madurai, and Rameswaram.',
      price: 449,
      duration: '4 Days / 3 Nights',
      images: ['images/tour-package-img8.jpg'],
      destSlug: 'tirupati',
      catSlug: 'spiritual-circuit',
      featured: false
    }
  ];

  const guidersData = [
    { name: 'Amit Sharma', bio: '10+ years exploring Northern India circuits, specializing in Kashmir trekking and history.', photo: 'images/tour-guide-img1.png', socialLinks: { facebook: '#', linkedin: '#' } },
    { name: 'Rajesh Kumar', bio: 'Local expert in Rajasthani culture, heritage forts, and desert expeditions.', photo: 'images/tour-guide-img2.png', socialLinks: { facebook: '#', linkedin: '#' } },
    { name: 'Priya Patel', bio: 'Southern India naturalist and guide specializing in Kerala eco-tourism.', photo: 'images/tour-guide-img3.png', socialLinks: { facebook: '#', linkedin: '#' } }
  ];

  const inspirationsData = [
    { title: 'Serene Kerala Backwater Houseboat Cruise', excerpt: 'Unwind in a luxury houseboat sailing through palm-fringed canals.', content: 'Full details of cruising Alleppey in God\'s own country.', location: 'Kerala', date: new Date(), images: ['images/blog-img1.jpg'] },
    { title: 'Historical Tour of the Taj Mahal', excerpt: 'Learn the secrets and love story of the world\'s most beautiful monument.', content: 'Full historical breakdown of the Taj Mahal in Agra.', location: 'Agra, Uttar Pradesh', date: new Date(), images: ['images/blog-img2.jpg'] },
    { title: 'Apple Orchards in Shimla and Manali', excerpt: 'A fresh mountain holiday picking sweet apples in Himachal Pradesh.', content: 'Detailing travel trails in Himachal Pradesh during fruit harvest.', location: 'Himachal Pradesh', date: new Date(), images: ['images/blog-img3.jpg'] },
    { title: 'Trekking the Majestic Trails of Ladakh', excerpt: 'A thrill-seeking journey through high altitude desert valleys and passes.', content: 'A complete trek guide across Ladakh trails.', location: 'Ladakh', date: new Date(), images: ['images/blog-img4.jpg'] }
  ];

  const faqsData = [
    { question: 'Do I need special inner line permits?', answer: 'Yes, Inner Line Permits (ILP) are required for domestic tourists visiting restricted borders such as Ladakh, Lakshadweep, and parts of the Northeast.', category: 'Permits' },
    { question: 'Are digital payments widely accepted?', answer: 'Yes, UPI (Unified Payments Interface) services like GPay, PhonePe, and Paytm are widely accepted throughout India, even by street vendors, though carrying some cash is recommended.', category: 'Payments' },
    { question: 'What is the best time to visit South India?', answer: 'The winter season from October to March is the ideal time to visit, as the weather is cool, dry, and extremely pleasant.', category: 'Weather' }
  ];

  console.log('API Seeder triggered: Wiping old legacy collections...');
  await Category.deleteMany({});
  await Destination.deleteMany({});
  await Package.deleteMany({});
  await Guider.deleteMany({});
  await Inspiration.deleteMany({});
  await FAQ.deleteMany({});

  console.log('API Seeder: Seeding Categories...');
  const seededCategories = [];
  for (const cat of categoriesData) {
    cat.slug = slugify(cat.name);
    const doc = await Category.create(cat);
    seededCategories.push(doc);
  }

  console.log('API Seeder: Seeding Destinations...');
  const seededDestinations = [];
  for (const dest of destinationsData) {
    dest.slug = slugify(dest.name);
    const doc = await Destination.create(dest);
    seededDestinations.push(doc);
  }

  const getCatId = (slug) => seededCategories.find(c => c.slug === slug)?._id;
  const getDestId = (slug) => seededDestinations.find(d => d.slug === slug)?._id;

  console.log('API Seeder: Seeding Packages...');
  for (const pkg of packagesData) {
    pkg.slug = slugify(pkg.title);
    pkg.category = getCatId(pkg.catSlug);
    pkg.destination = getDestId(pkg.destSlug);
    delete pkg.catSlug;
    delete pkg.destSlug;
    await Package.create(pkg);
  }

  console.log('API Seeder: Seeding Guiders...');
  for (const guider of guidersData) {
    guider.slug = slugify(guider.name);
    await Guider.create(guider);
  }

  console.log('API Seeder: Seeding Inspirations...');
  for (const ins of inspirationsData) {
    ins.slug = slugify(ins.title);
    await Inspiration.create(ins);
  }

  console.log('API Seeder: Seeding FAQs...');
  for (const faq of faqsData) {
    await FAQ.create(faq);
  }

  console.log('API Seeder: Database seeded successfully!');
  res.status(201).json({ success: true, message: 'Database seeded successfully with domestic-only data!' });
});

// Create a new destination (admin only)
const createDestination = asyncHandler(async (req, res) => {
  const { name, state, description, image } = req.body;
  const slug = slugify(name);
  const dest = new Destination({ name, slug, state, description, image });
  const created = await dest.save();
  res.status(201).json({ success: true, data: created });
});

// Get all destinations (active public; all when admin + ?all=true)
const getAllDestinations = asyncHandler(async (req, res) => {
  const destinations = await Destination.find(publicListFilter(req));
  res.json({ success: true, data: destinations });
});

// Get destination by ID or Slug
const getDestinationById = asyncHandler(async (req, res) => {
  const idOrSlug = req.params.id;
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);
  
  let dest;
  if (isObjectId) {
    dest = await Destination.findById(idOrSlug);
  } else {
    dest = await Destination.findOne({ slug: idOrSlug });
  }

  if (!dest) {
    res.status(404);
    throw new Error('Destination not found');
  }
  res.json({ success: true, data: dest });
});

// Update destination (admin only)
const updateDestination = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (name) req.body.slug = slugify(name);
  const updated = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) {
    res.status(404);
    throw new Error('Destination not found');
  }
  res.json({ success: true, data: updated });
});

// Delete destination (admin only)
const deleteDestination = asyncHandler(async (req, res) => {
  const dest = await Destination.findById(req.params.id);
  if (!dest) {
    res.status(404);
    throw new Error('Destination not found');
  }
  await dest.deleteOne();
  res.json({ success: true, data: { message: 'Destination removed' } });
});

// Change status (admin only)
const changeStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const updated = await Destination.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!updated) {
    res.status(404);
    throw new Error('Destination not found');
  }
  res.json({ success: true, data: updated });
});

module.exports = {
  seedDestinationsAndPackages,
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
  changeStatus,
};
