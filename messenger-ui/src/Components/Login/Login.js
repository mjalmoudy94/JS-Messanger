// import './Login.css'
import UiCore from "../../core/UiCore";

const Login = (Props) => {
    const UserData = {
        UserName: '',
        Password: ''
    }

    function Connect() {
        UiCore.Login(UserData);
    }

    function UpdateUserName(event) {
        UserData.UserName = event.target.value
    }

    function UpdatePassword(event) {
        UserData.Password = event.target.value
    }

    return (
        <>

            <ul className="collapsible">
                <li>
                    <div className="collapsible-header">
                        <i className="material-icons">filter_drama</i>
                        First
                        <span className="new badge">4</span></div>
                    <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                </li>
                <li>
                    <div className="collapsible-header">
                        <i className="material-icons">place</i>
                        Second
                        <span className="badge">1</span></div>
                    <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                </li>
            </ul>


            <a className="btn-floating pulse"><i className="material-icons">menu</i></a>
            <a className="btn-floating btn-large pulse"><i className="material-icons">cloud</i></a>
            <a className="btn-floating btn-large cyan pulse"><i className="material-icons">edit</i></a>


            {/*<div className="main">*/}
            {/*    <p className="">Sign in</p>*/}
            {/*    <form className="center-align">*/}
            {/*        <input className="" type="text" placeholder="Username" onChange={UpdateUserName}/>*/}
            {/*        <input className="" type="password" placeholder="Password" onChange={UpdatePassword}/>*/}

            {/*        <a className="btn" onClick={Connect}><i className="material-icons right">cloud</i>button</a>*/}
            {/*        <p className="forgot">*/}
            {/*            <a href="#">Forgot Password?</a>*/}
            {/*        </p>*/}
            {/*    </form>*/}
            {/*</div>*/}
            {/*<p className={'MessengerStatus'}>*/}
            {/*    {Props.Status}*/}
            {/*</p>*/}
        </>
    );

};

export default Login;