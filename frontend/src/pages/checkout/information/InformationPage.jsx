import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useCartContext } from '../../../context/cart_context';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { Order, TransitionOrder } from '../orderSummary/Order';

import { ShippingInfo } from '../../../components';
import './informationPage.css';

const InformationPage = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const quantity = search ? Number(search.split('=')[1]) : 1;

  const { cart } = useCartContext();
  // console.log(cart);

  // useEffect(() => {
  //   if (id) {
  //     addToCart();
  //   }
  // }, [id, quantity]);
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
          <Order cart={cart} />
        ) : w < 768 && showInfo ? (
          <TransitionOrder cart={cart} showInfo={showInfo} />
        ) : null}
      </div>
    </>
  );
};

export default InformationPage;
