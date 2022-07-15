import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";

export default function Book({ book }) {
  const { user, setUser } = useAuth();
  const [isBuying, setIsBuying] = useState(false);
  const [isBought, setIsBought] = useState(false);

  // confirm someone after buying done through isBought state
  const showBought = function () {
    setIsBought(true);
    setTimeout(() => {
      setIsBought(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    if (user.email) {
      // buying operations starts
      setIsBuying(true);

      // get the previous cart of the user
      const userCopy = { ...user };
      const prevCart = [...userCopy.cart];

      // check whether the book that user wants to buy already exists in cart
      const bookAlreadyInCart = prevCart.find((bookInCart) => {
        return bookInCart.id == book.id;
      });

      // if the book exists, then just update the book quantity. else push a new book to the cart
      if (bookAlreadyInCart) {
        bookAlreadyInCart.quantity += 1;
      } else {
        prevCart.push({ id: book.id, quantity: 1 });
      }

      // finally send the updated cart to the backend
      fetch(`http://localhost:5000/users/${user.uid}/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updatedCart: prevCart,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.acknowledged) {
            userCopy.cart = prevCart;
            setUser(userCopy);

            // buying operations ends
            setIsBuying(false);

            // showBought holds isBought to true for one second
            showBought();
          }
        });
    } else {
      console.log("wait...");
      // will handle with localStorage
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
              ? "cursor-not-allowed bg-white"
              : isBought && "cursor-not-allowed ring-red-900"
          } w-32 block rounded bg-slate-100 text-blue-custom text-center py-3 hover:bg-white focus:outline-none ring-1 ring-blue-custom shadow`}
        >
          {isBuying ? (
            <Loading className="h-8 text-center" />
          ) : isBought ? (
            <span className="text-red-900">Bought</span>
          ) : (
            "Buy Now"
          )}
        </button>
      </div>
    </div>
  );
}
