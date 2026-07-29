// DC Point - Mock Data & Data Schema
export const INITIAL_USER_PERSONAS = [
  {
    id: 'user_buyer_1',
    name: 'Alex Mercer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Buyer Focus',
    email: 'alex.mercer@trade-tech.io',
    phone: '+1 (555) 234-8901',
    walletBalance: 4500,
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
    image: '/leather_bag.jpg',
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
    image: '/neon_sign.jpg',
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
    image: '/pcb_board.jpg',
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
    image: '/honey_jar.jpg',
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
    image: '/cinema_camera.jpg',
    description: 'Complete 4K cinema camera package including Sony FX3 body, 24-70mm f/2.8 GM II lens, wireless mic set, V-mount batteries & Pelican case.',
    specifications: [
      { label: 'Resolution', value: '4K 120fps 10-bit 4:2:2' },
      { label: 'Included Extras', value: '2x 160GB CFexpress Type A Cards, Atomos Monitor' },
      { label: 'Security Deposit', value: '$300 (Held in DC Point Escrow)' }
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
    title: 'Pioneer DJ System (2x CDJ-3000 + DJM-A9 Mixer + Case)',
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
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
    description: 'Flagship club standard DJ setup in heavy flight cases. Ready for festivals, corporate events, and wedding performances.',
    specifications: [
      { label: 'Condition', value: 'Pristine Studio Condition' },
      { label: 'Cables Included', value: 'Pro Link LAN, XLR Master, Powercon' },
      { label: 'Deposit', value: '$400 Refundable Escrow Hold' }
    ],
    sampleAgreementTerms: {
      deliveryWindowDays: 1,
      inspectionWindowHours: 6,
      qualityStandard: 'Full fader & screen test video verification',
      customNotes: 'Include Pro Link LAN cables and XLR outputs.'
    },
    suggested: true,
    bestSeller: false
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
    status: 'In Progress (Awaiting Buyer Progress Approval)',
    createdAt: '2026-07-28',
    agreementDetails: {
      deliveryTimeframeDays: 5,
      paymentTerms: 'Full Escrow Pre-funding ($194.25 Locked)',
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
        image: '/leather_bag.jpg'
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
    rentalDeposit: 300,
    escrowFee: 7.00,
    totalEscrowAmount: 447.00,
    buyerId: 'user_buyer_1',
    buyerName: 'Alex Mercer',
    sellerId: 'seller_cine_rentals',
    sellerName: 'FrameRate Cine Equipment',
    currentStep: 2, // Step 2: Agreement Builder
    type: 'rent',
    rentalDurationDays: 3,
    status: 'Agreement Builder (Pending Final Signature)',
    createdAt: '2026-07-29',
    agreementDetails: {
      deliveryTimeframeDays: 1,
      paymentTerms: 'Daily Rental Rate + Refundable Deposit held in Escrow',
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
