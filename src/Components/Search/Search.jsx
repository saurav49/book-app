import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getBookBySearchItem,
  saveSearchQuery,
  toggleBookLoader,
} from "../../features/Book/BookSlice";
import { MostSearched } from "../../features/Book/pages/MostSearched";
import styles from "./Search.module.css";
import { BsSearch } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { user } = useAuth0();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(toggleBookLoader(true));
    localStorage.setItem("recently__searched", JSON.stringify(searchTerm));
    if (JSON.parse(localStorage.getItem("book__token"))) {
      dispatch(
        saveSearchQuery({
          email: user?.email,
          searchTerm: searchTerm,
          token: JSON.parse(localStorage.getItem("book__token")),
        })
      );
    }
    dispatch(getBookBySearchItem({ query: searchTerm, pageNumber: 0 }));
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
      <MostSearched />
    </div>
  );
}

export { Search };
