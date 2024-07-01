import React from 'react';
import './shopitemcard.css';
import { Link } from 'react-router-dom';

const ShopItemCard = ({ item }) => {
  const formattedPrice = Number(item.price).toLocaleString('en-US');
  const isInStock = item.stock.toLowerCase() === 'in stock';

  return (
    <div className="shop-item-card">
      <img src={item.image_url} className="card-img" alt={item.name} />
      <div className="card-content">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-description">{item.description}</p>
        <div className="card-price-stock">
          <p className="card-price"><strong>Price:</strong> Ksh {formattedPrice}</p>
          <p className={`card-stock ${isInStock ? 'in-stock' : 'out-of-stock'}`}>
            {isInStock ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>
        <Link to={`/items/${item.id}`} className="card-link">View Details</Link>
      </div>
    </div>
  );
};

export default ShopItemCard;