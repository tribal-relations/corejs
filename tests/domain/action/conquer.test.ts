import 'reflect-metadata'
import ActionRepository from '../../../src/app/repository/ActionRepository'
import Rome from '../../../src/domain/entity/Rome'
import ActionName from '../../../src/domain/enum/ActionName'
import TestBootstrapper from '../../test-bootstrapper'

test('can conquer', () => {
    Rome.defaultCombatReadiness = 1
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    TestBootstrapper.addCulture(tribe)

    tribe.goToNextRadius()
    tribe.goToNextRadius()
    tribe.goToNextRadius()
    tribe.grow(10)
    tribe.arm(10)

    const action = ActionRepository.createFromName(ActionName.Conquer)
    const turnResult = turnDecisionManager.processTurn(action, turn)

    expect(turnResult.isLast).toBe(true)
    expect(tribe.isWinner).toStrictEqual(true)
})
