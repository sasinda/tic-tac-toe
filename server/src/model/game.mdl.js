import uuid4 from 'uuid/v4';

let instance = null;

class Game {
    constructor() {
        this.type="Game";
        this.id = uuid4()
        this.state = {};
        this.players=[];//List<User>
    }
}
export default Game;


