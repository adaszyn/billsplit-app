import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { ExpensesTable } from "./expenses-table";
import {
  Content,
  List,
  ListItem,
  Button,
  Text,
  Separator,
  Right,
  Footer,
  FooterTab,
  Icon,
  Left
} from "native-base";
export class ParticipantExpensesGroup extends React.Component {
  constructor(props) {
    super(props);
    this.nameInput = null;
    this.priceInput = null;
    this.state = {
      itemName: null,
      itemValue: null
    };
  }
  onNameSubmitEditing = () => {
    this.priceInput.focus();
  };
  onPriceSubmitEditing = () => {
    const { participant } = this.props;
    const { itemName, itemValue } = this.state;
    console.log(itemName, itemValue);
    participant.addExpense(itemName, itemValue);
    this.setState({
      itemName: null,
      itemValue: null
    });
    this.nameInput.focus();
  };
  render() {
    const { participant } = this.props;

    return (
      <Content>
        <Separator bordered>
          <Text>{participant.name.toUpperCase()}</Text>
        </Separator>
        <ExpensesTable expenses={participant.expenses} />
        <ListItem>
          <Left>
            <TextInput
              ref={input => (this.nameInput = input)}
              underlineColorAndroid="transparent"
              style={[styles.nameInput]}
              value={this.state.itemName}
              onChangeText={itemName => this.setState({ itemName })}
              onSubmitEditing={this.onNameSubmitEditing}
              placeholder={"Purchased item"}
            />
          </Left>
          <Right>
            <TextInput
              ref={input => (this.priceInput = input)}
              underlineColorAndroid="transparent"
              style={[styles.valueInput]}
              onChangeText={itemValue => this.setState({ itemValue })}
              placeholder={"Price"}
              value={this.state.itemValue}
              onSubmitEditing={this.onPriceSubmitEditing}
              keyboardType={"number-pad"}
            />
          </Right>
        </ListItem>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  nameInput: {
    flexGrow: 5
  },
  valueInput: {
    flexGrow: 2,
    marginLeft: 10
  }
});
