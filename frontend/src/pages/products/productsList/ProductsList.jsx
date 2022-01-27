import React from 'react';
import Cards from './Cards';
// import { assets } from '../../../assets/assets';
import './productslist.css';
import { products } from '../../../data/data';

const ProductsList = () => {
  return (
    <main>
      <section className='products'>
        {products.map(({ image, name, price, _id }) => {
          return (
            <Cards key={_id} image={image} name={name} price={price} id={_id} />
          );
        })}
      </section>
    </main>
  );
};

export default ProductsList;
