import ActionRepository from './ActionRepository.ts'
import ActionNotFound from '../../exception/not-found/ActionNotFound.ts'
import PlayerActionParameter from '../../ui/common/PlayerActionParameter.ts'
import GameplayAction from '../entity/action/GameplayAction.ts'
import ActionName from '../enum/ActionName.ts'
import ResourceName from '../enum/ResourceName.ts'
import TechnologyName from '../enum/TechnologyName.ts'
import TribeName from '../enum/TribeName.ts'

class GameplayActionRepository {
    private static readonly _actionsRawData: Record<ActionName, { name: ActionName, parameters: PlayerActionParameter[] }> = {
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

    private static readonly _gameplayActionInstances = {
        [ActionName.Arm]: GameplayActionRepository.createInstanceFromName(ActionName.Arm),
        [ActionName.Alliance]: GameplayActionRepository.createInstanceFromName(ActionName.Alliance),
        [ActionName.AttackTile]: GameplayActionRepository.createInstanceFromName(ActionName.AttackTile),
        [ActionName.AttackTribe]: GameplayActionRepository.createInstanceFromName(ActionName.AttackTribe),
        [ActionName.Caravan]: GameplayActionRepository.createInstanceFromName(ActionName.Caravan),
        [ActionName.Conquer]: GameplayActionRepository.createInstanceFromName(ActionName.Conquer),
        [ActionName.Cult]: GameplayActionRepository.createInstanceFromName(ActionName.Cult),
        [ActionName.Expedition]: GameplayActionRepository.createInstanceFromName(ActionName.Expedition),

        [ActionName.GoTo3rdRadius]: GameplayActionRepository.createInstanceFromName(ActionName.GoTo3rdRadius),
        [ActionName.GoTo2ndRadius]: GameplayActionRepository.createInstanceFromName(ActionName.GoTo2ndRadius),
        [ActionName.GoTo1stRadius]: GameplayActionRepository.createInstanceFromName(ActionName.GoTo1stRadius),
        [ActionName.Hire]: GameplayActionRepository.createInstanceFromName(ActionName.Hire),
        [ActionName.HireOneRound]: GameplayActionRepository.createInstanceFromName(ActionName.HireOneRound),
        [ActionName.Pray]: GameplayActionRepository.createInstanceFromName(ActionName.Pray),
        [ActionName.Pillage]: GameplayActionRepository.createInstanceFromName(ActionName.Pillage),
        [ActionName.RemoveCaravan]: GameplayActionRepository.createInstanceFromName(ActionName.RemoveCaravan),
        [ActionName.Research]: GameplayActionRepository.createInstanceFromName(ActionName.Research),
        [ActionName.Quit]: GameplayActionRepository.createInstanceFromName(ActionName.Quit),
    }

    public static get(name: ActionName): GameplayAction {
        if (name in GameplayActionRepository._gameplayActionInstances) {
            return GameplayActionRepository._gameplayActionInstances[name]
        }
        throw new ActionNotFound(name)
    }

    public static getAll(): Record<ActionName, GameplayAction> {
        return GameplayActionRepository._gameplayActionInstances
    }

    private static createInstanceFromName(name: ActionName): GameplayAction {
        return new GameplayAction(
            ActionRepository.get(name),
            GameplayActionRepository._actionsRawData[name].parameters,
        )
    }
}

export default GameplayActionRepository
