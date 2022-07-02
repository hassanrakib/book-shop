export default function Book({book}) {
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
        <button className="rounded-xl bg-blue-custom text-white px-8 py-3 hover:bg-violet-500 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-100">Buy Now</button>
      </div>
    </div>
  );
}
