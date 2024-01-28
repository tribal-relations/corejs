import type ConsoleCommand from './entity/ConsoleCommand.ts'
import CommandName from './enum/CommandName.ts'
import type Printer from './io/Printer.ts'
import type Std from './io/Std.ts'
import type TribePrinter from './io/TribePrinter.ts'
import ConsoleActionRepository from './repository/ConsoleActionRepository.ts'
import ConsoleCommandRepository from './repository/ConsoleCommandRepository.ts'
import ConsolePlayerRelationActionRepository from './repository/ConsolePlayerRelationActionRepository.ts'
import type CurrentGame from '../../app/CurrentGame.ts'
import type Relation from '../../domain/entity/Relation'
import type Technology from '../../domain/entity/Technology.ts'
import type Tribe from '../../domain/entity/Tribe.ts'
import type Turn from '../../domain/entity/Turn.ts'
import type ActionName from '../../domain/enum/ActionName.ts'
import type TechnologyName from '../../domain/enum/TechnologyName.ts'
import type TribeName from '../../domain/enum/TribeName.ts'
import RelationRepository from '../../domain/repository/RelationRepository.ts'
import TechnologyRepository from '../../domain/repository/TechnologyRepository.ts'
import type CaravansStore from '../../domain/store/CaravansStore.ts'
import type RelationsStore from '../../domain/store/RelationsStore.ts'

class ConsoleCommandPerformer {
    constructor(
        private readonly _std: Std,
        private readonly _tribePrinter: TribePrinter,
        private readonly _printer: Printer,
        private readonly _currentGame: CurrentGame,
        private readonly _relationsStore: RelationsStore,
        private readonly _caravansStore: CaravansStore,

    ) {
    }

    get game(): CurrentGame {
        return this._currentGame
    }

    public performCommand(command: ConsoleCommand, parameters: string, turn: Turn): void {
        this.executeCommand(command.name, turn, parameters)
    }

    public outputAvailableCommands(): void {
        this._std.out('Available commands:')

        this._std.outTable(ConsoleCommandRepository.decisionTextToCommandDataMap)
    }

    public outputAvailableActions(): void {
        this._std.out('Available actions:')
        let actionName: ActionName
        let actionParameters: string

        const actions = {}
        for (const key in ConsoleActionRepository.decisionToActionDataMap) {
            actionName = ConsoleActionRepository.decisionToActionDataMap[key].name
            actionParameters = ConsoleActionRepository.decisionToActionDataMap[key].parameters
                .map(val => `<${val.name}>`).join(' ')

            actions[key] = {
                name: actionName,
                parameters: actionParameters,
            }
        }

        this._std.outTable(actions)
    }

    private executeCommand(commandName: string, turn: Turn, parameter: string | null = null): void {
        if (commandName === CommandName.PrintTribe && parameter) {
            this.printTribeByName(parameter)
        }
        if (commandName === CommandName.PrintCurrentPlayerTribe) {
            this.printTribeByName(turn.player.tribe.name)
        }

        if (commandName === CommandName.PrintRelations) {
            this.printRelations()
        }
        if (commandName === CommandName.PrintRelationsBonuses) {
            this.printRelationsBonuses()
        }
        if (commandName === CommandName.PrintCaravans) {
            this.printCaravans()
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
        const fullStructure = {}
        let tribe
        for (const playerName in this.game.players) {
            tribe = this.game.players[playerName].tribe
            fullStructure[tribe.name] = this._tribePrinter.getStructure(tribe)
        }
        this._std.outTable(fullStructure)
    }

    private printTribeByName(tribeName: string): void {
        const tribe = this.getTribeByName(tribeName)
        this.printTribeFull(tribe)
    }

    private printRelations(): void {
        this._std.outTable(this._relationsStore.relations)
    }

    private printCaravans(): void {
        this._std.outTable(this._caravansStore.caravans)
    }

    private printTribeFull(tribe: Tribe): void {
        this._std.out(this._tribePrinter.getStringFull(tribe))
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
        return TechnologyRepository.get(techName as TechnologyName)
    }

    private printTechnology(tech: Technology): void {
        this._std.out(this._printer.getCleanYaml(tech, ': no'))
    }

    private printRelationsBonuses() {
        const cliParameterToRelationNameMap = ConsolePlayerRelationActionRepository.cliParameterToRelationNameMap
        const table = {}
        let relation: Relation
        for (const key in cliParameterToRelationNameMap) {
            relation = RelationRepository.get(cliParameterToRelationNameMap[key])
            table[relation.name] = {
                'Agent bonus': relation.agentBonus,
                'Recipient bonus': relation.recipientBonus,
            }
        }
        this._std.outTable(table)
    }
}

export default ConsoleCommandPerformer
