import type ActionRepository from './ActionRepository.ts'
import BaseRepository from './BaseRepository.ts'
import PlayerActionParameter from '../../ui/common/PlayerActionParameter.ts'
import GameplayAction from '../entity/action/GameplayAction.ts'
import ActionName from '../enum/ActionName.ts'
import ResourceName from '../enum/ResourceName.ts'
import TechnologyName from '../enum/TechnologyName.ts'
import TribeName from '../enum/TribeName.ts'

class GameplayActionRepository extends BaseRepository<GameplayAction> {
    constructor(
        private readonly _actionRepository: ActionRepository,
    ) {
        super()
        this.instances = {
            [ActionName.Arm]: this.create(ActionName.Arm),
            [ActionName.Alliance]: this.create(ActionName.Alliance),
            [ActionName.AttackTile]: this.create(ActionName.AttackTile),
            [ActionName.AttackTribe]: this.create(ActionName.AttackTribe),
            [ActionName.Caravan]: this.create(ActionName.Caravan),
            [ActionName.Conquer]: this.create(ActionName.Conquer),
            [ActionName.Cult]: this.create(ActionName.Cult),
            [ActionName.Expedition]: this.create(ActionName.Expedition),

            [ActionName.GoTo3rdRadius]: this.create(ActionName.GoTo3rdRadius),
            [ActionName.GoTo2ndRadius]: this.create(ActionName.GoTo2ndRadius),
            [ActionName.GoTo1stRadius]: this.create(ActionName.GoTo1stRadius),
            [ActionName.Hire]: this.create(ActionName.Hire),
            [ActionName.HireOneRound]: this.create(ActionName.HireOneRound),
            [ActionName.Pray]: this.create(ActionName.Pray),
            [ActionName.Pillage]: this.create(ActionName.Pillage),
            [ActionName.RemoveCaravan]: this.create(ActionName.RemoveCaravan),
            [ActionName.Research]: this.create(ActionName.Research),
            [ActionName.Treason]: this.create(ActionName.Treason),

            [ActionName.Quit]: this.create(ActionName.Quit),
        }
    }

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
        [ActionName.Treason]: {
            name: ActionName.Treason,
            parameters: [new PlayerActionParameter(TribeName, 'Tribe Name')],
        },
    }

    protected instances = {}

    private create(name: ActionName): GameplayAction {
        return new GameplayAction(
            this._actionRepository.get(name),
            GameplayActionRepository._rawData[name].parameters,
        )
    }
}

export default GameplayActionRepository
