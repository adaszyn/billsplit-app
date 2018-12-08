import { Participant } from "./participant";
import { observable } from "mobx";
import {generateId} from '../util/number.util';

export const PaymentState = {
    DONE: 'DONE',
    PENDING: 'PENDING',
    ERROR: 'ERROR'
}
export class Payment {
    @observable state = null;
    @observable payer = null;
    @observable payee = null;
    @observable amount = null;
    id = null;

    constructor(payer, payee, amount, state = PaymentState.PENDING, id = generateId()) {
        if (!(payer instanceof Participant) || !(payee instanceof Participant)) {
            throw Error("payer and payee should be of type Participant");
        }
        if (typeof amount !== 'number' || amount < 0) {
            throw new Error('amount should be positive number');
        }
        this.payer = payer;
        this.payee = payee;
        this.amount = amount;
        this.state = state;
        this.id = id;
    }

    qrUri() {
        return `https://image-proxy-lamswmfwgf.now.sh/?payee=${this.payee.phoneNumber}&amount=${this.amount}`
    }
}
