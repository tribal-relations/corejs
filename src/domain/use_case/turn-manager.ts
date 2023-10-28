import Game from "../entity/game";
import Turn from "../entity/turn";

class TurnManager {
    private _index = 0

    constructor(
        private _game: Game
    ) {
    }

    nextTurn(): Turn {
        const len = this._game.players.length
        return new Turn(this._game.players[this._index++ % len])
    }
}

export default TurnManager