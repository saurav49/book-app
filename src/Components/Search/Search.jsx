import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBookBySearchItem } from "../../features/Book/BookSlice";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ searchTerm }, getBookBySearchItem);
    dispatch(getBookBySearchItem(searchTerm));
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="searchTerm"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </div>
  );
}

export { Search };
