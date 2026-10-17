import { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  EffectFade,
} from "swiper/modules";

import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import heroSlides from "../../data/heroSlides";
import "../componentsCss/Home/HeroSection.css";

function HeroSection() {
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <section className="hero-section">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
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
        pagination={{ clickable: true }}
        onSwiper={setSwiperInstance}
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
                    {slide.buttonText}
                    <FiArrowRight aria-hidden="true" />
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

      {heroSlides.length > 1 && (
        <div className="hero-navigation">
          <button
            type="button"
            className="hero-nav-btn hero-prev"
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous slide"
          >
            <FiChevronLeft />
          </button>

          <button
            type="button"
            className="hero-nav-btn hero-next"
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next slide"
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </section>
  );
}

export default HeroSection;