import { singleton } from 'tsyringe'
import type ConsoleCommand from './entity/ConsoleCommand'
import CommandName from './enum/CommandName'
import TribePrinter from './TribePrinter'
import type Game from '../../domain/entity/Game'
import type Tribe from '../../domain/entity/Tribe'
import type Turn from '../../domain/entity/Turn'
import type ActionName from '../../domain/enum/ActionName'
import ConsoleUi from '../ConsoleUi'
import Std from '../Std'

@singleton()
class ConsoleCommandPerformer {
    _game: Game | undefined

    constructor(
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

    public performCommand(command: ConsoleCommand, parameters: string, turn: Turn): void {
        this.executeCommand(command.name, turn, parameters)
    }

    public outputAvailableCommands(): void {
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

    public outputAvailableActions(): void {
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

    private executeCommand(commandName: string, turn: Turn, parameter: string | null = null): void {
        if (commandName === CommandName.PrintTribe && parameter) {
            this.printTribeByName(parameter)
        }
        if (commandName === CommandName.PrintCurrentPlayerTribe) {
            this.printTribeByName(turn.player.tribe.name)
        }

        if (commandName === CommandName.PrintAllTribes) {
            this.printAllTribes()
        }
        if (commandName === CommandName.PrintAvailableCommands) {
            this.outputAvailableCommands()
        }
        if (commandName === CommandName.PrintAvailableActions) {
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
}

export default ConsoleCommandPerformer
