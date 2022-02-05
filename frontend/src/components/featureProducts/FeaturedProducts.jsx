import React from 'react';
import { useProductsContext } from '../../context/products_context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Error from '../error/Error';
import Message from '../message/Message';
import Loader from '../loader/Loader';
import Card from '../productcard/Card';

const FeaturedProducts = () => {
  const {
    products_loading: loading,
    products_error: error,
    featured_products: featured,
  } = useProductsContext();
  return loading ? (
    <Loader />
  ) : error ? (
    <Message error='error'>{error}</Message>
  ) : (
    <Wrapper className='section'>
      <div className='title'>
        <h2>featured products</h2>
        <div className='underline'></div>
      </div>
      <div className='section-center featured'>
        {featured.map((product) => {
          return <Card key={product._id} {...product} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--navy);
  height: auto;

  .featured {
    margin: 0 auto;
    display: grid;
    gap: 2.5rem;
    justify-items: center;
  }

  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
  }
`;
export default FeaturedProducts;
