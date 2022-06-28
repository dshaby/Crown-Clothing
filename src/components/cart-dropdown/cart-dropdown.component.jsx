import { useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.jsx";
import {
  CartItems,
  CartDropdownContainer,
  EmptyMessage,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const isCartOpen = useSelector(selectIsCartOpen);

  console.log(isCartOpen);

  let navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  const close = () => {
    setIsCartOpen(true);
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
