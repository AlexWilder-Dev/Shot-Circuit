// Everything the site says about the bar lives here.
// Sources: shotcircuit.co.uk (incl. its unlinked /menu and /about), the Brixton Village
// trader listing (Sept 2026), the bar's TikTok bio and the chalkboards in their photos.
// Nothing here is invented: unknown prices are left out rather than guessed.

export const BAR = {
  name: 'Shot Circuit',
  kind: 'Shooter bar',
  tagline: 'Shooter bar with the best shots in Brixton.',
  oneAndOnly: 'The one and only shots bar in Brixton.',
  sorted: "Whether you're kicking off the night, keeping the party alive, looking for a wellness or indulgence boost, or winding down after dinner, we've got your sip sorted.",
  everyMood: 'From bold flavours to smooth sips, there’s a shot for every mood.',
  signOff: 'Come for the shots, stay for the sips.',
  walkIn: 'Walk in, no reservation needed.',
  address: {
    unit: 'Unit 14',
    street: 'Market Row',
    area: 'Brixton Village',
    city: 'London',
    postcode: 'SW9 8LD',
  },
  phone: { display: '07575 819750', href: 'tel:+447575819750' },
  email: 'contact@shotcircuit.co.uk',
  socials: {
    instagram: { handle: '@shotcircuitbrix', href: 'https://instagram.com/shotcircuitbrix' },
    tiktok: { handle: '@shotcircuitbrix', href: 'https://tiktok.com/@shotcircuitbrix' },
    google: { label: 'Google reviews', href: 'https://share.google/YkRwjskI71EMXDr5l' },
  },
  video: { id: 'jN6xg2MrFyk', title: 'How to get to Shot Circuit in Brixton' },
  // Unit 14 cluster on the Market Row passage (OpenStreetMap unit records).
  geo: { lat: 51.46189, lng: -0.11336 },
} as const;

export const MAPS = {
  google: 'https://www.google.com/maps/search/?api=1&query=Shot+Circuit%2C+14+Market+Row%2C+Brixton%2C+London+SW9+8LD',
  googleWalk:
    'https://www.google.com/maps/dir/?api=1&origin=Brixton+Underground+Station&destination=Shot+Circuit%2C+14+Market+Row%2C+London+SW9+8LD&travelmode=walking',
  apple: 'https://maps.apple.com/?q=Shot+Circuit&address=14+Market+Row,+London+SW9+8LD&ll=51.46189,-0.11336',
  citymapper: 'https://citymapper.com/directions?endcoord=51.46189%2C-0.11336&endname=Shot%20Circuit&endaddress=14%20Market%20Row%2C%20London%20SW9%208LD',
} as const;

// Opening hours from the Brixton Village trader listing (updated Sept 2026).
// Keyed by JS day number: 0 = Sunday.
export type DayHours = { open: string; close: string } | null;
export const HOURS: Record<number, DayHours> = {
  0: { open: '12:00', close: '20:00' },
  1: null,
  2: null,
  3: { open: '12:00', close: '23:30' },
  4: { open: '12:00', close: '23:30' },
  5: { open: '12:00', close: '23:30' },
  6: { open: '12:00', close: '23:30' },
};
export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// No events, DJ nights or group packages were found anywhere, so none are listed.
export const EVENTS: { date: string; title: string; detail: string }[] = [];

// ---------- the four moments, in their own words ----------
export type MomentId = 'start' | 'keep' | 'after' | 'boost';
export const MOMENTS: {
  id: MomentId;
  label: string;
  short: string;
  line: string;
  weights: Record<string, number>;
}[] = [
  {
    id: 'boost',
    label: 'A wellness or indulgence boost',
    short: 'Wellness boost',
    line: 'Fresh wellness shots with a little something in them, from noon.',
    weights: { wellness: 4, brunch: 2, ginger: 2, spiced: 2, savory: 2, tomato: 1, frozen: 1, aperitif: 1 },
  },
  {
    id: 'start',
    label: 'Kicking off the night',
    short: 'Kicking off',
    line: 'Sharp, salty, citrussy: something to get the night going.',
    weights: { aperitif: 3, citrus: 2, zesty: 2, salty: 2, agave: 2, spritz: 2, classic: 2, bold: 1, herbal: 1 },
  },
  {
    id: 'keep',
    label: 'Keeping the party alive',
    short: 'Keeping it going',
    line: 'Layers, bombs and a round for the whole table.',
    weights: { party: 3, energy: 3, layered: 2, candy: 2, cosmic: 2, bold: 2, rum: 1, tropical: 1, banana: 1, fruity: 1 },
  },
  {
    id: 'after',
    label: 'Winding down after dinner',
    short: 'After dinner',
    line: 'Dessert shots and digestifs for the perfect finish.',
    weights: { dessert: 3, coffee: 3, creamy: 2, anise: 2, frozen: 1, sweet: 1 },
  },
];

// ---------- drinks ----------
export type Glass = 'single' | 'double' | 'tumbler';
export type Section = 'shooters' | 'shots' | 'sips' | 'wellness';
export type Layer = { name: string; ml: number; colour: string; opacity: number; density: number };
export type Drink = {
  slug: string;
  name: string;
  section: Section;
  glass: Glass;
  /** 'auto' settles layers by density; 'manual' is poured in the listed order. */
  pour: 'auto' | 'manual';
  mixed?: boolean;
  layers: Layer[];
  garnish: { id: string; label: string; optional?: boolean }[];
  tags: string[];
};

export const SECTIONS: { id: Section; title: string; blurb: string }[] = [
  { id: 'shooters', title: 'Shooters', blurb: 'Signature and classic shooters.' },
  { id: 'shots', title: 'Shots', blurb: 'The classics, straight up.' },
  { id: 'sips', title: 'Sips', blurb: 'Shots you take your time over.' },
  { id: 'wellness', title: '(Un)wellness', blurb: 'Artisan (un)wellness shots: fresh shots, with a twist.' },
];

const L = (name: string, ml: number, colour: string, opacity: number, density: number): Layer => ({
  name,
  ml,
  colour,
  opacity,
  density,
});

// Builds, colours and garnishes exactly as listed in the bar's own menu data.
export const DRINKS: Drink[] = [
  {
    slug: 'baby-guinness', name: 'Baby Guinness', section: 'shooters', glass: 'double', pour: 'manual',
    layers: [L('Kahlúa', 30, '#3b2f2f', 0.98, 1.15), L('Baileys Irish Cream', 15, '#f3e1c4', 0.96, 1.08)],
    garnish: [{ id: 'coffee-beans', label: 'Coffee beans', optional: true }, { id: 'marshmallow', label: 'Marshmallow', optional: true }],
    tags: ['coffee', 'creamy', 'sweet'],
  },
  {
    slug: 'lemon-drop', name: 'Lemon Drop', section: 'shooters', glass: 'double', pour: 'auto',
    layers: [L('Vodka', 40, '#ffffff', 0.95, 0.95), L('Lemon juice', 20, '#ffffcc', 0.9, 1.02), L('Simple syrup', 15, '#fff9e6', 0.9, 1.03)],
    garnish: [{ id: 'sugar-rim', label: 'Sugar rim' }, { id: 'lemon-wheel', label: 'Lemon wheel' }],
    tags: ['citrus', 'sweet', 'zesty'],
  },
  {
    slug: 'irish-affogato', name: 'Irish Affogato', section: 'shooters', glass: 'tumbler', pour: 'auto',
    layers: [L('Irish cream liqueur', 30, '#f3e1c4', 0.96, 1.08), L('Espresso', 60, '#4b3621', 0.98, 1)],
    garnish: [{ id: 'whipped-cream', label: 'Whipped cream' }, { id: 'chocolate-shavings', label: 'Chocolate shavings' }],
    tags: ['coffee', 'creamy', 'dessert'],
  },
  {
    slug: 'sgroppino', name: 'Sgroppino', section: 'shooters', glass: 'tumbler', pour: 'auto',
    layers: [L('Vodka', 30, '#ffffff', 0.95, 0.95), L('Lemon sorbet', 60, '#ffffcc', 0.9, 1.02), L('Prosecco', 60, '#fff9e6', 0.9, 0.95)],
    garnish: [{ id: 'lemon-zest', label: 'Lemon zest' }],
    tags: ['citrus', 'frozen', 'spritz'],
  },
  {
    slug: 'soco', name: 'SoCo', section: 'shooters', glass: 'double', pour: 'auto',
    layers: [L('Southern Comfort', 50, '#ff9966', 0.95, 1.03), L('Lime juice', 10, '#e6ffcc', 0.9, 1.02)],
    garnish: [{ id: 'lime-wedge', label: 'Lime wedge' }],
    tags: ['sweet', 'citrus', 'fruity'],
  },
  {
    slug: 'blow-job', name: 'Blow Job', section: 'shooters', glass: 'double', pour: 'manual',
    layers: [L('Amaretto', 25, '#3b2f2f', 0.98, 1.15), L('Baileys Irish Cream', 25, '#f3e1c4', 0.96, 1.08)],
    garnish: [{ id: 'whipped-cream', label: 'Whipped cream' }, { id: 'chocolate-shavings', label: 'Chocolate shavings' }],
    tags: ['creamy', 'dessert', 'sweet'],
  },
  {
    slug: 'bazooka-joe', name: 'Bazooka Joe', section: 'shooters', glass: 'double', pour: 'auto',
    layers: [L('Banana liqueur', 12.5, '#ffcc66', 0.9, 1), L('Baileys Irish Cream', 12.5, '#ffffff', 0.95, 0.95), L('Blue Curaçao', 12.5, '#3399ff', 0.9, 1)],
    garnish: [{ id: 'gummy', label: 'Gummy sweet' }],
    tags: ['banana', 'candy', 'creamy'],
  },
  {
    slug: 'bubble-gum', name: 'Bubble Gum', section: 'shooters', glass: 'double', pour: 'auto',
    layers: [L('Bubblegum liqueur', 30, '#ff99cc', 0.9, 1), L('Vodka', 30, '#ffffff', 0.95, 0.95)],
    garnish: [{ id: 'gummy', label: 'Gummy sweet' }],
    tags: ['candy', 'sweet', 'fruity'],
  },
  {
    slug: 'electric-blue', name: 'Electric Blue', section: 'shooters', glass: 'double', pour: 'auto', mixed: true,
    layers: [L('Blue Curaçao', 10, '#3399ff', 0.95, 1.02), L('Chilli vodka', 25, '#ffffcc', 0.9, 1.02), L('Lime juice', 10, '#e6ffcc', 0.9, 1.02)],
    garnish: [{ id: 'lime-wedge', label: 'Lime wedge' }],
    tags: ['citrus', 'bold', 'mixed'],
  },
  {
    slug: 'windrush-hurricane', name: 'Windrush Hurricane', section: 'shooters', glass: 'double', pour: 'auto',
    layers: [L('Malibu', 30, '#fff6e5', 0.96, 0.95), L('Pineapple liqueur', 30, '#ffff99', 0.95, 0.95), L('Wray & Nephew rum', 30, '#fff6e5', 0.96, 0.95)],
    garnish: [{ id: 'salt-rim', label: 'Salt rim' }],
    tags: ['tropical', 'rum', 'sweet'],
  },
  {
    slug: 'starman', name: 'Starman', section: 'shooters', glass: 'double', pour: 'manual',
    layers: [L('Absinthe', 30, '#99cc66', 0.9, 1.03), L('Blue Curaçao', 30, '#3399ff', 0.95, 1.02), L('Grenadine', 10, '#ff4d4d', 0.9, 1.18)],
    garnish: [{ id: 'star-fruit', label: 'Star fruit slice' }],
    tags: ['herbal', 'layered', 'cosmic'],
  },
  {
    slug: 'traffic-light', name: 'Traffic Light', section: 'shooters', glass: 'double', pour: 'auto',
    layers: [L('Grenadine', 10, '#ff4d4d', 0.9, 1.18), L('Midori melon liqueur', 30, '#99cc66', 0.9, 1.03), L('Blue Curaçao', 30, '#3399ff', 0.95, 1.02)],
    garnish: [{ id: 'cherry', label: 'Cherry' }],
    tags: ['fruity', 'layered', 'sweet'],
  },
  {
    slug: 'sambuca', name: 'Sambuca', section: 'shots', glass: 'double', pour: 'manual',
    layers: [L('Sambuca', 30, '#ffffff', 0.9, 1)],
    garnish: [{ id: 'coffee-beans', label: 'Coffee beans' }, { id: 'marshmallow', label: 'Marshmallow' }],
    tags: ['anise', 'sweet', 'coffee'],
  },
  {
    slug: 'jagerbomb', name: 'Jägerbomb', section: 'shots', glass: 'double', pour: 'auto',
    layers: [L('Jägermeister', 30, '#4b2e2e', 0.97, 1.2), L('Energy drink', 30, '#99ccff', 0.8, 1)],
    garnish: [],
    tags: ['herbal', 'energy', 'party'],
  },
  {
    slug: 'tequila', name: 'Tequila', section: 'shots', glass: 'single', pour: 'auto',
    layers: [L('Tequila', 50, '#fff6e5', 0.96, 0.95)],
    garnish: [{ id: 'lime-wedge', label: 'Lime wedge' }, { id: 'salt', label: 'Salt' }],
    tags: ['citrus', 'salty', 'agave'],
  },
  {
    slug: 'bloody-mary', name: 'Bloody Mary', section: 'sips', glass: 'tumbler', pour: 'auto',
    layers: [L('Vodka', 40, '#ffffff', 0.95, 0.95), L('Tomato juice', 80, '#ff4d4d', 0.9, 1.03)],
    garnish: [{ id: 'celery', label: 'Celery stick' }, { id: 'lemon-wedge', label: 'Lemon wedge' }],
    tags: ['savory', 'spicy', 'tomato', 'brunch'],
  },
  {
    slug: 'one-sip-martini', name: 'One Sip Martini', section: 'sips', glass: 'tumbler', pour: 'auto',
    layers: [L('Gin', 60, '#e6f0ff', 0.95, 0.95), L('Dry vermouth', 10, '#f2e6d9', 0.9, 1)],
    garnish: [{ id: 'olive', label: 'Olive' }],
    tags: ['classic', 'herbal', 'boozy'],
  },
  {
    slug: 'turmeriki', name: 'Turmeriki', section: 'wellness', glass: 'tumbler', pour: 'auto',
    layers: [L('Turmeric shot', 50, '#ffcc66', 0.9, 1), L('Fireball cinnamon whisky', 25, '#ff4d4d', 0.95, 0.95), L('Gin', 25, '#e6f0ff', 0.95, 0.95)],
    garnish: [],
    tags: ['wellness', 'spiced', 'citrus'],
  },
  {
    slug: 'ginger-irie', name: 'Ginger Irie', section: 'wellness', glass: 'tumbler', pour: 'auto',
    layers: [L('Ginger shot', 50, '#ffcc66', 0.9, 1), L('Coconut liqueur', 25, '#ffffcc', 0.95, 0.95), L('Spiced rum', 25, '#8b4513', 0.96, 0.95)],
    garnish: [],
    tags: ['wellness', 'ginger', 'tropical'],
  },
  {
    slug: 'veggie-mary', name: 'Veggie Mary', section: 'wellness', glass: 'tumbler', pour: 'auto',
    layers: [L('Hendrick’s gin', 50, '#e6f0ff', 0.95, 0.95), L('Green shot', 50, '#99cc66', 0.9, 1.03)],
    garnish: [{ id: 'celery', label: 'Celery stick' }, { id: 'lemon-wedge', label: 'Lemon wedge' }, { id: 'olive', label: 'Olive' }, { id: 'hot-sauce', label: 'Green Tabasco' }],
    tags: ['savory', 'herbal', 'brunch'],
  },
];

// Extra notes from their own copy, shown on a drink's sheet.
export const DRINK_NOTES: Record<string, string> = {
  'ginger-irie': 'Served as the Ginger Irie wellness slushie.',
  'electric-blue': 'Mixed together rather than layered.',
};

// ---------- chalked up at the bar (read off the boards in their photos) ----------
export type BoardItem = { name: string; build?: string; price?: string; tags: string[]; link?: string };
export const BOARD: BoardItem[] = [
  { name: 'Negroni', price: '8.00', tags: ['aperitif', 'classic'] },
  { name: 'Amaretto Sour', price: '8.00', tags: ['citrus', 'sweet'] },
  { name: 'Add a shot', price: '4.00', tags: [] },
  { name: 'SoCo Kamikaze', build: "S'Comfort, T'Sec, L'Juice", tags: ['citrus', 'party'] },
  { name: 'Ginger Irie Slushie', tags: ['wellness', 'frozen'], link: 'ginger-irie' },
  { name: 'Kamikaze', tags: ['citrus', 'party'] },
  { name: 'Melon Drop', tags: ['fruity', 'sweet'] },
  { name: 'Tiramisu shot', tags: ['dessert', 'coffee'] },
];

// ---------- also behind the bar (named in their listing, no items published yet) ----------
export const ALSO_POURING: { title: string; detail: string; moments: MomentId[] }[] = [
  { title: 'Tinnies', detail: 'for the road', moments: ['start', 'keep'] },
  { title: 'Wines, spirits & beers', detail: 'a short list, from around the world', moments: ['start', 'keep', 'after'] },
  { title: 'Aperitifs', detail: 'to whet the appetite', moments: ['start', 'boost'] },
  { title: 'Dessert shots & digestifs', detail: 'for the perfect finish', moments: ['after'] },
  { title: 'Speciality teas', detail: 'for the health-conscious', moments: ['boost', 'after'] },
  { title: 'Cocktails', detail: 'to take away', moments: ['start', 'boost'] },
];

// ---------- their photos ----------
export const PHOTOS = {
  counterNight: { src: 'photos/counter-night', w: [640, 1024], ratio: 1024 / 684, alt: 'Two people on yellow stools at the steel counter at night, chalkboards and a white neon squiggle behind, the bartender in a yellow beanie' },
  fascia: { src: 'photos/fascia', w: [800, 1400], ratio: 2560 / 1710, alt: 'The blue Shot Circuit fascia on Market Row: mirrored lettering, “Shooter Bar”, “14” and “Market Row”, warm mirrored room below' },
  frontDay: { src: 'photos/front-day', w: [640, 1100], ratio: 1320 / 1742, alt: 'The open shopfront by day with yellow stools and black tables outside, and a chalk A-board reading “Fresh wellness shots, shooters”' },
  barStaff: { src: 'photos/bar-staff', w: [640, 1100], ratio: 1320 / 1622, alt: 'Two bartenders laughing behind the brushed-steel counter, mirror tiles and lit shelves behind them' },
  layeredShots: { src: 'photos/layered-shots', w: [640, 1100], ratio: 1320 / 1730, alt: 'Two sugar-rimmed layered shots, dark red under pale pink, on the steel counter' },
  noonTumbler: { src: 'photos/noon-tumbler', w: [640, 1100], ratio: 1320 / 1728, alt: 'An orange drink with an orange wedge in a ribbed tumbler on the counter, the market aisle behind' },
} as const;
