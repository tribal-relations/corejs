import 'reflect-metadata'
import Rome from '../../../src/domain/entity/Rome'
import ActionName from '../../../src/domain/enum/ActionName'
import ActionRepository from '../../../src/domain/repository/ActionRepository'
import TestBootstrapper from '../../test-bootstrapper'

test('can conquer', () => {
    Rome.defaultCombatReadiness = 1
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    TestBootstrapper.addCulture(tribe)
    TestBootstrapper.addProduction(tribe)

    tribe.goToNextRadius()
    tribe.goToNextRadius()
    tribe.goToNextRadius()
    tribe.grow(10)
    tribe.arm()

    const action = ActionRepository.createFromName(ActionName.Conquer)
    const turnResult = turnDecisionManager.processTurn(action, turn)

    expect(turnResult.isLast).toBe(true)
    expect(tribe.isWinner).toStrictEqual(true)
})
