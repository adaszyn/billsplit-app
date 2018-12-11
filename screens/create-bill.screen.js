import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { Header } from "react-navigation";
import { store } from "../stores/main-store";

import {
  Text,
  Button,
  Container,
  Card,
  CardItem,
  Body,
  Icon
} from "native-base";
import { Colors } from "../config/theme.config";
import { Bill } from "../models/bill";
import { getBaseNavigationConfig } from "../util/navigation.util";
import { RoundedButton } from "../components/rounded-button";
import { TextInputAnimatedPlaceholder } from "../components/text-input-animated";

const PLACEHOLDERS = [
  "Shopping with John...",
  "Wednesday hangout...",
  "Trip to Alaska..."
];
const getRandomPlaceholder = () => {
  return PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)];
};
export class CreateBillScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    ...getBaseNavigationConfig("New bill"),
    headerLeft: (
      <TouchableOpacity
        style={{ marginLeft: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" style={{ color: Colors.main }} />
      </TouchableOpacity>
    )
  });

  state = { billName: "" };
  placeholder = getRandomPlaceholder();

  onSubmit = () => {
    const { navigation } = this.props;
    const bill = new Bill(this.state.billName, "simple");
    store.list.addBill(bill);
    navigation.goBack();
  };

  render() {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 20}
        style={{ flex: 1 }}
        behavior="padding"
      >
        <Container style={styles.container}>
          <View style={{ flex: 1, padding: 15 }}>
            <CardItem style={{ flex: 1 }}>
              <Body style={{alignItems: 'center'}}>
                <Text style={styles.label}>What's your bill name?</Text>
                <TextInputAnimatedPlaceholder
                  placeholder={this.placeholder}
                  style={styles.input}
                  onChangeText={billName => this.setState({ billName })}
                  value={this.state.billName}
                />
                <View style={{ flexGrow: 1 }} />
                <RoundedButton
                  style={{ alignSelf: "center" }}
                  onPress={this.onSubmit}
                  text="Save"
                />
              </Body>
            </CardItem>
          </View>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: { padding: 15 },
  label: {
    color: Colors.darkgrey,
    marginBottom: 15,
    fontWeight: "600",
    textAlign: "center",
    fontSize: 17,
    fontFamily: "karla"
  },
  input: {
    marginTop: 20,
    textAlign: "center",
    alignSelf: "stretch",
    height: 40,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: Colors.grey,
    fontFamily: "karla"
  }
});
