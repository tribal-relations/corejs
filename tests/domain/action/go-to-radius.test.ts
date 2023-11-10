import 'reflect-metadata'
import ActionName from '../../../src/domain/enum/ActionName'
import ActionRepository from '../../../src/domain/repository/ActionRepository'
import TestBootstrapper from '../../test-bootstrapper'

test('can go to 3rd radius from 4th', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    expect(tribe.radius).toStrictEqual(4)

    const action = ActionRepository.createFromName(ActionName.GoTo3rdRadius)
    turnDecisionManager.processTurn(action, turn)

    expect(tribe.radius).toStrictEqual(3)
})

test('cannot go to 2nd radius from 4th', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    expect(tribe.radius).toStrictEqual(4)
    TestBootstrapper.addCulture(tribe)

    const action = ActionRepository.createFromName(ActionName.GoTo2ndRadius)
    const throwingFunction = (): void => {
        turnDecisionManager.processTurn(action, turn)
    }
    const targetRadius = 2
    expect(throwingFunction).toThrow(
        `Tribe '${tribe.name}' has not yet reached radius ${targetRadius + 1} necessary to perform action '${ActionName.GoTo2ndRadius}'.`,
    )
    expect(tribe.radius).toStrictEqual(4)
})

test('cannot go to 1st radius from 4th', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    expect(tribe.radius).toStrictEqual(4)
    TestBootstrapper.addCulture(tribe)

    const action = ActionRepository.createFromName(ActionName.GoTo1stRadius)
    const throwingFunction = (): void => {
        turnDecisionManager.processTurn(action, turn)
    }
    const targetRadius = 1
    expect(throwingFunction).toThrow(
        `Tribe '${tribe.name}' has not yet reached radius ${targetRadius + 1} necessary to perform action '${ActionName.GoTo1stRadius}'.`,
    )
    expect(tribe.radius).toStrictEqual(4)
})

test('can go to 2nd radius from 3rd', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    TestBootstrapper.addCulture(tribe)
    tribe.goToNextRadius()
    expect(tribe.radius).toStrictEqual(3)

    const action = ActionRepository.createFromName(ActionName.GoTo2ndRadius)
    turnDecisionManager.processTurn(action, turn)

    expect(tribe.radius).toStrictEqual(2)
})

test('cannot go to 1st radius from 3rd', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    TestBootstrapper.addCulture(tribe)
    tribe.goToNextRadius()
    expect(tribe.radius).toStrictEqual(3)

    const action = ActionRepository.createFromName(ActionName.GoTo1stRadius)
    const throwingFunction = (): void => {
        turnDecisionManager.processTurn(action, turn)
    }
    const targetRadius = 1
    expect(throwingFunction).toThrow(
        `Tribe '${tribe.name}' has not yet reached radius ${targetRadius + 1} necessary to perform action '${ActionName.GoTo1stRadius}'.`,
    )
    expect(tribe.radius).toStrictEqual(3)
})

test('can go to 1st radius from 2nd', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    TestBootstrapper.addCulture(tribe)
    tribe.goToNextRadius()
    tribe.goToNextRadius()
    expect(tribe.radius).toStrictEqual(2)

    const action = ActionRepository.createFromName(ActionName.GoTo1stRadius)
    turnDecisionManager.processTurn(action, turn)

    expect(tribe.radius).toStrictEqual(1)
})
