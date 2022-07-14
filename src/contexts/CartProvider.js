import React from "react";
import { AuthContext } from "./AuthProvider";

export const CartContext = React.createContext();

export default class CartProvider extends React.Component {
  state = { displayCart: [], context: {} };

  changeDisplayCart = (currentCart) => {
    Promise.all(
      currentCart.map((book) =>
        fetch(`http://localhost:5000/books/${book.bookId}`)
          .then((res) => res.json())
          .then((displayCartBook) => ({
            quantity: book.bookQuantity,
            ...displayCartBook,
          }))
      )
    ).then((displayCart) => this.setState({ displayCart }));
  };

  // componentDidUpdate will be called after any change happen in context
  componentDidUpdate() {
    // check the current context with the state context
    if (
      JSON.stringify(this.state.context.user) !==
      JSON.stringify(this.context.user)
    ) {
      this.setState({ context: this.context });
      this.changeDisplayCart(this.context.user.cart);
    }
  }

  render() {
    const { children } = this.props;
    const { displayCart } = this.state;

    // calculate the total price
    const initialTotal = 0;
    const total = displayCart.reduce((sum, displayCartBook) => {
      return sum + displayCartBook.price * displayCartBook.quantity;
    }, initialTotal);

    return (
      <CartContext.Provider value={{displayCart, total}}>
        {children}
      </CartContext.Provider>
    );
  }
}

CartProvider.contextType = AuthContext;
