import CurrentGame from '../../../src/app/CurrentGame.ts'
import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import AlliancePlayerAction from '../../../src/domain/entity/action/AlliancePlayerAction.ts'
import AttackTribePlayerAction from '../../../src/domain/entity/action/AttackTribePlayerAction.ts'
import CaravanPlayerAction from '../../../src/domain/entity/action/CaravanPlayerAction.ts'
import PillageCaravanPlayerAction from '../../../src/domain/entity/action/PillageCaravanPlayerAction.ts'
import Player from '../../../src/domain/entity/Player.ts'
import Tribe from '../../../src/domain/entity/Tribe.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import TribeName from '../../../src/domain/enum/TribeName.ts'
import AlliancesStore from '../../../src/domain/store/AlliancesStore.ts'
import CaravansStore from '../../../src/domain/store/CaravansStore.ts'
import RelationsStore from '../../../src/domain/store/RelationsStore.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'
import SpecificDiceThrower from '../../mock/SpecificDiceThrower.ts'

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

test('can create alliance', () => {
    const alliancesStore: AlliancesStore = container.resolveSafely(AlliancesStore)

    createAlliance(
        createSenderPlayer(),
        createRecipientPlayer(),
    )

    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Achaeans, TribeName.Britons)).toBe(true)
    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Britons, TribeName.Achaeans)).toBe(true)
})

test('cannot create alliance with yourself', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const relationsManager = container.resolveSafely(RelationsStore)
    const game: CurrentGame = container.resolveSafely(CurrentGame)
    const alliancesStore: AlliancesStore = container.resolveSafely(AlliancesStore)
    const senderPlayer = createSenderPlayer()
    const recipientPlayer = createRecipientPlayer()

    game.playersLength = 2
    game.players = {
        senderPlayer,
        recipientPlayer,
    }

    relationsManager.setStarterRelations([TribeName.Achaeans, TribeName.Britons])
    alliancesStore.setStarterAlliances([TribeName.Achaeans, TribeName.Britons])

    const turn = new Turn(senderPlayer)

    const action = new AlliancePlayerAction(senderPlayer.tribe, senderPlayer.tribe)

    const throwingFunction = () => {
        turnDecisionManager.processTurn(action, turn)
    }
    expect(throwingFunction).toThrow(
        'Cannot create alliance with yourself.',
    )
    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Achaeans, TribeName.Achaeans)).toBe(false)
    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Achaeans, TribeName.Britons)).toBe(false)
    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Britons, TribeName.Achaeans)).toBe(false)
})

test('cannot create alliance if it already exists', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const relationsManager = container.resolveSafely(RelationsStore)
    const alliancesStore: AlliancesStore = container.resolveSafely(AlliancesStore)
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
    const action = new AlliancePlayerAction(senderPlayer.tribe, recipientPlayer.tribe)
    turnDecisionManager.processTurn(action, turn)

    const nextTurn = new Turn(recipientPlayer)
    const nextAction = new AlliancePlayerAction(recipientPlayer.tribe, senderPlayer.tribe)
    const throwingFunction = () => {
        turnDecisionManager.processTurn(action, turn)
    }
    expect(throwingFunction).toThrow(
        'Cannot create alliance because it already exists.',
    )
    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Achaeans, TribeName.Britons)).toBe(true)
    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Britons, TribeName.Achaeans)).toBe(true)
})

test('alliance brings twice more money from caravans', () => {
    SpecificDiceThrower.target = 1
    const allianceMultiplier = 2
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const relationsManager = container.resolveSafely(RelationsStore)

    const alliancesStore: AlliancesStore = container.resolveSafely(AlliancesStore)

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

    const allianceTurn = new Turn(senderPlayer)
    const allianceAction = new AlliancePlayerAction(senderPlayer.tribe, recipientPlayer.tribe)
    turnDecisionManager.processTurn(allianceAction, allianceTurn)

    const turn = new Turn(senderPlayer)
    const action = new CaravanPlayerAction(senderPlayer.tribe, recipientPlayer.tribe)
    turnDecisionManager.processTurn(action, turn)

    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Achaeans, TribeName.Britons)).toBe(true)
    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Britons, TribeName.Achaeans)).toBe(true)
    expect(senderPlayer.tribe.gold).toBe(Tribe.defaultGold + (senderPlayer.tribe.mercantility * allianceMultiplier))
})

test('cannot attack allied tribe', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const relationsManager = container.resolveSafely(RelationsStore)
    const alliancesStore: AlliancesStore = container.resolveSafely(AlliancesStore)
    const game: CurrentGame = container.resolveSafely(CurrentGame)

    const senderPlayer = createSenderPlayer()
    const recipientPlayer = createRecipientPlayer()

    game.playersLength = 2
    game.players = {
        senderPlayer,
        recipientPlayer,
    }
    relationsManager.setStarterRelations([TribeName.Achaeans, TribeName.Britons])
    alliancesStore.setStarterAlliances([TribeName.Achaeans, TribeName.Britons])

    const allianceTurn = new Turn(senderPlayer)
    const allianceAction = new AlliancePlayerAction(senderPlayer.tribe, recipientPlayer.tribe)
    turnDecisionManager.processTurn(allianceAction, allianceTurn)

    const turn = new Turn(senderPlayer)
    const action = new AttackTribePlayerAction(senderPlayer.tribe, recipientPlayer.tribe)

    const throwingFunction = () => {
        turnDecisionManager.processTurn(action, turn)
    }
    expect(throwingFunction).toThrow(
        'Cannot attack allied tribe.',
    )

    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Achaeans, TribeName.Britons)).toBe(true)
    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Britons, TribeName.Achaeans)).toBe(true)
})

test('cannot pillage caravan from allied tribe', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const relationsManager = container.resolveSafely(RelationsStore)
    const alliancesStore: AlliancesStore = container.resolveSafely(AlliancesStore)
    const caravansStore: CaravansStore = container.resolveSafely(CaravansStore)

    const game: CurrentGame = container.resolveSafely(CurrentGame)

    const senderPlayer = createSenderPlayer()
    const recipientPlayer = createRecipientPlayer()

    game.playersLength = 2
    game.players = {
        senderPlayer,
        recipientPlayer,
    }
    relationsManager.setStarterRelations([TribeName.Achaeans, TribeName.Britons])
    alliancesStore.setStarterAlliances([TribeName.Achaeans, TribeName.Britons])

    const allianceTurn = new Turn(senderPlayer)
    const allianceAction = new AlliancePlayerAction(senderPlayer.tribe, recipientPlayer.tribe)
    turnDecisionManager.processTurn(allianceAction, allianceTurn)

    const caravanTurn = new Turn(senderPlayer)
    const caravanAction = new CaravanPlayerAction(senderPlayer.tribe, recipientPlayer.tribe)
    turnDecisionManager.processTurn(caravanAction, caravanTurn)

    const turn = new Turn(recipientPlayer)
    const action = new PillageCaravanPlayerAction(recipientPlayer.tribe, senderPlayer.tribe, recipientPlayer.tribe)

    const throwingFunction = () => {
        turnDecisionManager.processTurn(action, turn)
    }
    expect(throwingFunction).toThrow(
        'Cannot pillage caravan from allied tribe.',
    )
    expect(caravansStore.getCaravanPrice(TribeName.Achaeans, TribeName.Britons)).toBeGreaterThan(0)
    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Achaeans, TribeName.Britons)).toBe(true)
    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Britons, TribeName.Achaeans)).toBe(true)
})

test('cannot pillage caravan to allied tribe', () => {
    SpecificDiceThrower.target = 1
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const relationsManager = container.resolveSafely(RelationsStore)
    const alliancesStore: AlliancesStore = container.resolveSafely(AlliancesStore)
    const caravansStore: CaravansStore = container.resolveSafely(CaravansStore)

    const game: CurrentGame = container.resolveSafely(CurrentGame)

    const senderPlayer = createSenderPlayer()
    const recipientPlayer = createRecipientPlayer()

    const caravanSender = TribeFactory.createStarterTribeWithOptions({
        name: TribeName.Celts,
        culture: 10,
        population: 10,
        gold: 10,
        mercantility: 10,
    })
    const caravanSenderPlayer = new Player(caravanSender, 'caravanSenderPlayer')
    game.playersLength = 3
    game.players = {
        senderPlayer,
        recipientPlayer,
        caravanSenderPlayer,
    }
    relationsManager.setStarterRelations([TribeName.Achaeans, TribeName.Britons, TribeName.Celts])
    alliancesStore.setStarterAlliances([TribeName.Achaeans, TribeName.Britons, TribeName.Celts])

    const allianceTurn = new Turn(senderPlayer)
    const allianceAction = new AlliancePlayerAction(senderPlayer.tribe, recipientPlayer.tribe)
    turnDecisionManager.processTurn(allianceAction, allianceTurn)

    const caravanTurn = new Turn(caravanSenderPlayer)
    const caravanAction = new CaravanPlayerAction(caravanSenderPlayer.tribe, recipientPlayer.tribe)
    turnDecisionManager.processTurn(caravanAction, caravanTurn)

    const turn = new Turn(senderPlayer)
    const action = new PillageCaravanPlayerAction(senderPlayer.tribe, caravanSenderPlayer.tribe, recipientPlayer.tribe)

    const throwingFunction = () => {
        turnDecisionManager.processTurn(action, turn)
    }
    expect(throwingFunction).toThrow(
        'Cannot pillage caravan to allied tribe.',
    )
    expect(caravansStore.getCaravanPrice(TribeName.Celts, TribeName.Britons)).toBeGreaterThan(0)
    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Achaeans, TribeName.Britons)).toBe(true)
    expect(alliancesStore.doesXHaveAllianceWithY(TribeName.Britons, TribeName.Achaeans)).toBe(true)
})
