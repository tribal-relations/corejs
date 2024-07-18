import { expect, test } from 'vitest'
import TechnologyName from '../../../src/domain/enum/TechnologyName.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import ConsoleGameProcess from '../../../src/outer/ConsoleGameProcess.ts'
import Std from '../../../src/ui/console/io/Std.ts'

test('can quit game immediately after adding a player', () => {
    const gameProcess = container.resolveSafely(ConsoleGameProcess)

    const std = container.resolveSafely(Std)

    std.sendIn('s')
    std.sendIn('player')
    std.sendIn('\n')
    std.sendIn('q')
    gameProcess.start()

    expect(gameProcess.game.specificGame.isFinished).toBe(true)
})

test('singleplayer', () => {
    const gameProcess: ConsoleGameProcess = container.resolveSafely(ConsoleGameProcess)
    const std = container.resolveSafely(Std)
    std.sendIn('s')

    std.sendIn('player')
    std.sendIn('\n')

    std.sendIn('r Pottery') // action
    // std.sendIn('\n') //  relation round is skipped
    std.sendIn('r Animal Husbandry') // action

    gameProcess.start()

    expect(gameProcess.game.specificGame.isFinished).toBe(true)
    expect(gameProcess.game.playersLength).toBe(1)
    expect(gameProcess.game.players.player.tribe.hasTech(TechnologyName.Pottery)).toBe(true)
    expect(gameProcess.game.players.player.tribe.hasTech(TechnologyName.AnimalHusbandry)).toBe(true)
})

test('can have up to 20 players', () => {
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

    expect(gameProcess.game.specificGame.isFinished).toBe(true)
    expect(gameProcess.game.playersLength).toBe(20)
})

test('cannot have 21 players', () => {
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

    expect(gameProcess.game.specificGame.isFinished).toBe(true)
    expect(gameProcess.game.playersLength).toBe(20)
})
