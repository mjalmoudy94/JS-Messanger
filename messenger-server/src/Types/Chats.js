const Users = require('./Users').Users

class Chats {}

Chats.Chat = class Chat {
    constructor(Type) {
        this.ID = 0;
        this.Type = Type;
    }
}

Chats.PrivateChat = class extends Chats.Chat{
    constructor() {
        super('PrivateChat');
        this.Partner = new Users.User();
    }
}

exports.Chats = Chats;