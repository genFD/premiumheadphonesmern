import React, { useState, useEffect } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import Button from '../../../components/button/Button';
import ExpressCheckout from '../expressCheckout/ExpressCheckout';
import { Order, TransitionOrder } from '../orderSummary/Order';
import ShippingInfo from '../shippingInfo/ShippingInfo';
import './informationPage.css';

const InformationPage = () => {
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
          <ExpressCheckout />
          <div className='shipping-info'>
            <ShippingInfo />
          </div>
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

export default InformationPage;
