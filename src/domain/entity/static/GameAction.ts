import type ActionName from '../../enum/ActionName.ts'
import type EntityInterface from '../EntityInterface.ts'

class GameAction implements EntityInterface {
    Name: ActionName
    constructor(
        private readonly _name: ActionName,
        private readonly _description: string,
        private readonly _radius: number,
        private readonly _constraints: {
            radius: number
            culture: number
            population: number
            production: number
            action_cost: number
            gold_cost: number
        },
    ) {
    }

    get name(): ActionName {
        return this._name
    }

    get description(): string {
        return this._description
    }

    get constraints(): {
        radius: number
        culture: number
        population: number
        production: number
        action_cost: number
        gold_cost: number
    } {
        return this._constraints
    }
}

export default GameAction
