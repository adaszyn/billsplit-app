import { Bill } from "./bill";
import { observable } from 'mobx';

export class List {
    @observable bills = [];

    addBill(bill) {
        if (!(bill instanceof Bill)) {
            throw new Error('bill needs to be of type Bill');
        }
        this.bills.push(bill);
    }
}