// admin/js/admin-mock-data.js — fallback when API unavailable
var AdminMockData = {
  packages: [
    {
      _id: 'mock-pkg-1',
      title: 'Goa Beach Escape',
      slug: 'goa-beach-escape',
      price: 12999,
      duration: '5 Days',
      status: 'active',
      featured: true,
      images: ['../images/tour-package-img1.jpg'],
      destination: { name: 'Goa' },
      category: { name: 'Beach' },
    },
    {
      _id: 'mock-pkg-2',
      title: 'Kerala Backwaters',
      slug: 'kerala-backwaters',
      price: 18999,
      duration: '7 Days',
      status: 'inactive',
      featured: false,
      images: ['../images/tour-package-img2.jpg'],
      destination: { name: 'Kerala' },
      category: { name: 'Nature' },
    },
  ],
  destinations: [
    {
      _id: 'mock-dest-1',
      name: 'Goa',
      slug: 'goa',
      image: '../images/destination-img1.jpg',
      status: 'active',
    },
    {
      _id: 'mock-dest-2',
      name: 'Kerala',
      slug: 'kerala',
      image: '../images/destination-img2.jpg',
      status: 'active',
    },
  ],
  categories: [
    { _id: 'mock-cat-1', name: 'Adventure', slug: 'adventure', status: 'active' },
    { _id: 'mock-cat-2', name: 'Beach', slug: 'beach', status: 'active' },
  ],
  inspirations: [
    {
      _id: 'mock-insp-1',
      title: 'Top Beaches This Summer',
      slug: 'top-beaches-summer',
      location: 'Goa, India',
      excerpt: 'Discover pristine shores and crystal waters.',
      images: ['../images/blog-img1.jpg'],
      status: 'active',
    },
  ],
  guiders: [
    {
      _id: 'mock-guide-1',
      name: 'Amit Sharma',
      slug: 'amit-sharma',
      photo: '../images/tour-guide-img1.png',
      bio: 'Expert cultural tours across India.',
      status: 'active',
    },
  ],
  faqs: [
    {
      _id: 'mock-faq-1',
      question: 'What services does your travel agency provide?',
      answer: 'Hotel booking, flight booking, and customized travel packages.',
      status: 'active',
    },
    {
      _id: 'mock-faq-2',
      question: 'Do you offer customized travel packages?',
      answer: 'Yes, we tailor itineraries to your budget and interests.',
      status: 'active',
    },
  ],
  testimonials: [
    {
      _id: 'mock-test-1',
      author: 'Pooja Verma',
      title: 'Amazing Experience',
      text: 'Our trip was perfectly organized from start to finish.',
      rating: 5,
      photo: '../images/testimonial-author-img1.png',
      status: 'active',
    },
  ],
  gallery: [
    {
      _id: 'mock-gal-1',
      title: 'Sunset Beach',
      image: '../images/gallery-img1.jpg',
      category: 'homepage',
      status: 'active',
      displayOrder: 1,
    },
    {
      _id: 'mock-gal-2',
      title: 'Mountain View',
      image: '../images/gallery-img2.jpg',
      category: 'homepage',
      status: 'active',
      displayOrder: 2,
    },
  ],
};
