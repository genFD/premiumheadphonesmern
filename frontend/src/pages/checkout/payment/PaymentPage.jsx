import React, { useState, useEffect } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { Link, useNavigate } from 'react-router-dom';

import {
  BackButton,
  ExpressCheckOut,
  InfoSummary,
  Message,
} from '../../../components';

import { Order, TransitionOrder } from '../orderSummary/Order';
import styled from 'styled-components';
import { useCartContext } from '../../../context/cart_context';
import { useOrderContext } from '../../../context/order_context';

const PaymentPage = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

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

  const {
    shippingAddress,
    savePaymentMethod,
    cart,
    total_items,
    total_amount,
    shipping,
    taxes,
  } = useCartContext();

  const totalPrice = total_amount + shipping + taxes;

  const {
    createOrder,
    order,
    order_success: success,
    order_loading: loading,
    order_error: error,
  } = useOrderContext();
  const navigate = useNavigate();

  if (!shippingAddress) {
    navigate('/shipping');
  }
  useEffect(() => {
    if (success) {
      navigate('/confirmation');
    }
  });

  const submitHandler = () => {
    // savePaymentMethod(paymentMethod);
    createOrder({
      orderItems: cart,
      shippingAddress,
      paymentMethod,
      itemsPrice: total_amount,
      shippingPrice: shipping,
      taxPrice: taxes,
      totalPrice: totalPrice,
    });
  };

  return (
    <Wrapper>
      <BackButton />
      <div className='section-center shipping-center'>
        <div className='container-checkout-shipping-info'>
          <InfoSummary />
          <div className='shipping-info'>
            <ExpressCheckOut />
          </div>
          {error && <Message error='error'>There was an error</Message>}
          <button onClick={submitHandler} className='btn' type='submit'>
            Pay now
          </button>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .shipping-center {
    min-height: calc(100vh - 5rem);
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 1rem;
    margin-bottom: 3rem;
    padding-top: 3rem;
    margin-top: 8rem;
  }
  .order {
    border: 3px solid lightseagreen;
  }
  .showinfo {
    color: var(--green);
    border: none;
    text-decoration: none;
    background: var(--light-navy);
    background: transparent;
    border-radius: var(--bradius);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    font-family: var(--bodyFont);
    transition: 0.5s;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .container-checkout-shipping-info {
    order: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media screen and (min-width: 768px) {
    .shipping-center {
      grid-template-columns: repeat(2, 1fr);
      gap: 3rem;
    }
    .container-checkout-shipping-info {
      order: 0;
      background: var(--dark-navy);
      padding: 3rem;
      border-radius: 20px;
    }
    .order {
      background: var(--lightest-navy);
      z-index: -1000;
      padding: 2rem;
      order: 1;
      padding-top: 1.7rem;
      border-radius: 20px;
    }
    .showinfo {
      display: none;
    }
  }
`;

export default PaymentPage;
