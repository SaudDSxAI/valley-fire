/**
 * MENU CONFIG — replace with the client's real menu.
 * Images: put a square photo at /public/media/menu/<id>.jpg (missing = placeholder).
 */
export type Badge = "Bestseller" | "New" | "Signature" | "Spicy" | "Veg";
export type Allergen = "Gluten" | "Dairy" | "Egg" | "Nuts" | "Soy" | "Sesame";

export type OptionGroup = {
  id: string;
  name: string;
  required?: boolean;
  multi?: boolean;
  choices: { name: string; price: number }[];
};

export type MenuItem = {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  price: number;
  badges?: Badge[];
  allergens?: Allergen[];
  tags?: string[]; // used by search + AI assistant: spicy, filling, light, sweet, cheesy, sharing...
  options?: OptionGroup[];
  kcal?: number;
};

export const categories = [
  { id: "pizza", name: "Pizza", emoji: "🍕" },
  { id: "burgers", name: "Burgers", emoji: "🍔" },
  { id: "chicken", name: "Chicken", emoji: "🍗" },
  { id: "sides", name: "Fries & Sides", emoji: "🍟" },
  { id: "drinks", name: "Drinks", emoji: "🥤" },
  { id: "desserts", name: "Desserts", emoji: "🍫" },
  { id: "deals", name: "Deals", emoji: "🔥" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

const pizzaSize: OptionGroup = {
  id: "size",
  name: "Size",
  required: true,
  choices: [
    { name: 'Small 8"', price: 0 },
    { name: 'Medium 10"', price: 500 },
    { name: 'Large 12"', price: 1000 },
  ],
};
const pizzaExtras: OptionGroup = {
  id: "extras",
  name: "Extra toppings",
  multi: true,
  choices: [
    { name: "Extra cheese", price: 250 },
    { name: "Jalapeños", price: 120 },
    { name: "Mushrooms", price: 150 },
    { name: "Stuffed crust", price: 350 },
  ],
};
const burgerExtras: OptionGroup = {
  id: "extras",
  name: "Add-ons",
  multi: true,
  choices: [
    { name: "Extra patty", price: 450 },
    { name: "Cheese slice", price: 100 },
    { name: "Beef bacon", price: 250 },
    { name: "Fried egg", price: 100 },
  ],
};
const makeMeal: OptionGroup = {
  id: "meal",
  name: "Make it a meal",
  choices: [
    { name: "No, just the item", price: 0 },
    { name: "Meal: fries + drink", price: 390 },
  ],
};
const spiceLevel: OptionGroup = {
  id: "spice",
  name: "Spice level",
  required: true,
  choices: [
    { name: "Mild", price: 0 },
    { name: "Hot", price: 0 },
    { name: "Fire 🔥", price: 0 },
  ],
};

export const menu: MenuItem[] = [
  // PIZZA
  { id: "ember-supreme", name: "Valley Fire Supreme", category: "pizza", price: 1290, kcal: 980,
    description: "Stone-fired dough, smoked chicken tikka, peppers, olives and mozzarella.",
    badges: ["Signature", "Bestseller"], allergens: ["Gluten", "Dairy"], tags: ["cheesy", "filling", "sharing"],
    options: [pizzaSize, pizzaExtras] },
  { id: "spicy-chicken-pizza", name: "Spicy Chicken Pizza", category: "pizza", price: 1190, kcal: 940,
    description: "Fiery peri-peri chicken, jalapeños, red onion and chilli honey drizzle.",
    badges: ["Spicy", "Bestseller"], allergens: ["Gluten", "Dairy"], tags: ["spicy", "filling", "cheesy"],
    options: [pizzaSize, pizzaExtras] },
  { id: "margherita", name: "Valley Margherita", category: "pizza", price: 990, kcal: 780,
    description: "San Marzano-style tomato, fresh mozzarella, basil and olive oil.",
    badges: ["Veg"], allergens: ["Gluten", "Dairy"], tags: ["light", "cheesy", "veg"],
    options: [pizzaSize, pizzaExtras] },
  { id: "bbq-beef", name: "Smoky BBQ Beef", category: "pizza", price: 1390, kcal: 1050,
    description: "Slow-cooked beef, house BBQ sauce, caramelised onion and cheddar.",
    badges: ["New"], allergens: ["Gluten", "Dairy"], tags: ["filling", "cheesy", "smoky"],
    options: [pizzaSize, pizzaExtras] },

  // BURGERS
  { id: "fire-burger", name: "Fire Burger", category: "burgers", price: 890, kcal: 820,
    description: "Double smash patty, ghost-pepper sauce, pickled chillies, pepper jack.",
    badges: ["Spicy", "Signature"], allergens: ["Gluten", "Dairy", "Egg"], tags: ["spicy", "filling"],
    options: [burgerExtras, makeMeal] },
  { id: "classic-smash", name: "Classic Smash", category: "burgers", price: 790, kcal: 740,
    description: "Two thin-crust beef patties, American cheese, pickles, Valley Fire sauce.",
    badges: ["Bestseller"], allergens: ["Gluten", "Dairy", "Egg"], tags: ["filling", "cheesy", "classic"],
    options: [burgerExtras, makeMeal] },
  { id: "crispy-zinger", name: "Crispy Zinger", category: "burgers", price: 690, kcal: 690,
    description: "Buttermilk fried chicken thigh, slaw, garlic mayo, brioche bun.",
    allergens: ["Gluten", "Egg", "Dairy"], tags: ["crispy", "filling"],
    options: [burgerExtras, makeMeal] },
  { id: "mushroom-melt", name: "Mushroom Swiss Melt", category: "burgers", price: 850, kcal: 760,
    description: "Beef patty, sautéed mushrooms, Swiss cheese, truffle mayo.",
    badges: ["New"], allergens: ["Gluten", "Dairy", "Egg"], tags: ["cheesy", "filling"],
    options: [burgerExtras, makeMeal] },

  // CHICKEN
  { id: "hot-wings", name: "Hot Wings (8 pc)", category: "chicken", price: 790, kcal: 640,
    description: "Crispy wings tossed in buffalo or honey-chilli glaze.",
    badges: ["Spicy", "Bestseller"], allergens: ["Gluten"], tags: ["spicy", "sharing"],
    options: [spiceLevel] },
  { id: "fried-bucket", name: "Valley Fire Bucket (6 pc)", category: "chicken", price: 1490, kcal: 1500,
    description: "Signature 11-spice fried chicken — crunchy outside, juicy inside.",
    badges: ["Signature"], allergens: ["Gluten", "Egg"], tags: ["sharing", "filling", "crispy"],
    options: [spiceLevel] },
  { id: "tenders", name: "Chicken Tenders (5 pc)", category: "chicken", price: 650, kcal: 520,
    description: "Hand-breaded strips with your choice of dip.",
    allergens: ["Gluten", "Egg"], tags: ["crispy", "light", "kids"] },

  // SIDES
  { id: "loaded-fries", name: "Loaded Fries", category: "sides", price: 550, kcal: 690,
    description: "Fries, cheese sauce, jalapeños, chicken bits and spring onion.",
    badges: ["Bestseller"], allergens: ["Dairy"], tags: ["cheesy", "sharing", "filling"] },
  { id: "classic-fries", name: "Classic Fries", category: "sides", price: 290, kcal: 380,
    description: "Skin-on, double-fried, sea salt.", badges: ["Veg"], tags: ["light", "veg"] },
  { id: "mozzarella-sticks", name: "Mozzarella Sticks", category: "sides", price: 490, kcal: 450,
    description: "Six golden sticks with marinara.", badges: ["Veg"], allergens: ["Gluten", "Dairy"], tags: ["cheesy", "veg", "sharing"] },
  { id: "coleslaw", name: "House Coleslaw", category: "sides", price: 190, kcal: 160,
    description: "Crunchy, creamy, fresh daily.", badges: ["Veg"], allergens: ["Egg"], tags: ["light", "veg"] },

  // DRINKS
  { id: "mint-lemonade", name: "Mint Margarita", category: "drinks", price: 350, kcal: 140,
    description: "Fresh mint, lime and crushed ice.", badges: ["Bestseller"], tags: ["light", "fresh"] },
  { id: "oreo-shake", name: "Oreo Shake", category: "drinks", price: 590, kcal: 620,
    description: "Thick vanilla ice cream and crushed Oreo.", allergens: ["Dairy", "Gluten"], tags: ["sweet"] },
  { id: "soft-drink", name: "Soft Drink", category: "drinks", price: 150,
    description: "Chilled 345 ml can.", tags: ["light"],
    options: [{ id: "flavour", name: "Flavour", required: true, choices: [
      { name: "Cola", price: 0 }, { name: "Lemon-lime", price: 0 }, { name: "Orange", price: 0 } ] }] },

  // DESSERTS
  { id: "lava-cake", name: "Molten Lava Cake", category: "desserts", price: 490, kcal: 480,
    description: "Warm chocolate cake with a gooey centre.", badges: ["Bestseller"], allergens: ["Gluten", "Dairy", "Egg"], tags: ["sweet"] },
  { id: "kunafa-cheesecake", name: "Kunafa Cheesecake", category: "desserts", price: 590, kcal: 520,
    description: "Baked cheesecake on crispy kunafa, pistachio dust.", badges: ["New"], allergens: ["Gluten", "Dairy", "Egg", "Nuts"], tags: ["sweet"] },

  // DEALS
  { id: "solo-deal", name: "Solo Deal", category: "deals", price: 990, kcal: 1100,
    description: "Classic Smash + Classic Fries + Soft Drink.", badges: ["Bestseller"], allergens: ["Gluten", "Dairy", "Egg"], tags: ["filling", "value"] },
  { id: "family-feast", name: "Family Feast", category: "deals", price: 3990, kcal: 5200,
    description: "Large pizza + 6 pc bucket + 2 fries + 1.5L drink. Feeds 4–5.", badges: ["Signature"], allergens: ["Gluten", "Dairy", "Egg"], tags: ["sharing", "filling", "value"] },
  { id: "fire-duo", name: "Fire Duo", category: "deals", price: 1990, kcal: 2100,
    description: "2 Fire Burgers + Loaded Fries + 2 drinks.", badges: ["Spicy", "New"], allergens: ["Gluten", "Dairy", "Egg"], tags: ["spicy", "sharing", "value"] },
];

export const menuImage = (id: string) => `/media/menu/${id}.jpg`;
export const signatureIds = ["ember-supreme", "fire-burger", "fried-bucket", "loaded-fries", "bbq-beef", "kunafa-cheesecake"];
