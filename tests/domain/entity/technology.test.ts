import RoundManager from '../../../src/app/RoundManager.ts'
import Game from '../../../src/domain/entity/Game.ts'
import Player from '../../../src/domain/entity/Player.ts'
import TechnologyName from '../../../src/domain/enum/TechnologyName.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'
import SpecificDiceThrower from '../../mock/SpecificDiceThrower.ts'

test('Pottery increases crops yield', () => {
    const startFood = 4
    const potteryBonus = 2
    const tribe = TribeFactory.createStarterTribeWithOptions({ population: 10 })

    tribe.researchByName(TechnologyName.Pottery)
    const player = new Player(tribe)

    const roundManager = container.resolve(RoundManager)

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

    tribe.researchByName(TechnologyName.Pottery)
    tribe.researchByName(TechnologyName.PrimitiveWriting)
    tribe.researchByName(TechnologyName.Calendar)
    tribe.researchByName(TechnologyName.Plough)
    expect(tribe.food).toBe(startFood * calendarMultiplier)

    const player = new Player(tribe)
    const roundManager = container.resolve(RoundManager)

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

    tribe.researchByName(TechnologyName.Pottery)
    tribe.researchByName(TechnologyName.PrimitiveWriting)
    tribe.researchByName(TechnologyName.Calendar)
    tribe.researchByName(TechnologyName.Plough)
    tribe.researchByName(TechnologyName.AnimalHusbandry)
    const player = new Player(tribe)
    const roundManager = container.resolve(RoundManager)

    SpecificDiceThrower.target = 1
    roundManager.game = new Game([player], '')

    const diceResultWithBonus = SpecificDiceThrower.target + SpecificDiceThrower.target + ploughBonus + potteryBonus
    roundManager.finalizeRound()

    expect(tribe.population).toBe(10 + diceResultWithBonus * startFood * calendarMultiplier)
})
