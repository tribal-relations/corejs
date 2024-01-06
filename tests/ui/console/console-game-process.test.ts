import { container } from '../../../src/NaiveDiContainer.ts'
import ConsoleGameProcess from '../../../src/outer/ConsoleGameProcess'
import Std from '../../../src/ui/console/Std'

test('temp', async () => {
    expect(1).toBe(1)
})

test('can quit game immediately after adding a player', () => {
    const gameProcess = container.resolveSafely(ConsoleGameProcess)

    const std = container.resolveSafely(Std)

    expect(1).toBe(1)
    std.sendIn('s')
    std.sendIn('player')
    std.sendIn('\n')
    std.sendIn('q')
    gameProcess.start()

    expect(gameProcess.game.isFinished).toBe(true)
})

test('can have up to 20 players', () => {
    return
    const longString = 'abcdefghijklmnopqrst'
    const names = longString.split('')

    const gameProcess = container.resolveSafely(ConsoleGameProcess)
    const std = container.resolveSafely(Std)
    std.sendIn('s')

    for (let i = 0; i < names.length; i++) {
        std.sendIn(names[i])
    }
    std.sendIn('q')

    gameProcess.start()

    expect(gameProcess.game.isFinished).toBe(true)
    expect(gameProcess.game.players.length).toBe(20)
})

test('cannot have 21 players', () => {
    return
    const longString = 'abcdefghijklmnopqrstu'
    const names = longString.split('')

    const gameProcess = container.resolveSafely(ConsoleGameProcess)
    const std = container.resolveSafely(Std)
    std.sendIn('s')

    for (let i = 0; i < names.length; i++) {
        std.sendIn(names[i])
    }
    std.sendIn('q')

    gameProcess.start()

    expect(gameProcess.game.isFinished).toBe(true)
    expect(gameProcess.game.players.length).toBe(20)
})
