import createDataContext from "./createDataContext";
import { AsyncStorageWrapper } from "../helpers/helpers";
import * as FileSystem from "expo-file-system";

const normalizeBookTitle = bookTitle => {
  return bookTitle.replace(/\s/g, "").toLowerCase();
};

const normalizeFileName = fileName => {
  return fileName.replace(/\s/g, "").toLowerCase();
};
const reducer = (state, action) => {
  switch (action.type) {
    case "add_track":
      return action.payload;
    case "fetch_tracks":
      return action.payload;
    default:
      return state;
  }
};
const addTrack = dispatch => async (bookTitle, fileName, uri) => {
  console.log("inside addTrack");

  const savePath = `${FileSystem.documentDirectory}${normalizeBookTitle(
    bookTitle
  )}_${normalizeFileName(fileName)}`;
  console.log("save path is:");
  console.log(savePath);
  await FileSystem.copyAsync({ from: uri, to: savePath });
  const fileInfo = await FileSystem.getInfoAsync(savePath);

  const trackKey = `bookreading_${normalizeBookTitle(bookTitle)}`;
  let tracks = await AsyncStorageWrapper.getItem(trackKey);
  if (tracks === null) {
    tracks = [];
  }
  const trackDetail = {
    trackTitle: fileName.match(/([^\/]+)(?=\.\w+$)/)[0],
    uri: fileInfo.uri
  };
  tracks.push(trackDetail);
  await AsyncStorageWrapper.setItem(trackKey, tracks);
  dispatch({ type: "add_track", payload: tracks });
};
const fetchTracks = dispatch => async bookTitle => {
  console.log("fetch tracks for:");
  console.log(normalizeBookTitle(bookTitle));

  const tracks = await AsyncStorageWrapper.getItem(
    `bookreading_${normalizeBookTitle(bookTitle)}`
  );
  console.log("fetched tracks are:");
  console.log(tracks);
  dispatch({ type: "fetch_tracks", payload: tracks });
};

export const { Context, Provider } = createDataContext(
  //reducer
  reducer,
  //actions
  { addTrack, fetchTracks },
  //initial state
  ["1", "2", "3"]
);
