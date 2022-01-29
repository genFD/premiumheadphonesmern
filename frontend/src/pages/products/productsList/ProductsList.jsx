import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './Cards';
// import { assets } from '../../../assets/assets';
import './productslist.css';
// import { products } from '../../../data/data';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const { data } = await axios.get('/api/products');
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main>
      <section className='products'>
        {products.map(({ image, name, price, _id, countInStock }) => {
          return (
            <Cards
              key={_id}
              image={image}
              name={name}
              price={price}
              id={_id}
              countInStock={countInStock}
            />
          );
        })}
      </section>
    </main>
  );
};

export default ProductsList;
