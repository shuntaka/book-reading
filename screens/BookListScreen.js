import React, { useContext, useEffect } from "react";
import { View, FlatList, Image } from "react-native";
import { Audio } from "expo-av";
import {
  Container,
  Content,
  Body,
  Card,
  CardItem,
  ListItem,
  Text
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import TracksScreen from "../screens/TracksScreen";

const BookList = [
  {
    bookTitle: "Peter Pan",
    tracks: [
      {
        title: "story",
        uri: require("../assets/audios/ReadAlong/PeterPan.m4a")
      }
    ]
  }

  // {
  //   bookTitle: "Little Mermaid",
  //   tracks: [
  //     {
  //       title: "story",
  //       uri: require("../assets/audios/ReadAlong/TheLittleMermaid.m4a")
  //     }
  //   ]
  // }
];

const BookListScreen = ({ navigation }) => {
  useEffect(() => {}, []);

  return (
    // <View>
    //   <Text>this is book list</Text>
    // </View>
    <FlatList
      data={BookList}
      keyExtractor={book => book.bookTitle}
      renderItem={({ item }) => {
        return (
          <ListItem>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Tracks", { tracks: item.tracks });
              }}
            >
              <Image></Image>
              <Text>{item.bookTitle}</Text>
            </TouchableOpacity>
          </ListItem>
        );
      }}
    />
  );
};

export default BookListScreen;
