// File Imports
import './App.css';
// React Imports
import React from "react";
// Components Imports
import StatusBar from "./Components/StatusBar/StatusBar";
import Login from "./Components/Login/Login";
import MessageBox from "./Components/MessageBox/MessageBox";

// Class Imports
import Core from "./core/Core";
import Chat from "./Components/Chat/Chat";
// test second

export default class App extends React.Component {
    constructor(Props) {
        super(Props);
        //
        // Component State
        this.state = {
            ConnectionStatues: '',
            isMounted: false
        }
    }

    SetConnectionStatuesMessage = (Message) => {
        console.log(`SetConnectionStatuesMessage: ${Message}`)
        //
        if (this.state.isMounted) {
            this.setState((state, props) => ({
                ConnectionStatues: Message
            }));
        }
    }

    componentDidMount() {
        this.setState((state, props) => ({
            isMounted: true
        }), () => {
            //
            Core.UiEvents = {
                UpdateConnectionStatus : this.SetConnectionStatuesMessage
            }
            Core.Connect('ws://localhost:8080/SocketBridge');
        });
        //
    }

    componentWillUnmount() {
        this.setState((state, props) => ({
            isMounted: false
        }));
    }

    render() {
        return (
            <div className={'AppComponent'}>
                <Login Status={this.state.ConnectionStatues}/>
                <Chat />
            </div>
        );
    }
}
