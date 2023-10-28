import MainGameManager from "../domain/use_case/main-game-manager";
import TurnDecisionManager from "../app/turn-decision-manager";
import TurnResult from "../app/turn-result";

class ConsoleUi {
    private _turnDecisionManager: TurnDecisionManager

    constructor(
        private _mainGameManager: MainGameManager,
        private _isGameFinished: boolean = false,
    ) {
        this._turnDecisionManager = new TurnDecisionManager(this.output)
    }

    output(...data: any[]) {
        console.log(...data)
    }

    async startTurns() {
        let turnResult: TurnResult;
        for (let i = 0; !this._isGameFinished; ++i) {
            this.output(`turn ${i}`);

            const nextTurn = this._mainGameManager.turnManager.nextTurn();

            turnResult = await this._turnDecisionManager.processTurn(nextTurn);
            this.output(turnResult);

            if (turnResult.isLast) {
                this.output(`last turn`);
                break
            }

            this.output(`turn finished`);
        }
        return
    }
}

export default ConsoleUi