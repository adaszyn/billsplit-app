import { generateId } from "../util/number.util";
import { Expense } from "./expense";
import { observable } from "mobx";

export class Participant {
  static fromJSON(participant) {
    const instance = new Participant();
    instance.id = participant.id;
    instance.name = participant.name;
    instance.phoneNumber = participant.phoneNumber;
    instance.expenses = participant.expenses.map(Expense.fromJSON);
    return instance;
  }
  @observable expenses = [];
  constructor(name, phoneNumber, id = generateId()) {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
  }
  addExpense(name, value) {
    this.expenses.push(new Expense(name, value));
  }
  getExpensesValueSum() {
    let sum = 0;
    for (let expense of this.expenses) {
      sum += expense.value;
    }
    return sum;
  }
}
