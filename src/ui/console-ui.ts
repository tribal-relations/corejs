import TurnDecisionManager from '../app/turn-decision-manager'
import type TurnResult from '../app/turn-result'
import { singleton } from 'tsyringe'
import TurnManager from '../domain/use_case/turn-manager'
import type Game from '../domain/entity/game'
import Std from './std'
import Action from '../domain/entity/action'

@singleton()
class ConsoleUi {
    _game: Game | undefined
    static decisionToActionNameMap: Record<string, string> = {
        a: Action.arm,
        al: Action.alliance,

        b: Action.quit,
        c: Action.caravan,
        d: Action.quit,
        e: Action.expedition,
        f: Action.quit,

        g3: Action.goTo3rdRadius,
        g2: Action.goTo2ndRadius,
        g1: Action.goTo1stRadius,

        h: Action.hire,
        h1: Action.hireOneRound,

        i: Action.quit,
        j: Action.quit,
        k: Action.quit,
        l: Action.quit,
        m: Action.quit,
        n: Action.quit,
        o: Action.quit,

        p: Action.pray,
        pil: Action.pillage,
        q: Action.quit,
        r: Action.research,

        s: Action.quit,
        t: Action.quit,
        u: Action.quit,
        v: Action.quit,
        w: Action.quit,
        x: Action.quit,
        y: Action.quit,
        z: Action.quit,

        ca: Action.caravan,
        rmca: Action.removeCaravan,

        co: Action.conquer,
        cu: Action.cult,
    }

    get game(): Game {
        if (this._game === undefined) {
            throw new Error('game is not yet created')
        }
        return this._game
    }

    set game(game: Game) {
        this._game = game
    }

    constructor(
        private readonly _turnManager: TurnManager,
        private readonly _turnDecisionManager: TurnDecisionManager,
        private readonly _std: Std,
    ) {
    }

     startTurns(): TurnResult {
        this._turnManager.addPlayers(this.game.players.length)

        let turnResult: TurnResult
        let decision: Action
        let parameters: string

        for (let i = 0; true; ++i) {
            this._std.out(`turn ${i}`)

            const nextTurn = this._turnManager.nextTurn(this.game)

            const playerName = nextTurn.player.name

            const decisionWithParameters = this.getDecisionSafe(playerName)
            decision = decisionWithParameters.decision
            parameters = decisionWithParameters.parameters
            nextTurn.parameters = parameters

            turnResult = this._turnDecisionManager.processTurn(decision, nextTurn)
            this._std.out(turnResult)

            if (turnResult.isLast) {
                this._std.out('last turn')
                return turnResult
            }

            this._std.out('turn finished')
        }
    }

    getDecisionSafe(playerName: string): { decision: Action, parameters: string } {
        let rawDecision: string
        let decision: Action
        let parameters: string

        for (; ;) {
            try {
                rawDecision = this._std.in(`${playerName} Decision >`) ?? 'q'
                decision = this.getDecision(rawDecision)
                parameters = this.getParameter(rawDecision)

                break
            } catch (error) {
                this._std.out('incorrect action, try again', error)
            }
        }
        return { decision, parameters }
    }

    getDecision(rawDecision: string): Action {
        const words = rawDecision.split(' ')
        const actionName = ConsoleUi.decisionToActionNameMap[words[0].toLowerCase()]
        if (actionName) {
            return Action.createFromName(actionName)
        }

        throw new Error('incorrect action, try again')
    }

    private getParameter(rawDecision: string): string {
        const words = rawDecision.split(' ')
        if (words.length > 1) {
            const paramStrings = (words.slice(1)).join(' ')
            return paramStrings
        }
        return ''
    }
}

export default ConsoleUi
