import type WinningConditionName from '../enum/WinningConditionName.ts'

class WinningCondition {
    constructor(
        private readonly _name: WinningConditionName,
        private readonly _text: string,
    ) {
    }

    get name(): WinningConditionName {
        return this._name
    }

    get text(): string {
        return this._text
    }
}

export default WinningCondition
