import React from 'react'
export default class MessageInput extends React.Component {

  render() {
    return (
      <div className="row input_box item-hover">
        <i onClick={this.props.onAdd} className="col-1 fa fa-paper-plane input-items-size-color" style={{ fontSize: "25px" }} ></i>
        <div className="col-sm-10"><input id="input" onKeyPress={this.props.onAdd} type="text" className="input-group" placeholder="Write something" />
        </div>
        <i className="col-sm-1 fa fa-paperclip input-items-size-color" style={{ transform: "rotate(45deg)", fontSize: "18px" }} ></i>
      </div>
    );
  }
}