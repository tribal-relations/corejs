import type EntityInterface from './EntityInterface.ts'
import type TechnologyName from '../enum/TechnologyName.ts'

class Technology implements EntityInterface {
    Name: TechnologyName
    constructor(
        private readonly _name: TechnologyName,
        private readonly _description: string,
        private readonly _prerequisites: Record<string, boolean>,
    ) {
    }

    get name(): TechnologyName {
        return this._name
    }

    get description(): string {
        return this._description
    }

    get prerequisites(): Record<string, boolean> {
        return this._prerequisites
    }
}

export default Technology
