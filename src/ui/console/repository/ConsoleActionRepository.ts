import type GameplayAction from '../../../domain/entity/action/GameplayAction.ts'
import ActionName from '../../../domain/enum/ActionName.ts'
import GameplayActionRepository from '../../../domain/repository/GameplayActionRepository.ts'

class ConsoleActionRepository {
    static decisionToActionDataMap: Record<string, GameplayAction> = {
        a: GameplayActionRepository.get(ActionName.Arm),
        al: GameplayActionRepository.get(ActionName.Alliance),
        atile: GameplayActionRepository.get(ActionName.AttackTile),
        atr: GameplayActionRepository.get(ActionName.AttackTribe),

        c: GameplayActionRepository.get(ActionName.Caravan),
        e: GameplayActionRepository.get(ActionName.Expedition),

        g3: GameplayActionRepository.get(ActionName.GoTo3rdRadius),
        g2: GameplayActionRepository.get(ActionName.GoTo2ndRadius),
        g1: GameplayActionRepository.get(ActionName.GoTo1stRadius),

        h: GameplayActionRepository.get(ActionName.Hire),
        h1: GameplayActionRepository.get(ActionName.HireOneRound),

        pray: GameplayActionRepository.get(ActionName.Pray),
        pil: GameplayActionRepository.get(ActionName.Pillage),

        q: GameplayActionRepository.get(ActionName.Quit),
        r: GameplayActionRepository.get(ActionName.Research),

        rmca: GameplayActionRepository.get(ActionName.RemoveCaravan),

        co: GameplayActionRepository.get(ActionName.Conquer),
        cu: GameplayActionRepository.get(ActionName.Cult),
    }
}

export default ConsoleActionRepository
