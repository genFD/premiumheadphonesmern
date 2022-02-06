import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
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

    default: {
      throw new Error(`No matching ${action.type} action type`);
    }
  }
};

export default orderReducer;

// export const orderDetailsReducer = (
//   state = { loading: true, orderItems: [], shippingAddress: {} },
//   action
// ) => {
//   switch (action.type) {
//     case ORDER_DETAILS_REQUEST: {
//       return { ...state, loading: true };
//     }
//     case ORDER_DETAILS_SUCCESS: {
//       return { loading: false, order: action.payload };
//     }
//     case ORDER_DETAILS_FAIL: {
//       return { loading: false, error: action.payload };
//     }
//     default: {
//       return state;
//     }
//   }
// };

// export const orderPayReducer = (
//   state = { loading: true, orderItems: [], shippingAddress: {} },
//   action
// ) => {
//   switch (action.type) {
//     case ORDER_PAY_REQUEST:
//       return { loading: true };

//     case ORDER_PAY_SUCCESS:
//       return { loading: false, success: true };

//     case ORDER_PAY_FAIL:
//       return { loading: false, error: action.payload };

//     case ORDER_PAY_RESET:
//       return {};
//     default:
//       return state;
//   }
// };

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
