import type ActionInterface from './ActionInterface.ts'
import type HirePlayerAction from '../../domain/entity/action/HirePlayerAction.ts'
import type Turn from '../../domain/entity/Turn.ts'
import ActionName from '../../domain/enum/ActionName.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'
import type TribeManager from '../TribeManager.ts'

class Hire implements ActionInterface {
    actionName = ActionName.Hire

    constructor(
        private readonly _tribeManager: TribeManager,
    ) {
    }

    public perform(playerAction: HirePlayerAction, _turn: Turn): void {
        if (playerAction.price > playerAction.buyer.gold) {
            throw new ActionUnsuccessful(
                ActionName.Hire,
                `Buyer ${playerAction.buyer.name} does not have enough gold.`,
            )
        }
        if (playerAction.troops > playerAction.seller.militaryPower) {
            throw new ActionUnsuccessful(
                ActionName.Hire,
                `Seller ${playerAction.seller.name} does not have enough troops.`,
            )
        }
        this._tribeManager.buyTroops(playerAction.buyer, playerAction.troops, playerAction.price)
        this._tribeManager.sellTroops(playerAction.seller, playerAction.troops, playerAction.price)
    }
}

export default Hire
