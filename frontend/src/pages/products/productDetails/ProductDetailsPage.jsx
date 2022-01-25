import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { HiSpeakerphone } from 'react-icons/hi';
import { assets } from '../../../assets/assets';
import Button from '../../../components/button/Button';

import './productdetails.css';

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(0);
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    setQuantity((prev) => prev - 1);
  };
  return (
    <div className='hero'>
      <div className='section-center hero-center'>
        <article className='hero-img'>
          <img src={assets.test} alt='' className='hero-photo' />
        </article>
        <article className='hero-info'>
          <div className='presentation'>
            <h2 className='product-details-title'>Beats</h2>
            <h3 className='product-details-techname'>
              Triple Driver True Wireless Earbuds
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              blanditiis voluptatem alias, commodi explicabo doloremque
            </p>
          </div>

          <div className='guarantee'>
            <HiSpeakerphone style={{ marginRight: 5 }} />
            <p>30 day Guarantee</p>
            <span className='divider'></span>
            <p>1 Year guarantee</p>
          </div>

          <div className='quantity'>
            <p>Quantity:</p>
            <div className='counter-container'>
              <button
                className='count-btn'
                type='button'
                onClick={() => increment()}>
                <FaPlus style={{ color: '#64ffda' }} className='icon-qty' />
              </button>
              <div className='quantity-container'>
                <p>{quantity < 0 ? 0 : quantity}</p>
              </div>
              <button
                className='count-btn'
                type='button'
                onClick={() => decrement()}>
                <FaMinus style={{ color: '#64ffda' }} />
              </button>
            </div>
          </div>

          <div className='price'>
            <p>$123</p>
          </div>

          <div className='cta-container'>
            <Button>Add to cart</Button>
            <Button>Buy now</Button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
