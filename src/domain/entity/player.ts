import Tribe from "./tribe";

class Player {
    constructor(
        private _tribe: Tribe,
        private _name: string,
    ) {
    }

    get name(): string {
        return this._name
    }

    get tribe(): Tribe {
        return this._tribe
    }
}
export default Player

