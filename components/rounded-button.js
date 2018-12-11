import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo";
import { Colors } from "../config/theme.config";

export const RoundedButtonThemes = {
  RED: "red_theme",
  GREEN: "green_theme"
};

const GRADIENTS = {
  [RoundedButtonThemes.GREEN]: [Colors.main, Colors.secondary],
  [RoundedButtonThemes.RED]: [Colors.red, "#b10d4d"]
};
export const RoundedButton = ({
  text,
  onPress,
  inverted,
  theme = RoundedButtonThemes.GREEN,
  style = {}
}) => {
    const textColor = inverted ? GRADIENTS[theme][0] : "white";
  const borderStyle = inverted
    ? { borderColor: textColor, borderWidth: 2, }
    : { borderColor: "transparent", borderWidth: 0 };
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <LinearGradient
        colors={inverted ? ["white", "white"] : GRADIENTS[theme]}
        start={[0, 0]}
        end={[1, 0.4]}
        locations={[0, 1.0]}
        style={[styles.button, borderStyle]}
      >
        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
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
