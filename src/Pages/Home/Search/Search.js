import React from "react";
import searchIcon from "../../../icons/search.png";

export default class Search extends React.Component {
  render() {
    const { searchText, handleInputChange } = this.props;
    return (
      <div className="flex items-center rounded bg-slate-100 pl-2 w-2/5 mx-auto my-20">
        <img className="h-6 w-6" src={searchIcon} alt="search-icon" />
        <input
          className="w-full bg-transparent outline-none placeholder:text-slate-400 px-3 py-4"
          type="search"
          name=""
          id=""
          value={searchText}
          onChange={handleInputChange}
          placeholder="Search Book"
        />
        {/* <button className="rounded-r bg-blue-custom text-white px-9 py-4 hover:bg-violet-500 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-100">
          Search
        </button> */}
      </div>
    );
  }
}
