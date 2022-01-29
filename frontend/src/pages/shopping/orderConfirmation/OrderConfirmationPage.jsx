import React, { useState, useEffect } from 'react';
import { Order, TransitionOrder } from '../orderSummary/Order';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { ImCheckboxChecked } from 'react-icons/im';
import ExpressCheckout from '../expressCheckout/ExpressCheckout';
import InfoSummary from '../informationSummary/InfoSummary';
import './orderConfirmation.css';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';

const OrderConfirmationPage = () => {
  const [showInfo, setShowInfo] = useState(false);
  let w = window.innerWidth;
  const orderDisplayer = () => {
    if (w >= 768) {
      setShowInfo(true);
    } else {
      setShowInfo(false);
    }
  };
  const getLocalStorage = () => {
    let valueShowInfo = localStorage.getItem('showinfo');
    if (w >= 768 && valueShowInfo === 'false') {
      setShowInfo(true);
    }
  };
  useEffect(() => {
    localStorage.setItem('showinfo', showInfo);
    getLocalStorage();
  }, [showInfo]);

  window.addEventListener('resize', () => {
    orderDisplayer();
  });

  return (
    <>
      <div className='section-center shipping-center'>
        <div className='container-checkout-shipping-info'>
          <InfoSummary />
          <div className='confirmed-message'>
            <h2>Order Confirmed</h2>
            <ImCheckboxChecked
              className='confirmed-icon'
              size='40'
              color='#64ffda'
            />
          </div>
          {/* <div className='shipping-info'></div> */}
        </div>
        <button
          className={`showinfo ${showInfo ? 'showinfotrue' : 'showinfofalse'}`}
          onClick={() => setShowInfo(!showInfo)}>
          <span>{showInfo ? 'Hide Order Summary' : 'Show Order summary'}</span>
          <span>
            {!showInfo ? (
              <TiArrowSortedUp size='30' />
            ) : (
              <TiArrowSortedDown size='30' />
            )}
          </span>
        </button>
        {w >= 768 && showInfo ? (
          <Order />
        ) : w < 768 && showInfo ? (
          <TransitionOrder showInfo={showInfo} />
        ) : null}
      </div>
    </>
  );
};

export default OrderConfirmationPage;
