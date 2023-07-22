# Live-FrontEnd

## Description

Frontend for a livestreaming application, meant to work similarly to other livestreaming sites such as Twitch, Youtube, ... . Frontend created with react and interacts with a websocket server to communicate with other chatters and an express api to deal with account details. Created to gain more understanding of Azure Media Services and Websockets.

## Installation


This project uses pnpm rather than npm. To install pnpm see https://github.com/pnpm/pnpm.

To run the application, follow these steps:

1. Install dependencies
```node.js
pnpm i
```

2. Run the code locally
``` node.js
pnpm dev
```

3. Optional(Build the code)
```node.js
pnpm build
```

Note: The following should be in a .env file where WS_URL is the url to your websocket server from the Live-Chat repository.

```
WS_URL={}
```