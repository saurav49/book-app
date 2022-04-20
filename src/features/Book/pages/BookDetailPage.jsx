import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { toggleBookLoader, getBookBySearchItem } from "../BookSlice";
import { Watch } from "react-loader-spinner";
import styles from "./Book.module.css";
import placeholderBookImage from "../../../assets/placeholderImage.png";

function BookDetailPage() {
  const dispatch = useDispatch();
  const { bookList, bookLoader } = useSelector((state) => state.book);
  const { id } = useParams();
  const reqdBook = useMemo(
    () => bookList.find((book) => book.id === id),
    [id, bookList]
  );

  useEffect(() => {
    if (bookList && bookList.length === 0) {
      dispatch(toggleBookLoader(true));
      dispatch(
        getBookBySearchItem({
          query: JSON.parse(localStorage?.getItem("recently__searched")),
          pageNumber: 1,
        })
      );
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.book__detail__wrapper}>
      {bookLoader ? (
        <Watch width={100} height={100} color="#333" />
      ) : (
        <>
          {reqdBook && reqdBook.hasOwnProperty("id") && (
            <BookDetail
              title={reqdBook.volumeInfo?.title}
              subtitle={reqdBook.volumeInfo?.subtitle}
              publishedDate={reqdBook.volumeInfo?.publishedDate}
              authors={reqdBook.volumeInfo?.authors}
              imageLinks={reqdBook.volumeInfo?.imageLinks}
              description={reqdBook.volumeInfo?.description}
              pageCount={reqdBook.volumeInfo?.pageCount}
              previewLink={reqdBook.volumeInfo?.previewLink}
            />
          )}
        </>
      )}
    </div>
  );
}

export { BookDetailPage };

const BookDetail = ({
  title,
  subtitle,
  publishedDate,
  authors,
  imageLinks,
  description,
  pageCount,
  previewLink,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.book__detail__wrapper}>
      <button className={styles.back__btn} onClick={() => navigate("/search")}>
        Back
      </button>
      <div className={styles.book__detail}>
        <div className={styles.book__detail__desc}>
          <p className={styles.book__detail__title}>{title}</p>
          <p className={styles.book__detail__subtitle}>{subtitle}</p>
          <p className={styles.book__detail__author__date}>
            {authors &&
              authors.map((authorName, index) => {
                return <span key={index}>{authorName} | </span>;
              })}
            <span>{publishedDate}</span>
          </p>
          <a href={previewLink} className={styles.preview__btn}>
            Preview
          </a>
          <p className={styles.book__detail__desc__text}>{description}</p>
        </div>
        <div className={styles.book__detail__img__wrapper}>
          {imageLinks && imageLinks.hasOwnProperty("smallThumbnail") ? (
            <img
              src={imageLinks?.smallThumbnail}
              alt="book"
              className={styles.book__detail__img}
            />
          ) : (
            <img
              src={placeholderBookImage}
              alt="book"
              className={styles.book__detail__img}
            />
          )}
          <p>page count : {pageCount}</p>
        </div>
      </div>
    </div>
  );
};
