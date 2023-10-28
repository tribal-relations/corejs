class Population {
    static defaultMen = 25
    static defaultWomen = 25
    static defaultCombatReadiness = 25
    static defaultCivilizedness = 25

    constructor(
        private _men: number,
        private _women: number,
        private _total: number,
        private _combatReadiness: number,
        private _civilizedness: number,
    ) {
    }

    static createStarterPopulation(): Population {
        return new Population(
            Population.defaultMen,
            Population.defaultWomen,
            Population.defaultMen + Population.defaultWomen,
            Population.defaultCombatReadiness,
            Population.defaultCivilizedness,
        )

    }

    get total() {
        return this._total
    }
}

export default Population
