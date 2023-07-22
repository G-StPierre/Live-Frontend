import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { login, logout, selectStatus } from "./Login/AuthSlice";
import React from "react";
import "./Navbar.css"
import Login from "./Login/Login";
import Register from "./Login/Register";


const Navbar = (props: {setIsRegisterOpen: any; setIsLoginOpen: any; isLoggedIn: boolean}) => {

    const [loggedIn, setLoggedIn] = useState(false)
    const dispatch = useDispatch();
    const loginStatus = useSelector(selectStatus);

    useEffect(() => {
        if(document.cookie.includes("token")) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [loginStatus])

    const logOut = () : void => {
        document.cookie = 'token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        dispatch(logout())
        setLoggedIn(false)
    }


    return (
        <div className="nav-container">
            <div className="home-container">
                <a href="/">Home</a>
            </div>
            <div className="nav-right">
                <div className="account-container" id="account-button">
                    {loggedIn && <a href="/account"><button>Account</button></a>}
                </div>
                <div className="login-status">
                    {loggedIn ? <button onClick={() => logOut()}>Logout</button>
                    : 
                    <div className="login-options">
                    <button onClick={() => props.setIsRegisterOpen(true)}>Register</button>
                    <button onClick={() => props.setIsLoginOpen(true)}>Login</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Navbar;