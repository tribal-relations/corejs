import 'reflect-metadata'
import { container, type DependencyContainer } from 'tsyringe'
import RoundManager from '../../../src/app/RoundManager'
import StartGameManager from '../../../src/app/StartGameManager'
import TurnDecisionManager from '../../../src/app/TurnDecisionManager'
import TurnManager from '../../../src/app/TurnManager'
import DiceThrower from '../../../src/domain/helper/DiceThrower'
import ConsoleCommandPerformer from '../../../src/ui/console/ConsoleCommandPerformer'
import ConsoleUi from '../../../src/ui/ConsoleUi'
import MockStd from '../../mock/MockStd'
import SpecificDiceThrower from '../../mock/SpecificDiceThrower'

function prepareConsoleUi(localContainer: DependencyContainer = container): { mockStd: MockStd, consoleUi: ConsoleUi } {
    // this will not work
    // const c = container
    //     .createChildContainer()
    //     .register<Std>(Std, MockStd)
    // const consoleUi = c.resolve(ConsoleUi)

    // I need to build ConsoleUi manually because it contains Std in its constructor
    // otherwise, test fails, because container does not inject the correct Std instance
    // I don't know why
    const startGameManager = localContainer.resolve(StartGameManager)
    const turnManager = localContainer.resolve(TurnManager)
    const roundManager = localContainer.resolve(RoundManager)
    const turnDecisionManager = localContainer.resolve(TurnDecisionManager)
    const mockStd = localContainer.resolve(MockStd)
    const consoleCommandPerformer = localContainer.resolve(ConsoleCommandPerformer)

    const consoleUi = new ConsoleUi(turnManager,
        roundManager,
        turnDecisionManager,
        mockStd,
        consoleCommandPerformer,
    )

    consoleUi.game = startGameManager.start()
    return { mockStd, consoleUi }
}

test('can add players', async () => {
    const { mockStd, consoleUi } = prepareConsoleUi()
    mockStd.sendIn('artem')
    mockStd.sendIn('rinat')
    mockStd.sendIn('gena')
    mockStd.sendIn('vlad')
    mockStd.sendIn('\n')
    mockStd.sendIn('q')

    const turnResult = consoleUi.startTurns()

    expect(consoleUi.game.players.length).toBe(4)
})

test('population growth', async () => {
    const localContainer = container
        .createChildContainer()
        .register<DiceThrower>(DiceThrower, SpecificDiceThrower)
    const { mockStd, consoleUi } = prepareConsoleUi(localContainer)

    SpecificDiceThrower.target = 1

    const defaultPopulation = 2
    const defaultFood = 4 // pasture and forest
    const updatedPopulation = defaultPopulation + defaultFood * SpecificDiceThrower.target
    const startGameManager = localContainer.resolve(StartGameManager)

    consoleUi.game = startGameManager.start()
    mockStd.sendIn('artem')
    mockStd.sendIn('rinat')
    mockStd.sendIn('gena')
    mockStd.sendIn('vlad')
    mockStd.sendIn('\n')
    mockStd.sendIn('a')
    mockStd.sendIn('a')
    mockStd.sendIn('a')
    mockStd.sendIn('a')
    // round ended, new round

    consoleUi.startTurns()

    expect(consoleUi.game.players.length).toBe(4)
    expect(consoleUi.game.players[0].tribe.population).toBe(updatedPopulation)
    expect(consoleUi.game.players[1].tribe.population).toBe(updatedPopulation)
    expect(consoleUi.game.players[2].tribe.population).toBe(updatedPopulation)
    expect(consoleUi.game.players[3].tribe.population).toBe(updatedPopulation)
})

test('one round consists of one turn per each player', async () => {
    const localContainer = container
        .createChildContainer()
        .register<DiceThrower>(DiceThrower, SpecificDiceThrower)
    const { mockStd, consoleUi } = prepareConsoleUi(localContainer)

    SpecificDiceThrower.target = 1

    const startGameManager = localContainer.resolve(StartGameManager)

    consoleUi.game = startGameManager.start()
    mockStd.sendIn('artem')
    mockStd.sendIn('rinat')
    mockStd.sendIn('gena')
    mockStd.sendIn('vlad')
    mockStd.sendIn('\n')
    mockStd.sendIn('a')
    mockStd.sendIn('a')
    mockStd.sendIn('a')
    mockStd.sendIn('a')
    // round ended, new round

    consoleUi.startTurns()

    expect(consoleUi.game.players.length).toBe(4)
    expect(consoleUi.game.currentRoundNumber).toBe(2)
})

test('q to quit game', async () => {
    const { mockStd, consoleUi } = prepareConsoleUi()

    mockStd.sendIn('player')
    mockStd.sendIn('\n')
    mockStd.sendIn('q')

    const turnResult = consoleUi.startTurns()

    expect(turnResult.isLast).toBe(true)
})

test('exception does not kill the app', async () => {
    const { mockStd, consoleUi } = prepareConsoleUi()

    mockStd.sendIn('player')
    mockStd.sendIn('\n')
    mockStd.sendIn('r') // no parameter will throw
    const turnResult = consoleUi.startTurns()

    expect(turnResult.isLast).toBe(true)
})
