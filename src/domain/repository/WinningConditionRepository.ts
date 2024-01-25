import WinningCondition from '../entity/WinningCondition.ts'
import WinningConditionName from '../enum/WinningConditionName.ts'

class WinningConditionRepository {
    static nameToTextMap: Record<WinningConditionName, string> = {
        [WinningConditionName.Military]: 'Your tribe has successfully conquered a state. You have succeeded in building a powerful army that is afraid of no one.',
        [WinningConditionName.Culture]: 'Your tribe has successfully been idolized by a state. It will be remembered not as barbaric, but as heroic.',
        [WinningConditionName.Economy]: 'Your tribe has successfully subjugated a state. It now prospers, not knowing it is You, who controls it behind the curtains.',
        [WinningConditionName.Points]: 'Although nobody conquered rome, your tribe has come closest.',
    }

    constructor(
        private readonly _name: string,
        private readonly _winningText: string,
    ) {
    }

    public static createFromName(name: WinningConditionName): WinningCondition {
        const text = WinningConditionRepository.nameToTextMap[name]
        return new WinningCondition(name, text)
    }
}

export default WinningConditionRepository
