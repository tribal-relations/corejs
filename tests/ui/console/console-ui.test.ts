import StartGameManager from '../../../src/app/StartGameManager.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import ConsoleUi from '../../../src/ui/console/ConsoleUi.ts'
import SpecificDiceThrower from '../../mock/SpecificDiceThrower'

function prepareConsoleUi(): ConsoleUi {
    const startGameManager = container.resolveSafely(StartGameManager)
    const consoleUi: ConsoleUi = container.resolveSafely(ConsoleUi)
    consoleUi.game = startGameManager.start()
    return consoleUi
}

test('temp', async () => {
    expect(1).toBe(1)
})

test('can add players', async () => {
    // const consoleUi = prepareConsoleUi()
    const startGameManager = container.resolveSafely(StartGameManager)
    const consoleUi = container.resolveSafely(ConsoleUi)
    consoleUi.game = startGameManager.start()

    consoleUi.std.sendIn('artem')
    consoleUi.std.sendIn('rinat')
    consoleUi.std.sendIn('gena')
    consoleUi.std.sendIn('vlad')
    consoleUi.std.sendIn('\n')
    consoleUi.std.sendIn('q')

    consoleUi.startTurns()

    expect(consoleUi.game.players.length).toBe(4)
})

test('population growth', async () => {
    const consoleUi = prepareConsoleUi()

    SpecificDiceThrower.target = 1

    const defaultPopulation = 2
    const defaultFood = 4 // pasture and forest
    const updatedPopulation = defaultPopulation + defaultFood * SpecificDiceThrower.target
    consoleUi.std.sendIn('artem')
    consoleUi.std.sendIn('rinat')
    consoleUi.std.sendIn('gena')
    consoleUi.std.sendIn('vlad')
    consoleUi.std.sendIn('\n')
    consoleUi.std.sendIn('a')
    consoleUi.std.sendIn('a')
    consoleUi.std.sendIn('a')
    consoleUi.std.sendIn('a')
    // round ended, new round

    consoleUi.startTurns()

    expect(consoleUi.game.players.length).toBe(4)
    expect(consoleUi.game.players[0].tribe.population).toBe(updatedPopulation)
    expect(consoleUi.game.players[1].tribe.population).toBe(updatedPopulation)
    expect(consoleUi.game.players[2].tribe.population).toBe(updatedPopulation)
    expect(consoleUi.game.players[3].tribe.population).toBe(updatedPopulation)
})

test('one round consists of one turn per each player', async () => {
    const consoleUi = prepareConsoleUi()

    SpecificDiceThrower.target = 1

    const startGameManager: StartGameManager = container.resolveSafely(StartGameManager)

    consoleUi.game = startGameManager.start()
    consoleUi.std.sendIn('artem')
    consoleUi.std.sendIn('rinat')
    consoleUi.std.sendIn('gena')
    consoleUi.std.sendIn('vlad')
    consoleUi.std.sendIn('\n')
    consoleUi.std.sendIn('a')
    consoleUi.std.sendIn('a')
    consoleUi.std.sendIn('a')
    consoleUi.std.sendIn('a')
    // round ended, new round

    consoleUi.startTurns()

    expect(consoleUi.game.players.length).toBe(4)
    expect(consoleUi.game.currentRoundNumber).toBe(2)
})

test('q to quit game', async () => {
    const consoleUi = prepareConsoleUi()

    consoleUi.std.sendIn('player')
    consoleUi.std.sendIn('\n')
    consoleUi.std.sendIn('q')

    const turnResult = consoleUi.startTurns()

    expect(turnResult.isLast).toBe(true)
})

test('exception does not kill the app', async () => {
    const consoleUi = prepareConsoleUi()

    consoleUi.std.sendIn('player')
    consoleUi.std.sendIn('\n')
    consoleUi.std.sendIn('r') // no parameter will throw
    const turnResult = consoleUi.startTurns()

    expect(turnResult.isLast).toBe(true)
})
