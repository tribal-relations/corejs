import StartGameManager from '../../../src/app/StartGameManager.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import ConsolePlayerController from '../../../src/ui/console/ConsolePlayerController'
import Std from '../../../src/ui/console/Std'

test('cannot add players with identical name', async () => {
    const playerController = container.resolveSafely(ConsolePlayerController)
    const startGameManager = container.resolveSafely(StartGameManager)
    playerController.game = startGameManager.start()
    const std = container.resolveSafely(Std)

    std.sendIn('artem')
    std.sendIn('artem')
    std.sendIn('gena')
    std.sendIn('vlad')
    std.sendIn('\n')

    playerController.updatePlayers()

    expect(playerController.game.playersLength).toBe(3)
})

test('must have at least one player', async () => {
    const playerController = container.resolveSafely(ConsolePlayerController)
    const startGameManager = container.resolveSafely(StartGameManager)
    playerController.game = startGameManager.start()
    const std = container.resolveSafely(Std)

    std.sendIn('\n')
    std.sendIn('\n')
    std.sendIn('\n')
    std.sendIn('name')
    std.sendIn('\n')

    playerController.updatePlayers()

    expect(playerController.game.playersLength).toBe(1)
})
