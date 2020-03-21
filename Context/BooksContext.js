import createDataContext from "./createDataContext";
import { AsyncStorageWrapper } from "../helpers/helpers";
import { AsyncStorage } from "react-native";
import { v4 as uuidv4 } from "uuid";
import { seed } from "../helpers/helpers";

const reducer = (state, action) => {
  switch (action.type) {
    case "fetchBooks": {
      return action.payload;
    }
    default:
      return state;
  }
};

const addBook = dispatch => async (bookDetail, callback) => {
  let bookList = await AsyncStorageWrapper.getItem("bookreading_booklist");
  console.log("inside addBook, bookList is");
  console.log(bookList);
  if (bookList === null) {
    bookList = [];
  }
  console.log("bookDetail is:");
  console.log(bookDetail);
  const merged = { ...bookDetail, _id: "1234" };
  console.log("merged is:");
  console.log(merged);

  bookList.push({ ...bookDetail, _id: uuidv4({ random: seed() }) });
  console.log("bookList to set:");
  console.log(bookList);
  await AsyncStorageWrapper.setItem("bookreading_booklist", bookList);
  callback();
};

const fetchBooks = dispatch => async () => {
  let bookList = await AsyncStorageWrapper.getItem("bookreading_booklist");
  if (bookList === null) {
    bookList = [];
  }
  console.log("fetched books:");
  console.log(bookList);
  dispatch({ type: "fetchBooks", payload: bookList });
};

const editBook = dispatch => async (bookId, bookDetail, callback) => {
  console.log(bookId);
  console.log(bookDetail);
  const bookList = await AsyncStorageWrapper.getItem("bookreading_booklist");
  const newBookList = bookList.map(book => {
    if (book._id === bookId) {
      return { ...book, ...bookDetail };
    }
    return book;
  });
  console.log(newBookList);
  await AsyncStorageWrapper.setItem("bookreading_booklist", newBookList);
  callback();
};
export const { Context, Provider } = createDataContext(
  //reducer
  reducer,
  //actions
  { addBook, fetchBooks, editBook },
  //initial state
  []
);
