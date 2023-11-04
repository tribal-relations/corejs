class Technology {
    constructor(
        private readonly _name: string,
        private readonly _description: string,
        private readonly _prerequisites: Record<string, boolean>,
    ) {
    }

    static rome(): Record<string, boolean> {
        return {
            // Pottery: true,
            // Plough: true,
            // 'Primitive Writing': true,
            // 'Advanced Writing': true,
            // Poetry: true,
            // Calendar: true,
            // BronzeWeapons: true,
        }
    }

    get name(): string {
        return this._name
    }

    get prerequisites(): Record<string, boolean> {
        return this._prerequisites
    }
}

export default Technology
