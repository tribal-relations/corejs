import 'reflect-metadata'
import { container } from 'tsyringe'
import ConsoleGameProcess from '../../src/app/console-game-process'
import Std from '../../src/ui/std'

test('can quit game immediately', async () => {
    const names = ['artem', 'rinat', 'gena', 'vlad']

    const gameProcess = container.resolve(ConsoleGameProcess)

    const std = container.resolve(Std)
    std.sendIn('q')
    await gameProcess.start(names, 'test')

    expect(gameProcess.game.isFinished).toBe(true)
})
