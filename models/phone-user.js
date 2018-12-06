import { Participant } from "./participant";
import { UserConfig } from "../config/user.config";

export class PhoneUser extends Participant {
    constructor() {
        super();
        this.name = UserConfig.name,
        this.phoneNumber = UserConfig.phoneNumber,
        this.id = UserConfig.id
    }
}
