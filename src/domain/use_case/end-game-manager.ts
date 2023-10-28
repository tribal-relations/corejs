import WinningCondition from "../entity/winning-condition";
import Player from "../entity/player";
import Game from "../entity/game";

class EndGameManager {
    constructor(
        private _game: Game
    ) {
    }

    finish() {
        this._game.isFinished = true
        this._game.endDate = new Date()
        this._game.winningCondition = this.calculateWinningCondition()
        this._game.winner = this.calculateWinner()
    }

    calculateWinningCondition(): WinningCondition {
        // TODO: implement
        return WinningCondition.createFromName(WinningCondition.winningConditionMilitaryName)
    }

    calculateWinner(): Player {
        // TODO: implement
        return this._game.players[0]
    }

    initiateFinish() {
        this.finish()
    }
}

export default EndGameManager
