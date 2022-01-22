import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import ProductsList from '../../components/productsList/ProductsList';

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
