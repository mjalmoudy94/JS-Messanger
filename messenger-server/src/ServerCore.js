const Users = require('./Types/Users').Users
const Chats = require('./Types/Chats').Chats
const Actions = require('./Types/Actions').Actions
const Messages = require('./Types/Messages').Messages

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
        this.Express.get('/', function(req, res){
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
    OnConnection = (ws) => {
        console.log(`New Connection.`)
        //
        ws.on('message', (Message) => {
            console.log(`OnMessage ${Message}`)
            this.OnMessage(Message,ws);
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
            this.LoginUser(message.Data.UserName,message.Data.Password,ws);
        }   if (message.MessageType === 'GetMessage'){
            let mamad = new Users.User();
            let amir = new Users.User();
            //
            mamad.ID = 1;
            mamad.UserName = 'mamad';
            //
            amir.ID = 2;
            amir.UserName = 'amir';
            //
            let chatMamadVaAmir = new Chats.PrivateChat();
            chatMamadVaAmir.ID = 1;
            //
            //
            ws.send(JSON.stringify([
                new Messages.TextMessage('mamad')
            ]));
            //
        } else if(message.MessageType === 'NewMessage'){
            console.log('NewMessage');
        }
    }
    //
    OnClose = (ws) => {
        this.ClientConnectionSocketLists.filter(function(Connection){
            Connection.id === ws.id && console.log(`${Connection.UserName} disconnected.`);
        });
        //
        this.ClientConnectionSocketLists = this.ClientConnectionSocketLists.filter(function(Connection){
            return Connection.id !== ws.id;
        });
    }
    //
    //
    userIDStartRange = 1000000;
    LoginUser = (UserName,Password,ws) => {
        console.log(`LoginUser(): ${UserName} , ${Password}`)
        //// init ////
        ws.id = ++this.userIDStartRange;
        ws.UserName = UserName;
        //// do ////
        this.ClientConnectionSocketLists.push(ws);
        //// clear ////
        let SuccessLoginAction = new Actions.LoginState("Success");
        this.DoAction(SuccessLoginAction,UserName);
    }
    //
    DoAction = (Action,UserName) => {

    }
}








