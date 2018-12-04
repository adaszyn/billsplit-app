import React from "react";
import {
  View,
  Image,
  StyleSheet,
} from "react-native";

import { Colors } from "../config/theme.config";

export class QrSwishScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: Colors.main
    },
    headerTintColor: "#fff"
  };

  render() {
    const payment = this.props.navigation.getParam('payment');

    return (
      <View style={styles.container}>
        <Image
          source={{uri: payment.qrUri()}}
          style={{width: 400, height: 400}}
        />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
