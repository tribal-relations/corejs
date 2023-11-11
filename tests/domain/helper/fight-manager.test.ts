import 'reflect-metadata'
import { container } from 'tsyringe'
import FightManager from '../../../src/domain/helper/FightManager'
import TestBootstrapper from '../../test-bootstrapper'

test('tribe with greater combat readiness wins ', () => {
    const fightManager = container.resolve(FightManager)

    const attacker = TestBootstrapper.createStarterTribe()
    attacker.arm()
    const defender = TestBootstrapper.createStarterTribe()

    let attackerWon = false
    attackerWon = fightManager.fightWithAnotherTribe(attacker, defender)

    expect(attackerWon).toBe(true)
})

test('defender does not suffer losses in case of failure', () => {
    const fightManager = container.resolve(FightManager)

    const attacker = TestBootstrapper.createStarterTribe()
    attacker.arm()
    const defender = TestBootstrapper.createStarterTribe()
    expect(attacker.total).toBe(2)
    expect(defender.total).toBe(2)

    let attackerWon = false
    attackerWon = fightManager.fightWithAnotherTribe(attacker, defender)
    expect(attackerWon).toBe(true)
    expect(attacker.total).toBe(2)
    expect(defender.total).toBe(2)
})

test('tribes with equal combat readiness do not win', () => {
    const fightManager = container.resolve(FightManager)

    const attacker = TestBootstrapper.createStarterTribe()
    const defender = TestBootstrapper.createStarterTribe()
    expect(attacker.total).toBe(2)
    expect(defender.total).toBe(2)

    let attackerWon = false
    attackerWon = fightManager.fightWithAnotherTribe(attacker, defender)

    expect(attackerWon).toBe(false)
    expect(attacker.total).toBe(2)
    expect(defender.total).toBe(2)
})

test('attacker takes losses if he is weaker', () => {
    const fightManager = container.resolve(FightManager)

    const attacker = TestBootstrapper.createStarterTribe()
    attacker.arm()
    expect(attacker.combatReadiness).toBe(2)

    const defender = TestBootstrapper.createStarterTribe()
    defender.growPopulation(10)
    defender.arm()
    expect(attacker.total).toBe(2)
    expect(defender.total).toBe(2 + 20)
    expect(defender.combatReadiness).toBe(3)

    let attackerWon = false
    attackerWon = fightManager.fightWithAnotherTribe(attacker, defender)

    expect(attackerWon).toBe(false)
    expect(attacker.total).toBe(2 - 1)
    expect(defender.total).toBe(2 + 20)
    expect(attacker.combatReadiness).toBe(2 - 1)
})

test('attacker takes big losses but cannot lose whole army', () => {
    const fightManager = container.resolve(FightManager)

    const attacker = TestBootstrapper.createStarterTribe()
    attacker.arm()
    expect(attacker.combatReadiness).toBe(2)

    const defender = TestBootstrapper.createStarterTribe()
    defender.growPopulation(10)
    defender.arm()
    defender.arm()
    expect(attacker.total).toBe(2)
    expect(defender.total).toBe(2 + 20)
    expect(defender.combatReadiness).toBe(5)

    let attackerWon = false
    attackerWon = fightManager.fightWithAnotherTribe(attacker, defender)

    expect(attackerWon).toBe(false)
    expect(attacker.total).toBe(1)
    expect(defender.total).toBe(2 + 20)
    expect(attacker.combatReadiness).toBe(1) // not 2-(5 - 2) => -1
})
