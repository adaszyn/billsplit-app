import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo";
import { Colors } from "../config/theme.config";
export const RoundedButton = ({ text, onPress, style = {} }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <LinearGradient
        colors={[Colors.main, Colors.secondary]}
        start={[0, 0]}
        end={[1, 0.4]}
        locations={[0., 1.0]}
        style={styles.button}
      >
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = {
  button: {
    paddingVertical: 15,
    paddingHorizontal: 26,
    backgroundColor: Colors.main,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    elevation: 2,
    borderRadius: 50
  },
  text: {
    fontFamily: "karla-bold",
    color: "white",
    fontSize: 20
  }
};
