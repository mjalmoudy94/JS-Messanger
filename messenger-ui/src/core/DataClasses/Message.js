import {User} from "./User";
import {Chat} from "./Chat";

export class Message{
    constructor(Type) {
        this.Type = Type;
        this.ID = 0;
        this.From = new User();
        this.To = new Chat();
    }
}

