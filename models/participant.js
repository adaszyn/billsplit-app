import { generateId } from "../util/number.util";
import { Expense } from "./expense";
import {  observable} from "mobx";

export class Participant {
    @observable expenses = []
    constructor(name, phoneNumber, id = generateId()) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.isLocked = false;
    }
    addExpense(name, value) {
        this.expenses.push(new Expense(name, value));
    }
}