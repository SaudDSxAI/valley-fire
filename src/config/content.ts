/**
 * CONTENT CONFIG — branches, offers, reviews, about story, loyalty tiers, FAQs.
 * Replace per client.
 */
export type Branch = {
  slug: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  hours: { open: string; close: string }; // 24h "HH:MM"; close may be after midnight e.g. "01:00"
  hoursLabel: string;
  mapQuery: string;
  lat: number;
  lng: number;
  features: string[];
};

export const branches: Branch[] = [
  {
    slug: "mingora",
    name: "EMBER Mingora",
    area: "Mingora",
    address: "Main GT Road, near Green Chowk, Mingora, Swat",
    phone: "+92 300 0000001",
    phoneHref: "tel:+923000000001",
    whatsapp: "923000000001",
    hours: { open: "12:00", close: "01:00" },
    hoursLabel: "Daily · 12:00 PM – 1:00 AM",
    mapQuery: "Green Chowk Mingora Swat",
    lat: 34.7717,
    lng: 72.3602,
    features: ["Dine-in", "Delivery", "Pickup", "Family hall"],
  },
  {
    slug: "saidu-sharif",
    name: "EMBER Saidu Sharif",
    area: "Saidu Sharif",
    address: "Saidu Sharif Road, opposite Swat Museum, Swat",
    phone: "+92 300 0000002",
    phoneHref: "tel:+923000000002",
    whatsapp: "923000000002",
    hours: { open: "12:00", close: "00:00" },
    hoursLabel: "Daily · 12:00 PM – 12:00 AM",
    mapQuery: "Swat Museum Saidu Sharif",
    lat: 34.7466,
    lng: 72.3572,
    features: ["Dine-in", "Delivery", "Pickup", "Parking"],
  },
  {
    slug: "kalam",
    name: "EMBER Kalam",
    area: "Kalam",
    address: "Kalam Bazaar, Main Road, Kalam, Swat",
    phone: "+92 300 0000003",
    phoneHref: "tel:+923000000003",
    whatsapp: "923000000003",
    hours: { open: "11:00", close: "23:00" },
    hoursLabel: "Daily · 11:00 AM – 11:00 PM (seasonal)",
    mapQuery: "Kalam Bazaar Swat",
    lat: 35.4902,
    lng: 72.5796,
    features: ["Dine-in", "Pickup", "River view"],
  },
];

export const offers = [
  { id: "today", tag: "Today only", title: "2 Pizzas for Rs 1,999", text: "Any two medium pizzas. Dine-in, pickup or delivery.", code: "TWOFIRE", tone: "accent" },
  { id: "weekend", tag: "Weekend deal", title: "Family Feast −20%", text: "Friday to Sunday. Feeds 4–5, with a free lava cake.", code: "WEEKEND20", tone: "gold" },
  { id: "student", tag: "Student Tuesday", title: "Solo Deal at Rs 790", text: "Show your student card at the counter or use the code online.", code: "STUDENT", tone: "dark" },
  { id: "late", tag: "Limited time", title: "Late-night wings", text: "After 10 PM: buy 8 wings, get 4 free.", code: "LATENIGHT", tone: "accent" },
  { id: "eid", tag: "Seasonal", title: "Eid platters", text: "Pre-order sharing platters for your family gatherings.", code: "EID", tone: "gold" },
  { id: "birthday", tag: "Special occasion", title: "Free birthday dessert", text: "Club members get a free dessert in their birthday week.", code: "", tone: "dark" },
] as const;

/** Promo codes the checkout accepts (demo). */
export const promoCodes: Record<string, { type: "percent" | "flat"; value: number; label: string }> = {
  WELCOME10: { type: "percent", value: 10, label: "10% off your first order" },
  WEEKEND20: { type: "percent", value: 20, label: "20% weekend discount" },
  TWOFIRE: { type: "flat", value: 300, label: "Rs 300 off" },
  STUDENT: { type: "flat", value: 200, label: "Rs 200 student discount" },
};

export const reviews = [
  { name: "Ayesha K.", area: "Mingora", rating: 5, text: "Best pizza in Swat, no contest. The crust is incredible and delivery was 25 minutes." },
  { name: "Hamza R.", area: "Saidu Sharif", rating: 5, text: "The Fire Burger is not a joke. Spicy, juicy, and the fries are perfect." },
  { name: "Sana M.", area: "Kalam", rating: 5, text: "Stopped here on our Kalam trip — family hall was spotless and the kids loved the tenders." },
  { name: "Bilal A.", area: "Mingora", rating: 4, text: "Ordered through WhatsApp for our office. Everything arrived hot and on time." },
  { name: "Maryam S.", area: "Mingora", rating: 5, text: "Kunafa cheesecake. That's it. That's the review." },
  { name: "Usman T.", area: "Saidu Sharif", rating: 5, text: "Catered our university event for 200 people. Smooth from start to finish." },
];

export const about = {
  headline: "Born from fire. Rooted in Swat.",
  story:
    "EMBER started in 2019 as a single wood-fired oven on GT Road. We wanted Swat to have fast food that was made slowly — dough rested for 48 hours, sauces made every morning, and meat from farms we know by name.",
  milestones: [
    { year: "2019", text: "First oven fires up in Mingora" },
    { year: "2021", text: "Saidu Sharif branch opens" },
    { year: "2023", text: "Kalam seasonal kitchen" },
    { year: "2026", text: "100,000+ orders served" },
  ],
  chef: { name: "Chef Imran Khan", role: "Founder & Head Chef", quote: "If I wouldn't serve it to my mother, it doesn't leave this kitchen." },
  pillars: [
    { title: "48-hour dough", text: "Slow-fermented for a light, blistered crust." },
    { title: "Local & fresh", text: "Vegetables and dairy from Swat valley farms." },
    { title: "Halal, always", text: "Certified halal meat, hand-prepared daily." },
    { title: "Made to order", text: "Nothing sits under a heat lamp. Ever." },
  ],
};

export const loyaltyTiers = [
  { name: "Ember", points: "0+", perks: ["1 point per Rs 100", "Free birthday dessert", "Member-only deals"] },
  { name: "Flame", points: "1,500+", perks: ["1.25× points", "Free delivery on Fridays", "Early access to new items"] },
  { name: "Inferno VIP", points: "5,000+", perks: ["1.5× points", "Priority reservations", "Chef's table invites"] },
];

export const cateringTypes = [
  { title: "Corporate", text: "Office lunches, meetings and launches." },
  { title: "Weddings", text: "Live pizza stations and dessert bars." },
  { title: "Parties", text: "Birthdays, get-togethers and family events." },
  { title: "University events", text: "Bulk deals for societies and fests." },
  { title: "Private dining", text: "Book the full hall for up to 80 guests." },
  { title: "Large orders", text: "50+ items with scheduled delivery." },
];

export const faqs = [
  { q: "Do you deliver?", a: "Yes — from Mingora and Saidu Sharif across the city, usually in 30–40 minutes." },
  { q: "Is your meat halal?", a: "100%. All our meat is certified halal." },
  { q: "Do you have vegetarian options?", a: "Yes: Valley Margherita, Mozzarella Sticks, Classic Fries, Coleslaw and all desserts." },
  { q: "Can I pay cash?", a: "Cash on delivery, card and bank transfer are all accepted." },
  { q: "Do you have a family hall?", a: "Yes, at Mingora and Kalam." },
];
