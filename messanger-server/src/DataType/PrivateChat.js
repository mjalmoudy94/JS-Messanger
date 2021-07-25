import {Chat} from "./Chat";
import {User} from "./User";

export class PrivateChat extends Chat{
    constructor() {
        super();
        this.Type = 'PrivateChat';
        this.Partner = new User();
    }
}