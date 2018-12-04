import React from "react";
import {
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Text
} from "react-native";
import { ParticipantExpensesGroup } from "../components/participant-expenses-group";
import { Content, Icon, Container, Button } from "native-base";
import { Colors } from "../config/theme.config";
import { Participant } from "../models/participant";
import { observer } from "mobx-react";
import { BillState } from "../models/bill";

const { height, width } = Dimensions.get("window");

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
    const isLocked = bill.state === BillState.LOCKED;
    return [
      <Container key="container">
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
      </Container>,
      isLocked && <View key="screen-blocker" style={styles.screenBlocker}>
        <Text style={styles.screenBlockerText}>List is locked</Text>
      </View>
    ];
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
  },
  screenBlocker: {
    justifyContent: 'center',
    alignItems: 'center',
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
      fontWeight: '700'
  }
});
