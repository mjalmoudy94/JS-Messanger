class Actions {}

class Action {
    constructor(Type = '',Data = {}) {
        this.Type = Type;
        this.Data = Data;
    }
}

Actions.LoginState = class extends Action{
    constructor(State,Message,From) {
        super('LoginState');
        this.Data.State = State;
        this.Data.Messge = Message;
        // From is the server name
        this.Data.To = From;
    }
}

exports.Actions = Actions;