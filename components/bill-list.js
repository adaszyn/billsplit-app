import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { BillListComponent } from "./bill-list-item";

export class BillList extends React.Component {
  renderListItem = ({ item }) => {
      return <BillListComponent bill={item}></BillListComponent>
  };
  render() {
      const { bills } = this.props;
    return (
      <FlatList data={bills} style={styles.container} renderItem={this.renderListItem}   keyExtractor={(item) => item.id} />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 4
  }
});
