import React from 'react';

import './homepage.css';

import { Contact, FeaturedProducts, Hero, Services } from '../../components';
import ProductsList from '../products/productsList/ProductsList';

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </>
  );
};

export default HomePage;
