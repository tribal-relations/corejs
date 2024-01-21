import type AlliancesStore from './AlliancesStore'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'
import CaravanNotFound from '../../exception/not-found/CaravanNotFound.ts'
import Bonus from '../entity/Bonus.ts'
import Currency from '../entity/Currency.ts'
import type Tribe from '../entity/Tribe.ts'
import ActionName from '../enum/ActionName.ts'
import BonusName from '../enum/BonusName.ts'
import type TribeName from '../enum/TribeName.ts'

class CaravansStore {
    public readonly recipientMercantilityBonus = 1
    public readonly recipientCultureBonus = 1

    // example
    // agent: East
    // recipient: West
    // game situation: East player chooses Caravan toward West player
    // game meaning: East send wares to West to get money
    // data structure: {"East": {"West": 10}, "West": {"East": 12}}
    private _caravans: Record<TribeName, Record<TribeName, number>> = Object()

    constructor(
        private readonly _alliancesStore: AlliancesStore,
    ) {
    }

    get caravans(): Record<TribeName, Record<TribeName, number>> {
        return this._caravans
    }

    set caravans(caravans: Record<TribeName, Record<TribeName, number>>) {
        this._caravans = caravans
    }

    public setAllCaravansForTribe(agent: TribeName, caravans: Record<TribeName, number>) {
        if (agent in this._caravans) {
            this._caravans[agent] = caravans
        } else {
            this._caravans[agent] = Object()
            this._caravans[agent] = caravans
        }
    }

    public setCaravan(agent: TribeName, recipient: TribeName, gold: number) {
        if (agent in this._caravans && recipient in this._caravans[agent]) {
            throw new ActionUnsuccessful(ActionName.Caravan, 'Caravan already exists.')
        }
        if (agent in this._caravans) {
            this._caravans[agent][recipient] = gold
        } else {
            this._caravans[agent] = Object()
            this._caravans[agent][recipient] = gold
        }
    }

    public getGoldByDestination(agent: TribeName): Record<TribeName, number> {
        if (agent in this._caravans) {
            return this.caravans[agent]
        }
        return Object()
    }

    public whatProfitOthersGetFromMe(meWhoGetsForeignCaravans: TribeName): Record<TribeName, number> {
        const reactions: Record<TribeName, number> = Object()
        for (const agentName in this.caravans) {
            if (meWhoGetsForeignCaravans in this.caravans[agentName]) {
                reactions[agentName] = this.caravans[agentName][meWhoGetsForeignCaravans]
            }
        }

        if (!Object.keys(reactions)) {
            // throw new TribeRecipientRelationNotFound(recipient)
        }

        return reactions
    }

    public getCaravanPrice(senderName: TribeName, recipientName: TribeName): number {
        if (senderName in this._caravans) {
            if (recipientName in this._caravans[senderName]) {
                return this.caravans[senderName][recipientName]
            }
        }

        return 0
    }

    public whatXGetsFromY(xName: TribeName, yName: TribeName): number {
        const tribeToProfit = this.whatProfitOthersGetFromMe(yName)
        if (xName in tribeToProfit) {
            return tribeToProfit[xName]
        }

        return 0
    }

    public getTotalProfit(agent: TribeName): number {
        const tribeToGold = this.getGoldByDestination(agent)
        let totalProfit = 0
        for (const tribeName: TribeName in tribeToGold) {
            if (this._alliancesStore.doesXHaveAllianceWithY(
                agent,
                tribeName,
            )) {
                totalProfit += this._alliancesStore.allianceCaravanMultiplier * tribeToGold[tribeName]
            } else {
                totalProfit += tribeToGold[tribeName]
            }
        }
        return totalProfit
    }

    public getTotalMercantilityBonus(agent: TribeName): number {
        return Object.values(this.whatProfitOthersGetFromMe(agent))
            .reduce(
                (partialSum, _currentDestinationProfit) => partialSum + this.recipientMercantilityBonus,
                0,
            )
    }

    public getTotalCultureBonus(agent: TribeName): number {
        return Object.values(this.whatProfitOthersGetFromMe(agent))
            .reduce(
                (partialSum, _currentDestinationProfit) => partialSum + this.recipientCultureBonus,
                0,
            )
    }

    public saveCaravan(actor: Tribe, recipient: Tribe, goldBonus: number) {
        this.setCaravan(actor.name, recipient.name, goldBonus)
        actor.addGold(goldBonus)
        recipient.addBonus(new Bonus(
            recipient,
            BonusName.MercantilityFromForeignCaravan,
            1,
            Currency.Mercantility,
        ))
        recipient.addBonus(new Bonus(
            recipient,
            BonusName.CultureFromForeignCaravan,
            1,
            Currency.Culture,
        ))
    }

    public removeCaravan(actorName: TribeName, recipientName: TribeName) {
        if (!(actorName in this._caravans)) {
            throw new CaravanNotFound(actorName)
        }
        if (actorName in this._caravans && !(recipientName in this._caravans[actorName])) {
            throw new CaravanNotFound(actorName, recipientName)
        }

        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete this._caravans[actorName][recipientName]
    }

    public keepCaravansProfits(actor: Tribe): void {
        const goldBonus = this.getTotalProfit(actor.name)
        actor.addGold(goldBonus)
    }
}

export default CaravansStore
