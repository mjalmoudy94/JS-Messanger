import LoginState from "./LoginState";

class Actions {}

Actions.Action = class {
    constructor(Type = '',Data = {}) {
        this.Type = Type;
        this.Data = Data;
    }
    Parse(Action){
        if (typeof Action === 'object'){
            this.Data = Action.Data
        }else {
            try {
                this.Data = JSON.parse(Action).Data
            }catch (e) {
                console.log(e)
            }
        }
    }
}

Actions.ChangeLoginState = class extends Actions.Action{
    constructor(LoginState) {
        super('ChangeLoginState');
        this.Data = LoginState;
    }

}

Actions.Type = {
    ChangeLoginState : 'ChangeLoginState'
}

export default Actions;