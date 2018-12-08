import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, Icon, Text } from "native-base";

import { Colors } from "../config/theme.config";
import { PaymentState } from "../models/payment";

export class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Settings`,

    headerStyle: {
      backgroundColor: Colors.main
    },
    headerTintColor: "#fff"
  });

  render() {
    return (
      <View style={styles.container}>
          <Text>Settings</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  }
});
