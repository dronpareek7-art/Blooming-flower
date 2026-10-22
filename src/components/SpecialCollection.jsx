import { Link } from "react-router-dom";
import { FiArrowRight, FiGift, FiHeart } from "react-icons/fi";

import "./ComponentsCss/SpecialCollection.css";
import flowerBg from "../assets/images/flower-bg.png";

const occasions = [
  {
    id: 1,
    title: "Weddings",
    description: "Perfect for your big day",
    icon: FiGift,
    link: "/categories/weddings",
  },
  {
    id: 2,
    title: "Birthdays",
    description: "Make them smile",
    icon: FiGift,
    link: "/categories/birthdays",
  },
  {
    id: 3,
    title: "Anniversaries",
    description: "Celebrate love",
    icon: FiHeart,
    link: "/categories/anniversaries",
  },
  {
    id: 4,
    title: "Corporate",
    description: "Impress with flowers",
    icon: FiGift,
    link: "/categories/corporate",
  },
];

function SpecialCollection() {
  return (
    <section className="special-collection">
      <div
        className="special-banner"
        style={{ backgroundImage: `url(${flowerBg})` }}
      >
        <div className="special-banner-content">
          <span className="special-eyebrow">SPECIAL COLLECTION</span>

          <h2>
            Make Every Moment
            <br />
            Special
          </h2>

          <p>
            Discover our exclusive collection of premium flowers for all your
            special occasions.
          </p>

          <Link to="/shop" className="special-shop-btn">
            Shop Collection
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="occasion-grid">
        {occasions.map((occasion) => {
          const OccasionIcon = occasion.icon;

          return (
            <Link
              to={occasion.link}
              className="occasion-item"
              key={occasion.id}
            >
              <span className="occasion-icon">
                <OccasionIcon aria-hidden="true" />
              </span>

              <span className="occasion-text">
                <strong>{occasion.title}</strong>
                <small>{occasion.description}</small>
              </span>

              <FiArrowRight className="occasion-arrow" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default SpecialCollection;
