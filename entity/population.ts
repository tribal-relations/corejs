class Population {
    static defaultMen = 25
    static defaultWomen = 25
    static defaultCombatReadiness = 25
    static defaultCivilizedness = 25

    constructor(
        private men: number,
        private women: number,
        private total: number,
        private combatReadiness: number,
        private civilizedness: number,
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
        return this.total
    }
}

export default Population
