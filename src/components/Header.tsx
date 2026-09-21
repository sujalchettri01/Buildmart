import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  MapPin,
  Search,
  User,
  ShoppingCart,
  HelpCircle,
  Package,
} from "lucide-react";

import { useCart } from "../context/CartContext";

export default function Header() {
  const { cartCount } = useCart();

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // =========================
  // SEARCH
  // =========================

  const handleSearch = () => {
    const searchValue = search.trim();

    if (!searchValue) {
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(searchValue)}`
    );
  };

  return (
    <header>

      {/* =========================
          TOP BAR
      ========================= */}

      <div className="top-bar">
        <div className="container top-bar-content">

          {/* DELIVERY LOCATION */}

          <div className="delivery-location">
            <MapPin size={14} />

            <span>
              Delivering to <strong>Siliguri</strong>
            </span>
          </div>

          {/* TOP LINKS */}

          <div className="top-links">

            {/* HELP */}

            <span>
              <HelpCircle size={13} />
              Help
            </span>

            {/* TRACK ORDER */}

            <Link
              to="/track-order"
              className="top-track-order"
            >
              <Package size={13} />
              Track Order
            </Link>

          </div>
        </div>
      </div>

      {/* =========================
          MAIN HEADER
      ========================= */}

      <div className="main-header">
        <div className="container header-content">

          {/* LOGO */}

          <Link
            to="/"
            className="logo"
          >
            Build
            <span>
              Mart
            </span>
          </Link>

          {/* =========================
              SEARCH BAR
          ========================= */}

          <div className="search">

            <Search size={19} />

            <input
              type="text"
              placeholder="Search cement, steel, bricks, paint..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>

          </div>

          {/* =========================
              RIGHT SIDE
          ========================= */}

          <div className="header-actions">

            {/* ACCOUNT */}

            <button
              type="button"
              className="header-action"
            >
              <User />

              <span>
                Account
              </span>
            </button>

            {/* CART */}

            <Link
              to="/cart"
              className="header-action"
            >
              <ShoppingCart />

              {/* CART COUNT */}

              {cartCount > 0 && (
                <span className="cart-count">
                  {cartCount > 99
                    ? "99+"
                    : cartCount}
                </span>
              )}

              <span>
                Cart
              </span>
            </Link>

          </div>
        </div>
      </div>

    </header>
  );
}