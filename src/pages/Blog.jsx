import { useEffect, useMemo, useState } from "react";
import {
  FiArrowRight,
  FiBookOpen,
  FiCalendar,
  FiCheck,
  FiClock,
  FiHeart,
  FiSearch,
  FiShare2,
  FiX,
} from "react-icons/fi";

import blogs from "../data/blogs";
import "../components/ComponentsCss/Blog.css";

const categories = [
  "All Stories",
  ...new Set(blogs.map((blog) => blog.category)),
];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=80";

function BlogImage({ src, alt, className = "" }) {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <img
      className={className}
      src={imageSrc}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (imageSrc !== FALLBACK_IMAGE) {
          setImageSrc(FALLBACK_IMAGE);
        }
      }}
    />
  );
}

function Blog() {
  const [activeCategory, setActiveCategory] = useState("All Stories");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [copied, setCopied] = useState(false);

  const featuredBlog = blogs.find((blog) => blog.featured) || blogs[0];

  const filteredBlogs = useMemo(() => {
    let result = blogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "All Stories" ||
        blog.category === activeCategory;

      const searchText =
        `${blog.title} ${blog.category} ${blog.excerpt}`.toLowerCase();

      return matchesCategory && searchText.includes(search.toLowerCase());
    });

    if (sortBy === "title") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title),
      );
    } else if (sortBy === "shortest") {
      result = [...result].sort(
        (a, b) =>
          parseInt(a.readTime, 10) - parseInt(b.readTime, 10),
      );
    }

    return result;
  }, [activeCategory, search, sortBy]);

  const visibleBlogs = filteredBlogs.filter(
    (blog) => blog.id !== featuredBlog.id,
  );

  useEffect(() => {
    if (!selectedBlog) return undefined;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedBlog(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedBlog]);

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  };

  const openBlog = (blog) => {
    setSelectedBlog(blog);
    setCopied(false);
  };

  const shareBlog = async () => {
    const shareData = {
      title: selectedBlog.title,
      text: selectedBlog.excerpt,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(
          `${selectedBlog.title}\n${selectedBlog.excerpt}\n${window.location.href}`,
        );
        setCopied(true);
      } else {
        window.prompt("Copy this article title:", selectedBlog.title);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Unable to share article:", error);
      }
    }
  };

  const featuredIsVisible = filteredBlogs.some(
    (blog) => blog.id === featuredBlog.id,
  );

  return (
    <main className="blog-page">
      {/* Hero */}
      <section className="blog-hero">
        <div className="blog-hero__image">
          <BlogImage
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1800&q=90"
            alt="Beautiful fresh flowers in soft natural light"
          />
        </div>

        <div className="blog-hero__overlay" />

        <div className="blog-hero__content">
          <span className="blog-eyebrow">
            <span />
            THE BLOOMING JOURNAL
          </span>

          <h1>
            Stories that
            <br />
            <em>make life bloom.</em>
          </h1>

          <p>
            Flower inspiration, thoughtful gifting, and simple ways to
            bring a little more beauty into every day.
          </p>

          <a href="#blog-stories" className="blog-hero__button">
            Explore our stories <FiArrowRight />
          </a>
        </div>

        <div className="blog-hero__note">
          <FiBookOpen />
          <span>Ideas for a more beautiful everyday</span>
        </div>
      </section>

      {/* Intro */}
      <section className="blog-intro">
        <div>
          <span className="blog-section-label">A LITTLE INSPIRATION</span>
          <h2>
            The world, through
            <br />
            <em>flower-colored glasses.</em>
          </h2>
        </div>

        <p>
          From choosing the right bouquet to caring for your favorite
          blooms, find thoughtful guides and fresh ideas for every
          occasion.
        </p>
      </section>

      {/* Featured Article */}
      {featuredIsVisible && (
        <section className="blog-featured">
          <button
            className="blog-featured__image"
            onClick={() => openBlog(featuredBlog)}
            aria-label={`Read ${featuredBlog.title}`}
          >
            <BlogImage
              src={featuredBlog.image}
              alt={featuredBlog.title}
            />
            <span className="blog-featured__image-label">
              EDITOR'S PICK
            </span>
          </button>

          <div className="blog-featured__content">
            <span className="blog-card__category">
              {featuredBlog.category}
            </span>

            <h2>{featuredBlog.title}</h2>

            <p>{featuredBlog.excerpt}</p>

            <div className="blog-card__meta">
              <span>
                <FiCalendar /> {featuredBlog.date}
              </span>
              <span>
                <FiClock /> {featuredBlog.readTime}
              </span>
            </div>

            <button
              className="blog-text-link"
              onClick={() => openBlog(featuredBlog)}
            >
              Read the story <FiArrowRight />
            </button>
          </div>
        </section>
      )}

      {/* Blog Listing */}
      <section className="blog-listing" id="blog-stories">
        <div className="blog-listing__heading">
          <div>
            <span className="blog-section-label">THE JOURNAL</span>
            <h2>
              Find your next
              <br />
              <em>little inspiration.</em>
            </h2>
          </div>

          <p>
            {filteredBlogs.length}{" "}
            {filteredBlogs.length === 1 ? "story" : "stories"} to explore
          </p>
        </div>

        {/* Search */}
        <div className="blog-toolbar">
          <label className="blog-search">
            <FiSearch />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search flowers, care tips, occasions..."
              aria-label="Search blog articles"
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

          <label className="blog-sort">
            <span>Sort by</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort blog articles"
            >
              <option value="latest">Latest stories</option>
              <option value="title">Title A–Z</option>
              <option value="shortest">Quick reads</option>
            </select>
          </label>
        </div>

        {/* Category Filters */}
        <div className="blog-filters" aria-label="Filter blog categories">
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "blog-filter is-active"
                  : "blog-filter"
              }
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Article Cards */}
        {visibleBlogs.length > 0 ? (
          <div className="blog-grid">
            {visibleBlogs.map((blog, index) => (
              <article
                className="blog-card"
                key={blog.id}
                style={{ "--card-index": index }}
              >
                <div className="blog-card__image-wrap">
                  <button
                    className="blog-card__image"
                    onClick={() => openBlog(blog)}
                    aria-label={`Read ${blog.title}`}
                  >
                    <BlogImage src={blog.image} alt={blog.title} />
                  </button>

                  <span className="blog-card__image-category">
                    {blog.category}
                  </span>

                  <button
                    className={
                      favorites.includes(blog.id)
                        ? "blog-card__favorite is-favorite"
                        : "blog-card__favorite"
                    }
                    onClick={() => toggleFavorite(blog.id)}
                    aria-label={
                      favorites.includes(blog.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                    aria-pressed={favorites.includes(blog.id)}
                  >
                    <FiHeart />
                  </button>
                </div>

                <div className="blog-card__content">
                  <div className="blog-card__meta">
                    <span>
                      <FiCalendar /> {blog.date}
                    </span>
                    <span>
                      <FiClock /> {blog.readTime}
                    </span>
                  </div>

                  <button
                    className="blog-card__title"
                    onClick={() => openBlog(blog)}
                  >
                    {blog.title}
                  </button>

                  <p>{blog.excerpt}</p>

                  <button
                    className="blog-text-link"
                    onClick={() => openBlog(blog)}
                  >
                    Read article <FiArrowRight />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="blog-empty">
            <span className="blog-empty__icon">
              <FiSearch />
            </span>
            <h3>No stories found</h3>
            <p>
              Try another search term or choose a different category.
            </p>
            <button
              className="blog-hero__button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All Stories");
                setSortBy("latest");
              }}
            >
              Clear all filters <FiArrowRight />
            </button>
          </div>
        )}
      </section>

      {/* Newsletter-style closing banner */}
      <section className="blog-cta">
        <div className="blog-cta__decoration">✿</div>
        <span className="blog-section-label">A NOTE FROM US</span>
        <h2>
          Make room for
          <br />
          <em>a little more beauty.</em>
        </h2>
        <p>
          Every bloom has a story. Find the flowers that help you tell
          yours.
        </p>
        <a href="/shop" className="blog-hero__button">
          Find your flowers <FiArrowRight />
        </a>
      </section>

      {/* Full Article Popup */}
      {selectedBlog && (
        <div
          className="blog-modal"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedBlog(null);
            }
          }}
        >
          <div
            className="blog-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-modal-title"
            tabIndex={-1}
          >
            <button
              className="blog-modal__close"
              onClick={() => setSelectedBlog(null)}
              aria-label="Close article"
              autoFocus
            >
              <FiX />
            </button>

            <div className="blog-modal__cover">
              <BlogImage
                src={selectedBlog.image}
                alt={selectedBlog.title}
              />
              <span>{selectedBlog.category}</span>
            </div>

            <div className="blog-modal__article">
              <div className="blog-modal__meta">
                <span>
                  <FiCalendar /> {selectedBlog.date}
                </span>
                <span>
                  <FiClock /> {selectedBlog.readTime}
                </span>
              </div>

              <h2 id="blog-modal-title">{selectedBlog.title}</h2>

              <p className="blog-modal__excerpt">
                {selectedBlog.excerpt}
              </p>

              <div className="blog-modal__author">
                <span className="blog-modal__author-icon">B.</span>
                <div>
                  <strong>{selectedBlog.author}</strong>
                  <span>Floral inspiration &amp; everyday living</span>
                </div>
              </div>

              <div className="blog-modal__body">
                {selectedBlog.content.map((section, index) => (
                  <section key={section.heading}>
                    <h3>{section.heading}</h3>
                    <p>{section.text}</p>
                  </section>
                ))}
              </div>

              <div className="blog-modal__footer">
                <p>Thank you for reading our little journal.</p>

                <div className="blog-modal__actions">
                  <button
                    className={
                      favorites.includes(selectedBlog.id)
                        ? "blog-modal__action is-favorite"
                        : "blog-modal__action"
                    }
                    onClick={() => toggleFavorite(selectedBlog.id)}
                  >
                    {favorites.includes(selectedBlog.id) ? (
                      <FiCheck />
                    ) : (
                      <FiHeart />
                    )}
                    {favorites.includes(selectedBlog.id)
                      ? "Saved"
                      : "Save story"}
                  </button>

                  <button
                    className="blog-modal__action"
                    onClick={shareBlog}
                  >
                    <FiShare2 />
                    {copied ? "Copied!" : "Share story"}
                  </button>
                </div>

                <button
                  className="blog-modal__done"
                  onClick={() => setSelectedBlog(null)}
                >
                  Back to all stories <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );    
}

export default Blog;