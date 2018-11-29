import { generateId } from "../util/number.util";

export class Participant {
    constructor(name, phoneNumber, id = generateId()) {
        this.id = id;
        this.name = name;
        this.expenses = []
        this.phoneNumber = phoneNumber;
        this.isLocked = false;
    }
}