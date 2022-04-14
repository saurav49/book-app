import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBook } from "../../Services/bookAPI";

const initialState = {
  bookList: [],
  status: "idle",
  bookLoader: false,
};

export const getBookBySearchItem = createAsyncThunk(
  "book/getBookBySearchItem",
  async (searchTerm) => {
    console.log({ searchTerm });
    try {
      const response = await getBook(searchTerm);
      return response.items;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const bookSlice = createSlice({
  name: "search",
  initialState,

  reducers: {
    toggleBookLoader: (state, action) => {
      state.bookLoader = action.payload;
    },
  },

  extraReducers: {
    [getBookBySearchItem.pending]: (state) => {
      state.status = "loading";
    },
    [getBookBySearchItem.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.status = "fulfilled";
      state.bookList = action.payload;
      state.bookLoader = false;
    },
    [getBookBySearchItem.rejected]: (state) => {
      state.status = "error";
      state.bookLoader = false;
    },
  },
});

export const { toggleBookLoader } = bookSlice.actions;
export default bookSlice.reducer;
