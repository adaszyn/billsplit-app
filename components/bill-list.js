import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  Dimensions
} from "react-native";
import { Colors } from "../config/theme.config";
import {
  Container,
  Icon,
  ListItem,
  Text,
  Body,
  Right,
  Left
} from "native-base";
import { observer } from "mobx-react";
import { store } from "../stores/main-store";
import { BillState } from "../models/bill";
import { RoundedButton, RoundedButtonThemes } from "./rounded-button";
import { LinearGradient } from "expo";

const { width } = Dimensions.get("window");

const EmptyListPlaceholder = () => (
  <View style={styles.placeholderContainer}>
    <Icon name="pricetag" style={styles.placeholderIcon} active />
    <Text style={styles.placeholderText}>No bills</Text>
  </View>
);
@observer
export class BillList extends React.Component {
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
      <TouchableOpacity key={bill.id + Math.random()}>
        <ListItem thumbnail onPress={() => this.onBillSelect(bill)}>
          <Left>
            <View style={{ ...styles.stripe, backgroundColor: stripeColor }} />
          </Left>
          <Body>
            <Text style={styles.billName}>{bill.name}</Text>
            <Text style={styles.billDescription} note numberOfLines={1}>
              {bill.participants.length} participants, {bill.numberOfExpenses}{" "}
              items
            </Text>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => this.onBillRemove(bill)}>
              <Icon
                name="remove-circle"
                style={{ color: Colors.grey }}
                active
              />
            </TouchableOpacity>
          </Right>
        </ListItem>
      </TouchableOpacity>
    );
  };
  createBill = () =>
    this.props.navigation.navigate("CreateBill", { type: "simple" });
  navigateToSettings = () => this.props.navigation.navigate("Settings");
  renderAddBillButton = () => {
    const canAddBill = !!store.userPhoneNumber;
    return (
      <LinearGradient
        colors={["transparent", "white", "white", "white"]}
        style={{
          height: 100,
          width,
          justifyContent: "center",
          alignSelf: "stretch",
          position: "absolute",
          bottom: 0
        }}
      >
        {canAddBill ? (
          <RoundedButton onPress={this.createBill} text="Add bill" />
        ) : (
          <RoundedButton
            theme={RoundedButtonThemes.RED}
            onPress={this.navigateToSettings}
            text="Set phone number"
          />
        )}
      </LinearGradient>
    );
  };
  render() {
    const { bills } = this.props;
    const isEmpty = bills.length === 0;
    if (isEmpty) {
      return (
        <>
          <EmptyListPlaceholder />
          {this.renderAddBillButton()}
        </>
      );
    }
    return (
      <Container>
        <ScrollView>
          {bills.map(this.renderListItem)}
          <View style={{ height: 100 }} />
        </ScrollView>
        {this.renderAddBillButton()}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  placeholderText: {
    color: Colors.grey,
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "opensans"
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
    borderRadius: 10
  },
  billName: {
    fontFamily: "opensans-bold"
  },
  billDescription: {
    fontFamily: "opensans-light"
  }
});
