import TicTacToeGame from './tictactoe.mdl'

class GameFactory{
    createGame(gameType: string){
        switch(gameType){
            case(GAME_TICTACTOE):{
                return new TicTacToeGame();
            }
            default:{
                return null;
            }
        }
    }
}
export {GameFactory}
export const GAME_TICTACTOE=new TicTacToeGame().type;