import {ConnectionStatus} from "./ConnectionStatus";
import {UiEvents} from "./UiEvents";
import {LoginAction} from "./DataClasses/LoginAction";
import Actions from "../Types/Actions";
import LoginState from "../Types/LoginState";

class Core {
    constructor(URL, ApplicationEvents) {
        console.log('constructor');
        this._ApplicationEvents = ApplicationEvents;
        this._ConnectingTryDelay = 0;
        this._ConnectionStatus = ConnectionStatus.Connected;
    }
    static UiEvents = new UiEvents();
    static ConnectionStatus = ConnectionStatus.Disconnected;
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
        //this._ConnectingTryDelay = 0;
    }
    //
    static OnClose = (event) => {
        console.log('OnClose()');
        this._Socket = undefined;
        this.UiEvents.UpdateConnectionStatus('Close!');
        //this._ConnectingTryDelay = this._ConnectingTryDelay + 5;
        //this._ApplicationEvents.UpdateApplicationStatus(`Try Again After ${this._ConnectingTryDelay} Seconds.`)
        //setTimeout(this.Connect, this._ConnectingTryDelay)
    }
    //
    static OnError = (event) => {
        //this._ApplicationEvents.UpdateApplicationStatus('Error!');
    }
    //
    /**
     //* @param {{Type: string, Data: {}}} Action
     */
    static OnMessage = (Action) => {
        console.log('On Message: ' + JSON.stringify(Action))
        //
        try {
            Action = JSON.stringify(Action);
        }catch (e){
            console.error(e)
        }
        //
        if (Action.Type === Actions.Type.ChangeLoginState){
            let CLSAction = new Actions.ChangeLoginState();
            CLSAction.Parse(Action);
            //
            if(CLSAction.Data.State === LoginState.State.Successful) {
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

export default Core;