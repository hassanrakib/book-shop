import Cart from "../Cart/Cart";
import { AuthContext } from "../../../contexts/AuthProvider";

export default function Checkout() {
  return (
    <AuthContext.Consumer>
      {({ user }) => <Cart user={user} />}
    </AuthContext.Consumer>
  );
}
