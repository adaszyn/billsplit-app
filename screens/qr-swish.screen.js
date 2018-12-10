import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Icon, Text } from "native-base";

import { Colors } from "../config/theme.config";
import { PaymentState } from "../models/payment";
import { getBaseNavigationConfig } from "../util/navigation.util";
import { QRCode } from "react-native-custom-qr-codes";
import { RoundedButton } from "../components/rounded-button";

export class QrSwishScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    ...getBaseNavigationConfig(
      `QR for ${navigation.getParam("payment").payer.name}`
    ),
    headerLeft: (
      <TouchableOpacity
        style={{ marginLeft: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" style={{ color: Colors.main }} />
      </TouchableOpacity>
    )
  });
  onPaymentDone = () => {
    const { navigation } = this.props;
    const payment = navigation.getParam("payment");
    payment.state = PaymentState.PAID;
    navigation.goBack();
  };
  render() {
    const payment = this.props.navigation.getParam("payment");
    return (
      <View style={styles.container}>
        <QRCode
          size={300}
          content={payment.getQRPayload()}
          linearGradient={[Colors.main, Colors.secondary]}
          codeStyle="circle"
          logo={require("../images/swish_logo.png")}
        />
        <RoundedButton
          style={{ marginTop: 20 }}
          onPress={this.onPaymentDone}
          text="Mark as done"
        />
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
