import type GameplayAction from '../../../domain/entity/action/GameplayAction.ts'
import ActionName from '../../../domain/enum/ActionName.ts'
import type GameplayActionRepository from '../../../domain/repository/GameplayActionRepository.ts'
import InvalidInput from '../../../exception/console/InvalidInput.ts'

class ConsoleActionRepository {
    public static decisionToActionNameMap: Record<string, ActionName> = {
        a: (ActionName.Arm),
        al: (ActionName.Alliance),
        atile: (ActionName.AttackTile),
        atr: (ActionName.AttackTribe),

        c: (ActionName.Caravan),
        e: (ActionName.Expedition),

        g3: (ActionName.GoTo3rdRadius),
        g2: (ActionName.GoTo2ndRadius),
        g1: (ActionName.GoTo1stRadius),

        h: (ActionName.Hire),
        h1: (ActionName.HireOneRound),

        pray: (ActionName.Pray),
        pil: (ActionName.Pillage),

        q: (ActionName.Quit),
        r: (ActionName.Research),

        rmca: (ActionName.RemoveCaravan),

        co: (ActionName.Conquer),
        cu: (ActionName.Cult),
    }

    public constructor(
        private readonly _gameplayActionRepository: GameplayActionRepository,
    ) {

    }

    public getGameplayAction(cliParam: string): GameplayAction {
        if (cliParam in ConsoleActionRepository.decisionToActionNameMap) {
            return this._gameplayActionRepository.get(
                ConsoleActionRepository.decisionToActionNameMap[cliParam],
            )
        }
        throw new InvalidInput(`command ${cliParam} is unknown`)
    }
}

export default ConsoleActionRepository
