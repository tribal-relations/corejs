import type ConsoleCommandPerformer from './ConsoleCommandPerformer.ts'
import type ConsoleRelationRoundManager from './ConsoleRelationRoundManager.ts'
import ConsoleCommand from './entity/ConsoleCommand.ts'
import type ConsolePlayerActionIo from './io/ConsolePlayerActionIo.ts'
import type Std from './io/Std.ts'
import type CurrentGame from '../../app/CurrentGame.ts'
import type TurnDecisionManager from '../../app/TurnDecisionManager.ts'
import type TurnManager from '../../app/TurnManager.ts'
import type TurnResult from '../../app/TurnResult.ts'
import type PlayerActionInterface from '../../domain/entity/action/PlayerActionInterface.ts'
import type Player from '../../domain/entity/Player.ts'
import type Turn from '../../domain/entity/Turn.ts'
import type DiceThrower from '../../domain/helper/DiceThrower.ts'
import type RelationsStore from '../../domain/store/RelationsStore.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'
import InvalidInput from '../../exception/console/InvalidInput.ts'
import InsufficientCliParameters from '../../exception/InsufficientCliParameters.ts'
import type CommonRoundManager from '../common/CommonRoundManager.ts'

class ConsoleRoundManager {
    constructor(
        private readonly _diceThrower: DiceThrower,
        private readonly _std: Std,
        private readonly _turnManager: TurnManager,
        private readonly _turnDecisionManager: TurnDecisionManager,
        private readonly _consoleCommandPerformer: ConsoleCommandPerformer,
        private readonly _playerActionGetter: ConsolePlayerActionIo,
        private readonly _relationRoundManager: ConsoleRelationRoundManager,
        private readonly _relationsManager: RelationsStore,
        private readonly _currentGame: CurrentGame,
        private readonly _commonRoundManager: CommonRoundManager,
    ) {
    }

    public startRounds(): TurnResult {
        let turnResult: TurnResult
        let globalTurnNumber = 1
        for (let round = 1; true; ++round) {
            this._std.out(`\t\t\tRound ${round}`)

            this._commonRoundManager.beforeRound()

            for (let i = 0; i < this._currentGame.playersLength; ++i, ++globalTurnNumber) {
                this._std.out(`\t\t\tTurn ${globalTurnNumber}`)

                const nextTurn = this._turnManager.nextTurn(this._currentGame)

                this._turnManager.tribeProfitBeforeActions(nextTurn.player.tribe)
                turnResult = this.doAllPlayerActions(nextTurn)

                if (turnResult.isLast) {
                    this._std.out('last turn')
                    return turnResult
                }
                this._std.outEmptyLine()
            }
            this._std.out('\t\t\tRound finished. Population growth phase.')

            this._currentGame.nextHalfRound()
            this.finalizeRound()
        }
    }

    private doAllPlayerActions(nextTurn: Turn): TurnResult {
        const totalActions = this._commonRoundManager.howManyActionsCanTribePerformThisTurn(nextTurn.player.tribe)

        let turnResult: TurnResult
        for (let i = 0; i < totalActions; ++i) {
            turnResult = this.doWhatPlayerSaysSafely(nextTurn.player, nextTurn)
        }

        return turnResult
    }

    public finalizeRound(): void {
        // this._commonRoundManager.discardTemporaryBonuses()
        this._commonRoundManager.populationGrowth()
        this._relationRoundManager.determineRelations()
        this._currentGame.nextHalfRound()
    }

    private doWhatPlayerSaysSafely(player: Player, nextTurn: Turn): TurnResult {
        let decision: PlayerActionInterface | ConsoleCommand
        let parameters: string
        for (; ;) {
            try {
                const decisionWithParameters = this._playerActionGetter.getDecisionSafe(player)
                decision = decisionWithParameters.decision
                parameters = decisionWithParameters.parameters

                if (decision instanceof ConsoleCommand) {
                    this._consoleCommandPerformer.performCommand(decision, parameters, nextTurn)
                    continue
                }

                nextTurn.parameters = parameters
                return this._turnDecisionManager.processTurn(decision, nextTurn)
            } catch (error) {
                if (
                    error instanceof ActionUnsuccessful ||
                    error instanceof InvalidInput ||
                    error instanceof InsufficientCliParameters
                ) {
                    this._std.out(error.message)
                } else {
                    throw error
                }
            }
        }
    }
}

export default ConsoleRoundManager
