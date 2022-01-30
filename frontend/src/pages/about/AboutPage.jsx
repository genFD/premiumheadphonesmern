import React from 'react';
import styled from 'styled-components';
import { assets } from '../../assets/assets';
import { HeroAbout } from '../../components';
import { useProductsContext } from '../../context/products_context';

const AboutPage = () => {
  return (
    <>
      <HeroAbout />
      <Wrapper className='page section section-center'>
        <img src={assets.story} alt='headphones' />
        <article>
          <div className='title'>
            <h2>our story</h2>
            <div className='underline'></div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            quaerat, modi doloremque necessitatibus eum dolor nesciunt delectus,
            voluptate blanditiis, obcaecati beatae ab aut ipsa consequuntur
            tempora cumque. Ut quo enim vero odio minus nostrum eveniet,
            doloribus veritatis dolorem unde ipsum, voluptatibus totam.
            Explicabo, quas libero! Laborum incidunt minima consequatur ratione?
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
