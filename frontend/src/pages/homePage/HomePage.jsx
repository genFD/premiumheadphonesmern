import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import ProductsList from '../../components/productsList/ProductsList';
import ProductDetailsPage from '../productDetailsPage/ProductDetailsPage';

const HomePage = () => {
  return (
    <>
      <Navbar />
      {/* <ProductsList /> */}
      <ProductDetailsPage />
      <Footer />
    </>
  );
};

export default HomePage;
