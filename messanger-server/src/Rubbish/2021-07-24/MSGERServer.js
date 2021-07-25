const WebSocket = require('ws');
const {LoginDetails}  = require('./LoginDetails');


exports.MSGERServer = class MSGERServer {
    constructor() {
        this._ConnectedClients = [];
        this._SockerServer = {};
    }
    //
    Start = (Port) => {
        this._SockerServer = new WebSocket.Server({ port: Port });
        //
        this._SockerServer.on('connection', this.OnConnection);
    }
    //
    OnConnection = (ws) => {
        ws.on('message', (message) => {
            this.OnClientMessage(message,ws);
        });
        ws.on('close', () => {
            this.OnClientClose(ws);
        });
        ws.send('Connected');
    }
    //
    OnClientMessage = (messageJson,ws) => {
        console.log(messageJson);
        let message = JSON.parse(messageJson);
        //
        if (message.MessageType === 'Login'){
            this.LoginUser(message.Data.UserName,message.Data.Password,ws);
        } else if(message.MessageType === 'NewMessage'){
            console.log('NewMessage');
        }
    }
    //
    OnClientClose = (ws) => {
        this._ConnectedClients.filter(function(Connection, index, arr){
            Connection.id === ws.id && console.log(`${Connection.UserName} disconnected.`);
        });

        //
        this._ConnectedClients = this._ConnectedClients.filter(function(Connection, index, arr){
            return Connection.id !== ws.id;
        });
    }
    //
    LoginUser = (UserName,Password,ws) => {
        ws.id = Date.now();
        ws.UserName = UserName;
        this._ConnectedClients.push(ws);
    }
}