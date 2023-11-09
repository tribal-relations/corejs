import 'reflect-metadata'
import { container } from 'tsyringe'
import RoundManager from '../../../src/app/RoundManager'
import Game from '../../../src/domain/entity/Game'
import Player from '../../../src/domain/entity/Player'
import Population from '../../../src/domain/entity/Population'
import Territory from '../../../src/domain/entity/Territory'
import TechnologyName from '../../../src/domain/enum/TechnologyName'
import DiceThrower from '../../../src/domain/helper/DiceThrower'
import SpecificDiceThrower from '../../../src/domain/helper/SpecificDiceThrower'
import TestBootstrapper from '../../test-bootstrapper'

test('Pottery increases crops yield', () => {
    const startFood = 1
    const potteryBonus = 2
    const tribe = TestBootstrapper.createStarterTribe(
        '',
        new Population(10),
        new Territory(startFood, 0, 0, 0),
    )
    tribe.research(TechnologyName.Pottery)
    const player = new Player(tribe)

    const roundManager = container
        .createChildContainer()
        .register<DiceThrower>(DiceThrower, SpecificDiceThrower)
        .resolve(RoundManager)

    SpecificDiceThrower.target = 1
    roundManager.game = new Game([player], '')

    const diceResultWithBonus = SpecificDiceThrower.target + potteryBonus
    roundManager.finalizeRound()

    expect(tribe.technologies).toStrictEqual({ Pottery: true })
    expect(tribe.population.total).toBe(10 + diceResultWithBonus * startFood)
})

test('Plough increases crops yield', () => {
    const startFood = 1
    const ploughBonus = 2
    const tribe = TestBootstrapper.createStarterTribe(
        '',
        new Population(10),
        new Territory(startFood, 0, 0, 0),
    )
    tribe.research(TechnologyName.Plough)
    const player = new Player(tribe)

    const roundManager = container
        .createChildContainer()
        .register<DiceThrower>(DiceThrower, SpecificDiceThrower)
        .resolve(RoundManager)

    SpecificDiceThrower.target = 1
    roundManager.game = new Game([player], '')

    const diceResultWithBonus = SpecificDiceThrower.target + ploughBonus
    roundManager.finalizeRound()

    expect(tribe.population.total).toBe(10 + diceResultWithBonus * startFood)
})

test('Plough with animal husbandry adds a dice', () => {
    const startFood = 1
    const ploughBonus = 2
    const tribe = TestBootstrapper.createStarterTribe(
        '',
        new Population(10),
        new Territory(startFood, 0, 0, 0),
    )
    tribe.research(TechnologyName.Plough)
    tribe.research(TechnologyName.AnimalHusbandry)
    const player = new Player(tribe)

    const roundManager = container
        .createChildContainer()
        .register<DiceThrower>(DiceThrower, SpecificDiceThrower)
        .resolve(RoundManager)

    SpecificDiceThrower.target = 1
    roundManager.game = new Game([player], '')

    const diceResultWithBonus = SpecificDiceThrower.target + SpecificDiceThrower.target + ploughBonus
    roundManager.finalizeRound()

    expect(tribe.population.total).toBe(10 + diceResultWithBonus * startFood)
})
