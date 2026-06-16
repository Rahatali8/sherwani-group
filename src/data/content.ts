// Central, typed content store for the Sherwani Group site.
// Sections import their copy from here. Filled out per build phase.

export const site = {
  name: "Sherwani Group",
  tagline: "Driven by Vision, Defined by Excellence",
  phone: "+92 346 008 9565",
  hours: "Mon–Sun · 11AM – 8PM",
  founded: 1984,
};

export const hero = {
  titleLines: ["SHERWANI", "GROUP"] as const,
  overline: "Est. 1984 · Karachi, Pakistan",
  subheading: "Driven by Vision, Defined by Excellence",
  bottomTagline: "40 Years of Trust • Automobiles · Real Estate · Engineering",
  videos: [
    "/videos/hero-1.mp4",
    "/videos/hero-2.mp4",
    "/videos/hero-3.mp4",
  ],
};

export const about = {
  overline: "About the Group",
  heading: "Unity in Diversity, Strength in Community",
  intro:
    "What began in 1984 as Sherwani Motors — a single venture in quality vehicle trading — has grown over four decades into one of Pakistan's most trusted conglomerates, spanning automobile dealerships, real estate, engineering, e-commerce and motorsports.",
  vision:
    "To be a benchmark of trust and excellence across every industry we enter — building enduring value for our customers, partners and communities while setting new standards in quality and service.",
  mission:
    "To deliver world-class products and experiences through innovation, integrity and relentless customer focus, empowering growth that uplifts the people and the nation we serve.",
  ceo: {
    name: "Shujaat Sherwani",
    title: "CEO, Sherwani Group",
    image: "/images/textures/ceo.jpg",
  },
  featureVideo: "/videos/about-feature.mp4",
  // Cinematic text-mask reveal: footage shows through this wordmark, then the
  // surround dissolves to full video and the tagline reveals.
  revealLines: ["SHERWANI", "GROUP"] as const,
  revealTagline: ["Four Decades.", "One Vision."] as const,
  revealEst: "Est. 1984 · Karachi, Pakistan",
};

export const timeline = {
  overline: "Our Journey",
  heading: "Four Decades of Growth",
  milestones: [
    {
      year: "1984",
      title: "Sherwani Motors Founded",
      desc: "The journey begins with quality vehicle trading — the foundation of everything that followed.",
    },
    {
      year: "1994",
      title: "Suzuki 3S Dealership",
      desc: "Becomes a Suzuki 3S dealer — sales, service and spare parts under one roof.",
    },
    {
      year: "2001",
      title: "New Dealerships",
      desc: "Expands with Hyundai, Mitsubishi & KIA dealerships.",
    },
    {
      year: "2008",
      title: "Entry into Real Estate",
      desc: "Launches Sherwani Builders & Developers, entering the property market.",
    },
    {
      year: "2009",
      title: "“Elite” Dealership Award",
      desc: "Hyundai Sherwani Motors named the only Elite dealer in Karachi across the Asia Pacific region.",
    },
    {
      year: "2011",
      title: "Own Brand “Hamza”",
      desc: "Launches its own brand, debuting with a 14-seater van.",
    },
    {
      year: "2013",
      title: "Toyota & Daihatsu 3S",
      desc: "Acquires the Toyota & Daihatsu 3S dealership from Indus Motor Company.",
    },
    {
      year: "2024",
      title: "Continued Expansion",
      desc: "Growth across Toyota Highway Motors, engineering and e-commerce ventures.",
    },
  ],
};

export const diversification = {
  overline: "Diversification",
  heading: "Customer trust empowers us to expand into diverse ventures",
  companies: [
    {
      slug: "toyota-highway",
      title: "Toyota Highway Motors",
      tag: "Automobiles",
      desc: "A Toyota 3S Gold Dealership — sales, service and spare parts held to the highest global standards.",
    },
    {
      slug: "builders",
      title: "Sherwani Builders & Developers",
      tag: "Real Estate",
      desc: "Crafting premium residential and commercial developments that redefine modern living.",
    },
    {
      slug: "trv",
      title: "TRV Pakistan",
      tag: "Special Vehicles",
      desc: "The Response Vehicle — ambulances, fire vehicles and bespoke custom fabrication.",
    },
    {
      slug: "trims",
      title: "Trims.pk",
      tag: "E-Commerce",
      desc: "Automotive e-commerce — genuine parts and accessories delivered across Pakistan.",
    },
    {
      slug: "engineering",
      title: "Sherwani Engineering",
      tag: "Engineering",
      desc: "Vehicle bodies, generators and industrial machinery engineered for durability.",
    },
    {
      slug: "hub-motors",
      title: "Toyota Hub Motors",
      tag: "Automobiles",
      desc: "A new Toyota dealership extending world-class service to Balochistan.",
    },
    {
      slug: "hub-rally",
      title: "Hub Rally",
      tag: "Motorsports",
      desc: "A motorsports legacy — 11 years and running, fuelling the spirit of competition.",
    },
    {
      slug: "farms",
      title: "Sherwani Farms",
      tag: "Leisure",
      desc: "Serene farmhouses and a children's park — leisure and lifestyle reimagined.",
    },
  ],
};

export const projects = {
  overline: "Real Estate",
  heading: "Signature Developments",
  items: [
    {
      slug: "bloom-gardens",
      name: "Bloom Gardens",
      location: "Karachi",
      desc: "Ultra-luxury 4 & 5 room apartments designed for elevated, modern living.",
      image: "/images/projects/Bloom-Gardens.jpg",
    },
    {
      slug: "royal-suites",
      name: "Sherwani Royal Suites",
      location: "Karachi",
      desc: "Shops, showrooms and 4–5 room apartments complete with a gym and clubhouse.",
      image: "/images/projects/Sherwani-Royal-Suites.jpg",
    },
    {
      slug: "hub-valley",
      name: "Hub Valley Residency",
      location: "Hub, Balochistan",
      desc: "Contemporary comfort and modern living in the heart of Balochistan.",
      image: "/images/projects/Hub-Valley-Residency.jpg",
    },
    {
      slug: "address-one",
      name: "Address One",
      location: "Karachi",
      desc: "A landmark high-rise of 3 & 4 room luxury apartments on easy installments.",
      image: "/images/projects/Address-One.jpg",
    },
  ],
};

export const awards = {
  overline: "Awards",
  heading: "The Sherwani Prides",
  stats: [
    { value: 40, suffix: "+", label: "Years of Trust" },
    { value: 10, suffix: "+", label: "Companies" },
    { value: 44, suffix: "+", label: "Clients" },
  ],
  list: [
    { title: "Best Sales Award", org: "Dewan Farooq Motors", value: 5 },
    { title: "Best Sales Award", org: "Pak Suzuki Motors", value: 3 },
    { title: "Best Service Award", org: "Dewan Farooq Motors", value: 7 },
    { title: "Best Service Award", org: "Pak Suzuki Motors", value: 5 },
    { title: "Best Spare Parts Award", org: "Dewan Farooq Motors", value: 7 },
    { title: "Best Spare Parts Award", org: "Pak Suzuki Motors", value: 4 },
    {
      title: "Best in Spare Parts Sales",
      org: "Indus Motor Company",
      value: 3,
      note: "2014 · 2015 · 2016",
    },
  ] as {
    title: string;
    org: string;
    value: number;
    note?: string;
  }[],
};

// Actual logo files present in /public/images/clients (testimonials-N.jpg).
// Note: number 19 is absent; everything else from 1..44 exists.
const clientNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
  44,
];

export const clients = {
  overline: "Trusted By",
  heading: "Our Clientele",
  logos: clientNumbers.map((n) => `/images/clients/testimonials-${n}.jpg`),
};

export const contact = {
  overline: "Contact",
  heading: "Get in Touch",
  email: "info@sherwanigroup.com",
  address: "Sherwani Group, Main National Highway, Karachi, Pakistan",
  // Placeholder Google Maps embed (Toyota Highway Motors) — swap exact src later.
  mapEmbed:
    "https://www.google.com/maps?q=Toyota%20Highway%20Motors%20Karachi&output=embed",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Awards", href: "#awards" },
  { label: "Diversification", href: "#diversification" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const affiliatedCompanies = [
  { label: "Toyota Highway Motors", href: "#" },
  { label: "Toyota Hub Motors", href: "#" },
  { label: "Sherwani Engineering", href: "#" },
  { label: "TRV Pakistan", href: "#" },
  { label: "Trims.pk", href: "#" },
  { label: "Sherwani Builders", href: "#" },
  { label: "Sherwani Farms", href: "#" },
] as const;
