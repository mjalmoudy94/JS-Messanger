import React, {useLayoutEffect} from 'react'
import  PropTypes  from 'prop-types';

export default class MessageInput extends React.Component {

  constructor(props)
{
  super(props);
  this.prototype = {
    message : PropTypes.func
  }
}

  onClickHandler(event){
    //Separation of events
    if(event.type === 'click')
    {
      //this condition becomes complete after
    }
    else if(event.type === 'keypress')
    {
      if(event.code === 'Enter'){
        //pass input value to parent
        this.props.onclick(event.target.value);

        //clear value in text input
        event.target.value = ''; 
      } 
    }
  }

  render() {
    return (
      <div className="input_box">
        <i onClick={this.onClickHandler.bind(this)} className="fa fa-paper-plane input-items-size-color" ></i>
        <input id="input" onKeyPress={this.onClickHandler.bind(this)} type="text" placeholder="Write Something" />
        <i className=" fa fa-paperclip" ></i>
      </div>
    );
  }
}