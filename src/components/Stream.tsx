import { AzureMP } from 'react-azure-mp'
import Chat from './Chat';
import './Stream.css'
import About from './About';
import {getUser, login} from '../services/UserService';
import { useEffect, useState } from 'react';
import chatService from '../services/ChatService';

const Stream = (props: {username?: string}) => {
    
    const [streamUrl, setStreamUrl] = useState<string>("")


    useEffect(() => {       
        async function fetchData() {
            const data = await getUser(props.username!);
            setStreamUrl(data.streamurl);
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
                src={[{src: {streamUrl}, type: "application/vnd.ms-sstr+xml" }]}
                />
                <About username={props.username}/>
            </div>
            </div>
            <Chat />
            
        </div>
    );
}

export default Stream;