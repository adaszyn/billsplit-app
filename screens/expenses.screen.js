import React from "react";
import { ScrollView, View, TextInput, StyleSheet } from "react-native";
import { ParticipantExpensesGroup } from "../components/participant-expenses-group";
import { Content, Icon, Container, Button } from "native-base";
import { Colors } from "../config/theme.config";
import { Participant } from "../models/participant";
import { observer } from "mobx-react";

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
  addParticipant = () => {
    const bill = this.props.navigation.state.params.bill;
    const { newParticipantName } = this.state;
    const participant = new Participant(newParticipantName);
    bill.addParticipant(participant);
    this.setState({
      newParticipantName: "",
      newParticipantNumber: ""
    });
    this.nameInput.blur();
    this.numberInput.blur();
  };
  static navigationOptions = ({ navigation }) => {
    const bill = navigation.state.params.bill;
    return {
      title: bill.name
    };
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
  render() {
    const bill = this.props.navigation.state.params.bill;
    return (
      <Container>
        <Content style={{ flex: 1 }}>
          <View style={styles.addParticipantForm}>
            <TextInput
              ref={input => (this.nameInput = input)}
              style={{ flexGrow: 1 }}
              placeholder="New participant"
              value={this.state.newParticipantName}
              onChangeText={this.onNewParticipantNameChange}
            />
            <TextInput
              ref={input => (this.numberInput = input)}
              style={{ flexGrow: 1 }}
              placeholder="Phone Number"
              value={this.state.newParticipantNumber}
              onChangeText={this.onNewParticipantNumberChange}
            />
            <Button onPress={this.addParticipant} round>
              <Icon name="add" style={{ color: Colors.grey }} />
            </Button>
          </View>
          <ScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }}>
            {bill.participants.map(participant => (
              <ParticipantExpensesGroup
                key={participant.id}
                participant={participant}
              />
            ))}
          </ScrollView>
        </Content>
      </Container>
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
