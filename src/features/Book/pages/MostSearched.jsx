import React from "react";
import { useSelector } from "react-redux";
import styles from "./Book.module.css";

const MostSearched = () => {
  const { searchedQueries } = useSelector((state) => state.book);
  return (
    <div className={styles.most__searched__wrapper}>
      {searchedQueries && searchedQueries.length > 0 && <h3>Most Searched</h3>}
      {searchedQueries &&
        searchedQueries.length > 0 &&
        searchedQueries.slice(0, 3).map(({ query }, index) => {
          return <SearchSnippet searchValue={query} key={index} />;
        })}
    </div>
  );
};

export { MostSearched };

const SearchSnippet = ({ searchValue }) => {
  return (
    <div className={styles.search__snippet__wrapper}>
      <p>{searchValue}</p>
    </div>
  );
};
