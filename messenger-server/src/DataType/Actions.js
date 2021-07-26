class Actions {}

class Action {
    constructor(Type = '',Data = {}) {
        this.Type = Type;
        this.Data = Data;
    }
}

Actions.LoginState = class extends Action{
    constructor(State,To) {
        super('LoginState');
        this.Data.State = State;
        this.Data.To = To;
    }
}

exports.Actions = Actions;