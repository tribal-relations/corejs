import type CurrentGame from './CurrentGame.ts'
import type Tribe from '../domain/entity/Tribe.ts'
import Turn from '../domain/entity/Turn.ts'
import type CaravansStore from '../domain/store/CaravansStore'

class TurnManager {
    constructor(
        private readonly _caravansManager: CaravansStore,
    ) {
    }

    nextTurn(game: CurrentGame): Turn {
        const playerNames = Object.keys(game.players)
        const nextName = playerNames[game.currentTurnNumber % game.playersLength]
        const turn = new Turn(game.players[nextName])
        game.currentTurnNumber++
        game.currentTurn = turn

        return turn
    }

    tribeProfitBeforeActions(tribe: Tribe): void {
        this._caravansManager.keepCaravansProfits(tribe)
    }
}

export default TurnManager
