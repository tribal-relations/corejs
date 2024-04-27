import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import AttackTribePlayerAction from '../../../src/domain/entity/action/AttackTribePlayerAction.ts'
import Player from '../../../src/domain/entity/Player.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'

function createStrongAttacker() {
    const attacker = TribeFactory.createStarterTribeWithOptions({ militaryPower: 10 })
    expect(attacker.militaryPower).toStrictEqual(10)
    expect(attacker.tilesLength).toStrictEqual(2)
    return attacker
}

function createWeakDefender() {
    const defender = TribeFactory.createStarterTribeWithOptions({ militaryPower: 5 })
    expect(defender.militaryPower).toStrictEqual(5)
    expect(defender.tilesLength).toStrictEqual(2)
    return defender
}

test('can attack a tribe', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const attacker = createStrongAttacker()
    const defender = createWeakDefender()

    const player = new Player(attacker)
    const turn = new Turn(player)

    expect(attacker.militaryPower).toBeGreaterThan(defender.militaryPower)

    const playerAction = new AttackTribePlayerAction(attacker, defender)
    turnDecisionManager.processTurn(playerAction, turn)

    expect(attacker.militaryPower).toStrictEqual(10)
    expect(defender.militaryPower).toStrictEqual(1)
})

test('attacker takes losses if attacker is weaker', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const attacker = createWeakDefender()
    const defender = createStrongAttacker()

    const player = new Player(attacker)
    const turn = new Turn(player)

    expect(defender.militaryPower).toBeGreaterThan(attacker.militaryPower)

    const playerAction = new AttackTribePlayerAction(attacker, defender)
    const _ = turnDecisionManager.processTurn(playerAction, turn)

    // attacker takes losses; defender does not take losses
    expect(attacker.militaryPower).toStrictEqual(1)
    expect(defender.militaryPower).toStrictEqual(10)
})
