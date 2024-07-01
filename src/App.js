import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar/Navbar';
import Kurunzishop from './components/Kurunzishop/Kurunzishop'
import ShopItemDetail from './components/ShopItemDetail/ShopItemDetail';
import Contact from './components/Contact/Contact';
import CartPage from './components/Cart/CartPage';
import Checkout from './components/Checkout/Checkout';
const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Routes> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/kurunzishop" element={<Kurunzishop />} />  
          <Route path="/cart" element={<CartPage/>}  />
          <Route path="/items/:id" element={<ShopItemDetail/>} />  
          <Route path='/checkout' element={<Checkout/>} />             
        </Routes>
      </div>
    </Router>
  );
};

export default App;