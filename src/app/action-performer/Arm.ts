import type ActionInterface from './ActionInterface.ts'
import type PlayerActionInterface from '../../domain/entity/action/PlayerActionInterface.ts'
import type Turn from '../../domain/entity/Turn.ts'
import ActionName from '../../domain/enum/ActionName.ts'
import type TribeManager from '../TribeManager.ts'

class Arm implements ActionInterface {
    actionName = ActionName.Arm

    constructor(
        private readonly _tribeManager: TribeManager,
    ) {
    }

    public perform(playerAction: PlayerActionInterface, turn: Turn): void {
        this._tribeManager.arm(turn.player.tribe)
    }
}

export default Arm
