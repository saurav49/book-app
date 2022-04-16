import { useEffect, useState } from "react";
import { getBookBySearchItem } from "../features/Book/BookSlice";
import { useDispatch } from "react-redux";

export default function useBookSearch(query, pageNumber) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookBySearchItem({ query, pageNumber }));
  }, [query, pageNumber]);
  return null;
}
