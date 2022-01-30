import React from 'react';

import './homepage.css';

import { Contact, FeaturedProducts, Hero, Services } from '../../components';

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
