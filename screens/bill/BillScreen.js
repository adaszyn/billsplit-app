import React from "react";
import { Button } from 'react-native';

export class BillScreen extends React.Component {
    static navigationOptions = {
      title: 'Your bill',
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
  