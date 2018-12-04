import { observable } from 'mobx';
import { List } from "../models/list";
import { Bill } from '../models/bill';
import { Participant } from '../models/participant';

export class MainStore {
    @observable list = new List();
}

const createMockBill = () => {
    const bill = new Bill('Mock Bill', 'simple');
    const me = new Participant('me', '+46 123 123 123');
    const participant1 = new Participant('Bob', '+46 000 000 000');
    const participant2 = new Participant('Josh', '+46 111 111 111');
    const participant3 = new Participant('Mike', '+46 222 222 222');
    bill.addBillOwner(me);
    bill.addParticipant(participant1);
    bill.addParticipant(participant2);
    bill.addParticipant(participant3);
    participant1.addExpense('Tickets', 300);
    participant2.addExpense('Chips', 20);
    participant2.addExpense('Beers', 120);
    participant3.addExpense('Tacos', 5);
    participant3.addExpense('Fries', 20);
    return bill;
}
// TODO: remove from codebase when not used
export const createMockStore = () => {
    const store = new MainStore();
    store.list.addBill(createMockBill());
    store.list.addBill(createMockBill());
    return store;
}
export const preloadStoreFromStorage = () => {
    const store = new MainStore();
    return store;
}

export const store = createMockStore();