import { singleton } from 'tsyringe'
import Command from './console/Command'
import TribePrinter from './console/TribePrinter'
import Std from './Std'
import ActionRepository from '../app/repository/ActionRepository'
import TurnDecisionManager from '../app/TurnDecisionManager'
import TurnManager from '../app/TurnManager'
import type TurnResult from '../app/TurnResult'
import type Action from '../domain/entity/Action'
import type Game from '../domain/entity/Game'
import type Tribe from '../domain/entity/Tribe'
import type Turn from '../domain/entity/Turn'
import ActionName from '../domain/enum/ActionName'
import CommandInsteadOfAction from '../exception/console/CommandInsteadOfAction'
import InvalidInput from '../exception/console/InvalidInput'

@singleton()
class ConsoleUi {
    static decisionToActionDataMap: Record<string, { name: ActionName, parameters: string }> = {
        a: { name: ActionName.arm, parameters: '' },
        al: { name: ActionName.alliance, parameters: '<tribe name>' },

        c: { name: ActionName.caravan, parameters: '<tribe name>' },
        e: { name: ActionName.expedition, parameters: '' },

        g3: { name: ActionName.goTo3rdRadius, parameters: '' },
        g2: { name: ActionName.goTo2ndRadius, parameters: '' },
        g1: { name: ActionName.goTo1stRadius, parameters: '' },

        h: { name: ActionName.hire, parameters: '<tribe name> <how much to hire> <total price>' },
        h1: { name: ActionName.hireOneRound, parameters: '<tribe name> <how much to hire> <total price>' },

        p: { name: ActionName.pray, parameters: '' },
        pil: { name: ActionName.pillage, parameters: '<tribe name> <resource name>' },
        q: { name: ActionName.quit, parameters: '' },
        r: { name: ActionName.research, parameters: '<technology name>' },

        rmca: { name: ActionName.removeCaravan, parameters: '<tribe name>' },

        co: { name: ActionName.conquer, parameters: '' },
        cu: { name: ActionName.cult, parameters: '' },
    }

    static decisionToCommandDataMap: Record<string, { name: string, parameters: string }> = {
        pt: { name: Command.printTribe, parameters: '<tribe name>' },
        ptt: { name: Command.printAllTribes, parameters: '' },
        paa: { name: Command.printAvailableActions, parameters: '' },
        pac: { name: Command.printAvailableCommands, parameters: '' },
    }

    _game: Game | undefined

    constructor(
        private readonly _turnManager: TurnManager,
        private readonly _turnDecisionManager: TurnDecisionManager,
        private readonly _std: Std,
        private readonly _tribePrinter: TribePrinter,
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
        this._turnManager.addPlayers(this.game.players.length)

        let turnResult: TurnResult
        this.outputStartInfo()

        this.outputAvailableCommands()
        this.outputAvailableActions()

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
        let decision: Action
        let parameters: string
        for (; ;) {
            try {
                const decisionWithParameters = this.getDecisionSafe(playerName)
                decision = decisionWithParameters.decision
                parameters = decisionWithParameters.parameters
                nextTurn.parameters = parameters
                turnResult = this._turnDecisionManager.processTurn(decision, nextTurn)
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

    getDecisionSafe(playerName: string): { decision: Action, parameters: string } {
        let rawDecision: string
        let decision: Action
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

    getDecision(rawDecision: string): Action {
        const words = rawDecision.split(' ')
        const actionOrCommand = words[0].toLowerCase()

        if (actionOrCommand in ConsoleUi.decisionToActionDataMap) {
            return ActionRepository.createFromName(ConsoleUi.decisionToActionDataMap[actionOrCommand].name)
        }

        if (actionOrCommand in ConsoleUi.decisionToCommandDataMap) {
            const commandName = ConsoleUi.decisionToCommandDataMap[actionOrCommand].name

            this.executeCommand(commandName, (words.slice(1)).join(' '))
            throw new CommandInsteadOfAction()
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

    private outputAvailableCommands(): void {
        this._std.out('Available commands:')
        let line: string
        let actionName: string
        let actionParameters: string

        for (const key in ConsoleUi.decisionToCommandDataMap) {
            actionName = ConsoleUi.decisionToCommandDataMap[key].name
            actionParameters = ConsoleUi.decisionToCommandDataMap[key].parameters

            line = `\t${key}\t-\t${actionName}\t${actionParameters}`
            this._std.out(line)
        }
    }

    private outputAvailableActions(): void {
        this._std.out('Available actions:')
        let line: string
        let actionName: ActionName
        let actionParameters: string

        for (const key in ConsoleUi.decisionToActionDataMap) {
            actionName = ConsoleUi.decisionToActionDataMap[key].name
            actionParameters = ConsoleUi.decisionToActionDataMap[key].parameters

            line = `\t${key}\t-\t${actionName}\t${actionParameters}`
            this._std.out(line)
        }
    }

    private executeCommand(commandName: string, parameter: string | null = null): void {
        if (commandName === Command.printTribe && parameter) {
            this.printTribeByName(parameter)
        }
        if (commandName === Command.printAllTribes) {
            this.printAllTribes()
        }
        if (commandName === Command.printAvailableCommands) {
            this.outputAvailableCommands()
        }
        if (commandName === Command.printAvailableActions) {
            this.outputAvailableActions()
        }
    }

    private printAllTribes(): void {
        for (let i = 0; i < this.game.players.length; i++) {
            this.printTribe(this.game.players[i].tribe)
        }
    }

    private printTribeByName(tribeName: string): void {
        const tribe = this.getTribeByName(tribeName)
        this.printTribe(tribe)
    }

    private printTribe(tribe: Tribe): void {
        this._std.out(this._tribePrinter.getString(tribe))
    }

    private getTribeByName(tribeName: string): Tribe {
        for (let i = 0; i < this.game.players.length; i++) {
            if (tribeName === this.game.players[i].tribe.name) {
                return this.game.players[i].tribe
            }
        }
        throw new Error(`Tribe ${tribeName} not found.`)
    }

    private outputStartInfo(): void {
        let line: string

        for (let i = 0; i < this.game.players.length; i++) {
            line = `\t${this.game.players[i].name}\t-\tTribe '${this.game.players[i].tribe.name}'`

            this._std.out(line)
        }
    }
}

export default ConsoleUi
