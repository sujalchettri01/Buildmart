import {
  useState,
  type ChangeEvent,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DeliveryChecker from "../components/DeliveryChecker";

import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  // =====================================================
  // PRODUCT NOT FOUND
  // =====================================================

  if (!product) {
    return (
      <>
        <Header />
        <Navbar />

        <main className="product-details-page">
          <div className="container">
            <div className="product-not-found">
              <h1>Product not found</h1>

              <p>
                The product you're looking for does not exist.
              </p>

              <Link to="/products">
                Back to Products
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // =====================================================
  // QUANTITY
  // =====================================================

  const validQuantity =
    quantity > 0 ? quantity : 1;

  // =====================================================
  // NORMAL PRODUCT DISCOUNT
  // =====================================================

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) /
          product.originalPrice) *
          100
      )
    : 0;

  // =====================================================
  // SORT BULK PRICING TIERS
  // =====================================================

  const bulkPricing = [
    ...(product.bulkPricing ?? []),
  ].sort(
    (a, b) =>
      a.minQuantity - b.minQuantity
  );

  // =====================================================
  // FIND CURRENT BULK TIER
  //
  // Example:
  //
  // 50  -> 10%
  // 100 -> 12%
  // 150 -> 14%
  // 200 -> 16%
  //
  // At quantity 125, the 100 tier is active.
  // =====================================================

  const currentBulkTier =
    [...bulkPricing]
      .reverse()
      .find(
        (tier) =>
          validQuantity >= tier.minQuantity
      );

  // =====================================================
  // FIND NEXT BULK TIER
  // =====================================================

  const nextBulkTier =
    bulkPricing.find(
      (tier) =>
        tier.minQuantity > validQuantity
    );

  // =====================================================
  // CURRENT DISCOUNT
  // =====================================================

  const currentDiscountPercent =
    currentBulkTier?.discountPercent ?? 0;

  const hasBulkDiscount =
    currentDiscountPercent > 0;

  // =====================================================
  // LIVE PRICE PER UNIT
  // =====================================================

  const currentUnitPrice =
    product.price *
    (1 - currentDiscountPercent / 100);

  // =====================================================
  // FIRST BULK TIER
  // =====================================================

  const firstBulkTier =
    bulkPricing.length > 0
      ? bulkPricing[0]
      : undefined;

  const firstBulkUnitPrice =
    firstBulkTier
      ? product.price *
        (1 -
          firstBulkTier.discountPercent /
            100)
      : product.price;

  // =====================================================
  // NEXT TIER PRICE
  // =====================================================

  const nextTierUnitPrice =
    nextBulkTier
      ? product.price *
        (1 -
          nextBulkTier.discountPercent /
            100)
      : null;

  // =====================================================
  // TOTAL
  //
  // IMPORTANT:
  // Once a tier is reached, the tier price applies
  // to the ENTIRE quantity.
  //
  // Example:
  //
  // ₹390 regular
  //
  // 100 bags
  // 12% discount
  //
  // ₹343.20 × 100
  // = ₹34,320
  // =====================================================

  const finalTotal =
    currentUnitPrice * validQuantity;

  const normalTotal =
    product.price * validQuantity;

  const bulkSavings =
    normalTotal - finalTotal;

  // =====================================================
  // QUANTITY CONTROLS
  // =====================================================

  const increaseQuantity = () => {
    setQuantity((current) =>
      current < 1
        ? 1
        : current + 1
    );
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1
        ? current - 1
        : 1
    );
  };

  const handleQuantityChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (value === "") {
      setQuantity(0);
      return;
    }

    const numericValue = Number(value);

    if (
      Number.isNaN(numericValue) ||
      numericValue < 0
    ) {
      return;
    }

    setQuantity(
      Math.floor(numericValue)
    );
  };

  const handleQuantityBlur = () => {
    if (quantity < 1) {
      setQuantity(1);
    }
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = () => {
    addToCart(
      product,
      validQuantity
    );
  };

  // =====================================================
  // BUY NOW
  // =====================================================

  const handleBuyNow = () => {
    addToCart(
      product,
      validQuantity
    );

    navigate("/cart");
  };

  return (
    <>
      <Header />
      <Navbar />

      <main className="product-details-page">
        <div className="container">

          {/* =================================================
              BREADCRUMB
          ================================================= */}

          <div className="product-breadcrumb">

            <Link to="/">
              Home
            </Link>

            <span>›</span>

            <Link to="/products">
              Products
            </Link>

            <span>›</span>

            <Link
              to={`/products?category=${encodeURIComponent(
                product.category
              )}`}
            >
              {product.category === "Steel"
                ? "Steel & TMT"
                : product.category}
            </Link>

            <span>›</span>

            <span>
              {product.name}
            </span>

          </div>

          {/* =================================================
              MAIN PRODUCT
          ================================================= */}

          <div className="product-details-layout">

            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div className="product-details-image">

              {discount > 0 && (
                <span className="product-details-discount">
                  {discount}% OFF
                </span>
              )}

              <img
                src={product.image}
                alt={product.name}
              />

            </div>

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div className="product-details-info">

              <span className="product-details-brand">
                {product.brand}
              </span>

              <h1>
                {product.name}
              </h1>

              {/* RATING */}

              {product.rating && (
                <div className="product-details-rating">

                  <span>
                    ⭐ {product.rating}
                  </span>

                  {product.reviews && (
                    <span>
                      ({product.reviews} customer reviews)
                    </span>
                  )}

                </div>
              )}

              {/* STOCK */}

              <div
                className={
                  product.inStock
                    ? "product-stock in-stock"
                    : "product-stock out-of-stock"
                }
              >
                {product.inStock
                  ? "✓ In Stock"
                  : "Out of Stock"}
              </div>

              {/* =================================================
                  PRICE
              ================================================= */}

              <div className="product-details-price">

                {/* REGULAR PRICE */}

                <div className="product-actual-price">

                  <strong>
                    ₹
                    {product.price.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                  <span>
                    {" "} / {product.unit}
                  </span>

                </div>

                {/* =================================================
                    LIVE BULK PRICE PER UNIT
                ================================================= */}

                <div className="product-bulk-price-display">

                  <span>
                    {hasBulkDiscount
                      ? "Bulk Price ="
                      : "Bulk Price starts at ="}
                  </span>

                  <strong>
                    ₹
                    {(
                      hasBulkDiscount
                        ? currentUnitPrice
                        : firstBulkUnitPrice
                    ).toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </strong>

                  <span>
                    {" "} / {product.unit}
                  </span>

                </div>

                {/* CURRENT TIER */}

                {hasBulkDiscount &&
                  currentBulkTier && (
                    <small className="product-bulk-price-note">

                      {currentBulkTier.discountPercent}%
                      OFF at{" "}
                      {currentBulkTier.minQuantity}+
                      {" "}
                      {product.unit}
                      {currentBulkTier.minQuantity > 1
                        ? "s"
                        : ""}

                    </small>
                  )}

                {/* BEFORE FIRST TIER */}

                {!hasBulkDiscount &&
                  firstBulkTier && (
                    <small className="product-bulk-price-note">

                      Buy{" "}
                      {firstBulkTier.minQuantity}+
                      {" "}
                      {product.unit}
                      {firstBulkTier.minQuantity > 1
                        ? "s"
                        : ""}{" "}
                      to get{" "}
                      {firstBulkTier.discountPercent}%
                      OFF

                    </small>
                  )}

                {/* MRP */}

                {product.originalPrice && (
                  <div className="product-details-original-price">

                    <span>
                      ₹
                      {product.originalPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    <strong>
                      Save ₹
                      {(
                        product.originalPrice -
                        product.price
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>
                )}

              </div>

              {/* =================================================
                  BULK DEAL
              ================================================= */}

              {firstBulkTier && (
                <div className="bulk-offer-notice">

                  <div className="bulk-offer-badge">
                    🔥 BULK DEAL
                  </div>

                  <div className="bulk-offer-content">

                    {hasBulkDiscount &&
                    currentBulkTier ? (
                      <>
                        <strong>
                          {currentBulkTier.discountPercent}%
                          bulk discount active
                        </strong>

                        <span>
                          Your current price is ₹
                          {currentUnitPrice.toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )}{" "}
                          per {product.unit}.
                        </span>
                      </>
                    ) : (
                      <>
                        <strong>
                          Buy{" "}
                          {firstBulkTier.minQuantity}+
                          {" "}
                          {product.unit}
                          {firstBulkTier.minQuantity >
                          1
                            ? "s"
                            : ""}{" "}
                          and get{" "}
                          {
                            firstBulkTier.discountPercent
                          }
                          % OFF
                        </strong>

                        <span>
                          Bulk price starts at ₹
                          {firstBulkUnitPrice.toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )}{" "}
                          per {product.unit}.
                        </span>
                      </>
                    )}

                  </div>

                </div>
              )}

              {/* =================================================
                  DISCOUNT ACTIVE
              ================================================= */}

              {hasBulkDiscount &&
                currentBulkTier && (
                  <div className="bulk-unlocked-message">

                    <span>
                      ✓
                    </span>

                    <div>

                      <strong>
                        Bulk discount applied!
                      </strong>

                      <p>
                        Your quantity of{" "}
                        {validQuantity}{" "}
                        {product.unit}
                        {validQuantity > 1
                          ? "s"
                          : ""}{" "}
                        qualifies for{" "}
                        {
                          currentBulkTier.discountPercent
                        }
                        % OFF.
                      </p>

                      <p>
                        All {validQuantity}{" "}
                        {product.unit}
                        {validQuantity > 1
                          ? "s"
                          : ""}{" "}
                        are now ₹
                        {currentUnitPrice.toLocaleString(
                          "en-IN",
                          {
                            maximumFractionDigits: 2,
                          }
                        )}{" "}
                        each.
                      </p>

                    </div>

                  </div>
                )}

              {/* TAX */}

              <p className="product-tax-info">
                Inclusive of applicable taxes.
                Delivery charges may vary according
                to location and order quantity.
              </p>

              {/* =================================================
                  QUANTITY
              ================================================= */}

              <div className="product-quantity-section">

                <span className="product-option-label">
                  Quantity
                </span>

                <div className="product-quantity-controls">

                  <button
                    type="button"
                    onClick={
                      decreaseQuantity
                    }
                    disabled={
                      quantity <= 1
                    }
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={
                      quantity === 0
                        ? ""
                        : quantity
                    }
                    onChange={
                      handleQuantityChange
                    }
                    onBlur={
                      handleQuantityBlur
                    }
                    className="quantity-manual-input"
                    aria-label="Quantity"
                  />

                  <button
                    type="button"
                    onClick={
                      increaseQuantity
                    }
                    aria-label="Increase quantity"
                  >
                    +
                  </button>

                </div>

                <span className="quantity-unit">
                  {product.unit}
                  {validQuantity > 1
                    ? "s"
                    : ""}
                </span>

              </div>

              {/* =================================================
                  NEXT PRICE TIER
              ================================================= */}

              {nextBulkTier && (
                <div className="bulk-quantity-progress">

                  Add{" "}

                  <strong>
                    {nextBulkTier.minQuantity -
                      validQuantity}
                  </strong>

                  {" "}more to unlock{" "}

                  <strong>
                    {nextBulkTier.discountPercent}%
                    OFF
                  </strong>

                  {" "}and pay{" "}

                  <strong>
                    ₹
                    {nextTierUnitPrice?.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}{" "}
                    / {product.unit}
                  </strong>

                  .

                </div>
              )}

              {/* MAXIMUM TIER */}

              {hasBulkDiscount &&
                !nextBulkTier && (
                  <div className="bulk-quantity-progress">

                    <strong>
                      Maximum bulk discount unlocked:
                      {" "}
                      {currentDiscountPercent}% OFF
                    </strong>

                  </div>
                )}

              {/* =================================================
                  PRICE BREAKDOWN
              ================================================= */}

              <div className="bulk-price-breakdown">

                <div>

                  <span>
                    {validQuantity}{" "}
                    {product.unit}
                    {validQuantity > 1
                      ? "s"
                      : ""}{" "}
                    × ₹
                    {currentUnitPrice.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}
                  </span>

                  <strong>
                    ₹
                    {finalTotal.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}
                  </strong>

                </div>

              </div>

              {/* =================================================
                  TOTAL
              ================================================= */}

              <div
                className={
                  hasBulkDiscount
                    ? "product-total-price bulk-total-active"
                    : "product-total-price"
                }
              >

                <div className="product-total-label">

                  <span>
                    Total
                  </span>

                  {hasBulkDiscount && (
                    <small>
                      {currentDiscountPercent}%
                      bulk pricing applied
                    </small>
                  )}

                </div>

                <div className="product-final-total">

                  {hasBulkDiscount && (
                    <span className="bulk-normal-total">
                      ₹
                      {normalTotal.toLocaleString(
                        "en-IN",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}
                    </span>
                  )}

                  <strong>
                    ₹
                    {finalTotal.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}
                  </strong>

                </div>

              </div>

              {/* =================================================
                  SAVINGS
              ================================================= */}

              {hasBulkDiscount && (
                <div className="bulk-savings-message">

                  🎉 You save{" "}

                  <strong>
                    ₹
                    {bulkSavings.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}
                  </strong>

                  {" "}with the{" "}
                  {currentDiscountPercent}%
                  bulk discount.

                </div>
              )}

              {/* =================================================
                  BUTTONS
              ================================================= */}

              <div className="product-details-actions">

                <button
                  type="button"
                  className="product-add-cart"
                  onClick={
                    handleAddToCart
                  }
                  disabled={
                    !product.inStock
                  }
                >
                  🛒 Add to Cart
                </button>

                <button
                  type="button"
                  className="product-buy-now"
                  onClick={
                    handleBuyNow
                  }
                  disabled={
                    !product.inStock
                  }
                >
                  Buy Now
                </button>

              </div>

              <DeliveryChecker />

            </div>

          </div>

          {/* =================================================
              PRODUCT INFORMATION
          ================================================= */}

          <section className="product-information-section">

            <div className="product-information-card">

              <h2>
                Product Information
              </h2>

              <div className="product-specifications">

                <div>
                  <span>
                    Product
                  </span>

                  <strong>
                    {product.name}
                  </strong>
                </div>

                <div>
                  <span>
                    Brand
                  </span>

                  <strong>
                    {product.brand}
                  </strong>
                </div>

                <div>
                  <span>
                    Category
                  </span>

                  <strong>
                    {product.category ===
                    "Steel"
                      ? "Steel & TMT"
                      : product.category}
                  </strong>
                </div>

                <div>
                  <span>
                    Selling Unit
                  </span>

                  <strong>
                    Per {product.unit}
                  </strong>
                </div>

                <div>
                  <span>
                    Regular Price
                  </span>

                  <strong>
                    ₹
                    {product.price.toLocaleString(
                      "en-IN"
                    )}{" "}
                    / {product.unit}
                  </strong>
                </div>

                <div>
                  <span>
                    Current Price
                  </span>

                  <strong>
                    ₹
                    {currentUnitPrice.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}{" "}
                    / {product.unit}
                  </strong>
                </div>

                <div>
                  <span>
                    Current Discount
                  </span>

                  <strong>
                    {currentDiscountPercent}%
                  </strong>
                </div>

                <div>
                  <span>
                    Availability
                  </span>

                  <strong>
                    {product.inStock
                      ? "In Stock"
                      : "Out of Stock"}
                  </strong>
                </div>

              </div>

            </div>

            {/* =================================================
                BULK ORDER
            ================================================= */}

            <div className="product-bulk-order">

              <div>

                <span className="section-label">
                  CONTRACTOR PRICING
                </span>

                <h2>
                  Need this product in bulk?
                </h2>

                <p>
                  Request project pricing for larger
                  quantities and construction
                  requirements.
                </p>

              </div>

              <Link
                to="/bulk-quote"
                className="product-bulk-quote-button"
              >
                Request Bulk Quote
              </Link>

            </div>

          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}