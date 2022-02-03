import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';
import { ADD_TO_CART, REMOVE_CART_ITEM } from '../actions';

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, name, image, price, quantity, countInStock } = action.payload;
      const existItem = state.cart.find((i) => i.id === id);
      if (existItem) {
        const tempCart = state.cart.map((item) => {
          if (item.id === id) {
            let newQuantity = Number(item.quantity) + quantity;
            if (newQuantity > countInStock) {
              newQuantity = countInStock;
            }
            return {
              ...item,
              quantity: newQuantity,
            };
          } else {
            return item;
          }
        });
        return {
          ...state,
          cart: tempCart,
        };
      } else {
        const newItem = {
          id,
          name,
          image,
          price,
          quantity,
          countInStock,
        };
        return {
          ...state,
          cart: [...state.cart, newItem],
        };
      }
    case REMOVE_CART_ITEM:
      const tempCart = state.cartItems.filter((i) => i.id !== action.payload);
      return {
        ...state,
        cartItems: tempCart,
      };
      // case CART_SAVE_SHIPPING_ADDRESS:
      //   return {
      //     ...state,
      //     shippingAddress: action.payload,
      //   };
      // case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
export default cartReducer;
