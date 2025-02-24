import React, { useState, useEffect } from "react";
import img from "../assets/asaxiy-logo.svg";
import imgg from "../assets/image.png";
import imgk from "../assets/cart.svg";
import po from "../assets/language-uz.svg"
import pol from "../assets/payment.svg"
import ty from "../assets/ty.svg"
import "./Header.css";
let a = 0;
 
import api from "../api";
import { useStateValue } from "../context/newsContext";
import { NavLink, useNavigate } from "react-router-dom";
const Headerd = ({ setProducts, cart, setCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openismodal, modalopenset] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { wishlist } = useStateValue();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/zakaz")
  }
  useEffect(() => {
    if (searchTerm === "") return;
    const fetchProducts = async () => {
      try {
        const response = await api.get(
          `/search?q=${searchTerm}&category=${selectedCategory}`
        );
        console.log("API javobi:", response.data);
        if (response.data.products) {
          setProducts(response.data.products);
        } else {
          console.log("Mahsulotlar topilmadi");
        }
      } catch (error) {
        console.error("API xatosi:", error);
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
        <img src={ty} alt="" />
        <p>Справнение</p>
      </div>
     
      <div className="lopi">
      <div style={{
        marginTop:'-8px'
      }} className="flex">
        <img style={{
          width:'40%',
          height:'50%'
        }} src={po} alt="" />
        <p>O'zbekcha</p>
      </div>
      <div style={{
        marginTop:'1px'
      }} className="flex">
        <img style={{
        }} src={pol} alt="" />
        <p>оплатит</p>
      </div>
      </div>
      <div style={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'5%'
      }}  
        onClick={(e) => {
          modalopenset((prev) => !prev);
        }}
      >
        <img style={{
          width:'30%',
          height:'10%',
        }} src={imgk} alt="" />
        <p className="vyti">Корзина</p>
      </div>
      <div style={{
        width:'5%'
      }} className="flex">
        
        <img style={{
          width:'15%',
          height:'7%',
          marginTop:'5px'
        }} src={imgg} alt="" />
        <button onClick={() => setIsModalOpen((prev) => !prev)} className="tnb">
          <p className="vyti">Войти</p>
        </button>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <p>Modal kontenti</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="close-btn"
              >
                <p>Yopish</p>
              </button>
            </div>
          </div>
        )}
      </div>
      {openismodal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="w-[500px] bg-white p-6 rounded-lg shadow-lg">
            {cart && cart.length > 0 ? (
              cart.map((p, index) => (
                <div 
                  key={index}
                  className="klop"
                >
                  <img     
                    src={p.thumbnail}
                    alt={p.title}
                  />
                  <p className="lop-0">{p.title}</p>
                  <p className="lop-0">Price: {p.price}$</p>
                  <button onClick={()=>{
                    setCart([...cart.filter((pr)=>pr.id!=p.id)])
                  }} className="x-btn">x</button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Cart is empty</p>
            )}
               <div className="summa">
                    <p>Сумма</p>
                    <span>{cart?.reduce((sum, item) => sum + (item.price || 0), 0)}сум</span>
                  </div>
                  <button onClick={handleClick} className=" ghjk w-[100%] col-end-4 bg-blue-500 h-[40px]">Оформит Покупку</button>    
            <button
              onClick={() => modalopenset(false)}
              className=" ghjkk mt-4 px-4 py-2   text-white rounded-lg w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* <NavLink to="/newss">Newss {wishlist.length}</NavLink> */}
      <NavLink to="/news">News {wishlist.length}</NavLink>
    </header>
  );
};

export default Headerd;
