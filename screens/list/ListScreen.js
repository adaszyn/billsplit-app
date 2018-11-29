import React from "react";
import { Button } from 'react-native';

export class ListScreen extends React.Component {
    static navigationOptions = {
      title: 'Your bills',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <Button
          title="Bill"
          onPress={() =>
            navigate('Bill')
          }
        />
      );
    }
  }
  