import {GameService} from '../services/game.svc'


class GameController {
    constructor() {
        this.gs = new GameService();
        this.join = this.join.bind(this);
    }

    // /**
    //  * on POST /game/:gameType/join
    //  * @param req
    //  * @param res
    //  * @param next
    //  */
    // joinGame(req, res, next) {
    //     var gameType = req.params.gameType;
    //     var userId=req.userId;
    //     var game = this.gs.joinSomeGame(gameType, userId);
    //     res.send({
    //         success: true,
    //         message: "Initiate socket.io to the room by given game id",
    //         data:game
    //     })
    // };

    /**
     * ON socket.io event: game:join
     * @param io
     * @param socket
     * @param packet
     */
    join(io, socket, packet, ack) {
        try {
            var userId = packet.userId
            var game = packet.data;
            game = this.gs.joinSomeGame(game.type, userId);
            socket.join(game.id);
            ack({success: true, message: "You are joined to a " + game.type + " game", data: game})
            socket.broadcast.to(game.id).emit("game:join",{success: true, message: "Another player joined to" + game.type + " game", data: game})
        } catch (e) {
            ack({success: false, message: e.message, data:null})
            socket.emit('exception', {success: false, message: e.message})
            console.error(e.stack)
        }
    };

    state(io, socket, packet, ack){
        try {
            var userId = packet.userId
            var game = packet.data;
            this.gs.updateGameState(game, userId);
            socket.broadcast.to(game.id).emit('game:state', {success: true, message: "game state update", data: game})

        } catch (e) {
            socket.emit('exception', {success: false, message: e.message})
            console.error(e.stack)
        }
    }

}


export default GameController;


