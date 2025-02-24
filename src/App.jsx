import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Zakaz from "./Components/Zakaza"
import HomePage from "./Pages/HomePage";
import ProductDetail from "./Pages/ProductDetail";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import api from "./api";
import NewsProvider, { useStateValue } from "./context/newsContext";
import News from "./Pages/NewsPage";
import Newss from "./Pages/Korzinka";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    api.get().then((res) => setProducts(res.data.products));
  }, []);

  return (
    <NewsProvider>
      <Router>
        <Header setProducts={setProducts} cart={cart} setCart={setCart} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage products={products} cart={cart} setCart={setCart} />
            }
          />
          <Route path="/news" element={<News />} />
          <Route path="/zakaz" element={<Zakaz/>} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </Router>
    </NewsProvider>
  );
};

export default App;
