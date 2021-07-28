class LoginState {
    constructor(State, Message, From) {
        this.State = State;
        this.Message = Message;
        this.From = From;
    };
    //
    static State = {
        Successful : 'Successful',
        WrongDetails : 'WrongDetails',
        Logout : 'Logout'
    }
}

export default LoginState;