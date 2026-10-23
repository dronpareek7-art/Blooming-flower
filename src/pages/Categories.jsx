import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowDownRight,
  FiArrowRight,
  FiChevronRight,
  FiSearch,
  FiSliders,
  FiX,
} from "react-icons/fi";

import categories from "../data/categories";
import "../components/ComponentsCss/CategoriesPage.css";

function Categories() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Categories");

  const filterOptions = [
    "All Categories",
    "Flowers",
    "Plants & Gifts",
  ];

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return categories.filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query) ||
        category.eyebrow.toLowerCase().includes(query);

      let matchesFilter = true;

      if (activeFilter === "Flowers") {
        matchesFilter = ["bouquets", "roses", "orchids"].includes(
          category.slug,
        );
      }

      if (activeFilter === "Plants & Gifts") {
        matchesFilter = ["plants", "gift-hampers", "occasion"].includes(
          category.slug,
        );
      }

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const clearFilters = () => {
    setSearch("");
    setActiveFilter("All Categories");
  };

  return (
    <main className="categories-page">
      {/* Hero banner */}
      <section className="categories-hero">
        <img
          className="categories-hero__image"
          src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1800&q=85"
          alt="A colorful arrangement of fresh flowers"
        />

        <div className="categories-hero__overlay" />

        <div className="categories-hero__content">
          <div className="categories-breadcrumb">
            <Link to="/">Home</Link>
            <FiChevronRight />
            <span>Categories</span>
          </div>

          <span className="categories-eyebrow">
            FIND SOMETHING BEAUTIFUL
          </span>

          <h1>
            Flowers for
            <br />
            <em>every feeling.</em>
          </h1>

          <p>
            Explore our collections and find the perfect blooms,
            thoughtful gifts, and little touches of nature.
          </p>

          <a href="#all-categories" className="categories-hero__button">
            Explore categories <FiArrowDownRight />
          </a>
        </div>

        <span className="categories-hero__side-note">
          A LITTLE BEAUTY IN EVERY DETAIL
        </span>
      </section>

      {/* Intro */}
      <section className="categories-intro">
        <div>
          <span className="categories-section-label">
            OUR COLLECTIONS
          </span>

          <h2>
            A collection for
            <br />
            <em>every occasion.</em>
          </h2>
        </div>

        <p>
          From timeless roses to elegant orchids, indoor greenery, and
          thoughtful gifts, discover a collection that makes choosing
          something special feel effortless.
        </p>
      </section>

      {/* Category filters */}
      <section className="categories-catalog" id="all-categories">
        <div className="categories-toolbar">
          <div className="categories-toolbar__title">
            <FiSliders />
            <span>Explore collections</span>
          </div>

          <div className="categories-search">
            <FiSearch />

            <input
              type="search"
              placeholder="Search categories..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search categories"
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
          </div>
        </div>

        <div
          className="categories-filter-row"
          aria-label="Filter categories"
        >
          <div className="categories-filter-pills">
            {filterOptions.map((filter) => (
              <button
                type="button"
                key={filter}
                className={
                  activeFilter === filter
                    ? "categories-filter is-active"
                    : "categories-filter"
                }
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>

          <span className="categories-result-count">
            {filteredCategories.length}{" "}
            {filteredCategories.length === 1
              ? "collection"
              : "collections"}
          </span>
        </div>

        {/* Category grid */}
        {filteredCategories.length > 0 ? (
          <div className="categories-page-grid">
            {filteredCategories.map((category, index) => (
              <Link
                to={`/categories/${category.slug}`}
                className="categories-feature-card"
                key={category.id}
                style={{ "--category-index": index }}
              >
                <div className="categories-feature-card__image">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                  />

                  <span className="categories-feature-card__number">
                    {String(category.id).padStart(2, "0")}
                  </span>

                  <span className="categories-feature-card__arrow">
                    <FiArrowRight />
                  </span>
                </div>

                <div className="categories-feature-card__content">
                  <span className="categories-feature-card__eyebrow">
                    {category.eyebrow}
                  </span>

                  <div className="categories-feature-card__heading">
                    <h3>{category.name}</h3>
                    <FiArrowRight />
                  </div>

                  <p>{category.description}</p>

                  <span className="categories-feature-card__count">
                    {category.count}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="categories-no-results">
            <span className="categories-no-results__icon">
              <FiSearch />
            </span>

            <h3>No collections found</h3>

            <p>
              Try a different search term or explore all our categories.
            </p>

            <button
              type="button"
              className="categories-reset-button"
              onClick={clearFilters}
            >
              Clear filters <FiArrowRight />
            </button>
          </div>
        )}
      </section>

      {/* Bottom banner */}
      <section className="categories-bottom">
        <div className="categories-bottom__content">
          <span className="categories-section-label">
            A THOUGHTFUL GIFT STARTS HERE
          </span>

          <h2>
            Let your next
            <br />
            <em>little moment bloom.</em>
          </h2>

          <p>
            Find a bouquet, plant, or gift that says exactly what you
            want to say.
          </p>

          <Link to="/shop" className="categories-bottom__button">
            Shop all flowers <FiArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Categories;