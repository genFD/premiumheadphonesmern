import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from '../actions';

const orderReducer = (state, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, order_loading: true };

    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        order_loading: false,
        order_success: true,
        order: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return { ...state, order_loading: false, order_error: action.payload };

    case ORDER_DETAILS_REQUEST:
      return { ...state, order_details_loading: true };

    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        order_details_loading: false,
        order_details: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        order_details_loading: false,
        order_details_error: action.payload,
      };
    case ORDER_PAY_REQUEST:
      return { ...state, order_pay_loading: true };

    case ORDER_PAY_SUCCESS:
      return { ...state, order_pay_loading: false, order_pay_success: true };

    case ORDER_PAY_FAIL:
      return {
        ...state,
        order_pay_loading: false,
        order_pay_error: action.payload,
      };

    case ORDER_PAY_RESET:
      return {};

    case ORDER_LIST_MY_REQUEST:
      return {
        ...state,
        order_my_list_loading: true,
      };
    case ORDER_LIST_MY_SUCCESS:
      return {
        ...state,
        order_my_list_loading: false,
        myorders: action.payload,
      };
    case ORDER_LIST_MY_FAIL:
      return {
        ...state,
        order_my_list_loading: false,
        order_my_list_error: action.payload,
      };
    case ORDER_LIST_MY_RESET:
      return { myorders: [] };
    case ORDER_LIST_REQUEST:
      return {
        ...state,
        order_list_loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        order_list_loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return {
        ...state,
        order_list_loading: false,
        order_list_error: action.payload,
      };
    case ORDER_DELIVER_REQUEST:
      return {
        order_deliver_loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        order_deliver_loading: false,
        order_deliver_success: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        order_deliver_loading: false,
        order_deliver_error: action.payload,
      };
    case ORDER_DELIVER_RESET:
      return {};

    default: {
      throw new Error(`No matching ${action.type} action type`);
    }
  }
};

export default orderReducer;

// export const orderDeliverReducer = (state = {}, action) => {
//   switch (action.type) {
//     case ORDER_DELIVER_REQUEST:
//       return {
//         loading: true,
//       };
//     case ORDER_DELIVER_SUCCESS:
//       return {
//         loading: false,
//         success: true,
//       };
//     case ORDER_DELIVER_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     case ORDER_DELIVER_RESET:
//       return {};
//     default:
//       return state;
//   }
// };

// export const orderListMyReducer = (state = { orders: [] }, action) => {
//   switch (action.type) {
//     case ORDER_LIST_MY_REQUEST:
//       return {
//         loading: true,
//       };
//     case ORDER_LIST_MY_SUCCESS:
//       return {
//         loading: false,
//         orders: action.payload,
//       };
//     case ORDER_LIST_MY_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     case ORDER_LIST_MY_RESET:
//       return { orders: [] };
//     default:
//       return state;
//   }
// };

// export const orderListReducer = (state = { orders: [] }, action) => {
//   switch (action.type) {
//     case ORDER_LIST_REQUEST:
//       return {
//         loading: true,
//       };
//     case ORDER_LIST_SUCCESS:
//       return {
//         loading: false,
//         orders: action.payload,
//       };
//     case ORDER_LIST_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };
