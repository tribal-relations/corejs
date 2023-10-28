class TurnResult {
    constructor(
        private _isLast: boolean = false,
        private _isFinished: boolean = false,
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
