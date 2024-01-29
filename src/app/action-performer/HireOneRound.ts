import type ActionInterface from './ActionInterface.ts'
import type HireOneRoundPlayerAction from '../../domain/entity/action/HireOneRoundPlayerAction.ts'
import type Turn from '../../domain/entity/Turn.ts'
import ActionName from '../../domain/enum/ActionName.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'
import type TribeManager from '../TribeManager.ts'

class HireOneRound implements ActionInterface {
    actionName = ActionName.HireOneRound

    constructor(
        private readonly _tribeManager: TribeManager,
    ) {
    }

    public perform(playerAction: HireOneRoundPlayerAction, _turn: Turn): void {
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
        this._tribeManager.buyTroopsForOneRound(playerAction.buyer, playerAction.troops, playerAction.price)
        this._tribeManager.sellTroopsForOneRound(playerAction.seller, playerAction.troops, playerAction.price)
    }
}

export default HireOneRound
