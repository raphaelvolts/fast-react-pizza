import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = item
      state.cart.push(action.payload);
    },
    removeItem(state, action) {
      // payload = pizzaID
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaID
      state.cart = state.cart.map((item) =>
        item.pizzaId === action.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: (item.quantity + 1) * item.unitPrice,
            }
          : item,
      );
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaID
      // state.cart = state.cart.map((item) =>
      //   item.pizzaId === action.payload
      //     ? {
      //         ...item,
      //         quantity: item.quantity - 1,
      //         totalPrice: (item.quantity - 1) * item.unitPrice,
      //       }
      //     : item,
      // );
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item.quantity === 1)
        return cartSlice.caseReducers.removeItem(state, action);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export function getTotalCartQuantity(state) {
  return state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
}
export function getTotalCartValue(state) {
  return state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
}

export const getQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity;
