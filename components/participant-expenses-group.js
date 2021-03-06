import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import { ExpensesTable } from "./expenses-table";
import {
  Content,
  Separator,
  Icon,
} from "native-base";
import { ExpenseAddForm } from "./expense-add-form";
import {Colors} from '../config/theme.config';
export class ParticipantExpensesGroup extends React.Component {
  constructor(props) {
    super(props);
    this.nameInput = null;
    this.priceInput = null;
    this.state = {
      itemName: null,
      itemValue: null
    };
    this.expensesAddForm = null;
  }
  onExpensesFormSubmit = ({ name, amount }) => {
    const { participant } = this.props;
    participant.addExpense(name, amount);
    setTimeout(() => {
      this.expensesAddForm.nameInput.focus();
    }, 1);
  };
  renderSeparator = () => {
    const { isOwner, participant, removeParticipant, isEditable } = this.props;
    return (
      <Separator bordered style={{backgroundColor: Colors.lightgrey}}>
        <View
          style={{
            justifyContent: isOwner ? "flex-start" : "space-between",
            ...styles.separatorStyles
          }}
        >
          <Text style={styles.headerText}>{participant.name.toUpperCase()}</Text>
          {!isOwner && isEditable && (
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
    const { participant, isEditable } = this.props;
    return (
      <Content>
        {this.renderSeparator()}
        <ExpensesTable isEditable={isEditable} expenses={participant.expenses} />
        { isEditable && <ExpenseAddForm
          ref={ref => (this.expensesAddForm = ref)}
          onSubmit={this.onExpensesFormSubmit}
        /> }
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
  },
  headerText: {
    fontFamily: "karla-bold",
    color: Colors.grey
  }
});
