import React, { useState, useEffect } from "react";
import ShopItemCard from "../ShopItem/ShopItemCard";
import Pagination from "../Pagination/Pagination";
//import { ReactComponent as SearchIcon } from './search.svg';
import './kurunzishop.css';

const Kurunzishop = () => {
  const [shopItems, setShopItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // State for loading indicator

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterShopItems();
  }, [currentPage, searchQuery, selectedCategory]);

  const fetchData = () => {
    setIsLoading(true);  // Enable loading indicator
    fetch("/shopItems.json")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setCategories(data.categories);
        setShopItems(data.shop_items);
        setTotalPages(Math.ceil(data.shop_items.length / 10)); // Assuming 10 items per page
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setIsLoading(false));  // Disable loading indicator
  };

  const filterShopItems = () => {
    let filteredItems = shopItems;
    if (searchQuery) {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory) {
      filteredItems = filteredItems.filter(item =>
        item.category_id === selectedCategory
      );
    }
    // Pagination logic
    const itemsPerPage = 10;
    const offset = (currentPage - 1) * itemsPerPage;
    const paginatedItems = filteredItems.slice(offset, offset + itemsPerPage);
    setShopItems(paginatedItems);
    setTotalPages(Math.ceil(filteredItems.length / itemsPerPage));
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to page 1 when category changes
    filterShopItems(); // Filter items based on the new category
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
    filterShopItems(); // Filter items based on the new search query
  };

  return (
    <div className="container">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '10vh' }}>
          <span className="spinner-border" style={{ width: '4rem', height: '4rem',color:'orange'}} role="status" aria-hidden="true"></span>
          <span className="loader">Please Wait...</span>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-4">
            <h3 className="categories-heading">Categories</h3>
            <div className="list-group">
              <button className="list-group-item list-group-item-action all-categories" onClick={() => handleCategoryChange(null)}>
                All Categories
              </button>
              {categories.map((category) => (
                <button key={category.id} className="list-group-item list-group-item-action category-button" onClick={() => handleCategoryChange(category.id)}>
                  {category.name}
                </button>
              ))}
            </div>
            <form className="search-box">
              <input
                type="text"
                placeholder="Search products..."
                className="form-control my-3"
                value={searchQuery}
                onChange={handleSearch}
              />
              <img src="/search.svg" alt="Search Icon" className="search-icon" onClick={handleSearch} />
            </form>
          </div>
          <div className="col-md-8">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
            <div className="row">
              {shopItems.map(item => (
                <div className="col-md-6 mb-3" key={item.id}>
                  <ShopItemCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kurunzishop;
