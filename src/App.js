import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import ProductList from './components/ProductList'; // Import the new ProductList component
import ProductDetail from './components/ProductDetail'; // Import the ProductDetail component

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      {/* Pass the login state and logout handler to the header */}
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Redirect to Dashboard if already logged in */}
        <Route path="/login" element={loggedIn ? <Navigate to="/dashboard" /> : <Login setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={loggedIn ? <Navigate to="/dashboard" /> : <Signup setLoggedIn={setLoggedIn} />} />

        {/* Protect dashboard route */}
        <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Navigate to="/login" />} />

        {/* Add Product List Route */}
        <Route path="/products" element={<ProductList />} />
        
        {/* Add Product Detail Route */}
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
