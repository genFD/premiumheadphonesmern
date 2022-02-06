import React, { useState, useEffect } from 'react';
import { Order, TransitionOrder } from '../orderSummary/Order';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { ImCheckboxChecked } from 'react-icons/im';
import './orderConfirmation.css';
import { BackButton, InfoSummary } from '../../../components';
import styled from 'styled-components';
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
    <Wrapper>
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

export default OrderConfirmationPage;
