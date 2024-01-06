import PlayerActionCliParameter from './entity/PlayerActionCliParameter'
import ActionName from '../../domain/enum/ActionName.ts'
import ResourceName from '../../domain/enum/ResourceName'
import TechnologyName from '../../domain/enum/TechnologyName'
import TribeName from '../../domain/enum/TribeName.ts'

class ConsoleActionRepository {
    static decisionToActionDataMap: Record<string, { name: ActionName, parameters: PlayerActionCliParameter[] }> = {
        a: { name: ActionName.Arm, parameters: [] },
        al: { name: ActionName.Alliance, parameters: [new PlayerActionCliParameter(TribeName, 'Tribe Name')] },
        atile: {
            name: ActionName.AttackTile,
            parameters: [new PlayerActionCliParameter(TribeName, 'Tribe Name'), new PlayerActionCliParameter(ResourceName, 'Tile Resource Name')],
        },
        atr: { name: ActionName.AttackTribe, parameters: [new PlayerActionCliParameter(TribeName, 'Tribe Name')] },

        c: { name: ActionName.Caravan, parameters: [new PlayerActionCliParameter(TribeName, 'Tribe Name')] },
        e: { name: ActionName.Expedition, parameters: [] },

        g3: { name: ActionName.GoTo3rdRadius, parameters: [] },
        g2: { name: ActionName.GoTo2ndRadius, parameters: [] },
        g1: { name: ActionName.GoTo1stRadius, parameters: [] },

        h: {
            name: ActionName.Hire,
            parameters: [new PlayerActionCliParameter(TribeName, 'Tribe Name'), new PlayerActionCliParameter(Number, 'Number of troops to hire'), new PlayerActionCliParameter(Number, 'Amount of gold to pay')],
        },
        h1: {
            name: ActionName.HireOneRound,
            parameters: [new PlayerActionCliParameter(TribeName, 'Tribe Name'), new PlayerActionCliParameter(Number, 'Number of troops to hire'), new PlayerActionCliParameter(Number, 'Amount of gold to pay')],
        },

        pray: { name: ActionName.Pray, parameters: [] },
        pil: { name: ActionName.Pillage, parameters: [new PlayerActionCliParameter(TribeName, 'Tribe Name')] },

        q: { name: ActionName.Quit, parameters: [] },
        r: { name: ActionName.Research, parameters: [new PlayerActionCliParameter(TechnologyName, 'Technology Name')] },

        rmca: { name: ActionName.RemoveCaravan, parameters: [new PlayerActionCliParameter(TribeName, 'Tribe Name')] },

        co: { name: ActionName.Conquer, parameters: [] },
        cu: { name: ActionName.Cult, parameters: [] },
    }
}

export default ConsoleActionRepository
