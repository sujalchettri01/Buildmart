import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSearchParams } from "react-router-dom";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import { products } from "../data/products";

export default function Products() {
  const [searchParams] = useSearchParams();

  // =========================
  // URL PARAMETERS
  // =========================

  const searchQuery =
    searchParams
      .get("search")
      ?.toLowerCase()
      .trim() || "";

  const categoryQuery =
    searchParams
      .get("category")
      ?.trim() || "";

  // =========================
  // FILTER STATES
  // =========================

  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState<string[]>(
    categoryQuery ? [categoryQuery] : []
  );

  const [
    selectedBrands,
    setSelectedBrands,
  ] = useState<string[]>([]);

  const [
    inStockOnly,
    setInStockOnly,
  ] = useState(false);

  const [
    sortBy,
    setSortBy,
  ] = useState("default");

  // =========================
  // UPDATE CATEGORY WHEN
  // NAVBAR URL CHANGES
  // =========================

  useEffect(() => {
    if (categoryQuery) {
      setSelectedCategories([
        categoryQuery,
      ]);
    } else {
      setSelectedCategories([]);
    }
  }, [categoryQuery]);

  // =========================
  // AVAILABLE CATEGORIES
  // =========================

  const categories = Array.from(
    new Set(
      products.map(
        (product) => product.category
      )
    )
  );

  // =========================
  // AVAILABLE BRANDS
  // =========================

  const brands = Array.from(
    new Set(
      products.map(
        (product) => product.brand
      )
    )
  );

  // =========================
  // CATEGORY FILTER
  // =========================

  const toggleCategory = (
    category: string
  ) => {
    setSelectedCategories(
      (currentCategories) => {
        if (
          currentCategories.includes(
            category
          )
        ) {
          return currentCategories.filter(
            (item) =>
              item !== category
          );
        }

        return [
          ...currentCategories,
          category,
        ];
      }
    );
  };

  // =========================
  // BRAND FILTER
  // =========================

  const toggleBrand = (
    brand: string
  ) => {
    setSelectedBrands(
      (currentBrands) => {
        if (
          currentBrands.includes(
            brand
          )
        ) {
          return currentBrands.filter(
            (item) =>
              item !== brand
          );
        }

        return [
          ...currentBrands,
          brand,
        ];
      }
    );
  };

  // =========================
  // FILTER + SORT PRODUCTS
  // =========================

  const filteredProducts =
    useMemo(() => {
      let result = [...products];

      // =====================
      // SEARCH FILTER
      // =====================

      if (searchQuery) {
        result = result.filter(
          (product) => {
            const searchableText = `
              ${product.name}
              ${product.brand}
              ${product.category}
            `.toLowerCase();

            return searchableText.includes(
              searchQuery
            );
          }
        );
      }

      // =====================
      // CATEGORY FILTER
      // =====================

      if (
        selectedCategories.length >
        0
      ) {
        result = result.filter(
          (product) =>
            selectedCategories.includes(
              product.category
            )
        );
      }

      // =====================
      // BRAND FILTER
      // =====================

      if (
        selectedBrands.length >
        0
      ) {
        result = result.filter(
          (product) =>
            selectedBrands.includes(
              product.brand
            )
        );
      }

      // =====================
      // STOCK FILTER
      // =====================

      if (inStockOnly) {
        result = result.filter(
          (product) =>
            product.inStock
        );
      }

      // =====================
      // SORTING
      // =====================

      if (
        sortBy === "price-low"
      ) {
        result.sort(
          (a, b) =>
            a.price - b.price
        );
      }

      if (
        sortBy === "price-high"
      ) {
        result.sort(
          (a, b) =>
            b.price - a.price
        );
      }

      if (
        sortBy === "rating"
      ) {
        result.sort(
          (a, b) =>
            (b.rating || 0) -
            (a.rating || 0)
        );
      }

      return result;
    }, [
      searchQuery,
      selectedCategories,
      selectedBrands,
      inStockOnly,
      sortBy,
    ]);

  // =========================
  // CLEAR FILTERS
  // =========================

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setInStockOnly(false);
    setSortBy("default");
  };

  // =========================
  // PAGE TITLE
  // =========================

  const getPageTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }

    if (
      selectedCategories.length ===
      1
    ) {
      const category =
        selectedCategories[0];

      if (category === "Steel") {
        return "Steel & TMT";
      }

      return category;
    }

    return "All Products";
  };

  return (
    <>
      <Header />

      <Navbar />

      <main className="products-page">
        <div className="container">

          {/* =========================
              PAGE HEADING
          ========================= */}

          <div className="products-page-heading">

            <div>

              <span className="section-label">
                BUILDING MATERIALS
              </span>

              <h1>
                {getPageTitle()}
              </h1>

              <p>
                {
                  filteredProducts.length
                }{" "}
                {filteredProducts.length ===
                1
                  ? "product"
                  : "products"}{" "}
                found
              </p>

            </div>


            {/* =========================
                SORT
            ========================= */}

            <div className="products-sort">

              <label>
                Sort by
              </label>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value
                  )
                }
              >

                <option value="default">
                  Recommended
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Customer Rating
                </option>

              </select>

            </div>

          </div>


          {/* =========================
              PRODUCTS LAYOUT
          ========================= */}

          <div className="products-layout">


            {/* =========================
                FILTER SIDEBAR
            ========================= */}

            <aside className="filters-sidebar">

              <div className="filter-heading">

                <h2>
                  Filters
                </h2>

                <button
                  type="button"
                  onClick={clearFilters}
                >
                  Clear All
                </button>

              </div>


              {/* =========================
                  CATEGORY FILTER
              ========================= */}

              <div className="filter-section">

                <h3>
                  Category
                </h3>

                <div className="filter-options">

                  {categories.map(
                    (category) => (

                      <label
                        key={category}
                      >

                        <input
                          type="checkbox"
                          checked={
                            selectedCategories.includes(
                              category
                            )
                          }
                          onChange={() =>
                            toggleCategory(
                              category
                            )
                          }
                        />

                        <span>
                          {category ===
                          "Steel"
                            ? "Steel & TMT"
                            : category}
                        </span>

                      </label>

                    )
                  )}

                </div>

              </div>


              {/* =========================
                  BRAND FILTER
              ========================= */}

              <div className="filter-section">

                <h3>
                  Brand
                </h3>

                <div className="filter-options">

                  {brands.map(
                    (brand) => (

                      <label
                        key={brand}
                      >

                        <input
                          type="checkbox"
                          checked={
                            selectedBrands.includes(
                              brand
                            )
                          }
                          onChange={() =>
                            toggleBrand(
                              brand
                            )
                          }
                        />

                        <span>
                          {brand}
                        </span>

                      </label>

                    )
                  )}

                </div>

              </div>


              {/* =========================
                  AVAILABILITY
              ========================= */}

              <div className="filter-section">

                <h3>
                  Availability
                </h3>

                <div className="filter-options">

                  <label>

                    <input
                      type="checkbox"
                      checked={
                        inStockOnly
                      }
                      onChange={(
                        event
                      ) =>
                        setInStockOnly(
                          event.target
                            .checked
                        )
                      }
                    />

                    <span>
                      In Stock Only
                    </span>

                  </label>

                </div>

              </div>

            </aside>


            {/* =========================
                PRODUCT RESULTS
            ========================= */}

            <section className="products-results">

              {filteredProducts.length >
              0 ? (

                <div className="products-grid">

                  {filteredProducts.map(
                    (product) => (

                      <ProductCard
                        key={
                          product.id
                        }
                        product={
                          product
                        }
                      />

                    )
                  )}

                </div>

              ) : (

                /* =========================
                   NO PRODUCTS
                ========================= */

                <div className="no-products">

                  <div className="no-products-icon">
                    🔍
                  </div>

                  <h2>
                    No products found
                  </h2>

                  <p>
                    Try changing your
                    search or removing
                    some filters.
                  </p>

                  <button
                    type="button"
                    onClick={
                      clearFilters
                    }
                  >
                    Clear Filters
                  </button>

                </div>

              )}

            </section>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}