
import React from "react";
import { View, Text } from 'react-native';

export class CreateBillScreen extends React.Component {
  static navigationOptions = {
    headerMode: 'none',
  }
  render() {
    const { navigate } = this.props.navigation;
    return <View>
        <Text>Create view here!</Text>
    </View>;
  }
}
