import {TextMessage} from "./DataType/TextMessage";
import {User} from "./DataType/User";
import {PrivateChat} from "./DataType/PrivateChat";

const {LoginStateAction} = require("./DataType/LoginStateAction");

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
        ws.on('message', (s) => {
            console.log(`OnMessage ${s}`)
            //this.OnMessage(message,ws);
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
            let mamad = new User();
            let amir = new User();
            //
            mamad.ID = 1;
            mamad.UserName = 'mamad';
            //
            amir.ID = 2;
            amir.UserName = 'amir';
            //
            let chatMamadVaAmir = new PrivateChat();
            chatMamadVaAmir.ID = 1;
            //
            //
            ws.send(JSON.stringify([
                new TextMessage('mamad')
            ]));
            //
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
    LoginUser = (UserName,Password,ws) => {
        console.log(`LoginUser(): ${UserName} , ${Password}`)
        //// init ////
        ws.id = ++this.userIDStartRange;
        ws.UserName = UserName;
        //// do ////
        this.ClientConnectionSocketLists.push(ws);
        //// clear ////
        let SuccessLoginAction = new LoginStateAction({state : 'Success'});
    }
    //
}








