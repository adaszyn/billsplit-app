import React from "react";
import { ListItem, Left, Right, Icon } from "native-base";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from "react-native";
import { Colors } from "../config/theme.config";

const isNameValid = name => name.length > 1 && name.length < 12;
const isAmountValid = number => number.length > 0 && number.length < 12 && !Number.isNaN(Number(number));

export class ExpenseAddForm extends React.Component {
  nameInput = null;
  amountInput = null;
  state = {
    name: "",
    amount: "",
    nameValid: true,
    amountValid: true,
    nameInputTouched: false,
    amountInputTouched: false
  };

  onNameChange = name => {
    this.setState({
      name,
      nameValid: isNameValid(name)
    });
  };
  onAmountChange = amount => {
    this.setState({
      amount,
      amountValid: isAmountValid(amount)
    });
  };
  onSubmit = () => {
    const { name, amount } = this.state;
    const nameValid = isNameValid(name);
    const amountValid = isAmountValid(amount);
    this.setState({
      nameValid,
      amountValid,
      amountInputTouched: true,
      nameInputTouched: true
    });
    if (!nameValid || !amountValid) {
      return;
    }

    this.setState({
      amount: "",
      name: ""
    });
    this.nameInput.blur();
    this.amountInput.blur();
    this.props.onSubmit({ name, amount: Number(amount) });
  };
  onNameInputFocus = () => this.setState({ nameInputTouched: true });
  onAmountInputFocus = () => this.setState({ amountInputTouched: true });

  onNameSubmitEditing = () => {
    this.amountInput.focus();
  };

  render() {
    const {
      amountValid,
      nameValid,
      amountInputTouched,
      nameInputTouched
    } = this.state;
    const canSubmit =
      nameInputTouched && amountInputTouched && amountValid && nameValid;
    return (
      <View style={styles.container}>
        <View style={{ flexGrow: 1 }}>
          <Text
            style={{
              ...styles.errorMessage,
              color: nameValid ? "transparent" : Colors.errorRed
            }}
          >
            Wrong format
          </Text>
          <TextInput
            style={styles.textInput}
            ref={input => (this.nameInput = input)}
            underlineColorAndroid="transparent"
            value={this.state.name}
            onChangeText={this.onNameChange}
            onSubmitEditing={this.onNameSubmitEditing}
            placeholder={"Purchased item"}
          />
        </View>

        <View style={{ flexGrow: 1 }}>
          <Text
            style={{
              ...styles.errorMessage,
              color: amountValid ? "transparent" : Colors.errorRed
            }}
          >
            Wrong format
          </Text>
          <TextInput
            style={styles.textInput}
            ref={input => (this.amountInput = input)}
            underlineColorAndroid="transparent"
            onChangeText={this.onAmountChange}
            placeholder={"Price"}
            value={this.state.amount}
            onSubmitEditing={this.onSubmit}
            keyboardType={"number-pad"}
          />
        </View>
        <TouchableOpacity onPress={this.onSubmit} style={{ marginTop: 6 }}>
          <Icon
            name="add"
            style={{
              fontSize: 18,
              color: canSubmit ? Colors.main : Colors.grey
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 18,
    paddingTop: 5,
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
    paddingRight: 15
  },
  errorMessage: {
    fontSize: 10,
    color: Colors.errorRed,
    marginTop: 0,
    marginBottom: -2
  },
  textInput: {
    fontFamily: "opensans-light"
  }
});
