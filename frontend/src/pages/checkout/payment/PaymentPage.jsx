import React, { useState, useEffect } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { Link, useNavigate } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import {
  BackButton,
  ExpressCheckOut,
  InfoSummary,
  Loader,
  Message,
} from '../../../components';

import { Order, TransitionOrder } from '../orderSummary/Order';
import styled from 'styled-components';
import { useCartContext } from '../../../context/cart_context';
import { useOrderContext } from '../../../context/order_context';
import axios from 'axios';
import { formatPrice } from '../../../utils/helpers';

const PaymentPage = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [sdkReady, setSdkReady] = useState(false);

  const navigate = useNavigate();
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

  const { shippingAddress, cart, total_amount, shipping, taxes, clearCart } =
    useCartContext();
  const { order, success, createOrder, payOrder } = useOrderContext();

  const totalPrice = total_amount + shipping + taxes;

  const placeOrderHandler = () => {
    createOrder({
      orderItems: cart,
      shippingAddress,
      itemsPrice: total_amount,
      shippingPrice: shipping,
      taxPrice: taxes,
      totalPrice: totalPrice,
    });
    payOrder();
    clearCart();
  };
  if (success) {
    navigate(`/confirmation/${order._id}`);
  }

  if (!shippingAddress) {
    navigate('/shipping');
  }

  return (
    <Wrapper>
      <BackButton />
      <div className='section-center shipping-center'>
        <div className='container-checkout-shipping-info'>
          <InfoSummary />
          <div className='shipping-info'>
            {/* {loading && <Loader />}
            {!sdkReady ? (
              <Loader />
            ) : (
              <PayPalButton
                amount={formatPrice(order.totalPrice)}
                onSuccess={successPaymentHandler}
              />
            )}
            {error && <Message error='error'>{error}</Message>} */}
            <button onClick={placeOrderHandler} className='btn'>
              Pay now
            </button>
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
