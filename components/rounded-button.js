import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Colors } from "../config/theme.config";
export const RoundedButton = ({ text, onPress, style = {} }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = {
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: Colors.main,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    elevation: 2,
    borderRadius: 40,

  },
  text: {
    fontFamily: "karla-bold",
    color: "white",
    fontSize: 20,
  }
};
