## Getting started

### Prerequisites

- Node.js ^6.x
- npm ^3.x
- pm2 ^2.x

### Usage
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
      $ npm run start
    for production (using pm2)
      $ yarn start:prod
      $ yarn stop
    ```

## License
MIT License


## Extra comments

server: src files for the server
client: src files for the client
dist: build output of the client, which will be served by the backend express server itself.


