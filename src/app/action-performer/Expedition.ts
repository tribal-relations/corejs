import type ActionInterface from './ActionInterface.ts'
import type PlayerActionInterface from '../../domain/entity/action/PlayerActionInterface.ts'
import type Turn from '../../domain/entity/Turn.ts'
import ActionName from '../../domain/enum/ActionName.ts'
import type DiceThrower from '../../domain/helper/DiceThrower.ts'
import type TribeManager from '../TribeManager.ts'

class Expedition implements ActionInterface {
    actionName = ActionName.Expedition
    successSides = [2, 3, 4, 5] // if 1 then failure

    constructor(
        private readonly _diceThrower: DiceThrower,
        private readonly _tribeManager: TribeManager,

    ) {
    }

    public perform(playerAction: PlayerActionInterface, turn: Turn): void {
        this.startExpedition(turn)
    }

    private startExpedition(turn: Turn): void {
        if (this._diceThrower.ifSuccessD6(this.successSides)) {
            this._tribeManager.makeTerritorialDiscovery(turn.player.tribe)
        }
    }
}

export default Expedition
