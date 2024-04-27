import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import AttackTilePlayerAction from '../../../src/domain/entity/action/AttackTilePlayerAction.ts'
import Player from '../../../src/domain/entity/Player.ts'
import type Tribe from '../../../src/domain/entity/Tribe.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import ResourceName from '../../../src/domain/enum/ResourceName.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'

function createStrongAttacker() {
    const attacker = TribeFactory.createStarterTribeWithOptions({
        militaryPower: 10,
    })
    expect(attacker.militaryPower).toStrictEqual(10)
    expect(attacker.tilesLength).toStrictEqual(2)
    return attacker
}

function createWeakDefender() {
    const defender = TribeFactory.createStarterTribeWithOptions({
        militaryPower: 5,
    })
    expect(defender.militaryPower).toStrictEqual(5)
    expect(defender.tilesLength).toStrictEqual(2)
    return defender
}

function assertTribePoints(turnResult, attacker: Tribe, defender: Tribe) {
    expect(turnResult.isLast).toBe(false)
    // defender does not take losses
    expect(attacker.militaryPower).toStrictEqual(10)
    expect(defender.militaryPower).toStrictEqual(5)

    // attacker gains tile if wins
    expect(attacker.tilesLength).toStrictEqual(3)
    expect(defender.tilesLength).toStrictEqual(1)

    expect(attacker.resources[ResourceName.Pasture] === 1).toStrictEqual(true)
    expect(attacker.resources[ResourceName.Forest] === 2).toStrictEqual(true)

    expect(defender.resources[ResourceName.Pasture] === 1).toStrictEqual(true)
    expect(defender.resources[ResourceName.Forest] === 0).toStrictEqual(true)
}

test('can attack a tile', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const attacker = createStrongAttacker()
    const defender = createWeakDefender()

    const player = new Player(attacker)
    const turn = new Turn(player)

    expect(attacker.militaryPower).toBeGreaterThan(defender.militaryPower)

    const playerAction = new AttackTilePlayerAction(attacker, defender, ResourceName.Forest)
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

    const playerAction = new AttackTilePlayerAction(attacker, defender, ResourceName.Forest)
    const _ = turnDecisionManager.processTurn(playerAction, turn)

    // attacker takes losses; defender does not take losses
    expect(attacker.militaryPower).toStrictEqual(1)
    expect(defender.militaryPower).toStrictEqual(10)

    // attacker does not gain tile; defender does not gain tile
    expect(attacker.tilesLength).toStrictEqual(2)
    expect(defender.tilesLength).toStrictEqual(2)

    expect(attacker.resources[ResourceName.Pasture] === 1).toStrictEqual(true)
    expect(attacker.resources[ResourceName.Forest] === 1).toStrictEqual(true)

    expect(defender.resources[ResourceName.Pasture] === 1).toStrictEqual(true)
    expect(defender.resources[ResourceName.Forest] === 1).toStrictEqual(true)
})
