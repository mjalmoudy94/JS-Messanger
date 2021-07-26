const Actions = require('./DataType/Actions').Actions
const express = require('express');
//
exports.CoreServer = class CoreServer{
    Express = express();
    ExpressWS = require('express-ws')(this.Express);
    ClientConnectionSocketLists = [];
    //
    Start(port){
        this.Express.use(function (req, res, next) {
            return next();
        });
        //
        this.Express.get('/', function(req, res, next){
            res.write('Building!');
            res.end();
        });
        //
        this.Express.ws('/SocketBridge', this.OnConnection);
        //
        this.Express.listen(port);
        //
        console.log(`Start On Port ${port}`)
    }
    //
    // Connections Events
    OnConnection = (ws,req) => {
        console.log(`New Connection.`)
        //
        ws.on('message', (message) => {
            //console.log(`OnMessage ${s}`)
            this.OnMessage(message,ws);
        });
        ws.on('close', () => {
            console.log(`close`)
            this.OnClose(ws);
        });
        ws.send('Connected');
    }
    //
    OnMessage = (messageJson,ws) => {
        console.log(messageJson);
        let message = JSON.parse(messageJson);
        //
        if (message.MessageType === 'Login'){
            this.LoginUser(message.Data,ws);
        } else if(message.MessageType === 'NewMessage'){
            console.log('NewMessage');
        }
    }
    //
    OnClose = (ws) => {
        this.ClientConnectionSocketLists.filter(function(Connection, index, arr){
            Connection.id === ws.id && console.log(`${Connection.UserName} disconnected.`);
        });
        //
        this.ClientConnectionSocketLists = this.ClientConnectionSocketLists.filter(function(Connection, index, arr){
            return Connection.id !== ws.id;
        });
    }
    //
    //
    userIDStartRange = 1000000;
    LoginUser = (Data,ClientSocket) => {
        console.log(`LoginUser(): ${Data.UserName} , ${Data.Password}`)
        //// check ////
        if(Data.UserName === null || Data.UserName === '' || Data.UserName === undefined){
            let UnSuccessLoginAction = new Actions.LoginState('Error');
            UnSuccessLoginAction.Data.Message = 'No User Name Send!';
            this.SendAction(SuccessLoginAction,Data.UserName);
        }
        //// init ////
        ClientSocket.id = ++this.userIDStartRange;
        ClientSocket.UserName = Data.UserName;
        //// do ////
        this.ClientConnectionSocketLists.push(ClientSocket);
        //// clear ////
        let SuccessLoginAction = new Actions.LoginState('Success');
        SuccessLoginAction.Data.Message = 'login successfully!'
        this.SendAction(SuccessLoginAction,Data.UserName);
    }
    //
    //
    SendAction = (Action,UserName) => {

    }
}








