import Game from './game.mdl'

class TicTacToeGame extends Game {
    constructor() {
        super();
        this.type = "TicTacToeGame"
        this.state = {
            sqares: ["", "", "", "", "", "", "", "", ""],
            xIsNext: true
        };
        this.playerTypes = {}
    }

}
export default TicTacToeGame;
