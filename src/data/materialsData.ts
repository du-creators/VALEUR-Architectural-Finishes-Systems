import { FinishItem } from '../utils/moodboard';

export interface ProductItem {
  id: string;
  name: string;
  category: 'cladding' | 'metals' | 'timber' | 'monolithic';
  categoryLabel: string;
  tagline: string;
  material: string;
  finishOption: string;
  origin: string;
  lrv: number;
  fireRating: 'Class A' | 'Euroclass A1' | 'Non-Combustible';
  compressiveStrength: string;
  thermalConductivity: string;
  leedCredits: string[];
  dimensionsStandard: string;
  weightPerM2: string;
  leadTime: string;
  image: string;
  description: string;
  specCode: string;
  features: string[];
  swatchHex: string;
}

export interface ProjectPortfolioItem {
  id: string;
  title: string;
  location: string;
  architect: string;
  completionYear: number;
  typology: 'Residential' | 'Cultural' | 'Commercial' | 'Hospitality';
  image: string;
  description: string;
  specifiedMaterials: string[];
}

export interface ArchitecturalArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
}

export const FINISH_SWATCHES: FinishItem[] = [
  {
    id: 'swatch-limestone-fluted',
    name: 'Vaucluse Honed Fluted Limestone',
    category: 'stone',
    subCategory: 'Architectural Stone Cladding',
    code: 'STN-VAU-09',
    hex: '#D6CDC0',
    finishType: 'Fluted',
    lrv: 58,
    fireRating: 'Euroclass A1',
    leadTimeWeeks: 5,
    description: 'Fine-grained French limestone featuring precise 18mm fluted channels with velvet matte honing.',
    weightKg: 0.65,
    image: '/src/assets/images/product_fluted_limestone_1793708248339.jpg',
  },
  {
    id: 'swatch-bronze-patina',
    name: 'Nocturne Hand-Patinated Bronze',
    category: 'metal',
    subCategory: 'Extruded Facade & Hardware',
    code: 'MTL-BRZ-44',
    hex: '#2B2520',
    finishType: 'Patinated',
    lrv: 11,
    fireRating: 'Non-Combustible',
    leadTimeWeeks: 4,
    description: 'Deep oxidized bronze with hand-rubbed warm copper undertones and microcrystalline wax seal.',
    weightKg: 0.45,
    image: '/src/assets/images/product_blackened_bronze_1793708249056.jpg',
  },
  {
    id: 'swatch-champagne-anodized',
    name: 'Aurelia Brushed Champagne Aluminum',
    category: 'metal',
    subCategory: 'Architectural Profiles & Trims',
    code: 'MTL-ALU-18',
    hex: '#C5A880',
    finishType: 'Brushed',
    lrv: 42,
    fireRating: 'Non-Combustible',
    leadTimeWeeks: 3,
    description: '25-micron anodic coating with satin directional brushing; high coastal salt-spray resistance.',
    weightKg: 0.35,
  },
  {
    id: 'swatch-basalt-smoked',
    name: 'Valser Smoked Volcanic Basalt',
    category: 'stone',
    subCategory: 'Monolithic Surface Slabs',
    code: 'STN-BST-72',
    hex: '#37383B',
    finishType: 'Honed',
    lrv: 16,
    fireRating: 'Euroclass A1',
    leadTimeWeeks: 6,
    description: 'Dense Swiss alpine basalt with microscopic quartzite crystalline veining and silk-touch finish.',
    weightKg: 0.75,
  },
  {
    id: 'swatch-travertine-navona',
    name: 'Navona Vein-Cut Cross Travertine',
    category: 'stone',
    subCategory: 'Interior & Facade Masonry',
    code: 'STN-TRV-15',
    hex: '#E2D9C8',
    finishType: 'Honed',
    lrv: 64,
    fireRating: 'Euroclass A1',
    leadTimeWeeks: 5,
    description: 'Tivoli quarry sedimentary travertine, semi-filled with translucent mineral resin.',
    weightKg: 0.60,
  },
  {
    id: 'swatch-oak-fumed',
    name: 'Fumed European Bog Oak',
    category: 'timber',
    subCategory: 'Acoustic Paneling & Millwork',
    code: 'TMB-OAK-33',
    hex: '#3A2E25',
    finishType: 'Natural',
    lrv: 14,
    acousticRatingNRC: 0.85,
    fireRating: 'Class A',
    leadTimeWeeks: 4,
    description: 'Quarter-sawn fumed European oak treated with zero-VOC plant oils; integrated acoustic PET backing.',
    weightKg: 0.30,
  },
  {
    id: 'swatch-concrete-mineral',
    name: 'Raw Pozzolanic Mineral Concrete',
    category: 'concrete',
    subCategory: 'Cast Architectural Panels',
    code: 'CNC-POZ-81',
    hex: '#8D8C87',
    finishType: 'Acid-Etched',
    lrv: 35,
    fireRating: 'Euroclass A1',
    leadTimeWeeks: 5,
    description: 'Ultra-high performance concrete utilizing 60% supplementary cementitious pozzolana.',
    weightKg: 0.70,
  },
  {
    id: 'swatch-glass-fluted',
    name: 'Cast Optiwhite Linear Fluted Glass',
    category: 'glass',
    subCategory: 'Translucent Spatial Partitions',
    code: 'GLS-OPT-04',
    hex: '#CBD5D0',
    finishType: 'Fluted',
    lrv: 78,
    fireRating: 'Non-Combustible',
    leadTimeWeeks: 4,
    description: 'Low-iron architectural cast glass with 12mm deep fluted texture providing 88% visual privacy.',
    weightKg: 0.50,
  },
];

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: 'prod-fluted-limestone',
    name: 'Vaucluse Honed Fluted Limestone Cladding',
    category: 'cladding',
    categoryLabel: 'Stone Facades',
    tagline: 'Dimensional acoustic shadow play in French limestone',
    material: 'Natural French Limestone (Vaucluse Basin)',
    finishOption: 'Honed Velvet with 18mm Precision Flutes',
    origin: 'Provence, France',
    lrv: 58,
    fireRating: 'Euroclass A1',
    compressiveStrength: '142 MPa',
    thermalConductivity: '1.25 W/mK',
    leedCredits: ['MRc1 Life-Cycle Impact', 'MRc2 Environmental Declarations', 'EQc2 Low-Emitting Materials'],
    dimensionsStandard: '1200 x 600 x 30 mm (Custom up to 2400 mm)',
    weightPerM2: '68 kg/m²',
    leadTime: '4–6 Weeks (Ex-Stock in Lyon)',
    image: '/src/assets/images/product_fluted_limestone_1793708248339.jpg',
    description: 'Engineered for high-end exterior rainscreens and interior monumental walls. Each panel is carved from monolithic French stone blocks, producing rhythmic shadow geometry under shifting sun angles.',
    specCode: 'CSI 04 42 00 — Exterior Stone Cladding',
    features: [
      'Concealed kerf anchoring system with stainless brackets',
      'Zero synthetic polymer binders or artificial sealants',
      'Anti-graffiti breathable silane impregnating seal',
      'Fully certified for high-velocity hurricane and seismic zones',
    ],
    swatchHex: '#D6CDC0',
  },
  {
    id: 'prod-blackened-bronze',
    name: 'Nocturne Hand-Patinated Architectural Bronze',
    category: 'metals',
    categoryLabel: 'Metals & Extrusions',
    tagline: 'Sculptural reveals, curtain-wall mullions & architectural door hardware',
    material: 'CuZn40Pb2 High-Tensile Architectural Bronze',
    finishOption: 'Hand-Oxidized Nocturne Patina with Beeswax Finish',
    origin: 'Milan, Italy',
    lrv: 11,
    fireRating: 'Non-Combustible',
    compressiveStrength: '480 MPa Yield',
    thermalConductivity: '115 W/mK',
    leedCredits: ['MRc3 Sourcing of Raw Materials (85% Recycled Content)', 'MRc4 Material Ingredients'],
    dimensionsStandard: 'Custom bespoke profile extrusions up to 6000 mm lengths',
    weightPerM2: 'Profiles: 3.8 kg/linear meter',
    leadTime: '3–5 Weeks',
    image: '/src/assets/images/product_blackened_bronze_1793708249056.jpg',
    description: 'Architectural bronze profiles and hardware patinated through traditional multi-stage chemical oxidization. Ages gracefully with tactile touch and exposure, forming a rich, self-healing historical lustre.',
    specCode: 'CSI 05 50 00 — Metal Fabrications',
    features: [
      'Engineered thermal break assemblies for facade mullions',
      'Hand-crafted mortise locks, flush pulls, and pivot plates',
      'Marine-grade atmospheric corrosion resistance',
      'Tactile acoustic dampening in door closers',
    ],
    swatchHex: '#2B2520',
  },
  {
    id: 'prod-vals-basalt',
    name: 'Valser Smoked Volcanic Basalt Slab',
    category: 'cladding',
    categoryLabel: 'Monolithic Stone',
    tagline: 'Deep anthracite metamorphic stone with silk micro-texture',
    material: 'Quarried Swiss Basalt Metamorphic Rock',
    finishOption: 'Smoked Silk Honed, Diamond Sawn Edges',
    origin: 'Vals, Switzerland',
    lrv: 16,
    fireRating: 'Euroclass A1',
    compressiveStrength: '210 MPa',
    thermalConductivity: '1.70 W/mK',
    leedCredits: ['MRc1 Building Life-Cycle', 'EQc1 Acoustic Performance'],
    dimensionsStandard: '2800 x 1400 x 20 mm / 30 mm',
    weightPerM2: '78 kg/m²',
    leadTime: '5–7 Weeks',
    image: '/src/assets/images/hero_architectural_pavilion_1793708247633.jpg',
    description: 'Extracted from high-altitude alpine deposits. Renowned for its monolithic dark grey presence, frost-proof density, and fine quartzite micro-striations prized in minimalist bath sanctuaries and civic pavilions.',
    specCode: 'CSI 09 30 13 — Ceramic & Natural Stone Tiling',
    features: [
      'Near-zero water absorption (< 0.15%)',
      'Ideal for underfloor thermal mass radiant heating',
      'Slip resistance classification R11 / P4',
      'High chemical and acid resistance against spa minerals',
    ],
    swatchHex: '#37383B',
  },
  {
    id: 'prod-acoustic-oak',
    name: 'Aethel Ribbed Fumed European Oak Paneling',
    category: 'timber',
    categoryLabel: 'Acoustic Timber',
    tagline: 'Architectural acoustic micro-slats with recycled felt core',
    material: 'FSC-Certified French White Oak on Recycled PET Felt',
    finishOption: 'Fumed Dark Smoked with Matte Plant Wax',
    origin: 'Bavaria, Germany',
    lrv: 14,
    fireRating: 'Class A',
    compressiveStrength: 'Bending Strength 110 N/mm²',
    thermalConductivity: '0.13 W/mK',
    leedCredits: ['MRc7 Certified Wood', 'EQc2 Low-Emitting Materials', 'EQc9 Acoustic Performance'],
    dimensionsStandard: '2400 x 600 x 22 mm panels',
    weightPerM2: '9.2 kg/m²',
    leadTime: '3 Weeks',
    image: '/src/assets/images/project_brutalist_villa_1793708249447.jpg',
    description: 'Seamless wall-to-ceiling architectural timber slats engineered for concert halls, executive boardrooms, and luxury residences. Delivers balanced acoustic reverberation absorption without sacrificing monolithic warmth.',
    specCode: 'CSI 09 84 00 — Acoustic Room Components',
    features: [
      'NRC 0.85 Class A broadband acoustic absorption',
      'Concealed tongue-and-groove jointing for uninterrupted runs',
      'Zero added formaldehyde (NAUF) resin matrices',
      'Curved radius corner profiles available upon specification',
    ],
    swatchHex: '#3A2E25',
  },
  {
    id: 'prod-pozzolanic-concrete',
    name: 'Pozzolanic Low-Carbon Monolithic Concrete Panels',
    category: 'monolithic',
    categoryLabel: 'Engineered Minerals',
    tagline: 'Tactile architectural precast with 65% lower embodied carbon',
    material: 'Ultra-High Performance Pozzolanic Geopolymer',
    finishOption: 'Acid-Etched Micro-Pores or Board-Formed Grain',
    origin: 'Zurich, Switzerland',
    lrv: 35,
    fireRating: 'Euroclass A1',
    compressiveStrength: '115 MPa',
    thermalConductivity: '0.98 W/mK',
    leedCredits: ['MRc1 Decarbonized Materials', 'MRc2 EPD Verified', 'MRc4 Material Sourcing'],
    dimensionsStandard: '3000 x 1200 x 16 mm ultra-thin composite',
    weightPerM2: '36 kg/m²',
    leadTime: '4 Weeks',
    image: '/src/assets/images/project_brutalist_villa_1793708249447.jpg',
    description: 'A revolutionary architectural mineral surface engineered for exterior ventilated rainscreens, soffits, and monumental interior feature walls. Combines the timeless weight of concrete with lightweight cladding ease.',
    specCode: 'CSI 03 45 00 — Precast Architectural Concrete',
    features: [
      'Ductile glass fiber reinforcement eliminates internal steel rebar',
      '100% non-combustible A1 fire classification',
      'Freeze-thaw resilience tested across 300 cycles',
      'Custom integral mineral pigmentation matching RAL / NCS palettes',
    ],
    swatchHex: '#8D8C87',
  },
];

export const PROJECTS_PORTFOLIO: ProjectPortfolioItem[] = [
  {
    id: 'proj-napa-cantilever',
    title: 'Napa Valley Cantilever Residence',
    location: 'St. Helena, California',
    architect: 'Kappe & Associates',
    completionYear: 2025,
    typology: 'Residential',
    image: '/src/assets/images/project_brutalist_villa_1793708249447.jpg',
    description: 'Suspended over native vineyards, this pavilion balances massive in-situ raw concrete cantilevers with continuous ribbons of blackened bronze thermal mullions and floor-to-ceiling low-iron glazing.',
    specifiedMaterials: [
      'Vaucluse Honed Fluted Limestone Cladding',
      'Nocturne Hand-Patinated Bronze Mullions',
      'Valser Smoked Volcanic Basalt Floors',
    ],
  },
  {
    id: 'proj-zurich-pavilion',
    title: 'Kunsthaus Modern Civic Gallery',
    location: 'Zurich, Switzerland',
    architect: 'Studio Chipperfield Zurich',
    completionYear: 2024,
    typology: 'Cultural',
    image: '/src/assets/images/hero_architectural_pavilion_1793708247633.jpg',
    description: 'An expansive museum atrium defined by 12-meter-tall fluted limestone pilasters, acoustically tuned fumed oak ceiling coffers, and honed terrazzo aggregate slabs illuminated by diffused skylights.',
    specifiedMaterials: [
      'Vaucluse Honed Fluted Limestone',
      'Aurelia Brushed Champagne Aluminum Profiles',
      'Aethel Ribbed Fumed European Oak',
    ],
  },
  {
    id: 'proj-kyoto-atelier',
    title: 'Uji River Minimalist Tea Pavilion',
    location: 'Kyoto, Japan',
    architect: 'Taniguchi Architecture Lab',
    completionYear: 2026,
    typology: 'Hospitality',
    image: '/src/assets/images/product_fluted_limestone_1793708248339.jpg',
    description: 'A contemplative sanctuary honoring wabi-sabi principles through tactile honesty. Hand-charred Japanese cedar screens harmonize with acid-etched mineral concrete plinths and dark patinated bronze joinery.',
    specifiedMaterials: [
      'Nocturne Hand-Patinated Bronze',
      'Raw Pozzolanic Mineral Concrete',
      'Cast Optiwhite Linear Fluted Glass',
    ],
  },
];

export const ARCHITECTURAL_ARTICLES: ArchitecturalArticle[] = [
  {
    id: 'art-01',
    title: 'The Re-Emergence of Monolithic French Limestone in High-Performance Facades',
    date: 'October 2026',
    category: 'Material Science',
    readTime: '6 min read',
    excerpt: 'Examining the structural resilience, thermal inertia, and life-cycle carbon advantages of natural quarried stone over composite panels in mid-rise envelopes.',
  },
  {
    id: 'art-02',
    title: 'Engineering Architectural Bronze Mullions for Coastal Hurricane Envelopes',
    date: 'September 2026',
    category: 'Facade Engineering',
    readTime: '8 min read',
    excerpt: 'Detailed analysis of electrolytic galvanic isolation, structural windload deflection criteria, and natural self-passivating patination chemistry.',
  },
  {
    id: 'art-03',
    title: 'Acoustic Reverberation Control in Concrete & Glass Atriums: NRC 0.85 Strategies',
    date: 'August 2026',
    category: 'Spatial Acoustics',
    readTime: '5 min read',
    excerpt: 'How micro-perforated timber slats and sound-absorbing porous stone profiles integrate seamlessly into minimalist architectural spaces.',
  },
];
