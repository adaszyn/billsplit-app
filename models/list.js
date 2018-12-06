import { Bill } from "./bill";
import { observable, action } from "mobx";

export class List {
  @observable bills = [];
  static fromJSON(list) {
    const instance = new List();
    instance.bills = list.bills.map(Bill.fromJSON);
    return instance;
  }

  addBill(bill) {
    if (!(bill instanceof Bill)) {
      throw new Error("bill needs to be of type Bill");
    }
    this.bills.push(bill);
  }
  @action
  removeBill(bill) {
    for (var i = 0; i <= this.bills.length; i++) {
      if (this.bills[i] === bill) {
        this.bills.splice(i, 1);
      }
    }
  }
}
