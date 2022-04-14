import React from "react";
import styles from "./Book.module.css";
import { useNavigate } from "react-router";

function Book({ id, title, subtitle, publishedDate, authors, imageLinks }) {
  const navigate = useNavigate();

  return (
    <div key={id} className={styles.book__wrapper}>
      <img
        src={imageLinks.thumbnail}
        alt="book"
        className={styles.book__img}
        onClick={() => navigate(`/book/${id}`)}
      />
      <div className={styles.book__desc}>
        <h3>{title}</h3>
        <p className={styles.book__subtitle}>{subtitle}</p>
        <p className={styles.book__author__year}>
          {authors.map((authorName, index) => {
            return <span key={index}>{authorName} </span>;
          })}
          | <span>{publishedDate}</span>
        </p>
      </div>
    </div>
  );
}

export { Book };
