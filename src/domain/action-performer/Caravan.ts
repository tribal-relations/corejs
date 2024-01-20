import type ActionInterface from './ActionInterface.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'
import type CaravanPlayerAction from '../entity/action/CaravanPlayerAction.ts'
import type Turn from '../entity/Turn.ts'
import ActionName from '../enum/ActionName.ts'
import type DiceThrower from '../helper/DiceThrower.ts'
import RelationRepository from '../repository/RelationRepository.ts'
import type CaravansStore from '../store/CaravansStore.ts'
import type RelationsStore from '../store/RelationsStore.ts'

class Caravan implements ActionInterface {
    actionName = ActionName.Caravan

    constructor(
        private readonly _diceThrower: DiceThrower,
        private readonly _relationsManager: RelationsStore,
        private readonly _caravansManager: CaravansStore,

    ) {
    }

    /**
     * gold = diceResult * mercantility + recipientBonus
     * where recipientBonus means bonus towards you from recipient tribe -> you relation
     *
     * caravan already works the next round, and you get the money automatically
     * can be done once per round for each tribe (if 5 actions and 5 neighbours - can send 5 caravans)
     */
    public perform(playerAction: CaravanPlayerAction, _turn: Turn): void {
        if (playerAction.actor.name === playerAction.recipient.name) {
            throw new ActionUnsuccessful('Cannot send caravan to self.')
        }
        const goldBonus = this.getGoldBonus(playerAction)
        this._caravansManager.saveCaravan(
            playerAction.actor,
            playerAction.recipient,
            goldBonus,
        )
    }

    public getGoldBonus(playerAction: CaravanPlayerAction): number {
        const diceResult = this._diceThrower.d6()
        const mercantility = playerAction.actor.mercantility
        const howRecipientReactsToSender = this._relationsManager.howXReactsToY(playerAction.recipient.name, playerAction.actor.name)

        const recipientBonus = RelationRepository.createFromName(howRecipientReactsToSender).recipientBonus

        return diceResult * mercantility + recipientBonus
    }
}

export default Caravan
