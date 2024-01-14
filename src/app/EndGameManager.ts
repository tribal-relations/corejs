import type CurrentGame from './CurrentGame.ts'
import type Player from '../domain/entity/Player.ts'
import WinningCondition from '../domain/entity/WinningCondition.ts'

class EndGameManager {
    constructor(
        private readonly _currentGame: CurrentGame,
    ) {
    }

    get game(): CurrentGame {
        return this._currentGame
    }

    public initiateFinish(): void {
        this.finish()
    }

    private finish(): void {
        this.game.specificGame.isFinished = true
        this.game.specificGame.endDate = new Date()
        this.game.specificGame.winningCondition = this.calculateWinningCondition()
        this.game.specificGame.winner = this.calculateWinner()
    }

    private calculateWinningCondition(): WinningCondition {
        // TODO: implement
        return WinningCondition.createFromName(WinningCondition.winningConditionMilitaryName)
    }

    private calculateWinner(): Player {
        // TODO: implement
        const firstKey = Object.keys(this.game.players)[0]
        return this.game.players[firstKey]
    }
}

export default EndGameManager
