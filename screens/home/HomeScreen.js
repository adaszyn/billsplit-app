import React from "react";
import { Button } from 'react-native';

export class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'BillSplit',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <Button
          title="To Lists"
          onPress={() =>
            navigate('List')
          }
        />
      );
    }
  }
  