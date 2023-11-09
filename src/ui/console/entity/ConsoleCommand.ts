class ConsoleCommand {
    constructor(
        private readonly _name: string,
        private readonly _description: string,
        private readonly _parameters: string,
    ) {
    }

    get name(): string {
        return this._name
    }

    get description(): string {
        return this._description
    }

    get parameters(): string {
        return this._parameters
    }
}

export default ConsoleCommand
