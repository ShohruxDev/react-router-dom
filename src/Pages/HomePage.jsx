import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useStateValue } from "../context/newsContext";
import "./HomePage.css";
import CustomCarousel from "../Components/Carousel";
import { FaBeer } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomePage = ({ products }) => {
  const [issModalOpen, setIssModalOpen] = useState(false); 
  const navigate = useNavigate();
  const { setwishlist, wishlist } = useStateValue();
  const handlwishlist = (product) => {
    const issomewishlist = wishlist.some((item) => item.id === product.id);
    if (issomewishlist) {
      setwishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setwishlist([...wishlist,product]);
    }
  };

  return (
    <div>
      <CustomCarousel products={products} />
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="grid">
              <button
                style={{
                  width: "100px",
                  height: "30px",
                  backgroundColor: "bisque",
                  borderRadius: "8px",
                }}
              >
                Супер цена
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlwishlist(product);
                }}
                className="yur"
              >
                Like
              </button>
            </div>
            <img
              style={{
                width: "150px",
                height: "130px",
                marginLeft: "60px",
              }}
              src={product.images[0] || "default-image.jpg"}
              alt={product.name}
            />
            <h3>{product.name}</h3>
            <div>
              <div className="star">
                <p>
                  Rating: {product.rating} <FaStar size={15} color="orange" />
                </p>
                <p>
                  Rating: {product.rating} <FaStar size={15} color="orange" />
                </p>
                <p>
                  Rating: {product.rating} <FaStar size={15} color="orange" />
                </p>
                <p>
                  Rating: {product.rating} <FaStar size={15} color="orange" />
                </p>
                <p>
                  Rating: {product.rating} <FaStar size={15} color="orange" />
                </p>
              </div>
            </div>
            <p>{product.title}</p>
            <p
              style={{
                color: "blue",
              }}
            >
              Price: ${product.price}
            </p>
            <div className="kupit">
              <button className="btn-0">Harid</button>
              <button className="btn-1">Click</button>
              <button onClick={ (e) => {
                e.stopPropagation();
                setIssModalOpen((prev) => !prev);
              }} className="moda">Modal</button>
               {issModalOpen && (
          <div key={product.id}  onClick={() => navigate(`/product/${product.id}`)} className="modal-2">
            <div className="modal-content-2">
              <p>{product.title}</p>
              <img src={product.thumbnail} alt="" />
              <p>{product.name}</p>
              <button onClick={() => setIssModalOpen(false)} className="close-btn-2">
                <p>Yopish</p>
              </button>
            </div>
          </div>
        )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
