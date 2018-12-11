import React from "react";
import { Text, View } from "react-native";
import { Colors } from "../config/theme.config";

export const getBaseNavigationConfig = (title) => ({
    headerStyle: {
        backgroundColor: "white",
        textAlign: "center"
      },
      headerTintColor: "#fff",
      headerLeft: <View style={{flex: 1}} />,
      headerRight: <View style={{flex: 1}} />,
      headerTitleStyle: {
  
      },
      headerTitle: (
        <Text
          style={{
              textAlign: "center",
              alignSelf: "center",
            fontSize: 20,
            flexGrow: 1,
            fontFamily: "karla-bold",
            color: Colors.main
          }}
        >
          {title}
        </Text>
      ),
})