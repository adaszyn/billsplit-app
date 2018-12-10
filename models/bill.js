import { generateId } from "../util/number.util";
import { Participant } from "./participant";
import { Payment, PaymentState } from "./payment";
import { observable, computed, action } from "mobx";
import groupBy from "lodash.groupby";
import { PhoneUser } from "./phone-user";
import { getPayments } from "../util/obligations.util";

export const BillState = {
  LOCKED: "LOCKED",
  UNLOCKED: "UNLOCKED"
};
export class Bill {
  static fromJSON(bill) {
    const instance = new Bill(bill.name, bill.type, bill.id);
    instance.participants = bill.participants.map(Participant.fromJSON);
    instance.billOwner = instance.participants.find(
      participant => participant.id === bill.billOwner
    );
    instance.state = bill.state;

    instance.payments = bill.payments.map(payment => {
      const payee = instance.participants.find(p => p.id === payment.payee);
      const payer = instance.participants.find(p => p.id === payment.payer);
      const { amount, state, id } = payment;
      return new Payment(payer, payee, amount, state, id);
    });
    return instance;
  }
  toJSON() {
    const { participants, type, name, id, payments, state, billOwner } = this;
    return {
      type,
      name,
      id,
      payments,
      participants,
      state,
      billOwner: billOwner.id
    };
  }
  @observable payments = [];
  @observable participants = [];
  @observable billOwner = null;
  @observable state = BillState.UNLOCKED;

  constructor(name, type, id = generateId()) {
    if (!(type === "simple" || type === "shareable")) {
      throw new Error("type of bill should be either simple or shareable");
    }
    if (type === "simple") {
      this.addBillOwner(new PhoneUser());
    }
    this.type = type;
    this.name = name;
    this.id = id;
  }
  @computed
  get pastPayments() {
    return this.payments.filter(payment => payment.state === PaymentState.PAID);
  }
  @computed
  get upcomingPayments() {
    return this.payments.filter(payment => payment.state !== PaymentState.PAID);
  }
  @computed
  get paymentsByParticipants() {
    return groupBy(this.upcomingPayments, payment => payment.payer.id);
  }
  @computed
  get numberOfExpenses() {
    return this.participants.reduce(
      (numberOfExpenses, participant) =>
        numberOfExpenses + participant.expenses.length,
      0
    );
  }
  getPaymentById(paymentId) {
    return this.payments.find(payment => payment.id === paymentId);
  }
  addPayment(payerId, payeeId, amount) {
    // TODO: implement
  }
  addBillOwner(participant) {
    this.addParticipant(participant);
    this.billOwner = participant;
  }
  addParticipant(participant) {
    if (!(participant instanceof Participant)) {
      throw new Error("participant has to be of type Participant");
    }
    this.participants.push(participant);
  }
  getOwnerPayments() {
    return this.payments.filter(
      payment =>
        payment.state !== PaymentState.PAID && payment.payer === this.billOwner
    );
  }
  findParticipantById(id) {
    let participant = this.participants.filter(
      participant => participant.id === id
    );
    return participant ? participant[0] : null;
  }
  @action
  removeParticipant(participant) {
    this.participants = this.participants.filter(
      collectionItem => collectionItem !== participant
    );
  }
  calculatePayments() {
    this.payments = getPayments(this.participants);
  }
}
