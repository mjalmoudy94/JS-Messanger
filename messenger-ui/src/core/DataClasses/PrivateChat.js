import {Chat} from "./Chat";
import {User} from "./User";

export class PrivateChat extends Chat{
    constructor() {
        super();
        this.Partner = new User();
        this.Read = false;
    }
}