import React from "react";
import { AuthContext } from "./AuthProvider";
export const CartContext = React.createContext();

export default class CartProvider extends React.Component {
  state = {
    localStorageCart: JSON.parse(localStorage.getItem("cart")),
    displayCart: [],
    total: 0,
    settingDisplayCart: false,
  };

  // setter function for localStorageCart state
  setLocalStorageCart = (newCart) =>
    this.setState({ localStorageCart: newCart });

  // changeDisplayCart gets the cart from context that contains book objects with less properties and update displayCart state with book objects with more properties

  changeDisplayCart = (currentCart) => {
    // currentCart can be null, if no cart is set in localStorage
    if (currentCart) {
      this.setState({ settingDisplayCart: true });
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
        .finally(() => this.setState({ settingDisplayCart: false }));
    } else {
      // set displayCart and total for null value of currentCart
      this.setState({ displayCart: [], total: 0 });
    }
  };

  // calculate the total product price or quantity based on the value of isPrice
  totalPriceOrQuantity = (cart, isPrice = true) => {
    const initialTotal = 0;

    // just logged out user cart will be undefined
    // so instead of undefined we are returning 0 to match the displayCart quantity after setState
    if (cart === null || cart.length === 0) {
      return initialTotal;
    }

    const total = cart.reduce((sum, cartBook) => {
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
  componentDidUpdate() {
    const { user, isLoading } = this.context;
    const { localStorageCart } = this.state;

    // will use this cart to get displayCart
    let cart;

    // if user exists use the user object
    if (!isLoading && user.email) {
      cart = user.cart;
    } else {
      // if user not logged in
      cart = localStorageCart;
    }

    // from context
    const totalProductInCart = this.totalPriceOrQuantity(cart, false);
    // from displayCart
    const totalProductInDisplayCart = this.totalPriceOrQuantity(
      this.state.displayCart,
      false
    );
    // settingDisplayCart is letting the fetch to be done and update displayCart
    if (
      !this.state.settingDisplayCart &&
      totalProductInCart !== totalProductInDisplayCart
    ) {
      this.changeDisplayCart(cart);
    }
  }

  render() {
    const { children } = this.props;
    return (
      <CartContext.Provider
        value={{ ...this.state, setLocalStorageCart: this.setLocalStorageCart }}
      >
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
