import Rome from './Rome'

/**
 * @deprecated need to move to tribe
 */
class Population {
    static defaultTotal = 2
    static defaultCombatReadiness = 1
    static defaultCivilizedness = 1

    constructor(
        private _total: number = Population.defaultTotal,
        private _combatReadiness: number = Population.defaultCombatReadiness,
        private readonly _civilizedness: number = Population.defaultCivilizedness,
    ) {
    }

    static createStarterPopulation(): Population {
        return new Population(
            Population.defaultTotal,
            Population.defaultCombatReadiness,
            Population.defaultCivilizedness,
        )
    }

    static rome(): Population {
        return new Population(
            Rome.defaultPopulation,
            Rome.defaultCombatReadiness,
            Rome.defaultCivilizedness,
        )
    }

    get total(): number {
        return this._total
    }

    get combatReadiness(): number {
        return this._combatReadiness
    }

    get civilizedness(): number {
        return this._civilizedness
    }

    arm(amount: number): void {
        this._combatReadiness += amount
    }

    takeLosses(amount: number): void {
        this.shrink(amount)
        if (amount < this._combatReadiness) {
            this._combatReadiness -= amount
        } else {
            this._combatReadiness = 1
        }
    }

    shrink(amount: number): void {
        this._total -= amount
        if (this._total < 1) {
            this._total = 1
        }
    }

    grow(amount: number): void {
        this._total += amount
    }
}

export default Population
