import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";

export default function Book({ book }) {
  const { user, setUser, anonymousUserCart, setAnonymousUserCart } = useAuth();
  const [isBuying, setIsBuying] = useState(false);
  const [isBought, setIsBought] = useState(false);

  // set isBuying to false
  const setIsBuyingToFalse = function () {
    setTimeout(() => {
      setIsBuying(false);
    }, 2000);
  };

  // confirm someone after buying done through isBought state
  const showBought = function () {
    setIsBought(true);
    setTimeout(() => {
      setIsBought(false);
    }, 4000);
  };

  const handleBuyNow = () => {
    if (user.email) {
      // buying operations starts
      setIsBuying(true);

      // get the cart of the user
      const cart = [...user.cart];

      // check whether the book that user wants to buy already exists in cart
      const bookAlreadyInCart = cart.find((bookInCart) => {
        return bookInCart.id == book.id;
      });

      // if the book exists, then just update the book quantity. else push a new book to the cart
      if (bookAlreadyInCart) {
        bookAlreadyInCart.quantity += 1;
      } else {
        cart.push({ id: book.id, quantity: 1 });
      }

      // finally send the updated cart to the backend
      fetch(`http://localhost:5000/users/${user.uid}/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updatedCart: cart,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.acknowledged) {
            setUser({ ...user, cart });

            // buying operations ends
            setIsBuyingToFalse();

            // showBought holds isBought to true for two seconds
            showBought();
          }
        });
    } else {
      // use of local storage for anonymous user

      let cart;

      // try to get the cart from local storage
      let cartInLocalStorage = anonymousUserCart;

      // if cart found in local storage, copy it to cart variable
      if (cartInLocalStorage) cart = [...cartInLocalStorage];

      // if no cart in storage, initialize the cart with an empty array
      if (!cartInLocalStorage) cart = [];

      // check whether the book that user wants to buy already exists in cart
      const bookAlreadyInCart = cart.find((bookInCart) => {
        return bookInCart.id == book.id;
      });

      // if the book exists, then just update the book quantity. else push a new book to the cart
      // finally update the cart in local storage
      if (bookAlreadyInCart) {
        bookAlreadyInCart.quantity += 1;
      } else {
        cart.push({ id: book.id, quantity: 1 });
      }

      // update anonymousUserCart
      setAnonymousUserCart(cart);
      // update cart in localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  return (
    <div className="p-3 shadow-sm rounded-xl">
      <div className="bg-neutral-100 py-7 px-11 rounded-2xl">
        <img className="h-80 mx-auto" src={book.img} alt="book-image" />
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold">{book.title}</p>
        <p className="text-slate-500">{book.author}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="font-black text-4xl text-blue-custom">${book.price}</p>
        <button
          onClick={handleBuyNow}
          className={`${
            isBuying
              ? "cursor-not-allowed"
              : isBought && "cursor-not-allowed ring-green-900"
          } w-32 block rounded bg-slate-100 text-blue-custom text-center py-3 hover:bg-white focus:outline-none ring-1 ring-blue-custom shadow`}
        >
          {isBuying ? (
            <Loading className="h-6 mx-auto" />
          ) : isBought ? (
            <span className="text-green-900">Bought</span>
          ) : (
            "Buy Now"
          )}
        </button>
      </div>
    </div>
  );
}
