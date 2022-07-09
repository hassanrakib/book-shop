import React from "react";
import searchIcon from "../../../icons/search.png";
import Loading from "../../Shared/Loading/Loading";

export default class Search extends React.Component {
  render() {
    const { searchText, handleInputChange, searchLoading } = this.props;
    return (
      <div className="flex items-center border border-blue-custom rounded bg-slate-100 pl-2 w-2/5 mx-auto my-20">
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
        {/* bg-blue-custom removed */}
        <button className="rounded-r text-blue-custom px-9 py-4 inline-block">
          {searchLoading ? (
            <Loading isLarge={false} height="h-5" width="w-5" />
          ) : (
            "Search"
          )}
        </button>
      </div>
    );
  }
}
