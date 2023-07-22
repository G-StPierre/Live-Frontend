import { useState } from "react";
import { login } from "../../services/UserService";
import "./Login.css"
import { login as authLogin, selectStatus } from "./AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = (props: { isOpen: boolean, onClose: () => void}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [attempedLogin, setAttemptedLogin] = useState(false);
    const dispatch = useDispatch();
    const loginStatus = useSelector(selectStatus);


    const Login = async () => {
        console.log("Logging in account");
        await login(username, password);
        if(!document.cookie.includes("token")) {
            setAttemptedLogin(true);
            return;
        }
        dispatch(authLogin())
        console.log(loginStatus)
        setAttemptedLogin(false);
        props.onClose();
    }

    if(!props.isOpen){
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <p className="modal-message">Mes</p> 
                    <h2>Login</h2>
                    <button className="modal-leave" onClick={props.onClose}>X</button>
                </div>
                <div className="modal-body">
                    <form className="modal-form">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                    </form>
                </div>
                <div className="modal-footer">
                    <button onClick={() => Login()}>Login</button>
                </div>
                {attempedLogin &&
                    <div className="modal-footer">
                        <p className="modal-credentials">Wrong credentials!</p>
                    </div>
                }
            </div>
        </div>
    );

};

export default Login;