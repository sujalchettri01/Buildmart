export interface BulkPricingTier {
  minQuantity: number;
  discountPercent: number;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  image: string;

  price: number;
  originalPrice?: number;

  unit: string;

  rating?: number;
  reviews?: number;

  inStock: boolean;
  featured?: boolean;

  // Dynamic quantity-based bulk pricing
  bulkPricing?: BulkPricingTier[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface Brand {
  id: number;
  name: string;
  image: string;
}