import ActionRepository from './ActionRepository.ts'
import ActionNotFound from '../../exception/not-found/ActionNotFound.ts'
import PlayerActionParameter from '../../ui/common/PlayerActionParameter.ts'
import GameplayAction from '../entity/action/GameplayAction.ts'
import ActionName from '../enum/ActionName.ts'
import ResourceName from '../enum/ResourceName.ts'
import TechnologyName from '../enum/TechnologyName.ts'
import TribeName from '../enum/TribeName.ts'

class GameplayActionRepository {
    private static readonly _rawData: Record<ActionName, { name: ActionName, parameters: PlayerActionParameter[] }> = {
        [ActionName.Arm]: { name: ActionName.Arm, parameters: [] },
        [ActionName.Alliance]: {
            name: ActionName.Alliance,
            parameters: [new PlayerActionParameter(TribeName, 'Tribe Name')],
        },
        [ActionName.AttackTile]: {
            name: ActionName.AttackTile,
            parameters: [
                new PlayerActionParameter(TribeName, 'Tribe Name'),
                new PlayerActionParameter(ResourceName, 'Tile Resource Name'),
            ],
        },
        [ActionName.AttackTribe]: {
            name: ActionName.AttackTribe,
            parameters: [new PlayerActionParameter(TribeName, 'Tribe Name')],
        },

        [ActionName.Caravan]: {
            name: ActionName.Caravan,
            parameters: [
                new PlayerActionParameter(TribeName, 'Tribe Name'),
            ],
        },
        [ActionName.Expedition]: { name: ActionName.Expedition, parameters: [] },

        [ActionName.GoTo3rdRadius]: { name: ActionName.GoTo3rdRadius, parameters: [] },
        [ActionName.GoTo2ndRadius]: { name: ActionName.GoTo2ndRadius, parameters: [] },
        [ActionName.GoTo1stRadius]: { name: ActionName.GoTo1stRadius, parameters: [] },

        [ActionName.Hire]: {
            name: ActionName.Hire,
            parameters: [
                new PlayerActionParameter(TribeName, 'Tribe Name'),
                new PlayerActionParameter(Number, 'Number of troops to hire'),
                new PlayerActionParameter(Number, 'Amount of gold to pay'),
            ],
        },
        [ActionName.HireOneRound]: {
            name: ActionName.HireOneRound,
            parameters: [
                new PlayerActionParameter(TribeName, 'Tribe Name'),
                new PlayerActionParameter(Number, 'Number of troops to hire'),
                new PlayerActionParameter(Number, 'Amount of gold to pay'),
            ],
        },

        [ActionName.Pray]: { name: ActionName.Pray, parameters: [] },
        [ActionName.Pillage]: {
            name: ActionName.Pillage,
            parameters: [
                new PlayerActionParameter(TribeName, 'Sender tribe Name'),
                new PlayerActionParameter(TribeName, 'Recipient tribe Name'),
            ],
        },

        [ActionName.Quit]: { name: ActionName.Quit, parameters: [] },
        [ActionName.Research]: {
            name: ActionName.Research,
            parameters: [new PlayerActionParameter(TechnologyName, 'Technology Name')],
        },

        [ActionName.RemoveCaravan]: {
            name: ActionName.RemoveCaravan,
            parameters: [new PlayerActionParameter(TribeName, 'Tribe Name')],
        },

        [ActionName.Conquer]: { name: ActionName.Conquer, parameters: [] },
        [ActionName.Cult]: { name: ActionName.Cult, parameters: [] },
    }

    private static readonly _instances = {
        [ActionName.Arm]: GameplayActionRepository.create(ActionName.Arm),
        [ActionName.Alliance]: GameplayActionRepository.create(ActionName.Alliance),
        [ActionName.AttackTile]: GameplayActionRepository.create(ActionName.AttackTile),
        [ActionName.AttackTribe]: GameplayActionRepository.create(ActionName.AttackTribe),
        [ActionName.Caravan]: GameplayActionRepository.create(ActionName.Caravan),
        [ActionName.Conquer]: GameplayActionRepository.create(ActionName.Conquer),
        [ActionName.Cult]: GameplayActionRepository.create(ActionName.Cult),
        [ActionName.Expedition]: GameplayActionRepository.create(ActionName.Expedition),

        [ActionName.GoTo3rdRadius]: GameplayActionRepository.create(ActionName.GoTo3rdRadius),
        [ActionName.GoTo2ndRadius]: GameplayActionRepository.create(ActionName.GoTo2ndRadius),
        [ActionName.GoTo1stRadius]: GameplayActionRepository.create(ActionName.GoTo1stRadius),
        [ActionName.Hire]: GameplayActionRepository.create(ActionName.Hire),
        [ActionName.HireOneRound]: GameplayActionRepository.create(ActionName.HireOneRound),
        [ActionName.Pray]: GameplayActionRepository.create(ActionName.Pray),
        [ActionName.Pillage]: GameplayActionRepository.create(ActionName.Pillage),
        [ActionName.RemoveCaravan]: GameplayActionRepository.create(ActionName.RemoveCaravan),
        [ActionName.Research]: GameplayActionRepository.create(ActionName.Research),
        [ActionName.Quit]: GameplayActionRepository.create(ActionName.Quit),
    }

    public static get(name: ActionName): GameplayAction {
        if (name in GameplayActionRepository._instances) {
            return GameplayActionRepository._instances[name]
        }
        throw new ActionNotFound(name)
    }

    public static getAll(): Record<ActionName, GameplayAction> {
        return GameplayActionRepository._instances
    }

    private static create(name: ActionName): GameplayAction {
        return new GameplayAction(
            ActionRepository.get(name),
            GameplayActionRepository._rawData[name].parameters,
        )
    }
}

export default GameplayActionRepository
