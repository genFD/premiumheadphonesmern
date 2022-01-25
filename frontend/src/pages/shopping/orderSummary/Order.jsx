import React, { useState, useEffect } from 'react';
import { Transition, animated } from 'react-spring';
import { assets } from '../../../assets/assets';
import './orderSummary.css';

const Order = () => {
  return (
    <div className='order'>
      <div className='items'>
        <div className='items-display'>
          <img src={assets.test} alt='' />
          <p className='items-name'>Headphones</p>
          <span>1</span>
        </div>

        <p className='items-price'>$149</p>
        <div className='items-display'>
          <img src={assets.test} alt='' />
          <p className='items-name'>Headphones</p>
          <span>1</span>
        </div>

        <p className='items-price'>$149</p>
        <div className='items-display'>
          <img src={assets.test} alt='' />
          <p className='items-name'>Headphones</p>
          <span>1</span>
        </div>

        <p className='items-price'>$149</p>
      </div>
      <div className='divider'></div>

      <div className='cart-total'>
        <div className='subtotal'>
          <p>Subtotal</p>
          <p>amount</p>
        </div>
        <div className='shipping'>
          <p>Shipping</p>
          <p>Amount</p>
        </div>
        <div className='taxes'>
          <p>taxes</p>
          <p>Amount</p>
        </div>
      </div>
      <div className='divider'></div>
      <div className='total'>
        <p>Total</p>
        <p>Amount</p>
      </div>
    </div>
  );
};

const TransitionOrder = ({ showInfo }) => {
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
              <Order />
            </animated.div>
          )
        }
      </Transition>
    </>
  );
};

export { Order, TransitionOrder };
