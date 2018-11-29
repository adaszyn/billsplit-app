
import React from "react";
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";

import { PaymentsScreen } from './payments.screen';
import { ExpensesScreen } from './expenses.screen'

const TabNavigator = createMaterialTopTabNavigator({
  Expenses: ExpensesScreen,
  Payments: PaymentsScreen
});
const Tabs = createAppContainer(TabNavigator);

export class BillScreen extends React.Component {
  static navigationOptions = {
    title: "Your bill"
  };
  render() {
    const { navigate } = this.props.navigation;
    return <Tabs />;
  }
}
