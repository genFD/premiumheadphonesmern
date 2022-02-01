import React from 'react';
import styled from 'styled-components';
import { assets } from '../../assets/assets';
import { services } from '../../utils/constants';

const Services = () => {
  return (
    <Wrapper>
      <div className='section-center'>
        <article className='header'>
          <h3>
            Best audio products <br />
            selection
          </h3>
          <p className='services-description'>
            Curated by the best audiophiles, specialised in quality Hi-fi and
            high-fidelity sound reproduction.
          </p>
        </article>
        <div className='services-center'>
          {services.map((service) => {
            const { id, icon, title, text } = service;
            return (
              <article key={id} className='service'>
                <span className='icon'>{icon} </span>
                <h4>{title}</h4>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h3,
  h4 {
    color: var(--slate);
  }
  padding: 5rem 0;

  background: var(--light-navy);

  .header h3 {
    margin-bottom: 2rem;
  }
  p {
    margin-bottom: 0;
    line-height: 1.8;
    color: var(--slate);
  }
  .services-description {
    max-width: 20rem;
  }

  .services-center {
    margin-top: 4rem;
    display: grid;
    gap: 2.5rem;
  }
  .service {
    background: var(--dark-navy);
    text-align: center;
    padding: 2.5rem 2rem;
    border-radius: var(--radius);
    transition: var(--transition);
    p {
      color: var(--clr-primary-2);
    }
  }
  .service:hover {
    border: 1px solid var(--green);
  }

  span {
    width: 4rem;
    height: 4rem;
    display: grid;
    margin: 0 auto;
    place-items: center;
    margin-bottom: 1rem;
    border-radius: 50%;
    background: var(--green);
    color: var(--dark-navy);
    svg {
      font-size: 2rem;
    }
  }
  @media (min-width: 768px) {
    .header {
      display: flex;
      justify-content: space-between;
    }
  }
  @media (min-width: 576px) {
    .services-center {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
  @media (min-width: 1280px) {
    padding: 0;
    .section-center {
      transform: translateY(5rem);
    }
  }
`;

export default Services;
