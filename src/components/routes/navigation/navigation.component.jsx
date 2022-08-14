import { Link, Outlet } from "react-router-dom";
import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
} from "./navigation.styles.jsx";
import { ReactComponent as Logo } from "../../../assets/crown.svg";
// import { useContext } from "react";
import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";
// import { CartContext } from "../../../context/cart.context";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/user/user.selector.js";
import { selectIsCartOpen } from "../../../store/cart/cart.selector.ts";
import { signOutStart } from "../../../store/user/user.action.js";
const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  // const { isCartOpen } = useContext(CartContext);

  const signOutHandler = () => dispatch(signOutStart());
  //   try {
  //     // await signOutUser();

  //   } catch (err) {
  //     alert(err.message);
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <Logo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
          {currentUser ? (
            <NavLink onClick={signOutHandler} className="nav-link" to="/auth">
              LOG OUT
            </NavLink>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
