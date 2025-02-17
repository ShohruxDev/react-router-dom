import React, { useState, useEffect } from "react";
import api from "../api"; 
import "./HomePage.css";
import CustomCarousel from "../Components/Carousel";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    api
      .get()
      .then((response) => {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError("Malumot olishda xato yuz berdi...");
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (event) => {
    setSearchQuery(event.target.value);
    const filtered = products.filter((product) =>
      product.description
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div style={{ marginTop: "20px" }} className="search-container">
        <input
          type="text"
          placeholder="Mahsulotlarni qidirish..."
          value={searchQuery}
          onChange={handleFilterChange}
        />
      </div>
      <CustomCarousel products={products} />
      <div className="product-grid">
        {filteredProducts.map((product) => (
        <Link to={`/product/${product.id}`} style={{
          textDecoration:'none', 
          color:'black'
        }}>  <div key={product.id} className="product-card">
        <img
          style={{
            width: "100px",
            height: "130px",
          }}
          src={product.images[0] || "default-image.jpg"}
          alt={product.name}
        />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </div></Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
