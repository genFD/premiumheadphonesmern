import { USER_UPDATE_PROFILE_RESET } from '../actions';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from '../constants/userConstants';

const userReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { user_login_loading: true };

    case USER_LOGIN_SUCCESS:
      return { user_login_loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return {
        user_login_loading: false,
        user_login_error: action.payload,
      };

    case USER_LOGOUT:
      return {};

    case USER_REGISTER_REQUEST:
      return { ...state, user_register_loading: true };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        user_register_loading: false,
        userInfo: action.payload,
      };

    case USER_REGISTER_FAIL:
      return { ...state, loading: false, user_register_error: action.payload };

    case USER_DETAILS_REQUEST:
      return { ...state, user_details_loading: true };

    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        user_details_loading: false,
        user_details: action.payload,
      };

    case USER_DETAILS_FAIL:
      return { ...state, loading: false, user_details_error: action.payload };

    case USER_DETAILS_RESET:
      return { ...state, user: {} };

    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, user_update_profile_loading: true };

    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user_update_profile_loading: false,
        user_update_profile_success: true,
        userInfo: action.payload,
      };

    case USER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        user_update_profile_loading: false,
        user_update_profile_error: action.payload,
      };
    case USER_UPDATE_PROFILE_RESET:
      return {};

    case USER_LIST_REQUEST:
      return { ...state, user_list_loading: true };
    case USER_LIST_SUCCESS:
      return { ...state, user_list_loading: false, users_list: action.payload };
    case USER_LIST_FAIL:
      return {
        ...state,
        user_list_loading: false,
        user_list_error: action.payload,
      };
    case USER_LIST_RESET:
      return { users_list: [] };

    case USER_DELETE_REQUEST:
      return { ...state, user_delete_loading: true };
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        user_delete_loading: false,
        user_delete_success: true,
      };
    case USER_DELETE_FAIL:
      return {
        user_delete_loading: false,
        user_delete_error: action.payload,
      };
    case USER_UPDATE_REQUEST:
      return { ...state, user_edit_loading: true };

    case USER_UPDATE_SUCCESS:
      return { ...state, user_edit_loading: false, user_edit_success: true };

    case USER_UPDATE_FAIL:
      return {
        ...state,
        user_edit_loading: false,
        user_edit_error: action.payload,
      };
    case USER_UPDATE_RESET:
      return {
        user: {},
      };

    default: {
      throw new Error(`No matching ${action.type} action type`);
    }
  }
};

// export const userUpdateReducer = (state = { user: {} }, action) => {
//   switch (action.type) {
//     case USER_UPDATE_REQUEST:
//       return { loading: true };
//     case USER_UPDATE_SUCCESS:
//       return { loading: false, success: true };
//     case USER_UPDATE_FAIL:
//       return { loading: false, error: action.payload };
//     case USER_UPDATE_RESET:
//       return {
//         user: {},
//       };
//     default:
//       return state;
//   }
// };

export default userReducer;
