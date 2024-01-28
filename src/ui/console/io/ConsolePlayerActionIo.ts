import type Std from './Std.ts'
import type CurrentGame from '../../../app/CurrentGame.ts'
import AbstractPlayerAction from '../../../domain/entity/action/AbstractPlayerAction.ts'
import AlliancePlayerAction from '../../../domain/entity/action/AlliancePlayerAction.ts'
import AttackTilePlayerAction from '../../../domain/entity/action/AttackTilePlayerAction.ts'
import AttackTribePlayerAction from '../../../domain/entity/action/AttackTribePlayerAction.ts'
import CaravanPlayerAction from '../../../domain/entity/action/CaravanPlayerAction.ts'
import type GameplayAction from '../../../domain/entity/action/GameplayAction.ts'
import HireOneRoundPlayerAction from '../../../domain/entity/action/HireOneRoundPlayerAction.ts'
import HirePlayerAction from '../../../domain/entity/action/HirePlayerAction.ts'
import PillageCaravanPlayerAction from '../../../domain/entity/action/PillageCaravanPlayerAction.ts'
import type PlayerActionInterface from '../../../domain/entity/action/PlayerActionInterface.ts'
import RemoveCaravanPlayerAction from '../../../domain/entity/action/RemoveCaravanPlayerAction.ts'
import ResearchPlayerAction from '../../../domain/entity/action/ResearchPlayerAction.ts'
import type Player from '../../../domain/entity/Player.ts'
import type Tile from '../../../domain/entity/Tile.ts'
import type Tribe from '../../../domain/entity/Tribe.ts'
import ActionName from '../../../domain/enum/ActionName.ts'
import type ResourceName from '../../../domain/enum/ResourceName.ts'
import type TechnologyName from '../../../domain/enum/TechnologyName.ts'
import type TribeName from '../../../domain/enum/TribeName.ts'
import TechnologyRepository from '../../../domain/repository/TechnologyRepository.ts'
import BubblingError from '../../../exception/BubblingError.ts'
import InvalidInput from '../../../exception/console/InvalidInput.ts'
import InsufficientCliParameters from '../../../exception/InsufficientCliParameters.ts'
import type ConsoleCommand from '../entity/ConsoleCommand.ts'
import ConsoleActionRepository from '../repository/ConsoleActionRepository.ts'
import ConsoleCommandRepository from '../repository/ConsoleCommandRepository.ts'

class ConsolePlayerActionIo {
    constructor(
        private readonly _std: Std,
        private readonly _currentGame: CurrentGame,
    ) {
    }

    get game(): CurrentGame {
        return this._currentGame
    }

    get std(): Std {
        return this._std
    }

    getDecisionSafe(player: Player): { decision: PlayerActionInterface | ConsoleCommand, parameters: string } {
        let rawDecision: string
        let decision: PlayerActionInterface | ConsoleCommand
        let parameters: string

        for (; ;) {
            try {
                rawDecision = this._std.in(`${player.tribe.name} Decision >`) ?? 'q'
                decision = this.getDecision(rawDecision, player)
                parameters = this.getParameter(rawDecision)

                break
            } catch (error) {
                if (error instanceof BubblingError) {
                    throw error
                } else {
                    this.std.out(error.message)
                }
            }
        }
        return { decision, parameters }
    }

    getDecision(rawDecision: string, player: Player): PlayerActionInterface | ConsoleCommand {
        const words = rawDecision.split(' ')
        const actionOrCommand = words[0].toLowerCase()

        if (actionOrCommand in ConsoleActionRepository.decisionToActionDataMap) {
            return this.getPlayerActionFromRawDecision(player, actionOrCommand, words)
        }

        if (actionOrCommand in ConsoleCommandRepository.decisionTextToCommandDataMap) {
            const commandName = ConsoleCommandRepository.decisionTextToCommandDataMap[actionOrCommand].name
            return ConsoleCommandRepository.createFromName(commandName)
        }

        throw new InvalidInput()
    }

    private getPlayerActionFromRawDecision(player: Player, actionOrCommand: string, words: string[]): PlayerActionInterface {
        const gameplayAction: GameplayAction = ConsoleActionRepository.decisionToActionDataMap[actionOrCommand]

        if (gameplayAction.name === ActionName.Research) {
            // we have one parameter, but it's multiword
            // that's why we need to join it here
            const technologyName = words.slice(1).join(' ')

            gameplayAction.parameters[0].check(technologyName)

            return new ResearchPlayerAction(player.tribe, TechnologyRepository.get((technologyName as TechnologyName)))
        }

        if (words.length - 1 !== gameplayAction.parameters.length) {
            throw new InsufficientCliParameters(gameplayAction.parameters.length, words.length - 1)
        }

        if (words.length === 1 && gameplayAction.parameters.length === 0) { // only command
            return new AbstractPlayerAction(gameplayAction, player.tribe)
        }

        if (gameplayAction.name === ActionName.Alliance) {
            gameplayAction.parameters[0].check(words[1])
            const recipient = this.getTribeByTribeName((words[1] as TribeName))

            return new AlliancePlayerAction(player.tribe, recipient)
        }

        if (gameplayAction.name === ActionName.AttackTile) {
            gameplayAction.parameters[0].check(words[1])
            gameplayAction.parameters[1].check(words[2])
            const defender = this.getTribeByTribeName((words[1] as TribeName))
            const tile = this.getTribeTileByResourceName(defender, (words[2] as ResourceName))

            return new AttackTilePlayerAction(player.tribe, defender, tile)
        }

        if (gameplayAction.name === ActionName.AttackTribe) {
            gameplayAction.parameters[0].check(words[1])
            const defender = this.getTribeByTribeName((words[1] as TribeName))

            return new AttackTribePlayerAction(player.tribe, defender)
        }

        if (gameplayAction.name === ActionName.Caravan) {
            gameplayAction.parameters[0].check(words[1])
            const recipient = this.getTribeByTribeName((words[1] as TribeName))
            return new CaravanPlayerAction(player.tribe, recipient)
        }

        if (gameplayAction.name === ActionName.RemoveCaravan) {
            gameplayAction.parameters[0].check(words[1])
            const recipient = this.getTribeByTribeName((words[1] as TribeName))
            return new RemoveCaravanPlayerAction(player.tribe, recipient)
        }

        if (gameplayAction.name === ActionName.Pillage) {
            gameplayAction.parameters[0].check(words[1])
            gameplayAction.parameters[1].check(words[2])
            const sender = this.getTribeByTribeName((words[1] as TribeName))
            const recipient = this.getTribeByTribeName((words[2] as TribeName))
            return new PillageCaravanPlayerAction(player.tribe, sender, recipient)
        }

        if (gameplayAction.name === ActionName.Hire || gameplayAction.name === ActionName.HireOneRound) {
            gameplayAction.parameters[0].check(words[1])
            gameplayAction.parameters[1].check(words[2])
            gameplayAction.parameters[2].check(words[3])

            const seller = this.getTribeByTribeName((words[1] as TribeName))
            if (gameplayAction.name === ActionName.Hire) {
                return new HirePlayerAction(
                    player.tribe,
                    seller,
                    parseInt(words[2]),
                    parseInt(words[3]),
                )
            }
            if (gameplayAction.name === ActionName.HireOneRound) {
                return new HireOneRoundPlayerAction(
                    player.tribe,
                    seller,
                    parseInt(words[2]),
                    parseInt(words[3]),
                )
            }
        }

        throw new InsufficientCliParameters(gameplayAction.parameters.length, words.length - 1)
    }

    private getTribeByTribeName(tribeName: TribeName): Tribe {
        return this.game.getTribe(tribeName)
    }

    private getTribeTileByResourceName(tribe: Tribe, resourceName: ResourceName): Tile {
        return tribe.getFirstTileWithResource(resourceName)
    }

    private getParameter(rawDecision: string): string {
        const words = rawDecision.split(' ')
        if (words.length > 1) {
            const paramStrings = (words.slice(1)).join(' ')
            return paramStrings
        }
        return ''
    }
}

export default ConsolePlayerActionIo
