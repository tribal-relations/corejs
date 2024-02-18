import CurrentGame from '../../../src/app/CurrentGame.ts'
import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import CaravanPlayerAction from '../../../src/domain/entity/action/CaravanPlayerAction.ts'
import PillageCaravanPlayerAction from '../../../src/domain/entity/action/PillageCaravanPlayerAction.ts'
import Player from '../../../src/domain/entity/Player.ts'
import Tribe from '../../../src/domain/entity/Tribe.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import TribeName from '../../../src/domain/enum/TribeName.ts'
import RelationsStore from '../../../src/domain/store/RelationsStore.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'
import CommonRelationRoundManager from '../../../src/ui/common/CommonRelationRoundManager.ts'
import ConsoleRoundManager from '../../../src/ui/console/ConsoleRoundManager.ts'
import Std from '../../../src/ui/console/io/Std.ts'
import type MockStd from '../../mock/MockStd'
import SpecificDiceThrower from '../../mock/SpecificDiceThrower.ts'

test('can pillage caravan', () => {
    const consoleRoundManager: ConsoleRoundManager = container.resolveSafely(ConsoleRoundManager)
    const commonRelationRoundManager: CommonRelationRoundManager = container.resolveSafely(CommonRelationRoundManager)

    const game: CurrentGame = container.resolveSafely(CurrentGame)

    const diceBonus = 2
    SpecificDiceThrower.target = diceBonus
    const std: MockStd = container.resolveSafely(Std)

    const sender = TribeFactory.createStarterTribeWithOptions({
        name: TribeName.Achaeans,
        mercantility: 2,
        culture: 2,
        gold: Tribe.defaultGold,
    })
    const robber = TribeFactory.createStarterTribeWithOptions({
        name: TribeName.Celts,
        population: 10,
        gold: Tribe.defaultGold,
    })
    game.playersLength = 3
    game.players = {
        alice: new Player(
            sender,
            'alice',
        ),
        bob: new Player(
            TribeFactory.createStarterTribe(TribeName.Britons),
            'bob',
        ),
        chris: new Player(
            robber,
            'chris',
        ),
    }
    expect(Object.values(game.players).length).toBe(game.playersLength)
    commonRelationRoundManager.setStarterRelationsFromGame(game)

    std.sendIn(`c ${TribeName.Britons}`)
    std.sendIn('a')
    std.sendIn('a')

    // relations round
    std.sendIn('e e')
    std.sendIn('e e')
    std.sendIn('e e')

    // round ended, new round
    // alice gets profit before her action
    std.sendIn('a')
    std.sendIn('a')
    std.sendIn(`pil ${TribeName.Achaeans} ${TribeName.Britons}`)
    // relations round
    std.sendIn('e e')
    std.sendIn('e e')
    std.sendIn('e e')
    // round ended, new round
    // alice DOES NOT get profit before her action

    consoleRoundManager.startRounds()
    const oneCaravanProfit = sender.mercantility * diceBonus
    expect(sender.gold).toBe(Tribe.defaultGold + oneCaravanProfit + oneCaravanProfit)
    expect(robber.gold).toBe(Tribe.defaultGold + oneCaravanProfit)
})

test('cannot pillage caravan from self', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const relationsManager = container.resolveSafely(RelationsStore)

    const senderRobber = TribeFactory.createStarterTribeWithOptions({
        name: TribeName.Achaeans,
        mercantility: 2,
        culture: 2,
        population: 10,
        gold: Tribe.defaultGold,
    })
    const recipient = TribeFactory.createStarterTribe(TribeName.Britons)
    const senderRobberPlayer = new Player(senderRobber, 'senderRobberPlayer')
    const _recipientPlayer = new Player(recipient, 'recipientPlayer')
    relationsManager.setStarterRelations([TribeName.Achaeans, TribeName.Britons])
    const diceBonus = 2
    SpecificDiceThrower.target = diceBonus
    const turn = new Turn(senderRobberPlayer)

    const action = new CaravanPlayerAction(senderRobber, recipient)
    turnDecisionManager.processTurn(action, turn)

    const pillageAction = new PillageCaravanPlayerAction(senderRobber, senderRobber, recipient)
    const throwingFunction = () => {
        turnDecisionManager.processTurn(pillageAction, new Turn(senderRobberPlayer))
    }

    expect(throwingFunction).toThrow(
        'Cannot pillage caravan from self.',
    )

    const oneCaravanProfit = senderRobber.mercantility * diceBonus
    expect(senderRobber.gold).toBe(Tribe.defaultGold + oneCaravanProfit)
})

test('can pillage caravan to self', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const relationsManager = container.resolveSafely(RelationsStore)

    const sender = TribeFactory.createStarterTribeWithOptions({
        name: TribeName.Achaeans,
        mercantility: 2,
        culture: 2,
        gold: Tribe.defaultGold,
    })
    const recipient = TribeFactory.createStarterTribeWithOptions({
        name: TribeName.Britons,
        population: 10,
        mercantility: 2,
        culture: 2,
        gold: Tribe.defaultGold,
    })
    const senderPlayer = new Player(sender, 'senderPlayer')
    const recipientPlayer = new Player(recipient, 'recipientPlayer')
    relationsManager.setStarterRelations([TribeName.Achaeans, TribeName.Britons])
    const diceBonus = 2
    SpecificDiceThrower.target = diceBonus
    const turn = new Turn(senderPlayer)

    const action = new CaravanPlayerAction(sender, recipient)
    turnDecisionManager.processTurn(action, turn)

    const pillageAction = new PillageCaravanPlayerAction(recipient, sender, recipient)

    turnDecisionManager.processTurn(pillageAction, new Turn(recipientPlayer))

    const oneCaravanProfit = sender.mercantility * diceBonus
    expect(recipient.gold).toBe(Tribe.defaultGold + oneCaravanProfit)
    expect(recipient.gold).toBe(Tribe.defaultGold + oneCaravanProfit)
})
