import React from "react";
import Book from "../Book/Book";

export default class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    fetch("books.json")
      .then((res) => res.json())
      .then((books) => this.setState({ books }));
  }

  render() {
    const { books } = this.state;
    console.log(books);
    return (
      <div className="grid grid-cols-3-custom justify-center gap-8">
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    );
  }
}
