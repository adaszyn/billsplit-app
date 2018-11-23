import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HomeScreen } from "./screens/home/HomeScreen";
import { ListScreen } from "./screens/list/ListScreen";
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  List: {
    screen: ListScreen
  },
});

export default createAppContainer(AppNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
