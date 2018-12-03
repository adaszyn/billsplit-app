import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { observer } from "mobx-react";
import { ListItem, Right, Left, Button, Icon } from "native-base";
import { Colors } from "../config/theme.config";

@observer
export class ExpensesTable extends Component {
  removeExpense = expense => {
    const { expenses } = this.props;

    for (var i = 0; i <= expenses.length; i++) {
      if (expenses[i] === expense) {
        expenses.splice(i, 1);
        return;
      }
    }
  };
  renderExpenseRow = expense => {
    const { name, value } = expense;
    return (
      <ListItem
        key={`expense-row-${name}-${value}`}
        style={{ paddingRight: 0, marginRigth: 0 }}
      >
        <Left>
          <Text>{name}</Text>
        </Left>
        <Right>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>{value} SEK</Text>

            <Button
              onPress={() => this.removeExpense(expense)}
              active
              textStyle={{ padding: 0 }}
              small
              style={{
                backgroundColor: "transparent",
                elevation: 0,
                marginLeft: 4,
                padding: 0
              }}
            >
              <Icon
                name="trash"
                style={{ color: Colors.red, padding: 0 }}
                active
              />
            </Button>
          </View>
        </Right>
      </ListItem>
    );
  };
  render() {
    const { expenses } = this.props;
    return <View>{expenses.map(this.renderExpenseRow)}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  }
});
