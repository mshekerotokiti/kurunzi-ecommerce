
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleIncrement = (id, quantity) => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrement = (id, quantity) => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  // Helper function to format prices
  const formatPrice = (price) => {
    return `Ksh ${Number(price).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const formattedTotalPrice = formatPrice(totalPrice);

  const headStyle = { color: 'orange', fontSize: '20px' };
  const tableStyle = { fontFamily: 'Roboto' };

  return (
    <div className="container mt-5 pt-4" style={tableStyle}>
      <div className="row">
        <div className="col-12 col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={headStyle}>Product</th>
                      <th style={headStyle}>Price</th>
                      <th style={headStyle}>Quantity</th>
                      <th style={headStyle}>Total</th>
                      <th style={headStyle}>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{formatPrice(item.price)}</td>
                        <td>
                          <button className="btn btn-secondary btn-sm" onClick={() => handleDecrement(item.id, item.quantity)}>-</button>
                          <span> {item.quantity} </span>
                          <button className="btn btn-secondary btn-sm" onClick={() => handleIncrement(item.id, item.quantity)}>+</button>
                        </td>
                        <td>{formatPrice(item.price * item.quantity)}</td>
                        <td><button onClick={() => removeFromCart(item.id)} className="btn btn-danger btn-sm">x</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card">
            <div className="card-body">
                  <h2 style={{color:'orange'}}>Cart Totals</h2>
                  <hr className="my-4" />
                  <strong>Total: {formattedTotalPrice}</strong>
                  <hr className="my-4" />
                  <button onClick={handleCheckout} className="btn btn-primary">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
