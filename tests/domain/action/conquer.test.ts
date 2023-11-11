import 'reflect-metadata'
import { container } from 'tsyringe'
import TurnDecisionManager from '../../../src/app/TurnDecisionManager'
import Player from '../../../src/domain/entity/Player'
import Rome from '../../../src/domain/entity/Rome'
import Tribe from '../../../src/domain/entity/Tribe'
import Turn from '../../../src/domain/entity/Turn'
import ActionName from '../../../src/domain/enum/ActionName'
import ActionRepository from '../../../src/domain/repository/ActionRepository'
import TribeFactory from '../../../src/outer/factory/TribeFactory'
import TestBootstrapper from '../../test-bootstrapper'

test('can conquer', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)
    const starterFood = 4

    const tribe = TribeFactory.createStarterTribe()
    expect(tribe.total).toStrictEqual(Tribe.defaultTotal)
    expect(tribe.food).toStrictEqual(starterFood)

    const player = new Player(tribe)
    const turn = new Turn(player)

    TestBootstrapper.addCulture(tribe, 10)
    tribe.goToNextRadius()
    tribe.goToNextRadius()
    tribe.goToNextRadius()

    TestBootstrapper.addProduction(tribe, 1000)
    tribe.growPopulation(500)
    tribe.growPopulation(500)
    tribe.growPopulation(500)
    tribe.growPopulation(500)
    tribe.arm()

    const rome = container.resolve(Rome)
    expect(rome.combatReadiness).toStrictEqual(Rome.defaultCombatReadiness)

    expect(tribe.combatReadiness).toBeGreaterThan(rome.combatReadiness)

    const action = ActionRepository.createFromName(ActionName.Conquer)
    const turnResult = turnDecisionManager.processTurn(action, turn)

    expect(turnResult.isLast).toBe(true)
    expect(tribe.isWinner).toStrictEqual(true)
})
