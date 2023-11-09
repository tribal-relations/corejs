import { singleton } from 'tsyringe'
import ConsoleCommandPerformer from './console/ConsoleCommandPerformer'
import ConsoleCommand from './console/entity/ConsoleCommand'
import CommandName from './console/enum/CommandName'
import ConsoleCommandRepository from './console/repository/ConsoleCommandRepository'
import TribePrinter from './console/TribePrinter'
import Std from './Std'
import ActionRepository from '../app/repository/ActionRepository'
import TurnDecisionManager from '../app/TurnDecisionManager'
import TurnManager from '../app/TurnManager'
import type TurnResult from '../app/TurnResult'
import type Action from '../domain/entity/Action'
import Game from '../domain/entity/Game'
import Player from '../domain/entity/Player'
import Population from '../domain/entity/Population'
import Territory from '../domain/entity/Territory'
import Tribe from '../domain/entity/Tribe'
import type Turn from '../domain/entity/Turn'
import ActionName from '../domain/enum/ActionName'
import TribeName from '../domain/enum/TribeName'
import ActionUnsuccessful from '../exception/ActionUnsuccessful'
import InvalidInput from '../exception/console/InvalidInput'

@singleton()
class ConsoleUi {
    static decisionToActionDataMap: Record<string, { name: ActionName, parameters: string }> = {
        a: { name: ActionName.Arm, parameters: '' },
        al: { name: ActionName.Alliance, parameters: '<tribe name>' },
        atile: { name: ActionName.AttackTile, parameters: '<tribe name> <resource name>' },
        atr: { name: ActionName.AttackTribe, parameters: '<tribe name>' },

        c: { name: ActionName.Caravan, parameters: '<tribe name>' },
        e: { name: ActionName.Expedition, parameters: '' },

        g3: { name: ActionName.GoTo3rdRadius, parameters: '' },
        g2: { name: ActionName.GoTo2ndRadius, parameters: '' },
        g1: { name: ActionName.GoTo1stRadius, parameters: '' },

        h: { name: ActionName.Hire, parameters: '<tribe name> <how much to hire> <total price>' },
        h1: { name: ActionName.HireOneRound, parameters: '<tribe name> <how much to hire> <total price>' },

        pray: { name: ActionName.Pray, parameters: '' },
        pil: { name: ActionName.Pillage, parameters: '<tribe name>' },

        q: { name: ActionName.Quit, parameters: '' },
        r: { name: ActionName.Research, parameters: '<technology name>' },

        rmca: { name: ActionName.RemoveCaravan, parameters: '<tribe name>' },

        co: { name: ActionName.Conquer, parameters: '' },
        cu: { name: ActionName.Cult, parameters: '' },
    }

    static decisionToCommandDataMap: Record<string, { name: CommandName, parameters: string }> = {
        p: { name: CommandName.PrintCurrentPlayerTribe, parameters: '' },
        pt: { name: CommandName.PrintTribe, parameters: '<tribe name>' },
        ptt: { name: CommandName.PrintAllTribes, parameters: '' },
        paa: { name: CommandName.PrintAvailableActions, parameters: '' },
        pac: { name: CommandName.PrintAvailableCommands, parameters: '' },
        '?': { name: CommandName.PrintAvailableCommands, parameters: '' },
        help: { name: CommandName.PrintAvailableCommands, parameters: '' },
    }

    _game: Game | undefined

    constructor(
        private readonly _turnManager: TurnManager,
        private readonly _turnDecisionManager: TurnDecisionManager,
        private readonly _std: Std,
        private readonly _tribePrinter: TribePrinter,
        private readonly _consoleCommandPerformer: ConsoleCommandPerformer,
    ) {
    }

    get game(): Game {
        if (this._game === undefined) {
            throw new Error('game is not yet created')
        }
        return this._game
    }

    set game(game: Game) {
        this._game = game
    }

    startTurns(): TurnResult {
        this._consoleCommandPerformer.game = this.game

        this.updatePlayers()

        let turnResult: TurnResult
        this.outputStartInfo()
        this._consoleCommandPerformer.outputAvailableCommands()
        this._consoleCommandPerformer.outputAvailableActions()

        for (let i = 0; true; ++i) {
            this._std.out(`\t\t\tTurn ${i}`)
            const nextTurn = this._turnManager.nextTurn(this.game)
            const playerName = nextTurn.player.name
            turnResult = this.doWhatPlayerSaysSafely(playerName, nextTurn)

            if (turnResult.isLast) {
                this._std.out('last turn')
                return turnResult
            }
            this._std.outEmptyLine()
        }
    }

    private doWhatPlayerSaysSafely(playerName: string, nextTurn: Turn): TurnResult {
        let turnResult: TurnResult
        let decision: Action | ConsoleCommand
        let parameters: string
        for (; ;) {
            try {
                const decisionWithParameters = this.getDecisionSafe(playerName)
                decision = decisionWithParameters.decision
                parameters = decisionWithParameters.parameters

                if (decision instanceof ConsoleCommand) {
                    this._consoleCommandPerformer.performCommand(decision, parameters, nextTurn)
                    continue
                }

                nextTurn.parameters = parameters
                turnResult = this._turnDecisionManager.processTurn(decision, nextTurn)
                if (!turnResult.success) {
                    throw new ActionUnsuccessful(decision.name, turnResult.errorMessage)
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

    getDecisionSafe(playerName: string): { decision: Action | ConsoleCommand, parameters: string } {
        let rawDecision: string
        let decision: Action | ConsoleCommand
        let parameters: string

        for (; ;) {
            try {
                rawDecision = this._std.in(`${playerName} Decision >`) ?? 'q'
                decision = this.getDecision(rawDecision)
                parameters = this.getParameter(rawDecision)

                break
            } catch (error) {
                if (error instanceof Error) {
                    this._std.out(error.message)
                } else {
                    this._std.out(error)
                }
            }
        }
        return { decision, parameters }
    }

    getDecision(rawDecision: string): Action | ConsoleCommand {
        const words = rawDecision.split(' ')
        const actionOrCommand = words[0].toLowerCase()

        if (actionOrCommand in ConsoleUi.decisionToActionDataMap) {
            return ActionRepository.createFromName(ConsoleUi.decisionToActionDataMap[actionOrCommand].name)
        }

        if (actionOrCommand in ConsoleUi.decisionToCommandDataMap) {
            return ConsoleCommandRepository.createFromName(ConsoleUi.decisionToCommandDataMap[actionOrCommand].name)
        }

        throw new InvalidInput()
    }

    private getParameter(rawDecision: string): string {
        const words = rawDecision.split(' ')
        if (words.length > 1) {
            const paramStrings = (words.slice(1)).join(' ')
            return paramStrings
        }
        return ''
    }

    private outputStartInfo(): void {
        let line: string

        for (let i = 0; i < this.game.players.length; i++) {
            line = `\t${this.game.players[i].name}\t-\tTribe '${this.game.players[i].tribe.name}'`

            this._std.out(line)
        }
    }

    private updatePlayers(): void {
        this._std.out('Adding players')

        const playerNames: string[] = []
        let playerName: string
        for (; true;) {
            for (let i = 1; i <= Game.maxPlayers; i++) {
                this._std.out(`Adding player ${i}/${Game.maxPlayers}`)

                playerName = this._std.in(`Enter player ${i} name (or return to end adding players)>`) ?? `player ${i}`
                if (!playerName || playerName === '\n') {
                    break
                }
                playerNames.push(playerName)
            }
            if (playerNames.length !== 0) {
                break
            }
        }
        this.game.players = this.createPlayers(playerNames)
        this._turnManager.addPlayers(this.game.players.length)
    }

    private createPlayers(playerNames: string[]): Player[] {
        const players = []
        const tribeNames = (Object as any).values(TribeName).slice(0, playerNames.length)

        for (let i = 0; i < playerNames.length; i++) {
            players[i] = new Player(
                new Tribe(
                    tribeNames[i],
                    0,
                    0,
                    Population.createStarterPopulation(),
                    Territory.createStarterTerritory(),
                ),
                playerNames[i],
            )
        }
        return players
    }
}

export default ConsoleUi
