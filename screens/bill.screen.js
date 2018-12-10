import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation";
import { Colors } from "../config/theme.config";
import { PaymentsScreen } from "./payments.screen";
import { ExpensesScreen } from "./expenses.screen";
import { Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { BillState } from "../models/bill";
import { store } from "../stores/main-store";
import { getBaseNavigationConfig } from "../util/navigation.util";

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
        ...getBaseNavigationConfig(bill ? bill.name : "Expenses"),

        headerLeft: (
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" style={{ color: Colors.main }} />
          </TouchableOpacity>
        ),
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
              style={{ color: Colors.main }}
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
      activeTintColor: "black",
      labelStyle: {
        fontFamily: "karla-bold"
      }
    }
  }
);
