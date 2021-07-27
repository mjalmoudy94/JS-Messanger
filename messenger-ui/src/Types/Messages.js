import Users from "./Users";
import Chats from "./Chats";

class Messages {}

Messages.Message = class {
    constructor(Type) {
        this.Type = Type;
        this.ID = 0;
        this.From = new Users.User();
        this.To = new Chats.Chat();
    }
}

Messages.TextMessage = class extends Messages.Message{
    constructor(Text = '') {
        super('TextMessage');
        this.Text = Text;
        this.isRead = false;
    }
}

export default Messages;