
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiSearch,
  FiStar,
} from "react-icons/fi";

import products from "../data/products";
import "./ComponentsCss/CategorySection.css";

import bouquetImage from "../assets/images/category-bouquets.png";
import rosesImage from "../assets/images/category-roses.png";
import orchidsImage from "../assets/images/category-orchids.png";
import plantsImage from "../assets/images/category-plants.png";
import hampersImage from "../assets/images/category-gift-hampers.png";
import occasionImage from "../assets/images/category-occasion.png";

const categories = [
  { id: 1, name: "Bouquets", image: bouquetImage },
  { id: 2, name: "Roses", image: rosesImage },
  { id: 3, name: "Orchids", image: orchidsImage },
  { id: 4, name: "Plants", image: plantsImage },
  { id: 5, name: "Gift Hampers", image: hampersImage },
  { id: 6, name: "Occasion", image: occasionImage },
];

function CategorySection({ variant = "home" }) {
  const isPage = variant === "page";
  const [selectedCategory, setSelectedCategory] = useState("Bouquets");
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        product.category.toLowerCase() ===
        selectedCategory.toLowerCase();

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  return (
   <main className={isPage ? "category-page" : "category-section"}>
      <div className="category-container">
        {isPage && (
          <div className="category-page-hero">
            <span className="category-eyebrow">
              FIND YOUR PERFECT FLOWERS
            </span>
            <h1>
              Every flower has
              <br />
              <em>a story to tell.</em>
            </h1>
            <p>
              Explore our collections and find something beautiful
              for every moment.
            </p>
          </div>
        )}

        <div className="category-heading">
          <div>
            <span className="category-eyebrow">
              {isPage ? "EXPLORE OUR COLLECTIONS" : "FIND YOUR PERFECT FLOWERS"}
            </span>
            <h2>
              {isPage ? "Shop by Category" : "Shop by Category"}
            </h2>
          </div>

          {!isPage && (
            <Link to="/categories" className="category-view-all">
              View All <FiArrowRight />
            </Link>
          )}
        </div>

        {isPage ? (
          <>
            {/* Circular category selector */}
            <div className="category-circle-grid">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  className={
                    selectedCategory === category.name
                      ? "category-circle is-selected"
                      : "category-circle"
                  }
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setSearch("");
                  }}
                  aria-pressed={selectedCategory === category.name}
                >
                  <span className="category-circle-image">
                    <img src={category.image} alt="" />
                  </span>
                  <span className="category-circle-name">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected category and related products */}
            <section className="category-products-section">
              <div className="category-products-heading">
                <div>
                  <span className="category-eyebrow">
                    CURATED JUST FOR YOU
                  </span>
                  <h2>{selectedCategory}</h2>
                  <p>
                    Discover our collection of {selectedCategory.toLowerCase()}.
                  </p>
                </div>

                <label className="category-product-search">
                  <FiSearch />
                  <input
                    type="search"
                    placeholder="Search products..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    aria-label="Search products in selected category"
                  />
                </label>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="category-product-grid">
                  {filteredProducts.map((product) => (
                    <article
                      className="category-product-card"
                      key={product.id}
                    >
                      <div className="category-product-image">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src =
                              categories.find(
                                (item) => item.name === selectedCategory,
                              )?.image || bouquetImage;
                          }}
                        />

                        {product.badge && (
                          <span className="category-product-badge">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <div className="category-product-info">
                        <span>{product.category}</span>
                        <h3>{product.name}</h3>

                        <div className="category-product-rating">
                          <FiStar />
                          {product.rating}
                        </div>

                        <div className="category-product-price">
                          <strong>
                            ₹{product.price.toLocaleString("en-IN")}
                          </strong>

                          {product.oldPrice > product.price && (
                            <del>
                              ₹{product.oldPrice.toLocaleString("en-IN")}
                            </del>
                          )}
                        </div>

                        <Link
                          to={`/product/${product.id}`}
                          className="category-product-link"
                        >
                          View Product <FiArrowRight />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="category-products-empty">
                  <h3>
                    {search
                      ? "No matching products found"
                      : "Coming soon"}
                  </h3>
                  <p>
                    {search
                      ? "Try another product name."
                      : `We're adding products to ${selectedCategory}. Explore another category in the meantime.`}
                  </p>
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </section>
          </>
        ) : (
          /* Homepage: six existing category cards */
          <div className="category-grid">
            {categories.map((category) => (
              <Link
                to="/categories"
                className="category-card"
                key={category.id}
                onClick={() => {
                  // Homepage cards open the Categories page.
                  // The default selected category there is Bouquets.
                }}
              >
                <div className="category-image-wrapper">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                    loading="lazy"
                  />
                  <span className="category-card-arrow">
                    <FiArrowRight />
                  </span>
                </div>

                <div className="category-card-content">
                  <h3>{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default CategorySection;
