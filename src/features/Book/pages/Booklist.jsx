import React, { useCallback, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Book } from "./Book";
import styles from "./Book.module.css";
import { Watch } from "react-loader-spinner";
import { getBookBySearchItem } from "../BookSlice";

function Booklist() {
  const [pageNumber, setPageNumber] = useState(1);
  const { bookList, bookLoader, hasMore } = useSelector((state) => state.book);
  const dispatch = useDispatch();

  const observer = useRef();
  const lastBookElementEl = useCallback(
    (node) => {
      if (bookLoader) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("here");
          setPageNumber((prevPageNum) => prevPageNum + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [bookLoader, hasMore]
  );

  useEffect(() => {
    localStorage.getItem("recently__searched") &&
      dispatch(
        getBookBySearchItem({
          query: JSON.parse(localStorage.getItem("recently__searched")),
          pageNumber: pageNumber,
        })
      );
    // eslint-disable-next-line
  }, [pageNumber]);

  return (
    <div className={styles.book__list__wrapper}>
      {bookLoader ? (
        <Watch width={100} height={100} color="#333" />
      ) : (
        <>
          {bookList &&
            bookList.length > 0 &&
            bookList.map((bookDetail, index) => {
              if (bookList.length === index + 1) {
                return (
                  <Book
                    key={`${bookDetail.id}${index}`}
                    id={bookDetail.id}
                    title={bookDetail.volumeInfo.title}
                    subtitle={bookDetail.volumeInfo.subtitle}
                    publishedDate={bookDetail.volumeInfo.publishedDate}
                    authors={bookDetail.volumeInfo.authors}
                    imageLinks={bookDetail.volumeInfo.imageLinks}
                    saleInfo={bookDetail.saleInfo}
                    ref={lastBookElementEl}
                  />
                );
              } else {
                return (
                  <Book
                    key={bookDetail.id}
                    id={bookDetail.id}
                    title={bookDetail.volumeInfo.title}
                    subtitle={bookDetail.volumeInfo.subtitle}
                    publishedDate={bookDetail.volumeInfo.publishedDate}
                    authors={bookDetail.volumeInfo.authors}
                    imageLinks={bookDetail.volumeInfo.imageLinks}
                    saleInfo={bookDetail.saleInfo}
                  />
                );
              }
            })}
        </>
      )}
    </div>
  );
}

export { Booklist };
