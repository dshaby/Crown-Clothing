// import { useContext } from "react";
import { useSelector } from "react-redux";
// import { CartContext } from "../../../context/cart.context";
import {
  selectCartItems,
  selectCartTotal,
} from "../../../store/cart/cart.selector";
import CheckoutHeader from "../../checkout-header/header-block.component";
import CheckoutItem from "../../checkout-item/checkout-item.component";
import PaymentForm from "../../payment-form/payment-form.component";
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
          <div > ${cartTotal} </div>
          <div>Tax: 10%: ${(cartTotal*0.10).toFixed(2)}</div>
          <span className="total">TOTAL: ${(1.1*cartTotal).toFixed(2)} </span>

        </div>
        <PaymentForm />
      </div>
    </>
  );
};

export default CheckOut;
