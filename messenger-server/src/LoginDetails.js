exports.LoginDetails = class LoginDetails{
    constructor(Data = {
        UserName:'',
        Password: ''
    }) {
        this.Data = Data
    }
    MessageType = 'Login';
};