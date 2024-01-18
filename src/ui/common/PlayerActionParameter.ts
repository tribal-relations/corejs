import ValueNotInEnum from '../../exception/ValueNotInEnum.ts'

class PlayerActionParameter {
    constructor(
        private readonly _enum,
        private readonly _name: string,
    ) {
    }

    get name(): string {
        return this._name
    }

    get enum() {
        return this._enum
    }

    public check(value: string): void {
        if (!this.isValueInEnum(value)) {
            throw new ValueNotInEnum(value)
        }
    }

    private isValueInEnum(value: string): boolean {
        return Object.values(this._enum).includes(value)
    }
}

export default PlayerActionParameter
