import { Link } from "react-router-dom";

import { categories } from "../data/categories";
import CategoryCard from "./CategoryCard";

export default function Categories() {
  return (
    <section className="section">
      <div className="container">

        {/* =========================
            SECTION HEADER
        ========================= */}

        <div className="section-header">

          <div>
            <span className="section-label">
              BUILD YOUR PROJECT
            </span>

            <h2>
              Shop by Category
            </h2>
          </div>

          {/* VIEW ALL PRODUCTS */}

          <Link
            to="/products"
            className="view-all"
          >
            View all categories →
          </Link>

        </div>

        {/* =========================
            CATEGORY GRID
        ========================= */}

        <div className="category-grid">

          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}

        </div>

      </div>
    </section>
  );
}