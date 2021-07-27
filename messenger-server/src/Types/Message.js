const {User} = require("./User");
const {Chat} = require("./Chat");


export class Message{
    constructor(Type) {
        this.Type = Type;
        this.ID = 0;
        this.From = new User();
        this.To = new Chat();
    }
}

