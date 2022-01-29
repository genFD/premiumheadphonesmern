import React from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import ProductsList from '../productsList/ProductsList';

import './homepage.css';
import SideDrawer from '../../../components/side_drawer/SideDrawer';

const HomePage = () => {
  return (
    <>
      {/* <ProductDetailsPage /> */}
      <ProductsList />
      <SideDrawer />
    </>
  );
};

export default HomePage;
