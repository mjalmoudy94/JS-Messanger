import './StatusBar.css'
import React from "react"

export default class StatusBar extends React.Component
{
    render(){
        return(
                <div className="icon offset-10 item-hover">
                    {/* this is zangole for nonfiction */}
                    <i className="fas fa-bell bell-color">
                    </i>
                    <i className="fa fa-circle-1">
                    </i>
                </div>
        );
    }
}