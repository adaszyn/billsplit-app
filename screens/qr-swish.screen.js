import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export class QrSwishScreen extends React.Component {
  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://mpc.getswish.net/qrg-swish/api/v1/prefilled",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }}
          style={{width: 400, height: 400}}
        />
        <Text style={styles.text}>
          Use this code to pay in Swish.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Button
            title="Ok"
            onPress={() => goBack()}
          />
        </TouchableOpacity>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    margin: 30,
    fontWeight: "bold",
    fontSize: 30,
  },
  button: {
    width: 150,
  }
});

const requestBody = {
  "payee": {
    "value": "0730694740",
    "editable": false
  },
  "amount": {
    "value": "10",
    "editable": false
  },
  "format": "jpg",
  "size": 400
};
