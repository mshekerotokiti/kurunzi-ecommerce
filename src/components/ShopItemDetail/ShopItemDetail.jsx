import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext';
import './shopitemdetail.css';

const ShopItemDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useContext(CartContext);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch('/shopItems.json');
        if (!response.ok) {
          throw new Error('Failed to fetch item details');
        }
        const data = await response.json();
        const items = data.shop_items;
        const itemData = items.find(product => product.id === parseInt(id));
        if (!itemData) {
          throw new Error('Item not found');
        }
        setItem(itemData);
        setLoading(false);
        const existingItem = cartItems.find(cartItem => cartItem.id === itemData.id);
        if (existingItem) {
          setInCart(true);
          setQuantity(existingItem.quantity);
        }
      } catch (error) {
        console.error('Fetching error:', error);
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, cartItems]);

  const handleAddToCart = () => {
    addToCart({ ...item, quantity: 1 });
    setInCart(true);
    setQuantity(1);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(item.id);
    setInCart(false);
    setQuantity(0);
  };

  const handleAddMoreItems = () => {
    updateQuantity(item.id, quantity + 1);
    setQuantity(quantity + 1);
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  // Split the description and specifications into arrays of list items using commas and colons, respectively
  const descriptionItems = item.description.split(',').map(item => item.trim());
  const specificationItems = item.specifications.split(',').map(spec => spec.split(':').map(s => s.trim()).join(': '));
  const formattedPrice = Number(item.price).toLocaleString('en-US');

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={item.image_url} alt={item.name} className="img-fluid image-magnify" />
        </div>
        <div className="col-md-6">
          <h2>{item.name}</h2>
          <ul>
            {descriptionItems.map((descItem, index) => (
              <li key={index}>{descItem}</li>
            ))}
          </ul>
          <p className="card-price"><strong>Price:</strong> Ksh {formattedPrice}</p>
          <ul>
            {specificationItems.map((specItem, index) => (
              <li key={index}>{specItem}</li>
            ))}
          </ul>
          <p><strong>Stock:</strong> {item.stock}</p>
          <div className="action-buttons">
            {inCart ? (
              <>
                <button onClick={handleRemoveFromCart} className="btn btn-danger">Remove</button>
                <button onClick={handleAddMoreItems} className="btn btn-secondary">Add More</button>
              </>
            ) : (
              <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>
            )}
            <button onClick={handleViewCart} className="btn btn-info">View Cart</button>
            <button onClick={handleCheckout} className="btn btn-success">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopItemDetail;
