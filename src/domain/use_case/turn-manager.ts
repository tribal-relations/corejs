import type Game from '../entity/game'
import Turn from '../entity/turn'
import { singleton } from 'tsyringe'

@singleton()
class TurnManager {
    private _playersLength = 0

    get playersLength() {
        return this._playersLength
    }

    addPlayer() {
        this._playersLength++
    }

    addPlayers(n: number) {
        this._playersLength += n
    }

    nextTurn(game: Game): Turn {
        game.currentTurnNumber++
        const turn = new Turn(game.players[game.currentTurnNumber % this.playersLength])
        game.currentTurn = turn

        return turn
    }
}

export default TurnManager
