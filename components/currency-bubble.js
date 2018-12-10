import React from "react";
import { View, Text } from "react-native";
import {Colors} from '../config/theme.config';

export const CurrencyBubble = () => (
  <View style={styles.currencyBubble}>
    <Text style={styles.currencyBubbleText}>KR</Text>
  </View>
);

const styles = {
  currencyBubble: {
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: Colors.support,
    borderRadius: 30,
    height: 18,
    width: 18,
    justifyContent: "center",
    alignItems: "center"
  },
  currencyBubbleText: {
    color: "white",
    fontSize: 9,
    fontFamily: "karla-bold"
  }
};
