class Rome {
    static defaultPopulation = 100
    static defaultMilitaryPower = 50
    static defaultCivilizedness = 50

    private readonly _radius = 0

    private readonly _gold: number = 0
    private readonly _points: number = 0
    private _militaryPower = 50
    private readonly _civilizedness = 50
    private _population = 100
    private readonly _knownTechs: Record<string, boolean> = {}
    private readonly _food: number = 0
    private readonly _mercantility: number = 0
    private readonly _production: number = 0
    private readonly _culture: number = 0
    public readonly tilesLength: number = 0

    get radius(): number {
        return this._radius
    }

    get gold(): number {
        return this._gold
    }

    get points(): number {
        return this._points
    }

    get technologies(): Record<string, boolean> {
        return this._knownTechs
    }

    get population(): number {
        return this._population
    }

    set population(amount: number) {
        this._population = amount
    }

    set militaryPower(amount: number) {
        this._militaryPower = amount
    }

    get militaryPower(): number {
        return this._militaryPower
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

    get food(): number {
        return this._food
    }

    get culture(): number {
        return this._culture
    }

    get production(): number {
        return this._production
    }

    get mercantility(): number {
        return this._mercantility
    }
}

export default Rome
