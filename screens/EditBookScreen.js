import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Context as BooksContext } from "../Context/BooksContext";
import { Button, Container, Content, Form, Item, Input } from "native-base";
import * as ImagePicker from "expo-image-picker";

const EditBookScreen = ({ navigation }) => {
  const { _id, bookTitle, imageURI } = navigation.getParam("bookDetail");
  const [bookDetail, setBookDetail] = useState({ bookTitle, imageURI });
  console.log(bookDetail);
  const { state, editBook } = useContext(BooksContext);

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
          block
          style={styles.button}
          onPress={() => {
            editBook(_id, bookDetail, () => {
              navigation.navigate("BookList");
            });
          }}
        >
          <Text>update</Text>
        </Button>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  Content: {
    padding: 10,
    justifyContent: "flex-end"
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
export default EditBookScreen;
