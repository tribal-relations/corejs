import CurrentGame from '../../../src/app/CurrentGame.ts'
import TribeManager from '../../../src/app/TribeManager.ts'
import Player from '../../../src/domain/entity/Player.ts'
import TechnologyName from '../../../src/domain/enum/TechnologyName.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'
import CommonRoundManager from '../../../src/ui/common/CommonRoundManager.ts'
import SpecificDiceThrower from '../../mock/SpecificDiceThrower.ts'

test('Pottery increases crops yield', () => {
    const tribeManager = container.resolveSafely(TribeManager)
    const startFood = 4
    const potteryBonus = 2
    const tribe = TribeFactory.createStarterTribeWithOptions({ population: 10 })

    tribeManager.researchByName(tribe, TechnologyName.Pottery)

    const player = new Player(tribe)
    const currentGame = container.resolveSafely(CurrentGame)
    currentGame.addPlayer(player)
    const roundManager: CommonRoundManager = container.resolveSafely(CommonRoundManager)

    SpecificDiceThrower.target = 1

    const diceResultWithBonus = SpecificDiceThrower.target + potteryBonus
    roundManager.populationGrowth()

    expect(tribe.technologies).toStrictEqual({ Pottery: true })
    expect(tribe.population).toBe(10 + diceResultWithBonus * startFood)
})

test('Plough increases crops yield', () => {
    const tribeManager = container.resolveSafely(TribeManager)

    const startFood = 4
    const calendarMultiplier = 2
    const ploughBonus = 2
    const potteryBonus = 2
    const populationMultiplierLimit = 10
    const startPopulation = 10
    const tribe = TribeFactory.createStarterTribeWithOptions({ population: startPopulation })

    expect(tribe.food).toBe(startFood)

    tribeManager.researchByName(tribe, TechnologyName.Pottery)
    tribeManager.researchByName(tribe, TechnologyName.PrimitiveWriting)
    tribeManager.researchByName(tribe, TechnologyName.Calendar)
    tribeManager.researchByName(tribe, TechnologyName.Plough)
    expect(tribe.food).toBe(startFood * calendarMultiplier)

    const player = new Player(tribe)
    const currentGame = container.resolveSafely(CurrentGame)
    currentGame.addPlayer(player)
    const roundManager: CommonRoundManager = container.resolveSafely(CommonRoundManager)

    SpecificDiceThrower.target = 1

    const diceResultWithBonus = SpecificDiceThrower.target + ploughBonus + potteryBonus
    roundManager.populationGrowth()

    const resultPopulation = Math.min(
        startPopulation * populationMultiplierLimit,
        startPopulation + diceResultWithBonus * startFood * calendarMultiplier)
    expect(tribe.population).toBe(resultPopulation)
})

test('Plough with animal husbandry adds a dice', () => {
    const tribeManager = container.resolveSafely(TribeManager)

    const startFood = 4
    const calendarMultiplier = 2
    const ploughBonus = 2
    const potteryBonus = 2
    const tribe = TribeFactory.createStarterTribeWithOptions({ population: 10 })

    tribeManager.researchByName(tribe, TechnologyName.Pottery)
    tribeManager.researchByName(tribe, TechnologyName.PrimitiveWriting)
    tribeManager.researchByName(tribe, TechnologyName.Calendar)
    tribeManager.researchByName(tribe, TechnologyName.Plough)
    tribeManager.researchByName(tribe, TechnologyName.AnimalHusbandry)
    const player = new Player(tribe)
    const currentGame = container.resolveSafely(CurrentGame)
    currentGame.addPlayer(player)
    const roundManager: CommonRoundManager = container.resolveSafely(CommonRoundManager)

    SpecificDiceThrower.target = 1

    const diceResultWithBonus = SpecificDiceThrower.target + SpecificDiceThrower.target + ploughBonus + potteryBonus
    roundManager.populationGrowth()

    expect(tribe.population).toBe(10 + diceResultWithBonus * startFood * calendarMultiplier)
})
