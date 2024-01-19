import type CommandName from '../enum/CommandName.ts'

class ConsoleCommand {
    constructor(
        private readonly _name: CommandName,
        private readonly _description: string = '',
        private readonly _parameters: string = '',
    ) {
    }

    get name(): CommandName {
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
