import express from 'express';
import AuthController from './controllers/authenticate.ctrl';
import GameController from './controllers/game.ctrl'

const router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'Welcom to the game server api. Please create temporary user by hitting /api/auth/temp with body: {"userName"="ur temporary nickname"}. ' });
});

// required token route
var ac=new AuthController();
router.post('/auth/temp/', ac.tempUserAuth);

//Protected api endpoints need to use jwt verification middleware
var gc=new GameController();
router.post('/game/:gameType/join',ac.filterAuth, gc.join);

export default router;
