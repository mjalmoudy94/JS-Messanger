import './Chat.css';
import React from 'react';

import MessageInput from '../messageInput/messageInput';
import ChatContainer from '../chat-container/container';
import {TextMessage}  from '../../core/DataClasses/TextMessage';

class Chat extends React.Component {

  constructor(props)
  {
    super(props);
    //test 
    this.state = {message : [new TextMessage("hello"), new TextMessage("hi"),new TextMessage("Amirreza")]}
  } 
    
  messageListChanger(item)
  {
    let message = this.state.message;
    console.log(message);
    message.push(new TextMessage(item));
    this.setState({message : message});
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
                  <ChatContainer MessageList={this.state.message} />                  </div>
                </div>
                <MessageInput onclick={this.messageListChanger.bind(this)}></MessageInput>
              </div>
            </div>
          </div>
        </div>
        <MessageInput></MessageInput>
      </>
    );
  }
}

export default Chat;
