import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { assets } from '../../assets/assets';
const Hero = () => {
  return (
    <Wrapper>
      <div className='hero-image'>
        <picture>
          <source srcSet={assets.aboutlg} media='(min-width: 768px)' />
          <source srcSet={assets.small} media='(min-width: 301px)' />
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
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    height: auto;
  }

  .hero-image {
    height: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
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
    /* bottom: 300px; */
  }
  .banner p {
    max-width: 25rem;
    margin: 0 auto;
    letter-spacing: var(--spacing);
    color: var(--green);
    font-weight: bold;
  }
  @media (min-width: 768px) {
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
