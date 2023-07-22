import { useState } from "react"
import "./Account.css"
import { useEffect } from "react"
import { getUser } from "../services/UserService"
import chatService from "../services/ChatService"
import useWebSocket from 'react-use-websocket';

const Account = () => {

    const [bio, setBio] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [links, setLinks] = useState<string[]>([])
    const [streamLink, setStreamLink] = useState<string>("")



    useEffect(() => {
        const fetchData = async () => {
            await getUser(username).then((data) => {
                setBio(data.bio);
                setUsername(data.username);
            }).catch((err) => {
                console.log(err);
            })}
        fetchData()
    }, [])

    const updateAccountInfo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div className="account-container">
            <h3>Account</h3>
            <form className="account-settings" onSubmit={(e) => updateAccountInfo(e)}>
                <div className="form-row">
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder={username} name="username" id="username" />
                </div>
                <div className="form-row links">
                    <label htmlFor="links">Links</label>
                    <div className="link-options">
                        <div className="individual-link">
                            <label htmlFor="youtube">Youtube</label>
                            <input type="text" name="youtube" id="youtube" /> 
                        </div>
                        <div className="individual-link">
                            <label htmlFor="tiktok">TikTok</label>
                            <input type="text" name="tiktok" id="tiktok" />
                        </div>
                        <div className="individual-link">
                            <label htmlFor="twitter">Twitter</label>
                            <input type="text" name="twitter" id="twitter" />
                        </div>
                        <div className="individual-link">
                            <label htmlFor="instagram">Instagram</label>
                            <input type="text" name="instagram" id="instagram" />
                        </div>
                        <div className="individual-link">
                            <label htmlFor="discord">Discord</label>
                            <input type="text" name="discord" id="discord" />
                        </div>
                        <div className="individual-link">
                            <label htmlFor="website">Website</label>
                            <input type="text" name="website" id="website" />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <label htmlFor="bio">Bio</label>
                    <textarea name="bio" placeholder={bio} id="bio" cols={30} rows={10}></textarea>
                </div>
                
                <div className="form-row">
                <button type="submit">Update</button>
                </div>
            </form>
            <div className="password-container">
                <form className="account-settings">
                    <div className="pass-options">
                        <div className="form-row pass-row">
                            <label htmlFor="password">Current Password</label>
                            <input type="password" name="currentPassword" id="currentPassword" />
                        </div>
                        <div className="form-row">
                            <label htmlFor="password">Confirm Current Password</label>
                            <input type="password" name="currentPasswordConf" id="currentPasswordConf" />
                        </div>
                        <div className="form-row">
                            <label htmlFor="password">New Password</label>
                            <input type="password" name="newPassword" id="newPassword" />
                        </div>
                        <div className="form-row">
                            <button type="submit">Update</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="account-streamkey">
                <h3>Stream Key</h3>
                <p>Here is your stream key! Please use this to stream to the platform!</p>
                <p>Stream link!</p>
            </div>
        </div>
    )
}

export default Account;