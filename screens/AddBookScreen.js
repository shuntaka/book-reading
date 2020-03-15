import React, { useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button
} from "native-base";
import { Context as BooksContext } from "../Context/BooksContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const AddBookScreen = ({ navigation }) => {
  const [bookTitle, setBookTitle] = useState("");
  const { state, addBook } = useContext(BooksContext);
  return (
    <Container>
      <Content contentContainerStyle={styles.Content}>
        <Form>
          <Item>
            <Input
              placeholder="book title"
              value={bookTitle}
              onChangeText={text => {
                setBookTitle(text);
              }}
            ></Input>
          </Item>
        </Form>
        <Button
          style={styles.button}
          block
          onPress={() => {
            addBook({ bookTitle }, () => {
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
export default AddBookScreen;
