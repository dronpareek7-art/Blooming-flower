
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";

import "@/components/ComponentsCss/Header.css";
const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Categories", path: "/categories" },
  { label: "Blogs", path: "/blogs" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="header-container">
          {/* Logo */}
          <Link
            to="/"
            className="header-logo"
            aria-label="Nova home"
            onClick={closeMenu}
          >
            <img
              src="/logo.webp"
              alt="Nova"
              className="header-logo-image"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `desktop-nav-link ${isActive ? "active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <Link
              to="/search"
              className="header-icon-link"
              aria-label="Search"
            >
              <FiSearch />
            </Link>

            <Link
              to="/wishlist"
              className="header-icon-link"
              aria-label="Wishlist"
            >
              <FiHeart />
            </Link>

            <Link
              to="/cart"
              className="header-icon-link cart-icon-link"
              aria-label="Shopping cart"
            >
              <FiShoppingCart />
              <span className="cart-count">2</span>
            </Link>

            <Link
              to="/login"
              className="header-icon-link"
              aria-label="My account"
            >
              <FiUser />
            </Link>

            {/* Visible at 992px and below */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`sidebar-backdrop ${isMenuOpen ? "visible" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Animated Sidebar */}
      <aside
        className={`mobile-sidebar ${isMenuOpen ? "open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand" onClick={closeMenu}>
            <span className="logo-letter">B</span>
            <span className="logo-name">Blooming Flower</span>
          </Link>

          <button
            type="button"
            className="sidebar-close"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            <FiX />
          </button>
        </div>

        <p className="sidebar-caption">EXPLORE NOVA</p>

        <nav className="sidebar-navigation" aria-label="Mobile navigation links">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={closeMenu}
              style={{ "--link-index": index }}
              className={({ isActive }) =>
                `sidebar-nav-link ${isActive ? "active" : ""}`
              }
            >
              <span>{link.label}</span>
              <span className="sidebar-link-arrow">↗</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>Flowers for every beautiful moment.</p>

          <div className="sidebar-quick-links">
            <Link to="/wishlist" onClick={closeMenu}>
              <FiHeart /> Wishlist
            </Link>

            <Link to="/cart" onClick={closeMenu}>
              <FiShoppingCart /> My Cart
            </Link>

            <Link to="/login" onClick={closeMenu}>
              <FiUser /> My Account
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Header;
