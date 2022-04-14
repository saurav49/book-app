import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getBookBySearchItem,
  toggleBookLoader,
} from "../../features/Book/BookSlice";
import styles from "./Search.module.css";
import { BsSearch } from "react-icons/bs";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(toggleBookLoader(true));
    localStorage.setItem("recently__searched", JSON.stringify(searchTerm));
    dispatch(getBookBySearchItem(searchTerm));
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className={styles.search}>
          <input
            type="searchTerm"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Your Favorite Book"
            className={styles.searchTerm}
          />
          <button
            className={styles.searchButton}
            onClick={(e) => handleSearch(e)}
          >
            <BsSearch />
          </button>
        </div>
      </form>
    </div>
  );
}

export { Search };
