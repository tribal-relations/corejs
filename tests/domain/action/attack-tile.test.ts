import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import AttackTilePlayerAction from '../../../src/domain/entity/action/AttackTilePlayerAction.ts'
import Player from '../../../src/domain/entity/Player.ts'
import Tile from '../../../src/domain/entity/Tile.ts'
import type Tribe from '../../../src/domain/entity/Tribe.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import ResourceName from '../../../src/domain/enum/ResourceName.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'

function createStrongAttacker() {
    const attacker = TribeFactory.createStarterTribeWithOptions({
        militaryPower: 10,
        tiles: [
            Tile.createFromResourceName(ResourceName.Pasture),
            Tile.createFromResourceName(ResourceName.Forest),
        ],
    })
    expect(attacker.militaryPower).toStrictEqual(10)
    expect(attacker.tiles.length).toStrictEqual(2)
    return attacker
}

function createWeakDefender() {
    const defender = TribeFactory.createStarterTribeWithOptions({
        militaryPower: 5,
        tiles: [
            Tile.createFromResourceName(ResourceName.Pasture),
            Tile.createFromResourceName(ResourceName.Forest),
        ],
    })
    expect(defender.militaryPower).toStrictEqual(5)
    expect(defender.tiles.length).toStrictEqual(2)
    return defender
}

function assertTribePoints(turnResult, attacker: Tribe, defender: Tribe) {
    expect(turnResult.isLast).toBe(false)
    // defender does not take losses
    expect(attacker.militaryPower).toStrictEqual(10)
    expect(defender.militaryPower).toStrictEqual(5)

    // attacker gains tile if wins
    expect(attacker.tiles.length).toStrictEqual(3)
    expect(defender.tiles.length).toStrictEqual(1)

    expect(attacker.tiles[0].resource.name === ResourceName.Pasture).toStrictEqual(true)
    expect(attacker.tiles[1].resource.name === ResourceName.Forest).toStrictEqual(true)
    expect(attacker.tiles[2].resource.name === ResourceName.Forest).toStrictEqual(true)

    expect(defender.tiles[0].resource.name === ResourceName.Pasture).toStrictEqual(true)
}

test('can attack a tile', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const attacker = createStrongAttacker()
    const defender = createWeakDefender()

    const player = new Player(attacker)
    const turn = new Turn(player)

    expect(attacker.militaryPower).toBeGreaterThan(defender.militaryPower)

    const playerAction = new AttackTilePlayerAction(attacker, defender, defender.tiles[1])
    const turnResult = turnDecisionManager.processTurn(playerAction, turn)

    assertTribePoints(turnResult, attacker, defender)
})

test('attacker takes losses if attacker is weaker', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const attacker = createWeakDefender()
    const defender = createStrongAttacker()

    const player = new Player(attacker)
    const turn = new Turn(player)

    expect(defender.militaryPower).toBeGreaterThan(attacker.militaryPower)

    const playerAction = new AttackTilePlayerAction(attacker, defender, defender.tiles[1])
    const _ = turnDecisionManager.processTurn(playerAction, turn)

    // attacker takes losses; defender does not take losses
    expect(attacker.militaryPower).toStrictEqual(1)
    expect(defender.militaryPower).toStrictEqual(10)

    // attacker does not gain tile; defender does not gain tile
    expect(attacker.tiles.length).toStrictEqual(2)
    expect(defender.tiles.length).toStrictEqual(2)

    expect(attacker.tiles[0].resource.name === ResourceName.Pasture).toStrictEqual(true)
    expect(attacker.tiles[1].resource.name === ResourceName.Forest).toStrictEqual(true)

    expect(defender.tiles[0].resource.name === ResourceName.Pasture).toStrictEqual(true)
    expect(defender.tiles[1].resource.name === ResourceName.Forest).toStrictEqual(true)
})
