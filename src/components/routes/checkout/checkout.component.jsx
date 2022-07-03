// import { useContext } from "react";
import { useSelector } from "react-redux";
// import { CartContext } from "../../../context/cart.context";
import {
  selectCartItems,
  selectCartTotal,
} from "../../../store/cart/cart.selector";
import CheckoutHeader from "../../checkout-header/header-block.component";
import CheckoutItem from "../../checkout-item/checkout-item.component";
import "./checkout.styles.scss";

const CheckOut = () => {
  // const { cartItems, cartTotal } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <>
      <div className="checkout-container">
        <div className="checkout-header">
          <CheckoutHeader header="Product" />
          <CheckoutHeader header="Description" />
          <CheckoutHeader header="Quantity" />
          <CheckoutHeader header="Price" />
          <CheckoutHeader header="Remove" />
        </div>
        {cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}
        <div className="total">
          <span className="total">TOTAL: ${cartTotal} </span>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
