import type { Product } from "../types";

const roundMoney = (value: number) =>
  Math.round(value * 100) / 100;

export interface PricingResult {
  quantity: number;

  regularUnitPrice: number;
  effectiveUnitPrice: number;

  discountPercent: number;
  discountAmountPerUnit: number;

  normalTotal: number;
  total: number;
  savings: number;

  hasBulkDiscount: boolean;
}

/*
  LIVE BULK PRICING

  1 - 49   = regular price
  50 - 99  = 10% OFF
  100 - 149 = 12% OFF
  150 - 199 = 14% OFF
  200 - 249 = 16% OFF

  Every additional 50 quantity increases
  the discount by another 2%.

  Maximum discount is capped at 30%.
*/

export function getBulkPricing(
  product: Product,
  quantity: number
): PricingResult {
  const safeQuantity = Math.max(
    1,
    Math.floor(quantity || 1)
  );

  const bulkStartQuantity =
    product.bulkMinQuantity ?? 50;

  const baseBulkDiscount =
    product.bulkDiscountPercent ?? 10;

  let discountPercent = 0;

  if (safeQuantity >= bulkStartQuantity) {
    const completedBulkLevels = Math.floor(
      safeQuantity / bulkStartQuantity
    );

    discountPercent =
      baseBulkDiscount +
      (completedBulkLevels - 1) * 2;

    // Safety cap
    discountPercent = Math.min(
      discountPercent,
      30
    );
  }

  const effectiveUnitPrice = roundMoney(
    product.price *
      (1 - discountPercent / 100)
  );

  const normalTotal = roundMoney(
    product.price * safeQuantity
  );

  const total = roundMoney(
    effectiveUnitPrice * safeQuantity
  );

  const savings = roundMoney(
    normalTotal - total
  );

  return {
    quantity: safeQuantity,

    regularUnitPrice: product.price,

    effectiveUnitPrice,

    discountPercent,

    discountAmountPerUnit: roundMoney(
      product.price - effectiveUnitPrice
    ),

    normalTotal,
    total,
    savings,

    hasBulkDiscount:
      discountPercent > 0,
  };
}

export function getLineTotal(
  product: Product,
  quantity: number
) {
  return getBulkPricing(
    product,
    quantity
  ).total;
}