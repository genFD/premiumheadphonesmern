import React from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import ProductsList from '../productsList/ProductsList';

import './homepage.css';

const HomePage = () => {
  return (
    <>
      <Navbar />
      {/* <ProductDetailsPage /> */}
      <ProductsList />
      <Footer />
    </>
  );
};

export default HomePage;
