import React, { useState, useContext, useEffect } from "react";
import { View } from "react-native";
import {
  Container,
  Content,
  Body,
  Card,
  List,
  ListItem,
  Text,
  Icon
} from "native-base";
import { Context as TracksContext } from "../Context/TracksContext";
import { Audio } from "expo-av";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const TracksScreen = ({ navigation }) => {
  const [state, setState] = useState({
    sound: new Audio.Sound(),
    isLoading: false,
    isPlaying: false
  });
  useEffect(() => {}, []);

  return (
    <View>
      <FlatList
        data={navigation.getParam("tracks")}
        keyExtractor={track => track.title}
        renderItem={({ item }) => {
          return (
            <ListItem>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Play", { trackURI: item.uri });
                }}
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>
            </ListItem>
          );
        }}
      />
    </View>
  );
};

export default TracksScreen;
