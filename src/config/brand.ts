/**
 * BRAND CONFIG — the one file to edit when rebranding for a new restaurant.
 * Change the name, colors, contact details and socials here. No code changes needed.
 */
export const brand = {
  name: "VALLEY FIRE",
  fullName: "VALLEY FIRE Kitchen",
  tagline: "Fired with Swat pride.",
  description:
    "Stone-fired pizza, smash burgers and crispy chicken — made fresh every day with local ingredients from the valley.",
  city: "Swat",
  region: "Khyber Pakhtunkhwa",
  country: "PK",
  currency: "Rs",
  url: "https://valleyfire-demo.example.com",

  // Colors feed CSS variables (see globals.css). Swap these for a new client.
  colors: {
    bg: "#0F0D0B", // page background (dark)
    surface: "#1A1714", // cards
    ink: "#F5EFE6", // main text
    muted: "#B8AC9C", // secondary text
    accent: "#E4572E", // buttons, highlights
    accentInk: "#FFFFFF", // text on accent
    gold: "#D9A441", // badges, stars
  },

  contact: {
    phone: "+92 300 0000000",
    phoneHref: "tel:+923000000000",
    whatsapp: "923000000000", // international format, no +
    email: "hello@valleyfire-demo.pk",
  },

  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
  },

  rating: { score: 4.8, count: 1240, source: "Google" },

  seo: {
    keywords: [
      "Best Pizza in Swat",
      "Fast Food Restaurant in Mingora",
      "Best Burgers in Swat",
      "Fried Chicken Mingora",
      "Food delivery Swat",
    ],
  },

  // Media — drop files into /public/media with these names. Missing files show a styled placeholder.
  media: {
    heroVideo: "/media/hero.mp4",
    heroPoster: "/media/hero-poster.jpg",
    heroVideoMobile: "/media/hero-mobile.mp4",
    heroPosterMobile: "/media/hero-mobile-poster.jpg",
    chef: "/media/chef.jpg",
    interior: "/media/interior.jpg",
    ingredients: "/media/about-ingredients.jpg",
    clips: [
      { src: "/media/clip-cheese-pull.mp4", label: "The cheese pull" },
      { src: "/media/clip-burger-prep.mp4", label: "Smashed to order" },
      { src: "/media/clip-fried-chicken.mp4", label: "Fresh from the fryer" },
      { src: "/media/clip-fries-toss.mp4", label: "Hot, salted, fast" },
      { src: "/media/clip-shawarma.mp4", label: "Cooked over open flame" },
    ],
  },
} as const;

export const waLink = (text: string) =>
  `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(text)}`;

export const formatPrice = (n: number) =>
  `${brand.currency} ${n.toLocaleString("en-PK")}`;
