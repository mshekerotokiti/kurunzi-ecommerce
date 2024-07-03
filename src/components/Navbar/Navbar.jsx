import React, { useState } from "react";
import { Link } from "react-router-dom";
import './navbar.css';
import CartIcon from '../Cart/CartIcon';

const Navbar = () => {
  const [cartItemCount, setCartItemCount] = useState(0); // Initialize state for cart item count

  // You can modify this function to increase cart item count
  const addToCart = (item) => {
    setCartItemCount(prev => prev + 1); // Example function to simulate adding an item
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Logo */}
        <div className="navbar-brand">
          <a href="/kurunzishop">
            <img
              src= '/logo.png'
              alt="Logo"
              style={{
                height: 'auto', 
                maxWidth: '58px', 
                transform: 'scale(2.0)', 
              }}
            />
          </a>
        </div>

        {/* Navbar Toggler (Hamburger Icon) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/kurunzishop" className="nav-link">
                Home
                <span className="underline"></span> {/* Underline element */}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/laptops" className="nav-link">
                Laptops
                <span className="underline"></span> {/* Underline element */}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/desktops" className="nav-link">
                Desktops
                <span className="underline"></span> {/* Underline element */}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/accessories" className="nav-link">
                Accessories
                <span className="underline"></span> {/* Underline element */}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
                <span className="underline"></span> {/* Underline element */}
              </Link>
            </li>

            <li className="nav-item">
              <CartIcon itemCount={cartItemCount} />
            </li>
          </ul>
          {/* Get Quote button */}
          {/* <div className="ml-lg-auto">
            <Link to="/contact" className="btn btn-primary">
              GET QUOTE
            </Link>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;