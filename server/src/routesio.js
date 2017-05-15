import GameController from './controllers/game.ctrl'
import AuthController from './controllers/authenticate.ctrl'
import SocketIO from 'socket.io'

let gc = new GameController();
let ac = new AuthController();
var io=new SocketIO();

io.sockets.on('connection', function (socket) {
    socket.use(function (packet, next) {
        ac.filterAuthIO(packet[1],next);
    });
    socket.on('game:join', (packet,ack) => {
        gc.join(io, socket, packet, ack);
    });
    socket.on('game:state', (packet,ack) => {
        gc.state(io, socket, packet, ack);
    });
});
console.log("socket.io routes configured")
export default io;