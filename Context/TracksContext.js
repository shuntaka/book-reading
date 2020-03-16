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
    case "delete_track":
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
  const tracks = await AsyncStorageWrapper.getItem(
    `bookreading_${normalizeBookTitle(bookTitle)}`
  );
  dispatch({ type: "fetch_tracks", payload: tracks });
};

const deleteTrack = dispatch => async (bookTitle, trackTitle, uri) => {
  await FileSystem.deleteAsync(uri);
  const trackKey = `bookreading_${normalizeBookTitle(bookTitle)}`;
  let tracks = await AsyncStorageWrapper.getItem(trackKey);
  updatedTracks = tracks.filter(track => track.trackTitle !== trackTitle);
  await AsyncStorageWrapper.setItem(trackKey, updatedTracks);
  dispatch({ type: "delete_track", payload: updatedTracks });
};

export const { Context, Provider } = createDataContext(
  //reducer
  reducer,
  //actions
  { addTrack, fetchTracks, deleteTrack },
  //initial state
  ["1", "2", "3"]
);
