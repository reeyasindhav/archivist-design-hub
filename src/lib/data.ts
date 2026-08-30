/**
 * Mock content for Archiquest. Images are open-source photography from
 * Unsplash (free to use under the Unsplash License).
 */

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type Era = "Modern" | "Brutalist" | "Postmodern" | "Contemporary";

export type Room = {
  id: string;
  name: string;
  area: string;
  /** rectangle in the 1000x640 plan viewBox */
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Building = {
  slug: string;
  name: string;
  architectSlug: string;
  architect: string;
  city: string;
  country: string;
  year: number;
  era: Era;
  typology: string;
  materials: string[];
  hero: string;
  gallery: string[];
  blurb: string;
  story: string[];
  facts: { label: string; value: string }[];
  plan: { level: string; area: string; rooms: Room[] };
};

export type Architect = {
  slug: string;
  name: string;
  studio: string;
  base: string;
  founded: number;
  portrait: string;
  cover: string;
  bio: string;
  disciplines: string[];
  awards: string[];
  followers: string;
};

export type Collection = {
  name: string;
  slug: string;
  count: number;
  cover: string;
  description: string;
  buildings: string[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  cover: string;
  author: string;
};

export const architects: Architect[] = [
  {
    slug: "luis-barragan",
    name: "Luis Barragán",
    studio: "Barragán Estudio",
    base: "Mexico City, MX",
    founded: 1945,
    portrait: u("1507003211169-0a1dd7228f2d", 600),
    cover: u("1600585154340-be6161a56a0c", 1600),
    bio: "Colour as structure. Barragán's work treats light, water and pigment as load-bearing materials, building courtyards that behave like rooms and rooms that behave like landscapes.",
    disciplines: ["Residential", "Landscape", "Colour theory"],
    awards: ["Pritzker Prize, 1980", "UNESCO World Heritage, 2004"],
    followers: "24.1k",
  },
  {
    slug: "frank-lloyd-wright",
    name: "Frank Lloyd Wright",
    studio: "Taliesin Fellowship",
    base: "Spring Green, US",
    founded: 1893,
    portrait: u("1560250097-0b93528c311a", 600),
    cover: u("1580587771525-78b9dba3b914", 1600),
    bio: "Organic architecture as a national language — cantilevers that argue with gravity, plans that dissolve the boundary between hearth and horizon.",
    disciplines: ["Organic", "Residential", "Civic"],
    awards: ["AIA Gold Medal, 1949", "8 UNESCO listed works"],
    followers: "58.7k",
  },
  {
    slug: "louis-kahn",
    name: "Louis Kahn",
    studio: "Kahn Office",
    base: "Philadelphia, US",
    founded: 1935,
    portrait: u("1519085360753-af0119f7cbe7", 600),
    cover: u("1497366216548-37526070297c", 1600),
    bio: "Monumental silence. Kahn asked what a brick wanted to be, and answered with served and servant spaces carved out of concrete and daylight.",
    disciplines: ["Institutional", "Concrete", "Daylighting"],
    awards: ["AIA Gold Medal, 1971", "RIBA Royal Gold Medal, 1972"],
    followers: "31.4k",
  },
  {
    slug: "peter-zumthor",
    name: "Peter Zumthor",
    studio: "Atelier Zumthor",
    base: "Haldenstein, CH",
    founded: 1979,
    portrait: u("1472099645785-5658abf4ff4e", 600),
    cover: u("1518005020951-eccb494ad742", 1600),
    bio: "Atmosphere first. Small output, enormous gravity — stone, steam and sound tuned until a building becomes a physical memory.",
    disciplines: ["Atmosphere", "Stone", "Wellness"],
    awards: ["Pritzker Prize, 2009", "Praemium Imperiale, 2008"],
    followers: "42.9k",
  },
  {
    slug: "pierre-chareau",
    name: "Pierre Chareau",
    studio: "Maison Chareau",
    base: "Paris, FR",
    founded: 1919,
    portrait: u("1500648767791-00dcc994a43e", 600),
    cover: u("1524758631624-e2822e304c36", 1600),
    bio: "Furniture-maker turned house-maker. Chareau engineered domestic interiors like instruments: pivoting screens, glass block skins, exposed rivets.",
    disciplines: ["Interiors", "Furniture", "Glass"],
    awards: ["Salon d'Automne laureate", "Monument Historique, 1986"],
    followers: "12.6k",
  },
  {
    slug: "kazuyo-sejima",
    name: "Kazuyo Sejima",
    studio: "SANAA",
    base: "Tokyo, JP",
    founded: 1995,
    portrait: u("1534528741775-53994a69daeb", 600),
    cover: u("1493397212122-2b85dda8106b", 1600),
    bio: "Weightlessness engineered. Mirrored curves, hairline columns and plans that read as diagrams of human circulation.",
    disciplines: ["Museums", "Transparency", "Urban"],
    awards: ["Pritzker Prize, 2010", "Venice Biennale director, 2010"],
    followers: "36.2k",
  },
];

export const getBuilding = (slug: string) => buildings.find((b) => b.slug === slug);
export const getArchitect = (slug: string) => architects.find((a) => a.slug === slug);
export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
export const buildingsByArchitect = (slug: string) =>
  buildings.filter((b) => b.architectSlug === slug);

const architectByName = (slug: string) => {
  const found = architects.find((a) => a.slug === slug);
  return found?.name ?? "Unknown architect";
};

export const buildings: Building[] = [
  {
    slug: "casa-barragan",
    name: "Casa Barragán",
    architectSlug: "luis-barragan",
    architect: architectByName("luis-barragan"),
    city: "Mexico City",
    country: "MX",
    year: 1948,
    era: "Modern",
    typology: "House & studio",
    materials: ["Volcanic stone", "Lime plaster", "Pine"],
    hero: u("1600585154340-be6161a56a0c", 1600),
    gallery: [
      u("1600566753086-00f18fb6b3ea"),
      u("1616486338812-3dadae4b4ace"),
      u("1502005229762-cf1b2da7c5d6"),
    ],
    blurb: "A quiet fortress of colour in Tacubaya where light is measured out room by room.",
    story: [
      "From the street, Casa Barragán refuses to perform. A flat plastered façade, one small window, a service door — the architecture begins only once you are inside.",
      "The plan folds around a double-height living room whose vast window frames an overgrown garden. Circulation is deliberately slow: low ceilings compress before releasing into light, stairs float without handrails, and pigment does the work that ornament usually does.",
      "Barragán lived and worked here for four decades. The house was listed by UNESCO in 2004 as the only individual property in Latin America inscribed for its contribution to modern architecture.",
    ],
    facts: [
      { label: "Completed", value: "1948" },
      { label: "Footprint", value: "1,161 m²" },
      { label: "Levels", value: "3 + roof terrace" },
      { label: "Status", value: "Museum, UNESCO listed" },
    ],
    plan: {
      level: "Ground floor",
      area: "412 m²",
      rooms: [
        { id: "hall", name: "Entrance hall", area: "22 m²", x: 60, y: 380, w: 180, h: 190 },
        { id: "living", name: "Living room", area: "96 m²", x: 60, y: 120, w: 300, h: 240 },
        { id: "library", name: "Library nook", area: "34 m²", x: 380, y: 120, w: 180, h: 140 },
        { id: "dining", name: "Dining room", area: "48 m²", x: 380, y: 280, w: 180, h: 200 },
        { id: "kitchen", name: "Kitchen", area: "31 m²", x: 580, y: 380, w: 160, h: 190 },
        { id: "studio", name: "Studio", area: "58 m²", x: 580, y: 120, w: 160, h: 240 },
        { id: "garden", name: "Garden court", area: "180 m²", x: 770, y: 120, w: 180, h: 450 },
      ],
    },
  },
  {
    slug: "fallingwater",
    name: "Fallingwater",
    architectSlug: "frank-lloyd-wright",
    architect: architectByName("frank-lloyd-wright"),
    city: "Mill Run",
    country: "US",
    year: 1939,
    era: "Modern",
    typology: "Country house",
    materials: ["Reinforced concrete", "Sandstone", "Steel"],
    hero: u("1580587771525-78b9dba3b914", 1600),
    gallery: [
      u("1512917774080-9991f1c4c750"),
      u("1564013799919-ab600027ffc6"),
      u("1416331108676-a22ccb276e35"),
    ],
    blurb:
      "Cantilevered terraces stacked over a waterfall — a house that refuses a view in favour of immersion.",
    story: [
      "Wright placed the house on the falls rather than opposite them, so the water is heard everywhere and seen almost nowhere.",
      "Trays of reinforced concrete cantilever from a central stone core, anchored by boulders left in place beneath the living room hearth.",
      "The structural audacity came at a cost: the terraces sagged for decades until a post-tensioning retrofit in 2002 stabilised them permanently.",
    ],
    facts: [
      { label: "Completed", value: "1939" },
      { label: "Footprint", value: "492 m²" },
      { label: "Levels", value: "3" },
      { label: "Status", value: "Museum, UNESCO listed" },
    ],
    plan: {
      level: "Main level",
      area: "268 m²",
      rooms: [
        { id: "living", name: "Living room", area: "112 m²", x: 60, y: 100, w: 420, h: 260 },
        { id: "hearth", name: "Hearth", area: "18 m²", x: 60, y: 380, w: 160, h: 160 },
        { id: "dining", name: "Dining alcove", area: "36 m²", x: 240, y: 380, w: 240, h: 160 },
        { id: "kitchen", name: "Kitchen", area: "28 m²", x: 500, y: 380, w: 200, h: 160 },
        { id: "entry", name: "Entry loggia", area: "24 m²", x: 500, y: 100, w: 200, h: 260 },
        { id: "terrace", name: "West terrace", area: "70 m²", x: 720, y: 100, w: 220, h: 440 },
      ],
    },
  },
  {
    slug: "salk-institute",
    name: "Salk Institute",
    architectSlug: "louis-kahn",
    architect: architectByName("louis-kahn"),
    city: "La Jolla",
    country: "US",
    year: 1965,
    era: "Brutalist",
    typology: "Research campus",
    materials: ["Board-formed concrete", "Teak", "Travertine"],
    hero: u("1497366216548-37526070297c", 1600),
    gallery: [
      u("1497366754035-f200968a6e72"),
      u("1503387762-592deb58ef4e"),
      u("1524758631624-e2822e304c36"),
    ],
    blurb: "Two laboratory blocks split by a travertine court aimed at the Pacific horizon.",
    story: [
      "Jonas Salk asked for a building he could invite Picasso to. Kahn answered with a plaza he initially planned as a garden, then emptied on Luis Barragán's advice.",
      "Service floors sit between every lab floor, so research space can be reconfigured without touching structure — the clearest built argument for served and servant space.",
      "Teak panels weather silver against pozzolanic concrete poured without patching; every blemish was accepted as record of making.",
    ],
    facts: [
      { label: "Completed", value: "1965" },
      { label: "Site", value: "27 acres" },
      { label: "Lab levels", value: "3 + interstitial" },
      { label: "Status", value: "Active institute" },
    ],
    plan: {
      level: "Laboratory level 2",
      area: "1,940 m²",
      rooms: [
        { id: "lab-n", name: "North lab", area: "640 m²", x: 60, y: 90, w: 340, h: 200 },
        { id: "study-n", name: "Study towers N", area: "180 m²", x: 60, y: 310, w: 340, h: 110 },
        { id: "court", name: "Central court", area: "520 m²", x: 430, y: 90, w: 140, h: 460 },
        { id: "lab-s", name: "South lab", area: "640 m²", x: 600, y: 90, w: 340, h: 200 },
        { id: "study-s", name: "Study towers S", area: "180 m²", x: 600, y: 310, w: 340, h: 110 },
        { id: "plant", name: "Interstitial plant", area: "220 m²", x: 60, y: 440, w: 340, h: 110 },
      ],
    },
  },
  {
    slug: "maison-de-verre",
    name: "Maison de Verre",
    architectSlug: "pierre-chareau",
    architect: architectByName("pierre-chareau"),
    city: "Paris",
    country: "FR",
    year: 1932,
    era: "Modern",
    typology: "House & clinic",
    materials: ["Glass block", "Steel", "Rubber floor"],
    hero: u("1524758631624-e2822e304c36", 1600),
    gallery: [
      u("1554995207-c18c203602cb"),
      u("1502672260266-1c1ef2d93688"),
      u("1523217582562-09d0def993a6"),
    ],
    blurb: "A glass-block courtyard house slid beneath an existing Parisian apartment.",
    story: [
      "The top-floor tenant refused to move, so Chareau built the house underneath her — jacking a steel frame into the courtyard shell.",
      "Every fitting is bespoke: pivoting cupboards, perforated metal screens, a retractable stair to the private quarters.",
      "By day the glass block dissolves the street; by night the house becomes a lantern that publishes its own plan.",
    ],
    facts: [
      { label: "Completed", value: "1932" },
      { label: "Footprint", value: "358 m²" },
      { label: "Levels", value: "3" },
      { label: "Status", value: "Private, visits by request" },
    ],
    plan: {
      level: "Piano nobile",
      area: "196 m²",
      rooms: [
        { id: "salon", name: "Grand salon", area: "88 m²", x: 60, y: 110, w: 400, h: 300 },
        { id: "stair", name: "Main stair", area: "16 m²", x: 60, y: 430, w: 160, h: 130 },
        { id: "dining", name: "Dining", area: "34 m²", x: 240, y: 430, w: 220, h: 130 },
        { id: "clinic", name: "Consulting rooms", area: "42 m²", x: 480, y: 110, w: 230, h: 200 },
        { id: "service", name: "Service spine", area: "26 m²", x: 480, y: 330, w: 230, h: 230 },
        { id: "court", name: "Glass court", area: "60 m²", x: 730, y: 110, w: 210, h: 450 },
      ],
    },
  },
  {
    slug: "therme-vals",
    name: "Therme Vals",
    architectSlug: "peter-zumthor",
    architect: architectByName("peter-zumthor"),
    city: "Vals",
    country: "CH",
    year: 1996,
    era: "Contemporary",
    typology: "Thermal baths",
    materials: ["Valser quartzite", "Concrete", "Brass"],
    hero: u("1518005020951-eccb494ad742", 1600),
    gallery: [
      u("1470723710355-95304d8aece4"),
      u("1486406146926-c627a92ad1ab"),
      u("1449157291145-7efd050a4d0e"),
    ],
    blurb: "60,000 slabs of local quartzite stacked into a bathing cave cut into the hillside.",
    story: [
      "Zumthor described the brief as building a quarry that had always been there — the baths are entered through the mountain, not the valley.",
      "Fifteen freestanding stone blocks carry the roof; the gaps between them are the circulation, lit by hairline slots of daylight.",
      "Water temperature sequences the plan: 42°C fire bath, 14°C ice bath, a sound chamber tuned to the resonance of wet stone.",
    ],
    facts: [
      { label: "Completed", value: "1996" },
      { label: "Stone", value: "60,000 slabs" },
      { label: "Water", value: "30°C spring" },
      { label: "Status", value: "Protected monument" },
    ],
    plan: {
      level: "Bath level",
      area: "1,240 m²",
      rooms: [
        { id: "indoor", name: "Indoor bath", area: "310 m²", x: 60, y: 100, w: 380, h: 250 },
        { id: "outdoor", name: "Outdoor bath", area: "260 m²", x: 60, y: 370, w: 380, h: 190 },
        { id: "fire", name: "Fire bath 42°C", area: "42 m²", x: 470, y: 100, w: 170, h: 130 },
        { id: "ice", name: "Ice bath 14°C", area: "38 m²", x: 470, y: 250, w: 170, h: 130 },
        { id: "sound", name: "Sound chamber", area: "36 m²", x: 470, y: 400, w: 170, h: 160 },
        { id: "rest", name: "Resting gallery", area: "180 m²", x: 670, y: 100, w: 270, h: 460 },
      ],
    },
  },
  {
    slug: "casa-gilardi",
    name: "Casa Gilardi",
    architectSlug: "luis-barragan",
    architect: architectByName("luis-barragan"),
    city: "Mexico City",
    country: "MX",
    year: 1976,
    era: "Postmodern",
    typology: "Urban house",
    materials: ["Plaster", "Jacaranda", "Water"],
    hero: u("1512917774080-9991f1c4c750", 1600),
    gallery: [
      u("1600607687939-ce8a6c25118c"),
      u("1600566753086-00f18fb6b3ea"),
      u("1502005229762-cf1b2da7c5d6"),
    ],
    blurb: "Barragán's last work: a yellow corridor that ends in a pool room lit blood-red.",
    story: [
      "The clients asked only that a jacaranda tree in the courtyard survive. The plan bends around it.",
      "A narrow corridor glazed in yellow saturates visitors before they step into the dining pool — a room where a red column stands in the water.",
      "Built at 74, it compresses a lifetime of experiments with light into roughly 230 square metres.",
    ],
    facts: [
      { label: "Completed", value: "1976" },
      { label: "Footprint", value: "231 m²" },
      { label: "Levels", value: "3" },
      { label: "Status", value: "Private residence" },
    ],
    plan: {
      level: "Ground floor",
      area: "148 m²",
      rooms: [
        { id: "entry", name: "Entry", area: "14 m²", x: 60, y: 400, w: 150, h: 160 },
        { id: "corridor", name: "Yellow corridor", area: "26 m²", x: 230, y: 400, w: 380, h: 160 },
        { id: "pool", name: "Pool dining room", area: "52 m²", x: 630, y: 330, w: 310, h: 230 },
        { id: "patio", name: "Jacaranda patio", area: "44 m²", x: 60, y: 100, w: 300, h: 270 },
        { id: "kitchen", name: "Kitchen", area: "22 m²", x: 390, y: 100, w: 220, h: 270 },
        { id: "service", name: "Service", area: "18 m²", x: 630, y: 100, w: 310, h: 200 },
      ],
    },
  },
  {
    slug: "glass-pavilion-toledo",
    name: "Glass Pavilion",
    architectSlug: "kazuyo-sejima",
    architect: architectByName("kazuyo-sejima"),
    city: "Toledo",
    country: "US",
    year: 2006,
    era: "Contemporary",
    typology: "Museum",
    materials: ["Curved glass", "Steel", "Terrazzo"],
    hero: u("1493397212122-2b85dda8106b", 1600),
    gallery: [
      u("1487958449943-2429e8be8625"),
      u("1449157291145-7efd050a4d0e"),
      u("1481253127861-534498168948"),
    ],
    blurb: "A single-storey field of curved glass rooms where every wall shows the next.",
    story: [
      "SANAA wrapped the entire programme in glass, then floated interior rooms as separate glass volumes with cavities between them.",
      "Those cavities act as thermal buffers and as circulation — visitors walk through the structure of the building itself.",
      "Reflections multiply the collection endlessly; the pavilion is as much an optical instrument as a museum.",
    ],
    facts: [
      { label: "Completed", value: "2006" },
      { label: "Area", value: "6,000 m²" },
      { label: "Glass panels", value: "360 curved" },
      { label: "Status", value: "Open to public" },
    ],
    plan: {
      level: "Single level",
      area: "6,000 m²",
      rooms: [
        { id: "lobby", name: "Lobby", area: "420 m²", x: 60, y: 100, w: 300, h: 200 },
        { id: "gallery-a", name: "Gallery A", area: "560 m²", x: 60, y: 320, w: 300, h: 240 },
        { id: "cavity", name: "Thermal cavity", area: "300 m²", x: 390, y: 100, w: 120, h: 460 },
        { id: "hotshop", name: "Hot shop", area: "480 m²", x: 540, y: 100, w: 260, h: 240 },
        { id: "gallery-b", name: "Gallery B", area: "500 m²", x: 540, y: 360, w: 260, h: 200 },
        { id: "court", name: "Courtyard", area: "260 m²", x: 830, y: 100, w: 110, h: 460 },
      ],
    },
  },
  {
    slug: "torre-velasca",
    name: "Torre Velasca",
    architectSlug: "louis-kahn",
    architect: architectByName("louis-kahn"),
    city: "Milan",
    country: "IT",
    year: 1958,
    era: "Postmodern",
    typology: "Mixed-use tower",
    materials: ["Concrete", "Terracotta render", "Glass"],
    hero: u("1486406146926-c627a92ad1ab", 1600),
    gallery: [
      u("1470723710355-95304d8aece4"),
      u("1487958449943-2429e8be8625"),
      u("1481253127861-534498168948"),
    ],
    blurb: "A medieval watchtower rebuilt in post-war concrete, flaring outward at the crown.",
    story: [
      "The mushroom profile is structural theatre: apartments demanded larger floorplates than the offices below, so the tower simply grew.",
      "Exposed struts carry the overhang, quoting Lombard fortress brackets without imitating them.",
      "Reviled on completion, it is now protected — an early argument that context can be interpreted rather than copied.",
    ],
    facts: [
      { label: "Completed", value: "1958" },
      { label: "Height", value: "106 m" },
      { label: "Levels", value: "26" },
      { label: "Status", value: "Protected, in use" },
    ],
    plan: {
      level: "Residential level 20",
      area: "780 m²",
      rooms: [
        { id: "core", name: "Core & lifts", area: "96 m²", x: 400, y: 250, w: 200, h: 160 },
        { id: "apt-a", name: "Apartment A", area: "142 m²", x: 60, y: 100, w: 320, h: 190 },
        { id: "apt-b", name: "Apartment B", area: "138 m²", x: 60, y: 310, w: 320, h: 250 },
        { id: "apt-c", name: "Apartment C", area: "150 m²", x: 620, y: 100, w: 320, h: 190 },
        { id: "apt-d", name: "Apartment D", area: "146 m²", x: 620, y: 310, w: 320, h: 250 },
        { id: "lobby", name: "Sky lobby", area: "58 m²", x: 400, y: 100, w: 200, h: 130 },
      ],
    },
  },
  {
    slug: "concrete-monastery",
    name: "La Tourette",
    architectSlug: "peter-zumthor",
    architect: architectByName("peter-zumthor"),
    city: "Éveux",
    country: "FR",
    year: 1961,
    era: "Brutalist",
    typology: "Monastery",
    materials: ["Raw concrete", "Coloured glass", "Steel"],
    hero: u("1470723710355-95304d8aece4", 1600),
    gallery: [
      u("1518005020951-eccb494ad742"),
      u("1486406146926-c627a92ad1ab"),
      u("1449157291145-7efd050a4d0e"),
    ],
    blurb: "A hundred concrete cells hung above a sloping meadow around an empty cloister.",
    story: [
      "The building starts at the roof: the horizontal datum is set at the hilltop and the structure drops legs to meet the falling ground.",
      "Cells are minimal — bed, desk, loggia — while communal spaces collect light through cannons of colour.",
      "Undulating glazing rhythms were set to musical proportion, turning circulation corridors into scored instruments.",
    ],
    facts: [
      { label: "Completed", value: "1961" },
      { label: "Cells", value: "100" },
      { label: "Levels", value: "5" },
      { label: "Status", value: "UNESCO listed" },
    ],
    plan: {
      level: "Cloister level",
      area: "1,120 m²",
      rooms: [
        { id: "church", name: "Church", area: "420 m²", x: 60, y: 100, w: 240, h: 460 },
        { id: "sacristy", name: "Sacristy", area: "72 m²", x: 320, y: 100, w: 180, h: 160 },
        { id: "refectory", name: "Refectory", area: "240 m²", x: 320, y: 280, w: 300, h: 280 },
        { id: "cloister", name: "Cloister court", area: "300 m²", x: 520, y: 100, w: 260, h: 160 },
        { id: "library", name: "Library", area: "150 m²", x: 650, y: 280, w: 290, h: 130 },
        { id: "cells", name: "Cell corridor", area: "180 m²", x: 650, y: 430, w: 290, h: 130 },
      ],
    },
  },
];

export const eras: ("All works" | Era)[] = [
  "All works",
  "Modern",
  "Brutalist",
  "Postmodern",
  "Contemporary",
];

export const articles: Article[] = [
  {
    slug: "the-language-of-concrete",
    title: "The language of concrete",
    excerpt:
      "Board marks, pozzolanic grey, the refusal to patch. How post-war architects turned a structural compromise into a moral position.",
    category: "Materials",
    readTime: "8 min",
    date: "12 Aug 2026",
    cover: u("1486406146926-c627a92ad1ab", 1400),
    author: "Rhea Kulkarni",
  },
  {
    slug: "plans-that-teach",
    title: "Plans that teach",
    excerpt:
      "Reading a floor plan is reading an argument about how people should move. Six drawings that changed the debate.",
    category: "Drawing",
    readTime: "11 min",
    date: "03 Aug 2026",
    cover: u("1503387762-592deb58ef4e", 1400),
    author: "Tomás Vega",
  },
  {
    slug: "colour-as-structure",
    title: "Colour as structure",
    excerpt:
      "In Tacubaya, pigment carries as much load as masonry. A walk through Barragán's chromatic engineering.",
    category: "Interiors",
    readTime: "6 min",
    date: "27 Jul 2026",
    cover: u("1600585154340-be6161a56a0c", 1400),
    author: "Ines Duarte",
  },
  {
    slug: "small-spaces-long-lives",
    title: "Small spaces, long lives",
    excerpt:
      "Why the 40-square-metre apartment keeps outlasting the villa, and what designers keep getting wrong about compact living.",
    category: "Housing",
    readTime: "9 min",
    date: "15 Jul 2026",
    cover: u("1502005229762-cf1b2da7c5d6", 1400),
    author: "Marek Nowak",
  },
];

export const collections = [
  {
    name: "Concrete devotion",
    slug: "concrete-devotion",
    count: 18,
    cover: u("1470723710355-95304d8aece4", 800),
    description:
      "Buildings that treat concrete as a spiritual material — where mass, texture and light converge into something接近 monolithic and tender at once.",
    buildings: [
      "salk-institute",
      "concrete-monastery",
      "torre-velasca",
      "the-language-of-concrete",
    ],
  },
  {
    name: "Light wells",
    slug: "light-wells",
    count: 24,
    cover: u("1524758631624-e2822e304c36", 800),
    description:
      "Architecture orchestrated around the capture and distribution of natural light — from courtyards to atriums and light shelves.",
    buildings: ["casa-barragan", "maison-de-verre", "glass-pavilion-toledo", "therme-vals"],
  },
  {
    name: "Warm minimalism",
    slug: "warm-minimalism",
    count: 31,
    cover: u("1616486338812-3dadae4b4ace", 800),
    description:
      "Reduced forms enriched by natural materials, craft details and a careful balance between restraint and warmth.",
    buildings: ["casa-gilardi", "fallingwater", "plans-that-teach", "colour-as-structure"],
  },
  {
    name: "Glass skins",
    slug: "glass-skins",
    count: 12,
    cover: u("1493397212122-2b85dda8106b", 800),
    description:
      "Transparent and translucent envelopes that dissolve the boundary between interior and exterior, city and sky.",
    buildings: [
      "maison-de-verre",
      "glass-pavilion-toledo",
      "small-spaces-long-lives",
      "casa-barragan",
    ],
  },
];
