import type RelationsTurn from './RelationsTurn.ts'

class RelationsRound {
    parameters: string = ''

    constructor(
        private readonly _turns: RelationsTurn[] = [],
    ) {
    }

    get turns(): RelationsTurn[] {
        return this._turns
    }

    public addTurn(turn: RelationsTurn) {
        this._turns.push(turn)
    }
}

export default RelationsRound
