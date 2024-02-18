import CurrentGame from '../../../src/app/CurrentGame.ts'
import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import AlliancePlayerAction from '../../../src/domain/entity/action/AlliancePlayerAction.ts'
import TreasonPlayerAction from '../../../src/domain/entity/action/TreasonPlayerAction.ts'
import Player from '../../../src/domain/entity/Player.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import PlaystyleLabel from '../../../src/domain/enum/PlaystyleLabel.ts'
import TribeName from '../../../src/domain/enum/TribeName.ts'
import AlliancesStore from '../../../src/domain/store/AlliancesStore.ts'
import RelationsStore from '../../../src/domain/store/RelationsStore.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'

function createSenderPlayer(): Player {
    const sender = TribeFactory.createStarterTribeWithOptions({
        name: TribeName.Achaeans,
        culture: 10,
        gold: 10,
        population: 10,
        mercantility: 10,
    })
    const senderPlayer = new Player(sender, 'senderPlayer')
    sender.goToNextRadius()
    sender.goToNextRadius()
    return senderPlayer
}

function createRecipientPlayer(): Player {
    const recipient = TribeFactory.createStarterTribeWithOptions({
        name: TribeName.Britons,
        culture: 10,
        population: 10,
    })

    const recipientPlayer = new Player(recipient, 'recipientPlayer')
    recipient.goToNextRadius()
    recipient.goToNextRadius()
    return recipientPlayer
}

function createAlliance(senderPlayer: Player, recipientPlayer: Player) {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const relationsManager = container.resolveSafely(RelationsStore)
    const game: CurrentGame = container.resolveSafely(CurrentGame)
    const alliancesStore: AlliancesStore = container.resolveSafely(AlliancesStore)

    game.playersLength = 2
    game.players = {
        senderPlayer,
        recipientPlayer,
    }

    relationsManager.setStarterRelations([TribeName.Achaeans, TribeName.Britons])
    alliancesStore.setStarterAlliances([TribeName.Achaeans, TribeName.Britons])

    const turn = new Turn(senderPlayer)

    const action = new AlliancePlayerAction(senderPlayer.tribe, recipientPlayer.tribe)
    turnDecisionManager.processTurn(action, turn)
}

function betray(senderPlayer: Player, recipientPlayer: Player) {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const turn = new Turn(senderPlayer)
    const action = new TreasonPlayerAction(senderPlayer.tribe, recipientPlayer.tribe)
    turnDecisionManager.processTurn(action, turn)
}

test('can betray', () => {
    const alliancesStore: AlliancesStore = container.resolveSafely(AlliancesStore)
    const senderPlayer = createSenderPlayer()
    const recipientPlayer = createRecipientPlayer()
    createAlliance(
        senderPlayer,
        recipientPlayer,
    )

    betray(
        senderPlayer,
        recipientPlayer,
    )

    expect(alliancesStore.doesXHaveAllianceWithY(senderPlayer.tribe.name, recipientPlayer.tribe.name)).toBe(false)
    expect(alliancesStore.doesXHaveAllianceWithY(recipientPlayer.tribe.name, senderPlayer.tribe.name)).toBe(false)
    expect(senderPlayer.tribe.hasLabel(PlaystyleLabel.Traitor)).toBe(true)
    expect(recipientPlayer.tribe.hasLabel(PlaystyleLabel.Betrayed)).toBe(true)
})

test('cannot betray yourself', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const alliancesStore: AlliancesStore = container.resolveSafely(AlliancesStore)
    const senderPlayer = createSenderPlayer()
    const recipientPlayer = createRecipientPlayer()

    createAlliance(
        senderPlayer,
        recipientPlayer,
    )

    const turn = new Turn(senderPlayer)

    const action = new TreasonPlayerAction(senderPlayer.tribe, senderPlayer.tribe)

    const throwingFunction = () => {
        turnDecisionManager.processTurn(action, turn)
    }
    expect(throwingFunction).toThrow(
        'Cannot betray yourself.',
    )
    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Achaeans, TribeName.Britons)).toBe(true)
    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Britons, TribeName.Achaeans)).toBe(true)
    expect(senderPlayer.tribe.hasLabel(PlaystyleLabel.Traitor)).toBe(false)
    expect(recipientPlayer.tribe.hasLabel(PlaystyleLabel.Betrayed)).toBe(false)
})

test('cannot betray if no alliance', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const alliancesStore: AlliancesStore = container.resolveSafely(AlliancesStore)
    const relationsManager = container.resolveSafely(RelationsStore)

    const senderPlayer = createSenderPlayer()
    const recipientPlayer = createRecipientPlayer()

    const game: CurrentGame = container.resolveSafely(CurrentGame)

    game.playersLength = 2
    game.players = {
        senderPlayer,
        recipientPlayer,
    }

    relationsManager.setStarterRelations([TribeName.Achaeans, TribeName.Britons])
    alliancesStore.setStarterAlliances([TribeName.Achaeans, TribeName.Britons])

    const turn = new Turn(senderPlayer)

    const action = new TreasonPlayerAction(senderPlayer.tribe, recipientPlayer.tribe)

    const throwingFunction = () => {
        turnDecisionManager.processTurn(action, turn)
    }
    expect(throwingFunction).toThrow(
        `Cannot betray ${recipientPlayer.tribe.name}: not allied.`,
    )
    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Achaeans, TribeName.Britons)).toBe(false)
    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Britons, TribeName.Achaeans)).toBe(false)
    expect(senderPlayer.tribe.hasLabel(PlaystyleLabel.Traitor)).toBe(false)
    expect(recipientPlayer.tribe.hasLabel(PlaystyleLabel.Betrayed)).toBe(false)
})
