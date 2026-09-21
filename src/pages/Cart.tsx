import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useCart } from "../context/CartContext";

const deliveryVehicles = [
  {
    id: "bolero",
    name: "Bolero Pickup",
    description: "Best for small orders and light materials.",
    price: 800,
    image: "/images/bolero-pickup.jpg",
  },
  {
    id: "eicher",
    name: "Eicher 407",
    description: "Best for medium construction material orders.",
    price: 1500,
    image: "/images/eicher-407.jpg",
  },
  {
    id: "taurus",
    name: "Tata Lorry Taurus 18–25T",
    description: "Best for large bulk and heavy material orders.",
    price: 3500,
    image: "/images/tata-taurus.jpg",
  },
];

export default function Checkout() {
  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  // =========================
  // FORM STATE
  // =========================

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [selectedVehicle, setSelectedVehicle] =
    useState("bolero");

  const [error, setError] = useState("");

  // =========================
  // SELECTED DELIVERY VEHICLE
  // =========================

  const selectedDeliveryVehicle =
    deliveryVehicles.find(
      (vehicle) => vehicle.id === selectedVehicle
    ) || deliveryVehicles[0];

  const deliveryCharge =
    selectedDeliveryVehicle.price;

  const finalTotal =
    cartTotal + deliveryCharge;

  // =========================
  // PLACE ORDER
  // =========================

  const handlePlaceOrder = () => {
    setError("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError(
        "Please enter a valid 10-digit Indian mobile number."
      );
      return;
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    if (!address.trim()) {
      setError(
        "Please enter your delivery address."
      );
      return;
    }

    if (!/^\d{6}$/.test(pinCode)) {
      setError(
        "Please enter a valid 6-digit PIN code."
      );
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // =========================
    // CREATE ORDER ID
    // =========================

    const today = new Date();

    const datePart =
      today.getFullYear().toString() +
      String(today.getMonth() + 1).padStart(2, "0") +
      String(today.getDate()).padStart(2, "0");

    const randomPart = Math.floor(
      1000 + Math.random() * 9000
    );

    const orderId =
      `BM-${datePart}-${randomPart}`;

    // =========================
    // ORDER INFORMATION
    // =========================

    const order = {
      orderId,

      customer: {
        fullName,
        mobile,
        email,
        address,
        landmark,
        pinCode,
      },

      items: cartItems,

      subtotal: cartTotal,

      deliveryVehicle: {
        id: selectedDeliveryVehicle.id,
        name: selectedDeliveryVehicle.name,
        price: selectedDeliveryVehicle.price,
      },

      deliveryCharge,

      total: finalTotal,

      paymentMethod,

      createdAt: new Date().toISOString(),
    };

    console.log("Order placed:", order);

    // Clear shopping cart
    clearCart();

    // Go to success page
    navigate("/order-success", {
      state: {
        orderId,
        total: finalTotal,
        paymentMethod,
        customerName: fullName,
        deliveryVehicle:
          selectedDeliveryVehicle.name,
        deliveryCharge,
      },
    });
  };

  return (
    <>
      <Header />
      <Navbar />

      <main className="checkout-page">
        <div className="container">

          {/* BREADCRUMB */}

          <div className="checkout-breadcrumb">
            <Link to="/cart">
              Cart
            </Link>

            <span>›</span>

            <span>
              Checkout
            </span>
          </div>

          {/* HEADING */}

          <div className="checkout-heading">
            <span className="section-label">
              SECURE CHECKOUT
            </span>

            <h1>
              Checkout
            </h1>

            <p>
              Enter your delivery details and review
              your order.
            </p>
          </div>

          {/* EMPTY CART */}

          {cartItems.length === 0 ? (
            <div className="checkout-empty">
              <h2>
                Your cart is empty
              </h2>

              <p>
                Add products before proceeding to
                checkout.
              </p>

              <Link to="/products">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="checkout-layout">

              {/* LEFT SIDE */}

              <div className="checkout-left">

                {/* ERROR */}

                {error && (
                  <div className="checkout-error">
                    <strong>
                      Please check your information
                    </strong>

                    <span>
                      {error}
                    </span>
                  </div>
                )}

                {/* CONTACT INFORMATION */}

                <section className="checkout-card">

                  <div className="checkout-section-title">
                    <span>1</span>

                    <div>
                      <h2>
                        Contact Information
                      </h2>

                      <p>
                        We'll use these details for
                        order updates.
                      </p>
                    </div>
                  </div>

                  <div className="checkout-form-grid">

                    {/* FULL NAME */}

                    <div className="form-group">
                      <label>
                        Full Name *
                      </label>

                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(event) =>
                          setFullName(
                            event.target.value
                          )
                        }
                      />
                    </div>

                    {/* MOBILE */}

                    <div className="form-group">
                      <label>
                        Mobile Number *
                      </label>

                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        value={mobile}
                        onChange={(event) => {
                          const value =
                            event.target.value.replace(
                              /\D/g,
                              ""
                            );

                          setMobile(value);
                        }}
                      />
                    </div>

                    {/* EMAIL */}

                    <div className="form-group full-width">
                      <label>
                        Email Address
                      </label>

                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(event) =>
                          setEmail(
                            event.target.value
                          )
                        }
                      />
                    </div>

                  </div>
                </section>

                {/* DELIVERY ADDRESS */}

                <section className="checkout-card">

                  <div className="checkout-section-title">
                    <span>2</span>

                    <div>
                      <h2>
                        Delivery Address
                      </h2>

                      <p>
                        Enter the construction site or
                        delivery address.
                      </p>
                    </div>
                  </div>

                  <div className="checkout-form-grid">

                    {/* ADDRESS */}

                    <div className="form-group full-width">
                      <label>
                        Address *
                      </label>

                      <input
                        type="text"
                        placeholder="House, building, site or street"
                        value={address}
                        onChange={(event) =>
                          setAddress(
                            event.target.value
                          )
                        }
                      />
                    </div>

                    {/* LANDMARK */}

                    <div className="form-group full-width">
                      <label>
                        Landmark / Area
                      </label>

                      <input
                        type="text"
                        placeholder="Nearby landmark or area"
                        value={landmark}
                        onChange={(event) =>
                          setLandmark(
                            event.target.value
                          )
                        }
                      />
                    </div>

                    {/* PIN CODE */}

                    <div className="form-group full-width">
                      <label>
                        PIN Code *
                      </label>

                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="6-digit PIN code"
                        maxLength={6}
                        value={pinCode}
                        onChange={(event) => {
                          const value =
                            event.target.value.replace(
                              /\D/g,
                              ""
                            );

                          setPinCode(value);
                        }}
                      />
                    </div>

                  </div>
                </section>

                {/* DELIVERY VEHICLE */}

                <section className="checkout-card">

                  <div className="checkout-section-title">
                    <span>3</span>

                    <div>
                      <h2>
                        Delivery Vehicle
                      </h2>

                      <p>
                        Choose a vehicle based on the
                        size of your order.
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
                            type="button"
                            key={vehicle.id}
                            className={
                              isSelected
                                ? "delivery-vehicle-card selected"
                                : "delivery-vehicle-card"
                            }
                            onClick={() =>
                              setSelectedVehicle(
                                vehicle.id
                              )
                            }
                          >

                            <div className="delivery-vehicle-image">
                              <img
                                src={vehicle.image}
                                alt={vehicle.name}
                              />
                            </div>

                            <div className="delivery-vehicle-info">

                              <div className="delivery-vehicle-top">

                                <span
                                  className={
                                    isSelected
                                      ? "vehicle-radio selected"
                                      : "vehicle-radio"
                                  }
                                />

                                <strong>
                                  {vehicle.name}
                                </strong>

                              </div>

                              <p>
                                {vehicle.description}
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
                    Base delivery charge. Final rates can
                    later be calculated according to
                    distance and load.
                  </p>

                </section>

                {/* PAYMENT */}

                <section className="checkout-card">

                  <div className="checkout-section-title">
                    <span>4</span>

                    <div>
                      <h2>
                        Payment Method
                      </h2>

                      <p>
                        Select how you want to pay.
                      </p>
                    </div>
                  </div>

                  <div className="payment-options">

                    {/* CASH ON DELIVERY */}

                    <label
                      className={
                        paymentMethod === "cod"
                          ? "payment-option selected"
                          : "payment-option"
                      }
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={
                          paymentMethod === "cod"
                        }
                        onChange={() =>
                          setPaymentMethod("cod")
                        }
                      />

                      <div>
                        <strong>
                          Cash on Delivery
                        </strong>

                        <span>
                          Pay when your materials are
                          delivered.
                        </span>
                      </div>
                    </label>

                    {/* ONLINE PAYMENT */}

                    <label
                      className={
                        paymentMethod === "online"
                          ? "payment-option selected"
                          : "payment-option"
                      }
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={
                          paymentMethod === "online"
                        }
                        onChange={() =>
                          setPaymentMethod("online")
                        }
                      />

                      <div>
                        <strong>
                          Online Payment
                        </strong>

                        <span>
                          UPI, debit/credit cards and
                          net banking.
                        </span>
                      </div>
                    </label>

                  </div>
                </section>

              </div>

              {/* ORDER SUMMARY */}

              <aside className="checkout-summary">

                <h2>
                  Order Summary
                </h2>

                <div className="checkout-products">

                  {cartItems.map((item) => (
                    <div
                      className="checkout-product"
                      key={item.product.id}
                    >
                      <div>
                        <strong>
                          {item.product.name}
                        </strong>

                        <span>
                          {item.quantity} × ₹
                          {item.product.price.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </div>

                      <strong>
                        ₹
                        {(
                          item.product.price *
                          item.quantity
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </strong>
                    </div>
                  ))}

                </div>

                <div className="checkout-summary-divider" />

                {/* SUBTOTAL */}

                <div className="checkout-summary-row">
                  <span>
                    Subtotal
                  </span>

                  <strong>
                    ₹
                    {cartTotal.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                {/* DELIVERY */}

                <div className="checkout-summary-row">

                  <div className="checkout-delivery-summary">
                    <span>
                      Delivery
                    </span>

                    <small>
                      {selectedDeliveryVehicle.name}
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

                {/* TOTAL */}

                <div className="checkout-total">
                  <span>
                    Total
                  </span>

                  <strong>
                    ₹
                    {finalTotal.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                {/* PLACE ORDER */}

                <button
                  type="button"
                  className="place-order-button"
                  onClick={handlePlaceOrder}
                >
                  {paymentMethod === "cod"
                    ? `Place Order • ₹${finalTotal.toLocaleString(
                        "en-IN"
                      )}`
                    : `Continue to Payment • ₹${finalTotal.toLocaleString(
                        "en-IN"
                      )}`}
                </button>

                <p className="checkout-security">
                  🔒 Secure checkout
                </p>

                <Link
                  to="/cart"
                  className="back-to-cart"
                >
                  ← Back to Cart
                </Link>

              </aside>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}