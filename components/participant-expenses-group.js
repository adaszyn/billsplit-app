import React from "react";
import { View, StyleSheet, Button, TextInput } from "react-native";
import { Card, CardItem, Body, Text  } from "native-base";
import { ExpensesTable } from "./expenses-table";

export class ParticipantExpensesGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: null,
      itemValue: null
    };
  }

  render() {
    const { participant } = this.props;

    return (
      <Card>
        <CardItem header>
          <Text>{participant.name}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <ExpensesTable expenses={participant.expenses} />

            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={[styles.input, styles.nameInput]}
                onChangeText={(itemName) => this.setState({itemName})}
                placeholder={'name'}
              />
              <TextInput
                style={[styles.input, styles.valueInput]}
                onChangeText={(itemValue) => this.setState({itemValue})}
                placeholder={'price'}
                keyboardType={'number-pad'}
              />
            </View>

            <Button
              onPress={() => {
                const { itemName, itemValue } = this.state;
                console.log(itemName, itemValue);
                participant.addExpense(itemName, itemValue);
              }}
              title="Add item"
            />
          </Body>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10
  },
  nameInput: {
    width: 100
  },
  valueInput: {
    width: 30,
    marginLeft: 10
  }
});
