import WinningCondition from '../entity/winning-condition'
import type Player from '../entity/player'
import type Game from '../entity/game'
import { singleton } from 'tsyringe'

@singleton()
class EndGameManager {
    _game: Game | undefined

    get game(): Game {
        if (this._game === undefined) {
            throw new Error('game is not yet created')
        }
        return this._game
    }

    set game(game: Game) {
        this._game = game
    }

    finish() {
        this.game.isFinished = true
        this.game.endDate = new Date()
        this.game.winningCondition = this.calculateWinningCondition()
        this.game.winner = this.calculateWinner()
    }

    calculateWinningCondition(): WinningCondition {
        // TODO: implement
        return WinningCondition.createFromName(WinningCondition.winningConditionMilitaryName)
    }

    calculateWinner(): Player {
        // TODO: implement
        return this.game.players[0]
    }

    initiateFinish() {
        this.finish()
    }
}

export default EndGameManager
