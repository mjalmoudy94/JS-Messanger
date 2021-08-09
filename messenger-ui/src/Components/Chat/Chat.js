import './Chat.css';
import React from 'react';

import MessageInput from '../messageInput/messageInput';
import ChatContainer from '../chat-container/chat-container';
import {TextMessage} from '../../core/DataClasses/TextMessage';
import StatusBar from '../StatusBar/StatusBar';


class Chat extends React.Component {

    constructor(props) {
        super(props);
        //test
        this.state = {
            message: [
                new TextMessage("hello"),
                new TextMessage("hi"),
                new TextMessage("Amirreza")],
            PageName: props.CurrentPageName,
            width: window.innerWidth, height: window.innerHeight
        }
    }

    messageListChanger(item) {
        let message = this.state.message;
        console.log(message);
        message.push(new TextMessage(item)); // add  new item to last index

        if (message.length > 10) //limit for message list
        {
            message.splice(0, 1);// remove first index
        }

        this.setState({message: message});
    }

    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({behavior: "smooth"});
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        return (
            <>
                <div style={{height:this.state.height ,width:this.state.width}}>
                            <div className="card container-fluid" >
                                <div className="card-header">
                                    {/*<StatusBar/>*/}
                                </div>
                                <div className="card-body">
                                    <div id="message-box" className="chat-box-massage">
                                        <ChatContainer MessageList={this.state.message}/>
                                        {/* this is for scroll when component Becomes update*/}
                                        <div style={{float: "left", clear: "both"}}
                                             ref={(el) => {
                                                this.messagesEnd = el;
                                                }}
                                        />
                                    </div>
                                </div>
                                <MessageInput onclick={this.messageListChanger.bind(this)}/>
                            </div>
                </div>
            </>
        )
    };
}

export default Chat;
