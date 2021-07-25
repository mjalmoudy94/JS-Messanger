import React from 'react'
import  PropTypes  from 'prop-types';

MediaChat.prototype = {
    message : PropTypes.array
}

export function MediaChat(props)
{
    let date = new Date();
    return(
        <div className="media media-chat">
                <img className = "avatar" src = {"resource/FREE-PROFILE-AVATARS.png"} alt="png" width="20px" />
                <div className = "media-body">
                      {/* show user message */}
                      {props.message.map((t, index) => { return(<p key={index}>{t}</p>) } ) }
                     
                      <p className="time">
                          <time>
                              {date.getHours().toString()} <span>:</span> {date.getMinutes().toString()}
                          </time>
                      </p>
                </div>
        </div>  
    );
}

export function MediaChatReverse(props)
{
    let date = new Date();
    return(
        <div className="media media-chat-reverse">
                    <div className = "media-body">
                        {/* show user message */}
                        { props.message.map( (t, index) => { return(<p key={index}>{t}</p>) } ) }
                        <p className="time">
                             <time>{date.getHours().toString()} <span>:</span> {date.getMinutes().toString()}</time>
                        </p>
                    </div>
        </div>
    );

}
