import React, { useState, useEffect } from 'react';
import img from '../assets/asaxiy-logo.svg';
import imgg from '../assets/image.png';
import './Header.css';
import api from '../api';

const Header = ({ setProducts }) => {
  const [searchTerm, setSearchTerm] = useState(''); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedCategory, setSelectedCategory] = useState('all'); 
  useEffect(() => {
    if (searchTerm === '') return; 
    const fetchProducts = async () => {
      try {
     
        const response = await api.get(`/search?q=${searchTerm}&category=${selectedCategory}`);
        console.log('API javobi:', response.data);
        if (response.data.products) {
          setProducts(response.data.products);
        } else {
          console.log('Mahsulotlar topilmadi');
        }
      } catch (error) {
       
        console.error('API xatosi:', error);
      }
    };

  
    fetchProducts();
  }, [searchTerm, selectedCategory, setProducts]); 

 
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); 
  };

  const setFiltr = (event) => {
    setSearchTerm(event.target.value); 
  };

  return (
    <header className="header">
      <img src={img} alt="Logo" />
      <button className="btnn">Kategoriya</button>
      <div className="inputref">
        <select 
          value={selectedCategory}
          onChange={handleCategoryChange} 
          className="category-select"
        >
          <option value="all">Barchasi</option>
          <option value="electronics">Elektronika</option>
          <option value="fashion">Moda</option>
          <option value="books">Kitoblar</option>
          <option value="home">Uy</option>
        </select>
        <input
          value={searchTerm}
          onChange={setFiltr} 
          className="inputt"
          type="text"
          placeholder="Qidiruv..."
        />
        <button className="btn">Izlash</button>
      </div>
      <div className="flex">
        <img src={imgg} alt="" />
        <p style={{
          color:'blue'
        }}>MOdal</p>
        {/* <button onClick={() => setIsModalOpen((prev) => !prev)} className="tnb">
          Modalni ochish
        </button> */}

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <p>Modal kontenti</p>
              {/* <button onClick={() => setIsModalOpen(false)} className="close-btn">
                <p>Yopish</p>
              </button> */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;




