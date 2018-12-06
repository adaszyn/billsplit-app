import { generateId } from "../util/number.util";
import { Participant } from "./participant";
import { Payment, PaymentState } from "./payment";
import { observable, computed, action } from "mobx";
import groupBy from "lodash.groupby";
import { PhoneUser } from "./phone-user";

export const BillState = {
  LOCKED: "LOCKED",
  UNLOCKED: "UNLOCKED"
};
export class Bill {
  static fromJSON(bill) {
    const instance = new Bill(bill.name, bill.type, bill.id);
    instance.participants = bill.participants.map(Participant.fromJSON);
    instance.billOwner = instance.participants.filter(participant => participant.id === bill.billOwner)[0];
    instance.state = bill.state;
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
      }
  }
  @observable payments = [];
  @observable participants = [];
  @observable billOwner = null;
  @observable state = BillState.UNLOCKED;

  constructor(name, type, id = generateId()) {
    if (!(type === "simple" || type === "shareable")) {
      throw new Error("type of bill should be either simple or shareable");
    }
    if (type === 'simple') {
        this.addBillOwner(new PhoneUser());
    }
    this.type = type;
    this.name = name;
    this.id = id;
  }
  @computed
  get pastPayments() {
    return this.payments.filter(payment => payment.state === PaymentState.DONE);
  }
  @computed
  get upcomingPayments() {
    return this.payments.filter(payment => payment.state !== PaymentState.DONE);
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
        payment.state !== PaymentState.DONE && payment.payer === this.billOwner
    );
  }
  getParticipantsForTransaction = map => {
    let highest, lowest;
    for (let participantId of Object.keys(map)) {
      let entry = map[participantId];
      if (!lowest || lowest.expenses > entry.expenses) {
        lowest = {
          id: participantId,
          expenses: entry.expenses
        };
      }
      if (!highest || highest.expenses < entry.expenses) {
        highest = {
          id: participantId,
          expenses: entry.expenses
        };
      }
    }
    return { highest, lowest };
  };
  areExpensesEqual(map) {
    let set = new Set([]);
    for (let participantId of Object.keys(map)) {
      set.add(Math.floor(map[participantId].expenses));
    }
    return set.size < 2;
  }
  findParticipantById(id) {
    let participant = this.participants.filter(
      participant => participant.id === id
    );
    return participant ? participant[0] : null;
  }
  @action
  removeParticipant(participant) {
      this.participants = this.participants.filter(collectionItem => collectionItem !== participant);
  }
  flattenTransactionsToPayments(transactions) {
    const paymentsMap = new Map([]);
    for (let { from, to, value } of transactions) {
      let key = `${from},${to}`;
      if (paymentsMap.has(key)) {
        paymentsMap.set(key, paymentsMap.get(key) + value);
      } else {
        paymentsMap.set(key, value);
      }
    }

    let payments = [];
    for ([key, value] of paymentsMap.entries()) {
      let [from, to] = key.split(",");
      const payer = this.findParticipantById(from);
      const payee = this.findParticipantById(to);
      const payment = new Payment(payer, payee, value);
      payments.push(payment);
    }
    return payments;
  }
  calculatePayments() {
    let payments = [];
    const map = this.getExpensesMap();
    const expensesSum = this.getExpensesSum();
    const sumPerParticipant = expensesSum / this.participants.length;
    while (!this.areExpensesEqual(map)) {
      const { highest, lowest } = this.getParticipantsForTransaction(map);
      const transactionValue = sumPerParticipant - lowest.expenses;
      payments.push({
        from: lowest.id,
        to: highest.id,
        value: transactionValue
      });
      map[highest.id].expenses = map[highest.id].expenses - transactionValue;
      map[lowest.id].expenses = map[lowest.id].expenses + transactionValue;
    }
    this.payments = this.flattenTransactionsToPayments(payments);
  }
  getExpensesMap() {
    let expensesDebtMap = {};
    for (let participant of this.participants) {
      let participantExpenses = participant.getExpensesValueSum();
      expensesDebtMap[participant.id] = {
        expenses: participantExpenses
      };
    }

    return expensesDebtMap;
  }
  getExpensesSum() {
    let expensesSum = 0;
    for (let participant of this.participants) {
      let participantExpenses = participant.getExpensesValueSum();
      expensesSum += participantExpenses;
    }

    return expensesSum;
  }
}
