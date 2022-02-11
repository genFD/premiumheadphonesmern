import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Loader, Message, TableOrders } from '../../../components';

import { useOrderContext } from '../../../context/order_context';
import { useUserContext } from '../../../context/user_context';

const OrdersList = () => {
  const navigate = useNavigate();
  const {
    orders_list_loading: loading,
    orders_list_error: error,
    listOrders,
    order_deliver_success: successDeliver,
  } = useOrderContext();
  const { userInfo } = useUserContext();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      listOrders();
    } else {
      navigate('/login');
    }
  }, [userInfo, successDeliver]);
  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message error='error'>There was an error</Message>
      ) : (
        <article className='main'>
          <TableOrders />
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
export default OrdersList;
