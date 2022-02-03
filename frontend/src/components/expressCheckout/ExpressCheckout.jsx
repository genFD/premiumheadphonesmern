import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

import './express.css';

const ExpressCheckout = () => {
  return (
    <div className='checkout'>
      <p style={{ margin: '0 auto' }}>Express Checkout</p>
      <PayPalButton />
    </div>
  );
};

export default ExpressCheckout;
