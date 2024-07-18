import { expect, test } from 'vitest'
import Arm from '../src/app/action-performer/Arm.ts'
import Conquer from '../src/app/action-performer/Conquer.ts'
import Cult from '../src/app/action-performer/Cult.ts'
import Expedition from '../src/app/action-performer/Expedition.ts'
import GoTo1stRadius from '../src/app/action-performer/GoTo1stRadius.ts'
import GoTo2ndRadius from '../src/app/action-performer/GoTo2ndRadius.ts'
import GoTo3rdRadius from '../src/app/action-performer/GoTo3rdRadius.ts'
import Research from '../src/app/action-performer/Research.ts'
import ActionPerformer from '../src/app/ActionPerformer.ts'
import TurnDecisionManager from '../src/app/TurnDecisionManager.ts'
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
