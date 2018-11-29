import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, CardItem, Body, Text } from "native-base";
import { ExpensesTable } from "./expenses-table";

export class ParticipantExpensesGroup extends React.Component {
  render() {
    const { participant } = this.props;
    return (
      <Card>
        <CardItem header>
          <Text>{participant.name}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <ExpensesTable expenses={participant.expenses} />
          </Body>
        </CardItem>
      </Card>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    padding: 10
  }
});
