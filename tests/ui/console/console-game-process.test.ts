import 'reflect-metadata'
import { container } from 'tsyringe'
import ConsoleGameProcess from '../../../src/outer/ConsoleGameProcess'
import Std from '../../../src/ui/Std'

test('can quit game immediately after adding a player', () => {
    const gameProcess = container.resolve(ConsoleGameProcess)

    const std = container.resolve(Std)
    std.sendIn('player')
    std.sendIn('\n')
    std.sendIn('q')
    gameProcess.start()

    expect(gameProcess.game.isFinished).toBe(true)
})

test('can have up to 20 players', () => {
    const longString = 'abcdefghijklmnopqrst'
    const names = longString.split('')

    const gameProcess = container.resolve(ConsoleGameProcess)
    const std = container.resolve(Std)

    for (let i = 0; i < names.length; i++) {
        std.sendIn(names[i])
    }
    std.sendIn('q')

    gameProcess.start()

    expect(gameProcess.game.isFinished).toBe(true)
    expect(gameProcess.game.players.length).toBe(20)
})

test('cannot have 21 players', () => {
    const longString = 'abcdefghijklmnopqrstu'
    const names = longString.split('')

    const gameProcess = container.resolve(ConsoleGameProcess)
    const std = container.resolve(Std)

    for (let i = 0; i < names.length; i++) {
        std.sendIn(names[i])
    }
    std.sendIn('q')

    gameProcess.start()

    expect(gameProcess.game.isFinished).toBe(true)
    expect(gameProcess.game.players.length).toBe(20)
})
