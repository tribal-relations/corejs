class Population {
    static defaultMen = 25
    static defaultWomen = 25
    static defaultCombatReadiness = 25
    static defaultCivilizedness = 25

    constructor(
        private readonly _men: number = Population.defaultMen,
        private readonly _women: number = Population.defaultWomen,
        private readonly _total: number = Population.defaultMen + Population.defaultWomen,
        private readonly _combatReadiness: number = Population.defaultCombatReadiness,
        private readonly _civilizedness: number = Population.defaultCivilizedness,
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
