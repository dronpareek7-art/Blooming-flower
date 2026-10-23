
import { Link } from "react-router-dom";
import { FiArrowLeft, FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "../components/ComponentsCss/Cart.css";

const formatPrice = (price) =>
  `₹${Number(price).toLocaleString("en-IN")}`;

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    subtotal,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-container cart-empty">
          <div className="cart-empty-icon">
            <FiShoppingBag />
          </div>
          <span className="cart-eyebrow">YOUR SHOPPING BAG</span>
          <h1>Your cart is waiting for flowers.</h1>
          <p>
            Discover beautiful blooms and find the perfect flowers
            for someone special.
          </p>
          <Link to="/shop" className="cart-primary-button">
            Explore Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <div className="cart-page-heading">
          <div>
            <span className="cart-eyebrow">YOUR SELECTION</span>
            <h1>Shopping Cart</h1>
            <p>
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
              items selected for you
            </p>
          </div>

          <button
            type="button"
            className="cart-clear-button"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>

        <div className="cart-layout">
          <section className="cart-items-list">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <Link
                  to={`/product/${item.id}`}
                  className="cart-item-image"
                  aria-label={`View ${item.name}`}
                >
                  <img src={item.image} alt={item.name} />
                </Link>

                <div className="cart-item-details">
                  <span className="cart-item-category">
                    {item.category}
                  </span>
                  <h2>
                    <Link to={`/product/${item.id}`}>
                      {item.name}
                    </Link>
                  </h2>
                  <strong className="cart-item-price">
                    {formatPrice(item.price)}
                  </strong>

                  <div className="cart-item-actions">
                    <div className="cart-quantity">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.name}`}
                        disabled={item.quantity <= 1}
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <FiMinus />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() => increaseQuantity(item.id)}
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="cart-remove-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FiTrash2 />
                      Remove
                    </button>
                  </div>
                </div>

                <strong className="cart-item-total">
                  {formatPrice(Number(item.price) * item.quantity)}
                </strong>
              </article>
            ))}

            <Link to="/shop" className="cart-continue-link">
              <FiArrowLeft />
              Continue Shopping
            </Link>
          </section>

          <aside className="cart-summary">
            <span className="cart-eyebrow">ORDER OVERVIEW</span>
            <h2>Order Summary</h2>

            <div className="cart-summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="cart-summary-total">
              <span>Total</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <p className="cart-summary-note">
              Shipping and any applicable taxes will be confirmed at checkout.
            </p>

            <Link to="/checkout" className="cart-primary-button cart-checkout-button">
              Proceed to Checkout
            </Link>

            <div className="cart-secure-note">
              Thoughtfully arranged, carefully delivered.
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;
