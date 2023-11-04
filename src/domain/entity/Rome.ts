import { singleton } from 'tsyringe'
import Population from './Population'
import Technology from './Technology'
import Territory from './Territory'
import type CanFight from '../interface/CanFight'

@singleton()
class Rome implements CanFight {
    static defaultPopulation = 100
    static defaultCombatReadiness = 50
    static defaultCivilizedness = 50

    private readonly _radius = 0
    private _isWinner = false

    private readonly _wealth: number = 0
    private readonly _points: number = 0
    private readonly _population: Population = Population.rome()
    private readonly _territory: Territory = Territory.rome()
    private readonly _knownTechs: Record<string, boolean> = Technology.rome()

    get radius(): number {
        return this._radius
    }

    get wealth(): number {
        return this._wealth
    }

    get points(): number {
        return this._points
    }

    get population(): Population {
        return this._population
    }

    get territory(): Territory {
        return this._territory
    }

    get technologies(): Record<string, boolean> {
        return this._knownTechs
    }

    get isWinner(): boolean {
        return this._isWinner
    }

    set isWinner(_isWinner: boolean) {
        this._isWinner = _isWinner
    }

    hasTech(name: string): boolean {
        return (name in this._knownTechs)
    }

    getNewPopulationCount(fertility: number): number {
        const food = this._territory.getTotalFood()
        const cropsYield = food * fertility
        const upperBound = this._population.total * 10

        if (cropsYield < upperBound) {
            return cropsYield
        }

        return upperBound
    }

    arm(): void {
        this.population.arm()
    }

    research(name: string): void {
        this._knownTechs[name] = true
    }
}

export default Rome
