import {ConnectionStatus} from "./ConnectionStatus";
import {UiEvents} from "./UiEvents";
import {LoginAction} from "./DataClasses/LoginAction";
import Actions from "../Types/Actions";
import LoginState from "../Types/LoginState";

class UiCore {
    constructor(URL, ApplicationEvents) {
        console.log('constructor');
        this._ApplicationEvents = ApplicationEvents;
        this._ConnectingTryDelay = 0;
        this._ConnectionStatus = ConnectionStatus.Connected;
    }
    static UiEvents = new UiEvents();
    static ConnectionStatus = ConnectionStatus.Disconnected;
    static LastTryTimeoutLength = 1000;
    //
    static Connect = (URL) => {
        console.log(`Connect(${URL})`);
        //// init ////
        if (this._Socket !== undefined) {
            console.log('this._Socket !== undefined');
            return;
        }
        //// do ////
        this.UiEvents.UpdateConnectionStatus('Connecting..')
        this._Socket = new WebSocket(URL);
        //// clean ////
        // Connection opened
        this._Socket.addEventListener('open', this.OnOpen);
        this._Socket.addEventListener('close', this.OnClose);
        this._Socket.addEventListener('error', this.OnError);
        this._Socket.addEventListener('message', this.OnMessage);
    }
    //
    static OnOpen = (event) => {
        console.log('OnOpen()');
        this.UiEvents.UpdateConnectionStatus('Connected!');
        UiCore.LastTryTimeoutLength = 1000;
    }
    //
    static OnClose = (event) => {
        console.log('OnClose()');
        this._Socket = undefined;
        this.UiEvents.UpdateConnectionStatus(`Close! Connecting after ${UiCore.LastTryTimeoutLength / 1000}sec...`);
        this.UiEvents.ChangePage('Login')
        //
        setTimeout(()=>{
            UiCore.Connect('ws://localhost:8080/SocketBridge');
        },UiCore.LastTryTimeoutLength)
        //// clear ////
        UiCore.LastTryTimeoutLength = UiCore.LastTryTimeoutLength + 1000;
    }
    //
    static OnError = (event) => {
        //this._ApplicationEvents.UpdateApplicationStatus('Error!');
    }
    //
    /**
     //* @param {{Type: string, Data: {}}} Action
     */
    static OnMessage = (WSMessage) => {
        console.log('On Message: ' + WSMessage.data)
        //
        let Action = new Actions.Action();
        try {
            Action = JSON.parse(WSMessage.data);
        }catch (e){
            console.error(e)
        }
        //
        if (Action.Type === Actions.Type.ChangeLoginState){
            console.log('2')
            let CLSAction = new Actions.ChangeLoginState();
            CLSAction = Action;
            //
            if(CLSAction.Data.State === LoginState.Status.Successful) {
                console.log('3')
                this.UiEvents.ChangePage('Chat');
            }
        }
    }
    //
    /**
     * @param {{Type: string, Data: {}}} Action
     */
    static DoAction = (Action) => {
        console.log(`DoAction: ${JSON.stringify(Action)}`)
        //// init ////
        if (this._Socket === undefined) {
            console.log(`_Socket === undefined`);
            return false;
        }
        if (Action === undefined){
            console.log(`Action === undefined`);
            return false;
        }
        //// do ////
        this._Socket.send(JSON.stringify(Action));
        //// clean ////
        return true;
    }
    //
    /**
     * @param {{UserName: string, Password: string}} Detail
     */
    static Login = (Detail) => {
        //// init ////
        let action = new LoginAction('Login');
        action.Data = Detail;
        //// do ////
        if (!this.DoAction(action)){
            console.log(`DoAction(LoginAction)`)
        }
        //// clean ////
    }
    //
    /**
     * @param {Message} Message
     */
    static SendMessage = (Message) => {
        //// init ////
        let action = new LoginAction('SendMessage');
        action.Data = Message;
        //// do ////
        if (!this.DoAction(action)){
            console.log('NoConnection');

        }
        //// clean ////
        //this.UiEvents.SetMessageBoxValue('');
    }
}

export default UiCore;