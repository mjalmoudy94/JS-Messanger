const {Action} = require("./Action");

exports.LoginStateAction = class LoginStateAction extends Action{
    constructor(Data = {}) {
        super('LoginState');
        this.Data = Data;
    }
}