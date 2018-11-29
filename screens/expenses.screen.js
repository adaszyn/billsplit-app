import React from "react";
import { ScrollView, Text } from "react-native";
import { ParticipantExpensesGroup } from "../components/participant-expenses-group";
export class ExpensesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const bill = navigation.state.params.bill;
    return {
      title: bill.name
    };
  };
  render() {
    const bill = this.props.navigation.state.params.bill;
    return (
      <ScrollView style={{ flex: 1 }}>
        {bill.participants.map(participant => (
          <ParticipantExpensesGroup
            key={participant.id}
            participant={participant}
          />
        ))}
      </ScrollView>
    );
  }
}
