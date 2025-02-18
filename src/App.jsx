import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductDetail from "./Pages/ProductDetail";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import api from "./api";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get().then((res) => setProducts(res.data.products));
  }, []);

  return (
    <Router>
      <Header setProducts = {setProducts} />
      <Routes>
        <Route path="/" element={<HomePage products={products} />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
