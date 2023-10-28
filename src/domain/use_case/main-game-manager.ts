import Game from "../entity/game";
import TurnManager from "./turn-manager";

class MainGameManager {
    private readonly _turnManager: TurnManager

    constructor(
        private _game: Game,
        private _finished: boolean = false,
    ) {
        this._turnManager = new TurnManager(_game);
    }

    get turnManager(): TurnManager {
        return this._turnManager
    }

}

export default MainGameManager