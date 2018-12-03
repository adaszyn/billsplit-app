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
  Button,
  ActionSheet
} from "native-base";
import { observer } from "mobx-react";

@observer
export class BillList extends React.Component {
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
          active
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: Colors.main }}
          position="bottomRight"
          onPress={() => {
            const buttons = [
              { text: "Simple bill", icon: "md-person" },
              { text: "Shareable bill", icon: "md-people" },
              { text: "Cancel", icon: "md-close"}
            ];
            ActionSheet.show(
              {
                options: buttons,
                cancelButtonIndex: buttons.length - 1,
                title: "Create bill"
              },
              buttonIndex => {
                if (buttonIndex === 0) {
                  navigation.navigate("CreateBill", { type: "simple" });
                } else if (buttonIndex === 1) {
                  navigation.navigate("CreateBill", { type: "shareable" });
                }
              }
            )
          }}
        >
          <Icon name="add" />
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
