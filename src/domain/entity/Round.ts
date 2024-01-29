import type Turn from './Turn.ts'

class Round {
    parameters: string = ''

    constructor(
        private readonly _number: number,
        private readonly _isLast: boolean = false,
        private readonly _isFinished: boolean = false,
        private readonly _turns: Turn[] = [],
    ) {
    }

    get number(): number {
        return this._number
    }

    get isLast(): boolean {
        return this._isLast
    }

    get isFinished(): boolean {
        return this._isFinished
    }

    get turns(): Turn[] {
        return this._turns
    }

    public addTurn(turn: Turn) {
        this._turns.push(turn)
    }
}

export default Round
