import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBook, saveQuery } from "../../Services/bookAPI";

const initialState = {
  bookList: [],
  searchedQueries: [],
  status: "idle",
  hasMore: true,
  bookLoader: false,
};

export const getBookBySearchItem = createAsyncThunk(
  "book/getBookBySearchItem",
  async (data) => {
    try {
      const response = await getBook(data.query, data.pageNumber);
      return response;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const saveSearchQuery = createAsyncThunk(
  "book/saveSearchQuery",
  async (data) => {
    try {
      const response = await saveQuery(data.email, data.searchTerm, data.token);
      return response.updatedValue.searchedQuery;
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
    toggleHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
  },

  extraReducers: {
    [getBookBySearchItem.pending]: (state) => {
      state.status = "loading";
    },
    [getBookBySearchItem.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      const getUniqueArr = (arr) => {
        let flag = {};
        let unique = [];
        arr.forEach((book) => {
          if (!flag[book.id]) {
            flag[book.id] = true;
            unique.push(book);
          }
        });
        return unique;
      };
      console.log(action.payload);
      state.hasMore = action.payload.totalItems > 0;
      state.bookList = getUniqueArr([
        ...action.payload.items,
        ...state.bookList,
      ]);
      state.bookLoader = false;
    },
    [getBookBySearchItem.rejected]: (state) => {
      state.status = "error";
      state.bookLoader = false;
    },
    [saveSearchQuery.pending]: (state) => {
      state.status = "loading";
    },
    [saveSearchQuery.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      console.log(action.payload);
      state.searchedQueries = action.payload.sort(
        ({ count: a }, { count: b }) => b - a
      );
      state.bookLoader = false;
    },
    [saveSearchQuery.rejected]: (state) => {
      state.status = "error";
      state.bookLoader = false;
    },
  },
});

export const { toggleBookLoader } = bookSlice.actions;
export default bookSlice.reducer;
