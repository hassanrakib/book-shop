import React from "react";
import Book from "../Book/Book";

export default class Books extends React.Component {
  state = { books: [], displayBooks: [] };

  componentDidMount() {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((books) => {
        // i will use books to filter
        this.setState({ books });
        // to show products initially
        this.setState({ displayBooks: books });
      });
  }

  // when the searchText changes, this component will be re-rendered with filtered products
  componentDidUpdate(prevProps) {
    const { searchText } = this.props;
    const { books } = this.state;
    if (prevProps.searchText !== searchText) {
      const filteredBooks = books.filter((book) => {
        return book.title.toLowerCase().includes(searchText.toLowerCase());
      });
      this.setState({ displayBooks: filteredBooks });
    }
  }

  render() {
    const { displayBooks } = this.state;
    return (
      <div className="grid grid-cols-3-custom justify-center gap-8">
        {displayBooks.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    );
  }
}
