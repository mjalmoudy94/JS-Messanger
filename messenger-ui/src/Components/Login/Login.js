import './Login.css'
import Core from "../../core/Core";

const Login = (Props) => {
    const UserData = {
        UserName: '',
        Password: ''
    }

    function Connect() {
        Core.Login(UserData);
    }

    function UpdateUserName(event) {
        UserData.UserName = event.target.value
    }

    function UpdatePassword(event) {
        UserData.Password = event.target.value
    }

    return (
        <div className='LoginComponent'>
            <div className="main">
                <p className="sign">Sign in</p>
                <form className="form1">
                    <input className="un " type="text" placeholder="Username" onChange={UpdateUserName}/>
                    <input className="pass" type="password" placeholder="Password" onChange={UpdatePassword}/>
                    <a className="submit" onClick={Connect}>Sign in</a>
                    <p className="forgot">
                        <a href="#">Forgot Password?</a>
                    </p>
                </form>
            </div>
            <p className={'MessengerStatus'}>
                {Props.Status}
            </p>
        </div>
    );
};

export default Login;