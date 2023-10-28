import TurnResult from "./turn-result";
import Turn from "../domain/entity/turn";
import Action from "../domain/entity/action";
import {singleton} from "tsyringe";
import Std from "../ui/std";

@singleton()
class TurnDecisionManager {

    constructor(
        private _std: Std,
    ) {
    }

    static decisionToActionNameMap: { [index: string]: string } = {
        'a': Action.armActionName,
        'b': Action.quitActionName,
        'c': Action.caravanActionName,
        'd': Action.quitActionName,
        'e': Action.expeditionActionName,
        'f': Action.quitActionName,
        'g': Action.quitActionName,
        'h': Action.quitActionName,
        'i': Action.quitActionName,
        'j': Action.quitActionName,
        'k': Action.quitActionName,
        'l': Action.quitActionName,
        'm': Action.quitActionName,
        'n': Action.quitActionName,
        'o': Action.quitActionName,
        'p': Action.quitActionName,
        'q': Action.quitActionName,
        'r': Action.quitActionName,
        's': Action.quitActionName,
        't': Action.quitActionName,
        'u': Action.quitActionName,
        'v': Action.quitActionName,
        'w': Action.quitActionName,
        'x': Action.quitActionName,
        'y': Action.quitActionName,
        'z': Action.quitActionName,

        'ca': Action.caravanActionName,
        'rmca': Action.removeCaravanActionName,

        'co': Action.conquerActionName,
        'cu': Action.cultTurnActionName,
    }

    processTurn(nextTurn: Turn): TurnResult {
        const playerName = nextTurn.player.name

        const decision = this.getDecisionSafe(playerName);

        if (decision.name === Action.quitActionName) {
            return new TurnResult(true, true);
        }
        const actionResult = this.performAction(decision.name)

        if (decision.name === Action.conquerActionName && actionResult) {
            return new TurnResult(true, true);
        }

        return new TurnResult(false, true);
    }

    getDecisionSafe(playerName: string): Action {
        let rawDecision: string
        let decision: Action
        for (; ;) {
            try {
                rawDecision = this._std.in(`${playerName} Decision >`) ?? 'q';
                decision = this.getDecision(rawDecision);
                break;
            } catch (error) {
                this._std.out('incorrect action, try again')
            }
        }
        return decision;
    }

    getDecision(rawDecision: string): Action {
        const actionName = TurnDecisionManager.decisionToActionNameMap[rawDecision.toLowerCase()]
        if (actionName) {
            return Action.createFromName(actionName)
        }

        throw new Error('incorrect action, try again');
    }

    private performAction(name: string): boolean {
        return true;
    }
}

export default TurnDecisionManager