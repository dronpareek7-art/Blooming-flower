
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

import "@/components/ComponentsCss/Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-letter">N</span>
            <span>NOVA</span>
          </Link>

          <p>
            Your one-stop destination for beautiful
            flowers and plants, bringing nature's
            beauty to your doorstep.
          </p>

          <div className="footer-socials">
            <a href="https://facebook.com" aria-label="Facebook">
              <FiFacebook />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FiInstagram />
            </a>
            <a href="https://youtube.com" aria-label="YouTube">
              <FiYoutube />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-column">
          <h3>Customer Care</h3>
          <Link to="/login">My Account</Link>
          <Link to="/track-order">Track Order</Link>
          <Link to="/returns">Returns &amp; Refunds</Link>
          <Link to="/shipping-policy">Shipping Policy</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms &amp; Conditions</Link>
        </div>

        <div className="footer-column footer-contact">
          <h3>Contact Us</h3>

          <p><FiPhone /> +91 98765 43210</p>
          <p><FiMail /> support@nova.com</p>
          <p><FiMapPin /> New Delhi, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} NOVA. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
