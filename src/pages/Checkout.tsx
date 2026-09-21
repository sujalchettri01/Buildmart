import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

interface CheckoutForm {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

const deliveryVehicles = [
  {
    id: "bolero-pickup",
    name: "Bolero Pickup",
    description: "Small orders & light construction materials",
    price: 800,
    image: "/images/bolero-pickup.jpg",
  },
  {
    id: "eicher-407",
    name: "Eicher 407",
    description: "Medium orders & construction materials",
    price: 1500,
    image: "/images/eicher-407.jpg",
  },
  {
    id: "tata-taurus",
    name: "Tata Lorry Taurus 18–25T",
    description: "Large bulk & heavy construction materials",
    price: 3500,
    image: "/images/tata-taurus.jpg",
  },
];

export default function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [selectedVehicle, setSelectedVehicle] =
    useState("bolero-pickup");

  const selectedDeliveryVehicle =
    deliveryVehicles.find(
      (vehicle) => vehicle.id === selectedVehicle
    ) || deliveryVehicles[0];

  const deliveryCharge = selectedDeliveryVehicle.price;

  const grandTotal = cartTotal + deliveryCharge;

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
    }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone =
        "Enter a valid 10-digit Indian mobile number.";
    }

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.address.trim()) {
      newErrors.address = "Delivery address is required.";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!form.state.trim()) {
      newErrors.state = "State is required.";
    }

    if (!form.pincode.trim()) {
      newErrors.pincode = "PIN code is required.";
    } else if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode =
        "Enter a valid 6-digit PIN code.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const generateOrderId = () => {
    const today = new Date();

    const datePart = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("");

    const randomPart = Math.floor(
      1000 + Math.random() * 9000
    );

    return `BM-${datePart}-${randomPart}`;
  };

  const handlePlaceOrder = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      navigate("/cart");
      return;
    }

    if (!validateForm()) {
      return;
    }

    const orderId = generateOrderId();

    const order = {
      orderId,
      customer: {
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      },
      items: cartItems,
      subtotal: cartTotal,
      deliveryVehicle: {
        id: selectedDeliveryVehicle.id,
        name: selectedDeliveryVehicle.name,
        price: selectedDeliveryVehicle.price,
      },
      deliveryCharge,
      total: grandTotal,
      paymentMethod: form.paymentMethod,
      createdAt: new Date().toISOString(),
    };

    console.log("Order placed:", order);

    clearCart();

    navigate("/order-success", {
      state: {
        orderId,
        total: grandTotal,
        paymentMethod: form.paymentMethod,
        customerName: form.fullName,
        deliveryVehicle: selectedDeliveryVehicle.name,
        deliveryCharge,
      },
    });
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <Navbar />

        <main className="checkout-page">
          <div className="container">
            <div className="checkout-empty">
              <h1>Your cart is empty</h1>

              <p>
                Add some construction materials before
                proceeding to checkout.
              </p>

              <button
                type="button"
                onClick={() => navigate("/products")}
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

  return (
    <>
      <Header />
      <Navbar />

      <main className="checkout-page">
        <div className="container">
          <div className="checkout-heading">
            <span className="section-label">
              SECURE CHECKOUT
            </span>

            <h1>Checkout</h1>

            <p>
              Complete your delivery details and choose
              your preferred delivery vehicle.
            </p>
          </div>

          <form
            className="checkout-layout"
            onSubmit={handlePlaceOrder}
          >
            {/* LEFT SIDE */}
            <div className="checkout-main">
              {/* CONTACT DETAILS */}
              <section className="checkout-section">
                <div className="checkout-section-heading">
                  <span className="checkout-step">1</span>

                  <div>
                    <h2>Contact Details</h2>
                    <p>
                      We'll use these details for your order.
                    </p>
                  </div>
                </div>

                <div className="checkout-form-grid">
                  <div className="checkout-field">
                    <label htmlFor="fullName">
                      Full Name *
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />

                    {errors.fullName && (
                      <span className="checkout-error">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="phone">
                      Mobile Number *
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                    />

                    {errors.phone && (
                      <span className="checkout-error">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className="checkout-field checkout-field-full">
                    <label htmlFor="email">
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />

                    {errors.email && (
                      <span className="checkout-error">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>
              </section>

              {/* DELIVERY ADDRESS */}
              <section className="checkout-section">
                <div className="checkout-section-heading">
                  <span className="checkout-step">2</span>

                  <div>
                    <h2>Delivery Address</h2>
                    <p>
                      Where should we deliver your materials?
                    </p>
                  </div>
                </div>

                <div className="checkout-form-grid">
                  <div className="checkout-field checkout-field-full">
                    <label htmlFor="address">
                      Full Address *
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House / site number, road, landmark..."
                      rows={4}
                    />

                    {errors.address && (
                      <span className="checkout-error">
                        {errors.address}
                      </span>
                    )}
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="city">
                      City *
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="City"
                    />

                    {errors.city && (
                      <span className="checkout-error">
                        {errors.city}
                      </span>
                    )}
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="state">
                      State *
                    </label>

                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="State"
                    />

                    {errors.state && (
                      <span className="checkout-error">
                        {errors.state}
                      </span>
                    )}
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="pincode">
                      PIN Code *
                    </label>

                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      inputMode="numeric"
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="6-digit PIN code"
                      maxLength={6}
                    />

                    {errors.pincode && (
                      <span className="checkout-error">
                        {errors.pincode}
                      </span>
                    )}
                  </div>
                </div>
              </section>

              {/* DELIVERY VEHICLE */}
              <section className="checkout-section">
                <div className="checkout-section-heading">
                  <span className="checkout-step">3</span>

                  <div>
                    <h2>Choose Delivery Vehicle</h2>
                    <p>
                      Select a vehicle suitable for your order.
                    </p>
                  </div>
                </div>

                <div className="delivery-vehicle-grid">
                  {deliveryVehicles.map((vehicle) => {
                    const isSelected =
                      selectedVehicle === vehicle.id;

                    return (
                      <button
                        key={vehicle.id}
                        type="button"
                        className={`delivery-vehicle-card ${
                          isSelected
                            ? "delivery-vehicle-selected"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedVehicle(vehicle.id)
                        }
                      >
                        <div className="delivery-vehicle-image">
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                          />
                        </div>

                        <div className="delivery-vehicle-content">
                          <div className="delivery-vehicle-radio">
                            <span
                              className={
                                isSelected
                                  ? "vehicle-radio-selected"
                                  : ""
                              }
                            />
                          </div>

                          <h3>{vehicle.name}</h3>

                          <p>{vehicle.description}</p>

                          <div className="delivery-vehicle-price">
                            ₹
                            {vehicle.price.toLocaleString(
                              "en-IN"
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="delivery-rate-note">
                  * Delivery rates shown are base rates and
                  can later be calculated according to
                  distance, load and delivery location.
                </p>
              </section>

              {/* PAYMENT */}
              <section className="checkout-section">
                <div className="checkout-section-heading">
                  <span className="checkout-step">4</span>

                  <div>
                    <h2>Payment Method</h2>
                    <p>
                      Choose how you would like to pay.
                    </p>
                  </div>
                </div>

                <div className="payment-options">
                  <label
                    className={`payment-option ${
                      form.paymentMethod === "cod"
                        ? "payment-option-selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={
                        form.paymentMethod === "cod"
                      }
                      onChange={handleChange}
                    />

                    <div>
                      <strong>
                        Cash on Delivery
                      </strong>

                      <span>
                        Pay when your materials are delivered.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`payment-option ${
                      form.paymentMethod === "online"
                        ? "payment-option-selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={
                        form.paymentMethod === "online"
                      }
                      onChange={handleChange}
                    />

                    <div>
                      <strong>
                        Online Payment
                      </strong>

                      <span>
                        UPI, cards and net banking.
                      </span>
                    </div>
                  </label>
                </div>
              </section>
            </div>

            {/* RIGHT SIDE - ORDER SUMMARY */}
            <aside className="checkout-summary">
              <h2>Order Summary</h2>

              <div className="checkout-summary-products">
                {cartItems.map((item) => (
                  <div
                    className="checkout-summary-product"
                    key={item.product.id}
                  >
                    <div className="checkout-summary-product-image">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                      />

                      <span>{item.quantity}</span>
                    </div>

                    <div className="checkout-summary-product-info">
                      <strong>
                        {item.product.name}
                      </strong>

                      <span>
                        {item.product.brand}
                      </span>
                    </div>

                    <strong>
                      ₹
                      {(
                        item.product.price *
                        item.quantity
                      ).toLocaleString("en-IN")}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="checkout-summary-divider" />

              <div className="checkout-summary-row">
                <span>Subtotal</span>

                <strong>
                  ₹{cartTotal.toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="checkout-summary-row">
                <div>
                  <span>Delivery</span>

                  <small className="summary-vehicle-name">
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

              <div className="checkout-summary-total">
                <span>Total</span>

                <strong>
                  ₹{grandTotal.toLocaleString("en-IN")}
                </strong>
              </div>

              <button
                type="submit"
                className="place-order-button"
              >
                Place Order • ₹
                {grandTotal.toLocaleString("en-IN")}
              </button>

              <p className="checkout-secure-text">
                🔒 Your order information is securely
                processed.
              </p>
            </aside>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}