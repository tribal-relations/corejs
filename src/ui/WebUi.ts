import TurnDecisionManager from '../app/turn-decision-manager'
import type TurnResult from '../app/turn-result'
import { singleton } from 'tsyringe'
import TurnManager from '../domain/use_case/turn-manager'
import type Game from '../domain/entity/game'
import Std from './std'
import type Action from '../domain/entity/Action'

@singleton()
class WebUi {
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

    startTurns() {
        this._turnManager.addPlayers(this.game.players.length)

        let turnResult: TurnResult
        let decision: Action
        let parameters: string

        // TODO issue-16 add front https://github.com/tribal-relations/corejs/issues/16
    }
}

export default WebUi
