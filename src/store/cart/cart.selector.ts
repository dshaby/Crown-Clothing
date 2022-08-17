import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartState } from "./cart.reducer";

// Parent
const selectCartReducer = (state: RootState): CartState => state.cart;

// child (memoized)
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);
// child (memoized)

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

// grandchild! (memoized)
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
    0
  )
);
