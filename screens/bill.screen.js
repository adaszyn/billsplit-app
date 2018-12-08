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

export const BillScreen = createMaterialTopTabNavigator(
  {
    Expenses: ExpensesScreen,
    Payments: {
      screen: PaymentsScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      const bill = store.currentBill;
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
              if (!bill || bill.state !== BillState.UNLOCKED) {
                return;
              }
              bill.state = BillState.LOCKED;
              navigation.navigate("Payments");
              bill.calculatePayments();
            }}
          >
            <Icon
              name={
                bill && bill.state === BillState.UNLOCKED ? "unlock" : "lock"
              }
              style={{ color: "white" }}
            />
          </TouchableOpacity>
        )
      };
    },
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
