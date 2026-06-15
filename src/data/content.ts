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
