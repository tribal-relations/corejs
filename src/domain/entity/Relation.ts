import type RelationName from '../enum/RelationName.ts'

class Relation {
    constructor(
        private readonly _name: RelationName,
        private readonly _agentBonus: number,
        private readonly _recipientBonus: number,
    ) {
    }

    get name(): RelationName {
        return this._name
    }

    get agentBonus(): number {
        return this._agentBonus
    }

    get recipientBonus(): number {
        return this._recipientBonus
    }
}

export default Relation
