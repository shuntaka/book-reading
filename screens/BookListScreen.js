import React, { useContext, useEffect } from "react";
import { View, FlatList, Image, AsyncStorage } from "react-native";
import { Audio } from "expo-av";
import {
  Container,
  Content,
  Body,
  Card,
  CardItem,
  ListItem,
  Text,
  Icon,
  Button
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

import TracksScreen from "../screens/TracksScreen";
import { Context as BooksContext } from "../Context/BooksContext";

// initialize
const inirializeBookList = async () => {
  // const initialBookList = [
  //   {
  //     bookTitle: "Peter Pan",
  //     tracks: [
  //       {
  //         title: "story",
  //         uri: require("../assets/audios/ReadAlong/PeterPan.m4a")
  //       }
  //     ]
  //   }
  // ];
  const bookreading_booklist = [
    { bookTitle: "Peter Pan" },
    { bookTitle: "Little Mermaid" }
  ];
  const bookreading_peterpan = [{ trackTitle: "test", uri: "" }];
  await AsyncStorage.setItem(
    "bookreading_booklist",
    JSON.stringify(bookreading_booklist)
  );
  await AsyncStorage.setItem(
    "bookreading_peterpan",
    JSON.stringify(bookreading_peterpan)
  );
  const initialBookList = await AsyncStorage.getItem("bookreading_booklist");
  const initialTracks = await AsyncStorage.getItem("bookreading_peterpan");
  console.log("initial data is:");
  console.log(initialBookList);
  console.log(initialTracks);
};

const BookListScreen = ({ navigation }) => {
  const { state, fetchBooks } = useContext(BooksContext);
  useEffect(() => {
    fetchBooks();
    const listener = navigation.addListener("didFocus", () => {
      fetchBooks();
    });
    return () => {
      listener.remove("didFocus");
    };
  }, []);
  return (
    <View>
      <Button
        style={{ margin: 20 }}
        block
        onPress={() => {
          inirializeBookList();
        }}
      >
        <Text>initialize</Text>
      </Button>
      <FlatList
        data={state}
        keyExtractor={book => book.bookTitle}
        renderItem={({ item }) => {
          return (
            <ListItem>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Tracks", { bookTitle: item.bookTitle });
                }}
              >
                <Image></Image>
                <Text>{item.bookTitle}</Text>
              </TouchableOpacity>
            </ListItem>
          );
        }}
      />
    </View>
  );
};

BookListScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddBook");
        }}
      >
        <Icon type="Feather" name="plus" size={30} />
      </TouchableOpacity>
    )
  };
};

export default BookListScreen;
