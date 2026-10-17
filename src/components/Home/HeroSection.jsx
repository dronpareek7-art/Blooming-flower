import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import heroSlides from "../../data/heroSlides";
import "../componentsCss/Home/HeroSection.css";

function HeroSection() {
  return (
    <section className="hero-section">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop={heroSlides.length > 1}
        speed={800}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation
        pagination={{ clickable: true }}
        className="hero-swiper"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="hero-slide">
              <img
                src={slide.image}
                alt={slide.title}
                className="hero-image"
              />

              <div className="hero-overlay" />

              <div className="hero-content">
                <span className="hero-subtitle">
                  {slide.subtitle}
                </span>

                <h1>{slide.title}</h1>

                <p>{slide.description}</p>

                <div className="hero-buttons">
                  <Link
                    to={slide.buttonLink}
                    className="hero-btn hero-btn-primary"
                  >
                    {slide.buttonText} <span>→</span>
                  </Link>

                  <Link
                    to="/categories"
                    className="hero-btn hero-btn-outline"
                  >
                    Explore More
                  </Link>
                </div>
              </div>

              <div className="hero-offer">
                <span>UP TO</span>
                <strong>{slide.offer}</strong>
                <span>OFF</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroSection;