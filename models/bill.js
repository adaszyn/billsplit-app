import { generateId } from "../util/number.util";
import { Participant } from "./participant";

export class Bill {
    constructor(name, type, id = generateId()) {
        if (!(type === 'simple' || type === 'shareable')) {
            throw new Error('type of bill should be either simple or shareable')
        }

        this.type = type;
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