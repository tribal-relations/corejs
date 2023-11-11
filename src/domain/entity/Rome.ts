import { singleton } from 'tsyringe'
import Technology from './Technology'
import Territory from './Territory'
import type Tile from './Tile'
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
    private readonly _combatReadiness = 50
    private readonly _civilizedness = 50
    private readonly _total = 100
    private readonly _territory: Territory = new Territory()
    private readonly _knownTechs: Record<string, boolean> = Technology.rome()
    private readonly _food: number = 0
    private readonly _tradingAbility: number = 0
    private readonly _production: number = 0
    private readonly _culture: number = 0
    private readonly _tiles: Tile[] = []

    get radius(): number {
        return this._radius
    }

    get wealth(): number {
        return this._wealth
    }

    get points(): number {
        return this._points
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

    get total(): number {
        return this._total
    }

    get combatReadiness(): number {
        return this._combatReadiness
    }

    get civilizedness(): number {
        return this._civilizedness
    }

    hasTech(name: string): boolean {
        return (name in this._knownTechs)
    }

    research(name: string): void {
        this._knownTechs[name] = true
    }

    get tiles(): Tile[] {
        return this._tiles
    }

    get food(): number {
        return this._food
    }

    get culture(): number {
        return this._culture
    }

    get production(): number {
        return this._production
    }

    get tradingAbility(): number {
        return this._tradingAbility
    }
}

export default Rome
