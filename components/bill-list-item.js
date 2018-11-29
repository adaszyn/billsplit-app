import React from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";

export class BillListComponent extends React.Component {
  render() {
    const { bill } = this.props;
    return (
      <TouchableHighlight onPress={() => {}}>
        <Text>{bill.name}</Text>
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    padding: 10
  }
});
