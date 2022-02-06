import React, { useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import {
  ADD_TO_CART,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';
import reducer from '../reducers/cartReducers';

const getCartFromLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'));
  } else {
    return [];
  }
};
const getShippingAddressFromLocalStorage = () => {
  let shippingAddress = localStorage.getItem('shippingAddress');
  if (shippingAddress) {
    return JSON.parse(localStorage.getItem('shippingAddress'));
  } else {
    return {};
  }
};
const getpaymentMethodFromLocalStorage = () => {
  let shippingAddress = localStorage.getItem('paymentMethod');
  if (shippingAddress) {
    return JSON.parse(localStorage.getItem('paymentMethod'));
  } else {
    return {};
  }
};
const initialState = {
  cart: getCartFromLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping: 534,
  taxes: 223,
  shippingAddress: getShippingAddressFromLocalStorage(),
  paymentMethod: getpaymentMethodFromLocalStorage(),
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const addToCart = async (id, quantity) => {
  //   const { data } = await axios.get(`/api/products/${id}`);
  //   // const { data } = await axios.get('/api/products/61f6c047b1d6d2f7fb812048');
  //   console.log(data);
  //   dispatch({
  //     type: ADD_TO_CART,
  //     payload: {
  //       product: data._id,
  //       name: data.name,
  //       image: data.image,
  //       price: data.price,
  //       quantity: quantity,
  //       countInStock: data.countInStock,
  //     },
  //   });
  // };

  const addToCart = (id, name, image, price, quantity, countInStock) => {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        id,
        name,
        image,
        price,
        quantity,
        countInStock,
      },
    });
  };

  // remove item
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  // toggle amount
  const updateAmount = (id, value) => {
    console.log(id, value);
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };

  const saveShippingAddress = (data) => {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };

  const savePaymentMethod = (data) => {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    });

    localStorage.setItem('paymentMethod', JSON.stringify(data));
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]);
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        updateAmount,
        saveShippingAddress,
        savePaymentMethod,
      }}>
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
