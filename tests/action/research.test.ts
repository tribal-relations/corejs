import 'reflect-metadata'
import Action from '../../src/domain/entity/Action'
import TestBootstrapper from '../test-bootstrapper'

test('research adds technology', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()

    const action = Action.createFromName(Action.research)
    turn.parameters = 'Pottery'
    const turnResult = turnDecisionManager.processTurn(action, turn)

    expect(turnResult.isLast).toBe(false)
    expect(tribe.technologies).toStrictEqual({ Pottery: true })
})

test('cannot research blocked technology', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()

    const techName = 'Advanced Writing'

    const throwingFunction = (): void => {
        const action = Action.createFromName(Action.research)
        turn.parameters = techName
        const turnResult = turnDecisionManager.processTurn(action, turn)

        expect(turnResult.isLast).toBe(false)
        expect(tribe.technologies).toStrictEqual({})
    }
    expect(throwingFunction).toThrow(`${tribe.name} cannot research ${techName}, because not all prerequisites are met`)
})

test('cannot research already known technology', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()

    const techName = 'Pottery'
    tribe.research(techName)
    expect(tribe.technologies).toStrictEqual({ Pottery: true })

    const throwingFunction = (): void => {
        const action = Action.createFromName(Action.research)
        turn.parameters = techName
        const turnResult = turnDecisionManager.processTurn(action, turn)

        expect(turnResult.isLast).toBe(false)
        expect(tribe.technologies).toStrictEqual({ Pottery: true })
    }

    expect(throwingFunction).toThrow(`${tribe.name} cannot research ${techName}, because it is already known`)
})
