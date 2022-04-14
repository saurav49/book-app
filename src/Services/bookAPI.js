import axios from "axios";
import { GET_BOOK_API } from "../urls";

const getBook = async (searchTerm) => {
  console.log({ searchTerm });
  try {
    const response = await axios.get(`${GET_BOOK_API}?q=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export { getBook };
