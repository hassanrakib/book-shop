import React from "react";
import { AuthContext } from "./AuthProvider";
export const CartContext = React.createContext();

export default class CartProvider extends React.Component {
  state = { displayCart: [], total: 0, isLoading: false };

  // changeDisplayCart gets the cart from context that contains book objects with less properties and update displayCart state with book objects with more properties
  changeDisplayCart = (currentCart) => {
    this.setState({ isLoading: true });
    Promise.all(
      currentCart.map((book) =>
        fetch(`http://localhost:5000/books/${book.id}`)
          .then((res) => res.json())
          .then((displayCartBook) => ({
            quantity: book.quantity,
            ...displayCartBook,
          }))
      )
    )
      .then((displayCart) => {
        this.setState({ displayCart });
        const totalPrice = this.totalPriceOrQuantity(displayCart);
        this.setState({ total: totalPrice });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  // calculate the total product price or quantity based on the value of isPrice
  totalPriceOrQuantity = (cart, isPrice = true) => {
    const initialTotal = 0;
    const total = cart?.reduce((sum, cartBook) => {
      let toAdd;
      if (isPrice) {
        toAdd = cartBook.price * cartBook.quantity;
      } else {
        toAdd = cartBook.quantity;
      }
      return sum + toAdd;
    }, initialTotal);
    return total;
  };

  // componentDidUpdate will be called after any change happen in context
  componentDidUpdate(prevPorps, prevState) {
    // from context
    const totalProductInCart = this.totalPriceOrQuantity(
      this.context.user.cart,
      false
    );
    // from displayCart
    const totalProductInDisplayCart = this.totalPriceOrQuantity(
      this.state.displayCart,
      false
    );
    // isLoading is letting the fetch to be done and update displayCart
    if (
      !this.state.isLoading &&
      totalProductInCart !== totalProductInDisplayCart
    ) {
      this.changeDisplayCart(this.context.user.cart);
    }
  }

  render() {
    const { children } = this.props;
    const { displayCart, total } = this.state;
    return (
      <CartContext.Provider value={{ displayCart, total }}>
        {children}
      </CartContext.Provider>
    );
  }
}

CartProvider.contextType = AuthContext;

// :: equivalent functional component :: //

// import { useEffect } from "react";
// import { useState } from "react";
// import useAuth from "../hooks/useAuth";

/*export default function CartProvider({ children }) {
  const { user } = useAuth();
  
  const [displayCart, setDisplayCart] = useState([]);
  const [total, setTotal] = useState(0);

  const changeDisplayCart = (currentCart) => {
    Promise.all(
      currentCart.map((book) =>
        fetch(`http://localhost:5000/books/${book.id}`)
          .then((res) => res.json())
          .then((displayCartBook) => ({
            quantity: book.quantity,
            ...displayCartBook,
          }))
      )
    )
      .then((displayCart) => {
        setDisplayCart(displayCart);
      })
      .then(() => {
        const initialTotal = 0;
        const total = displayCart.reduce((sum, displayCartBook) => {
          return sum + displayCartBook.price * displayCartBook.quantity;
        }, initialTotal);
        setTotal(total);
      });
  };

  useEffect(() => {
    if (user.cart) {
      changeDisplayCart(user.cart);
    }
  }, [user]);

  return (
    <CartContext.Provider value={{ displayCart, total }}>
      {children}
    </CartContext.Provider>
  );
}*/
