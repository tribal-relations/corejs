class Action {
    constructor(
        private readonly _name: string,
        private readonly _description: string,
        private readonly _radius: number,
        private readonly _constraints: {
            radius: number
            culture: number
            population: number
            production: number
            action_cost: number
            gold_cost: number
        },
    ) {
    }

    get name(): string {
        return this._name
    }

    get constraints(): {
        radius: number
        culture: number
        population: number
        production: number
        action_cost: number
        gold_cost: number
    } {
        return this._constraints
    }
}

export default Action
