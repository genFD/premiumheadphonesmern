import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useProductsContext } from '../../context/products_context';
import { useCartContext } from '../../context/cart_context';

import { HiSpeakerphone } from 'react-icons/hi';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';

import Loader from '../../components/loader/Loader';
import Message from '../../components/message/Message';
import { formatPrice } from '../../utils/helpers';
import { BackButton } from '../../components';

// import './productdetails.css';

const SingleProductPage = () => {
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  // const { search } = useLocation();
  // const quantity = search ? Number(search.split('=')[1]) : 1;
  const navigate = useNavigate();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();

  const { addToCart, cart } = useCartContext();

  useEffect(() => {
    fetchSingleProduct(id);
  }, []);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${quantity}`);
  };

  const { name, image, imageDetails, price, description, countInStock } =
    product;
  return loading ? (
    <Loader />
  ) : error ? (
    <Message error='error'>{error}</Message>
  ) : (
    <Wrapper>
      <BackButton />
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
              {countInStock > 0 && (
                <select
                  className='select'
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}>
                  {[...Array(countInStock).keys()].map((x) => {
                    return (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          </div>

          <div className='price'>
            <p>{formatPrice(price)}</p>
          </div>
          <div className='cta-container'>
            <Link to='/cart'>
              <button
                className={countInStock === 0 ? 'disabled' : 'btn'}
                onClick={() =>
                  addToCart(id, name, image, price, quantity, countInStock)
                }
                disabled={countInStock === 0}>
                {countInStock === 0 ? 'Out of stock' : 'Add to cart'}
              </button>
            </Link>
            {/* <button
              className={countInStock === 0 ? 'disabled' : 'btn'}
              onClick={addToCartHandler}
              disabled={countInStock === 0}>
              {countInStock === 0 ? 'Out of stock' : 'Add to cart'}
            </button> */}
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
  .select {
    background: var(--green);
    color: #0a192f;
    padding: 4px 10px;
    font-size: 14px;
    font-family: var(--bodyFont);
    border-radius: var(--radius);
    border: none;
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
  .disabled {
    padding: 10px 30px;
    color: white;
    border: none;
    text-decoration: none;
    background: #233554;
    border-radius: var(--br);
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
  }

  @media screen and (min-width: 780px) {
    .product-center {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8rem;
    }
  }
`;

export default SingleProductPage;
