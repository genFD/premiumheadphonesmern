import React, { useState } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import ProductsList from '../productsList/ProductsList';
import ProductDetailsPage from '../productDetails/ProductDetailsPage';

import InformationPage from '../../shopping/information/InformationPage';
import PaymentPage from '../../shopping/payment/PaymentPage';
import OrderConfirmation from '../../shopping/orderConfirmation/OrderConfirmation';
import UserEditPage from '../../admin/userEdit/UserEditPage';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <ProductsList />
      <Footer />
    </>
  );
};

export default HomePage;
