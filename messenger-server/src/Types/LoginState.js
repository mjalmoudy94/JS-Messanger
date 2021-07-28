class LoginState {
    constructor(State, Message, From) {
        this.State = State;
        this.Message = Message;
        this.From = From;
    };
    //
    static Status = {
        Successful : 'Successful',
        WrongDetails : 'WrongDetails',
        Logout : 'Logout'
    }
}

exports.LoginState = LoginState;