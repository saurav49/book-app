import React from "react";
import styles from "./Book.module.css";

function Book({ id, title, subtitle, publishedDate, authors, imageLinks }) {
  return (
    <div key={id} className={styles.book__wrapper}>
      <img src={imageLinks.thumbnail} alt="book" className={styles.book__img} />
      <div className={styles.book__desc}>
        <h3>{title}</h3>
        <p className={styles.book__subtitle}>{subtitle}</p>
        <p className={styles.book__author__year}>
          {authors.map((authorName) => {
            return <span>{authorName} </span>;
          })}
          | <span>{publishedDate}</span>
        </p>
      </div>
    </div>
  );
}

export { Book };
