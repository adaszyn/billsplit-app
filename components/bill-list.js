import React from "react";
import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
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
  ActionSheet,
  Left
} from "native-base";
import { observer } from "mobx-react";
import { store } from "../stores/main-store";
import { BillState } from "../models/bill";

const EmptyListPlaceholder = () => (
  <View style={styles.placeholderContainer}>
    <Icon name="pricetag" style={styles.placeholderIcon} active />
    <Text style={styles.placeholderText}>No bills</Text>
  </View>
);
@observer
export class BillList extends React.Component {
  // componentDidMount() {
  // this.props.navigation.navigate("Bill", { bill: this.props.bills[0]})
  // }
  onBillSelect = bill => {
    const { navigation } = this.props;
    store.currentBill = bill;
    navigation.navigate("Bill");
  };
  onBillRemove = bill => {
    const { removeBill } = this.props;
    Alert.alert(
      "Remove bill?",
      "Bill will be remove permanently",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        { text: "OK", onPress: () => removeBill(bill) }
      ],
      { cancelable: false }
    );
  };
  renderListItem = bill => {
    const stripeColor =
      bill.state === BillState.LOCKED ? Colors.lockedList : Colors.unlockedList;
    return (
      <TouchableOpacity key={bill.id}>
        <ListItem thumbnail onPress={() => this.onBillSelect(bill)}>
          <Left>
            <View
              style={{...styles.stripe, backgroundColor: stripeColor}}
            />
          </Left>
          <Body>
            <Text>{bill.name}</Text>
            <Text note numberOfLines={1}>
              {bill.participants.length} participants, {bill.numberOfExpenses}{" "}
              items
            </Text>
          </Body>
          <Right>
            <Button
              active
              style={{ backgroundColor: "transparent", elevation: 0 }}
              onPress={() => this.onBillRemove(bill)}
            >
              <Icon
                name="remove-circle"
                style={{ color: Colors.grey }}
                active
              />
            </Button>
          </Right>
        </ListItem>
      </TouchableOpacity>
    );
  };
  renderFab = () => {
    const { bills, navigation } = this.props;
    return (
      <Fab
        active
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: Colors.main }}
        position="bottomRight"
        onPress={() => {
          const buttons = [
            { text: "Simple bill", icon: "md-person" },
            { text: "Cancel", icon: "md-close" }
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
              }
            }
          );
        }}
      >
        <Icon name="add" />
      </Fab>
    );
  };
  render() {
    const { bills } = this.props;
    const isEmpty = bills.length === 0;
    if (isEmpty) {
      return (
        <>
          <EmptyListPlaceholder />
          {this.renderFab()}
        </>
      );
    }
    return (
      <Container>
        <List>{bills.map(this.renderListItem)}</List>
        {this.renderFab()}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  placeholderText: {
    color: Colors.grey,
    fontSize: 20,
    textAlign: "center",
    marginTop: 20
  },
  placeholderContainer: {
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  placeholderIcon: {
    fontSize: 80,
    color: Colors.grey,
    padding: 0,
    textAlign: "center"
  },
  stripe: {
    width: 4,
    height: 40,
    borderRadius: 10,
  }
});
