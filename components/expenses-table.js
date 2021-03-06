import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { observer } from "mobx-react";
import { ListItem, Right, Left, Button, Icon } from "native-base";
import { Colors } from "../config/theme.config";
import { CurrencyBubble } from "./currency-bubble";

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
    const { isEditable } = this.props;
    return (
      <ListItem
        key={`expense-row-${name}-${value}`}
        style={{ paddingRight: 0, marginRigth: 0 }}
      >
        <Left>
          <Text style={styles.expenseText}>{name}</Text>
        </Left>
        <Right>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.expenseText}>{value} </Text>
            <CurrencyBubble />
            {isEditable && (
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
                  name="close"
                  style={{ color: Colors.grey, padding: 0 }}
                  active
                />
              </Button>
            )}
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
  },
  expenseText: {
    fontFamily: "opensans",
    color: "#262626",
    fontSize: 16,
    color: Colors.darkgrey
  }
});
