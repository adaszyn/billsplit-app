
import React from "react";
import { View, Text,StyleSheet, TextInput } from 'react-native';
import{ AppRegisty, Button, TouchableOpacity, TouchableHighlight,TouchableNativeFeedback,TouchableWithoutFeedback } from 'react-native';

export class CreateBillScreen extends React.Component {
  static navigationOptions = {
    headerMode: 'none',
  }


  constructor(props) {
      super(props);
      this.state = { text: 'Enter list name',count: 0 };

    }

    onPress = () => {
       this.setState({
         count: this.state.count+1
       })
     }

  render() {
    const { navigate } = this.props.navigation;
    return <View style={{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }}>
    <View >
        <Text style={{textAlign:'center'}}>Add list name</Text>

        <TextInput
           style={{width:140, height: 40, borderColor: 'gray', borderWidth: 1,textAlign:'center'}}
           onChangeText={(text) => this.setState({text})}
           value={this.state.text}
         />
    </View>

          <TouchableHighlight onPress={this.onPress} underlayColor ='transparent'>
          <View style={{backgroundColor: 'green',
                        marginTop:200
                        }}>
            <Text style={{
              color: 'white',
              padding:20,
              width:200,
              fontSize:18,
              textAlign:'center'
            }}>
              Done
            </Text>
          </View>
          </TouchableHighlight>
          <Text>
          { this.state.count !== 0 ? this.state.count: null}
        </Text>
    </View>;
  }
}
