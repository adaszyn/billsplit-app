import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  Card,
  CardItem,
  Body,
  Text
} from "native-base";

export class BillListComponent extends React.Component {
  render() {
    const { bill } = this.props;
    return (
      <TouchableOpacity onPress={() => {}}>
        <Card>
          <CardItem>
            <Body>
              <Text>{bill.name}</Text>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    padding: 10
  }
});
