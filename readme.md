## Getting started

### Prerequisites

- Node.js ^6.x
- npm ^3.x
- pm2 ^2.x

### Usage

$ cd server
$ npm install
$ npm run

Go to localhost:4000 in browser.
The server has a client build in the public folder.
Open up multiple tabs enter player names and start playing tictactoe!

#############################
1. Install  pm2
    ```
    $ npm install -g pm2
    ```

   
2. setup the config. Default is as below
    ```
    SERVER_PORT=3000
    SECRET_KEY="SECRET_KEY"
    
    ```
3. setup and run client
   ```
   setup:
   cd client
   npm install
   
   run:
   npm start
   ```
4. setup and run server
    ```
    setup:
    cd server
    npm install 
    
    run:
    for development (using HMR)
      $ npm start
    for production (using pm2)
      $ npm run start:prod
      //TODO:Sorry This want run. Didn't configure webpack build yet.
    ```

## License
MIT License


## Extra comments

server: src files for the server
client: src files for the client
server/public: build out put from the clint. NOTE: client was preconfigured to use localhost:4000, so for production builds rebuild the client with new config and copy paste here. TODO: auto reconfigure server url, by serverside rendering of the index.html or some other appropriate mechanism. 

Server Uses Json Web Tokens for security.
JWT middleware is set for both rest endpoints and socket.io  endpoints.

## TODOs
Clean up game state after players exit.
Validate game state to avoid malicious clients from cheating. (Currently the server does minimal work and let clients pass up state without much intervention)