import React from "react";

export default class Cart extends React.Component {
  state = {
    displayCart: [],
    changeDisplayCart: (currentCart) => {
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
    },
  };

  // componentDidMount lifecycle method is called everytime the component mounts
  componentDidMount() {
    const currentCart = this.props.user.cart;
    // if someone reloads the page, currentCart will be undefined as there will be an empty user object
    // but if someone navigates through Link, currentCart will not be undefined
    if (currentCart) {
      this.state.changeDisplayCart(currentCart);
    }
  }

  // componentDidUpdate is called after props and states change. And surely after all other methods calling done. Point to be noted that it is not called after the first render.
  componentDidUpdate({ user }) {
    const prevCart = user.cart;
    const currentCart = this.props.user.cart;
    if (prevCart?.length !== currentCart?.length) {
      this.state.changeDisplayCart(currentCart);
    }
  }

  render() {
    const { displayCart } = this.state;
    // calculate the total price
    const initialTotal = 0;
    const total = displayCart.reduce((sum, displayCartBook) => {
      return sum + displayCartBook.price * displayCartBook.quantity;
    }, initialTotal);
    return (
      <div className="mt-8 space-y-4">
        <h1 className="text-3xl">Checkout</h1>
        <div className="p-4 shadow-md">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                {["Description", "Quantity", "Price"].map((header) => (
                  <th
                    className="text-left p-1 text-slate-400 font-medium text-sm"
                    key={Math.random()}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-medium">
              {displayCart.map((displayCartBook) => (
                <tr key={Math.random().toString()}>
                  <td className="px-1 py-3">{displayCartBook.title}</td>
                  <td className="block px-4 py-3">
                    {displayCartBook.quantity}
                  </td>
                  <td className="px-1 py-3">
                    ${displayCartBook.price * displayCartBook.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t font-bold bg-slate-100">
              <tr>
                <td className="px-1 py-4" colSpan={2}>
                  Total
                </td>
                <td className="px-1 py-4">${total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <button className="rounded-xl bg-blue-custom text-white px-5 py-4 hover:bg-violet-500 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-100 ml-auto block">
          Checkout
        </button>
      </div>
    );
  }
}
