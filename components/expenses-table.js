import React, { Component } from "react";
import { Text, View } from "react-native";
const ExpenseRow = ({ name, value }) => {
  return (
    <View style={{flexDirection: 'row'}} key={`expense-row-${name}-${value}`}>
      <Text>{name}</Text>
      <Text>{value}</Text>
    </View>
  );
};
export class ExpensesTable extends Component {
  render() {
    const { expenses } = this.props;
    return <View>{expenses.map(ExpenseRow)}</View>;
  }
}
