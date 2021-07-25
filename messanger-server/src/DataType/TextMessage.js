import {Message} from "./Message";

export class TextMessage extends Message{
    constructor(Text = '') {
        super('TextMessage');
        this.Text = Text;
        this.isRead = false;
    }
}