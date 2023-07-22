import { useState } from "react";
import { registerUser } from "../../services/UserService";
import "./Register.css"

const Register = (props: { isOpen: boolean, onClose: () => void}) => {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const RegisterAccount = () => {
        let res = registerUser(username, password, email)
    }

    if(!props.isOpen){
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <p className="modal-message">Mes</p> 
                    <h2>Register</h2>
                    <button className="modal-leave" onClick={props.onClose}>X</button>
                </div>
                <div className="modal-body">
                    <form className="modal-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                    </form>
                </div>
                <div className="modal-footer">
                    <button onClick={() => RegisterAccount()}>Register</button>
                </div>
            </div>
        </div>
    );

};

export default Register;