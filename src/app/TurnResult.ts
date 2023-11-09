class TurnResult {
    constructor(
        private readonly _isLast: boolean = false,
        private readonly _isFinished: boolean = false,
        private readonly _success: boolean = false,
        private readonly _errorMessage: string | null = null,
    ) {
    }

    get isLast(): boolean {
        return this._isLast
    }

    get isFinished(): boolean {
        return this._isFinished
    }

    get success(): boolean {
        return this._success
    }

    get errorMessage(): string | null {
        return this._errorMessage
    }
}

export default TurnResult
