import CurrentGame from '../../../src/app/CurrentGame'
import Player from '../../../src/domain/entity/Player.ts'
import TechnologyName from '../../../src/domain/enum/TechnologyName.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'
import RoundManager from '../../../src/ui/console/RoundManager.ts'
import SpecificDiceThrower from '../../mock/SpecificDiceThrower.ts'

test('Pottery increases crops yield', () => {
    const startFood = 4
    const potteryBonus = 2
    const tribe = TribeFactory.createStarterTribeWithOptions({ population: 10 })

    tribe.researchByName(TechnologyName.Pottery)
    const player = new Player(tribe)
    const currentGame = container.resolveSafely(CurrentGame)
    currentGame.addPlayer(player)
    const roundManager = container.resolveSafely(RoundManager)

    SpecificDiceThrower.target = 1

    const diceResultWithBonus = SpecificDiceThrower.target + potteryBonus
    roundManager.populationGrowth()

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
    const currentGame = container.resolveSafely(CurrentGame)
    currentGame.addPlayer(player)
    const roundManager = container.resolveSafely(RoundManager)

    SpecificDiceThrower.target = 1

    const diceResultWithBonus = SpecificDiceThrower.target + ploughBonus + potteryBonus
    roundManager.populationGrowth()

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
    const currentGame = container.resolveSafely(CurrentGame)
    currentGame.addPlayer(player)
    const roundManager = container.resolveSafely(RoundManager)

    SpecificDiceThrower.target = 1

    const diceResultWithBonus = SpecificDiceThrower.target + SpecificDiceThrower.target + ploughBonus + potteryBonus
    roundManager.populationGrowth()

    expect(tribe.population).toBe(10 + diceResultWithBonus * startFood * calendarMultiplier)
})
