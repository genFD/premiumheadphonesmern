import React, { useContext, useState, useEffect, useReducer } from 'react';
import {
  SIDE_DRAWER_CLOSE,
  SIDE_DRAWER_OPEN,
  CART_DRAWER_CLOSE,
  CART_DRAWER_OPEN,
} from '../actions';

import reducer from '../reducers/productReducers';

const { createContext } = React;

const initialState = {
  isSideDrawerOpen: false,
  isCartDrawerOpen: false,
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

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSideDrawer,
        closeSideDrawer,
        openCartDrawer,
        closeCartDrawer,
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
