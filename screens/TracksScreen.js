import React, { useState, useContext, useEffect } from "react";
import { View, AsyncStorage, StyleSheet } from "react-native";
import {
  Container,
  Content,
  Body,
  Card,
  List,
  ListItem,
  Text,
  Icon,
  Button
} from "native-base";
import { Context as TracksContext } from "../Context/TracksContext";
import { Audio } from "expo-av";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import * as DocumentPicker from "expo-document-picker";

const initialTracks = [
  {
    title: "1.mp3",
    size: 633279,
    type: "success",
    uri:
      "file:///var/mobile/Containers/Data/Application/E7D221CC-6FF5-4BE7-A68D-AF3D2020C405/Library/Caches/ExponentExperienceData/%2540shunsuketakamiya%252Fbook-reading/DocumentPicker/2379377F-F187-4D67-BBA5-78A4E512DB79.mp3"
  }
];

const initializeTrackList = async () => {
  const bookreading_peterpan = [];
  await AsyncStorage.setItem(
    "bookreading_peterpan",
    JSON.stringify(bookreading_peterpan)
  );
  const initialTracks = await AsyncStorage.getItem("bookreading_peterpan");
  console.log("initial tracks are:");
  console.log(initialTracks);
};
const TracksScreen = ({ navigation }) => {
  // const [state, setState] = useState({
  //   sound: new Audio.Sound(),
  //   isLoading: false,
  //   isPlaying: false
  // });
  const { state, addTrack, fetchTracks } = useContext(TracksContext);
  const bookTitle = navigation.getParam("bookTitle");
  useEffect(() => {
    fetchTracks(bookTitle);
  }, []);
  const addTrackButtonCallback = async () => {
    console.log("add track");
    const result = await DocumentPicker.getDocumentAsync();
    const { name, uri } = result;
    addTrack(bookTitle, name, uri);
    // const bookListString = await AsyncStorage.getItem('bookList')
    // const booiList = JSON.parse(bookListString);
    // const bookIndex = bookList.find(book=> book.bookTitle==)
    // const booiList[bookTitle]

    // await AsyncStorage.setItem("test", JSON.stringify(track));

    // const trackDetail = await AsyncStorage.getItem("test");
    // console.log(trackDetail);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between"
      }}
    >
      <FlatList
        data={state}
        keyExtractor={track => track.uri}
        renderItem={({ item }) => {
          return (
            <View style={{ padding: 10 }}>
              <TouchableOpacity
                style={styles.coveringTouchableOpacity}
                onPress={() => {
                  navigation.navigate("Play", { trackURI: item.uri });
                }}
              >
                <Text>{item.trackTitle}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <Button block style={{ margin: 20 }} onPress={addTrackButtonCallback}>
        <Text>add track</Text>
      </Button>
      {/* <Button block style={{ margin: 20 }} onPress={initializeTrackList}>
        <Text>initialize track</Text>
      </Button> */}
    </View>
  );
};

// TracksScreen.navigationOptions = ({ navigation }) => {
//   return {
//     headerRight: (
//       <TouchableOpacity
//         onPress={() => {
//           addTrackButtonCallback();
//         }}
//       >
//         <Icon type="Feather" name="plus" size={30} />
//       </TouchableOpacity>
//     )
//   };
// };

const styles = StyleSheet.create({
  coveringTouchableOpacity: {
    flex: 1,
    alignSelf: "stretch"
  }
});

export default TracksScreen;
