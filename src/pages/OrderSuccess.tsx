import { Link, useLocation } from "react-router-dom";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface OrderData {
  orderId: string;
  total: number;
  paymentMethod: string;
  customerName: string;
}

export default function OrderSuccess() {
  const location = useLocation();

  const order = location.state as OrderData | null;

  if (!order) {
    return (
      <>
        <Header />
        <Navbar />

        <main
          style={{
            padding: "80px 20px",
            textAlign: "center",
          }}
        >
          <h1>Order information unavailable</h1>

          <Link to="/products">
            Continue Shopping
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Navbar />

      <main className="order-success-page">
        <div className="container">

          <div className="order-success-card">

            <div className="success-icon">
              ✓
            </div>

            <span className="section-label">
              ORDER CONFIRMED
            </span>

            <h1>Thank you, {order.customerName}!</h1>

            <p>
              Your order has been successfully placed.
            </p>

            <div className="success-order-info">

              <div>
                <span>Order ID</span>
                <strong>{order.orderId}</strong>
              </div>

              <div>
                <span>Payment</span>

                <strong>
                  {order.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </strong>
              </div>

              <div>
                <span>Order Total</span>

                <strong>
                  ₹{order.total.toLocaleString("en-IN")}
                </strong>
              </div>

            </div>

            <div className="success-actions">

              <Link
                to="/products"
                className="success-primary-button"
              >
                Continue Shopping
              </Link>

              <Link
                to="/"
                className="success-secondary-button"
              >
                Back to Home
              </Link>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}