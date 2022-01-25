import React, { useState } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import ProductsList from '../../../components/productsList/ProductsList';
import ProductDetailsPage from '../productDetails/ProductDetailsPage';

import InformationPage from '../../shopping/information/InformationPage';
import PaymentPage from '../../shopping/payment/PaymentPage';

const HomePage = () => {
  return (
    <>
      <Navbar />
      {/* <ProductsList /> */}
      {/* <ProductDetailsPage /> */}
      {/* <InformationPage /> */}
      <PaymentPage />
      <Footer />
    </>
  );
};

export default HomePage;
