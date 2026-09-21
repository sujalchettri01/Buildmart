import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";



import {
  Link,
  useNavigate,
} from "react-router-dom";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


import { useCart } from "../context/CartContext";

import {
  getBulkPricing,
} from "../utils/pricing";

/* =========================================================
   TYPES
========================================================= */

interface CheckoutForm {
  fullName: string;
  phone: string;
  email: string;

  address: string;
  landmark: string;
  pincode: string;
  deliveryLocation: string;

  paymentMethod: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;

  address?: string;
  pincode?: string;
  deliveryLocation?: string;
}

/* =========================================================
   DELIVERY VEHICLES
========================================================= */

const deliveryVehicles = [
  {
    id: "bolero-pickup",
    name: "Bolero Pickup",
    description:
      "Small orders & light construction materials",
    price: 800,
    image: "/images/bolero-pickup.jpg",
  },

  {
    id: "eicher-407",
    name: "Eicher 407",
    description:
      "Medium orders & construction materials",
    price: 1500,
    image: "/images/eicher-407.jpg",
  },

  {
    id: "tata-taurus",
    name: "Tata Lorry Taurus 18–25T",
    description:
      "Large bulk & heavy construction materials",
    price: 3500,
    image: "/images/tata-taurus.jpg",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  /* =======================================================
     FORM
  ======================================================= */

  const [form, setForm] =
    useState<CheckoutForm>({
      fullName: "",
      phone: "",
      email: "",

      address: "",
      landmark: "",
      pincode: "",
      deliveryLocation: "",

      paymentMethod: "cod",
    });

  const [errors, setErrors] =
    useState<FormErrors>({});

  /* =======================================================
     DELIVERY VEHICLE
  ======================================================= */

  const [
    selectedVehicle,
    setSelectedVehicle,
  ] = useState("bolero-pickup");

  const selectedDeliveryVehicle =
    deliveryVehicles.find(
      (vehicle) =>
        vehicle.id ===
        selectedVehicle
    ) ?? deliveryVehicles[0];

  const deliveryCharge =
    selectedDeliveryVehicle.price;

  /* =======================================================
     TOTALS
  ======================================================= */

  const regularCartTotal =
    cartItems.reduce(
      (total, item) =>
        total +
        item.product.price *
          item.quantity,
      0
    );

  const bulkSavings =
    Math.max(
      0,
      regularCartTotal -
        cartTotal
    );

  const grandTotal =
    cartTotal +
    deliveryCharge;

  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const {
      name,
      value,
    } = event.target;

    let finalValue = value;

    /*
      Mobile and PIN should only
      contain numbers.
    */

    if (
      name === "phone" ||
      name === "pincode"
    ) {
      finalValue =
        value.replace(
          /\D/g,
          ""
        );
    }

    setForm(
      (currentForm) => ({
        ...currentForm,
        [name]: finalValue,
      })
    );

    setErrors(
      (currentErrors) => ({
        ...currentErrors,
        [name]: undefined,
      })
    );
  };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = () => {
    const newErrors: FormErrors =
      {};

    /* FULL NAME */

    if (!form.fullName.trim()) {
      newErrors.fullName =
        "Full name is required.";
    }

    /* PHONE */

    if (!form.phone.trim()) {
      newErrors.phone =
        "Mobile number is required.";
    } else if (
      !/^[6-9]\d{9}$/.test(
        form.phone
      )
    ) {
      newErrors.phone =
        "Enter a valid 10-digit Indian mobile number.";
    }

    /* EMAIL */

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim()
      )
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    /* ADDRESS */

    if (!form.address.trim()) {
      newErrors.address =
        "Delivery address is required.";
    }

    /* PIN */

    if (!form.pincode.trim()) {
      newErrors.pincode =
        "PIN code is required.";
    } else if (
      !/^\d{6}$/.test(
        form.pincode
      )
    ) {
      newErrors.pincode =
        "Enter a valid 6-digit PIN code.";
    }

    /* DELIVERY LOCATION */

    if (
      !form.deliveryLocation.trim()
    ) {
      newErrors.deliveryLocation =
        "Delivery location is required.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  /* =======================================================
     ORDER ID
  ======================================================= */

  const generateOrderId = () => {
    const today =
      new Date();

    const datePart = [
      today.getFullYear(),

      String(
        today.getMonth() + 1
      ).padStart(2, "0"),

      String(
        today.getDate()
      ).padStart(2, "0"),
    ].join("");

    const randomPart =
      Math.floor(
        1000 +
          Math.random() *
            9000
      );

    return `BM-${datePart}-${randomPart}`;
  };

  /* =======================================================
     PLACE ORDER
  ======================================================= */

  const handlePlaceOrder = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    /* CART CHECK */

    if (
      cartItems.length === 0
    ) {
      alert(
        "Your cart is empty."
      );

      navigate("/cart");

      return;
    }

    /* FORM CHECK */

    if (!validateForm()) {
      return;
    }

    const orderId =
      generateOrderId();

    /*
      Store pricing information with
      each order item.

      This will also be useful later
      when you connect your backend.
    */

    const orderItems =
      cartItems.map(
        (item) => {
          const pricing =
            getBulkPricing(
              item.product,
              item.quantity
            );

          return {
            product:
              item.product,

            quantity:
              item.quantity,

            regularUnitPrice:
              item.product.price,

            finalUnitPrice:
              pricing.effectiveUnitPrice,

            discountPercent:
              pricing.discountPercent,

            regularTotal:
              pricing.normalTotal,

            finalTotal:
              pricing.total,

            savings:
              pricing.savings,
          };
        }
      );

    const order = {
      orderId,

      customer: {
        fullName:
          form.fullName,

        phone:
          form.phone,

        email:
          form.email,
      },

      deliveryAddress: {
        address:
          form.address,

        landmark:
          form.landmark,

        pincode:
          form.pincode,

        location:
          form.deliveryLocation,
      },

      items:
        orderItems,

      regularSubtotal:
        regularCartTotal,

      bulkSavings,

      subtotal:
        cartTotal,

      deliveryVehicle: {
        id:
          selectedDeliveryVehicle.id,

        name:
          selectedDeliveryVehicle.name,

        price:
          selectedDeliveryVehicle.price,
      },

      deliveryCharge,

      total:
        grandTotal,

      paymentMethod:
        form.paymentMethod,

      createdAt:
        new Date().toISOString(),
    };

    /*
      For now this prints the order
      in the browser console.

      Later we can send this exact
      object to your backend.
    */

    console.log(
      "Order placed:",
      order
    );

    /*
      Save latest order locally.

      Useful for frontend testing
      before backend integration.
    */

    localStorage.setItem(
      "buildmart-last-order",
      JSON.stringify(order)
    );

    /* CLEAR CART */

    clearCart();

    /* SUCCESS PAGE */

    navigate(
      "/order-success",
      {
        state: {
          orderId,

          total:
            grandTotal,

          subtotal:
            cartTotal,

          savings:
            bulkSavings,

          paymentMethod:
            form.paymentMethod,

          customerName:
            form.fullName,

          deliveryVehicle:
            selectedDeliveryVehicle.name,

          deliveryCharge,
        },
      }
    );
  };

  /* =======================================================
     EMPTY CART
  ======================================================= */

  if (
    cartItems.length === 0
  ) {
    return (
      <>
        <Header />

        <Navbar />

        <main className="checkout-page">
          <div className="container">

            <div className="checkout-empty">

              <h1>
                Your cart is empty
              </h1>

              <p>
                Add some construction
                materials before
                proceeding to checkout.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/products"
                  )
                }
              >
                Shop Products
              </button>

            </div>

          </div>
        </main>

        <Footer />
      </>
    );
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <>
      <Header />

      <Navbar />

      <main className="checkout-page">

        <div className="container">

          {/* ===============================================
              BREADCRUMB
          =============================================== */}

          <div className="cart-breadcrumb">

            <Link to="/">
              Home
            </Link>

            <span>
              ›
            </span>

            <Link to="/cart">
              Cart
            </Link>

            <span>
              ›
            </span>

            <span>
              Checkout
            </span>

          </div>

          {/* ===============================================
              HEADING
          =============================================== */}

          <div className="checkout-heading">

            <span className="section-label">
              SECURE CHECKOUT
            </span>

            <h1>
              Checkout
            </h1>

            <p>
              Complete your delivery
              details and choose your
              preferred delivery vehicle.
            </p>

          </div>

          {/* ===============================================
              FORM
          =============================================== */}

          <form
            className="checkout-layout"
            onSubmit={
              handlePlaceOrder
            }
          >

            {/* =============================================
                LEFT SIDE
            ============================================= */}

            <div className="checkout-main">

              {/* ===========================================
                  1. CONTACT DETAILS
              =========================================== */}

              <section className="checkout-section">

                <div className="checkout-section-heading">

                  <span className="checkout-step">
                    1
                  </span>

                  <div>

                    <h2>
                      Contact Details
                    </h2>

                    <p>
                      We'll use these
                      details for your
                      order.
                    </p>

                  </div>

                </div>

                <div className="checkout-form-grid">

                  {/* FULL NAME */}

                  <div className="checkout-field">

                    <label htmlFor="fullName">
                      Full Name *
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={
                        form.fullName
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter your full name"
                    />

                    {errors.fullName && (
                      <span className="checkout-error">
                        {
                          errors.fullName
                        }
                      </span>
                    )}

                  </div>

                  {/* PHONE */}

                  <div className="checkout-field">

                    <label htmlFor="phone">
                      Mobile Number *
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      value={
                        form.phone
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="10-digit mobile number"
                      maxLength={
                        10
                      }
                    />

                    {errors.phone && (
                      <span className="checkout-error">
                        {
                          errors.phone
                        }
                      </span>
                    )}

                  </div>

                  {/* EMAIL */}

                  <div className="checkout-field checkout-field-full">

                    <label htmlFor="email">
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={
                        form.email
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="you@example.com"
                    />

                    {errors.email && (
                      <span className="checkout-error">
                        {
                          errors.email
                        }
                      </span>
                    )}

                  </div>

                </div>

              </section>

              {/* ===========================================
                  2. DELIVERY DETAILS
              =========================================== */}

              <section className="checkout-section">

                <div className="checkout-section-heading">

                  <span className="checkout-step">
                    2
                  </span>

                  <div>

                    <h2>
                      Delivery Details
                    </h2>

                    <p>
                      Tell us where your
                      construction
                      materials should
                      be delivered.
                    </p>

                  </div>

                </div>

                <div className="checkout-form-grid">

                  {/* ADDRESS */}

                  <div className="checkout-field checkout-field-full">

                    <label htmlFor="address">
                      Full Delivery
                      Address *
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      value={
                        form.address
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="House / site number, road, locality..."
                      rows={4}
                    />

                    {errors.address && (
                      <span className="checkout-error">
                        {
                          errors.address
                        }
                      </span>
                    )}

                  </div>

                  {/* LANDMARK */}

                  <div className="checkout-field">

                    <label htmlFor="landmark">
                      Landmark / Area
                    </label>

                    <input
                      id="landmark"
                      name="landmark"
                      type="text"
                      value={
                        form.landmark
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Nearby landmark or area"
                    />

                  </div>

                  {/* PIN */}

                  <div className="checkout-field">

                    <label htmlFor="pincode">
                      PIN Code *
                    </label>

                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      inputMode="numeric"
                      value={
                        form.pincode
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="6-digit PIN code"
                      maxLength={
                        6
                      }
                    />

                    {errors.pincode && (
                      <span className="checkout-error">
                        {
                          errors.pincode
                        }
                      </span>
                    )}

                  </div>

                  {/* LOCATION */}

                  <div className="checkout-field checkout-field-full">

                    <label htmlFor="deliveryLocation">
                      Delivery Location *
                    </label>

                    <input
                      id="deliveryLocation"
                      name="deliveryLocation"
                      type="text"
                      value={
                        form.deliveryLocation
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Example: Siliguri, Gangtok, Namchi..."
                    />

                    {errors.deliveryLocation && (
                      <span className="checkout-error">
                        {
                          errors.deliveryLocation
                        }
                      </span>
                    )}

                  </div>

                </div>

              </section>

              {/* ===========================================
                  3. DELIVERY VEHICLE
              =========================================== */}

              <section className="checkout-section">

                <div className="checkout-section-heading">

                  <span className="checkout-step">
                    3
                  </span>

                  <div>

                    <h2>
                      Choose Delivery
                      Vehicle
                    </h2>

                    <p>
                      Select a vehicle
                      suitable for your
                      order.
                    </p>

                  </div>

                </div>

                <div className="delivery-vehicle-grid">

                  {deliveryVehicles.map(
                    (vehicle) => {
                      const isSelected =
                        selectedVehicle ===
                        vehicle.id;

                      return (
                        <button
                          key={
                            vehicle.id
                          }
                          type="button"
                          className={`delivery-vehicle-card ${
                            isSelected
                              ? "selected delivery-vehicle-selected"
                              : ""
                          }`}
                          onClick={() =>
                            setSelectedVehicle(
                              vehicle.id
                            )
                          }
                        >

                          {/* IMAGE */}

                          <div className="delivery-vehicle-image">

                            <img
                              src={
                                vehicle.image
                              }
                              alt={
                                vehicle.name
                              }
                            />

                          </div>

                          {/* INFO */}

                          <div className="delivery-vehicle-info">

                            <div className="delivery-vehicle-top">

                              <span
                                className={`vehicle-radio ${
                                  isSelected
                                    ? "selected"
                                    : ""
                                }`}
                              />

                              <strong>
                                {
                                  vehicle.name
                                }
                              </strong>

                            </div>

                            <p>
                              {
                                vehicle.description
                              }
                            </p>

                            <div className="delivery-vehicle-price">
                              ₹
                              {vehicle.price.toLocaleString(
                                "en-IN"
                              )}
                            </div>

                          </div>

                        </button>
                      );
                    }
                  )}

                </div>

                <p className="delivery-rate-note">
                  * Delivery rates shown
                  are base rates. Later
                  they can be calculated
                  automatically according
                  to distance, load,
                  product weight and
                  delivery location.
                </p>

              </section>

              {/* ===========================================
                  4. PAYMENT
              =========================================== */}

              <section className="checkout-section">

                <div className="checkout-section-heading">

                  <span className="checkout-step">
                    4
                  </span>

                  <div>

                    <h2>
                      Payment Method
                    </h2>

                    <p>
                      Choose how you
                      would like to pay.
                    </p>

                  </div>

                </div>

                <div className="payment-options">

                  {/* COD */}

                  <label
                    className={`payment-option ${
                      form.paymentMethod ===
                      "cod"
                        ? "payment-option-selected"
                        : ""
                    }`}
                  >

                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={
                        form.paymentMethod ===
                        "cod"
                      }
                      onChange={
                        handleChange
                      }
                    />

                    <div>

                      <strong>
                        Cash on Delivery
                      </strong>

                      <span>
                        Pay when your
                        materials are
                        delivered.
                      </span>

                    </div>

                  </label>

                  {/* ONLINE */}

                  <label
                    className={`payment-option ${
                      form.paymentMethod ===
                      "online"
                        ? "payment-option-selected"
                        : ""
                    }`}
                  >

                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={
                        form.paymentMethod ===
                        "online"
                      }
                      onChange={
                        handleChange
                      }
                    />

                    <div>

                      <strong>
                        Online Payment
                      </strong>

                      <span>
                        UPI, cards and
                        net banking.
                      </span>

                    </div>

                  </label>

                </div>

              </section>

            </div>

            {/* =============================================
                RIGHT SIDE - ORDER SUMMARY
            ============================================= */}

            <aside className="checkout-summary">

              <h2>
                Order Summary
              </h2>

              {/* PRODUCTS */}

              <div className="checkout-summary-products">

                {cartItems.map(
                  (item) => {
                    const pricing =
                      getBulkPricing(
                        item.product,
                        item.quantity
                      );

                    return (
                      <div
                        className="checkout-summary-product"
                        key={
                          item.product.id
                        }
                      >

                        {/* PRODUCT IMAGE */}

                        <div className="checkout-summary-product-image">

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

                          <span>
                            {
                              item.quantity
                            }
                          </span>

                        </div>

                        {/* PRODUCT DETAILS */}

                        <div className="checkout-summary-product-info">

                          <strong>
                            {
                              item.product
                                .name
                            }
                          </strong>

                          <span>
                            {
                              item.product
                                .brand
                            }
                          </span>

                          {/* BULK PRICE */}

                          {pricing.hasBulkDiscount ? (
                            <small className="checkout-bulk-price">

                              ₹
                              {pricing.effectiveUnitPrice.toLocaleString(
                                "en-IN",
                                {
                                  maximumFractionDigits: 2,
                                }
                              )}

                              {" / "}

                              {
                                item.product
                                  .unit
                              }

                              {" • "}

                              {
                                pricing.discountPercent
                              }
                              % OFF

                            </small>
                          ) : (
                            <small>

                              ₹
                              {item.product.price.toLocaleString(
                                "en-IN"
                              )}

                              {" / "}

                              {
                                item.product
                                  .unit
                              }

                            </small>
                          )}

                          <small>
                            {
                              item.quantity
                            }{" "}
                            {
                              item.product
                                .unit
                            }
                            {item.quantity >
                            1
                              ? "s"
                              : ""}
                          </small>

                        </div>

                        {/* LINE TOTAL */}

                        <div className="checkout-product-price">

                          {pricing.hasBulkDiscount && (
                            <small className="checkout-old-price">

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
                            <small className="checkout-product-saving">

                              Save ₹
                              {pricing.savings.toLocaleString(
                                "en-IN",
                                {
                                  maximumFractionDigits: 2,
                                }
                              )}

                            </small>
                          )}

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

              {/* EDIT CART */}

              <Link
                to="/cart"
                className="checkout-edit-cart"
              >
                ← Edit Cart
              </Link>

              <div className="checkout-summary-divider" />

              {/* REGULAR TOTAL */}

              {bulkSavings > 0 && (
                <div className="checkout-summary-row">

                  <span>
                    Regular Price
                  </span>

                  <span className="checkout-regular-total">

                    ₹
                    {regularCartTotal.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}

                  </span>

                </div>
              )}

              {/* SAVINGS */}

              {bulkSavings > 0 && (
                <div className="checkout-summary-row checkout-savings-row">

                  <span>
                    Bulk Savings
                  </span>

                  <strong>

                    - ₹
                    {bulkSavings.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}

                  </strong>

                </div>
              )}

              {/* SUBTOTAL */}

              <div className="checkout-summary-row">

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

              {/* DELIVERY */}

              <div className="checkout-summary-row">

                <div className="checkout-delivery-summary">

                  <span>
                    Delivery
                  </span>

                  <small className="summary-vehicle-name">
                    {
                      selectedDeliveryVehicle.name
                    }
                  </small>

                </div>

                <strong>

                  ₹
                  {deliveryCharge.toLocaleString(
                    "en-IN"
                  )}

                </strong>

              </div>

              <div className="checkout-summary-divider" />

              {/* GRAND TOTAL */}

              <div className="checkout-summary-total">

                <span>
                  Total
                </span>

                <strong>

                  ₹
                  {grandTotal.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 2,
                    }
                  )}

                </strong>

              </div>

              {/* PLACE ORDER */}

              <button
                type="submit"
                className="place-order-button"
              >

                Place Order • ₹
                {grandTotal.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 2,
                  }
                )}

              </button>

              {/* SAVINGS MESSAGE */}

              {bulkSavings > 0 && (
                <div className="checkout-total-savings">

                  🎉 You're saving{" "}

                  <strong>

                    ₹
                    {bulkSavings.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}

                  </strong>

                  {" "}with bulk pricing.

                </div>
              )}

              <p className="checkout-secure-text">
                🔒 Your order information
                is securely processed.
              </p>

            </aside>

          </form>

        </div>

      </main>

      <Footer />
    </>
  );
}