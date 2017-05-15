import express from 'express';
import session from 'express-session'
import cookieParser from 'cookie-parser'
import path from 'path';
import bodyParser from 'body-parser';
import api from './routes';
import morgan from 'morgan';
import http from 'http';
import io from './routesio';

var app = express();
var server  = http.createServer(app);
io.listen(server);


//SETUP CONFIGS
require('dotenv').config();
const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : 4000;
app.set('port', port);
app.set('secret', process.env.SECRET ? process.env.SECRET: "Sh0PK33PS3CR3T");



//dev only log requests.
// app.use(morgan('dev'));
//to allow cross origin client server to connect to express js on 4000. cross origin
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin );
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api', api);
app.use('/', express.static(path.join(__dirname, '..', 'public')));





server.listen(port);