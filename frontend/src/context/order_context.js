import React, { useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import { useUserContext } from './user_context';

import reducer from '../reducers/orderReducers';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from '../actions';

// const getCartFromLocalStorage = () => {
//   let cart = localStorage.getItem('cart');
//   if (cart) {
//     return JSON.parse(localStorage.getItem('cart'));
//   } else {
//     return [];
//   }
// };

const initialState = {
  order: [],
  order_loading: false,
  order_success: false,
  order_error: false,
};

const OrderContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { userInfo } = useUserContext();

  const createOrder = async (order) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      });

      const config = {
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/orders`, order, config);
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  return (
    <OrderContext.Provider
      value={{
        ...state,
        createOrder,
      }}>
      {children}
    </OrderContext.Provider>
  );
};
// make sure use
export const useOrderContext = () => {
  return useContext(OrderContext);
};
export { OrderContext };
