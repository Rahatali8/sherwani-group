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
      page: "/our-relations/sherwani-builders/bloom-gardens",
    },
    {
      slug: "royal-suites",
      name: "Sherwani Royal Suites",
      location: "Karachi",
      desc: "Shops, showrooms and 4–5 room apartments complete with a gym and clubhouse.",
      image: "/images/projects/Sherwani-Royal-Suites.jpg",
      page: "/our-relations/sherwani-builders/sherwani-royal-suites",
    },
    {
      slug: "hub-valley",
      name: "Hub Valley Residency",
      location: "Hub, Balochistan",
      desc: "Contemporary comfort and modern living in the heart of Balochistan.",
      image: "/images/projects/Hub-Valley-Residency.jpg",
      page: "/our-relations/sherwani-builders/hub-valley",
    },
    {
      slug: "address-one",
      name: "Address One",
      location: "Karachi",
      desc: "A landmark high-rise of 3 & 4 room luxury apartments on easy installments.",
      image: "/images/projects/Address-One.jpg",
      page: "/our-relations/sherwani-builders/address-one",
    },
  ] as {
    slug: string;
    name: string;
    location: string;
    desc: string;
    image: string;
    page?: string;
  }[],
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

// "Our Relations" page — Zentry-style scroll-to-select showcase of the group's
// affiliated companies. Left = names, right = visual that follows the scroll.
export const relations = {
  overline: "Sherwani Builders",
  heading: "The companies that move us forward",
  hint: "Scroll to explore",
  items: [
    {
      name: "Bloom Gardens",
      sector: "Sherwani Builders",
      desc: "Ultra-luxury 4 & 5 room apartments designed for elevated, modern living.",
      image: "/images/projects/Bloom-Gardens.jpg",
      href: "#",
      page:"/our-relations/sherwani-builders/bloom-gardens",
    },
    {
      name: "Sherwani Royal Suites",
      sector: "Sherwani Builders",
      desc: "Shop ,showrooms and 4–5 room apartments complete with a gym and clubhouse.",
      image: "/images/projects/Sherwani-Royal-Suites.jpg",
      href: "#",
      page:"/our-relations/sherwani-builders/sherwani-royal-suites",
    },
    {
      name: "Hub Valley Residency",
      sector: "Sherwani Builders",
      desc: "Contemporary comfrot and modern living in the heart of Balochistan.",
      image: "/images/projects/Hub-Valley-Residency.jpg",
      href: "#",
      page:"/our-relations/sherwani-builders/hub-valley-residency",
    },
     {
       name: "Address One",
       sector: "Sherwani Builders",
       desc: "A landmark high-rise of 3 & 4 room luxury apartments on easy installments.",
       image: "/images/projects/Address-One.jpg",
       href: "#",
       page:"/our-relations/sherwani-builders/address-one",
     },
    // {
    //   name: "Trims.pk",
    //   sector: "E-Commerce",
    //   desc: "Automotive e-commerce — genuine parts and accessories delivered across Pakistan.",
    //   image: "/images/relations/trims.jpg",
    //   href: "#",
    // },
    // {
    //   name: "Sherwani Builders & Developers",
    //   sector: "Real Estate",
    //   desc: "Crafting premium residential and commercial developments that redefine modern living.",
    //   image: "/images/projects/event-builders.jpg",
    //   href: "#",
    //   page: "/our-relations/sherwani-builders",
    // },
    // {
    //   name: "Sherwani Farms",
    //   sector: "Leisure",
    //   desc: "Serene farmhouses and a children's park — leisure and lifestyle reimagined.",
    //   image: "/images/relations/farms.jpg",
    //   href: "#",
    // },
  ],
};

// Dedicated company page: Sherwani Builders & Developers (real estate arm).
export const buildersPage = {
  name: "Sherwani Builders & Developers",
  overline: "Real Estate · Est. 2008",
  tagline: "Pioneering Excellence in Real Estate",
  heroImage: "/images/projects/Bloom-Gardens.jpg",
  intro:
    "In 2008, the Sherwani Group carried four decades of trust into real estate — founding Sherwani Builders & Developers to build not just structures, but communities designed for generations.",
  about: [
    "Sherwani Builders & Developers designs and constructs residential communities and luxury housing projects that blend striking architecture with the comforts of modern urban living. Every development is shaped around how families actually live — light, space, security and shared amenities at its heart.",
    "Backed by the renowned Sherwani Group's reputation for fair dealing and uncompromising quality, the company has delivered landmark addresses across Karachi and Balochistan — from green, low-rise enclaves to high-rise luxury suites with clubhouses, gyms and ample parking.",
  ],
  stats: [
    { value: 2008, suffix: "", label: "Established" },
    { value: 4, suffix: "+", label: "Signature Projects" },
    { value: 11, suffix: "", label: "Floors at Royal Suites" },
    { value: 100, suffix: "%", label: "Commitment to Quality" },
  ],
  services: [
    {
      title: "Residential Development",
      desc: "Master-planned communities and apartment projects engineered for comfortable, secure family living.",
    },
    {
      title: "Luxury High-Rises",
      desc: "Air-conditioned 4 & 5 room suites with clubhouses, gyms and structured parking — turnkey luxury.",
    },
    {
      title: "Architecture & Design",
      desc: "Distinctive façades and thoughtful interiors with high-end finishes and modern conveniences.",
    },
    {
      title: "Community Planning",
      desc: "Green spaces, landscaping and shared amenities that build a sense of belonging, not just buildings.",
    },
  ],
  contact: {
    phone: "+92 346 008 9565",
    hours: "Mon–Sun · 11AM – 8PM",
  },
};

// Shared shape for a Sherwani Builders project page (Bloom Gardens, Royal Suites…)
export type ProjectData = {
  slug: string;
  name: string;
  overline: string;
  heroSubtitle: string;
  heroImage: string;
  youtubeId: string;
  paymentHref: string;
  about: { overline: string; heading: string; body: string; image: string };
  interiors: { title: string; tagline: string; image: string }[];
  amenities: string[];
  payment: {
    note: string;
    units: string[];
    rows: { phase: string; detail: string }[];
    pricingImage?: string;
    sizeImage?: string;
    /** Extra labelled documents (overrides pricing/size when provided). */
    docs?: { src: string; label: string }[];
  };
  contact: {
    phone: string;
    hours: string;
    address: string;
    mapEmbed: string;
    interestedOptions: string[];
  };
};

// Dedicated project page: Bloom Gardens (a Sherwani Builders development).
const BG = "/images/projects/blomegarden-assets";
export const bloomGardens: ProjectData = {
  slug: "bloom-gardens",
  paymentHref: "/our-relations/sherwani-builders/bloom-gardens/payment-schedule",
  name: "Bloom Gardens",
  overline: "Sherwani Builders · Karachi",
  heroSubtitle: "Discover your home, where dreams unfold.",
  heroImage: "/images/projects/Bloom-Gardens.jpg",
  youtubeId: "hK04MBDIK-0",
  about: {
    overline: "Welcome to Your Oasis of Comfort",
    heading: "Introducing Bloom Gardens",
    body: "Bloom Gardens, an epitome of luxury living, unveils its stunning collection of 4 and 5-room ultra-luxurious apartments tailored exclusively for the discerning community. Nestled within lush greenery and meticulously designed landscapes, this prestigious project redefines upscale living with its exquisite attention to detail and unparalleled amenities. Each apartment is crafted to perfection, boasting spacious interiors adorned with high-end finishes and modern conveniences — offering residents the ultimate blend of comfort and sophistication.",
    image: `${BG}/gallery-1.jpg`,
  },
  interiors: [
    {
      title: "Drawing Room",
      tagline: "Welcome to your elegant haven of comfort and style.",
      image: `${BG}/Drawing.jpg`,
    },
    {
      title: "Living Room",
      tagline: "Where urban sophistication meets cozy relaxation.",
      image: `${BG}/Living.jpg`,
    },
    {
      title: "Bedroom",
      tagline: "Escape to urban elegance — where comfort meets sophistication.",
      image: `${BG}/Bedroom.jpg`,
    },
    {
      title: "Dining",
      tagline: "Savor moments of elegance and togetherness in style.",
      image: `${BG}/Dining.jpg`,
    },
    {
      title: "Bathroom",
      tagline: "Indulge in luxury and tranquility in your private sanctuary.",
      image: `${BG}/Bathroom.jpg`,
    },
  ],
  amenities: [
    "gallery-1",
    "gallery-2",
    "gallery-3",
    "gallery-4",
    "gallery-5",
    "gallery-6",
    "gallery-7",
    "gallery-9",
    "gallery-12",
  ].map((n) => `${BG}/${n}.jpg`),
  payment: {
    note: "Flexible, easy-installment plans tailored to you. Explore the full payment plan and unit layouts below, or contact our team for the latest availability.",
    units: ["4 Room Apartments", "5 Room Apartments", "Shops", "Showrooms"],
    rows: [
      { phase: "Booking", detail: "At the time of application" },
      { phase: "Down Payment", detail: "On confirmation of allotment" },
      { phase: "Monthly Installments", detail: "Spread over the construction period" },
      { phase: "On Possession", detail: "Final payment at handover" },
    ],
    pricingImage: `${BG}/pricing.png`,
    sizeImage: `${BG}/size.png`,
  },
  contact: {
    phone: "+92 346 008 9565",
    hours: "Mon–Sun · 11AM – 8PM",
    address:
      "Falaknaz Bloom Gardens, Sector 8-B, Gulzar-e-Hijri, Scheme 33, Karachi",
    mapEmbed:
      "https://www.google.com/maps?q=Falaknaz%20Bloom%20Gardens%20Karachi&output=embed",
    interestedOptions: [
      "4 Room Apartment",
      "5 Room Apartment",
      "Shops",
      "Showrooms",
    ],
  },
};

// Dedicated project page: Sherwani Royal Suites.
const RS = "/images/projects/royal-suite";
export const royalSuites: ProjectData = {
  slug: "royal-suites",
  name: "Sherwani Royal Suites",
  overline: "Sherwani Builders · Karachi",
  heroSubtitle: "A sanctuary of sophistication and comfort.",
  heroImage: "/images/projects/Sherwani-Royal-Suites.jpg",
  youtubeId: "sWnivNopcvE",
  paymentHref:
    "/our-relations/sherwani-builders/sherwani-royal-suites/payment-schedule",
  about: {
    overline: "Elevate Living & Commerce — Your Ideal Spaces, Reimagined",
    heading: "Introducing Sherwani Royal Suites",
    body: "Sherwani Royal Suites is a distinguished real estate project that seamlessly blends luxury with functionality. Rising as a ground-plus-11 development, it brings together shops, showrooms and thoughtfully designed 4 and 5-room air-conditioned apartments — complete with ample parking, a well-equipped gym and an exclusive clubhouse. Every detail is meticulously crafted to redefine your living experience.",
    image: `${RS}/gallery-1.jpg`,
  },
  interiors: [
    {
      title: "Drawing Room",
      tagline: "An artistic retreat, styled to impress.",
      image: `${RS}/Drawing.jpg`,
    },
    {
      title: "Bedroom",
      tagline: "Indulge in opulence and restful calm.",
      image: `${RS}/Bedroom.jpg`,
    },
    {
      title: "Bathroom",
      tagline: "Unwind in luxury, your private sanctuary.",
      image: `${RS}/Bathroom.jpg`,
    },
    {
      title: "Kitchen",
      tagline: "Culinary elegance, made for the everyday.",
      image: `${RS}/Kitchen.jpg`,
    },
    {
      title: "Dining",
      tagline: "Elevate every meal, together in style.",
      image: `${RS}/Dining.jpg`,
    },
    {
      title: "Terrace",
      tagline: "Serenity with a view above the city.",
      image: `${RS}/Terrace.jpg`,
    },
  ],
  amenities: [
    "gallery-1",
    "gallery-2",
    "gallery-3",
    "gallery-4",
    "gallery-5",
    "gallery-6",
    "gallery-7",
    "gallery-8",
  ].map((n) => `${RS}/${n}.jpg`),
  payment: {
    note: "Flexible, easy-installment plans across apartments, shops and showrooms. Contact our team for the latest pricing, unit layouts and availability.",
    units: ["4 Room Apartments", "5 Room Apartments", "Shops", "Showrooms"],
    rows: [
      { phase: "Booking", detail: "At the time of application" },
      { phase: "Down Payment", detail: "On confirmation of allotment" },
      { phase: "Monthly Installments", detail: "Spread over the construction period" },
      { phase: "On Possession", detail: "Final payment at handover" },
    ],
    docs: [
      { src: `${RS}/pricing.png`, label: "Payment Plan" },
      { src: `${RS}/pricing2.png`, label: "Lease & Pricing" },
    ],
  },
  contact: {
    phone: "+92 346 008 9565",
    hours: "Mon–Sun · 11AM – 8PM",
    address:
      "Sherwani Royal Suites, PAEC Society, Sector 52-A, Scheme 33, Karachi",
    mapEmbed:
      "https://www.google.com/maps?q=Sherwani%20Royal%20Suites%20Karachi&output=embed",
    interestedOptions: [
      "4 Room Apartment",
      "5 Room Apartment",
      "Shops",
      "Showrooms",
    ],
  },
};

const HV = "/images/projects/hubvalley-residency";
export const hubValley: ProjectData = {
  slug: "hub-valley",
  name: "Hub Valley Residency",
  overline: "Sherwani Builders · Hub Valley",
  heroSubtitle: "Contemporary comfort in Balochistan's newest residency.",
  heroImage: "/images/projects/Hub-Valley-Residency.jpg",
  youtubeId: "hK04MBDIK-0",
  paymentHref: "/our-relations/sherwani-builders/hub-valley/payment-schedule",
  about: {
    overline: "A new residential landmark",
    heading: "Introducing Hub Valley Residency",
    body: "Hub Valley Residency brings contemporary apartment living to Hub with elegant finishes, modern amenities and a strong focus on community comfort. The project blends premium residences with thoughtful landscaping and smart design for families seeking a tranquil yet connected lifestyle.",
    image: `${HV}/about.jpg`,
  },
  interiors: [
    { title: "Lounge", tagline: "A welcoming lounge crafted for relaxation and entertaining.", image: `${HV}/Lounge.jpg` },
    { title: "Dining", tagline: "Dining spaces designed for memorable family gatherings.", image: `${HV}/Dining.jpg` },
    { title: "Kitchen", tagline: "A modern kitchen built for comfort and convenience.", image: `${HV}/Kitchen.jpg` },
    { title: "Bathroom", tagline: "A refined bathroom with premium finishes.", image: `${HV}/Bathroom.jpg` },
    { title: "Drawing Room", tagline: "Elegant drawing rooms framed by natural light and premium details.", image: `${HV}/Drawing.jpg` },
  ],
  amenities: [
    "gallery-1",
    "gallery-2",
    "gallery-3",
    "gallery-4",
    "gallery-5",
    "gallery-6",
    "gallery-7",
    "hero-bg",
  ].map((n) => `${HV}/${n}.jpg`),
  payment: {
    note: "Flexible installments designed to make premium living accessible. Contact us for the latest availability and unit plans.",
    units: ["3 Room Apartments", "4 Room Apartments", "Shops", "Showrooms"],
    rows: [
      { phase: "Booking", detail: "At the time of application" },
      { phase: "Down Payment", detail: "On confirmation of allotment" },
      { phase: "Monthly Installments", detail: "Spread over the construction period" },
      { phase: "On Possession", detail: "Final payment at handover" },
    ],
  },
  contact: {
    phone: "+92 346 008 9565",
    hours: "Mon–Sun · 11AM – 8PM",
    address: "Hub Valley Residency, Hub, Balochistan",
    mapEmbed: "https://www.google.com/maps?q=Hub%20Valley%20Residency&output=embed",
    interestedOptions: ["3 Room Apartment", "4 Room Apartment", "Shops", "Showrooms"],
  },
};

const AO = "/images/projects/address one";
export const addressOne: ProjectData = {
  slug: "address-one",
  name: "Address One",
  overline: "Sherwani Builders · Karachi",
  heroSubtitle: "A landmark living experience in the city.",
  heroImage: "/images/projects/Address-One.jpg",
  youtubeId: "sWnivNopcvE",
  paymentHref: "/our-relations/sherwani-builders/address-one/payment-schedule",
  about: {
    overline: "City living redefined",
    heading: "Introducing Address One",
    body: "Address One is a distinctive high-rise project offering luxury 3 and 4 room apartments in a prime Karachi location. The development features modern amenities, premium finishes and a focus on seamless urban living for families and professionals.",
    image: `${AO}/about (1).jpg`,
  },
  interiors: [
    { title: "Drawing Room", tagline: "Elegant living designed for comfort and style.", image: `${AO}/Drawing (1).jpg` },
    { title: "Bedroom", tagline: "Restful interiors with refined finishes.", image: `${AO}/Bedroom.jpg` },
    { title: "Dining", tagline: "Dining areas made for modern family living.", image: `${AO}/Dining (1).jpg` },
    { title: "Kitchen", tagline: "A sleek, functional kitchen for contemporary homes.", image: `${AO}/Kitchen (1).jpg` },
    { title: "Terrace", tagline: "A private terrace with city views.", image: `${AO}/Terrace.jpg` },
  ],
  amenities: [
    "gallery-1 (2)",
    "gallery-2 (1)",
    "gallery-3 (1)",
    "gallery-4 (1)",
    "gallery-5 (1)",
    "gallery-6 (1)",
    "gallery-7 (1)",
    "gallery-8",
  ].map((n) => `${AO}/${n}.jpg`),
  payment: {
    note: "Structured payment plans with easy installments for modern apartment living.",
    units: ["3 Room Apartments", "4 Room Apartments", "Shops"],
    rows: [
      { phase: "Booking", detail: "At the time of application" },
      { phase: "Down Payment", detail: "On confirmation of allotment" },
      { phase: "Monthly Installments", detail: "Spread over the construction period" },
      { phase: "On Possession", detail: "Final payment at handover" },
    ],
  },
  contact: {
    phone: "+92 346 008 9565",
    hours: "Mon–Sun · 11AM – 8PM",
    address: "Address One, Karachi, Pakistan",
    mapEmbed: "https://www.google.com/maps?q=Address%20One%20Karachi&output=embed",
    interestedOptions: ["3 Room Apartment", "4 Room Apartment", "Shops"],
  },
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
