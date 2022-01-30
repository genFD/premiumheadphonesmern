import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
const Card = ({ image, name, price, _id }) => {
  return (
    <Wrapper>
      <article className='card'>
        <div className='card-img-container'>
          <img src={image} alt='' />
        </div>
        <div className='card-content-container'>
          <h3>{name}</h3>
          <h4 className='card-price'>{formatPrice(price)}</h4>
          <Link to={`/products/${_id}`} className='link'>
            <button className='btn card-btn'>More details</button>
          </Link>
        </div>
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .card {
    position: relative;
    border: 1px solid var(--green);
    background: var(--dark-navy);
    width: auto;
    height: 330px;
    position: relative;
    border-radius: var(--bradius);
    overflow: hidden;
    z-index: 0;
  }
  @media (min-width: 768px) {
    width: 300px;
  }

  .card::before {
    content: 'Premium';
    font-weight: 600;
    font-size: 8em;
    position: absolute;
    top: -90%;
    width: 100%;
    height: 100%;
    background: var(--light-navy);
    backdrop-filter: blur(210px);
    transform: skewY(345deg);
    transition: top 0.5s;
    border: 1px solid green;
    z-index: 3;
  }

  .card:hover::before {
    top: -100%;
  }
  .card::after {
    content: 'Premium';
    position: absolute;
    bottom: 0;
    left: 0;
    font-weight: 600;
    font-size: 8em;
    color: rgba(0, 0, 0, 0.3);
    color: var(--light-navy);
    z-index: -2500;
  }

  .card-img-container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    z-index: 2;
  }
  .card-img-container img {
    max-width: 50%;
    transition: 0.5s;
  }
  .card-img-container:hover img {
    opacity: 0.5;
  }

  .card-content-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1;
    overflow: hidden;
  }
  .card-content-container .link {
    opacity: 1;
  }
  .card-content-container h3 {
    font-family: var(--bodyFont);
    color: var(--green);
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 1px;
    text-align: center;
    position: absolute;
  }

  .card-content-container .card-price {
    font-family: var(--bodyFont);
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    color: var(--green);
  }
  .card-btn {
    margin-top: 10px;
  }
`;

export default Card;
