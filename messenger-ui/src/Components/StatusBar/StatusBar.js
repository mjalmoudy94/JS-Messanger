import './StatusBar.css'
import React from "react"

export default class StatusBar extends React.Component
{
    render(){
        return(
            <div className="row">
                <div className="offset-10 item-hover">
                   
                    {/* this is zangole for nonfiction */}
                    <i className="fas fa-bell bell-color">
                        <i className="fa fa-circle-1" style = {{ margin: "10px", fontSize: "15px", color: "red" }} >
                        </i>
                    </i>
                </div>
            </div>
        );
    }
}