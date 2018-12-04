import React from "react";
import { Button } from "react-native";
import { BillList } from "../components/bill-list";
import { observer } from "mobx-react";
import { store } from "../stores/main-store";
import { Colors } from "../config/theme.config";

@observer
export class ListScreen extends React.Component {
  static navigationOptions = {
    title: "BillSplit",
    headerStyle: {
      backgroundColor: Colors.main
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <BillList
        bills={store.list.bills}
        navigation={navigation}
        removeBill={bill => store.list.removeBill(bill)}
      />
    );
  }
}
