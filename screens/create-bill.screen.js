import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { store } from "../stores/main-store";

import { Text, Button, Container, Card, CardItem, Body } from "native-base";
import { Colors } from "../config/theme.config";
import { Bill } from "../models/bill";

export class CreateBillScreen extends React.Component {
  static navigationOptions = {
    title: "New simple bill",
    headerStyle: {
      backgroundColor: Colors.main
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  constructor(props) {
    super(props);
    this.state = { billName: "" };
  }

  onSubmit = () => {
    const { navigation } = this.props;
    const bill = new Bill(this.state.billName, "simple");
    store.list.addBill(bill);
    navigation.goBack();
  };

  render() {
    return (
      <Container style={styles.container}>
        <Card style={{ flex: 1 }}>
          <CardItem style={{ flex: 1 }}>
            <Body>
              <Text style={styles.label}>CREATE NEW SIMPLE BILL</Text>
              <TextInput
                placeholder="Enter list name"
                style={styles.input}
                onChangeText={billName => this.setState({ billName })}
                value={this.state.billName}
              />
              <View style={{ flexGrow: 1 }} />
              <Button block onPress={this.onSubmit}>
                <Text>Save</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: Colors.lightgrey },
  label: {
    color: Colors.darkgrey,
    marginBottom: 15,
    fontWeight: "600",
    fontSize: 13
  },
  input: {
    alignSelf: "stretch",
    height: 40,
    borderBottomWidth: 1,
    borderColor: Colors.grey
  }
});
