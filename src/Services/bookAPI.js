import axios from "axios";
import { GET_BOOK_API, SAVE_QUERY } from "../urls";

const getBook = async (query, pageNumber) => {
  try {
    const response = await axios.get(
      `${GET_BOOK_API}?q=${query}&maxResults=10&startIndex=${pageNumber}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const saveQuery = async (email, searchTerm, token) => {
  try {
    const response = await axios.post(
      `${SAVE_QUERY}`,
      {
        email: email,
        query: searchTerm,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log({ error });
  }
};

export { getBook, saveQuery };
