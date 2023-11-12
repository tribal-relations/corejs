import type TechnologyName from '../enum/TechnologyName'

class Technology {
    constructor(
        private readonly _name: string,
        private readonly _description: string,
        private readonly _prerequisites: Record<TechnologyName | string, boolean>,
    ) {
    }

    get name(): string {
        return this._name
    }

    get description(): string {
        return this._description
    }

    get prerequisites(): Record<TechnologyName | string, boolean> {
        return this._prerequisites
    }
}

export default Technology
