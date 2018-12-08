import React from "react";
import { TouchableOpacity } from "react-native";
import { BillList } from "../components/bill-list";
import { observer } from "mobx-react";
import { Icon } from "native-base";
import { store } from "../stores/main-store";
import { Colors } from "../config/theme.config";

@observer
export class ListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "BillSplit",
    headerStyle: {
      backgroundColor: Colors.main
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerRight: (
      <TouchableOpacity
        round
        style={{ marginRight: 10 }}
        onPress={() => navigation.navigate("Settings", {})}
      >
        <Icon name="settings" style={{ color: "white" }} />
      </TouchableOpacity>
    )
  });

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
