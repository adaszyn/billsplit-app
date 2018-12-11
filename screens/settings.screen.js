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
import { getBaseNavigationConfig } from "../util/navigation.util";
import { RoundedButton } from "../components/rounded-button";
import { TextInputAnimatedPlaceholder } from "../components/text-input-animated";

const isNumberValid = number =>
  !Number.isNaN(Number(number)) && number.length < 12 && number.length > 7;
export class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    ...getBaseNavigationConfig("Settings"),
    title: `Settings`,
    headerTintColor: "#fff",
    headerLeft: (
      <TouchableOpacity
        style={{ marginLeft: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" style={{ color: Colors.main }} />
      </TouchableOpacity>
    )
  });
  state = { phoneNumber: store.userPhoneNumber || '' };
  onSubmit = () => {
      const { phoneNumber } = this.state;
    const isValid = isNumberValid(phoneNumber);
    if (!isValid) {
        return;
    }
    const { navigation } = this.props;
    store.userPhoneNumber = phoneNumber;
    navigation.goBack();
  };
  render() {
    const { phoneNumber } = this.state;
    const isValid = isNumberValid(phoneNumber);
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 20}
        style={{ flex: 1 }}
        behavior="padding"
      >
        <Container style={styles.container}>
          <View style={{ flex: 1, padding: 15 }}>
            <CardItem style={{ flex: 1 }}>
              <Body style={{ alignItems: "center" }}>
                <Text style={styles.label}>What's your number?</Text>
                <TextInputAnimatedPlaceholder
                  placeholder={"0 712 123 123"}
                  keyboardType={"number-pad"}
                  style={[styles.input, { borderColor: isValid ? Colors.darkgrey : Colors.red}]}
                  onChangeText={phoneNumber => this.setState({ phoneNumber })}
                  value={phoneNumber}
                />
                <View style={{ flexGrow: 1 }} />
                <RoundedButton
                    inverted={!isValid}
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
    textAlign: "center",
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
