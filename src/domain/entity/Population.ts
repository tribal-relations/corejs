import Rome from './Rome'

class Population {
    static defaultTotal = 2
    static defaultCombatReadiness = 1
    static defaultCivilizedness = 1

    constructor(
        private _total: number = Population.defaultTotal,
        private _combatReadiness: number = Population.defaultCombatReadiness,
        private _civilizedness: number = Population.defaultCivilizedness,
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

    arm(): void {
        if (this.total === this._combatReadiness) {
            throw new Error('cannot arm further. maximal combat readiness for such population')
        }
        if (this.total <= this._civilizedness + this._combatReadiness) {
            this._civilizedness--
        }
        this._combatReadiness++
    }

    takeLosses(amount: number): void {
        if (-amount < this._combatReadiness) {
            this._combatReadiness += amount // amount is negative
        } else {
            this._combatReadiness = 1
        }
    }

    grow(amount: number): void {
        this._total += amount
    }
}

export default Population
