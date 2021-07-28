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
    OnMessage = (ActionJson,ws) => {
        let Action = JSON.parse(ActionJson);
        //
        if (Action.Type === 'Login'){
            this.LoginUser(Action.Data.UserName,Action.Data.Password,ws);
        }   if (Action.MessageType === 'GetMessage'){
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
        } else if(Action.MessageType === 'NewMessage'){
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
        this.SendAction(SuccessLoginAction,UserName);
    }
    //
    SendAction = (Action, UserName) => {
        console.log(JSON.stringify(Action));
        //
        this.ClientConnectionSocketLists.find((ws)=>{
            if (ws.UserName === UserName) return ws;
        }).send('test');
    }
}








