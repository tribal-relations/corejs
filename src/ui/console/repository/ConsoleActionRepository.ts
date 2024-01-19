import type GameplayAction from '../../../domain/entity/action/GameplayAction.ts'
import ActionName from '../../../domain/enum/ActionName.ts'
import GameplayActionRepository from '../../../domain/repository/GameplayActionRepository.ts'

class ConsoleActionRepository {
    static decisionToActionDataMap: Record<string, GameplayAction> = {
        a: GameplayActionRepository.createFromName(ActionName.Arm),
        al: GameplayActionRepository.createFromName(ActionName.Alliance),
        atile: GameplayActionRepository.createFromName(ActionName.AttackTile),
        atr: GameplayActionRepository.createFromName(ActionName.AttackTribe),

        c: GameplayActionRepository.createFromName(ActionName.Caravan),
        e: GameplayActionRepository.createFromName(ActionName.Expedition),

        g3: GameplayActionRepository.createFromName(ActionName.GoTo3rdRadius),
        g2: GameplayActionRepository.createFromName(ActionName.GoTo2ndRadius),
        g1: GameplayActionRepository.createFromName(ActionName.GoTo1stRadius),

        h: GameplayActionRepository.createFromName(ActionName.Hire),
        h1: GameplayActionRepository.createFromName(ActionName.HireOneRound),

        pray: GameplayActionRepository.createFromName(ActionName.Pray),
        pil: GameplayActionRepository.createFromName(ActionName.Pillage),

        q: GameplayActionRepository.createFromName(ActionName.Quit),
        r: GameplayActionRepository.createFromName(ActionName.Research),

        rmca: GameplayActionRepository.createFromName(ActionName.RemoveCaravan),

        co: GameplayActionRepository.createFromName(ActionName.Conquer),
        cu: GameplayActionRepository.createFromName(ActionName.Cult),
    }
}

export default ConsoleActionRepository
