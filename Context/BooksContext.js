import createDataContext from "./createDataContext";
import { AsyncStorageWrapper } from "../helpers/helpers";
import { AsyncStorage } from "react-native";

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
  const bookList = await AsyncStorageWrapper.getItem("bookreading_booklist");
  console.log("inside addBook, bookList is");
  console.log(bookList);
  if (bookList !== null) {
    bookList.push(bookDetail);
    console.log("bookList to set:");
    console.log(bookList);
    await AsyncStorageWrapper.setItem("bookreading_booklist", bookList);
  } else {
    console.log("bookList to set:");
    console.log([bookDetail]);
    await AsyncStorageWrapper.setItem("bookreading_booklist", [bookDetail]);
  }
  callback();
};

const fetchBooks = dispatch => async () => {
  const bookList = await AsyncStorageWrapper.getItem("bookreading_booklist");
  console.log("fetched books:");
  console.log(bookList);
  dispatch({ type: "fetchBooks", payload: bookList });
};
export const { Context, Provider } = createDataContext(
  //reducer
  reducer,
  //actions
  { addBook, fetchBooks },
  //initial state
  []
);
