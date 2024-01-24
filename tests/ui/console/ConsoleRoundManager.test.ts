import CurrentGame from '../../../src/app/CurrentGame.ts'
import Player from '../../../src/domain/entity/Player.ts'
import TribeName from '../../../src/domain/enum/TribeName.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'
import CommonRelationRoundManager from '../../../src/ui/common/CommonRelationRoundManager.ts'
import ConsoleRoundManager from '../../../src/ui/console/ConsoleRoundManager.ts'
import Std from '../../../src/ui/console/io/Std.ts'
import type MockStd from '../../mock/MockStd.ts'

test('dont crash after input exception', () => {
    const currentGame: CurrentGame = container.resolveSafely(CurrentGame)
    const commonRelationRoundManager: CommonRelationRoundManager = container.resolveSafely(CommonRelationRoundManager)
    const consoleRoundManager: ConsoleRoundManager = container.resolveSafely(ConsoleRoundManager)

    const achaeans = TribeFactory.createStarterTribe(TribeName.Achaeans)
    const britons = TribeFactory.createStarterTribe(TribeName.Britons)

    currentGame.playersLength = 2
    currentGame.players = {
        artem: new Player(achaeans, 'artem'),
        rinat: new Player(britons, 'rinat'),
    }
    commonRelationRoundManager.setStarterRelationsFromGame(currentGame)

    const std: MockStd = container.resolveSafely(Std)

    std.sendIn('r Potter') // typo in parameter
    std.sendIn('r Pottery') // still artem turn
    std.sendIn('a')
    // relations
    std.sendIn('e')
    std.sendIn('z')// typo in relation shorthand
    std.sendIn('e')

    // round ended, new round
    std.sendIn('drf') // typo in action shorthand
    std.sendIn('a') // still artem turn
    std.sendIn('atr Acans') // rinat turn , typo in tribe name
    std.sendIn('atr Achaeans') // still rinat turn
    // relations
    std.sendIn('e')
    std.sendIn('e')
    // round ended, new round
    std.sendIn('atile Britons Pastur') // typo in resource name
    std.sendIn('atile Britons Pasture') // still artem turn

    consoleRoundManager.startRounds()
})
