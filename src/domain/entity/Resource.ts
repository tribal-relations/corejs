const resources: Record<string, {
    quantity: number
    food: number
    trading_ability: number
    production: number
    culture: number
}> = {
    Metal: {
        quantity: 10,
        food: 0,
        trading_ability: 1,
        production: 2,
        culture: 0,
    },
    Fruit: {
        quantity: 8,
        food: 2,
        trading_ability: 1,
        production: 0,
        culture: 0,
    },
    Lake: {
        quantity: 4,
        food: 2,
        trading_ability: 0,
        production: 0,
        culture: 1,
    },
    Forest: {
        quantity: 20,
        food: 1,
        trading_ability: 0,
        production: 2,
        culture: 0,
    },
    River: {
        quantity: 6,
        food: 1,
        trading_ability: 2,
        production: 0,
        culture: 1,
    },
    Pasture: {
        quantity: 10,
        food: 3,
        trading_ability: 0,
        production: 0,
        culture: 0,
    },
    Stone: {
        quantity: 10,
        food: 0,
        trading_ability: 0,
        production: 2,
        culture: 1,
    },
    Gold: {
        quantity: 2,
        food: 0,
        trading_ability: 4,
        production: 0,
        culture: 0,
    },
    Silver: {
        quantity: 4,
        food: 0,
        trading_ability: 2,
        production: 0,
        culture: 1,
    },
    Desert: {
        quantity: 6,
        food: 0,
        trading_ability: 1,
        production: 0,
        culture: 1,
    },
}

class Resource {
    static resourcesCount = 10
    static pasture = 'Pasture'
    static stone = 'Stone'
    static metal = 'Metal'
    static fruit = 'Fruit'
    static lake = 'Lake'
    static gold = 'Gold'
    static silver = 'Silver'
    static forest = 'Forest'
    static desert = 'Desert'
    static river = 'River'
    static names = [
        this.pasture,
        this.stone,
        this.metal,
        this.fruit,
        this.lake,
        this.gold,
        this.silver,
        this.forest,
        this.desert,
        this.river,
    ]

    constructor(
        private readonly _name: string,
        private readonly _quantity: number,
        private readonly _food: number,
        private readonly _tradingAbility: number,
        private readonly _production: number,
        private readonly _culture: number,
    ) {
    }

    public static createFromName(name: string): Resource {
        return new Resource(
            name,
            resources[name].quantity,
            resources[name].food,
            resources[name].trading_ability,
            resources[name].production,
            resources[name].culture,
        )
    }

    static getRandomResource(): Resource {
        const randomIndex = Math.floor(Math.random() * Resource.resourcesCount)
        const randomName = Resource.names[randomIndex]
        return Resource.createFromName(randomName)
    }

    get name(): string {
        return this._name
    }

    get quantity(): number {
        return this._quantity
    }

    get food(): number {
        return this._food
    }

    get tradingAbility(): number {
        return this._tradingAbility
    }

    get production(): number {
        return this._production
    }

    get culture(): number {
        return this._culture
    }
}

export default Resource
