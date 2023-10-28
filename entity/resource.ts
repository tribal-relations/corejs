// : Array<{
//     "quantity": number,
//     "food": number,
//     "trading_ability": number,
//     "production": number,
//     "culture": number
// }>
import Population from "./population";

const resources = {
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
        private name: string,
        private quantity: number,
        private food: number,
        private tradingAbility: number,
        private production: number,
        private culture: number,
    ) {
    }

    public static createFromName(name: string): Resource {
        return Resource.createFromMap(resources[name])
    }

    private static createFromMap(map: object): Resource {
        return new Resource(
            map.name,
            map.quantity,
            map.food,
            map.trading_ability,
            map.production,
            map.culture,
        )
    }

    static getRandomResource(): Resource {
        const randomIndex = Math.floor(Math.random() * Resource.resourcesCount)
        const randomName = Resource.resourceNames[randomIndex]
        return Resource.createFromName(randomName)
    }

    get name() {
        return this.name
    }

    get quantity() {
        return this.quantity
    }

    get food() {
        return this.food
    }

    get tradingAbility() {
        return this.tradingAbility
    }

    get production() {
        return this.production
    }

    get culture() {
        return this.culture
    }
}

export default Resource
