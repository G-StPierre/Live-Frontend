import useWebSocket from 'react-use-websocket';
import "dotenv/config"

const WS_URL = process.env.WS_URL;

const chatService = () => useWebSocket(WS_URL, {
    onOpen: () => console.log('opened'),
    onClose: () => console.log('closed'),
    shouldReconnect: (closeEvent: any) => true,
    onMessage: (event: WebSocketEventMap['message']) => console.log('message', event.data),
    });

export default chatService;