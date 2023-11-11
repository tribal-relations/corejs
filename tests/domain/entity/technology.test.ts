import 'reflect-metadata'
import { container } from 'tsyringe'
import RoundManager from '../../../src/app/RoundManager'
import Game from '../../../src/domain/entity/Game'
import Player from '../../../src/domain/entity/Player'
import TechnologyName from '../../../src/domain/enum/TechnologyName'
import DiceThrower from '../../../src/domain/helper/DiceThrower'
import TribeFactory from '../../../src/outer/factory/TribeFactory'
import SpecificDiceThrower from '../../mock/SpecificDiceThrower'

test('Pottery increases crops yield', () => {
    const startFood = 4
    const potteryBonus = 2
    const tribe = TribeFactory.createStarterTribeWithOptions({ population: 10 })

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
    expect(tribe.population).toBe(10 + diceResultWithBonus * startFood)
})

test('Plough increases crops yield', () => {
    const startFood = 4
    const calendarMultiplier = 2
    const ploughBonus = 2
    const potteryBonus = 2
    const populationMultiplierLimit = 10
    const startPopulation = 10
    const tribe = TribeFactory.createStarterTribeWithOptions({ population: startPopulation })

    expect(tribe.food).toBe(startFood)

    tribe.research(TechnologyName.Pottery)
    tribe.research(TechnologyName.PrimitiveWriting)
    tribe.research(TechnologyName.Calendar)
    tribe.research(TechnologyName.Plough)
    expect(tribe.food).toBe(startFood * calendarMultiplier)

    const player = new Player(tribe)

    const roundManager = container
        .createChildContainer()
        .register<DiceThrower>(DiceThrower, SpecificDiceThrower)
        .resolve(RoundManager)

    SpecificDiceThrower.target = 1
    roundManager.game = new Game([player], '')

    const diceResultWithBonus = SpecificDiceThrower.target + ploughBonus + potteryBonus
    roundManager.finalizeRound()

    const resultPopulation = Math.min(
        startPopulation * populationMultiplierLimit,
        startPopulation + diceResultWithBonus * startFood * calendarMultiplier)
    expect(tribe.population).toBe(resultPopulation)
})

test('Plough with animal husbandry adds a dice', () => {
    const startFood = 4
    const calendarMultiplier = 2
    const ploughBonus = 2
    const potteryBonus = 2
    const tribe = TribeFactory.createStarterTribeWithOptions({ population: 10 })

    tribe.research(TechnologyName.Pottery)
    tribe.research(TechnologyName.PrimitiveWriting)
    tribe.research(TechnologyName.Calendar)
    tribe.research(TechnologyName.Plough)
    tribe.research(TechnologyName.AnimalHusbandry)
    const player = new Player(tribe)

    const roundManager = container
        .createChildContainer()
        .register<DiceThrower>(DiceThrower, SpecificDiceThrower)
        .resolve(RoundManager)

    SpecificDiceThrower.target = 1
    roundManager.game = new Game([player], '')

    const diceResultWithBonus = SpecificDiceThrower.target + SpecificDiceThrower.target + ploughBonus + potteryBonus
    roundManager.finalizeRound()

    expect(tribe.population).toBe(10 + diceResultWithBonus * startFood * calendarMultiplier)
})
