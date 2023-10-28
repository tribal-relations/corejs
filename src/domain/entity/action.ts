const actions: { [index: string]: { name: string, description: string, radius: number } } = {
    'lastTurn': {
        'name': 'lastTurn',
        'description': 'final turn of the game',
        'radius': 1,
    },
}

class Action {
    static actionsCount = 19 // TODO TBD
    static lastTurnActionName = 'lastTurn'

    constructor(
        private _name: string,
        private _description: string,
        private _radius: number,
    ) {
    }

    get name(): string {
        return this._name
    }

    public static createFromName(name: string): Action {
        const foundAction = actions[name]
        if (foundAction) {
            return new Action(name, actions[name].description, actions[name].radius)
        }
        throw new Error(`action with name ${name} not found`)
    }
}

export default Action
