import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
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
    participant.addExpense(itemName, Number(itemValue));
    this.setState({
      itemName: null,
      itemValue: null
    });
    this.nameInput.focus();
  };
  renderSeparator = () => {
    const { isOwner, participant, removeParticipant } = this.props;
    return (
      <Separator bordered>
        <View
          style={{
            justifyContent: isOwner ? "flex-start" : "space-between",
            ...styles.separatorStyles
          }}
        >
          <Text>{participant.name.toUpperCase()}</Text>
          {!isOwner && (
            <TouchableOpacity onPress={removeParticipant}>
              <Icon
                fontSize={18}
                name="remove-circle"
                style={{ color: "#BEBEBE", fontSize: 18 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </Separator>
    );
  };
  render() {
    const { participant } = this.props;
    return (
      <Content>
        {this.renderSeparator()}
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
  },
  separatorStyles: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginRight: 10
  }
});
