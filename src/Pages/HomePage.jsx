import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import api from "../api"; 
import "./HomePage.css";
import CustomCarousel from "../Components/Carousel";
import { FaBeer } from 'react-icons/fa';
import { Link } from "react-router-dom";
const HomePage = ({ products }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  

  // useEffect(() => {
  //   api
  //     .get()
  //     .then((response) => {
  //       setFilteredProducts(response.data.products);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError("Malumot olishda xato yuz berdi...");
  //       setLoading(false);
  //     });
  // }, []);

  // const handleFilterChange = (event) => {
  //   setSearchQuery(event.target.value);
  //   const filtered = products.filter((product) =>
  //     product.description
  //       .toLowerCase()
  //       .includes(event.target.value.toLowerCase())
  //   );
  //   setFilteredProducts(filtered);
  // };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <div>
      {/* <div style={{ marginTop: "20px" }} className="search-container">
        <input
          type="text"
          placeholder="Mahsulotlarni qidirish..."
          value={searchQuery}
          onChange={handleFilterChange}
        />
      </div> */}
      <CustomCarousel products={products} />
      <div className="product-grid">
        {products.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`} style={{
          textDecoration:'none', 
          color:'black'
        }}>  <div key={product.id} className="product-card">
         <button style={{
          width:'100px',
          height:'30px',
          marginLeft:'-100px',
          backgroundColor:'bisque',
          borderRadius:'8px'
         }}>Супер цена</button> 
        <img
          style={{
            width: "150px",
            height: "130px",
            marginLeft:'60px'
          }}
          src={product.images[0] || "default-image.jpg"}
          alt={product.name}
        />
        <h3>{product.name}</h3>
        <div>
        <div className="star">
        <p>Rating: {product.rating} <FaStar size={15} color="orange" /></p>
        <p>Rating: {product.rating} <FaStar size={15} color="orange" /></p>
        <p>Rating: {product.rating} <FaStar size={15} color="orange" /></p>
        <p>Rating: {product.rating} <FaStar size={15} color="orange" /></p>
        <p>Rating: {product.rating} <FaStar size={15} color="orange" /></p>
        </div>
    </div>
        <p>{product.title}</p>
        <p style={{
          color:'blue'
        }}>Price: ${product.price}</p>
        <div className="kupit">
          <button className="btn-0">Harid qilish</button>
          <button className="btn-1">Click</button>
        </div>
      </div></Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
