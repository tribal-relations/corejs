import StartGameManager from "../domain/use_case/start-game-manager";
import EndGameManager from "../domain/use_case/end-game-manager";
import ConsoleUi from "../ui/console-ui";
import {singleton} from "tsyringe";
import Game from "../domain/entity/game";

@singleton()
class ConsoleGameProcess {
    _game: Game | undefined

    constructor(
        private _startGameManager: StartGameManager,
        private _playerInterface: ConsoleUi,
        private _endGameManager: EndGameManager,
    ) {
    }

    get game(): Game {
        if (this._game === undefined) {
            throw new Error('game is not yet created')
        }
        return this._game
    }

    get startGameManager(): StartGameManager {
        return this._startGameManager
    }

    get playerInterface(): ConsoleUi {
        return this._playerInterface
    }

    get endGameManager(): EndGameManager {
        return this._endGameManager
    }

    set game(game: Game) {
        this._game = game
    }

    async start(names: Array<string>, name: string = '') {
        this.game = this.startGameManager.start(names, name)

        this.playerInterface.game = this.game
        await this.playerInterface.startTurns();

        this.endGameManager.game = this.game
        this.endGameManager.initiateFinish();
    }
}

export default ConsoleGameProcess
