import React from "react";

// fake data of orders
const orders = [
  {
    description: "Stuff You Should Know",
    quantity: 1,
    pricePerBook: 234,
  },
  {
    description: "Eloquent JavaScript",
    quantity: 3,
    pricePerBook: 154,
  },
];

export default class Cart extends React.Component {
  render() {
    // calculate the total price
    const initialValue = 0;
    const total = orders.reduce((sum, current) => {
      return sum + current.pricePerBook * current.quantity;
    }, initialValue);
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
              {orders.map((order) => (
                <tr key={Math.random().toString()}>
                  <td className="px-1 py-3">{order.description}</td>
                  <td className="block px-4 py-3">{order.quantity}</td>
                  <td className="px-1 py-3">
                    ${order.pricePerBook * order.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t font-bold">
              <tr>
                <td className="px-1 py-4" colSpan={2}>
                  Total
                </td>
                <td className="px-1 py-4">${total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <button className="rounded-xl bg-blue-custom text-white px-5 py-4 hover:bg-violet-500 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-100 ml-auto block">Checkout</button>
      </div>
    );
  }
}
