import React from 'react';
import "./../assets/css/Game.css"

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: Array(9).fill(""),
            xIsNext: true,
        };

    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (this.calculateWinner(squares) || squares[i] || !(this.state.xIsNext ^ !this.props.iamX)) {
            //if game over or already _filled square, or not my turn
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        var newState={
            squares: squares,
            xIsNext: !this.state.xIsNext,
        }

        this.setState(newState);
        this.props.game.state=newState;
        this.props.socket.emit("game:state", {token:this.props.token, data:this.props.game})
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    calculateTie(squares){
        let count=0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i]=='X'|| squares[i]=='O') {
                count++;
            }
        }
        return count==9;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.socket && this.props.socket!==nextProps.socket){
            //If the parent setup a new socket.
            this.registerSocketHandlers(nextProps.socket);
        }
    }

    componentDidMount(){
        this.registerSocketHandlers(this.props.socket);
        this.setState(this.props.game.state)
    }

    registerSocketHandlers(socket){
        socket.on("game:state", (packet)=> {
            var game = packet.data;
            game.state
            this.setState(game.state)
        });
    }

    render() {
        const winner = this.calculateWinner(this.state.squares);
        const tie= this.calculateTie(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        }else if(tie){
            status = "Game Over! Nobody won."
        } else {
            status = (this.state.xIsNext ^ !this.props.iamX) ? 'Your Turn' : 'Other player should play';
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

}
export default Board;