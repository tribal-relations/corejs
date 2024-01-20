import type ActionInterface from './ActionInterface.ts'
import type PlayerActionInterface from '../entity/action/PlayerActionInterface.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'

class Caravan implements ActionInterface {
    actionName = ActionName.Caravan

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {
    }

    public perform(_playerAction: PlayerActionInterface, _turn: Turn): void {
        // TODO impl https://github.com/tribal-relations/client/issues/89

    }
}

export default Caravan
