import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Button, Icon } from "native-base";
import { Colors } from "../config/theme.config";
import { Participant } from "../models/participant";

const isNameValid = name => name.length > 1 && name.length < 12;
const isPhoneNumberValid = number => number.length > 0 && number.length < 12;

export class ParticipantAddForm extends Component {
  nameInput = null;
  numberInput = null;
  state = {
    newParticipantName: "",
    newParticipantNumber: "",
    nameValid: true,
    numberValid: true,
    nameInputTouched: false,
    numberInputTouched: false
  };

  onNewParticipantNameChange = name => {
    this.setState({
      newParticipantName: name,
      nameValid: isNameValid(name)
    });
  };
  onNewParticipantNumberChange = number => {
    this.setState({
      newParticipantNumber: number,
      numberValid: isPhoneNumberValid(number)
    });
  };
  onSubmit = () => {
    const { newParticipantName, newParticipantNumber } = this.state;
    const nameValid = isNameValid(newParticipantName);
    const numberValid = isPhoneNumberValid(newParticipantNumber);
    this.setState({
      nameValid,
      numberValid,
      numberInputTouched: true,
      nameInputTouched: true
    });
    if (!nameValid || !numberValid) {
      return;
    }

    const participant = new Participant(
      newParticipantName,
      newParticipantNumber
    );
    this.setState({
      newParticipantName: "",
      newParticipantNumber: ""
    });
    this.nameInput.blur();
    this.numberInput.blur();
    this.props.onSubmit(participant);
  };
  onNameInputFocus = () => this.setState({ nameInputTouched: true });
  onNumberInputFocus = () => this.setState({ numberInputTouched: true });
  render() {
    const {
      numberValid,
      nameValid,
      nameInputTouched,
      numberInputTouched
    } = this.state;
    const canSubmit =
      nameInputTouched && numberInputTouched && numberValid && nameValid;
    return (
      <View style={styles.addParticipantForm}>
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
            onFocus={this.onNameInputFocus}
            ref={input => (this.nameInput = input)}
            placeholder="New participant"
            value={this.state.newParticipantName}
            onSubmitEditing={() => this.numberInput.focus()}
            onChangeText={this.onNewParticipantNameChange}
          />
        </View>
        <View style={{ flexGrow: 1 }}>
          <Text
            style={{
              ...styles.errorMessage,
              color: numberValid ? "transparent" : Colors.errorRed
            }}
          >
            Wrong Format
          </Text>
          <TextInput
            onFocus={this.onNumberInputFocus}
            style={styles.textInput}
            ref={input => (this.numberInput = input)}
            placeholder="Phone Number"
            value={this.state.newParticipantNumber}
            onSubmitEditing={this.onSubmit}
            keyboardType="phone-pad"
            onChangeText={this.onNewParticipantNumberChange}
          />
        </View>

        <TouchableOpacity onPress={this.onSubmit} style={{ marginTop: 6 }}>
          <Icon
            name="checkmark"
            style={{ color: canSubmit ? Colors.main : Colors.grey }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addParticipantForm: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexGrow: 1,
    padding: 10,
    paddingTop: 4,
    backgroundColor: "white",
    elevation: 1
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
