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
            CurrentPageName: 'Login',
            isMounted: false
        }
    }

    SetConnectionStatuesMessage = (Message) => {
        console.log(`SetConnectionStatuesMessage: ${Message}`)
        //
        if (this.state.isMounted) {
            this.setState(() => ({
                ConnectionStatues: Message
            }));
        }
    }

    //change current page with this page
    GoToPage = (PageName) => {
        console.log(`GoToPage: ${PageName}`)
        //
        if (this.state.isMounted) {
            this.setState({
                CurrentPageName : PageName
            });
        }

    }

    componentDidMount() {
        this.setState((state, props) => ({
            isMounted: true
        }), () => {
            //
            Core.UiEvents = {
                UpdateConnectionStatus : this.SetConnectionStatuesMessage,
                ChangePage : this.GoToPage
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
                {/*navigate between pages*/}
                { this.state.CurrentPageName === 'Chat' && <Chat /> }
                { this.state.CurrentPageName === 'Login' && <Login Status={this.state.ConnectionStatues}/> }
            </div>
        );
    }
}
