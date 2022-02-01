import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useProductsContext } from '../../../context/products_context';
import { products_url as url } from '../../../utils/constants';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { HiSpeakerphone } from 'react-icons/hi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../../components/loader/Loader';
import Message from '../../../components/message/Message';
import { formatPrice } from '../../../utils/helpers';

// import './productdetails.css';

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(0);

  const { id } = useParams();

  const navigate = useNavigate();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(id);
  }, []);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    setQuantity((prev) => prev - 1);
  };
  const { name, imageDetails, price, description, countInStock } = product;

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Wrapper>
      <div className='back-container'>
        <span onClick={() => navigate(-1)}>Back</span>
      </div>
      <div className='section-center product-center'>
        <article className='product-img'>
          <img src={imageDetails} alt='' className='product-photo' />
        </article>
        <article className='product-info'>
          <div className='presentation'>
            <h2 className='product-details-title'>{name}</h2>
            <p>{description}</p>
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
                onClick={() => decrement()}>
                <FaMinus style={{ color: '#64ffda', cursor: 'pointer' }} />
              </button>
              <div className='quantity-container'>
                <p>{quantity < 0 ? 0 : quantity}</p>
              </div>
              <button
                className='count-btn'
                type='button'
                onClick={() => increment()}>
                <FaPlus
                  style={{ color: '#64ffda', cursor: 'pointer' }}
                  className='icon-qty'
                />
              </button>
            </div>
          </div>

          <div className='price'>
            <p>{formatPrice(price)}</p>
          </div>
          <div className='cta-container'>
            <Link to='/cart'>
              <button className='btn'>
                {countInStock === 0 ? 'out of stock' : 'Add to cart'}
              </button>
            </Link>
          </div>
        </article>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .product-center {
    min-height: calc(100vh - 5rem);
    display: grid;
    place-items: center;
    gap: 2rem;
    margin-bottom: 3rem;
    margin-top: 5rem;
  }
  .product-photo {
    border-radius: 1rem;
    box-shadow: var(--shadow-4);
  }

  .counter-container {
    display: flex;
    justify-content: space-evenly;
    width: 10rem;
  }
  .presentation {
    border-bottom: 0.1rem solid var(--slate);
    margin-bottom: 1rem;
  }
  .product-details-title {
    font-family: var(--bodyFont);
    margin-bottom: 0;
  }
  .product-details-techname {
    font-family: var(--bodyFont);
    font-size: 1.75rem;
    margin-bottom: 0;
  }
  .product-info {
    max-height: 80rem;
  }
  .quantity-container {
    display: grid;
    place-items: center;
    height: 2rem;
    width: 2rem;
    background: var(--green);
    color: var(--dark-navy);
    /* margin-top: 2rem; */
  }
  .count-btn {
    background: transparent;
    border: none;
    transition: var(--transition);
  }
  .count-btn:active {
    transform: scale(0.78);
  }
  .guarantee {
    display: flex;

    width: 20rem;
    align-items: center;
    justify-content: space-between;
  }
  .guarantee p {
    margin: 0;
  }
  .guarantee span {
    height: 1rem;
    width: 0.1rem;
    background: var(--slate);
  }

  .quantity {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
    border-bottom: 0.1rem solid var(--slate);
    padding-bottom: 0.8rem;
    margin-bottom: 1rem;
  }
  .quantity p {
    margin: 0;
  }
  .price {
    border-bottom: 0.1rem solid var(--slate);
    margin-bottom: 1rem;
  }
  .price p {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
    color: var(--green);
  }

  .cta-container {
    margin-top: 3rem;
    background: grey;
    width: fit-content;
  }
  .back-btn {
    position: absolute;
    left: 10%;
    top: 10%;
    display: none;
  }
  .back-container span {
    display: none;
  }
  @media screen and (min-width: 780px) {
    .product-center {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8rem;
    }
    .back-btn {
      display: block;
      font-size: 2rem;
      margin-top: 2rem;
    }
    .back-btn:hover {
      color: var(--green);
      cursor: pointer;
    }
    .back-container span {
      color: var(--slate);
      position: absolute;
      left: 8%;
      top: 14%;
      width: 4rem;
      height: 2rem;
      background-color: var(--light-navy);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.2s;
      cursor: pointer;
    }
    .back-container span:hover {
      background-color: var(--dark-navy);
      color: var(--green);
    }

    .back-container span::before {
      content: '';
      position: absolute;
      border-left: 1rem solid transparent;
      border-right: 1rem solid var(--green);
      border-bottom: 1rem solid transparent;
      border-top: 1rem solid transparent;
      top: 50%;
      left: -2rem;
      transform: translateY(-50%);
    }
  }
`;

export default SingleProduct;
