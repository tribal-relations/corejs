import type ConsoleCommandPerformer from './ConsoleCommandPerformer.ts'
import ConsoleCommand from './entity/ConsoleCommand.ts'
import type PlayerActionGetter from './PlayerActionGetter'
import type PlayerController from './PlayerController'
import type Std from './Std.ts'
import type RoundManager from '../../app/RoundManager.ts'
import type TurnDecisionManager from '../../app/TurnDecisionManager.ts'
import type TurnManager from '../../app/TurnManager.ts'
import type TurnResult from '../../app/TurnResult.ts'
import type PlayerActionInterface from '../../domain/entity/action/PlayerActionInterface'
import type Game from '../../domain/entity/Game.ts'
import type Player from '../../domain/entity/Player.ts'
import type Turn from '../../domain/entity/Turn.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'
import GameNotYetCreated from '../../exception/GameNotYetCreated'

class ConsoleUi {
    _game: Game | undefined

    constructor(
        private readonly _turnManager: TurnManager,
        private readonly _roundManager: RoundManager,
        private readonly _turnDecisionManager: TurnDecisionManager,
        private readonly _std: Std,
        private readonly _consoleCommandPerformer: ConsoleCommandPerformer,
        private readonly _playerActionGetter: PlayerActionGetter,
        private readonly _playerController: PlayerController,
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
        this._roundManager.game = game
        this._playerActionGetter.game = game
        this._playerController.game = game
    }

    get std(): Std {
        return this._std
    }

    public startTurns(): TurnResult {
        this.makeFirstOneTimeSetup()

        return this.startRounds()
    }

    private makeFirstOneTimeSetup() {
        this._playerController.updatePlayers()
        this._playerController.outputPlayersWithTribes()
        this._consoleCommandPerformer.outputAvailableCommands()
        this._consoleCommandPerformer.outputAvailableActions()
    }

    private startRounds(): TurnResult {
        let turnResult: TurnResult
        let globalTurnNumber = 1
        for (let round = 1; true; ++round) {
            this._std.out(`\t\t\tRound ${round}`)

            for (let i = 0; i < this.game.players.length; ++i, ++globalTurnNumber) {
                this._std.out(`\t\t\tTurn ${globalTurnNumber}`)
                const nextTurn = this._turnManager.nextTurn(this.game)
                turnResult = this.doWhatPlayerSaysSafely(nextTurn.player, nextTurn)

                if (turnResult.isLast) {
                    this._std.out('last turn')
                    return turnResult
                }
                this._std.outEmptyLine()
            }
            this._std.out('\t\t\tRound finished. Population growth phase.')

            this._roundManager.finalizeRound()
            this.game.nextRound()
        }
    }

    private doWhatPlayerSaysSafely(player: Player, nextTurn: Turn): TurnResult {
        let turnResult: TurnResult
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
                turnResult = this._turnDecisionManager.processTurn(decision, nextTurn)
                if (!turnResult.success) {
                    throw new ActionUnsuccessful(decision.gameAction.name, turnResult.errorMessage)
                }
                break
            } catch (error) {
                if (error instanceof Error) {
                    this._std.out(error.message)
                } else {
                    this._std.out(error)
                }
            }
        }
        return turnResult
    }
}

export default ConsoleUi
