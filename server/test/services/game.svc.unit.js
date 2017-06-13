import chai from 'chai'
import sinon from 'sinon'
import { mockReq, mockRes } from 'sinon-express-mock'
import {GameService} from '../../src/services/game.svc'
import UserService from '../../src/services/user.svc'
import TicTacToeGame from '../../src/model/tictactoe.mdl'


let assert = require('chai').assert;

describe('GameService', () => {
    describe('.tempUserAuth', () => {
        let gs;
        let user;
        let model=new TicTacToeGame();
        let us=new UserService();

        beforeEach(() => {
            // Create a new AuthController before each test
            gs = new GameService();
            user=us.createTempUser("testUser"); // and a new user
        });

        it('Join a game', () => {
            var game= gs.joinSomeGame(model.type, user.userId);
            assert(game!=null);
        });
    });
});
