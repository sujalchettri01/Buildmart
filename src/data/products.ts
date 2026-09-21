import type { Product } from "../types";

export const products: Product[] = [
  // =====================================================
  // CEMENT
  // =====================================================

  {
    id: 1,
    name: "PPC Cement 50kg",
    brand: "UltraTech",
    category: "Cement",
    image: "/images/ultratech-cement.jpg",
    price: 390,
    originalPrice: 420,
    unit: "bag",
    rating: 4.7,
    reviews: 124,
    inStock: true,
    featured: true,

    bulkPricing: [
      { minQuantity: 50, discountPercent: 10 },
      { minQuantity: 100, discountPercent: 12 },
      { minQuantity: 150, discountPercent: 14 },
      { minQuantity: 200, discountPercent: 16 },
    ],
  },

  {
    id: 2,
    name: "ACC Suraksha Power Cement 50kg",
    brand: "ACC",
    category: "Cement",
    image: "/images/acc-cement.jpg",
    price: 380,
    originalPrice: 410,
    unit: "bag",
    rating: 4.6,
    reviews: 98,
    inStock: true,
    featured: true,

    bulkPricing: [
      { minQuantity: 50, discountPercent: 10 },
      { minQuantity: 100, discountPercent: 12 },
      { minQuantity: 150, discountPercent: 14 },
      { minQuantity: 200, discountPercent: 16 },
    ],
  },

  {
    id: 3,
    name: "Ambuja PPC Cement 50kg",
    brand: "Ambuja",
    category: "Cement",
    image: "/images/ambuja-cement.jpg",
    price: 385,
    originalPrice: 415,
    unit: "bag",
    rating: 4.6,
    reviews: 87,
    inStock: true,

    bulkPricing: [
      { minQuantity: 50, discountPercent: 10 },
      { minQuantity: 100, discountPercent: 12 },
      { minQuantity: 150, discountPercent: 14 },
      { minQuantity: 200, discountPercent: 16 },
    ],
  },

  // =====================================================
  // STEEL
  // =====================================================

  {
    id: 4,
    name: "Fe 550 TMT Steel Bar",
    brand: "Tata Tiscon",
    category: "Steel",
    image: "/images/tata-tiscon.jpg",
    price: 62000,
    originalPrice: 65000,
    unit: "tonne",
    rating: 4.8,
    reviews: 89,
    inStock: true,
    featured: true,

    bulkPricing: [
      { minQuantity: 5, discountPercent: 3 },
      { minQuantity: 10, discountPercent: 5 },
      { minQuantity: 20, discountPercent: 7 },
      { minQuantity: 30, discountPercent: 10 },
    ],
  },

  {
    id: 5,
    name: "JSW Neosteel Fe 550D TMT Bar",
    brand: "JSW",
    category: "Steel",
    image: "/images/jsw-neosteel.jpg",
    price: 60500,
    originalPrice: 63000,
    unit: "tonne",
    rating: 4.7,
    reviews: 73,
    inStock: true,

    bulkPricing: [
      { minQuantity: 5, discountPercent: 3 },
      { minQuantity: 10, discountPercent: 5 },
      { minQuantity: 20, discountPercent: 7 },
      { minQuantity: 30, discountPercent: 10 },
    ],
  },

  {
    id: 6,
    name: "SAIL TMT Steel Bar",
    brand: "SAIL",
    category: "Steel",
    image: "/images/sail-tmt.jpg",
    price: 59800,
    originalPrice: 62000,
    unit: "tonne",
    rating: 4.6,
    reviews: 61,
    inStock: true,

    bulkPricing: [
      { minQuantity: 5, discountPercent: 3 },
      { minQuantity: 10, discountPercent: 5 },
      { minQuantity: 20, discountPercent: 7 },
      { minQuantity: 30, discountPercent: 10 },
    ],
  },

  // =====================================================
  // PLUMBING
  // =====================================================

  {
    id: 7,
    name: "CPVC Plumbing Pipe",
    brand: "Astral",
    category: "Plumbing",
    image: "/images/astral-cpvc.jpg",
    price: 480,
    originalPrice: 520,
    unit: "piece",
    rating: 4.6,
    reviews: 56,
    inStock: true,
    featured: true,

    bulkPricing: [
      { minQuantity: 20, discountPercent: 5 },
      { minQuantity: 50, discountPercent: 8 },
      { minQuantity: 100, discountPercent: 10 },
      { minQuantity: 200, discountPercent: 12 },
    ],
  },

  {
    id: 8,
    name: "PVC Plumbing Pipe 3m",
    brand: "Supreme",
    category: "Plumbing",
    image: "/images/supreme-pvc.jpg",
    price: 420,
    originalPrice: 460,
    unit: "piece",
    rating: 4.5,
    reviews: 49,
    inStock: true,

    bulkPricing: [
      { minQuantity: 20, discountPercent: 5 },
      { minQuantity: 50, discountPercent: 8 },
      { minQuantity: 100, discountPercent: 10 },
      { minQuantity: 200, discountPercent: 12 },
    ],
  },

  {
    id: 9,
    name: "SWR Drainage Pipe",
    brand: "Finolex",
    category: "Plumbing",
    image: "/images/finolex-swr.jpg",
    price: 560,
    originalPrice: 610,
    unit: "piece",
    rating: 4.5,
    reviews: 42,
    inStock: true,

    bulkPricing: [
      { minQuantity: 20, discountPercent: 5 },
      { minQuantity: 50, discountPercent: 8 },
      { minQuantity: 100, discountPercent: 10 },
      { minQuantity: 200, discountPercent: 12 },
    ],
  },

  // =====================================================
  // ELECTRICAL
  // =====================================================

  {
    id: 10,
    name: "House Wire 1.5 sq mm 90m",
    brand: "Havells",
    category: "Electrical",
    image: "/images/havells-wire.jpg",
    price: 1450,
    originalPrice: 1590,
    unit: "coil",
    rating: 4.8,
    reviews: 115,
    inStock: true,
    featured: true,

    bulkPricing: [
      { minQuantity: 10, discountPercent: 5 },
      { minQuantity: 25, discountPercent: 8 },
      { minQuantity: 50, discountPercent: 10 },
      { minQuantity: 100, discountPercent: 12 },
    ],
  },

  {
    id: 11,
    name: "FR Electrical Wire 2.5 sq mm",
    brand: "Polycab",
    category: "Electrical",
    image: "/images/polycab-wire.jpg",
    price: 2150,
    originalPrice: 2350,
    unit: "coil",
    rating: 4.7,
    reviews: 92,
    inStock: true,

    bulkPricing: [
      { minQuantity: 10, discountPercent: 5 },
      { minQuantity: 25, discountPercent: 8 },
      { minQuantity: 50, discountPercent: 10 },
      { minQuantity: 100, discountPercent: 12 },
    ],
  },

  {
    id: 12,
    name: "6A Modular Electrical Switch",
    brand: "Anchor",
    category: "Electrical",
    image: "/images/anchor-switch.jpg",
    price: 85,
    originalPrice: 99,
    unit: "piece",
    rating: 4.5,
    reviews: 68,
    inStock: true,

    bulkPricing: [
      { minQuantity: 50, discountPercent: 5 },
      { minQuantity: 100, discountPercent: 8 },
      { minQuantity: 250, discountPercent: 10 },
      { minQuantity: 500, discountPercent: 12 },
    ],
  },

  // =====================================================
  // PAINT
  // =====================================================

  {
    id: 13,
    name: "Premium Interior Paint 20L",
    brand: "Asian Paints",
    category: "Paint",
    image: "/images/asian-paints.jpg",
    price: 4250,
    originalPrice: 4500,
    unit: "bucket",
    rating: 4.8,
    reviews: 92,
    inStock: true,
    featured: true,

    bulkPricing: [
      { minQuantity: 10, discountPercent: 5 },
      { minQuantity: 25, discountPercent: 8 },
      { minQuantity: 50, discountPercent: 10 },
      { minQuantity: 100, discountPercent: 12 },
    ],
  },

  {
    id: 14,
    name: "Easy Clean Interior Emulsion 20L",
    brand: "Berger",
    category: "Paint",
    image: "/images/berger-paint.jpg",
    price: 3950,
    originalPrice: 4250,
    unit: "bucket",
    rating: 4.7,
    reviews: 78,
    inStock: true,

    bulkPricing: [
      { minQuantity: 10, discountPercent: 5 },
      { minQuantity: 25, discountPercent: 8 },
      { minQuantity: 50, discountPercent: 10 },
      { minQuantity: 100, discountPercent: 12 },
    ],
  },

  {
    id: 15,
    name: "Beauty Gold Interior Emulsion 20L",
    brand: "Nerolac",
    category: "Paint",
    image: "/images/nerolac-paint.jpg",
    price: 3750,
    originalPrice: 4100,
    unit: "bucket",
    rating: 4.6,
    reviews: 64,
    inStock: true,

    bulkPricing: [
      { minQuantity: 10, discountPercent: 5 },
      { minQuantity: 25, discountPercent: 8 },
      { minQuantity: 50, discountPercent: 10 },
      { minQuantity: 100, discountPercent: 12 },
    ],
  },

  // =====================================================
  // BRICKS
  // =====================================================

  {
    id: 16,
    name: "Red Clay Bricks",
    brand: "Local Premium",
    category: "Bricks",
    image: "/images/red-clay-bricks.jpg",
    price: 12,
    originalPrice: 14,
    unit: "piece",
    rating: 4.7,
    reviews: 86,
    inStock: true,
    featured: true,

    bulkPricing: [
      { minQuantity: 500, discountPercent: 5 },
      { minQuantity: 1000, discountPercent: 8 },
      { minQuantity: 2000, discountPercent: 10 },
      { minQuantity: 5000, discountPercent: 12 },
    ],
  },

  {
    id: 17,
    name: "Fly Ash Bricks",
    brand: "BuildStrong",
    category: "Bricks",
    image: "/images/fly-ash-bricks.jpg",
    price: 10,
    originalPrice: 12,
    unit: "piece",
    rating: 4.6,
    reviews: 64,
    inStock: true,

    bulkPricing: [
      { minQuantity: 500, discountPercent: 5 },
      { minQuantity: 1000, discountPercent: 8 },
      { minQuantity: 2000, discountPercent: 10 },
      { minQuantity: 5000, discountPercent: 12 },
    ],
  },

  {
    id: 18,
    name: "AAC Blocks",
    brand: "Magicrete",
    category: "Bricks",
    image: "/images/aac-blocks.jpg",
    price: 75,
    originalPrice: 82,
    unit: "piece",
    rating: 4.7,
    reviews: 71,
    inStock: true,

    bulkPricing: [
      { minQuantity: 100, discountPercent: 5 },
      { minQuantity: 250, discountPercent: 8 },
      { minQuantity: 500, discountPercent: 10 },
      { minQuantity: 1000, discountPercent: 12 },
    ],
  },

  // =====================================================
  // PLYWOOD
  // =====================================================

  {
    id: 19,
    name: "BWP Marine Plywood 18mm",
    brand: "CenturyPly",
    category: "Plywood",
    image: "/images/centuryply.jpg",
    price: 3450,
    originalPrice: 3750,
    unit: "sheet",
    rating: 4.8,
    reviews: 71,
    inStock: true,
    featured: true,

    bulkPricing: [
      { minQuantity: 10, discountPercent: 5 },
      { minQuantity: 25, discountPercent: 8 },
      { minQuantity: 50, discountPercent: 10 },
      { minQuantity: 100, discountPercent: 12 },
    ],
  },

  {
    id: 20,
    name: "BWR Grade Plywood 18mm",
    brand: "Greenply",
    category: "Plywood",
    image: "/images/greenply.jpg",
    price: 3250,
    originalPrice: 3500,
    unit: "sheet",
    rating: 4.7,
    reviews: 63,
    inStock: true,

    bulkPricing: [
      { minQuantity: 10, discountPercent: 5 },
      { minQuantity: 25, discountPercent: 8 },
      { minQuantity: 50, discountPercent: 10 },
      { minQuantity: 100, discountPercent: 12 },
    ],
  },

  {
    id: 21,
    name: "Commercial Plywood 18mm",
    brand: "Kitply",
    category: "Plywood",
    image: "/images/kitply.jpg",
    price: 2850,
    originalPrice: 3100,
    unit: "sheet",
    rating: 4.5,
    reviews: 48,
    inStock: true,

    bulkPricing: [
      { minQuantity: 10, discountPercent: 5 },
      { minQuantity: 25, discountPercent: 8 },
      { minQuantity: 50, discountPercent: 10 },
      { minQuantity: 100, discountPercent: 12 },
    ],
  },

  // =====================================================
  // SANITARYWARE
  // =====================================================

  {
    id: 22,
    name: "Single Lever Basin Mixer",
    brand: "Jaquar",
    category: "Sanitaryware",
    image: "/images/jaquar-mixer.jpg",
    price: 3250,
    originalPrice: 3650,
    unit: "piece",
    rating: 4.8,
    reviews: 84,
    inStock: true,
    featured: true,

    bulkPricing: [
      { minQuantity: 10, discountPercent: 5 },
      { minQuantity: 25, discountPercent: 8 },
      { minQuantity: 50, discountPercent: 10 },
      { minQuantity: 100, discountPercent: 12 },
    ],
  },

  {
    id: 23,
    name: "Wall Hung Wash Basin",
    brand: "CERA",
    category: "Sanitaryware",
    image: "/images/cera-basin.jpg",
    price: 2890,
    originalPrice: 3200,
    unit: "piece",
    rating: 4.6,
    reviews: 59,
    inStock: true,

    bulkPricing: [
      { minQuantity: 10, discountPercent: 5 },
      { minQuantity: 25, discountPercent: 8 },
      { minQuantity: 50, discountPercent: 10 },
      { minQuantity: 100, discountPercent: 12 },
    ],
  },

  {
    id: 24,
    name: "Western Toilet Floor Mounted",
    brand: "Hindware",
    category: "Sanitaryware",
    image: "/images/hindware-toilet.jpg",
    price: 6850,
    originalPrice: 7400,
    unit: "piece",
    rating: 4.7,
    reviews: 67,
    inStock: true,

    bulkPricing: [
      { minQuantity: 10, discountPercent: 5 },
      { minQuantity: 25, discountPercent: 8 },
      { minQuantity: 50, discountPercent: 10 },
      { minQuantity: 100, discountPercent: 12 },
    ],
  },
];