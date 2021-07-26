import React from 'react'
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
      <div className="row input_box item-hover">
        <i onClick={this.onClickHandler.bind(this)} className="col-1 fa fa-paper-plane input-items-size-color" style={{ fontSize: "25px" }} ></i>
        <div className="col-sm-10"><input id="input" onKeyPress={this.onClickHandler.bind(this)} type="text" className="input-group" placeholder="Write something" />
        </div>
        <i className="col-sm-1 fa fa-paperclip input-items-size-color" style={{ transform: "rotate(45deg)", fontSize: "18px" }} ></i>
      </div>
    );
  }
}