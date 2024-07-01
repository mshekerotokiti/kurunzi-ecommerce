import React, {createContext,useState} from "react"; 

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    // Check if item already exists in the cart
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // If item exists, just update the quantity
      updateQuantity(item.id, existingItem.quantity + 1);
    } else {
      // Otherwise, add the new item to the cart
      setCartItems(prevCartItems => [...prevCartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId); // Remove the item if quantity is zero or less
    } else {
      setCartItems(prevCartItems => {
        return prevCartItems.map(item => {
          if (item.id === itemId) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
      });
    }
  };

  const totalCost = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const clearCart = () => {
    setCartItems([]); // Clears the cart
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity , totalCost, clearCart}}>
      {children}
    </CartContext.Provider>
  );
};