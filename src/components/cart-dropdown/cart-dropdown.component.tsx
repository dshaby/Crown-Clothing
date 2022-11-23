import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {
  CartItems,
  CartDropdownContainer,
  EmptyMessage,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  
  const cartItems = useSelector(selectCartItems);

  let navigate = useNavigate();

  const goToCheckoutHandler = useCallback(() => {
    navigate("/checkout");
    // eslint-disable-next-line
  }, []); //don't add navigate as dependency, it's value doesn't change

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
