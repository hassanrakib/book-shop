import React from "react";

export default class Cart extends React.Component {
  render() {
    const { displayCart, total } = this.props;
    return (
      <div className="mt-8 mb-3 space-y-4">
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
            <tfoot className="border-t font-bold bg-blue-100">
              <tr>
                <td className="px-1 py-4" colSpan={2}>
                  Total
                </td>
                <td className="px-1 py-4">${total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="pr-4">
          <button className="rounded bg-blue-custom text-white px-6 py-3 hover:bg-violet-500 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-100 ml-auto block">
            Checkout
          </button>
        </div>
      </div>
    );
  }
}
