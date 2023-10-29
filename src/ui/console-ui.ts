import TurnDecisionManager from '../app/turn-decision-manager'
import type TurnResult from '../app/turn-result'
import { singleton } from 'tsyringe'
import TurnManager from '../domain/use_case/turn-manager'
import type Game from '../domain/entity/game'
import Std from './std'

@singleton()
class ConsoleUi {
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

    constructor(
        private readonly _turnManager: TurnManager,
        private readonly _turnDecisionManager: TurnDecisionManager,
        private readonly _std: Std,
    ) {
    }

    async startTurns() {
        this._turnManager.addPlayers(this.game.players.length)

        let turnResult: TurnResult
        for (let i = 0; true; ++i) {
            this._std.out(`turn ${i}`)

            const nextTurn = this._turnManager.nextTurn(this.game)

            turnResult = await this._turnDecisionManager.processTurn(nextTurn)
            this._std.out(turnResult)

            if (turnResult.isLast) {
                this._std.out('last turn')
                break
            }

            this._std.out('turn finished')
        }
    }
}

export default ConsoleUi
