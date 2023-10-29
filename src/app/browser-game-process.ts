import StartGameManager from "../domain/use_case/start-game-manager";
import EndGameManager from "../domain/use_case/end-game-manager";
import ConsoleUi from "../ui/console-ui";
import {container, singleton} from "tsyringe";

@singleton()
class BrowserGameProcess {
    async start(names: Array<string>, name: string = '') {
        // TODO implement
    }
}

export default BrowserGameProcess
