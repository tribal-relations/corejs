import ActionPerformer from '../src/app/ActionPerformer'
import TurnDecisionManager from '../src/app/TurnDecisionManager.ts'
import Arm from '../src/domain/action-performer/Arm'
import Conquer from '../src/domain/action-performer/Conquer'
import Cult from '../src/domain/action-performer/Cult'
import Expedition from '../src/domain/action-performer/Expedition'
import GoTo1stRadius from '../src/domain/action-performer/GoTo1stRadius'
import GoTo2ndRadius from '../src/domain/action-performer/GoTo2ndRadius'
import GoTo3rdRadius from '../src/domain/action-performer/GoTo3rdRadius'
import Research from '../src/domain/action-performer/Research'
import { container } from '../src/NaiveDiContainer.ts'

test('can get independent singleton from container', () => {
    const research = container.resolveSafely(Research)

    expect(typeof research).toBe('object')
    expect(research instanceof Research).toBe(true)
})

test('can get singleton with all its dependencies from container', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    expect(typeof turnDecisionManager).toBe('object')
    expect(turnDecisionManager._actionPerformer instanceof ActionPerformer).toBe(true)

    expect(turnDecisionManager._actionPerformer._arm instanceof Arm).toBe(true)
    expect(turnDecisionManager._actionPerformer._research instanceof Research).toBe(true)
    expect(turnDecisionManager._actionPerformer._expedition instanceof Expedition).toBe(true)
    expect(turnDecisionManager._actionPerformer._goTo3rdRadius instanceof GoTo3rdRadius).toBe(true)
    expect(turnDecisionManager._actionPerformer._goTo2ndRadius instanceof GoTo2ndRadius).toBe(true)
    expect(turnDecisionManager._actionPerformer._goTo1stRadius instanceof GoTo1stRadius).toBe(true)
    expect(turnDecisionManager._actionPerformer._conquer instanceof Conquer).toBe(true)
    expect(turnDecisionManager._actionPerformer._cult instanceof Cult).toBe(true)
})
