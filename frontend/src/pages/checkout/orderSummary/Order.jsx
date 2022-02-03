import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring';
import { useCartContext } from '../../../context/cart_context';
import { assets } from '../../../assets/assets';
import Message from '../../../components/message/Message';
import { formatPrice } from '../../../utils/helpers';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
// import './orderSummary.css';

const Order = ({ cart }) => {
  const {
    shipping,
    taxes,
    total_amount,
    total_items,
    updateAmount,
    removeItem,
  } = useCartContext();

  if (cart && cart.length < 1) {
    return <Message>Your cart is empty</Message>;
  } else {
    return (
      <Wrapper>
        <div className='order'>
          {cart.map(({ name, image, price, quantity, id }) => {
            return (
              <div key={id} className='items'>
                <div className='items-display'>
                  <Link to={`/products/${id}`}>
                    <img src={image} alt='' />
                  </Link>
                  <p className='items-name'>{name}</p>
                  <button className='delete-btn' onClick={() => removeItem(id)}>
                    <FaTrash />
                  </button>

                  <span>{quantity}</span>
                </div>
                <p className='items-price'>{formatPrice(price)}</p>
              </div>
            );
          })}

          <div className='divider'></div>

          <div className='cart-total'>
            <div className='subtotal'>
              <p>Subtotal</p>
              <p>{formatPrice(total_amount)}</p>
            </div>
            <div className='shipping'>
              <p>Shipping</p>
              <p>{formatPrice(shipping)}</p>
            </div>
            <div className='taxes'>
              <p>taxes</p>
              <p>{formatPrice(taxes)}</p>
            </div>
          </div>
          <div className='divider'></div>
          <div className='total'>
            <p>Total</p>
            <p>{formatPrice(total_amount + shipping + taxes)}</p>
          </div>
        </div>
      </Wrapper>
    );
  }
};

const TransitionOrder = ({ showInfo, cart }) => {
  return (
    <>
      <Transition
        items={showInfo}
        from={{ opacity: 0, translateY: -60 }}
        enter={{ opacity: 1, translateY: 0 }}
        leave={{ opacity: 0 }}
        reverse={showInfo}
        delay={200}
        // config={config.molasses}
        // onRest={() => setShowInfo(!showInfo)}
      >
        {(styles, item) =>
          item && (
            <animated.div style={styles}>
              <Order cart={cart} />
            </animated.div>
          )
        }
      </Transition>
    </>
  );
};

const Wrapper = styled.section`
  .order {
    /* border: 1px solid red; */
  }

  .order-summary-info-container {
    display: grid;
    /* place-items: center; */
    /* border: 1px solid red; */
  }
  .items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 1rem;
    place-items: center;
    margin-bottom: 25px;
  }
  .items-display {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    position: relative;
  }

  .items-display span {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--green);
    color: var(--green);
    background: var(--dark-navy);
    border-radius: 50%;
    width: 1.75rem;
    height: 1.75rem;
    padding: 10px;
    position: absolute;
    top: -1.2rem;
    right: 9rem;
  }
  .items img {
    width: 6rem;
    height: 6rem;
    object-fit: cover;
    border: 1px solid var(--green);
  }
  .delete-btn {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    font-size: 1rem;
    margin: 1rem 0 0 0;
    transition: all linear 0.3s;
  }
  .delete-btn {
    color: lightgrey;
  }
  .delete-btn:hover {
    color: tomato;
  }
  .delete-btn:active {
    transform: scale(0.88);
  }
  .items-name {
    font-size: 12px;
  }
  .items-price {
    justify-self: end;
  }
  .subtotal {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .shipping {
    display: flex;
    justify-content: space-between;
  }
  .taxes {
    display: flex;
    justify-content: space-between;
    /* margin-bottom: 30px; */
  }
  .total {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .divider {
    height: 1px;
    width: 90%;
    background: var(--dark-slate);
    margin: 0 auto;
  }
`;

export { Order, TransitionOrder };
