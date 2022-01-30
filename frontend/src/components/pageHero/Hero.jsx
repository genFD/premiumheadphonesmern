import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { assets } from '../../assets/assets';
const Hero = () => {
  return (
    <Wrapper>
      <div className='hero-image'>
        <picture>
          <source srcSet={assets.aboutlg} media='(min-width: 839px)' />
          <source srcSet={assets.mobile} media='(min-width: 301px)' />
          <img src={assets.mobile} alt='headphones' />
        </picture>
        <div className='banner'>
          <p>The one-stop shop for the best audio products on the market</p>
          <Link to='/products'>
            <button style={{ marginTop: '1.5rem' }} className='btn'>
              Shop Now
            </button>
          </Link>
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
    height: 100vh;
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
    .banner {
      left: 0;
    }
    .banner h1 {
      max-width: 30rem;
    }

    .banner p {
      /* display: none; */
      max-width: 20rem;
    }
  }
  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`;

export default Hero;
