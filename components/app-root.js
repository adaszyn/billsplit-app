import React from "react";
import { Linking } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { ListScreen } from "../screens/list.screen";
import { BillScreen } from "../screens/bill.screen";
import { CreateBillScreen } from "../screens/create-bill.screen";
import { QrSwishScreen } from "../screens/qr-swish.screen";
import { store } from "../stores/main-store";
import { PaymentState } from "../models/payment";
import { Linking as ExpoLinking } from 'expo';

const AppNavigator = createStackNavigator({
  List: {
    screen: ListScreen
  },
  Bill: {
    screen: BillScreen
  },
  CreateBill: {
    screen: CreateBillScreen
  },
  QrSwish: {
    screen: QrSwishScreen
  }
});

export class AppRoot extends React.Component {
  static router = AppNavigator.router;

  async componentWillMount() {
    const url = await Linking.getInitialURL();
    this._handleOpenURL({ url });
  }

  componentDidMount() {
    Linking.addEventListener("url", this._handleOpenURL);
  }
  componentWillUnmount() {
    Linking.removeEventListener("url", this._handleOpenURL);
  }
  _handleOpenURL = ({ url }) => {
    let { queryParams } = ExpoLinking.parse(url);
    const paymentDetails =
      queryParams.paymentDetails && JSON.parse(queryParams.paymentDetails);
    const swishresponse =
      queryParams.swishresponse && JSON.parse(queryParams.swishresponse);
    if (paymentDetails) {
      const bill = store.list.bills.filter(
        bill => bill.id === paymentDetails.billId
      )[0];
      const payment = bill.getPaymentById(paymentDetails.paymentId);
      if (!payment) {
        alert("Payment Failure", "Payment not found");
        this.props.navigation.navigate("List");
        return;
      }
      if (swishresponse.result === "paid") {
        payment.state = PaymentState.DONE;
      }
      if (
        swishresponse.result === "notpaid" ||
        swishresponse.result === "unknown"
      ) {
        setTimeout(() => {
          alert("Payment Failure", "Payment failed");
        }, 500);
      }
      store.currentBill = bill;
      this.props.navigation.navigate("Payments");
    }
  };
  render() {
    return <AppNavigator navigation={this.props.navigation} />;
  }
}
