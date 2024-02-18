import type ActionInterface from './ActionInterface.ts'
import type CaravanPlayerAction from '../../domain/entity/action/CaravanPlayerAction.ts'
import type Turn from '../../domain/entity/Turn.ts'
import ActionName from '../../domain/enum/ActionName.ts'
import type DiceThrower from '../../domain/helper/DiceThrower.ts'
import type RelationRepository from '../../domain/repository/RelationRepository.ts'
import type AlliancesStore from '../../domain/store/AlliancesStore.ts'
import type CaravansStore from '../../domain/store/CaravansStore.ts'
import type RelationsStore from '../../domain/store/RelationsStore.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'

class Caravan implements ActionInterface {
    actionName = ActionName.Caravan

    constructor(
        private readonly _diceThrower: DiceThrower,
        private readonly _relationsManager: RelationsStore,
        private readonly _caravansManager: CaravansStore,
        private readonly _alliancesStore: AlliancesStore,
        private readonly _relationRepository: RelationRepository,

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

        if (this._alliancesStore.doesXHaveAllianceWithY(
            playerAction.actor.name,
            playerAction.recipient.name,
        )) {
            playerAction.actor.addGold(goldBonus)
        }
    }

    /**
     * get bonus that is written as base caravan profit. it never includes alliance bonus
     */
    public getGoldBonus(playerAction: CaravanPlayerAction): number {
        const diceResult = this._diceThrower.d6()
        const mercantility = playerAction.actor.mercantility
        const howRecipientReactsToSender = this._relationsManager.howXReactsToY(playerAction.recipient.name, playerAction.actor.name)
        const recipientBonus = this._relationRepository.get(howRecipientReactsToSender).recipientBonus

        return diceResult * mercantility + recipientBonus
    }
}

export default Caravan
