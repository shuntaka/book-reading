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

const TracksScreen = ({ navigation }) => {
  const { state, addTrack, fetchTracks, deleteTrack } = useContext(
    TracksContext
  );
  const bookTitle = navigation.getParam("bookTitle");
  useEffect(() => {
    fetchTracks(bookTitle);
  }, []);
  const addTrackButtonCallback = async () => {
    console.log("add track");
    const result = await DocumentPicker.getDocumentAsync();
    const { name, uri } = result;
    addTrack(bookTitle, name, uri);
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
        keyExtractor={(track, index) => {
          return index.toString();
          // return track.uri;
        }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                padding: 5,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "stretch"
              }}
            >
              <View
                style={{
                  flex: 20
                }}
              >
                <TouchableOpacity
                  style={styles.coveringTouchableOpacity}
                  onPress={() => {
                    navigation.navigate("Play", { trackURI: item.uri });
                  }}
                >
                  <Text>{item.trackTitle}</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flex: 1
                }}
              >
                <TouchableOpacity
                  style={styles.coveringTouchableOpacity}
                  onPress={() => {
                    deleteTrack(bookTitle, item.trackTitle, item.uri);
                  }}
                >
                  <Icon
                    style={{
                      alignSelf: "center"
                    }}
                    type="MaterialCommunityIcons"
                    name="minus"
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <Button block style={{ margin: 20 }} onPress={addTrackButtonCallback}>
        <Text>add track</Text>
      </Button>
      <Button
        block
        style={{ margin: 20 }}
        onPress={() => {
          navigation.navigate("AudioTest", { tracks: state });
        }}
      >
        <Text>audio test</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  coveringTouchableOpacity: {
    height: "100%",
    justifyContent: "center",
    alignSelf: "stretch"
  }
});

export default TracksScreen;
