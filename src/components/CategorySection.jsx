import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import categories from "../data/categories";
import "./ComponentsCss/CategorySection.css";

function CategorySection() {
  return (
    <section className="category-section">
      <div className="category-container">
        <div className="category-heading">
          <div>
            <span className="category-eyebrow">
              FIND YOUR PERFECT FLOWERS
            </span>
            <h2>Shop by Category</h2>
          </div>

          <Link to="/categories" className="category-view-all">
            View All <FiArrowRight />
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to={`/categories/${category.slug}`}
              className="category-card"
              key={category.id}
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
      </div>
    </section>
  );
}

export default CategorySection;