import 'reflect-metadata'
import { container } from 'tsyringe'
import ConsoleGameProcess from '../../src/outer/ConsoleGameProcess'
import Std from '../../src/ui/Std'

test('can quit game immediately', () => {
    const names = ['artem', 'rinat', 'gena', 'vlad']

    const gameProcess = container.resolve(ConsoleGameProcess)

    const std = container.resolve(Std)
    std.sendIn('q')
    gameProcess.start(names, 'test')

    expect(gameProcess.game.isFinished).toBe(true)
})
