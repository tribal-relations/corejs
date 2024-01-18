import type ConsoleCommandPerformer from './ConsoleCommandPerformer.ts'
import ConsoleCommand from './entity/ConsoleCommand.ts'
import type PlayerActionGetter from './PlayerActionGetter.ts'
import type RelationRoundManager from './RelationRoundManager.ts'
import type Std from './Std.ts'
import type CurrentGame from '../../app/CurrentGame.ts'
import type RelationsManager from '../../app/RelationsManager.ts'
import type TurnDecisionManager from '../../app/TurnDecisionManager.ts'
import type TurnManager from '../../app/TurnManager.ts'
import type TurnResult from '../../app/TurnResult.ts'
import type PlayerActionInterface from '../../domain/entity/action/PlayerActionInterface.ts'
import type Player from '../../domain/entity/Player.ts'
import type Tribe from '../../domain/entity/Tribe.ts'
import type Turn from '../../domain/entity/Turn.ts'
import TechnologyName from '../../domain/enum/TechnologyName.ts'
import type DiceThrower from '../../domain/helper/DiceThrower.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'
import InvalidInput from '../../exception/console/InvalidInput.ts'
import InsufficientCliParameters from '../../exception/InsufficientCliParameters.ts'
import type CommonRoundManager from '../common/CommonRoundManager.ts'

class RoundManager {
    constructor(
        private readonly _diceThrower: DiceThrower,
        private readonly _std: Std,
        private readonly _turnManager: TurnManager,
        private readonly _turnDecisionManager: TurnDecisionManager,
        private readonly _consoleCommandPerformer: ConsoleCommandPerformer,
        private readonly _playerActionGetter: PlayerActionGetter,
        private readonly _relationRoundManager: RelationRoundManager,
        private readonly _relationsManager: RelationsManager,
        private readonly _currentGame: CurrentGame,
        private readonly _commonRoundManager: CommonRoundManager,
    ) {
    }

    get game(): CurrentGame {
        return this._currentGame
    }

    get std(): Std {
        return this._std
    }

    public startRounds(): TurnResult {
        let turnResult: TurnResult
        let globalTurnNumber = 1
        for (let round = 1; true; ++round) {
            this._std.out(`\t\t\tRound ${round}`)

            for (let i = 0; i < this.game.playersLength; ++i, ++globalTurnNumber) {
                this._std.out(`\t\t\tTurn ${globalTurnNumber}`)
                const nextTurn = this._turnManager.nextTurn(this.game)
                turnResult = this.doAllPlayerActions(nextTurn)

                if (turnResult.isLast) {
                    this._std.out('last turn')
                    return turnResult
                }
                this._std.outEmptyLine()
            }
            this._std.out('\t\t\tRound finished. Population growth phase.')

            this.game.nextHalfRound()
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
        // TODO determine relations between tribes here | how to do it independent from ui?
        this.populationGrowth()
        this._relationRoundManager.determineRelations()
        this.game.nextHalfRound()
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
                    this.std.out(error.message)
                } else {
                    throw error
                }
            }
        }
    }

    public populationGrowth(): void {
        const diceResult = this._diceThrower.d6()
        let diceBonus: number = 0

        for (const playerName in this.game.players) {
            diceBonus = this.getDiceBonus(this.game.players[playerName].tribe)
            this.game.players[playerName].tribe.growPopulation((diceResult + diceBonus))
        }
    }

    private getDiceBonus(tribe: Tribe): number {
        // TODO probably better to move it closer to the center
        let bonus = 0
        if (tribe.hasTech(TechnologyName.Pottery)) {
            bonus += 2
        }
        if (tribe.hasTech(TechnologyName.Plough) && tribe.hasTech(TechnologyName.AnimalHusbandry)) {
            bonus += 2 + this._diceThrower.d6()
        }
        if (tribe.hasTech(TechnologyName.Plough) && !tribe.hasTech(TechnologyName.AnimalHusbandry)) {
            bonus += 2
        }
        return bonus
    }
}

export default RoundManager
