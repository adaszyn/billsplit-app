import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BillScreen } from "./screens/bill.screen";
import { ListScreen } from "./screens/list.screen";
import { CreateBillScreen } from "./screens/create-bill.screen";
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator({
  List: {
    screen: ListScreen
  },
  Bill: {
    screen: BillScreen
  },
  CreateBill: {
    screen: CreateBillScreen
  }
});
const Navigator = createAppContainer(AppNavigator);
class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return <Navigator />;
  }
}
export default Application;
