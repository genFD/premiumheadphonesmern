import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  BackButton,
  Loader,
  Message,
  Table,
  TableProducts,
} from '../../../components';
import { useProductsContext } from '../../../context/products_context';
import { useUserContext } from '../../../context/user_context';

const ProductsList = () => {
  const navigate = useNavigate();
  const {
    products_loading: loading,
    products_error: error,
    products,
    fetchProducts,
    product_create_loading: loadingCreate,
    product_create_success: successCreate,
    product_create_error: errorCreate,
    product_delete_loading: loadingDelete,
    product_delete_success: successDelete,
    product_delete_error: errorDelete,
    product: createdProduct,
  } = useProductsContext();

  const { userInfo } = useUserContext();
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      fetchProducts();
    }
  }, [successDelete, userInfo, successDelete, successCreate, createdProduct]);

  return (
    <Wrapper>
      <BackButton />
      {loadingDelete && <Loader />}
      {errorDelete && <Message error='error'>There was an error</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message error='error'>There was an error</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message error='error'>There was an error</Message>
      ) : (
        <article className='main'>
          <TableProducts />
        </article>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .main {
    height: 100vh;
    display: grid;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* margin-top: 8rem; */
  }
`;

export default ProductsList;
