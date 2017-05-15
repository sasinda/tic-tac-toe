import {GameFactory} from '../model/game.factory'
import UserService from './user.svc'
var instance = null;
class GameRooms {
    constructor() {
        if (!instance) {
            instance = this;
        }
        this._all = new Map();
        this._available = new Map();//Map<String,Game>()
        this._filled = new Map();
        this._users = new Set(); //user ids of user already in a game
        return instance;
    }

    static getInstance() {
        if (!instance) {
            instance = new GameRooms();
        }
        return instance;
    }

    /**
     * Updates the state of the game.
     * @param game
     */
    update(game) {
        let storedGame = this._all.get(game.id);
        storedGame.state = game.state;
    }

    makeAvailable(game) {
        this._available.set(game.id, game);
        this._all.set(game.id, game);
    }

    nextAvailable() {
        return this._available.values().next().value;
    }

    moveToFilled(game) {
        this._available.delete(game.id);
        this._filled.set(game.id, game);
    }

    delete(game) {
        this._all.delete(game.id);
        this._filled.delete(game.id);
    }

}

class GameService {
    //TODO use strategy pattern when multiple games types are _available. Remove the abstract facctory for models when refactored, the strategy class can implement the createGame mehtod as well.
    constructor() {
        this.rooms = GameRooms.getInstance();
        this.factory = new GameFactory();
        this.usvc=new UserService();
        this.createGame.bind(this);
        this.joinSomeGame.bind(this);
    }

    createGame(gameType: string) {
        var game = this.factory.createGame(gameType)
        if (!game)throw "Unknow Game Type"
        return game;
    }

    /**
     * Joins an already _available game or a new one of the given @gameType
     * @param gameType
     * @param userId
     * @throws Exception
     * 1. Invallid Game Type
     * 2. Same User Cant join the same game twise
     */
    joinSomeGame(gameType, userId) {
        var game;
        //TODO: refactor: wrote tictactoe specific code here. Should move to it's own startegy when multiple game types are there.
        if (this.rooms._available.size > 0) {
            game = this.rooms.nextAvailable();
            game.playerTypes[userId] = 'O';
            this.rooms.moveToFilled(game)
        } else {
            game = this.createGame(gameType);
            game.playerTypes[userId] = 'X';
            this.rooms.makeAvailable(game)
        }
        game.players.push(this.usvc.getTempUser(userId))
        this.usvc.deleteTempUser(userId);// We no longer keep data of this user. Clients get the burden of storing the very light user info, in the passed game state messages.
        return game;
    }

    /**
     * update the game state.
     * TODO:check validity, in case of cheating clients.
     * @param game
     * @param userId
     */
    updateGameState(game, userId) {
        this.rooms.update(game)
    };

}


export {
    GameFactory, GameService
}