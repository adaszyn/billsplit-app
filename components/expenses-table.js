import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import {observer} from 'mobx-react';

const ExpenseRow = ({ name, value }) => {
  return (
    <View style={styles.container} key={`expense-row-${name}-${value}`}>
      <Text>{name} </Text>
      <Text>{value}kr</Text>
    </View>
  );
};
@observer
export class ExpensesTable extends Component {
  render() {
    const { expenses } = this.props;
    return <View>{expenses.map(ExpenseRow)}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
});
