import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext'; 
//import cartIcon from './cart.svg'; 
import './carticon.css';

const CartIcon = () => {
  const { cartItems } = useContext(CartContext);

  // Calculate the total number of items in the cart
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to="/cart" className="nav-link cart-icon-link">
     <img src="/cart.svg" alt="Cart Icon" className="cart-icon" />
      {itemCount > 0 && (
        <span className="badge bg-danger cart-icon-badge">{itemCount}</span>
      )}
    </Link>
  );
};

export default CartIcon;