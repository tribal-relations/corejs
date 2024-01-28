import type CurrentGame from './CurrentGame.ts'
import type Player from '../domain/entity/Player.ts'
import WinningConditionName from '../domain/enum/WinningConditionName.ts'
import WinningConditionRepository from '../domain/repository/WinningConditionRepository.ts'

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

    private calculateWinningCondition(): WinningConditionRepository {
        return WinningConditionRepository.get(WinningConditionName.Points)
    }

    private calculateWinner(): Player {
        let maxPoints = 0
        let winner: Player
        for (const playerName in this.game.players) {
            if (this.game.players[playerName].tribe.points > maxPoints) {
                winner = this.game.players[playerName]
                maxPoints = this.game.players[playerName].tribe.points
            }
        }

        return winner
    }
}

export default EndGameManager
