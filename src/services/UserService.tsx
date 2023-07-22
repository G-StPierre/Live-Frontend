import axios from "axios"
import {login as authLogin, selectStatus} from "../components/Login/AuthSlice"
import { useDispatch, useSelector } from "react-redux";

// For login and register 
const baseURL = "http://localhost:3000/api/user"

const config = {
    headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}`}}

const login = async (username: string, password: string): Promise<any> => {
    try {
        const response = await axios.post(baseURL + "/login", { username, password })
        console.log(response);
        document.cookie = `token=${response.data}`
    } catch (error) {
        console.log(error)
    }
}

const getUser = async (username: string): Promise<IUser> => {
    const response = await axios.get(baseURL + `/${username}`, config)
    console.log(response);
    return response.data
}

const registerUser = async (username: string, password: string, email:string): Promise<any> => {
    const bio = "Default bio" // Can be updated at a later date by the user!
    const response = await axios.post(baseURL, { username, password, email, bio});
    return response.data
}

export {login, getUser, registerUser } 