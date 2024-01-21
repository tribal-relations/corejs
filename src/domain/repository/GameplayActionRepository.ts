import ActionRepository from './ActionRepository.ts'
import PlayerActionParameter from '../../ui/common/PlayerActionParameter.ts'
import GameplayAction from '../entity/action/GameplayAction.ts'
import ActionName from '../enum/ActionName.ts'
import ResourceName from '../enum/ResourceName.ts'
import TechnologyName from '../enum/TechnologyName.ts'
import TribeName from '../enum/TribeName.ts'

const actions: Record<ActionName, { name: ActionName, parameters: PlayerActionParameter[] }> = {
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

class GameplayActionRepository {
    public static createFromName(name: ActionName): GameplayAction {
        return new GameplayAction(
            ActionRepository.createFromName(name),
            actions[name].parameters,
        )
    }

    public static getAll(): GameplayAction[] {
        const fullArray = []
        let temp: GameplayAction
        for (const actionName: ActionName in actions) {
            temp = new GameplayAction(
                ActionRepository.createFromName(actionName),
                actions[actionName].parameters,
            )
            fullArray.push(temp)
        }
        return fullArray
    }
}

export default GameplayActionRepository
