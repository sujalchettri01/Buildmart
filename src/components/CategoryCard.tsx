import { Link } from "react-router-dom";
import type { Category } from "../types";

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  // Products.tsx uses "Steel" as the category value,
  // while the homepage displays "Steel & TMT".
  const productCategory =
    category.slug === "steel"
      ? "Steel"
      : category.name;

  return (
    <Link
      to={`/products?category=${encodeURIComponent(
        productCategory
      )}`}
      className="category-card"
    >
      <div className="category-image">
        <img
          src={category.image}
          alt={category.name}
        />
      </div>

      <h3>{category.name}</h3>

      <span>Shop now →</span>
    </Link>
  );
}