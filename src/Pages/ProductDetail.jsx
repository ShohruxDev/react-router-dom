import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import './DetailPage.css';


const DetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/${productId}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Mahsulotni olishda xatolik yuz berdi...');
        setLoading(false);
      });
  }, [productId]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <div className="detail-container" style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'61vh'
      }}>
        <img src={product.images[0]} alt={product.name} className="detail-image" style={{
          width:'400px'
        }}/>
        <div className="detail-info">
          <h2 style={{
            color:'black',
            fontWeight:'700'
          }}>{product.title}</h2>     
          <p>{product.description}</p>
          <p><strong>Price: </strong>${product.price}</p>
          <p><strong>Category: </strong>{product.category}</p>
          <div className="flexxc">
          <button className='kor'>Korzinka</button>
          <button className='bir
          '>Bir martalik tolov</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;

