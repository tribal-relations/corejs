import TurnResult from "./turn-result";
import Turn from "../domain/entity/turn";
import Action from "../domain/entity/action";
import prompt from 'prompt-sync'

const cin = prompt() // initialization

class TurnDecisionManager {

    constructor(
        private _output: Function = console.log,
    ) {
    }

    static decisionToActionNameMap: { [index: string]: string } = {
        'a': Action.lastTurnActionName,
        'b': Action.lastTurnActionName,
        'c': Action.lastTurnActionName,
        'd': Action.lastTurnActionName,
        'e': Action.lastTurnActionName,
        'f': Action.lastTurnActionName,
        'g': Action.lastTurnActionName,
        'h': Action.lastTurnActionName,
        'i': Action.lastTurnActionName,
        'j': Action.lastTurnActionName,
        'k': Action.lastTurnActionName,
        'l': Action.lastTurnActionName,
        'm': Action.lastTurnActionName,
        'n': Action.lastTurnActionName,
        'o': Action.lastTurnActionName,
        'p': Action.lastTurnActionName,
        'q': Action.lastTurnActionName,
        'r': Action.lastTurnActionName,
        's': Action.lastTurnActionName,
        't': Action.lastTurnActionName,
        'u': Action.lastTurnActionName,
        'v': Action.lastTurnActionName,
        'w': Action.lastTurnActionName,
        'x': Action.lastTurnActionName,
        'y': Action.lastTurnActionName,
        'z': Action.lastTurnActionName,
    }

    processTurn(nextTurn: Turn): TurnResult {
        const playerName = nextTurn.player.name

        const decision = this.getDecisionSafe(playerName);

        if (decision.name === Action.lastTurnActionName) {
            return new TurnResult(true, true);
        }

        return new TurnResult(false, true);
    }

    getDecisionSafe(playerName: string): Action {
        let rawDecision: string
        let decision: Action
        for (; ;) {
            try {
                rawDecision = cin(`${playerName} Decision >`) ?? 'q';
                decision = this.getDecision(rawDecision);
                break;
            } catch (error) {
                this._output('incorrect action, try again')
            }
        }
        return decision;
    }

    getDecision(rawDecision: string): Action {
        const actionName = TurnDecisionManager.decisionToActionNameMap[rawDecision[0].toLowerCase()]
        if (actionName) {
            return Action.createFromName(actionName)
        }

        throw new Error('incorrect action, try again');
    }
}

export default TurnDecisionManager