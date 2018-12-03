import React from "react";
import { ScrollView, Text, Button, Modal, View,TextInput,StyleSheet } from "react-native";
import { ParticipantExpensesGroup } from "../components/participant-expenses-group";
export class ExpensesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      showModal: false,
      newPayeeName: ""

    }
  }
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

      <Button
      onPress={() => this.setState({showModal: true})}
      title="Add Payee"
        />
      
      <Modal   
        animationType="slide"
        transparent={false}
        visible={this.state.showModal}
        onRequestClose={() => this.setState({showModal: false})}>
        <View style={{marginTop: 22}}>
          <View>
          <Text style={styles.addNewPayee}>
          Add New Payee
          </Text>
           
            <TextInput
            style={styles.nameInput}
            placeholder="Name:"
           onChangeText={(newPayeeName) => this.setState({newPayeeName})}
             />
            <Button 
            onPress={() =>this.setState({showModal: false})}
            title="Save"
            />
           </View>
          </View>
         </Modal>
      </ScrollView>
   
    );
  }
}
const styles = StyleSheet.create({
    nameInput: {
    fontSize: 30,
    height: 28
  }, addNewPayee:{
    fontSize: 20,
    height: 25
     }
})