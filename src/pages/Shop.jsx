import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiChevronDown,
  FiHeart,
  FiSearch,
  FiShoppingBag,
  FiSliders,
  FiStar,
  FiX,
  FiShoppingCart,
} from "react-icons/fi";

import products from "../data/products";
import "@/components/ComponentsCss/Shop.css";
import { useCart } from "../context/CartContext";
const categories = [
  "All Flowers",
  "Roses",
  "Bouquets",
  "Orchids",
  "Plants",
  "Occasion",
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Flowers");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(3000);
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [notice, setNotice] = useState("");
  const { addToCart, totalItems } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotice(`${product.name} added to your cart`);
    window.setTimeout(() => setNotice(""), 2500);
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All Flowers" || product.category === category;

      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sortBy, maxPrice]);

  const toggleWishlist = (productId) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  };

  const resetFilters = () => {
    setCategory("All Flowers");
    setSearch("");
    setMaxPrice(3000);
    setSortBy("featured");
  };

  return (
    <main className="shop-page">
      {/* Shop hero */}
      <section className="shop-hero">
        <div className="shop-hero-image" />

        <div className="shop-hero-content">
          <div className="shop-breadcrumb">
            <Link to="/">Home</Link>
            <FiArrowRight />
            <span>Shop</span>
          </div>

          <span className="shop-eyebrow">MADE WITH LOVE, PICKED FOR YOU</span>

          <h1>
            Find Flowers
            <br />
            That <em>Speak</em> Your Heart
          </h1>

          <p>
            Thoughtfully arranged blooms for everyday joy, heartfelt gifts and
            unforgettable moments.
          </p>

          <a href="#shop-products" className="shop-hero-btn">
            Explore Collection <FiArrowRight />
          </a>
        </div>

        <div className="shop-hero-note">
          <FiHeart />
          <span>Beautiful blooms, meaningful moments.</span>
        </div>
      </section>

      {/* Benefits strip */}
      <section className="shop-benefits">
        <div>
          <FiShoppingBag />
          <span>
            <strong>Freshly Arranged</strong>
            <small>Made with care</small>
          </span>
        </div>

        <div>
          <FiHeart />
          <span>
            <strong>Made for Gifting</strong>
            <small>Every moment matters</small>
          </span>
        </div>

        <div>
          <FiStar />
          <span>
            <strong>Premium Quality</strong>
            <small>Blooms worth sharing</small>
          </span>
        </div>
      </section>

      {/* Shop catalog */}
      <section className="shop-catalog" id="shop-products">
        <div className="shop-section-heading">
          <div>
            <span className="shop-eyebrow">THE FLOWER EDIT</span>
            <h2>Shop Our Collection</h2>
            <p>Find your favourite blooms, all in one place.</p>
          </div>

         <Link to="/cart" className="shop-cart-summary">
  <FiShoppingBag />
  {totalItems} {totalItems === 1 ? "item" : "items"} added
</Link>
        </div>

        {/* Search and controls */}
        <div className="shop-toolbar">
          <label className="shop-search">
            <FiSearch />
            <input
              type="search"
              placeholder="Search flowers, bouquets..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search products"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <FiX />
              </button>
            )}
          </label>

          <button
            type="button"
            className={`shop-filter-toggle ${showFilters ? "selected" : ""}`}
            onClick={() => setShowFilters((open) => !open)}
            aria-expanded={showFilters}
          >
            <FiSliders /> Filters
          </button>

          <label className="shop-sort">
            <span>Sort by</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <FiChevronDown />
          </label>
        </div>

        <div className="shop-layout">
          {/* Sidebar filters */}
          <aside
            className={`shop-sidebar ${showFilters ? "filters-open" : ""}`}
          >
            <div className="shop-sidebar-heading">
              <h3>Filters</h3>
              <button type="button" onClick={resetFilters}>
                Clear all
              </button>
              <button
                type="button"
                className="shop-filter-close"
                onClick={() => setShowFilters(false)}
                aria-label="Close filters"
              >
                <FiX />
              </button>
            </div>

            <div className="shop-filter-group">
              <h4>Categories</h4>

              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`shop-category-option ${
                    category === item ? "active" : ""
                  }`}
                  onClick={() => setCategory(item)}
                >
                  <span>{item}</span>
                  <span className="shop-radio-dot" />
                </button>
              ))}
            </div>

            <div className="shop-filter-group shop-price-filter">
              <div className="shop-price-heading">
                <h4>Price Range</h4>
                <span>₹{maxPrice.toLocaleString("en-IN")}</span>
              </div>

              <input
                type="range"
                min="500"
                max="3000"
                step="100"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                aria-label="Maximum product price"
              />

              <div className="shop-price-labels">
                <span>₹500</span>
                <span>₹3,000</span>
              </div>
            </div>

            <div className="shop-sidebar-promo">
              {/* <FiGift /> */}
              <h4>A little joy goes a long way.</h4>
              <p>Find a thoughtful bouquet for someone special.</p>
              <button type="button" onClick={resetFilters}>
                Explore all <FiArrowRight />
              </button>
            </div>
          </aside>

          {/* Product listing */}
          <div className="shop-results">
            <div className="shop-results-heading">
              <p>
                Showing <strong>{filteredProducts.length}</strong> products
              </p>

              {(category !== "All Flowers" || search || maxPrice !== 3000) && (
                <button type="button" onClick={resetFilters}>
                  Reset filters <FiX />
                </button>
              )}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="shop-product-grid">
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  const discount = Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) *
                      100,
                  );

                  return (
                    <article className="shop-product-card" key={product.id}>
                      <div className="shop-product-image-wrap">
                        <Link
                          to={`/product/${product.id}`}
                          className="shop-product-image-link"
                          aria-label={`View ${product.name}`}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=85";
                            }}
                          />
                        </Link>

                        {product.badge && (
                          <span
                            className={`shop-product-badge ${
                              product.badge === "NEW" ? "new" : ""
                            }`}
                          >
                            {product.badge}
                          </span>
                        )}

                        <span className="shop-discount">{discount}% OFF</span>

                        <button
                          type="button"
                          className={`shop-wishlist-btn ${
                            isWishlisted ? "wishlisted" : ""
                          }`}
                          onClick={() => toggleWishlist(product.id)}
                          aria-label={
                            isWishlisted
                              ? `Remove ${product.name} from wishlist`
                              : `Add ${product.name} to wishlist`
                          }
                          aria-pressed={isWishlisted}
                        >
                          <FiHeart />
                        </button>

                        <Link
                          to={`/product/${product.id}`}
                          className="shop-quick-view"
                        >
                          View Details <FiArrowRight />
                        </Link>
                      </div>

                      <div className="shop-product-info">
                        <span className="shop-product-category">
                          {product.category}
                        </span>

                        <Link
                          to={`/product/${product.id}`}
                          className="shop-product-name"
                        >
                          {product.name}
                        </Link>

                        <div className="shop-product-rating">
                          <FiStar />
                          <span>{product.rating}</span>
                          <span className="shop-rating-label">
                            Customer favourite
                          </span>
                        </div>

                        <div className="shop-product-price">
                          <strong>{formatPrice(product.price)}</strong>
                          <del>{formatPrice(product.oldPrice)}</del>
                        </div>

                      <button
  type="button"
  onClick={() => handleAddToCart(product)}
  className="shop-add-to-cart"
>
  <FiShoppingCart />
  Add to Cart
</button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="shop-empty-state">
                <FiSearch />
                <h3>No flowers found</h3>
                <p>Try another search or adjust your selected filters.</p>
                <button type="button" onClick={resetFilters}>
                  View all products
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {notice && (
        <div className="shop-toast" role="status">
          <FiShoppingBag />
          {notice}
        </div>
      )}
    </main>
  );
}

export default Shop;
