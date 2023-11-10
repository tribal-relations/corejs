import 'reflect-metadata'
import { container } from 'tsyringe'
import StartGameManager from '../../../src/app/StartGameManager'
import DiceThrower from '../../../src/domain/helper/DiceThrower'
import ConsoleUi from '../../../src/ui/ConsoleUi'
import Std from '../../../src/ui/Std'
import SpecificDiceThrower from '../../mock/SpecificDiceThrower'

test('can add players', async () => {
    const consoleUi = container.resolve(ConsoleUi)
    const startGameManager = container.resolve(StartGameManager)

    consoleUi.game = startGameManager.start()
    const std = container.resolve(Std)
    std.sendIn('artem')
    std.sendIn('rinat')
    std.sendIn('gena')
    std.sendIn('vlad')
    std.sendIn('\n')
    std.sendIn('q')

    const turnResult = consoleUi.startTurns()

    expect(consoleUi.game.players.length).toBe(4)
})

test('population growth', async () => {
    const localContainer = container
        .createChildContainer()
        .register<DiceThrower>(DiceThrower, SpecificDiceThrower)
    SpecificDiceThrower.target = 1

    const defaultPopulation = 2
    const defaultFood = 4 // pasture and forest
    const updatedPopulation = defaultPopulation + defaultFood * SpecificDiceThrower.target
    const consoleUi = localContainer.resolve(ConsoleUi)
    const startGameManager = localContainer.resolve(StartGameManager)

    consoleUi.game = startGameManager.start()
    const std = localContainer.resolve(Std)
    std.sendIn('artem')
    std.sendIn('rinat')
    std.sendIn('gena')
    std.sendIn('vlad')
    std.sendIn('\n')
    std.sendIn('a')
    std.sendIn('a')
    std.sendIn('a')
    std.sendIn('a')
    // round ended, new round

    consoleUi.startTurns()

    expect(consoleUi.game.players.length).toBe(4)
    expect(consoleUi.game.players[0].tribe.total).toBe(updatedPopulation)
    expect(consoleUi.game.players[1].tribe.total).toBe(updatedPopulation)
    expect(consoleUi.game.players[2].tribe.total).toBe(updatedPopulation)
    expect(consoleUi.game.players[3].tribe.total).toBe(updatedPopulation)
})

test('one round consists of one turn per each player', async () => {
    const localContainer = container
        .createChildContainer()
        .register<DiceThrower>(DiceThrower, SpecificDiceThrower)
    SpecificDiceThrower.target = 1

    const consoleUi = localContainer.resolve(ConsoleUi)
    const startGameManager = localContainer.resolve(StartGameManager)

    consoleUi.game = startGameManager.start()
    const std = localContainer.resolve(Std)
    std.sendIn('artem')
    std.sendIn('rinat')
    std.sendIn('gena')
    std.sendIn('vlad')
    std.sendIn('\n')
    std.sendIn('a')
    std.sendIn('a')
    std.sendIn('a')
    std.sendIn('a')
    // round ended, new round

    consoleUi.startTurns()

    expect(consoleUi.game.players.length).toBe(4)
    expect(consoleUi.game.currentRoundNumber).toBe(2)
})

test('q to quit game', async () => {
    const consoleUi = container.resolve(ConsoleUi)
    const startGameManager = container.resolve(StartGameManager)

    consoleUi.game = startGameManager.start()

    const std = container.resolve(Std)
    std.sendIn('player')
    std.sendIn('\n')
    std.sendIn('q')

    const turnResult = consoleUi.startTurns()

    expect(turnResult.isLast).toBe(true)
})

test('exception does not kill the app', async () => {
    const consoleUi = container.resolve(ConsoleUi)
    const startGameManager = container.resolve(StartGameManager)

    consoleUi.game = startGameManager.start()

    const std = container.resolve(Std)
    std.sendIn('player')
    std.sendIn('\n')
    std.sendIn('r') // no parameter will throw
    const turnResult = consoleUi.startTurns()

    expect(turnResult.isLast).toBe(true)
})
