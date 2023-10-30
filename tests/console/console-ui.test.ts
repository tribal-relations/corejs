import 'reflect-metadata'
import { container } from 'tsyringe'
import Std from '../../src/ui/std'
import ConsoleUi from '../../src/ui/console-ui'
import StartGameManager from '../../src/domain/use_case/start-game-manager'

test('q to quit game', async () => {
    const consoleUi = container.resolve(ConsoleUi)
    const startGameManager = container.resolve(StartGameManager)

    consoleUi.game = startGameManager.start(['artem', 'rinat', 'gena', 'vlad'], '')

    const std = container.resolve(Std)
    std.sendIn('q')
    const turnResult = consoleUi.startTurns()

    expect(turnResult.isLast).toBe(true)
})
