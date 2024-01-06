import ConsoleActionRepository from './ConsoleActionRepository'
import type ConsoleCommand from './entity/ConsoleCommand'
import ConsoleCommandRepository from './repository/ConsoleCommandRepository'
import type Std from './Std'
import AbstractPlayerAction from '../../domain/entity/action/AbstractPlayerAction'
import AttackTilePlayerAction from '../../domain/entity/action/AttackTilePlayerAction'
import type PlayerActionInterface from '../../domain/entity/action/PlayerActionInterface'
import ResearchPlayerAction from '../../domain/entity/action/ResearchPlayerAction'
import type Game from '../../domain/entity/Game'
import type Player from '../../domain/entity/Player'
import type Tile from '../../domain/entity/Tile'
import type Tribe from '../../domain/entity/Tribe'
import ActionName from '../../domain/enum/ActionName'
import type ResourceName from '../../domain/enum/ResourceName'
import type TechnologyName from '../../domain/enum/TechnologyName'
import type TribeName from '../../domain/enum/TribeName'
import ActionRepository from '../../domain/repository/ActionRepository'
import TechnologyRepository from '../../domain/repository/TechnologyRepository'
import InvalidInput from '../../exception/console/InvalidInput'
import GameNotYetCreated from '../../exception/GameNotYetCreated'
import InsufficientCliParameters from '../../exception/InsufficientCliParameters'

class PlayerActionGetter {
    _game: Game | undefined

    constructor(
        private readonly _std: Std,
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

    getDecisionSafe(player: Player): { decision: PlayerActionInterface | ConsoleCommand, parameters: string } {
        let rawDecision: string
        let decision: PlayerActionInterface | ConsoleCommand
        let parameters: string

        for (; ;) {
            try {
                rawDecision = this._std.in(`${player.name} Decision >`) ?? 'q'
                // next line prob
                decision = this.getDecision(rawDecision, player)
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

    getDecision(rawDecision: string, player: Player): PlayerActionInterface | ConsoleCommand {
        const words = rawDecision.split(' ')
        const actionOrCommand = words[0].toLowerCase()

        if (actionOrCommand in ConsoleActionRepository.decisionToActionDataMap) {
            return this.getPlayerActionFromRawDecision(player, actionOrCommand, words)
        }

        if (actionOrCommand in ConsoleCommandRepository.decisionToCommandDataMap) {
            return ConsoleCommandRepository.createFromName(ConsoleCommandRepository.decisionToCommandDataMap[actionOrCommand].name)
        }

        throw new InvalidInput()
    }

    private getPlayerActionFromRawDecision(player: Player, actionOrCommand: string, words: string[]): PlayerActionInterface {
        const mapEntry = ConsoleActionRepository.decisionToActionDataMap[actionOrCommand]
        const gameAction = ActionRepository.createFromName(mapEntry.name)

        if (words.length - 1 !== mapEntry.parameters.length) {
            throw new InsufficientCliParameters(mapEntry.parameters.length, words.length - 1)
        }

        if (words.length === 1 && mapEntry.parameters.length === 0) { // only command
            return new AbstractPlayerAction(gameAction, player.tribe)
        }

        if (mapEntry.name === ActionName.Alliance) {
            mapEntry.parameters[0].check(words[0])
            // TODO implement after these actions are added
            return new AbstractPlayerAction(gameAction, player.tribe)
        }

        if (mapEntry.name === ActionName.Research) {
            mapEntry.parameters[0].check(words[0])
            return new ResearchPlayerAction(player.tribe, TechnologyRepository.createFromName((words[0] as TechnologyName)))
        }

        if (mapEntry.name === ActionName.AttackTile) {
            mapEntry.parameters[0].check(words[0])
            mapEntry.parameters[1].check(words[1])
            const defender = this.getTribeByTribeName((words[0] as TribeName))
            const tile = this.getTribeTileByResourceName(defender, (words[1] as ResourceName))

            return new AttackTilePlayerAction(player.tribe, defender, tile)
        }

        return new AbstractPlayerAction(gameAction, player.tribe)
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

export default PlayerActionGetter
