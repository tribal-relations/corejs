import RelationsManager from '../../../src/app/RelationsManager'
import StartGameManager from '../../../src/app/StartGameManager.ts'
import RelationName from '../../../src/domain/enum/RelationName'
import { container } from '../../../src/NaiveDiContainer.ts'
import ConsoleUi from '../../../src/ui/console/ConsoleUi.ts'
import Std from '../../../src/ui/console/Std'
import SpecificDiceThrower from '../../mock/SpecificDiceThrower'

function prepareConsoleUi(): ConsoleUi {
    const startGameManager = container.resolveSafely(StartGameManager)
    const consoleUi: ConsoleUi = container.resolveSafely(ConsoleUi)
    consoleUi.game = startGameManager.start()
    return consoleUi
}

test('can add players', async () => {
    // const consoleUi = prepareConsoleUi()
    const startGameManager = container.resolveSafely(StartGameManager)
    const consoleUi = container.resolveSafely(ConsoleUi)
    consoleUi.game = startGameManager.start()
    const std = container.resolveSafely(Std)

    std.sendIn('artem')
    std.sendIn('rinat')
    std.sendIn('gena')
    std.sendIn('vlad')
    std.sendIn('\n')
    std.sendIn('q')

    consoleUi.startTurns()

    expect(consoleUi.game.playersLength).toBe(4)
})

test('population growth', async () => {
    const consoleUi = prepareConsoleUi()

    SpecificDiceThrower.target = 1
    const std = container.resolveSafely(Std)

    const defaultPopulation = 2
    const defaultFood = 4 // pasture and forest
    const updatedPopulation = defaultPopulation + defaultFood * SpecificDiceThrower.target
    std.sendIn('artem')
    std.sendIn('rinat')
    std.sendIn('gena')
    std.sendIn('vlad')
    std.sendIn('\n')
    std.sendIn('a')
    std.sendIn('a')
    std.sendIn('a')
    std.sendIn('a')
    std.sendIn('e e e')
    std.sendIn('e e e')
    std.sendIn('e e e')
    std.sendIn('e e e')
    // round ended, new round

    consoleUi.startTurns()

    expect(consoleUi.game.playersLength).toBe(4)
    expect(consoleUi.game.players.artem.tribe.population).toBe(updatedPopulation)
    expect(consoleUi.game.players.rinat.tribe.population).toBe(updatedPopulation)
    expect(consoleUi.game.players.gena.tribe.population).toBe(updatedPopulation)
    expect(consoleUi.game.players.vlad.tribe.population).toBe(updatedPopulation)
})

test('one round consists of one turn per each player', async () => {
    const consoleUi = prepareConsoleUi()

    SpecificDiceThrower.target = 1
    const std = container.resolveSafely(Std)

    const startGameManager: StartGameManager = container.resolveSafely(StartGameManager)

    consoleUi.game = startGameManager.start()
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

    expect(consoleUi.game.playersLength).toBe(4)
    expect(consoleUi.game.currentRoundNumber).toBe(2)
})

test('relations round after regular round', async () => {
    const consoleUi = prepareConsoleUi()

    SpecificDiceThrower.target = 1
    const std = container.resolveSafely(Std)
    const startGameManager: StartGameManager = container.resolveSafely(StartGameManager)
    const relationsManager: RelationsManager = container.resolveSafely(RelationsManager)

    consoleUi.game = startGameManager.start()
    std.sendIn('artem')
    std.sendIn('rinat')
    std.sendIn('gena')
    std.sendIn('vlad')
    std.sendIn('\n') // finish adding players
    std.sendIn('a')
    std.sendIn('a')
    std.sendIn('a')
    std.sendIn('a')
    // round ended, relations round
    std.sendIn('ba ba ba')
    std.sendIn('ba ba ba')
    std.sendIn('ba ba ba')
    std.sendIn('ba ba ba')

    consoleUi.startTurns()

    expect(consoleUi.game.playersLength).toBe(4)
    expect(consoleUi.game.currentRoundNumber).toBe(2)

    expect(relationsManager.howThisTribeReactsToOthers(consoleUi.game.players.artem.tribe.name)).toStrictEqual({
        [consoleUi.game.players.rinat.tribe.name]: RelationName.Barbarians,
        [consoleUi.game.players.gena.tribe.name]: RelationName.Barbarians,
        [consoleUi.game.players.vlad.tribe.name]: RelationName.Barbarians,
    })
    expect(relationsManager.howThisTribeReactsToOthers(consoleUi.game.players.rinat.tribe.name)).toStrictEqual({
        [consoleUi.game.players.artem.tribe.name]: RelationName.Barbarians,
        [consoleUi.game.players.gena.tribe.name]: RelationName.Barbarians,
        [consoleUi.game.players.vlad.tribe.name]: RelationName.Barbarians,
    })
    expect(relationsManager.howThisTribeReactsToOthers(consoleUi.game.players.gena.tribe.name)).toStrictEqual({
        [consoleUi.game.players.artem.tribe.name]: RelationName.Barbarians,
        [consoleUi.game.players.rinat.tribe.name]: RelationName.Barbarians,
        [consoleUi.game.players.vlad.tribe.name]: RelationName.Barbarians,
    })
    expect(relationsManager.howThisTribeReactsToOthers(consoleUi.game.players.vlad.tribe.name)).toStrictEqual({
        [consoleUi.game.players.artem.tribe.name]: RelationName.Barbarians,
        [consoleUi.game.players.rinat.tribe.name]: RelationName.Barbarians,
        [consoleUi.game.players.gena.tribe.name]: RelationName.Barbarians,
    })
})

test('q to quit game', async () => {
    const consoleUi = prepareConsoleUi()
    const std = container.resolveSafely(Std)

    std.sendIn('player')
    std.sendIn('\n')
    std.sendIn('q')

    const turnResult = consoleUi.startTurns()

    expect(turnResult.isLast).toBe(true)
})

test('incorrect action does not kill the app and you continue', async () => {
    const consoleUi = prepareConsoleUi()
    const std = container.resolveSafely(Std)

    std.sendIn('player')
    std.sendIn('\n')
    std.sendIn('r') // no parameter will throw internally, but we'll catch it and ask the player once more
    std.sendIn('a') // second try

    consoleUi.startTurns()

    expect(consoleUi.game.currentRoundNumber).toBe(2) // because first round finished
    expect(consoleUi.game.currentTurnNumber).toBe(2) // because we quit after the counter increments (when generation Turn instance for the next player)
})
