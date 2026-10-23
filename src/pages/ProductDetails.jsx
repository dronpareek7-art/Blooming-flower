
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheck,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiStar,
} from "react-icons/fi";

import products from "../data/products";
import { useCart } from "../context/CartContext";
import "../components/ComponentsCss/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const product = products.find((item) => String(item.id) === id);

  if (!product) {
    return (
      <main className="product-not-found">
        <h1>Product Not Found</h1>
        <p>This flower arrangement may no longer be available.</p>
        <Link to="/shop" className="details-back-link">
          <FiArrowLeft /> Back to Shop
        </Link>
      </main>
    );
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.id !== product.id && item.category === product.category
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setNotice(`${product.name} added to your cart!`);
    window.setTimeout(() => setNotice(""), 2500);
  };

  return (
    <main className="product-details-page">
      <div className="details-container">
        <nav className="details-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <Link to="/shop" className="details-back-link">
          <FiArrowLeft /> Continue Shopping
        </Link>

        <section className="product-details-layout">
          <div className="details-image-wrap">
            {product.badge && (
              <span className="details-product-badge">
                {product.badge}
              </span>
            )}

            <button
              type="button"
              className={`details-favorite ${
                isFavorite ? "is-favorite" : ""
              }`}
              onClick={() => setIsFavorite((current) => !current)}
              aria-label="Toggle wishlist"
            >
              <FiHeart />
            </button>

            <img
              src={product.image}
              alt={product.name}
              className="details-product-image"
            />
          </div>

          <div className="details-product-info">
            <span className="details-category">{product.category}</span>

            <h1>{product.name}</h1>

            <div className="details-rating">
              <FiStar className="details-star" />
              <strong>{product.rating || "4.8"}</strong>
              <span>Customer favourite</span>
            </div>

            <div className="details-price">
              <span>₹{Number(product.price).toLocaleString("en-IN")}</span>

              {product.oldPrice && (
                <del>
                  ₹{Number(product.oldPrice).toLocaleString("en-IN")}
                </del>
              )}

              {product.oldPrice && (
                <span className="details-savings">
                  {Math.round(
                    ((product.oldPrice - product.price) /
                      product.oldPrice) *
                      100
                  )}
                  % OFF
                </span>
              )}
            </div>

            <p className="details-description">
              {product.description ||
                `Bring beauty and joy to every moment with our ${product.name}. Thoughtfully arranged with a fresh, elegant look, this floral gift is perfect for celebrations, special occasions, or simply making someone's day.`}
            </p>

            <div className="details-benefits">
              <p>
                <FiCheck /> Carefully arranged flowers
              </p>
              <p>
                <FiCheck /> Perfect for gifting
              </p>
              <p>
                <FiCheck /> Beautifully presented
              </p>
            </div>

            <div className="details-quantity">
              <span>Quantity</span>

              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <FiMinus />
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => current + 1)
                  }
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            <button
              type="button"
              className="details-add-to-cart"
              onClick={handleAddToCart}
            >
              <FiShoppingCart />
              Add to Cart — ₹
              {(Number(product.price) * quantity).toLocaleString("en-IN")}
            </button>

            {notice && (
              <p className="details-cart-notice" role="status">
                <FiCheck /> {notice}
              </p>
            )}

            <p className="details-delivery-note">
              A thoughtful floral gift for someone special.
            </p>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="related-products-section">
            <div className="related-heading">
              <span>You May Also Like</span>
              <h2>More Beautiful Blooms</h2>
            </div>

            <div className="related-products-grid">
              {relatedProducts.map((item) => (
                <article className="related-product-card" key={item.id}>
                  <Link
                    to={`/product/${item.id}`}
                    className="related-product-image"
                  >
                    <img src={item.image} alt={item.name} />
                  </Link>

                  <div className="related-product-info">
                    <span>{item.category}</span>
                    <Link to={`/product/${item.id}`}>
                      <h3>{item.name}</h3>
                    </Link>
                    <strong>
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </strong>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default ProductDetails;
