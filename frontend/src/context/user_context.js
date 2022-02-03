import React, { useContext, useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import {
  USER_DETAILS_RESET,
  USER_LIST_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../actions';
import reducer from '../reducers/userReducers';

const getLocalStorage = () => {
  let user = localStorage.getItem('userInfo');
  if (user) {
    return JSON.parse(localStorage.getItem('userInfo'));
  } else {
    return null;
  }
};

const initialState = {
  user_loading: false,
  user_error: false,
  userInfo: getLocalStorage(),
};
const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const login = async (email, password) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
      const config = {
        headers: {
          'content-Type': 'Application/json',
        },
      };
      console.log('dispatch login acivated');
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const register = async (name, email, password) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'content-Type': 'Application/json',
        },
      };
      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      );
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    dispatch({
      type: USER_LOGOUT,
    });
    // dispatch({
    //   type: USER_DETAILS_RESET,
    // });
    // dispatch({
    //   type: USER_LIST_RESET,
    // });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
