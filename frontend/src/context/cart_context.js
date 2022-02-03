import React, { useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';
import reducer from '../reducers/cartReducers';

const getLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'));
  } else {
    return [];
  }
};
const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping: 534,
  taxes: 223,
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
  // toggle amount
  const updateAmount = (id, value) => {
    console.log(id, value);
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);
  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, updateAmount }}>
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
