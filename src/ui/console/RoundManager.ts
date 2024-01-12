import type ConsoleCommandPerformer from './ConsoleCommandPerformer'
import ConsoleCommand from './entity/ConsoleCommand'
import type PlayerActionGetter from './PlayerActionGetter'
import type RelationRoundManager from './RelationRoundManager'
import type Std from './Std'
import type RelationsManager from '../../app/RelationsManager'
import type TurnDecisionManager from '../../app/TurnDecisionManager'
import type TurnManager from '../../app/TurnManager'
import type TurnResult from '../../app/TurnResult'
import type PlayerActionInterface from '../../domain/entity/action/PlayerActionInterface'
import type Game from '../../domain/entity/Game.ts'
import type Player from '../../domain/entity/Player'
import type Tribe from '../../domain/entity/Tribe.ts'
import type Turn from '../../domain/entity/Turn'
import TechnologyName from '../../domain/enum/TechnologyName.ts'
import type DiceThrower from '../../domain/helper/DiceThrower.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful'
import InvalidInput from '../../exception/console/InvalidInput'
import GameNotYetCreated from '../../exception/GameNotYetCreated'
import InsufficientCliParameters from '../../exception/InsufficientCliParameters'

class RoundManager {
    _game: Game | undefined

    constructor(
        private readonly _diceThrower: DiceThrower,
        private readonly _std: Std,
        private readonly _turnManager: TurnManager,
        private readonly _turnDecisionManager: TurnDecisionManager,
        private readonly _consoleCommandPerformer: ConsoleCommandPerformer,
        private readonly _playerActionGetter: PlayerActionGetter,
        private readonly _relationRoundManager: RelationRoundManager,
        private readonly _relationsManager: RelationsManager,
    ) {
    }

    get game(): Game {
        if (this._game === undefined) {
            throw new GameNotYetCreated()
        }
        return this._game
    }

    set game(game: Game) {
        this._game = game
        this._consoleCommandPerformer.game = game
        this._playerActionGetter.game = game
        this._relationRoundManager.game = game
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
