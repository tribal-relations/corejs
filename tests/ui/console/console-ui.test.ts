import StartGameManager from '../../../src/app/StartGameManager.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import ConsoleUi from '../../../src/ui/ConsoleUi.ts'
import Std from '../../../src/ui/Std'
import type MockStd from '../../mock/MockStd.ts'
import SpecificDiceThrower from '../../mock/SpecificDiceThrower.ts'

function prepareConsoleUi(localContainer = container): { mockStd: MockStd, consoleUi: ConsoleUi } {
    // this will not work
    // const c = container
    //     .createChildContainer()
    //     .register<Std>(Std, MockStd)
    // const consoleUi = c.resolve(ConsoleUi)

    // I need to build ConsoleUi manually because it contains Std in its constructor
    // otherwise, test fails, because container does not inject the correct Std instance
    // I don't know why
    const startGameManager = localContainer.resolve(StartGameManager)
    // const turnManager = localContainer.resolve(TurnManager)
    // const roundManager = localContainer.resolve(RoundManager)
    // const turnDecisionManager = localContainer.resolve(TurnDecisionManager)
    const mockStd = localContainer.resolve(Std)
    // const consoleCommandPerformer = localContainer.resolve(ConsoleCommandPerformer)
    //
    // const consoleUi = new ConsoleUi(turnManager,
    //     roundManager,
    //     turnDecisionManager,
    //     mockStd,
    //     consoleCommandPerformer,
    // )
    const consoleUi = localContainer.resolve(ConsoleUi)

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
    const { mockStd, consoleUi } = prepareConsoleUi(localContainer)

    SpecificDiceThrower.target = 1

    const defaultPopulation = 2
    const defaultFood = 4 // pasture and forest
    const updatedPopulation = defaultPopulation + defaultFood * SpecificDiceThrower.target
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
