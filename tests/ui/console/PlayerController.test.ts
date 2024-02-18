import CurrentGame from '../../../src/app/CurrentGame.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import ConsolePlayerIo from '../../../src/ui/console/io/ConsolePlayerIo.ts'
import Std from '../../../src/ui/console/io/Std.ts'

test('cannot add players with identical name', async () => {
    const playerController = container.resolveSafely(ConsolePlayerIo)
    const currentGame: CurrentGame = container.resolveSafely(CurrentGame)
    const std = container.resolveSafely(Std)

    std.sendIn('artem')
    std.sendIn('artem')
    std.sendIn('gena')
    std.sendIn('vlad')
    std.sendIn('\n')

    playerController.updatePlayers()

    expect(currentGame.playersLength).toBe(3)
})

test('must have at least one player', async () => {
    const playerController = container.resolveSafely(ConsolePlayerIo)
    const std = container.resolveSafely(Std)
    const currentGame: CurrentGame = container.resolveSafely(CurrentGame)

    std.sendIn('\n')
    std.sendIn('\n')
    std.sendIn('\n')
    std.sendIn('name')
    std.sendIn('\n')

    playerController.updatePlayers()

    expect(currentGame.playersLength).toBe(1)
})
