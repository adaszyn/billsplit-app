import React from "react";
import { View } from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Right,
  Separator,
  Body,
  Button,
  Icon
} from "native-base";
import { observer } from "mobx-react";
import {PaymentState} from '../models/payment';

@observer
export class PaymentsScreen extends React.Component {
  renderOwnerPaymentRow = payment => {
    return (
      <ListItem icon key={`${payment.payer.id}-${payment.payee.id}`}>
        <Body>
          <Text>
            For {payment.payee.name} -{" "}
            <Text style={{ fontWeight: "700" }}>{payment.amount} SEK</Text>
          </Text>
        </Body>
        <Right>
          <Button iconLeft transparent success small bordered>
            <Icon name="card" />
            <Text>Pay</Text>
          </Button>
        </Right>
      </ListItem>
    );
  };
  renderRowHeader = header => {
    return (
      <ListItem key="own-payments-header" itemHeader style={{ paddingBottom: 0 }}>
        <Text>{header}</Text>
      </ListItem>
    );
  };
  renderOwnPayments = () => {
    const { bill } = this.props.navigation.state.params;
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
            <Text style={{ fontWeight: "700" }}>${payment.amount} SEK</Text>
          </Text>
        </Body>
        <Right>
          <Button iconLeft transparent primary small bordered>
            <Icon name="qr-scanner" />
            <Text>QR</Text>
          </Button>
        </Right>
      </ListItem>
    );
  };
  renderParticipantsPayments() {
    const bill = this.props.navigation.state.params.bill;
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
    const bill = this.props.navigation.state.params.bill;
    const pastPayments = bill.pastPayments;
    return pastPayments.map(payment => (
      <ListItem icon key={`past-payment-${payment.payer.name}-${payment.payee.name}`}>
        <Body>
          <Text>
            {payment.payer.name} → {payment.payee.name} - <Text style={{ fontWeight: "700" }}>{payment.amount} SEK</Text>
          </Text>
        </Body>
        <Right>
          <Button icon transparent dark small bordered onPress={() => payment.state = PaymentState.PENDING}>
            <Icon name="undo" />
          </Button>
        </Right>
      </ListItem>
    ));
  }
  render() {
    const bill = this.props.navigation.state.params.bill;
    return (
      <Container>
        <Content>
          <List>
            {this.renderOwnPayments()}
            {this.renderParticipantsPayments()}
            <Separator bordered>
              <Text>PAST PAYMENTS</Text>
            </Separator>
            {this.renderPastPayments()}
          </List>
        </Content>
      </Container>
    );
  }
}
