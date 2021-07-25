import './Chat.css';
import React from 'react';

import MessageInput from '../messageInput/messageInput';
import { MediaChat } from '../media-chat/media-chat';
import { MediaChatReverse } from '../media-chat/media-chat';
import ChatContainer from '../chat-container/container';

class Chat extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = { message:[null] };
  } 

  // this function call in message input
  AddNewChat(event)
  {
    let temp = this.state.message;

    if(event.type === 'keypress')
    {
        if(event.code === "Enter" && event.target.value !== null && event.target.value !== '')
        {
          temp.push(event.target.value);
        }
    }
    else if(event.type === 'click')
    {
        temp.push(event.target.value);
    } 

    this.setState({message : temp});
  }

  render() {
    
    return (  
      <>
        <div className="container">
          <div className="">
            <div className="col-6">
              <div className="card container">
                <div className="card-header">
                  <div className="row">
                    <div className="offset-8 item-hover">
                      <i className="fas fa-bell bell-color"><i className="fa fa-circle-1" style={{ margin: "10px", fontSize: "15px", color: "red" }} ></i></i>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div id="message-box" className="chat-box-massage">
                    <ChatContainer />
                  </div>
                </div>
                <MessageInput onAdd = {this.AddNewChat.bind(this)} ></MessageInput>
              </div>
            </div>
          </div>
        </div>
        <MessageInput onAdd = {this.AddNewChat.bind(this)} ></MessageInput>
      </>
    );
  }
}

export default Chat;
