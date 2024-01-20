import CurrentGame from '../../../src/app/CurrentGame.ts'
import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import CaravanPlayerAction from '../../../src/domain/entity/action/CaravanPlayerAction.ts'
import Player from '../../../src/domain/entity/Player.ts'
import Tribe from '../../../src/domain/entity/Tribe.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import TribeName from '../../../src/domain/enum/TribeName.ts'
import CaravansStore from '../../../src/domain/store/CaravansStore.ts'
import RelationsStore from '../../../src/domain/store/RelationsStore.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'
import CommonRelationRoundManager from '../../../src/ui/common/CommonRelationRoundManager.ts'
import ConsoleRoundManager from '../../../src/ui/console/ConsoleRoundManager.ts'
import Std from '../../../src/ui/console/io/Std.ts'
import type MockStd from '../../mock/MockStd.ts'
import SpecificDiceThrower from '../../mock/SpecificDiceThrower.ts'

test('can send caravan', () => {
    SpecificDiceThrower.target = 1
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const relationsManager = container.resolveSafely(RelationsStore)
    const caravansStore: CaravansStore = container.resolveSafely(CaravansStore)

    const sender = TribeFactory.createStarterTribeWithOptions({
        name: TribeName.Achaeans,
        mercantility: 2,
        culture: 2,
        gold: Tribe.defaultGold,
    })
    const recipient = TribeFactory.createStarterTribe(TribeName.Britons)
    expect(sender.gold).toBe(Tribe.defaultGold)
    expect(recipient.mercantility).toBe(0)

    const senderPlayer = new Player(sender, 'senderPlayer')
    const recipientPlayer = new Player(recipient, 'recipientPlayer')
    relationsManager.setStarterRelations([TribeName.Achaeans, TribeName.Britons])

    const turn = new Turn(senderPlayer)

    const action = new CaravanPlayerAction(sender, recipient)
    turnDecisionManager.processTurn(action, turn)

    expect(sender.gold).toBe(Tribe.defaultGold + sender.mercantility)
    expect(recipient.mercantility).toBe(caravansStore.recipientMercantilityBonus)
    expect(recipient.culture).toBe(caravansStore.recipientCultureBonus)
})

test('cannot send caravan to self', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const relationsManager = container.resolveSafely(RelationsStore)

    const sender = TribeFactory.createStarterTribeWithOptions({
        name: TribeName.Achaeans,
        mercantility: 2,
        culture: 2,
        gold: Tribe.defaultGold,
    })
    const recipient = TribeFactory.createStarterTribe(TribeName.Britons)
    const senderPlayer = new Player(sender, 'senderPlayer')
    const _recipientPlayer = new Player(recipient, 'recipientPlayer')
    relationsManager.setStarterRelations([TribeName.Achaeans, TribeName.Britons])

    const turn = new Turn(senderPlayer)

    const action = new CaravanPlayerAction(sender, sender)

    const throwingFunction = () => {
        turnDecisionManager.processTurn(action, turn)
    }
    expect(throwingFunction).toThrow(
        'Cannot send caravan to self.',
    )
})

test('caravan brings money every round', () => {
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
    game.playersLength = 2
    game.players = {
        alice: new Player(
            sender,
            'alice',
        ),
        bob: new Player(
            TribeFactory.createStarterTribe(TribeName.Britons),
            'bob',
        ),
    }
    expect(Object.values(game.players).length).toBe(game.playersLength)
    commonRelationRoundManager.setStarterRelationsFromGame(game)

    std.sendIn(`c ${TribeName.Britons}`)
    std.sendIn('a')
    // relations round
    std.sendIn('e')
    std.sendIn('e')
    // round ended, new round
    // alice gets profit before her action

    consoleRoundManager.startRounds()
    const oneCaravanProfit = sender.mercantility * diceBonus
    expect(sender.gold).toBe(Tribe.defaultGold + oneCaravanProfit + oneCaravanProfit)
})

test('cannot send 2 caravans to 1 tribe', () => {
    SpecificDiceThrower.target = 1
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const relationsManager = container.resolveSafely(RelationsStore)

    const sender = TribeFactory.createStarterTribeWithOptions({
        name: TribeName.Achaeans,
        mercantility: 2,
        culture: 2,
        gold: Tribe.defaultGold,
    })
    const recipient = TribeFactory.createStarterTribe(TribeName.Britons)
    const extra = TribeFactory.createStarterTribe(TribeName.Zulu)

    const senderPlayer = new Player(sender, 'senderPlayer')
    const extraPlayer = new Player(sender, 'extraPlayer')
    const recipientPlayer = new Player(extra, 'recipientPlayer')
    relationsManager.setStarterRelations([TribeName.Achaeans, TribeName.Britons, TribeName.Zulu])

    const turn = new Turn(senderPlayer)

    const action = new CaravanPlayerAction(sender, recipient)
    turnDecisionManager.processTurn(action, turn)

    const throwingFunction = () => {
        turnDecisionManager.processTurn(action, turn)
    }
    expect(throwingFunction).toThrow(
        'Caravan already exists.',
    )

    expect(sender.gold).toBe(Tribe.defaultGold + sender.mercantility)
})
