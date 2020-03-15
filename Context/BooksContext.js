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
  bookList.push(bookDetail);
  await AsyncStorageWrapper.setItem("bookreading_booklist", bookList);
  callback();
};

const fetchBooks = dispatch => async () => {
  const bookList = await AsyncStorageWrapper.getItem("bookreading_booklist");
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
