import "./cart-item.styles.scss";
import {FC, memo} from "react";
import { CartItem as TCartItem} from "../../store/cart/cart.types";

type CartItemProps = {
  cartItem: TCartItem
}

const CartItem: FC<CartItemProps> = memo(( {cartItem} ) => {
  const { imageUrl, name, price, quantity } = cartItem;

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
});

export default CartItem;
