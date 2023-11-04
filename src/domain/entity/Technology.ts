class Technology {
    constructor(
        private readonly _name: string,
        private readonly _description: string,
        private readonly _prerequisites: Record<string, boolean>,
    ) {
    }

    get name(): string {
        return this._name
    }

    get prerequisites(): Record<string, boolean> {
        return this._prerequisites
    }
}

export default Technology
