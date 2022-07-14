import { CartContext } from "../../../contexts/CartProvider";
import Cart from "../Cart/Cart";

export default function Checkout() {
  return (
    <CartContext.Consumer>
      {({ displayCart, total }) => (
        <Cart displayCart={displayCart} total={total} />
      )}
    </CartContext.Consumer>
  );
}
