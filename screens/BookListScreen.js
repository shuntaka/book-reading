import React, { useContext, useEffect } from "react";
import { View, FlatList, Image, AsyncStorage, StyleSheet } from "react-native";
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
const initializeBookList = async () => {
  const bookreading_booklist = [];
  await AsyncStorage.setItem(
    "bookreading_booklist",
    JSON.stringify(bookreading_booklist)
  );
  const initialBookList = await AsyncStorage.getItem("bookreading_booklist");
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
    <View
      style={{
        flex: 1,
        justifyContent: "space-between"
      }}
    >
      <FlatList
        data={state}
        keyExtractor={book => {
          return book.bookTitle;
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
              <View style={{ flex: 10 }}>
                <TouchableOpacity
                  style={styles.coveringTouchableOpacity}
                  onPress={() => {
                    navigation.navigate("Tracks", {
                      bookTitle: item.bookTitle
                    });
                  }}
                >
                  <Text>{item.bookTitle}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    console.log("pencil clicked");
                    navigation.navigate("EditBook");
                  }}
                >
                  <Icon type="MaterialCommunityIcons" name="pencil" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      <Button
        block
        style={{ margin: 20 }}
        onPress={() => {
          navigation.navigate("AddBook");
        }}
      >
        <Text>add book</Text>
      </Button>
      {/* <Button
        style={{ margin: 20 }}
        block
        onPress={() => {
          initializeBookList();
        }}
      >
        <Text>initialize</Text>
      </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  coveringTouchableOpacity: {
    flex: 1,
    alignSelf: "stretch"
  }
});
export default BookListScreen;
