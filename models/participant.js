import { generateId } from "../util/number.util";
import { Expense } from "./expense";

export class Participant {
    constructor(name, phoneNumber, id = generateId()) {
        this.id = id;
        this.name = name;
        this.expenses = []
        this.phoneNumber = phoneNumber;
        this.isLocked = false;
    }
    addExpense(name, value) {
        this.expenses.push(new Expense(name, value));
    }
}