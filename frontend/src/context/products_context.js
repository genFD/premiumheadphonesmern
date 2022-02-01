import React, { useContext, useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { products_url as url } from '../utils/constants';

import {
  SIDE_DRAWER_CLOSE,
  SIDE_DRAWER_OPEN,
  CART_DRAWER_CLOSE,
  CART_DRAWER_OPEN,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_FAILED,
} from '../actions';

import reducer from '../reducers/productReducers';

const { createContext } = React;

const initialState = {
  isSideDrawerOpen: false,
  isCartDrawerOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSideDrawer = () => {
    dispatch({ type: SIDE_DRAWER_OPEN });
  };
  const closeSideDrawer = () => {
    dispatch({ type: SIDE_DRAWER_CLOSE });
  };
  const openCartDrawer = () => {
    dispatch({ type: CART_DRAWER_OPEN });
  };
  const closeCartDrawer = () => {
    dispatch({ type: CART_DRAWER_CLOSE });
  };
  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    try {
      const response = await axios.get(`/api/products`);
      const products = response.data;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const fetchSingleProduct = async (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_REQUEST });
    try {
      const response = await axios.get(`/api/products/${id}`);
      const singleProduct = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_PRODUCT_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSideDrawer,
        closeSideDrawer,
        openCartDrawer,
        closeCartDrawer,
        fetchProducts,
        fetchSingleProduct,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

//custom hook
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
export { ProductsContext, ProductsProvider };
