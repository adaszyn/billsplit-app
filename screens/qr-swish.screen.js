import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, Icon, Text } from "native-base";

import { Colors } from "../config/theme.config";
import { PaymentState } from "../models/payment";

export class QrSwishScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `QR for ${navigation.getParam("payment").payer.name}`,

    headerStyle: {
      backgroundColor: Colors.main
    },
    headerTintColor: "#fff"
  });
  onPaymentDone = () => {
    const { navigation } = this.props;
    const payment = navigation.getParam("payment");
    payment.state = PaymentState.DONE;
    navigation.goBack();
  };
  render() {
    const payment = this.props.navigation.getParam("payment");
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: payment.qrUri() }}
          style={{ width: 300, height: 300 }}
        />
        <Button block bordered success iconLeft onPress={this.onPaymentDone}>
          <Icon name="checkmark" />
          <Text>Mark as done</Text>
        </Button>
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
