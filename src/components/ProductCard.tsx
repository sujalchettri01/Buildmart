import { useNavigate } from "react-router-dom";

import type { Product } from "../types";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  // Used to open the product details page
  const navigate = useNavigate();

  // Gets the Add to Cart function from CartContext
  const { addToCart } = useCart();

  // Calculate discount percentage
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) /
          product.originalPrice) *
          100
      )
    : 0;

  // Open product details
  const handleOpenProduct = () => {
    navigate(`/product/${product.id}`);
  };

  // Add product to cart
  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Stops the product card from opening
    event.stopPropagation();

    // Add 1 quantity to cart
    addToCart(product, 1);
  };

  return (
    <div
      className="product-card"
      onClick={handleOpenProduct}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          handleOpenProduct();
        }
      }}
    >
      {/* PRODUCT IMAGE */}

      <div className="product-image">

        {discount > 0 && (
          <span className="discount-badge">
            {discount}% OFF
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
        />

      </div>

      {/* PRODUCT INFORMATION */}

      <div className="product-info">

        {/* BRAND */}

        <span className="product-brand">
          {product.brand}
        </span>

        {/* PRODUCT NAME */}

        <h3 className="product-name">
          {product.name}
        </h3>

        {/* RATING */}

        {product.rating && (
          <div className="product-rating">
            ⭐ {product.rating}

            {product.reviews && (
              <span>
                {" "}
                ({product.reviews})
              </span>
            )}
          </div>
        )}

        {/* PRICE + ADD BUTTON */}

        <div className="product-bottom">

          <div className="product-price">

            <div>
              <strong>
                ₹
                {product.price.toLocaleString(
                  "en-IN"
                )}
              </strong>

              <span>
                {" "}
                / {product.unit}
              </span>
            </div>

            {product.originalPrice && (
              <span className="original-price">
                ₹
                {product.originalPrice.toLocaleString(
                  "en-IN"
                )}
              </span>
            )}

          </div>

          {/* ADD TO CART */}

          <button
            type="button"
            className="add-cart"
            onClick={handleAddToCart}
          >
            🛒 Add
          </button>

        </div>

      </div>
    </div>
  );
}