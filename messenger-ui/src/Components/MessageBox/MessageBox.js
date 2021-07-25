import {TextMessage} from "../../core/DataClasses/TextMessage";

const MessageBox =  ({SetMessageBoxValue,UserMessageDraft,SendMessage}) => {
    let _UserMessage = UserMessageDraft;
    function UpdateUserMessage(event){
        SetMessageBoxValue(event.target.value);
    }
    function OnSendMessage(){
        let Message = new TextMessage();
        Message.Text = _UserMessage;
        SendMessage(Message);
    }
    return (
        <div>
            <input value={UserMessageDraft} onChange={UpdateUserMessage}/>
            <br />
            <button onClick={OnSendMessage}>send</button>
        </div>
    );
}

export default MessageBox;