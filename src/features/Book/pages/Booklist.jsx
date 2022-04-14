import React from "react";
import { useSelector } from "react-redux";
import { Book } from "./Book";
import styles from "./Book.module.css";
import { Watch } from "react-loader-spinner";

function Booklist() {
  const { bookList, bookLoader } = useSelector((state) => state.book);

  return (
    <div className={styles.book__list__wrapper}>
      {bookLoader ? (
        <Watch width={100} height={100} color="#333" />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export { Booklist };
