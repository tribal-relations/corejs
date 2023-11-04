import 'reflect-metadata'
import { container } from 'tsyringe'
import StartGameManager from '../../src/app/StartGameManager'
import ConsoleUi from '../../src/ui/ConsoleUi'
import Std from '../../src/ui/Std'

test('q to quit game', async () => {
    const consoleUi = container.resolve(ConsoleUi)
    const startGameManager = container.resolve(StartGameManager)

    consoleUi.game = startGameManager.start(['artem', 'rinat', 'gena', 'vlad'], '')

    const std = container.resolve(Std)
    std.sendIn('q')
    const turnResult = consoleUi.startTurns()

    expect(turnResult.isLast).toBe(true)
})

test('exception does not kill the app', async () => {
    const consoleUi = container.resolve(ConsoleUi)
    const startGameManager = container.resolve(StartGameManager)

    consoleUi.game = startGameManager.start(['artem', 'rinat', 'gena', 'vlad'], '')

    const std = container.resolve(Std)
    std.sendIn('r') // no parameter will throw
    const turnResult = consoleUi.startTurns()

    expect(turnResult.isLast).toBe(true)
})
