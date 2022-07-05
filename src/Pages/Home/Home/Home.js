import React from "react";
import Books from "../Books/Books";
import Search from "../Search/Search";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    return (
      <>
        <Search
          handleInputChange={this.handleInputChange}
          searchText={this.state.searchText}
        />
        <Books searchText={this.state.searchText} />
      </>
    );
  }
}
