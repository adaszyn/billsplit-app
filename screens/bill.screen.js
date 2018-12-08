import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation";
import { Colors } from "../config/theme.config";
import { PaymentsScreen } from "./payments.screen";
import { ExpensesScreen } from "./expenses.screen";
import { Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { BillState } from "../models/bill";

import { Linking as ExpoLinking } from "expo";
import { Linking } from "react-native";
import { store } from "../stores/main-store";
import { PaymentState } from "../models/payment";

export const BillTabs = createMaterialTopTabNavigator(
  {
    Expenses: ExpensesScreen,
    Payments: {
      path: "payments/",
      screen: PaymentsScreen
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "white"
      },
      indicatorStyle: {
        color: "transparent",
        backgroundColor: Colors.background
      },
      inactiveTintColor: Colors.grey,
      activeTintColor: "black"
    }
  }
);
export class BillScreen extends React.Component {
  static router = BillTabs.router;
  static navigationOptions({ navigation }) {
    const bill = navigation.state.params.bill;
    return {
      title: bill ? bill.name : "Bill",
      headerStyle: {
        backgroundColor: Colors.main
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerRight: (
        <TouchableOpacity
          round
          style={{ marginRight: 10 }}
          onPress={() => {
            if (!bill) {
              return;
            }
            if (bill.state === BillState.UNLOCKED) {
              bill.state = BillState.LOCKED;
              navigation.navigate("Payments");
              bill.calculatePayments();
            } else {
              bill.state = BillState.UNLOCKED;
              navigation.navigate("Expenses");
            }
          }}
        >
          <Icon
            name={bill && bill.state === BillState.UNLOCKED ? "unlock" : "lock"}
            style={{ color: "white" }}
          />
        </TouchableOpacity>
      )
    };
  }
  state = { bill: null };
  componentWillMount = async () => {
    const url = await Linking.getInitialURL();
    this._handleOpenURL({ url });
  };

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
        payment.state = PaymentState.DONE;
        alert("Payment Failure", "Payment failed");
      }
      this.props.navigation.setParams({
        bill
      });
      this.setState({ bill });
      this.props.navigation.navigate("Payments");
    }
  };
  render() {
    const billFromParams = this.props.navigation.state.params.bill;
    return (
      <BillTabs
        screenProps={{ bill: this.state.bill || billFromParams }}
        navigation={this.props.navigation}
      />
    );
  }
}
