import React from 'react';
import Cards from './Cards';
// import { assets } from '../../../assets/assets';
import './productslist.css';

const ProductsList = () => {
  return (
    <main>
      <section className='products section-center'>
        <Cards />
        {/* <div className='card test1'></div>
        <div className='test test2'></div>
        <div className='test'></div>
        <div className='test'></div>
        <div className='test'></div>
        <div className='test'></div> */}
      </section>
    </main>
  );
};

export default ProductsList;
