import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation";
import { Colors } from "../config/theme.config";
import { PaymentsScreen } from "./payments.screen";
import { ExpensesScreen } from "./expenses.screen";
import { Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { BillState } from "../models/bill";
export const BillScreen = createMaterialTopTabNavigator(
  {
    Expenses: ExpensesScreen,
    Payments: PaymentsScreen,
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
    },
    navigationOptions: ({ navigation }) => {
      const bill = navigation.state.params.bill;
      return {
        title: bill.name,
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
              name={bill.state === BillState.UNLOCKED ? "unlock" : "lock"}
              style={{ color: "white" }}
            />
          </TouchableOpacity>
        )
      };
    }
  }
);
