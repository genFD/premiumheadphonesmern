import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/products/home/HomePage';
import ProductDetailsPage from './pages/products/productDetails/ProductDetailsPage';
import InformationPage from './pages/shopping/information/InformationPage';
import OrderConfirmationPage from './pages/shopping/orderConfirmation/OrderConfirmationPage';
import PaymentPage from './pages/shopping/payment/PaymentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products/:id' element={<ProductDetailsPage />} />
        <Route path='/products/:id' element={<ProductDetailsPage />} />
        <Route path='/cart' element={<InformationPage />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/confirmation' element={<OrderConfirmationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
