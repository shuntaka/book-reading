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
          return book._id;
        }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                padding: 10
              }}
            >
              <View style={{ flex: 10, marginLeft: 20 }}>
                <TouchableOpacity
                  style={styles.coveringTouchableOpacity}
                  onPress={() => {
                    navigation.navigate("Tracks", {
                      bookTitle: item.bookTitle
                    });
                  }}
                >
                  <View
                    style={{
                      // borderColor: "blue",
                      // borderWidth: 5,
                      flexDirection: "row"
                    }}
                  >
                    <View>
                      <Image
                        source={{ uri: item.imageURI }}
                        style={{ width: 100, height: 100 }}
                      />
                    </View>
                    <View
                      style={{
                        // borderColor: "yellow",
                        // borderWidth: 5,
                        flex: 1,
                        justifyContent: "center",
                        padding: 20
                      }}
                    >
                      <Text>{item.bookTitle}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    console.log("pencil clicked");
                    navigation.navigate("EditBook", { bookDetail: item });
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
    // borderColor: "red",
    // borderWidth: 5,
    flex: 1,
    alignSelf: "stretch"
  }
});
export default BookListScreen;
