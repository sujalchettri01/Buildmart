import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navItems = [
    {
      label: "Cement",
      category: "Cement",
    },
    {
      label: "Steel & TMT",
      category: "Steel",
    },
    {
      label: "Plumbing",
      category: "Plumbing",
    },
    {
      label: "Electrical",
      category: "Electrical",
    },
    {
      label: "Paint",
      category: "Paint",
    },
   { label: "Bricks", category: "Bricks" },
    {
      label: "Plywood",
      category: "Plywood",
    },
    {
      label: "Sanitaryware",
      category: "Sanitaryware",
    },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-content">

        {/* ALL CATEGORIES */}

        <Link
          to="/products"
          className="category-menu"
        >
          <Menu size={18} />
          All Categories
        </Link>

        {/* CATEGORY LINKS */}

        {navItems.map((item) => (
          <Link
            key={item.label}
            to={`/products?category=${encodeURIComponent(
              item.category
            )}`}
          >
            {item.label}
          </Link>
        ))}

      </div>
    </nav>
  );
}