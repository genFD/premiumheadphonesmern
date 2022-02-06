import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProductsProvider } from './context/products_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { OrderProvider } from './context/order_context';

ReactDOM.render(
  <UserProvider>
    <ProductsProvider>
      <CartProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </CartProvider>
    </ProductsProvider>
  </UserProvider>,
  document.getElementById('root')
);
