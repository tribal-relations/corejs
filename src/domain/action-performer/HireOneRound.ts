import type ActionInterface from './ActionInterface.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'
import type HireOneRoundPlayerAction from '../entity/action/HireOneRoundPlayerAction.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'

class HireOneRound implements ActionInterface {
    actionName = ActionName.HireOneRound

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {
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
        playerAction.buyer.buyTroopsForOneRound(playerAction.troops, playerAction.price)
        playerAction.seller.sellTroopsForOneRound(playerAction.troops, playerAction.price)
    }
}

export default HireOneRound
