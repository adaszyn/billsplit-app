import React from "react";
import { Linking as ExpoLinking } from 'expo';
import { Root } from "native-base";
import { createAppContainer } from "react-navigation";
import {AppRoot} from './components/app-root';

export const MainNavigator = createAppContainer(AppRoot);

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
    return (
      <Root>
        <MainNavigator />
      </Root>
    );
  }
}
export default Application;
