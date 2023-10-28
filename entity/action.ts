const actions = {}

class Action {
    static actionsCount = 19 // TODO TBD

    constructor(
        private name: string,
        private description: string,
        private radius: number,
    ) {
    }

    public static createFromName(name: string): Action {
        return new Action(name, actions[name].description, actions[name].radius)
    }
}
