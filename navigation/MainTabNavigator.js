import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import TabBarIcon from "../components/TabBarIcon";
import BookListScreen from "../screens/BookListScreen";
import AddBookScreen from "../screens/AddBookScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import TracksScreen from "../screens/TracksScreen";
import PlayScreen from "../screens/PlayScreen";
import { Icon } from "native-base";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const BookListStack = createStackNavigator(
  {
    BookList: BookListScreen,
    AddBook: AddBookScreen,
    Tracks: TracksScreen,
    Play: PlayScreen
  },
  config
);

BookListStack.navigationOptions = {
  tabBarLabel: "BookList",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? "md-book"
          : // ? `ios-information-circle${focused ? "" : "-outline"}`
            "md-information-circle"
      }
    />
  )
};

BookListStack.path = "";

// const LinksStack = createStackNavigator(
//   {
//     Links: LinksScreen
//   },
//   config
// );

// LinksStack.navigationOptions = {
//   tabBarLabel: "Links",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === "ios" ? "ios-link" : "md-link"}
//     />
//   )
// };

// LinksStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator({
  BookListStack,
  // LinksStack,
  SettingsStack
});

tabNavigator.path = "";

export default tabNavigator;
