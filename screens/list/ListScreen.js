import React from "react";
import { Button } from 'react-native';
import { BillList } from '../../components/bill-list';
import { observer } from 'mobx-react';
import { createMockStore } from "../../stores/main-store";

const store = createMockStore();

@observer
export class ListScreen extends React.Component {
    static navigationOptions = {
      title: 'BillSplit',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <BillList bills={store.list.bills} />
      );
    }
  }
  