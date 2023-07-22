import { AzureMP } from 'react-azure-mp'
import Chat from './Chat';
import './Stream.css'
import About from './About';
import {getUser, login} from '../services/UserService';
import { useEffect, useState } from 'react';
import chatService from '../services/ChatService';

const Stream = (props: {username?: string}) => {
    
    useEffect(() => {       
        async function fetchData() {
            console.log("fetching data")
            const data = await getUser(props.username!);
            console.log(data);
        }
        fetchData()
    }, [])

    return (
        <div className='stream-container'>
            <div className='content-container'>
            {/* <h1>Stream</h1> */}
            <div>
                <AzureMP
                className = "azure-player player"
                skin="amp-flush"
                src={[{src: "https://caligula-cact.streaming.media.azure.net/77986f41-448e-4d1d-aad4-48ed8605e5ba/output-20230624-201447-manifest.ism/manifest(format=m3u8-cmaf)", type: "application/vnd.ms-sstr+xml" }]}
                />
                <About username={props.username}/>
            </div>
            </div>
            <Chat />
            
        </div>
    );
}

export default Stream;