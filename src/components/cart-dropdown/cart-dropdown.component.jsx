// import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { CartContext } from "../../context/cart.context";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.jsx";
import {
  CartItems,
  CartDropdownContainer,
  EmptyMessage,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  // const { cartItems } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);

  let navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  const dispatch = useDispatch();
  const close = () => {
    dispatch(setIsCartOpen(false));
  };

  return (
    <CartDropdownContainer onMouseLeave={close}>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem cartItem={item} key={item.id} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.base}
        onClick={goToCheckoutHandler}
      >
        CHECKOUT
      </Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
