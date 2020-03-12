import createDataContext from "./createDataContext";

const reducer = () => {};
const fetchTracks = dispatch => bookName => {};

export const { Context, Provider } = createDataContext(
  //reducer
  reducer,
  //actions
  { fetchTracks },
  //initial state
  ["1", "2", "3"]
);
