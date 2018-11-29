import { generateId } from "../util/number.util";
import { Participant } from "./participant";

export class Bill {
    constructor(name, id = generateId()) {
        this.name = name;
        this.id = id;
        this.participants = [];
        this.payments = [];
    }
    addPayment(payerId, payeeId, amount) {
        // TODO: implement
    }
    addParticipant(participant) {
        if (!(participant instanceof Participant)) {
            throw new Error('participant has to be of type Participant');
        }
        this.participants.push(participant);
    }
}