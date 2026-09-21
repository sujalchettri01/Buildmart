import {
  useState,
  type ChangeEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useCart } from "../context/CartContext";

import {
  getBulkPricing,
} from "../utils/pricing";

export default function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
  } = useCart();

  /*
  Temporary input values allow the
  customer to delete the existing number
  and type a new quantity.
  */

  const [quantityInputs, setQuantityInputs] =
    useState<Record<number, string>>({});

  /*
  =========================================================
  QUANTITY INPUT
  =========================================================
  */

  const getInputValue = (
    productId: number,
    quantity: number
  ) => {
    if (
      quantityInputs[productId] !==
      undefined
    ) {
      return quantityInputs[productId];
    }

    return String(quantity);
  };

  const handleQuantityInput = (
    event: ChangeEvent<HTMLInputElement>,
    productId: number
  ) => {
    const value =
      event.target.value;

    if (
      value !== "" &&
      !/^\d+$/.test(value)
    ) {
      return;
    }

    setQuantityInputs(
      (current) => ({
        ...current,
        [productId]: value,
      })
    );

    if (value === "") {
      return;
    }

    const newQuantity =
      Number(value);

    if (newQuantity >= 1) {
      updateQuantity(
        productId,
        newQuantity
      );
    }
  };

  const handleQuantityBlur = (
    productId: number,
    quantity: number
  ) => {
    const currentValue =
      quantityInputs[productId];

    if (
      currentValue === "" ||
      Number(currentValue) < 1
    ) {
      updateQuantity(
        productId,
        Math.max(1, quantity)
      );
    }

    setQuantityInputs(
      (current) => {
        const copy = {
          ...current,
        };

        delete copy[productId];

        return copy;
      }
    );
  };

  /*
  =========================================================
  EMPTY CART
  =========================================================
  */

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <Navbar />

        <main className="shopping-cart-page">
          <div className="container">
            <div className="cart-empty-state">

              <div className="cart-empty-icon">
                <ShoppingCart
                  size={42}
                />
              </div>

              <h1>
                Your cart is empty
              </h1>

              <p>
                Add construction
                materials to your cart
                to continue.
              </p>

              <Link
                to="/products"
                className="cart-shop-button"
              >
                Shop Products
              </Link>

            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  /*
  =========================================================
  SAVINGS
  =========================================================
  */

  const regularCartTotal =
    cartItems.reduce(
      (total, item) =>
        total +
        item.product.price *
          item.quantity,
      0
    );

  const totalSavings =
    regularCartTotal -
    cartTotal;

  return (
    <>
      <Header />
      <Navbar />

      <main className="shopping-cart-page">

        <div className="container">

          {/* BREADCRUMB */}

          <div className="cart-breadcrumb">
            <Link to="/">
              Home
            </Link>

            <span>›</span>

            <span>
              Shopping Cart
            </span>
          </div>

          {/* HEADING */}

          <div className="cart-page-heading">

            <div>
              <span className="section-label">
                YOUR ORDER
              </span>

              <h1>
                Shopping Cart
              </h1>

              <p>
                Review your products
                and quantities before
                checkout.
              </p>
            </div>

            <button
              type="button"
              className="cart-clear-button"
              onClick={clearCart}
            >
              <Trash2 size={16} />

              Clear Cart
            </button>

          </div>

          <div className="cart-page-layout">

            {/* =========================================
                PRODUCTS
            ========================================= */}

            <div className="cart-products">

              {cartItems.map(
                (item) => {
                  const pricing =
                    getBulkPricing(
                      item.product,
                      item.quantity
                    );

                  const nextTierQuantity =
                    Math.floor(
                      item.quantity / 50
                    ) *
                      50 +
                    50;

                  return (
                    <article
                      className="cart-product-card"
                      key={
                        item.product.id
                      }
                    >

                      {/* IMAGE */}

                      <Link
                        to={`/product/${item.product.id}`}
                        className="cart-product-image"
                      >
                        <img
                          src={
                            item.product
                              .image
                          }
                          alt={
                            item.product
                              .name
                          }
                        />
                      </Link>

                      {/* DETAILS */}

                      <div className="cart-product-details">

                        <span className="cart-product-brand">
                          {
                            item.product
                              .brand
                          }
                        </span>

                        <Link
                          to={`/product/${item.product.id}`}
                          className="cart-product-name"
                        >
                          {
                            item.product
                              .name
                          }
                        </Link>

                        <span className="cart-product-category">
                          {
                            item.product
                              .category
                          }
                        </span>

                        {item.product
                          .inStock && (
                          <span className="cart-stock">
                            ✓ In Stock
                          </span>
                        )}

                        {/* PRICE */}

                        <div className="cart-unit-price">

                          {pricing.hasBulkDiscount ? (
                            <>
                              <div>
                                <strong>
                                  ₹
                                  {pricing.effectiveUnitPrice.toLocaleString(
                                    "en-IN",
                                    {
                                      maximumFractionDigits: 2,
                                    }
                                  )}
                                </strong>

                                <span>
                                  {" "}
                                  /{" "}
                                  {
                                    item.product
                                      .unit
                                  }
                                </span>
                              </div>

                              <small>
                                Regular ₹
                                {item.product.price.toLocaleString(
                                  "en-IN"
                                )}{" "}
                                /{" "}
                                {
                                  item.product
                                    .unit
                                }
                              </small>

                              <span className="cart-bulk-badge">
                                {
                                  pricing.discountPercent
                                }
                                % BULK
                                DISCOUNT
                              </span>
                            </>
                          ) : (
                            <div>
                              <strong>
                                ₹
                                {item.product.price.toLocaleString(
                                  "en-IN"
                                )}
                              </strong>

                              <span>
                                {" "}
                                /{" "}
                                {
                                  item.product
                                    .unit
                                }
                              </span>
                            </div>
                          )}

                        </div>

                        {/* QUANTITY */}

                        <div className="cart-quantity-area">

                          <span className="cart-quantity-label">
                            Quantity
                          </span>

                          <div className="cart-quantity-control">

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product
                                    .id,
                                  item.quantity -
                                    1
                                )
                              }
                              aria-label="Decrease quantity"
                            >
                              <Minus
                                size={
                                  16
                                }
                              />
                            </button>

                            <input
                              type="text"
                              inputMode="numeric"
                              value={getInputValue(
                                item.product
                                  .id,
                                item.quantity
                              )}
                              onChange={(
                                event
                              ) =>
                                handleQuantityInput(
                                  event,
                                  item.product
                                    .id
                                )
                              }
                              onBlur={() =>
                                handleQuantityBlur(
                                  item.product
                                    .id,
                                  item.quantity
                                )
                              }
                              aria-label="Product quantity"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product
                                    .id,
                                  item.quantity +
                                    1
                                )
                              }
                              aria-label="Increase quantity"
                            >
                              <Plus
                                size={
                                  16
                                }
                              />
                            </button>

                          </div>

                          <span className="cart-quantity-unit">
                            {
                              item.product
                                .unit
                            }
                            {item.quantity >
                            1
                              ? "s"
                              : ""}
                          </span>

                        </div>

                        {/* BULK INFORMATION */}

                        {!pricing.hasBulkDiscount ? (
                          <div className="cart-next-discount">
                            Add{" "}
                            <strong>
                              {50 -
                                item.quantity}
                            </strong>{" "}
                            more to unlock
                            10% bulk
                            pricing.
                          </div>
                        ) : (
                          <div className="cart-next-discount bulk-active">
                            ✓{" "}
                            <strong>
                              {
                                pricing.discountPercent
                              }
                              % OFF
                            </strong>{" "}
                            applied. Add{" "}
                            <strong>
                              {nextTierQuantity -
                                item.quantity}
                            </strong>{" "}
                            more for the
                            next bulk tier.
                          </div>
                        )}

                      </div>

                      {/* RIGHT */}

                      <div className="cart-product-right">

                        <button
                          type="button"
                          className="cart-remove-button"
                          onClick={() =>
                            removeFromCart(
                              item.product
                                .id
                            )
                          }
                        >
                          <Trash2
                            size={15}
                          />

                          Remove
                        </button>

                        <div className="cart-line-total">

                          <span>
                            Item Total
                          </span>

                          {pricing.hasBulkDiscount && (
                            <small>
                              ₹
                              {pricing.normalTotal.toLocaleString(
                                "en-IN",
                                {
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </small>
                          )}

                          <strong>
                            ₹
                            {pricing.total.toLocaleString(
                              "en-IN",
                              {
                                maximumFractionDigits: 2,
                              }
                            )}
                          </strong>

                          {pricing.hasBulkDiscount && (
                            <p>
                              You save ₹
                              {pricing.savings.toLocaleString(
                                "en-IN",
                                {
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </p>
                          )}

                        </div>

                      </div>

                    </article>
                  );
                }
              )}

              <Link
                to="/products"
                className="cart-continue-shopping"
              >
                ← Continue Shopping
              </Link>

            </div>

            {/* =========================================
                CART SUMMARY
            ========================================= */}

            <aside className="cart-order-summary">

              <h2>
                Cart Summary
              </h2>

              <div className="cart-summary-row">
                <span>
                  Regular Price
                </span>

                <span>
                  ₹
                  {regularCartTotal.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                </span>
              </div>

              {totalSavings > 0 && (
                <div className="cart-summary-row cart-summary-savings">
                  <span>
                    Bulk Savings
                  </span>

                  <strong>
                    - ₹
                    {totalSavings.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}
                  </strong>
                </div>
              )}

              <div className="cart-summary-divider" />

              <div className="cart-summary-total">

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹
                  {cartTotal.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                </strong>

              </div>

              <p className="cart-delivery-note">
                Delivery charges will be
                calculated after you choose
                your delivery vehicle.
              </p>

              <button
                type="button"
                className="cart-checkout-button"
                onClick={() =>
                  navigate(
                    "/checkout"
                  )
                }
              >
                Proceed to Checkout
                <ArrowRightIcon />
              </button>

              {totalSavings > 0 && (
                <div className="cart-total-saved">
                  🎉 You're saving{" "}
                  <strong>
                    ₹
                    {totalSavings.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}
                  </strong>{" "}
                  with bulk pricing.
                </div>
              )}

            </aside>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}

/*
Simple arrow without another
Lucide import.
*/

function ArrowRightIcon() {
  return (
    <span
      aria-hidden="true"
      style={{
        fontSize: "18px",
      }}
    >
      →
    </span>
  );
}