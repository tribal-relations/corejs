import type CurrentGame from '../../../app/CurrentGame.ts'
import type RelationsManager from '../../../app/RelationsManager.ts'
import type TurnManager from '../../../app/TurnManager.ts'
import TurnResult from '../../../app/TurnResult.ts'
import type Player from '../../../domain/entity/Player.ts'
import type Tribe from '../../../domain/entity/Tribe.ts'
import type Turn from '../../../domain/entity/Turn.ts'
import type CommonRoundManager from '../../common/CommonRoundManager.ts'

class RegularRound {
    constructor(
        private readonly _currentGame: CurrentGame,
        private readonly _turnManager: TurnManager,
        private readonly _relationsManager: RelationsManager,
        private readonly _commonRoundManager: CommonRoundManager,

    ) {
    }

    get game(): CurrentGame {
        return this._currentGame
    }

    public howManyActionsCanTribePerformThisTurn(tribe: Tribe): number {
        return this._commonRoundManager.howManyActionsCanTribePerformThisTurn(tribe)
    }

    public onNextTurnClick(): TurnResult {
        const nextTurn = this._turnManager.nextTurn(this.game)
        const turnResult = this.doAllPlayerActions(nextTurn)
        return turnResult
    }

    private doAllPlayerActions(nextTurn: Turn): TurnResult {
        const totalActions = Math.max(
            this._relationsManager.getTribeTotalBonus(nextTurn.player.tribe.name) + 1,
            1,
        )

        let turnResult: TurnResult
        for (let i = 0; i < totalActions; ++i) {
            turnResult = this.doWhatPlayerSaysSafely(nextTurn.player, nextTurn)
        }

        return turnResult
    }

    private doWhatPlayerSaysSafely(player: Player, nextTurn: Turn): TurnResult {
        return new TurnResult()
    }
}

export default RegularRound
