import React, { useContext, useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import {
  ORDER_LIST_MY_RESET,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_RESET,
} from '../actions';
import reducer from '../reducers/userReducers';
import { useNavigate } from 'react-router-dom';
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  user_login_loading: false,
  user_login_error: false,
  user_register_loading: false,
  user_register_error: false,
  user_details: {},
  user_details_loading: false,
  user_details_error: false,
  user_update_profile_loading: false,
  user_update_profile_success: false,
  user_update_profile_error: false,
  user_list_loading: false,
  users_list: [],
  user_list_error: false,
  user_delete_loading: false,
  user_delete_success: false,
  user_delete_error: false,
  user: {},
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
          'Content-Type': 'application/json',
        },
      };
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
  const resetUserProfile = () => {
    dispatch({ type: USER_UPDATE_PROFILE_RESET });
  };
  const logout = () => {
    localStorage.removeItem('userInfo');

    dispatch({
      type: USER_LOGOUT,
    });
    dispatch({
      type: USER_DETAILS_RESET,
    });
    dispatch({
      type: USER_LIST_RESET,
    });
    resetUserProfile();
  };

  const getUserDetails = async (id) => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST,
      });
      const { userInfo } = state;
      const config = {
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/users/${id}`, config);
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const updateUserProfile = async (user) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      });
      const { userInfo } = state;
      const config = {
        headers: {
          'content-Type': 'Application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(`/api/users/profile`, user, config);
      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const listUsers = async () => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      });

      const { userInfo } = state;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/users`, config);

      dispatch({
        type: USER_LIST_SUCCESS,
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
        type: USER_LIST_FAIL,
        payload: message,
      });
    }
  };

  const deleteUser = async (id) => {
    try {
      dispatch({
        type: USER_DELETE_REQUEST,
      });

      const { userInfo } = state;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/users/${id}`, config);

      dispatch({ type: USER_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: USER_DELETE_FAIL,
        payload: message,
      });
    }
  };

  const updateUser = async (user) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
      });

      const { userInfo } = state;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/api/users/${user._id}`, user, config);

      dispatch({ type: USER_UPDATE_SUCCESS });

      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

      dispatch({ type: USER_DETAILS_RESET });
      // dispatch({ type: USER_UPDATE_RESET });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: message,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        getUserDetails,
        updateUserProfile,
        listUsers,
        deleteUser,
        updateUser,
        resetUserProfile,
      }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
