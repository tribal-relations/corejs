import type ActionInterface from './ActionInterface.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'
import type HirePlayerAction from '../entity/action/HirePlayerAction.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'

class Hire implements ActionInterface {
    actionName = ActionName.Hire

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
        playerAction.buyer.buyTroops(playerAction.troops, playerAction.price)
        playerAction.seller.sellTroops(playerAction.troops, playerAction.price)
    }
}

export default Hire
