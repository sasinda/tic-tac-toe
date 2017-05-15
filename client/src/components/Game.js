import React from 'react';
import {config} from '../config'
import "./../assets/css/Game.css"
import Board from './Board'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

var ioconnect = require('socket.io-client');
var apiURL = "http://" + config.serverHost + ":" + config.serverPort + "/api/"

const apiReq = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: ""
}

class Game extends React.Component {

    constructor() {
        super();
        this.textInput = null;
        this.token = null;
        this.socket = null;
        this.userId = null;
        this.userName = null;

        this.state = {
            game: null,
            buttonDisabled: false,
            textFieldDisabled: false,
            ready: false,
            iamX: true,
            opponentName: null,
            message: "Type your nick name and press New Game to begin",
        };

        this.joinSomeGame = this.joinSomeGame.bind(this);
        this.newGame = this.newGame.bind(this);

    }

    componentDidMount() {
        var socket = this.socket = ioconnect('http://' + config['serverHost'] + ':' + config['serverPort'] + "/");
        this.state.socket = socket;
        socket.on("exception", (e) => {
            this.setState({message: "Oops! something went wrong :(  >> " + e.message})
        })
        socket.on("game:join", this.onJoin)
        // socket.on('event', function(data){});
        // socket.on('disconnect', function(){});
        // socket.on('init', this._initialize);
        // socket.on('send:message', this._messageRecieve);
        // socket.on('user:join', this._userJoined);
        // socket.on('user:left', this._userLeft);
        // socket.on('change:name', this._userChangedName);
    }

    newGame() {
        if (!this.token) {
            var userName = this.userName = this.textInput.getValue();
            if (userName == "" || userName == null) {
                alert("Please type a nick name in to the text field and press New Game");
                return;
            }

            this.state.textFieldDisabled = true;
            this.state.buttonDisabled = true;
            this.state.ready = true;

            fetch(apiURL + 'auth/temp', (() => {
                apiReq.body = JSON.stringify({userName: this.userName});
                return apiReq
            })()).then((response) => {
                response.json().then((json) => {
                    this.token = json['token'];
                    this.userId = json['data'].id;//data is a user object
                    this.joinSomeGame();
                })
            })
        } else {
            this.joinSomeGame();
        }


    }

    joinSomeGame() {
        this.socket.emit("game:join", {token: this.token, data: {type: "TicTacToeGame"}}, this.onJoin)
    }

    onJoin = (result) => {
        if (result && result.success) {
            let game = result.data;
            this.state.game = game;
            this.state.iamX = (game.playerTypes[this.userId] == 'X')

            if (game.players.length == 2) {
                let opponent=null;
                for (var i = 0; i < game.players.length; i++) {
                    opponent=game.players[i];
                    if(opponent.id!=this.userId)break;
                }
                this.setState({message: "Ready to play", ready: true, game: game, opponentName:opponent.name})

            } else {
                this.setState({message: "Waiting for another player to join"})
            }
        } else {
            this.setState({message: ":( Something went wrong! >>" + result.message})
        }
    }

    render() {
        return ( <div>
            <p>{this.state.message}</p>
            <p>You are playing against: {this.state.opponentName}</p>
            <p>You are player: {this.state.ready ? (this.state.iamX ? 'X' : 'O') : ""}</p>
            <TextField
                ref={(input) => {
                    this.textInput = input;
                }}
                hintText="Enter your nickname"
                disabled={this.state.textFieldDisabled}
            />
            <RaisedButton label="New Game" primary={true} onTouchTap={this.newGame}
                          disabled={this.state.buttonDisabled}/>
            {
                this.state.ready ? <Board socket={this.state.socket} iamX={this.state.iamX} game={this.state.game}
                                          token={this.token}/> : ""
            }
        </div>)

    }


}
export default Game;