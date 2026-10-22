
import { Link } from "react-router-dom";
import {
  FiArrowRight,

} from "react-icons/fi";

import "./ComponentsCss/CategorySection.css";


import bouquetImage from "../assets/images/category-bouquets.png";
import rosesImage from "../assets/images/category-roses.png";
import orchidsImage from "../assets/images/category-orchids.png";
import plantsImage from "../assets/images/category-plants.png";
import hampersImage from "../assets/images/category-gift-hampers.png";
import occasionImage from "../assets/images/category-occasion.png";


const categories = [
  {
    id: 1,
    name: "Bouquets",
    image: bouquetImage,
    link: "/categories/bouquets",
  },
  {
    id: 2,
    name: "Roses",
    image: rosesImage,
    link: "/categories/roses",
  },
  {
    id: 3,
    name: "Orchids",
    image: orchidsImage,
    link: "/categories/orchids",
  },
  {
    id: 4,
    name: "Plants",
    image: plantsImage,
    link: "/categories/plants",
  },
  {
    id: 5,
    name: "Gift Hampers",
    image: hampersImage,
    link: "/categories/gift-hampers",
  },
  {
    id: 6,
    name: "Occasion",
    image: occasionImage,
    link: "/categories/occasion",
  },
];

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
              to={category.link}
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
