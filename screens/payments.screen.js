import React from "react";
import { View, Image, Text } from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Right,
  Separator,
  Body,
  Button,
  Text as NativeBaseText,
  Icon
} from "native-base";
import { observer } from "mobx-react";
import { PaymentState } from "../models/payment";

import { store } from "../stores/main-store";
import { SwishUtil } from "../util/swish.util";
import { Colors } from "../config/theme.config";

@observer
export class PaymentsScreen extends React.Component {
  renderOwnerPaymentRow = payment => {
    const bill = store.currentBill;
    return (
      <ListItem icon key={`${payment.payer.id}-${payment.payee.id}`}>
        <Body>
          <Text>
            For {payment.payee.name} -{" "}
            <Text style={{ fontWeight: "700" }}>{payment.amount} SEK</Text>
          </Text>
        </Body>
        <Right>
          <Button
            iconLeft
            transparent
            success
            small
            bordered
            onPress={() =>
              SwishUtil.createPayment(
                payment.payee.phoneNumber,
                payment.amount,
                bill.id,
                payment.id
              )
            }
          >
            <Image
              style={{ height: 13, width: 60, marginLeft: 10, marginRight: 10 }}
              source={require("../images/swish-btn.png")}
            />
          </Button>
        </Right>
      </ListItem>
    );
  };
  renderRowHeader = header => {
    return (
      <ListItem
        key="own-payments-header"
        itemHeader
        style={{ paddingBottom: 0 }}
      >
        <Text style={styles.headerText}>{header}</Text>
      </ListItem>
    );
  };
  renderOwnPayments = () => {
    const bill = store.currentBill;

    const ownerPayments = bill.getOwnerPayments();
    if (ownerPayments.length === 0) {
      return null;
    }
    return [
      this.renderRowHeader("MY PAYMENTS"),
      ...ownerPayments.map(this.renderOwnerPaymentRow)
    ];
  };
  renderPayment = payment => {
    return (
      <ListItem icon key={`payment-${payment.payee.id}`}>
        <Body>
          <Text>
            For {payment.payee.name} -{" "}
            <Text style={{ fontWeight: "700" }}>{payment.amount} SEK</Text>
          </Text>
        </Body>
        <Right>
          <Button
            iconLeft
            transparent
            primary
            small
            bordered
            onPress={() =>
              this.props.navigation.navigate("QrSwish", { payment: payment })
            }
          >
            <Icon name="qr-scanner" />
            <NativeBaseText>QR</NativeBaseText>
          </Button>
        </Right>
      </ListItem>
    );
  };
  renderParticipantsPayments() {
    // const bill = this.props.navigation.state.params.bill;
    const bill = store.currentBill;

    const paymentsByParticipants = bill.paymentsByParticipants;
    delete paymentsByParticipants[bill.billOwner.id];
    return Object.keys(paymentsByParticipants).map(participantId => {
      const payments = paymentsByParticipants[participantId];
      const participant = bill.findParticipantById(participantId);
      return (
        <View id={participant.name} key={`header-${participant.id}`}>
          <ListItem itemHeader style={{ paddingBottom: 0 }}>
            <Text>{participant.name.toUpperCase()}'S PAYMENTS</Text>
          </ListItem>
          {payments.map(this.renderPayment)}
        </View>
      );
    });
  }
  renderPastPayments() {
    // const bill = this.props.navigation.state.params.bill;
    const bill = store.currentBill;

    const pastPayments = bill.pastPayments;
    return pastPayments.map(payment => (
      <ListItem
        icon
        key={`past-payment-${payment.payer.name}-${payment.payee.name}`}
      >
        <Body>
          <Text>
            {payment.payer.name} → {payment.payee.name} -{" "}
            <Text style={{ fontWeight: "700" }}>{payment.amount} SEK</Text>
          </Text>
        </Body>
        <Right>
          <Button
            icon
            transparent
            dark
            small
            bordered
            onPress={() => (payment.state = PaymentState.NOTPAID)}
          >
            <Icon name="undo" />
          </Button>
        </Right>
      </ListItem>
    ));
  }
  render() {
    const bill = store.currentBill;
    if (!bill) {
      return null;
    }
    return (
      <Container>
        <Content>
          <List>
            {this.renderOwnPayments()}
            {this.renderParticipantsPayments()}
            <Separator bordered style={{backgroundColor: Colors.lightgrey}}>
              <Text style={styles.separatorText}>PAST PAYMENTS</Text>
            </Separator>
            {this.renderPastPayments()}
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = {
  separatorText: {
    fontFamily: "karla-bold",
    color: Colors.darkgrey
  },
  headerText: {
    fontFamily: "karla-bold",
    color: Colors.grey
  }
};
