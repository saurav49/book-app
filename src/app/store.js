import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/Book/BookSlice";

export const store = configureStore({
  reducer: {
    book: bookReducer,
  },
});
