import BaseRepository from './BaseRepository.ts'
import WinningCondition from '../entity/static/WinningCondition.ts'
import WinningConditionName from '../enum/WinningConditionName.ts'

class WinningConditionRepository extends BaseRepository<WinningCondition> {
    private static readonly nameToTextMap: Record<WinningConditionName, string> = {
        [WinningConditionName.Military]: 'Your tribe has successfully conquered a state. You have succeeded in building a powerful army that is afraid of no one.',
        [WinningConditionName.Culture]: 'Your tribe has successfully been idolized by a state. It will be remembered not as barbaric, but as heroic.',
        [WinningConditionName.Economy]: 'Your tribe has successfully subjugated a state. It now prospers, not knowing it is You, who controls it behind the curtains.',
        [WinningConditionName.Points]: 'Although nobody conquered rome, your tribe has come closest.',
    }

    protected readonly instances: Record<WinningConditionName, WinningCondition> = {
        [WinningConditionName.Military]: WinningConditionRepository.createInstanceFromName(WinningConditionName.Military),
        [WinningConditionName.Culture]: WinningConditionRepository.createInstanceFromName(WinningConditionName.Culture),
        [WinningConditionName.Economy]: WinningConditionRepository.createInstanceFromName(WinningConditionName.Economy),
        [WinningConditionName.Points]: WinningConditionRepository.createInstanceFromName(WinningConditionName.Points),
    }

    private static createInstanceFromName(name: WinningConditionName): WinningCondition {
        const text = WinningConditionRepository.nameToTextMap[name]
        return new WinningCondition(name, text)
    }
}

export default WinningConditionRepository
