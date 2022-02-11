import React, { useEffect, useState } from 'react';
import { useProductsContext } from '../../context/products_context';
import { Card } from '../../components';
import styled from 'styled-components';

import Loader from '../../components/loader/Loader';
import Message from '../../components/message/Message';

const ProductsList = () => {
  const {
    products_loading: loading,
    products_error: error,
    products,
  } = useProductsContext();

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Wrapper>
      <section className='products'>
        {products.map(({ image, name, price, _id, countInStock }) => {
          return (
            <Card
              key={_id}
              image={image}
              name={name}
              price={price}
              _id={_id}
              countInStock={countInStock}
            />
          );
        })}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .products {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    place-items: center;
    gap: 20px;
    margin-top: 6rem;
    padding: 1rem;
  }
  @media (min-width: 768px) {
    .products {
      padding: 1rem;
    }
  }
`;

export default ProductsList;
