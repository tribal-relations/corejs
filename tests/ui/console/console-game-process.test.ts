import 'reflect-metadata'
import { container } from 'tsyringe'
import ConsoleGameProcess from '../../../src/outer/ConsoleGameProcess'
import Std from '../../../src/ui/Std'

test('can quit game immediately', () => {
    const names = ['artem', 'rinat', 'gena', 'vlad']

    const gameProcess = container.resolve(ConsoleGameProcess)

    const std = container.resolve(Std)
    std.sendIn('q')
    gameProcess.start(names, 'test')

    expect(gameProcess.game.isFinished).toBe(true)
})

test('can have up to 20 players', () => {
    const longString = 'abcdefghijklmnopqrst'
    const names = longString.split('')

    const gameProcess = container.resolve(ConsoleGameProcess)

    gameProcess.start(names, 'test')

    expect(gameProcess.game.isFinished).toBe(true)
})

test('cannot have 21 players', () => {
    const longString = 'abcdefghijklmnopqrstu'
    const names = longString.split('')

    const gameProcess = container.resolve(ConsoleGameProcess)

    const throwingFunction = (): void => {
        gameProcess.start(names, 'test')

        expect(gameProcess.game.isFinished).toBe(true)
    }
    expect(throwingFunction).toThrow('Maximum number of players allowed is 20.')
})
