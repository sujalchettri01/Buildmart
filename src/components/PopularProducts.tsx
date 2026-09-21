import { products } from "../data/products";
import ProductCard from "./ProductCard";

export default function PopularProducts() {
  return (
    <section className="section products-section">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-label">TOP PICKS</span>
            <h2>Popular Products</h2>
          </div>

          <button className="view-all">
            View all products →
          </button>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}