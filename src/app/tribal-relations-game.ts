import StartGameManager from "../domain/use_case/start-game-manager";
import EndGameManager from "../domain/use_case/end-game-manager";
import MainGameManager from "../domain/use_case/main-game-manager";
import ConsoleUi from "../ui/console-ui";

class TribalRelationsGame {
    async startConsole(names: Array<string>, name: string = '') {
        const startGameManager = new StartGameManager();

        const game = startGameManager.start(names, name)

        const mainGameManager = new MainGameManager(game);
        const playerInterface = new ConsoleUi(mainGameManager);
        await playerInterface.startTurns();

        const endGameManager = new EndGameManager(game);
        endGameManager.initiateFinish();
    }
}

export default TribalRelationsGame
