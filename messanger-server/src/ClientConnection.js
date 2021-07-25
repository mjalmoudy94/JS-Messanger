exports.ClientConnection = class ClientConnection{
    constructor(UserName,WebSocketConnection) {
        this._UserName = UserName;
        this._WebSocketConnection = WebSocketConnection
    }
};