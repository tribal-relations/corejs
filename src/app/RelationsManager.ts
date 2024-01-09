import RelationName from '../domain/enum/RelationName'
import type TribeName from '../domain/enum/TribeName'

class RelationsManager {
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
    // Record<TribeName, Record<TribeName, RelationName>>
    private _relations: object

    get relations(): object {
        return this._relations
    }

    set relations(relations: Record<TribeName, Record<TribeName, RelationName>>) {
        this._relations = relations
    }

    public setRelations(agent: TribeName, recipient: TribeName, relation: RelationName) {
        if (agent in this._relations) {
            this._relations[agent][recipient] = relation
        } else {
            this._relations[agent] = {}
            this._relations[agent][recipient] = relation
        }
    }

    public howThisTribeReactsToOthers(agent: TribeName): Record<TribeName, RelationName> {
        return this.relations[agent]
    }

    public howOthersReactToThisTribe(recipient: TribeName): object {
        // const reactions: Record<TribeName, RelationName> = ({} as Record<TribeName, RelationName>)
        const reactions = {}
        for (const agentName of this.relations) {
            reactions[agentName] = this.relations[agentName][recipient]
        }
        return reactions
    }

    public setStarterRelations(names: TribeName[]) {
        this._relations = {}

        for (const agentName of names) {
            for (const recipientName of names) {
                if (agentName !== recipientName) {
                    this._relations[agentName][recipientName] = RelationName.Equals
                }
            }
        }
    }
}

export default RelationsManager
