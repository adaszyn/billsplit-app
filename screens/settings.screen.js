import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Text } from "native-base";

import { Colors } from "../config/theme.config";
import {getBaseNavigationConfig} from '../util/navigation.util';

export class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    ...getBaseNavigationConfig("Settings"),
    title: `Settings`,
    headerTintColor: "#fff",
    headerLeft: (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" style={{ color: Colors.main }} />
        </TouchableOpacity>
      )
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
