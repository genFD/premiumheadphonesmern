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
  HIDE_NAVBAR,
  SHOW_NAVBAR,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
} from '../actions';

import reducer from '../reducers/productReducers';
import { useUserContext } from './user_context';

const { createContext } = React;

const initialState = {
  hideNav: false,
  isSideDrawerOpen: false,
  isCartDrawerOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
  product: {},
  product_create_loading: false,
  product_create_success: false,
  product_create_error: false,
  product_delete_loading: false,
  product_delete_success: false,
  product_delete_error: false,
  product_edit_loading: false,
  product_edit_success: false,
  product_edit_error: false,
};

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { logout, userInfo } = useUserContext();
  const hideNavBar = () => {
    dispatch({ type: HIDE_NAVBAR });
  };
  const showNavBar = () => {
    dispatch({ type: SHOW_NAVBAR });
  };
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

  const deleteProduct = async (id) => {
    try {
      dispatch({
        type: PRODUCT_DELETE_REQUEST,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`/api/products/${id}`, config);

      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        logout();
      }
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: message,
      });
    }
  };

  const createProduct = async () => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/products`, {}, config);

      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: message,
      });
    }
  };

  const updateProduct = async (product) => {
    try {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
      );

      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: message,
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
        hideNavBar,
        showNavBar,
        deleteProduct,
        createProduct,
        updateProduct,
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
