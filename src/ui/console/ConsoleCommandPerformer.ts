import ConsoleActionRepository from './ConsoleActionRepository'
import ConsoleCommandRepository from './ConsoleCommandRepository'
import type ConsoleCommand from './entity/ConsoleCommand.ts'
import CommandName from './enum/CommandName.ts'
import type Printer from './Printer.ts'
import type Std from './Std.ts'
import type TribePrinter from './TribePrinter.ts'
import type Game from '../../domain/entity/Game.ts'
import type Technology from '../../domain/entity/Technology.ts'
import type Tribe from '../../domain/entity/Tribe.ts'
import type Turn from '../../domain/entity/Turn.ts'
import type ActionName from '../../domain/enum/ActionName.ts'
import type TechnologyName from '../../domain/enum/TechnologyName.ts'
import type TribeName from '../../domain/enum/TribeName'
import TechnologyRepository from '../../domain/repository/TechnologyRepository.ts'
import GameNotYetCreated from '../../exception/GameNotYetCreated'

class ConsoleCommandPerformer {
    _game: Game | undefined

    constructor(
        private readonly _std: Std,
        private readonly _tribePrinter: TribePrinter,
        private readonly _printer: Printer,
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
    }

    public performCommand(command: ConsoleCommand, parameters: string, turn: Turn): void {
        this.executeCommand(command.name, turn, parameters)
    }

    public outputAvailableCommands(): void {
        this._std.out('Available commands:')
        let line: string
        let actionName: string
        let actionParameters: string

        for (const key in ConsoleCommandRepository.decisionToCommandDataMap) {
            actionName = ConsoleCommandRepository.decisionToCommandDataMap[key].name
            actionParameters = ConsoleCommandRepository.decisionToCommandDataMap[key].parameters

            line = `\t${key}\t-\t${actionName}\t${actionParameters}`
            this._std.out(line)
        }
    }

    public outputAvailableActions(): void {
        this._std.out('Available actions:')
        let line: string
        let actionName: ActionName
        let actionParameters: string

        for (const key in ConsoleActionRepository.decisionToActionDataMap) {
            actionName = ConsoleActionRepository.decisionToActionDataMap[key].name
            actionParameters = ConsoleActionRepository.decisionToActionDataMap[key].parameters.map(val => `<${val.name}>`).join(' ')

            line = `\t${key}\t-\t${actionName} ${actionParameters}`
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
        if (commandName === CommandName.PrintTechnologyTree) {
            this.outputTechnologyTree()
        }
        if (commandName === CommandName.PrintTechnologyInfo && parameter) {
            this.outputTechnologyInfo(parameter)
        }
    }

    private printAllTribes(): void {
        for (const playerName in this.game.players) {
            this.printTribe(this.game.players[playerName].tribe)
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
        return this.game.getTribe((tribeName as TribeName))
    }

    private outputTechnologyTree(): void {
        this._std.out('Technology tree:')
        let techTreeAsString = this._printer.getCleanYaml(TechnologyRepository.technologyTree, '')
        techTreeAsString = techTreeAsString.replaceAll(':', '   -->  ')

        this._std.out(techTreeAsString)
    }

    private outputTechnologyInfo(parameter: string): void {
        const tech = this.getTechnologyByName(parameter)
        this.printTechnology(tech)
    }

    private getTechnologyByName(techName: string): Technology {
        return TechnologyRepository.createFromName(techName as TechnologyName)
    }

    private printTechnology(tech: Technology): void {
        this._std.out(this._printer.getCleanYaml(tech, ': no'))
    }
}

export default ConsoleCommandPerformer
