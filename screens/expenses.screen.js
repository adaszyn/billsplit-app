import React from "react";
import {
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Text
} from "react-native";
import { ParticipantExpensesGroup } from "../components/participant-expenses-group";
import { Content, Icon, Container, Button } from "native-base";
import { Colors } from "../config/theme.config";
import { Participant } from "../models/participant";
import { observer } from "mobx-react";
import { BillState } from "../models/bill";
import { Header } from "react-navigation";
import { ParticipantAddForm } from "../components/participant-add-form";

import { Linking as ExpoLinking } from "expo";
import { Linking } from "react-native";
import { store } from "../stores/main-store";

const { height, width } = Dimensions.get("window");

const ScreenBLocker = () => (
  <View key="screen-blocker" style={styles.screenBlocker}>
    <Text style={styles.screenBlockerText}>List is locked</Text>
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


  render() {
    const bill = store.currentBill;

    if (!bill) {
      return null;
    }
    const isLocked = bill.state === BillState.LOCKED;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 100}
        style={{ flex: 1 }}
        behavior="padding"
      >
        <Container key="container">
          <Content style={{ flex: 1 }}>
            <ParticipantAddForm onSubmit={this.onNewParticipant} />
            <ScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }}>
              {bill.participants.map(participant => (
                <ParticipantExpensesGroup
                  key={participant.id}
                  isOwner={participant === bill.billOwner}
                  removeParticipant={() => bill.removeParticipant(participant)}
                  participant={participant}
                />
              ))}
            </ScrollView>
          </Content>
        </Container>
        {isLocked && <ScreenBLocker />}
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
  }
});
