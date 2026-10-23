
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem("blooming-flowers-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getInitialCart);

  // Persist cart between page refreshes.
  useEffect(() => {
    localStorage.setItem("blooming-flowers-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add a product or increase its quantity.
  const addToCart = (product, quantity = 1) => {
    if (!product || product.id == null) return;

    const amount = Math.max(1, Math.floor(Number(quantity) || 1));

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + amount }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: amount }];
    });
  };

  // Set an item's quantity. Quantity cannot go below 1.
  const updateQuantity = (productId, quantity) => {
    const amount = Math.floor(Number(quantity));

    if (!Number.isFinite(amount) || amount < 1) return;

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: amount } : item
      )
    );
  };

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => setCartItems([]);

  // Total units, not just the number of distinct products.
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      totalItems,
      subtotal,
    }),
    [cartItems, totalItems, subtotal]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
