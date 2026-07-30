// DC Point - Mock Data & Data Schema
import leatherBagImg from '../assets/leather_bag.jpg';
import neonSignImg from '../assets/neon_sign.jpg';
import pcbBoardImg from '../assets/pcb_board.jpg';
import honeyJarImg from '../assets/honey_jar.jpg';
import cinemaCameraImg from '../assets/cinema_camera.jpg';
import djSystemImg from '../assets/dj_system.png';
import droneRigImg from '../assets/drone_rig.png';
import audioPackImg from '../assets/audio_pack.png';
import lightingKitImg from '../assets/lighting_kit.png';
import woodKeyboardImg from '../assets/wood_keyboard.png';
import edcToolImg from '../assets/edc_tool.png';
import alpacaBlanketImg from '../assets/alpaca_blanket.png';
import redCameraImg from '../assets/red_camera.png';
import vrCameraImg from '../assets/vr_camera.png';
import strobePackImg from '../assets/strobe_pack.png';

export const FALLBACK_IMAGES = {
  leatherBag: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%231E293B"/><rect x="150" y="120" width="300" height="200" rx="16" fill="%23854D0E" stroke="%23CA8A04" stroke-width="4"/><path d="M 200 120 L 200 80 Q 300 50 400 80 L 400 120" fill="none" stroke="%23CA8A04" stroke-width="6"/><rect x="270" y="200" width="60" height="40" rx="6" fill="%23EAB308"/><text x="300" y="360" font-family="sans-serif" font-size="20" font-weight="bold" fill="%2394A3B8" text-anchor="middle">Full-Grain Leather Bag</text></svg>',
  cinemaCamera: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%230F172A"/><rect x="180" y="140" width="200" height="150" rx="12" fill="%231E293B" stroke="%2300ADB5" stroke-width="4"/><circle cx="430" cy="215" r="55" fill="%23334155" stroke="%2300ADB5" stroke-width="6"/><circle cx="430" cy="215" r="30" fill="%230F172A"/><circle cx="230" cy="100" r="35" fill="%231E293B" stroke="%2338BDF8" stroke-width="4"/><circle cx="330" cy="100" r="35" fill="%231E293B" stroke="%2338BDF8" stroke-width="4"/><text x="300" y="360" font-family="sans-serif" font-size="20" font-weight="bold" fill="%2338BDF8" text-anchor="middle">Cinema 4K Rig Package</text></svg>',
  neonSign: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23050B14"/><text x="300" y="210" font-family="sans-serif" font-size="38" font-weight="900" fill="%2300F0FF" text-anchor="middle">DC POINT NEON</text><text x="300" y="360" font-family="sans-serif" font-size="20" font-weight="bold" fill="%2300F0FF" text-anchor="middle">Glowing Neon Signage</text></svg>',
  pcbBoard: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23064E3B"/><rect x="100" y="80" width="400" height="240" rx="10" fill="%23047857" stroke="%2310B981" stroke-width="4"/><rect x="250" y="150" width="100" height="100" rx="8" fill="%23065F46" stroke="%23F59E0B" stroke-width="3"/><line x1="120" y1="120" x2="250" y2="170" stroke="%23F59E0B" stroke-width="3"/><line x1="480" y1="280" x2="350" y2="230" stroke="%23F59E0B" stroke-width="3"/><text x="300" y="360" font-family="sans-serif" font-size="20" font-weight="bold" fill="%23A7F3D0" text-anchor="middle">PCB Prototype Circuit</text></svg>',
  honeyJar: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23451A03"/><rect x="220" y="120" width="160" height="200" rx="30" fill="%23D97706" opacity="0.9" stroke="%23FBBF24" stroke-width="4"/><rect x="240" y="90" width="120" height="30" rx="6" fill="%2378350F"/><text x="300" y="360" font-family="sans-serif" font-size="20" font-weight="bold" fill="%23FDE68A" text-anchor="middle">Artisanal Raw Honey</text></svg>'
};

export const DEFAULT_IMAGES = {
  leatherBag: leatherBagImg,
  neonSign: neonSignImg,
  pcbBoard: pcbBoardImg,
  honeyJar: honeyJarImg,
  cinemaCamera: cinemaCameraImg
};

export const INITIAL_USER_PERSONAS = [
  {
    id: 'user_buyer_1',
    name: 'Alex Mercer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Buyer Focus',
    email: 'alex.mercer@trade-tech.io',
    phone: '+1 (555) 234-8901',
    walletBalance: 4315, // Updated from 4500 after locking ₹185 in Escrow for Trade #trade-101
    trustScore: 98,
    verifiedStatus: 'Fully Verified (ID + Bank Linked)',
    completedTrades: 14,
    rating: 4.9,
    reviewsCount: 14,
    joinDate: 'Jan 2025'
  },
  {
    id: 'user_seller_1',
    name: 'Maya Lin / CraftedStudio',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'Artisan Seller (Unregistered Business)',
    email: 'maya@craftedstudio.design',
    phone: '+1 (555) 987-6543',
    walletBalance: 2850,
    trustScore: 99,
    verifiedStatus: 'Compliance Verified (Government ID + Escrow Bond)',
    completedTrades: 38,
    rating: 4.96,
    reviewsCount: 36,
    joinDate: 'Nov 2024'
  },
  {
    id: 'user_admin_1',
    name: 'Platform Super Admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Super Admin (Platform Owner)',
    email: 'admin@dcpoint.io',
    phone: '+1 (555) 000-8888',
    walletBalance: 1458.50, // Cumulative 5% Escrow Fee Platform Revenue
    trustScore: 100,
    verifiedStatus: 'System Master Governance Account',
    completedTrades: 152,
    rating: 5.0,
    reviewsCount: 152,
    joinDate: 'Jan 2024'
  }
];

export const INITIAL_PURCHASE_LISTINGS = [
  {
    id: 'prod-001',
    title: 'Custom Handcrafted Full-Grain Leather Messenger Bag',
    category: 'Craft & Goods',
    type: 'purchase',
    price: 185,
    unit: 'per piece',
    sellerId: 'user_seller_1',
    sellerName: 'Maya Lin (CraftedStudio)',
    sellerRating: 4.96,
    sellerCompletedTrades: 38,
    complianceStatus: 'Verified',
    complianceBadgeText: 'AI Compliance Passed • Legal Contract Ready',
    image: leatherBagImg,
    description: 'Custom handmade leather bag built using vegetable-tanned full-grain leather. Custom initials stamping included.',
    specifications: [
      { label: 'Material', value: '100% Full-grain Italian Leather' },
      { label: 'Dimensions', value: '15.5" x 11" x 4"' },
      { label: 'Crafting Time', value: '5-7 Business Days' },
      { label: 'Warranty', value: '2-Year Craftsmanship Guarantee' }
    ],
    sampleAgreementTerms: {
      deliveryWindowDays: 7,
      inspectionWindowHours: 48,
      allowCustomPackaging: true,
      qualityStandard: 'Zero defect surface, brass hardware double-stitched',
      customNotes: 'Please emboss initials A.M. on the inside flap.'
    },
    suggested: true,
    bestSeller: true
  },
  {
    id: 'prod-002',
    title: 'Custom Glowing Electric Cyan Neon Signage',
    category: 'Tech & Electronics',
    type: 'purchase',
    price: 240,
    unit: 'per unit',
    sellerId: 'user_seller_1',
    sellerName: 'Maya Lin (CraftedStudio)',
    sellerRating: 4.96,
    sellerCompletedTrades: 38,
    complianceStatus: 'Verified',
    complianceBadgeText: 'AI Compliance Passed • Safety Tested',
    image: neonSignImg,
    description: 'Custom acrylic LED neon sign for storefronts, event backdrops, or personal studio space. Includes dimmer remote.',
    specifications: [
      { label: 'Tube Spec', value: 'Silicone LED Flexible Tube 12V' },
      { label: 'Backing', value: '6mm Clear Acrylic Contour Cut' },
      { label: 'Lead Time', value: '4-6 Days' },
      { label: 'Lifespan', value: '50,000+ Operating Hours' }
    ],
    sampleAgreementTerms: {
      deliveryWindowDays: 6,
      inspectionWindowHours: 24,
      allowCustomPackaging: true,
      qualityStandard: 'UL Certified transformer test photo required prior to shipping',
      customNotes: 'Custom neon text spelling "DC POINT" with power adapter.'
    },
    suggested: true,
    bestSeller: false
  },
  {
    id: 'prod-003',
    title: 'Custom PCB Circuit Board Rapid Prototyping (Batch of 10)',
    category: 'Industrial & Tools',
    type: 'purchase',
    price: 320,
    unit: 'per batch of 10',
    sellerId: 'seller_circuit_master',
    sellerName: 'Apex Circuit Lab',
    sellerRating: 4.88,
    sellerCompletedTrades: 22,
    complianceStatus: 'Verified',
    complianceBadgeText: 'IP Safety Standard Verified',
    image: pcbBoardImg,
    description: 'Multi-layer FR4 PCB fabrication with pick-and-place component assembly for tech startups and prototype testing.',
    specifications: [
      { label: 'Layers', value: '2 - 6 Layers available' },
      { label: 'Surface Finish', value: 'ENIG (Electroless Nickel Immersion Gold)' },
      { label: 'Turnaround', value: '5 Days Express' }
    ],
    sampleAgreementTerms: {
      deliveryWindowDays: 5,
      inspectionWindowHours: 72,
      qualityStandard: 'IPC-A-610 Class 2 Soldering Inspection Proof',
      customNotes: 'Include IPC-A-610 Class 2 soldering test video prior to dispatch.'
    },
    suggested: false,
    bestSeller: true
  },
  {
    id: 'prod-004',
    title: 'Artisanal Pure Raw Wildflower Honey (12 Jars Export Pack)',
    category: 'Craft & Goods',
    type: 'purchase',
    price: 110,
    unit: 'per 12-pack',
    sellerId: 'seller_bee_farm',
    sellerName: 'Golden Hive Organics',
    sellerRating: 4.92,
    sellerCompletedTrades: 54,
    complianceStatus: 'Verified',
    complianceBadgeText: 'Food Safety Compliance Checked',
    image: honeyJarImg,
    description: 'Unfiltered, unpasteurized cold-extracted raw honey harvested from sustainable forest hives. Glass jars sealed with security strip.',
    specifications: [
      { label: 'Purity', value: '100% Unpasteurized Honey' },
      { label: 'Jar Size', value: '500g Glass Jars' },
      { label: 'Packaging', value: 'Eco-bubble protective crate' }
    ],
    sampleAgreementTerms: {
      deliveryWindowDays: 4,
      inspectionWindowHours: 24,
      qualityStandard: 'Zero breakage guarantee upon buyer unboxing',
      customNotes: 'Ensure fragile security seals are intact on all 12 jars.'
    },
    suggested: false,
    bestSeller: false
  },
  {
    id: 'prod-005',
    title: 'Hand-Carved Solid Walnut Mechanical Keyboard & Custom Brass Plate',
    category: 'Tech & Electronics',
    type: 'purchase',
    price: 290,
    unit: 'per unit',
    sellerId: 'user_buyer_1',
    sellerName: 'Alex Mercer (TimberTech Studios)',
    sellerRating: 4.93,
    sellerCompletedTrades: 19,
    complianceStatus: 'Verified',
    complianceBadgeText: 'AI Compliance Passed • Certified Craftsmanship',
    image: woodKeyboardImg,
    description: 'Custom handcrafted 75% mechanical keyboard housed in a solid North American walnut wood chassis with laser-engraved brass plate and hot-swappable tactile switches.',
    specifications: [
      { label: 'Wood Chassis', value: 'Solid American Black Walnut (Oiled Finish)' },
      { label: 'Plate & PCB', value: 'CNC Brass Plate with Hotswap RGB PCB' },
      { label: 'Connectivity', value: 'USB-C Braided Cable + Bluetooth 5.2' }
    ],
    sampleAgreementTerms: {
      deliveryWindowDays: 6,
      inspectionWindowHours: 48,
      qualityStandard: 'Key switch sound check video & scratch-free wood finish inspection',
      customNotes: 'Include extra walnut wrist rest and custom keycap puller.'
    },
    suggested: true,
    bestSeller: true
  },
  {
    id: 'prod-006',
    title: 'Titanium Precision CNC Machined EDC Pen & Multi-Tool Set',
    category: 'Industrial & Tools',
    type: 'purchase',
    price: 165,
    unit: 'per set',
    sellerId: 'seller_precision_labs',
    sellerName: 'PrecisionCraft Labs',
    sellerRating: 4.89,
    sellerCompletedTrades: 27,
    complianceStatus: 'Verified',
    complianceBadgeText: 'Material Certificate Verified',
    image: edcToolImg,
    description: 'Aerospace-grade Grade 5 Titanium bolt-action pen combined with a precision CNC machined multi-tool pry bar. Corrosion-proof for daily carry.',
    specifications: [
      { label: 'Material', value: 'Grade 5 (Ti-6Al-4V) Aerospace Titanium' },
      { label: 'Refill Spec', value: 'Schmidt EasyFlow 9000 Medium Black' },
      { label: 'Finish', value: 'Stonewashed Matte Titanium' }
    ],
    sampleAgreementTerms: {
      deliveryWindowDays: 4,
      inspectionWindowHours: 24,
      qualityStandard: 'Bolt action smoothness check & hardness test certificate',
      customNotes: 'Laser-engrave custom serial number #DC-TI-2026 on pen pocket clip.'
    },
    suggested: false,
    bestSeller: false
  },
  {
    id: 'prod-007',
    title: 'Custom Hand-Woven Organic Alpaca Wool Blanket & Throw',
    category: 'Craft & Goods',
    type: 'purchase',
    price: 135,
    unit: 'per piece',
    sellerId: 'seller_highland_wool',
    sellerName: 'Highland Artisans Co.',
    sellerRating: 4.97,
    sellerCompletedTrades: 45,
    complianceStatus: 'Verified',
    complianceBadgeText: 'Eco-Textile Certified',
    image: alpacaBlanketImg,
    description: '100% natural, hypoallergenic organic baby alpaca wool throw blanket. Hand-loomed by master Andean weavers without synthetic dyes.',
    specifications: [
      { label: 'Fabric Composition', value: '100% Organic Baby Alpaca Wool' },
      { label: 'Dimensions', value: '70" x 50" (178cm x 127cm)' },
      { label: 'Weave Type', value: 'Twill Weave with Hand-Twisted Fringes' }
    ],
    sampleAgreementTerms: {
      deliveryWindowDays: 5,
      inspectionWindowHours: 48,
      qualityStandard: 'Zero synthetic fiber test & unbleached natural dye verification',
      customNotes: 'Package in cedar wood gift box with handwritten craft certificate.'
    },
    suggested: true,
    bestSeller: true
  }
];

export const INITIAL_RENT_LISTINGS = [
  {
    id: 'rent-001',
    title: 'Cinema 4K FX3 Video Production Rig & Lens Package',
    category: 'Rentals',
    type: 'rent',
    price: 140,
    unit: 'per day',
    rentalDeposit: 300,
    sellerId: 'seller_cine_rentals',
    sellerName: 'FrameRate Cine Equipment',
    sellerRating: 4.98,
    sellerCompletedTrades: 62,
    complianceStatus: 'Verified',
    complianceBadgeText: 'Equipment Insurance Verified',
    image: cinemaCameraImg,
    description: 'Complete 4K cinema camera package including Sony FX3 body, 24-70mm f/2.8 GM II lens, wireless mic set, V-mount batteries & Pelican case.',
    specifications: [
      { label: 'Resolution', value: '4K 120fps 10-bit 4:2:2' },
      { label: 'Included Extras', value: '2x 160GB CFexpress Type A Cards, Atomos Monitor' },
      { label: 'Security Deposit', value: '₹300 (Held in DC Point Escrow)' }
    ],
    sampleAgreementTerms: {
      deliveryWindowDays: 1,
      inspectionWindowHours: 12,
      qualityStandard: 'Sensor clean check & operational video proof before release',
      customNotes: 'Include extra Atomos HDMI cable and Pelican hard case.'
    },
    suggested: true,
    bestSeller: true
  },
  {
    id: 'rent-002',
    title: 'Pioneer DJ System (2x CDJ-3000 + DJM-A9 Mixer + Flight Case)',
    category: 'Rentals',
    type: 'rent',
    price: 195,
    unit: 'per day',
    rentalDeposit: 400,
    sellerId: 'seller_audio_vault',
    sellerName: 'SoundWave Event Gear',
    sellerRating: 4.91,
    sellerCompletedTrades: 41,
    complianceStatus: 'Verified',
    complianceBadgeText: 'Sound Tech Inspected',
    image: djSystemImg,
    description: 'Flagship club standard DJ setup in heavy flight cases. Ready for festivals, corporate events, and wedding performances.',
    specifications: [
      { label: 'Condition', value: 'Pristine Studio Condition' },
      { label: 'Cables Included', value: 'Pro Link LAN, XLR Master, Powercon' },
      { label: 'Security Deposit', value: '₹400 (Held in DC Point Escrow)' }
    ],
    sampleAgreementTerms: {
      deliveryWindowDays: 1,
      inspectionWindowHours: 6,
      qualityStandard: 'Full fader & screen test video verification',
      customNotes: 'Include Pro Link LAN cables and XLR outputs.'
    },
    suggested: true,
    bestSeller: false
  },
  {
    id: 'rent-003',
    title: 'Inspire 3 Cinema 8K Quadcopter Drone Rig & Master Wheels',
    category: 'Rentals',
    type: 'rent',
    price: 260,
    unit: 'per day',
    rentalDeposit: 600,
    sellerId: 'seller_aerial_fx',
    sellerName: 'AerialVision FX',
    sellerRating: 4.97,
    sellerCompletedTrades: 58,
    complianceStatus: 'Verified',
    complianceBadgeText: 'FAA Certified & FAA Insured',
    image: droneRigImg,
    description: 'Full frame 8K ProRes RAW cinema drone kit with Zenmuse X9-8K Air camera, 18mm/24mm/35mm/50mm prime lenses, 6 TB TB51 batteries and dual RC PRO controllers.',
    specifications: [
      { label: 'Camera', value: '8K Full Frame RAW / 75fps' },
      { label: 'Max Speed', value: '94 km/h Night Vision obstacle sensing' },
      { label: 'Security Deposit', value: '₹600 (Held in DC Point Escrow)' }
    ],
    sampleAgreementTerms: {
      deliveryWindowDays: 1,
      inspectionWindowHours: 12,
      qualityStandard: 'Pre-flight propeller & gimbal calibration video certificate',
      customNotes: 'Include dual RC PRO controllers for pilot & camera operator.'
    },
    suggested: true,
    bestSeller: true
  },
  {
    id: 'rent-004',
    title: 'Sennheiser EW-DX Wireless Lavalier & Field Recorder Package',
    category: 'Rentals',
    type: 'rent',
    price: 95,
    unit: 'per day',
    rentalDeposit: 200,
    sellerId: 'seller_sound_studio',
    sellerName: 'Sonic Studio Gear',
    sellerRating: 4.94,
    sellerCompletedTrades: 33,
    complianceStatus: 'Verified',
    complianceBadgeText: 'Frequency Scan Calibrated',
    image: audioPackImg,
    description: 'Dual channel digital wireless microphone system with MKE 2 omni lavaliers, Sound Devices MixPre-6 II 32-bit float audio recorder, and Orca audio bag.',
    specifications: [
      { label: 'Audio Quality', value: '32-Bit Float / 96kHz Recording' },
      { label: 'Wireless Specs', value: '134 dB Dynamic Range • 1.9 ms latency' },
      { label: 'Security Deposit', value: '₹200 (Held in DC Point Escrow)' }
    ],
    sampleAgreementTerms: {
      deliveryWindowDays: 1,
      inspectionWindowHours: 6,
      qualityStandard: 'Frequency scan report & capsule test audio sample',
      customNotes: 'Include 64GB SanDisk Extreme SD card and spare rechargeable BA 70 batteries.'
    },
    suggested: false,
    bestSeller: false
  },
  {
    id: 'rent-005',
    title: 'Aputure 600d Pro Daylight LED Cinema Studio Lighting Package',
    category: 'Rentals',
    type: 'rent',
    price: 125,
    unit: 'per day',
    rentalDeposit: 250,
    sellerId: 'seller_cinelight',
    sellerName: 'CineLight Pro Rentals',
    sellerRating: 4.95,
    sellerCompletedTrades: 47,
    complianceStatus: 'Verified',
    complianceBadgeText: 'UL Safety Inspected',
    image: lightingKitImg,
    description: 'High output 600W daylight-balanced COB LED light fixture with Light Dome 150 softbox, Fresnel 2X modifier, rolling flight case, and heavy-duty C-stands.',
    specifications: [
      { label: 'Output', value: '98,500+ lux @ 3m with F10 Fresnel' },
      { label: 'Color Index', value: 'CRI 96+ / TLCI 96+' },
      { label: 'Security Deposit', value: '₹250 (Held in DC Point Escrow)' }
    ],
    sampleAgreementTerms: {
      deliveryWindowDays: 1,
      inspectionWindowHours: 12,
      qualityStandard: 'Burn-in power test video & optical reflector check',
      customNotes: 'Include Sidus Link Bluetooth controller & rolling hard case.'
    },
    suggested: false,
    bestSeller: true
  },
  {
    id: 'rent-006',
    title: 'RED V-Raptor XL 8K VV Cinema Camera & Anamorphic Lens Kit',
    category: 'Rentals',
    type: 'rent',
    price: 340,
    unit: 'per day',
    rentalDeposit: 750,
    sellerId: 'seller_cinestar',
    sellerName: 'CineStar Motion Equipment',
    sellerRating: 4.99,
    sellerCompletedTrades: 84,
    complianceStatus: 'Verified',
    complianceBadgeText: 'Full Production Insurance Linked',
    image: redCameraImg,
    description: 'Flagship RED V-Raptor XL 8K VV camera system with Cooke Anamorphic/i Full Frame Plus lens set, RED Touch 7.0" LCD, and RED Pro V-Lock batteries.',
    specifications: [
      { label: 'Sensor Spec', value: '35.4 Megapixel V-RAPTOR 8K VV' },
      { label: 'Framerates', value: '8K 120fps • 4K 240fps 17+ stops DR' },
      { label: 'Security Deposit', value: '₹750 (Held in DC Point Escrow)' }
    ],
    sampleAgreementTerms: {
      deliveryWindowDays: 1,
      inspectionWindowHours: 12,
      qualityStandard: 'Black balance calibration proof & sensor dust check video',
      customNotes: 'Include dual 2TB RED PRO CFexpress cards and ARRI Production Matte Box.'
    },
    suggested: true,
    bestSeller: true
  },
  {
    id: 'rent-007',
    title: 'Insta360 Pro 2 8K 3D VR Camera & Spatial Audio Recording Kit',
    category: 'Rentals',
    type: 'rent',
    price: 180,
    unit: 'per day',
    rentalDeposit: 350,
    sellerId: 'seller_vr_vault',
    sellerName: 'Immersive Media Vault',
    sellerRating: 4.92,
    sellerCompletedTrades: 29,
    complianceStatus: 'Verified',
    complianceBadgeText: 'VR Calibration Checked',
    image: vrCameraImg,
    description: 'Professional 6-lens 8K 3D 360 degree virtual reality camera system with Farsight long range live monitoring system and Zoom H6 spatial audio mic.',
    specifications: [
      { label: 'Resolution', value: '8K 3D @ 30fps • 4K 3D @ 120fps' },
      { label: 'Stitching Engine', value: 'Optical Flow Real-Time 3D Stitching' },
      { label: 'Security Deposit', value: '₹350 (Held in DC Point Escrow)' }
    ],
    sampleAgreementTerms: {
      deliveryWindowDays: 1,
      inspectionWindowHours: 8,
      qualityStandard: 'Lens alignment test photo & Farsight wireless video check',
      customNotes: 'Include carbon fiber monopod tripod and heavy Pelican storm case.'
    },
    suggested: false,
    bestSeller: false
  },
  {
    id: 'rent-008',
    title: 'Profoto Pro-11 2400 AirTTL Studio Flash Generator & Twin Heads',
    category: 'Rentals',
    type: 'rent',
    price: 210,
    unit: 'per day',
    rentalDeposit: 450,
    sellerId: 'seller_flashworks',
    sellerName: 'FlashWorks Studio Rentals',
    sellerRating: 4.96,
    sellerCompletedTrades: 51,
    complianceStatus: 'Verified',
    complianceBadgeText: 'Electrical Safety Inspected',
    image: strobePackImg,
    description: '2400Ws flagship studio flash generator with 1/80,000s flash duration freeze capability, dual ProHead Plus heads, Air Remote TTL, and 2x Softboxes.',
    specifications: [
      { label: 'Power Output', value: '2400Ws across 11 f-stops (0.1 stop precision)' },
      { label: 'Recycle Time', value: '0.01 to 0.7 seconds high-speed burst' },
      { label: 'Security Deposit', value: '₹450 (Held in DC Point Escrow)' }
    ],
    sampleAgreementTerms: {
      deliveryWindowDays: 1,
      inspectionWindowHours: 12,
      qualityStandard: 'Flash duration recycling test report & modeling lamp check',
      customNotes: 'Include Profoto Air Remote TTL for Sony / Canon / Nikon.'
    },
    suggested: true,
    bestSeller: false
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    recipientId: 'user_buyer_1',
    tradeId: 'trade-101',
    title: '🎨 Seller Work Update Posted',
    message: 'Maya Lin posted work-in-progress proof: "Leather cutting and initial stitching completed! Hand-embossed initials A.M."',
    timestamp: '2026-07-29 10:15 AM',
    isRead: false,
    type: 'progress_update',
    senderName: 'Maya Lin (Seller)'
  }
];

export const MOCK_ACTIVE_TRADES = [
  {
    id: 'trade-101',
    listingId: 'prod-001',
    title: 'Custom Handcrafted Full-Grain Leather Messenger Bag',
    price: 185,
    escrowFee: 9.25,
    totalEscrowAmount: 194.25,
    buyerId: 'user_buyer_1',
    buyerName: 'Alex Mercer',
    sellerId: 'user_seller_1',
    sellerName: 'Maya Lin (CraftedStudio)',
    currentStep: 4, // Step 4: Progress Updates & Timer
    type: 'purchase',
    status: 'In Progress (Seller Working • Awaiting Buyer Checkpoint)',
    createdAt: '2026-07-28',
    agreementDetails: {
      deliveryTimeframeDays: 5,
      paymentTerms: 'Full Escrow Pre-funding (₹194.25 Locked)',
      qualityInspectionTerms: '48-hour post-delivery unpacking verification window',
      agreementDurationDays: 14,
      customPackagingNotes: 'Please emboss initials "A.M." on the inside flap and use eco-cardboard box.',
      signedByBuyer: true,
      signedBySeller: true,
      legalContractHash: 'DC-HASH-883F-992A-CONTRACT-VERIFIED'
    },
    progressUpdates: [
      {
        id: 'up-1',
        sender: 'Maya Lin (Seller)',
        timestamp: '2026-07-29 10:15 AM',
        text: 'Leather cutting and initial stitching completed! Hand-embossed "A.M." initials on inner pocket flap as requested.',
        image: leatherBagImg
      }
    ],
    timer: {
      expiresInSeconds: 14200, // Active countdown timer demo
      warningText: 'Buyer must respond to progress update within 24h to avoid deposit forfeit'
    },
    deliveryChecklist: {
      productionProof: true,
      packagingProof: false,
      trackingNumber: 'TRK-DC-9928174',
      unpackingCheck: false
    }
  },
  {
    id: 'trade-102',
    listingId: 'rent-001',
    title: 'Cinema 4K FX3 Video Production Rig & Lens Package',
    price: 140,
    rentalDurationDays: 3,
    rentalDeposit: 300,
    escrowFee: 21.00, // 5% of (140 * 3 = 420)
    totalEscrowAmount: 741.00, // (140 * 3) + 300 + 21 = 741.00
    buyerId: 'user_buyer_1',
    buyerName: 'Alex Mercer',
    sellerId: 'user_seller_1', // Assign to Maya Lin so seller login can interact with it
    sellerName: 'Maya Lin (CraftedStudio)',
    currentStep: 2, // Step 2: Agreement Builder
    type: 'rent',
    status: 'Agreement Builder (Pending Final Signature)',
    createdAt: '2026-07-29',
    agreementDetails: {
      deliveryTimeframeDays: 1,
      paymentTerms: 'Daily Rental Rate (3 Days: ₹420) + Refundable Deposit (₹300) held in Escrow',
      qualityInspectionTerms: '12-hour camera sensor & lens calibration check',
      agreementDurationDays: 5,
      customPackagingNotes: 'Include extra Atomos HDMI cable and Pelican hard case.',
      signedByBuyer: true,
      signedBySeller: false,
      legalContractHash: 'DC-HASH-311C-447B-RENTAL-PENDING'
    },
    progressUpdates: [],
    timer: null,
    deliveryChecklist: {
      productionProof: false,
      packagingProof: false,
      trackingNumber: '',
      unpackingCheck: false
    }
  }
];

export const TRUST_METRICS = [
  { metric: '$2.4M+', label: 'Protected in Escrow' },
  { metric: '99.6%', label: 'Successful Completed Trades' },
  { metric: '0%', label: 'Risk for Unregistered Sellers' },
  { metric: '< 2 Hours', label: 'Average Dispute Resolution' }
];

export const PLATFORM_FAQS = [
  {
    q: 'How does DC Point protect unregistered sellers & individual artisans?',
    a: 'DC Point legalizes your sales by generating legally binding trade agreements with your buyers and holding full payments in an Escrow Vault before you spend time or money fulfilling orders. Buyers cannot back out or default on payment.'
  },
  {
    q: 'How are buyers protected against scams or bad quality?',
    a: 'Your money remains locked in DC Point’s secure Escrow Vault. Funds are only released to the seller after you inspect the delivered item/service and verify it matches the agreed digital trade terms.'
  },
  {
    q: 'What is the AI Compliance Screening step?',
    a: 'Before any product or service listing goes live, our automated AI compliance engine scans the title, description, and terms against legal regulations, IP copyright databases, and consumer safety rules to prevent illegal or hazardous trades.'
  },
  {
    q: 'What happens if there is a dispute between buyer and seller?',
    a: 'Either party can tap "Raise Grievance". Our Resolution Center pulls up the signed agreement contract, reviews progress photos/videos, and uses AI-assisted contract mediation to quickly render a fair decision or route to a human mediator.'
  }
];
