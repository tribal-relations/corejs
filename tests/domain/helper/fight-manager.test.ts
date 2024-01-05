
import { container } from '../../../src/NaiveDiContainer.ts'
import FightManager from '../../../src/domain/helper/FightManager.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'

test('tribe with greater combat readiness wins', () => {
    const fightManager = container.resolve(FightManager)

    const attacker = TribeFactory.createStarterTribeWithOptions()
    attacker.arm()
    const defender = TribeFactory.createStarterTribeWithOptions()

    let attackerWon = false
    attackerWon = fightManager.fightWithAnotherTribe(attacker, defender)

    expect(attackerWon).toBe(true)
})

test('defender does not suffer losses in case of failure', () => {
    const fightManager = container.resolve(FightManager)

    const attacker = TribeFactory.createStarterTribeWithOptions()
    attacker.arm()
    const defender = TribeFactory.createStarterTribeWithOptions()
    expect(attacker.population).toBe(2)
    expect(defender.population).toBe(2)

    let attackerWon = false
    attackerWon = fightManager.fightWithAnotherTribe(attacker, defender)
    expect(attackerWon).toBe(true)
    expect(attacker.population).toBe(2)
    expect(defender.population).toBe(2)
})

test('tribes with equal combat readiness do not win', () => {
    const fightManager = container.resolve(FightManager)

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
    const fightManager = container.resolve(FightManager)

    const attacker = TribeFactory.createStarterTribeWithOptions()
    attacker.arm()
    expect(attacker.militaryPower).toBe(2)

    const defender = TribeFactory.createStarterTribeWithOptions()
    defender.growPopulation(10)
    defender.arm()
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
    const fightManager = container.resolve(FightManager)

    const attacker = TribeFactory.createStarterTribeWithOptions()
    attacker.arm()
    expect(attacker.militaryPower).toBe(2)

    const defender = TribeFactory.createStarterTribeWithOptions()
    defender.growPopulation(10)
    defender.arm()
    defender.arm()
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
