import { observable } from 'mobx';
import { List } from "../models/list";
import { Bill } from '../models/bill';
import { Participant } from '../models/participant';

export class MainStore {
    @observable list = new List();
}

const createMockBill = () => {
    const bill = new Bill('Mock Bill');
    const me = new Participant('me', '+46 123 123 123');
    const participant1 = new Participant('Bob', '+46 000 000 000');
    const participant2 = new Participant('Josh', '+46 111 111 111');
    bill.addParticipant(participant1);
    bill.addParticipant(participant2);
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