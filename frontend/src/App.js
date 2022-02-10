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
  Profile,
  Users,
  UserEdit,
  ProductEdit,
  Products,
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
        <Route path='/profile/' element={<Profile />} />
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductsList />} />
        <Route path='/admin/users' element={<Users />} />
        <Route path='/admin/products' element={<Products />} />
        <Route path='/admin/product/:id/edit' element={<ProductEdit />} />
        <Route path='/admin/user/:id/edit' element={<UserEdit />} />

        <Route path='/about' element={<About />} />
        <Route path='/products/:id' element={<SingleProduct />} />
        <Route path='/cart/*' element={<ShippingInformation />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/confirmation/:id' element={<OrderConfirmation />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
