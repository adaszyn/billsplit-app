import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { BillListComponent } from "./bill-list-item";
import { Colors } from "../config/theme.config";
import {
  Container,
  Icon,
  Fab,
  List,
  ListItem,
  Text,
  Body,
  Right,
  Button,
  ActionSheet
} from "native-base";
import { observer } from "mobx-react";
import { store } from '../stores/main-store';

@observer
export class BillList extends React.Component {
    // componentDidMount() {
        // this.props.navigation.navigate("Bill", { bill: this.props.bills[0]})
    // }
    onBillSelect = (bill) => {
        const { navigation } = this.props;
        store.currentBill = bill;
        navigation.navigate("Bill");
    }
  renderListItem = bill => {
    const { navigation, removeBill } = this.props;
    return (
      <TouchableOpacity
        key={bill.id}
      >
        <ListItem thumbnail onPress={() => this.onBillSelect(bill)}>
          <Body>
            <Text>{bill.name}</Text>
            <Text note numberOfLines={1}>
                {bill.participants.length} participants, {bill.numberOfExpenses} items
            </Text>
          </Body>
          <Right>
            <Button
              active
              style={{ backgroundColor: "transparent", elevation: 0 }}
              onPress={() => removeBill(bill)}
            >
              <Icon name="trash" style={{ color: Colors.red }} active />
            </Button>
          </Right>
        </ListItem>
      </TouchableOpacity>
    );
  };
  render() {
    const { bills, navigation } = this.props;
    return (
      <Container>
        <List>{bills.map(this.renderListItem)}</List>
        <Fab
          active
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: Colors.main }}
          position="bottomRight"
          onPress={() => {
            const buttons = [
              { text: "Simple bill", icon: "md-person" },
              { text: "Shareable bill", icon: "md-people" },
              { text: "Cancel", icon: "md-close"}
            ];
            ActionSheet.show(
              {
                options: buttons,
                cancelButtonIndex: buttons.length - 1,
                title: "Create bill"
              },
              buttonIndex => {
                if (buttonIndex === 0) {
                  navigation.navigate("CreateBill", { type: "simple" });
                } else if (buttonIndex === 1) {
                  console.warn("Not implemented yet")
                }
              }
            )
          }}
        >
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 4
  }
});
