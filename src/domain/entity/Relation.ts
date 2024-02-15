import type EntityInterface from './EntityInterface.ts'
import type RelationName from '../enum/RelationName.ts'

class Relation implements EntityInterface {
    Name: RelationName
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
