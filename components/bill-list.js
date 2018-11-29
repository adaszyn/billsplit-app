import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { BillListComponent } from "./bill-list-item";
import { Container, Icon, Fab } from "native-base";

export class BillList extends React.Component {
  renderListItem = ({ item }) => {
      const { navigation } = this.props;
    return <BillListComponent bill={item} onPress={() => navigation.navigate('Bill', { bill: item })} />;
  };
  render() {
    const { bills, navigation } = this.props;
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
          onPress={() => navigation.navigate('CreateBill')}
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
