import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id;
  });

  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToDelete) => {
  if (productToDelete.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === productToDelete.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

const addItemToCart = (productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  updateCartItemsReducer(newCartItems);
};

const removeItemFromCart = (productToDelete) => {
  const newCartItems = removeCartItem(cartItems, productToDelete);
  updateCartItemsReducer(newCartItems);
};

const clearItemFromCart = (cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  updateCartItemsReducer(newCartItems);
};

// soon, add one for updatingCartItems
