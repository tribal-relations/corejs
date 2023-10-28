// : Array<{
//     "quantity": number,
//     "food": number,
//     "trading_ability": number,
//     "production": number,
//     "culture": number
// }>
import Population from "./population";

const resources: { [index: string]: { quantity: number, food: number, trading_ability: number, production: number, culture: number } } = {
    "Metal": {
        "quantity": 10,
        "food": 0,
        "trading_ability": 1,
        "production": 2,
        "culture": 0
    },
    "Fruit": {
        "quantity": 8,
        "food": 2,
        "trading_ability": 1,
        "production": 0,
        "culture": 0
    },
    "Lake": {
        "quantity": 4,
        "food": 2,
        "trading_ability": 0,
        "production": 0,
        "culture": 1
    },
    "Forest": {
        "quantity": 20,
        "food": 1,
        "trading_ability": 0,
        "production": 2,
        "culture": 0
    },
    "River": {
        "quantity": 6,
        "food": 1,
        "trading_ability": 2,
        "production": 0,
        "culture": 1
    },
    "Pasture": {
        "quantity": 10,
        "food": 3,
        "trading_ability": 0,
        "production": 0,
        "culture": 0
    },
    "Stone": {
        "quantity": 10,
        "food": 0,
        "trading_ability": 0,
        "production": 2,
        "culture": 1
    },
    "Gold": {
        "quantity": 2,
        "food": 0,
        "trading_ability": 4,
        "production": 0,
        "culture": 0
    },
    "Silver": {
        "quantity": 4,
        "food": 0,
        "trading_ability": 2,
        "production": 0,
        "culture": 1
    },
    "Desert": {
        "quantity": 6,
        "food": 0,
        "trading_ability": 1,
        "production": 0,
        "culture": 1
    }
};

class Resource {
    static resourcesCount = 10
    static resourceNamePasture = "Pasture"
    static resourceNameStone = "Stone"
    static resourceNameMetal = "Metal"
    static resourceNameFruit = "Fruit"
    static resourceNameLake = "Lake"
    static resourceNameGold = "Gold"
    static resourceNameSilver = "Silver"
    static resourceNameForest = "Forest"
    static resourceNameDesert = "Desert"
    static resourceNameRiver = "River"
    static resourceNames = [
        this.resourceNamePasture,
        this.resourceNameStone,
        this.resourceNameMetal,
        this.resourceNameFruit,
        this.resourceNameLake,
        this.resourceNameGold,
        this.resourceNameSilver,
        this.resourceNameForest,
        this.resourceNameDesert,
        this.resourceNameRiver,
    ]

    constructor(
        private _name: string,
        private _quantity: number,
        private _food: number,
        private _tradingAbility: number,
        private _production: number,
        private _culture: number,
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
        const randomName = Resource.resourceNames[randomIndex]
        return Resource.createFromName(randomName)
    }

    get name() {
        return this._name
    }

    get quantity() {
        return this._quantity
    }

    get food() {
        return this._food
    }

    get tradingAbility() {
        return this._tradingAbility
    }

    get production() {
        return this._production
    }

    get culture() {
        return this._culture
    }
}

export default Resource
