import React from "react";
import Books from "../Books/Books";
import Search from "../Search/Search";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchLoading: false,
    };
  }

  changeSearchLoading = (boolean) => {
    this.setState({ searchLoading: boolean });
  };

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({ searchText: e.target.value });
  };

  render() {
    return (
      <>
        <Search
          handleInputChange={this.handleInputChange}
          searchText={this.state.searchText}
          searchLoading={this.state.searchLoading}
        />
        <Books
          changeSearchLoading={this.changeSearchLoading}
          searchText={this.state.searchText}
        />
      </>
    );
  }
}
