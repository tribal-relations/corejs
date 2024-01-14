import type CurrentGame from './CurrentGame.ts'
import Turn from '../domain/entity/Turn.ts'

class TurnManager {
    nextTurn(game: CurrentGame): Turn {
        const playerNames = Object.keys(game.players)
        const nextName = playerNames[game.currentTurnNumber % game.playersLength]
        const turn = new Turn(game.players[nextName])
        game.currentTurnNumber++
        game.currentTurn = turn

        return turn
    }
}

export default TurnManager
