import RelationName from '../enum/RelationName.ts'
import type TribeName from '../enum/TribeName.ts'
import RelationRepository from '../repository/RelationRepository.ts'

class RelationsStore {
    // example
    // relation: Cannibals
    // agent: East
    // recipient: West
    // game situation: East player chooses Cannibals card toward West player
    // game meaning: East thinks that West are cannibals
    // relation: Respectables
    // agent: West
    // recipient: East
    // game situation: West player chooses Respectables card toward East player
    // game meaning: West thinks that East are Respectables
    // data structure: {"East": {"West": "Cannibals"}, "West": {"East": "Respectables"}}
    private _relations: Record<TribeName, Record<TribeName, RelationName>>

    get relations(): Record<TribeName, Record<TribeName, RelationName>> {
        return this._relations
    }

    set relations(relations: Record<TribeName, Record<TribeName, RelationName>>) {
        this._relations = relations
    }

    public setAllRelationsForTribe(agent: TribeName, relations: Record<TribeName, RelationName>) {
        if (agent in this._relations) {
            this._relations[agent] = relations
        } else {
            this._relations[agent] = Object()
            this._relations[agent] = relations
        }
    }

    public setRelations(agent: TribeName, recipient: TribeName, relation: RelationName) {
        if (agent in this._relations) {
            this._relations[agent][recipient] = relation
        } else {
            this._relations[agent] = Object()
            this._relations[agent][recipient] = relation
        }
    }

    public howThisTribeReactsToOthers(agent: TribeName): Record<TribeName, RelationName> {
        if (agent in this._relations) {
            return this.relations[agent]
        }
        return Object()
    }

    public howOthersReactToThisTribe(recipient: TribeName): Record<TribeName, RelationName> {
        const reactions: Record<TribeName, RelationName> = Object()
        for (const agentName in this.relations) {
            if (recipient in this.relations[agentName]) {
                reactions[agentName] = this.relations[agentName][recipient]
            }
        }

        if (!Object.keys(reactions)) {
            // throw new TribeRecipientRelationNotFound(recipient)
        }

        return reactions
    }

    public howXReactsToY(xName: TribeName, yName: TribeName): RelationName {
        return this.howOthersReactToThisTribe(yName)[xName]
    }

    public setStarterRelations(names: TribeName[]) {
        this._relations = Object()

        for (const agentName of names) {
            for (const recipientName of names) {
                if (agentName !== recipientName) {
                    if (!(agentName in this._relations)) {
                        this._relations[agentName] = Object()
                    }
                    this._relations[agentName][recipientName] = RelationName.Equals
                }
            }
        }
    }

    public getTribeTotalBonus(agent: TribeName): number {
        return this.getTribeBonusAsAgent(agent) + this.getTribeBonusAsRecipient(agent)
    }

    private getTribeBonusAsAgent(agent: TribeName): number {
        return Object.values(this.howThisTribeReactsToOthers(agent))
            .map((value: RelationName) => RelationRepository.createFromName(value).agentBonus)
            .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)
    }

    private getTribeBonusAsRecipient(agent: TribeName): number {
        return Object.values(this.howOthersReactToThisTribe(agent))
            .map((value: RelationName) => RelationRepository.createFromName(value).recipientBonus)
            .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)
    }
}

export default RelationsStore
