import React from "react";
import { useSelector } from "react-redux";
import { Book } from "./Book";
import styles from "./Book.module.css";

function Booklist() {
  const { bookList } = useSelector((state) => state.book);
  console.log(bookList);
  return (
    <div className={styles.book__list__wrapper}>
      {bookList &&
        bookList.length > 0 &&
        bookList.map((bookDetail) => {
          return (
            <Book
              key={bookDetail.id}
              id={bookDetail.id}
              title={bookDetail.volumeInfo.title}
              subtitle={bookDetail.volumeInfo.subtitle}
              publishedDate={bookDetail.volumeInfo.publishedDate}
              authors={bookDetail.volumeInfo.authors}
              imageLinks={bookDetail.volumeInfo.imageLinks}
            />
          );
        })}
    </div>
  );
}

export { Booklist };
