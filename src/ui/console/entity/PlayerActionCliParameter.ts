class PlayerActionCliParameter {
    constructor(private readonly _enum) {
    }

    get enum() {
        return this._enum
    }

    public check(value: string): void {
        if (!this.isValueInEnum(value)) {
            throw new Error('value is not in enum')
        }
    }

    private isValueInEnum(value: string): boolean {
        return Object.values(this._enum).includes(value)
    }
}

export default PlayerActionCliParameter
