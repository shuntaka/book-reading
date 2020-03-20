import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button
} from "native-base";

import * as ImagePicker from "expo-image-picker";

import { Context as BooksContext } from "../Context/BooksContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const AddBookScreen = ({ navigation }) => {
  const [bookDetail, setBookDetail] = useState({ bookTitle: "" });
  const { state, addBook } = useContext(BooksContext);

  const _pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    await setBookDetail({ ...bookDetail, imageURI: result.uri });
  };
  return (
    <Container>
      <Content contentContainerStyle={styles.Content}>
        <Form>
          <Item>
            <Input
              placeholder="book title"
              value={bookDetail.bookTitle}
              onChangeText={text => {
                setBookDetail({ ...bookDetail, bookTitle: text });
              }}
            ></Input>
          </Item>
        </Form>

        <Button
          block
          style={styles.button}
          onPress={async () => {
            _pickImage();
          }}
        >
          <Text>add image</Text>
        </Button>
        <Image
          source={{ uri: bookDetail.imageURI }}
          style={{ width: 300, height: 300 }}
        />
        <Button
          style={styles.button}
          block
          onPress={() => {
            addBook({ bookDetail }, () => {
              navigation.navigate("BookList");
            });
          }}
        >
          <Text>create</Text>
        </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  Content: {
    padding: 10,
    justifyContent: "center"
  },
  button: {
    margin: 10,
    marginTop: 30
  },
  coveringTouchableOpacity: {
    borderColor: "red",
    borderWidth: 10,
    alignSelf: "stretch",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
export default AddBookScreen;
