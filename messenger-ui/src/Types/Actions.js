class Actions {}

Actions.Action = class {
    constructor(Type = '',Data = {}) {
        this.Type = Type;
        this.Data = Data;
    }
}

Actions.LoginState = class extends Actions.Action{
    constructor(State,Message,From) {
        super('LoginState',{
            State : State,
            Message : Message,
            From : From
        });
    }
}

export default Actions;