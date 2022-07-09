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
    const { searchText, changeSearchLoading } = this.props;
    const { books } = this.state;
    if (prevProps.searchText !== searchText) {
      changeSearchLoading(true);
      setTimeout(() => {
        const filteredBooks = books.filter((book) => {
          return book.title.toLowerCase().includes(searchText.toLowerCase());
        });
        this.setState({ displayBooks: filteredBooks });
        changeSearchLoading(false);
      }, 1000);
    }
  }

  render() {
    const { displayBooks } = this.state;
    const { searchText } = this.props;
    return (
      <div>
        {searchText ? (
          <p className="text-xl">Search results for "{searchText}"</p>
        ) : null}
        <div className="grid grid-cols-3-custom justify-center gap-8">
          {displayBooks.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </div>
      </div>
    );
  }
}
