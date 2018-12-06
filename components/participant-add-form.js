import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button, Icon } from "native-base";
import { Colors } from "../config/theme.config";
import { Participant } from "../models/participant";

export class ParticipantAddForm extends Component {
  nameInput = null;
  numberInput = null;
  state = {
    newParticipantName: "",
    newParticipantNumber: ""
  };
  onNewParticipantNameChange = name => {
    this.setState({
      newParticipantName: name
    });
  };
  onNewParticipantNumberChange = number => {
    this.setState({
      newParticipantNumber: number
    });
  };
  onSubmit = () => {
    const { newParticipantName, newParticipantNumber } = this.state;
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
  render() {
    return (
      <View style={styles.addParticipantForm}>
        <TextInput
          ref={input => (this.nameInput = input)}
          style={{ flexGrow: 1 }}
          placeholder="New participant"
          value={this.state.newParticipantName}
          onSubmitEditing={() => this.numberInput.focus()}
          onChangeText={this.onNewParticipantNameChange}
        />
        <TextInput
          ref={input => (this.numberInput = input)}
          style={{ flexGrow: 1 }}
          placeholder="Phone Number"
          value={this.state.newParticipantNumber}
          onSubmitEditing={this.onSubmit}
          keyboardType="phone-pad"
          onChangeText={this.onNewParticipantNumberChange}
        />
        <Button onPress={this.onSubmit} round>
          <Icon name="add" style={{ color: Colors.grey }} />
        </Button>
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
      backgroundColor: "white",
      elevation: 1
    }
  });
  
