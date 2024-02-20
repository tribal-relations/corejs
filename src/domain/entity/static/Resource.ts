import type ResourceName from '../../enum/ResourceName.ts'
import type EntityInterface from '../EntityInterface'

class Resource implements EntityInterface {
    Name: ResourceName
    constructor(
        private readonly _name: ResourceName,
        private readonly _quantity: number,
        private readonly _food: number,
        private readonly _mercantility: number,
        private readonly _production: number,
        private readonly _culture: number,
    ) {
    }

    get name(): ResourceName {
        return this._name
    }

    get quantity(): number {
        return this._quantity
    }

    get food(): number {
        return this._food
    }

    get mercantility(): number {
        return this._mercantility
    }

    get production(): number {
        return this._production
    }

    get culture(): number {
        return this._culture
    }
}

export default Resource
