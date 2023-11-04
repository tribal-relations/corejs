class TurnResult {
    constructor(
        private readonly _isLast: boolean = false,
        private readonly _isFinished: boolean = false,
    ) {
    }

    get isLast(): boolean {
        return this._isLast
    }

    get isFinished(): boolean {
        return this._isFinished
    }
}

export default TurnResult
