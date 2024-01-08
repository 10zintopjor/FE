import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import { ContextFunction } from '../../Context/Context';
import Store from '../../Components/Leftnav/Store';
import ProductCard from "../../Components/Card/Product Card/ProductCard"

const HomePage = () => {
  const { setCart } = useContext(ContextFunction);
  const [bannerData, setBannerData] = useState([]);
  const authToken = localStorage.getItem('Authorization');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCart();
        window.scroll(0, 0);

        const response = await axios.get("http://127.0.0.1:8000/api/getrandomproducts");
        setBannerData(response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getCart = async () => {
    if (authToken) {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_GET_CART}`, {
          headers: {
            'Authorization': authToken
          }
        });
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div style={{ width: '80%', display: 'flex' }}>
      <Store />
        <Container
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            overflowX: 'auto',
            overflowY: 'hidden',
            border: '2px solid black',
            width: '80%',
            padding: '10px', // Adjust the padding value as needed
          }}
        >
          {bannerData.map((data, i) => (
            <ProductCard key={i} data={data} />
          ))}
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
