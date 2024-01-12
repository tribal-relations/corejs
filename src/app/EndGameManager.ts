import type Game from '../domain/entity/Game.ts'
import type Player from '../domain/entity/Player.ts'
import WinningCondition from '../domain/entity/WinningCondition.ts'
import GameNotYetCreated from '../exception/GameNotYetCreated'

class EndGameManager {
    _game: Game | undefined

    get game(): Game {
        if (this._game === undefined) {
            throw new GameNotYetCreated()
        }
        return this._game
    }

    set game(game: Game) {
        this._game = game
    }

    public initiateFinish(): void {
        this.finish()
    }

    private finish(): void {
        this.game.isFinished = true
        this.game.endDate = new Date()
        this.game.winningCondition = this.calculateWinningCondition()
        this.game.winner = this.calculateWinner()
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
