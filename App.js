import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BillScreen } from "./screens/bill.screen";
import { ListScreen } from "./screens/list.screen";
import { CreateBillScreen } from './screens/create-bill.screen';
import { createStackNavigator, createAppContainer } from "react-navigation";

function loadFont() {
  Expo.Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
  });
}

loadFont();
const AppNavigator = createStackNavigator({
  List: {
    screen: ListScreen
  },
  Bill: {
    screen: BillScreen
  },
  CreateBill: {
      screen: CreateBillScreen
  }
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
