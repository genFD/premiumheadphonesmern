import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import {
  Home,
  SingleProduct,
  ShippingInformation,
  OrderConfirmation,
  Payment,
  Error,
  About,
  ProductsList,
  Login,
  Register,
} from './pages';
import { Footer, Navbar } from './components';
import SideDrawer from './components/side_drawer/SideDrawer';

function App() {
  return (
    <Router>
      <Navbar />
      <SideDrawer />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductsList />} />
        <Route path='/about' element={<About />} />
        <Route path='/products/:id' element={<SingleProduct />} />
        <Route path='/cart/*' element={<ShippingInformation />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/confirmation' element={<OrderConfirmation />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
