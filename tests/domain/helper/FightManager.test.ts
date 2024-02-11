import TribeManager from '../../../src/app/TribeManager.ts'
import TribeName from '../../../src/domain/enum/TribeName.ts'
import FightManager from '../../../src/domain/helper/FightManager.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'

test('tribe with greater combat readiness wins', () => {
    const fightManager = container.resolveSafely(FightManager)
    const tribeManager = container.resolveSafely(TribeManager)

    const attacker = TribeFactory.createStarterTribeWithOptions()
    tribeManager.arm(attacker)
    const defender = TribeFactory.createStarterTribeWithOptions()

    let attackerWon = false
    attackerWon = fightManager.fightWithAnotherTribe(attacker, defender)

    expect(attackerWon).toBe(true)
})

test('defender does not suffer losses in case of failure when fighting over tile', () => {
    const fightManager = container.resolveSafely(FightManager)
    const tribeManager = container.resolveSafely(TribeManager)

    const attacker = TribeFactory.createStarterTribeWithOptions()
    tribeManager.arm(attacker)
    const defender = TribeFactory.createStarterTribeWithOptions()
    expect(attacker.population).toBe(2)
    expect(defender.population).toBe(2)

    let attackerWon = false
    attackerWon = fightManager.fightWithAnotherTribeOverTile(attacker, defender)
    expect(attackerWon).toBe(true)
    expect(attacker.population).toBe(2)
    expect(defender.population).toBe(2)
})

test('defender suffers losses when weaker', () => {
    const fightManager = container.resolveSafely(FightManager)
    const tribeManager = container.resolveSafely(TribeManager)

    const attacker = TribeFactory.createStarterTribeWithOptions()
    tribeManager.arm(attacker)
    const defender = TribeFactory.createStarterTribeWithOptions()
    expect(attacker.population).toBe(2)
    expect(defender.population).toBe(2)

    let attackerWon = false
    attackerWon = fightManager.fightWithAnotherTribe(attacker, defender)
    expect(attackerWon).toBe(true)
    expect(attacker.population).toBe(2)
    expect(defender.population).toBe(1)
})

test('tribes with equal combat readiness do not win', () => {
    const fightManager = container.resolveSafely(FightManager)

    const attacker = TribeFactory.createStarterTribeWithOptions()
    const defender = TribeFactory.createStarterTribeWithOptions()
    expect(attacker.population).toBe(2)
    expect(defender.population).toBe(2)

    let attackerWon = false
    attackerWon = fightManager.fightWithAnotherTribe(attacker, defender)

    expect(attackerWon).toBe(false)
    expect(attacker.population).toBe(2)
    expect(defender.population).toBe(2)
})

test('attacker takes losses if he is weaker', () => {
    const fightManager = container.resolveSafely(FightManager)
    const tribeManager = container.resolveSafely(TribeManager)

    const attacker = TribeFactory.createStarterTribeWithOptions()
    tribeManager.arm(attacker)
    expect(attacker.militaryPower).toBe(2)

    const defender = TribeFactory.createStarterTribeWithOptions()
    tribeManager.growPopulation(defender, 10)
    tribeManager.arm(defender)

    expect(attacker.population).toBe(2)
    expect(defender.population).toBe(2 + 20)
    expect(defender.militaryPower).toBe(3)

    let attackerWon = false
    attackerWon = fightManager.fightWithAnotherTribe(attacker, defender)

    expect(attackerWon).toBe(false)
    expect(attacker.population).toBe(2 - 1)
    expect(defender.population).toBe(2 + 20)
    expect(attacker.militaryPower).toBe(2 - 1)
})

test('attacker takes big losses but cannot lose whole army', () => {
    const fightManager = container.resolveSafely(FightManager)
    const tribeManager = container.resolveSafely(TribeManager)

    const attacker = TribeFactory.createStarterTribe(TribeName.Achaeans)
    tribeManager.arm(attacker)
    expect(attacker.militaryPower).toBe(2)

    const defender = TribeFactory.createStarterTribe(TribeName.Britons)
    tribeManager.growPopulation(defender, 10)

    tribeManager.arm(defender)
    tribeManager.arm(defender)

    expect(attacker.population).toBe(2)
    expect(defender.population).toBe(2 + 20)
    expect(defender.militaryPower).toBe(5)

    let attackerWon = false
    attackerWon = fightManager.fightWithAnotherTribe(attacker, defender)

    expect(attackerWon).toBe(false)
    expect(attacker.population).toBe(1)
    expect(defender.population).toBe(2 + 20)
    expect(attacker.militaryPower).toBe(1) // not 2-(5 - 2) => -1
})
