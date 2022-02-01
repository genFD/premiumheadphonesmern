import React from 'react';
import styled from 'styled-components';
import { assets } from '../../assets/assets';
import { HeroAbout } from '../../components';

const AboutPage = () => {
  return (
    <>
      <HeroAbout />
      <Wrapper className='page section section-center'>
        <img src={assets.about} alt='headphones' />
        <article>
          <div className='title'>
            <h2>About us</h2>
            <div className='underline'></div>
          </div>
          <p>
            Premium is a catalogue of audio products curated by the best
            audiophiles. High quality products, no compromised on the drivers,
            cool design, and a focus on listeners experience. <br /> Our
            commitment is to offer a selection of products with premium sound
            and good design to a wider audience.
          </p>
        </article>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 10px;
    height: 0.25rem;
    background: var(--green);
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

// .title {
//   text-align: center;
// }
// .title .underline {
//   width: 6rem;
//   height: 0.25rem;
//   background: #49a6e9;
//   background: var(--clr-primary-5);
//
// }

export default AboutPage;
