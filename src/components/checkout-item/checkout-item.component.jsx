// import { useContext } from "react";
// import { CartContext } from "../../context/cart.context";
import { useSelector } from "react-redux";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  // const { addItemToCart, removeItemFromCart, clearItemFromCart } =
  // useContext(CartContext);
  const { imageUrl, name, quantity, price } = cartItem;
  const cartItems = useSelector(selectCartItems);

  const addItemHandler = () => {
    addItemToCart(cartItems, cartItem);
  };

  const removeItem = () => {
    removeItemFromCart(cartItems, cartItem);
  };

  const clearItemHandler = () => {
    clearItemFromCart(cartItems, cartItem);
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItem}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
