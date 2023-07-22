import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {useSelector} from "react-redux";
import React from "react";
import "./Chat.css"
import chatService from "../services/ChatService";
import { selectStatus } from "./Login/AuthSlice";

const Chat = () => {
    type IMessage = {
        user: string,
        message: string
    }

    const loginStatus = useSelector(selectStatus);

    const [isConnected, setIsConnected] = useState(false); // Use this to show a loading icon until connected
    const [messages, setMessages] = useState(Array<IMessage>); // Use this to store messages
    const [serverMessage, setStreamMessage] = useState<string>("");
    const [webSocketReady, setWebSocketReady] = useState<boolean>(false);
    const [webSocket, setWebSocket] = useState<WebSocket>(new WebSocket(`ws://localhost:8080/${document.cookie.split('=')[1]}`));
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [token, setToken] = useState<string>(document.cookie.split("=")[1]);

    const createTestMessages = () => {
        const message : {user: string, message: string} = {
            user: "DecembersTruly",
            message: "Hello world!"
        }
        return message;
    }

    const sendMessage = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target  = event.target as typeof event.target & {
            message: { value: string };
        };
        const message = target.message.value;
        webSocket.send(message);
    }

useEffect(() => {
    if(loginStatus != '')
    {
        setLoggedIn(true);
        return;
    }
    setLoggedIn(false);
    }, [loginStatus])

useEffect(() => {
        if(webSocket === null){
            setWebSocket(new WebSocket(`ws://localhost:8080/${document.cookie.split('=')[1]}`));
        }
        
        return () => {
            if(webSocket.readyState === 1){
                console.log("HERE")
                webSocket.close();
            }
        };
    }, [token]);

useEffect(() => {
        webSocket.onopen = () => console.log('opened'),
        webSocket.onclose = (event: any) => console.log('closed'),
        webSocket.onmessage = (event : WebSocketEventMap['message']) => { 
            let splitMessage = event.data.split(':');
            setMessages([...messages, {user: splitMessage[0].substring(1), message: splitMessage[1].substring(1, splitMessage[1].length - 1)}])
        }
        webSocket.onclose = (event:any) => {
            setWebSocketReady(false);
            setTimeout(() => {
                setWebSocket(new WebSocket(`ws://localhost:8080/${document.cookie.split('=')[1]}`));
            }
            , 500);
        }

        webSocket.onerror = (error: any) => {
            setWebSocketReady(false);
        };
})

useEffect(() => {
        if(document.cookie.includes("token")) {
            setLoggedIn(true)
        }
        console.log(loggedIn)
    }, [])


    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.slice(messages.length - 30, messages.length).map((message, i) => {
                    console.log(message)
                    // Think of some kind of design for even/odd messages!
                    return <span key={i} className={"chat-message " + (i % 2 == 0 ? 'even-chat' : 'odd-chat')}>{message.user}: {message.message} {"\n"}</span>
                })}
            </div>
            { loggedIn ?
            <form className="chat-input" onSubmit={(e: React.SyntheticEvent) => sendMessage(e)}>
                <input type="text" id="message"/>
                <button type="submit">Send</button>
            </form>
            :
            <div className="chat-input">
                <p className="chat-login">Log in to chat!</p>
            </div>
            }
        </div>
    );
}

export default Chat;