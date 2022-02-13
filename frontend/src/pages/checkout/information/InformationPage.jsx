import React, { useState, useEffect } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { useCartContext } from '../../../context/cart_context';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { Order, TransitionOrder } from '../orderSummary/Order';

import { BackButton, Message, ShippingInfo } from '../../../components';
import styled from 'styled-components';
import './informationPage.css';
import { useOrderContext } from '../../../context/order_context';

const InformationPage = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const Navigate = useNavigate();
  const quantity = search ? Number(search.split('=')[1]) : 1;

  const {
    cart,
    total_amount,
    shipping,
    taxes,
    shippingAddress,
    savePaymentMethod,
  } = useCartContext();
  const {
    createOrder,
    order_success: success,
    order_error: error,
  } = useOrderContext();
  const totalPrice = total_amount + shipping + taxes;

  const createOrderHandler = () => {
    createOrder({
      orderItems: cart,
      shippingAddress,
      itemsPrice: total_amount,
      shippingPrice: shipping,
      taxPrice: taxes,
      totalPrice: totalPrice,
    });
  };
  if (success) {
    Navigate('/confirmation');
  }

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
    <Wrapper>
      <BackButton />
      <div className='section-center shipping-center'>
        <div className='container-checkout-shipping-info'>
          <div className='shipping-info'>
            {/* <ShippingInfo /> */}
            {error && <Message error='error'>There was an error</Message>}
            <button onClick={createOrderHandler} className='btn' type='submit'>
              Continue to payment
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
          <TransitionOrder cart={cart} showInfo={showInfo} />
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

export default InformationPage;
