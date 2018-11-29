import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { BillListComponent } from "./bill-list-item";
import { Container, Header, View, Button, Icon, Fab } from "native-base";

export class BillList extends React.Component {
  renderListItem = ({ item }) => {
    return <BillListComponent bill={item} />;
  };
  render() {
    const { bills } = this.props;
    return (
      <Container>
        <FlatList
          data={bills}
          style={styles.container}
          renderItem={this.renderListItem}
          keyExtractor={item => item.id}
        />
        <Fab
          active
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#5067FF" }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}
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
