import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Check,
  Package,
  Truck,
  MapPin,
  ClipboardCheck,
} from "lucide-react";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type TrackingStatus =
  | "placed"
  | "confirmed"
  | "processing"
  | "dispatched"
  | "delivered";

interface SavedOrder {
  orderId: string;
  customerName: string;
  mobile: string;
  email: string;

  address: {
    address: string;
    landmark: string;
    city: string;
    pinCode: string;
    state: string;
  };

  items: {
    productId: number;
    name: string;
    brand: string;
    price: number;
    quantity: number;
    unit: string;
  }[];

  subtotal: number;
  total: number;

  paymentMethod: string;
  paymentStatus: string;

  orderStatus: TrackingStatus;

  createdAt: string;
  estimatedDelivery: string;
}

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [mobile, setMobile] = useState("");

  const [error, setError] = useState("");

  const [trackingResult, setTrackingResult] =
    useState<SavedOrder | null>(null);

  // =========================
  // TRACKING STEPS
  // =========================

  const steps = [
    {
      id: "placed",
      label: "Order Placed",
      description: "We received your order.",
      icon: ClipboardCheck,
    },

    {
      id: "confirmed",
      label: "Order Confirmed",
      description:
        "Your construction materials have been confirmed.",
      icon: Check,
    },

    {
      id: "processing",
      label: "Processing",
      description:
        "Your order is being prepared for dispatch.",
      icon: Package,
    },

    {
      id: "dispatched",
      label: "Dispatched",
      description:
        "Your materials are on the way.",
      icon: Truck,
    },

    {
      id: "delivered",
      label: "Delivered",
      description:
        "Your materials have been delivered.",
      icon: MapPin,
    },
  ];

  const statusOrder: TrackingStatus[] = [
    "placed",
    "confirmed",
    "processing",
    "dispatched",
    "delivered",
  ];

  // =========================
  // TRACK ORDER
  // =========================

  const handleTrackOrder = () => {
    setError("");
    setTrackingResult(null);

    const cleanOrderId =
      orderId.trim().toUpperCase();

    // ORDER ID

    if (!cleanOrderId) {
      setError(
        "Please enter your Order ID."
      );
      return;
    }

    // MOBILE

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError(
        "Please enter a valid 10-digit Indian mobile number."
      );
      return;
    }

    // =========================
    // GET SAVED ORDERS
    // =========================

    try {
      const storedOrders =
        localStorage.getItem(
          "buildmart-orders"
        );

      if (!storedOrders) {
        setError(
          "No orders have been found on this device."
        );
        return;
      }

      const orders: SavedOrder[] =
        JSON.parse(storedOrders);

      // =========================
      // FIND MATCHING ORDER
      // =========================

      const foundOrder =
        orders.find(
          (order) =>
            order.orderId.toUpperCase() ===
              cleanOrderId &&
            order.mobile === mobile
        );

      if (!foundOrder) {
        setError(
          "We couldn't find an order matching this Order ID and mobile number."
        );
        return;
      }

      setTrackingResult(
        foundOrder
      );
    } catch (storageError) {
      console.error(
        "Unable to load orders:",
        storageError
      );

      setError(
        "We couldn't load your order information. Please try again."
      );
    }
  };

  const currentStatusIndex =
    trackingResult
      ? statusOrder.indexOf(
          trackingResult.orderStatus
        )
      : -1;

  // =========================
  // FORMAT DATE
  // =========================

  const formatOrderDate = (
    date: string
  ) => {
    return new Date(
      date
    ).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <>
      <Header />

      <Navbar />

      <main className="tracking-page">
        <div className="container">

          {/* BREADCRUMB */}

          <div className="tracking-breadcrumb">

            <Link to="/">
              Home
            </Link>

            <span>
              ›
            </span>

            <span>
              Track Order
            </span>

          </div>

          {/* HEADING */}

          <div className="tracking-heading">

            <span className="section-label">
              ORDER TRACKING
            </span>

            <h1>
              Track Your Order
            </h1>

            <p>
              Enter the Order ID and mobile number
              used when placing your order.
            </p>

          </div>

          {/* SEARCH */}

          <section className="tracking-search-card">

            <div className="tracking-search-heading">

              <Package size={24} />

              <div>

                <h2>
                  Order Details
                </h2>

                <p>
                  Enter your BuildMart Order ID and
                  registered mobile number.
                </p>

              </div>

            </div>

            <div className="tracking-form">

              {/* ORDER ID */}

              <div className="form-group">

                <label>
                  Order ID *
                </label>

                <input
                  type="text"
                  placeholder="Example: BM-20260920-1234"
                  value={orderId}
                  onChange={(event) => {
                    setOrderId(
                      event.target.value
                    );

                    setError("");
                    setTrackingResult(null);
                  }}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter"
                    ) {
                      handleTrackOrder();
                    }
                  }}
                />

              </div>

              {/* MOBILE */}

              <div className="form-group">

                <label>
                  Mobile Number *
                </label>

                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  value={mobile}
                  onChange={(event) => {
                    setMobile(
                      event.target.value.replace(
                        /\D/g,
                        ""
                      )
                    );

                    setError("");
                    setTrackingResult(null);
                  }}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter"
                    ) {
                      handleTrackOrder();
                    }
                  }}
                />

              </div>

              <button
                type="button"
                className="track-order-button"
                onClick={handleTrackOrder}
              >
                Track Order
              </button>

            </div>

            {/* ERROR */}

            {error && (
              <div className="tracking-error">
                {error}
              </div>
            )}

          </section>

          {/* =========================
              ACTUAL ORDER RESULT
          ========================= */}

          {trackingResult && (
            <section className="tracking-result">

              {/* HEADER */}

              <div className="tracking-result-header">

                <div>

                  <span>
                    ORDER ID
                  </span>

                  <h2>
                    {trackingResult.orderId}
                  </h2>

                  <p className="tracking-order-date">
                    Ordered{" "}
                    {formatOrderDate(
                      trackingResult.createdAt
                    )}
                  </p>

                </div>

                <div className="tracking-estimate">

                  <span>
                    ESTIMATED DELIVERY
                  </span>

                  <strong>
                    {
                      trackingResult.estimatedDelivery
                    }
                  </strong>

                </div>

              </div>

              {/* =========================
                  TIMELINE
              ========================= */}

              <div className="tracking-timeline">

                {steps.map(
                  (step, index) => {
                    const Icon =
                      step.icon;

                    const completed =
                      index <=
                      currentStatusIndex;

                    const current =
                      index ===
                      currentStatusIndex;

                    return (
                      <div
                        className={`tracking-step ${
                          completed
                            ? "completed"
                            : ""
                        } ${
                          current
                            ? "current"
                            : ""
                        }`}
                        key={step.id}
                      >

                        <div className="tracking-step-left">

                          <div className="tracking-step-icon">
                            <Icon
                              size={18}
                            />
                          </div>

                          {index <
                            steps.length -
                              1 && (
                            <div className="tracking-line" />
                          )}

                        </div>

                        <div className="tracking-step-content">

                          <h3>
                            {
                              step.label
                            }
                          </h3>

                          <p>
                            {
                              step.description
                            }
                          </p>

                          {current && (
                            <span className="current-status-badge">
                              Current Status
                            </span>
                          )}

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

              {/* =========================
                  ORDER DETAILS
              ========================= */}

              <div className="tracking-order-details">

                {/* PRODUCTS */}

                <div className="tracking-detail-card">

                  <h2>
                    Items Ordered
                  </h2>

                  <div className="tracking-items">

                    {trackingResult.items.map(
                      (item) => (

                        <div
                          className="tracking-item"
                          key={
                            item.productId
                          }
                        >

                          <div>

                            <strong>
                              {
                                item.name
                              }
                            </strong>

                            <span>
                              {
                                item.brand
                              }
                              {" • "}
                              {
                                item.quantity
                              }{" "}
                              × ₹
                              {item.price.toLocaleString(
                                "en-IN"
                              )}
                            </span>

                          </div>

                          <strong>
                            ₹
                            {(
                              item.price *
                              item.quantity
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </strong>

                        </div>

                      )
                    )}

                  </div>

                  <div className="tracking-order-total">

                    <span>
                      Order Total
                    </span>

                    <strong>
                      ₹
                      {trackingResult.total.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>

                </div>

                {/* DELIVERY DETAILS */}

                <div className="tracking-detail-card">

                  <h2>
                    Delivery Details
                  </h2>

                  <div className="tracking-customer-info">

                    <div>
                      <span>
                        Customer
                      </span>

                      <strong>
                        {
                          trackingResult.customerName
                        }
                      </strong>
                    </div>

                    <div>
                      <span>
                        Mobile
                      </span>

                      <strong>
                        {
                          trackingResult.mobile
                        }
                      </strong>
                    </div>

                    <div>
                      <span>
                        Delivery Address
                      </span>

                      <strong>
                        {
                          trackingResult.address.address
                        }

                        {trackingResult.address.landmark &&
                          `, ${trackingResult.address.landmark}`}

                        {`, ${trackingResult.address.city}`}

                        {`, ${trackingResult.address.state}`}

                        {` - ${trackingResult.address.pinCode}`}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Payment
                      </span>

                      <strong>
                        {trackingResult.paymentMethod ===
                        "cod"
                          ? "Cash on Delivery"
                          : "Online Payment"}
                      </strong>
                    </div>

                  </div>

                </div>

              </div>

              {/* HELP */}

              <div className="tracking-help">

                <strong>
                  Need help with this order?
                </strong>

                <p>
                  Contact customer support and keep
                  your Order ID ready.
                </p>

              </div>

            </section>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}