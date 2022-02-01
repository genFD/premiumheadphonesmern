import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home,
  SingleProduct,
  ShippingInformation,
  OrderConfirmation,
  Payment,
  Error,
  About,
  ProductsList,
} from './pages';
import { Footer, Navbar } from './components';
import SideDrawer from './components/side_drawer/SideDrawer';

function App() {
  return (
    <Router>
      <Navbar />
      <SideDrawer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductsList />} />
        <Route path='/about' element={<About />} />
        <Route path='/products/:id' element={<SingleProduct />} />
        <Route path='/cart' element={<ShippingInformation />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/confirmation' element={<OrderConfirmation />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
