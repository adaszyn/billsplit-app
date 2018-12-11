import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Text
} from "react-native";
import { ParticipantExpensesGroup } from "../components/participant-expenses-group";
import { Content, Icon, Container, Button } from "native-base";
import { observer } from "mobx-react";
import { BillState } from "../models/bill";
import { Header } from "react-navigation";
import { ParticipantAddForm } from "../components/participant-add-form";
import { store } from "../stores/main-store";
import { LinearGradient } from "expo";
import { RoundedButton } from "../components/rounded-button";
import { Colors } from "../config/theme.config";

const { height, width } = Dimensions.get("window");

const ScreenBLocker = () => (
  <View key="screen-blocker" style={styles.screenBlocker}>
    <Text style={styles.screenBlockerText}>List is locked</Text>
  </View>
);
const ExpensesSummary = ({ amount }) => (
  <View style={styles.expensesSummary}>
    <Text style={styles.expensesSummaryText}>{amount} KR</Text>
  </View>
);
@observer
export class ExpensesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.nameInput = null;
    this.numberInput = null;
    this.state = {
      newParticipantName: "",
      newParticipantNumber: ""
    };
  }

  onNewParticipant = participant => {
    const bill = store.currentBill;
    bill.addParticipant(participant);
  };
  lockBill = () => {
    const { navigation } = this.props;
    const bill = store.currentBill;
    bill.state = BillState.LOCKED;
    navigation.navigate("Payments");
    bill.calculatePayments();
  };

  render() {
    const bill = store.currentBill;

    if (!bill) {
      return null;
    }
    const isEditable = bill.state !== BillState.LOCKED;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 80}
        style={{ flex: 1 }}
        behavior="padding"
      >
        <Container key="container">
          <Content style={{ flex: 1 }}>
            {isEditable && (
              <ParticipantAddForm onSubmit={this.onNewParticipant} />
            )}
            <ScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }}>
              {bill.participants.map(participant => (
                <ParticipantExpensesGroup
                  key={participant.id}
                  isEditable={isEditable}
                  isOwner={participant === bill.billOwner}
                  removeParticipant={() => bill.removeParticipant(participant)}
                  participant={participant}
                />
              ))}
              <View style={{ height: 100 }} />
            </ScrollView>
          </Content>
        </Container>
        <LinearGradient
          colors={["transparent", "white", "white", "white"]}
          style={{
            height: 100,
            width,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            alignSelf: "stretch",
            alignItems: "center",
            position: "absolute",
            bottom: 0
          }}
        >
          { isEditable ? <RoundedButton onPress={this.lockBill} text="Lock & Pay!" /> : <View style={{flex: 1}}/> }
          <ExpensesSummary amount={bill.sumOfExpenses} />
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  nameInput: {
    fontSize: 30,
    height: 28
  },
  addNewPayee: {
    fontSize: 20,
    height: 25
  },
  screenBlocker: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    position: "absolute",
    flexGrow: 1,
    height: height - 100,
    width,
    top: 0,
    left: 0,
    zIndex: 160
  },
  screenBlockerText: {
    fontSize: 16,
    fontWeight: "700"
  },
  expensesSummary: {
    borderBottomColor: Colors.darkgrey,
    borderBottomWidth: 5
  },
  expensesSummaryText: {
    fontFamily: "karla-bold",
    fontSize: 26,
    color: Colors.darkgrey
  }
});
