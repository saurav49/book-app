import React from "react";
import styles from "./Book.module.css";
import { useNavigate } from "react-router";
import placeholderBookImage from "../../../assets/placeholderImage.png";

const Book = React.forwardRef((props, ref) => {
  const navigate = useNavigate();

  return (
    <div key={props?.id} className={styles.book__wrapper} ref={ref}>
      {props.imageLinks && props.imageLinks.hasOwnProperty("thumbnail") ? (
        <img
          src={props?.imageLinks?.thumbnail}
          alt="book"
          className={styles.book__img}
          onClick={() => navigate(`/book/${props.id}`)}
        />
      ) : (
        <img
          src={placeholderBookImage}
          alt="book"
          className={styles.book__img}
          onClick={() => navigate(`/book/${props.id}`)}
        />
      )}
      <div className={styles.book__desc}>
        <h3>{props?.title}</h3>
        <p className={styles.book__author__year}>
          {props.authors &&
            props?.authors.map((authorName, index) => {
              return <span key={index}>{authorName} | </span>;
            })}
          <span>{props?.publishedDate}</span>
        </p>
        {props?.saleInfo.hasOwnProperty("retailPrice") && (
          <p className={styles.book__price}>
            Price: ₹{props.saleInfo?.retailPrice?.amount}
          </p>
        )}
      </div>
    </div>
  );
});

export { Book };
