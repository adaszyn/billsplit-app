import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation";
import { Colors } from "../config/theme.config";
import { PaymentsScreen } from "./payments.screen";
import { ExpensesScreen } from "./expenses.screen";
import { Bill } from "../models/bill";

export const BillScreen = createMaterialTopTabNavigator(
  {
    Expenses: ExpensesScreen,
    Payments: PaymentsScreen
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
        }
      };
    }
  }
);
