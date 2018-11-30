import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { BillListComponent } from "./bill-list-item";
import { Colors } from "../config/theme.config";
import {
  Container,
  Icon,
  Fab,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";
import { observer } from "mobx-react";

@observer
export class BillList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fabActive: 'true'
    };
  }
  renderListItem = item => {
    const { navigation, removeBill } = this.props;
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => navigation.navigate("Bill", { bill: item })}
      >
        <ListItem thumbnail onPress={() => navigation.navigate("Bill", { bill: item })}>
          <Body>
            <Text>{item.name}</Text>
            <Text note numberOfLines={1}>
              Its time to build a difference . .
            </Text>
          </Body>
          <Right>
            <Button
              active
              style={{ backgroundColor: "transparent", elevation: 0 }}
              onPress={() => removeBill(item)}
            >
              <Icon name="trash" style={{ color: Colors.red }} active />
            </Button>
          </Right>
        </ListItem>
      </TouchableOpacity>
    );
  };
  render() {
    const { bills, navigation } = this.props;
    return (
      <Container>
        <List>{bills.map(this.renderListItem)}</List>
        <Fab
          active={this.state.fabActive}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: Colors.main }}
          position="bottomRight"
          // this doesn't work:
          // onPress={() => this.setState({ fabActive: !this.state.active })}>
        >
          <Icon name="md-add" />
          <Button rounded style={{ backgroundColor: Colors.main }}>
            <Icon name="md-person" />
          </Button>
          <Button rounded style={{ backgroundColor: Colors.main }}>
            <Icon name="md-people" />
          </Button>
        </Fab>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 4
  }
});
