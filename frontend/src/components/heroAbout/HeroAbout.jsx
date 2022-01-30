import React from 'react';
import styled from 'styled-components';
import { assets } from '../../assets/assets';
const HeroAbout = () => {
  return (
    <Wrapper>
      <div className='hero-image'>
        <picture>
          <source srcSet={assets.large} media='(min-width: 839px)' />
          <source srcSet={assets.mobile} media='(min-width: 301px)' />
          <img src={assets.mobile} alt='headphones' />
        </picture>
        <div className='banner'>
          <h1>Premium Audio Products</h1>
          <p>One-stop-shop for the best audio products on the market</p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .hero-image {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hero-image picture {
    width: 100%;
    height: 100%;
  }

  .banner {
    /* border: 1px solid red; */
    text-align: center;
    padding: 0 3rem;
    position: absolute;
    color: var(--green);
  }
  .banner p {
    max-width: 35rem;
    margin: 0 auto;
    letter-spacing: var(--spacing);
    color: var(--green);
    font-weight: bold;
  }
  @media (min-width: 839px) {
    .banner p {
      max-width: 20rem;
    }
  }
`;

export default HeroAbout;
