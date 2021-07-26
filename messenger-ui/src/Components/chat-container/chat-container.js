import React from 'react'
import { MediaChat } from '../media-chat/media-chat';
import { MediaChatReverse } from '../media-chat/media-chat';

export default class ChatContainer extends React.Component
{
    constructor(props)
    {
      super(props);
    } 

    render()
    {
        return(
            <>
                {/* test */}
                {this.props.MessageList.map(function(item,index){ return (<MediaChat key = {index} message = {item.Text} ></MediaChat> )})}
                {this.props.MessageList.map(function(item,index){ return (<MediaChatReverse key = {index} message = {item.Text} ></MediaChatReverse> )})}

            </>
        );
    }
}