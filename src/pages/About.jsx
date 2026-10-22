import {
  FiArrowRight,
  FiHeart,
  FiFeather,
  FiSun,
  FiGift,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import "../components/ComponentsCss/About.css";

const values = [
  {
    icon: <FiHeart />,
    title: "Made with Love",
    description:
      "Every arrangement is inspired by the little moments that make life meaningful.",
  },
  {
    icon: <FiFeather />,
    title: "Thoughtful Details",
    description:
      "From the flower combinations to the finishing touches, we believe details matter.",
  },
  {
    icon: <FiSun />,
    title: "Nature First",
    description:
      "We celebrate the beauty of flowers and encourage thoughtful choices whenever possible.",
  },
  {
    icon: <FiGift />,
    title: "Moments That Matter",
    description:
      "We help you celebrate birthdays, milestones, gratitude, and everyday surprises.",
  },
];

function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <img
          className="about-hero__image"
          src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1800&q=85"
          alt="Fresh flowers arranged in soft natural colors"
        />
        <div className="about-hero__overlay" />

        <div className="about-hero__content">
          <span className="about-eyebrow">OUR STORY · BLOOMING FLOWER</span>
          <h1>
            A little beauty.
            <br />
            <em>A lot of feeling.</em>
          </h1>
          <p>
            We believe flowers have a beautiful way of saying what words
            sometimes cannot.
          </p>
          <a className="about-button" href="#our-story">
            Discover our story <FiArrowRight />
          </a>
        </div>

        <span className="about-hero__vertical">
          FLOWERS FOR EVERY LITTLE MOMENT
        </span>
      </section>

      <section className="about-story" id="our-story">
        <div className="about-story__image">
          <img
            src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1000&q=85"
            alt="Colorful flowers in a natural floral arrangement"
            loading="lazy"
          />
          <div className="about-story__image-note">
            <span>Beauty in</span>
            <em>every bloom.</em>
          </div>
        </div>

        <div className="about-story__content">
          <span className="about-section-label">A STORY THAT BLOOMS</span>
          <h2>
            More than flowers,
            <br />
            <em>it's how we feel.</em>
          </h2>
          <p>
            At Blooming Flower, we see flowers as more than beautiful
            things. They are little reminders of love, celebrations of
            new beginnings, and thoughtful gestures that make an
            ordinary day feel special.
          </p>
          <p>
            Our vision is simple: make it easier to share those feelings
            through thoughtfully selected blooms, lovely arrangements,
            and a shopping experience that feels as warm as the gift
            itself.
          </p>
          <p>
            Whether you're surprising someone special or bringing fresh
            beauty into your own space, we're here to help you find
            flowers that feel just right.
          </p>
          <Link to="/shop" className="about-text-link">
            Explore our collection <FiArrowRight />
          </Link>
        </div>
      </section>

      <section className="about-values">
        <div className="about-centered-heading">
          <span className="about-section-label">WHAT WE BELIEVE IN</span>
          <h2>
            Little things.
            <br />
            <em>Meaningful moments.</em>
          </h2>
          <p>
            The details behind every flower, every gift, and every
            thoughtful gesture.
          </p>
        </div>

        <div className="about-values__grid">
          {values.map((value, index) => (
            <article className="about-value-card" key={value.title}>
              <span className="about-value-card__number">
                0{index + 1}
              </span>
              <div className="about-value-card__icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-showcase">
        <div className="about-showcase__content">
          <span className="about-section-label">A WORLD OF BLOOMS</span>
          <h2>
            Find the flowers
            <br />
            <em>that feel like you.</em>
          </h2>
          <p>
            From romantic roses to cheerful mixed bouquets and calming
            greenery, discover something beautiful for every mood and
            moment.
          </p>
          <Link to="/shop" className="about-button">
            Shop the collection <FiArrowRight />
          </Link>
        </div>

        <div className="about-showcase__images">
          <img
            src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=85"
            alt="Red roses"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=85"
            alt="Fresh green houseplant"
            loading="lazy"
          />
        </div>
      </section>

      <section className="about-cta">
        <span className="about-section-label">LET SOMETHING BEAUTIFUL BEGIN</span>
        <h2>
          Every moment deserves
          <br />
          <em>a little bloom.</em>
        </h2>
        <p>
          Find a bouquet that says it all, even when words fall short.
        </p>
        <Link to="/shop" className="about-button">
          Find your flowers <FiArrowRight />
        </Link>
      </section>
    </main>
  );
}

export default About;