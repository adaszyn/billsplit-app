export class Expense {
  static fromJSON(expense) {
    const instance = new Expense(expense.name, Number(expense.value));
    return instance;
  }
  constructor(name, value) {
    if (typeof value !== "number") {
      throw new Error("Value needs to be of type 'number'");
    }
    this.name = name;
    this.value = value;
  }
}
