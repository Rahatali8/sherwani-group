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
  subheading: "Driven by Vision, Defined by Excellence",
  bottomTagline: "40 Years of Trust • Automobiles · Real Estate · Engineering",
  videos: [
    "/videos/hero-1.mp4",
    "/videos/hero-2.mp4",
    "/videos/hero-3.mp4",
    "/videos/hero-4.mp4",
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
    image: "/images/ceo.jpg",
  },
  featureImage: "/images/about-feature.jpg",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Awards", href: "#awards" },
  { label: "Diversification", href: "#diversification" },
  { label: "Projects", href: "#projects" },
  { label: "Clientele", href: "#clientele" },
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
