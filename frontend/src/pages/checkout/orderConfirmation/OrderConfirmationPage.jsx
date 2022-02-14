import React, { useState, useEffect } from 'react';
import { Order, TransitionOrder } from '../orderSummary/Order';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { ImCheckboxChecked } from 'react-icons/im';
import './orderConfirmation.css';
import { BackButton, InfoSummary, Loader, Message } from '../../../components';

import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useOrderContext } from '../../../context/order_context';
import { useCartContext } from '../../../context/cart_context';
import { useUserContext } from '../../../context/user_context';
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
  const { id } = useParams();
  const { loading, error, order, getOrderDetails, payReset } =
    useOrderContext();
  const { userInfo } = useUserContext();

  useEffect(() => {
    getOrderDetails(id);
    payReset();
  }, []);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message error='error'>There was an error </Message>
  ) : (
    <Wrapper>
      <div className='section-center shipping-center'>
        <div className='container-checkout-shipping-info'>
          <InfoSummary />
          <div className='confirmed-message'>
            <ImCheckboxChecked
              className='confirmed-icon'
              size='40'
              color='#64ffda'
            />
            <br />
            <h3 style={{ color: '#64ffda', fontSize: '1rem' }}>
              Thanks for your Order, {userInfo.name}
              <br />
              order confirmation ID: {id}
            </h3>
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
  h2 {
    margin: 0;
  }
  h3 {
    margin: 0;
  }
  p {
    margin: 0;
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
  .confirmed-message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .confirmed-message h3 {
    margin: 0;
    font-family: var(--bodyFont);
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

export default OrderConfirmationPage;
