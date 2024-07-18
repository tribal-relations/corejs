import { expect, test } from 'vitest'
import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import AbstractPlayerAction from '../../../src/domain/entity/action/AbstractPlayerAction.ts'
import Player from '../../../src/domain/entity/Player.ts'
import Currency from '../../../src/domain/entity/static/Currency.ts'
import Tribe from '../../../src/domain/entity/Tribe.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import ActionName from '../../../src/domain/enum/ActionName.ts'
import TribeName from '../../../src/domain/enum/TribeName.ts'
import GameplayActionRepository from '../../../src/domain/repository/GameplayActionRepository.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'
import SpecificDiceThrower from '../../mock/SpecificDiceThrower.ts'

const startingPopulation = 20
let startingTilesLength = 2

function makePrayAction(diceResult: number, population: number = 20): Tribe {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    SpecificDiceThrower.target = diceResult

    const sender = TribeFactory.createStarterTribeWithOptions({
        name: TribeName.Achaeans,
        culture: 10,
        production: 10,
        population,
        militaryPower: Tribe.defaultMilitaryPower,
    })

    startingTilesLength = sender.tilesLength
    const senderPlayer = new Player(sender, 'senderPlayer')
    const turn = new Turn(senderPlayer)
    const gameAction = container.resolveSafely(GameplayActionRepository).get(ActionName.Pray)
    const playerAction = new AbstractPlayerAction(gameAction, sender)

    turnDecisionManager.processTurn(playerAction, turn)
    return sender
}

test('can pray with result 1', () => {
    const sender = makePrayAction(1)

    expect(sender.population).toBe(startingPopulation - 10)
})

test('cannot pray with population less than 10', () => {
    const throwingFunction = () => {
        const sender = makePrayAction(1, 4)
    }
    expect(throwingFunction).toThrow(`Tribe '${TribeName.Achaeans}' cannot perform action '${ActionName.Pray}', because it does not satisfy action constraints. (Insufficient Population)`)
})

test('can pray with result 2', () => {
    const sender = makePrayAction(2)

    expect(sender.population).toBe(startingPopulation - 5)
    expect(sender.militaryPower).toBe(Tribe.defaultMilitaryPower)
})

test('can pray with result 3', () => {
    const sender = makePrayAction(3)

    expect(sender.population).toBe(startingPopulation)
})

test('can pray with result 4', () => {
    const sender = makePrayAction(4)

    expect(sender.population).toBe(startingPopulation)
    expect(sender.militaryPower).toBeGreaterThan(Tribe.defaultMilitaryPower)
})

test('can pray with result 5', () => {
    const sender = makePrayAction(5)

    expect(sender.population).toBe(startingPopulation)
    expect(sender.militaryPower).toBe(Tribe.defaultMilitaryPower)
    expect(sender.tilesLength).toBe(startingTilesLength + 1)
    expect(sender.getCurrencyBonus(Currency.TurnAction)).toBe(1)
})

test('can pray with result 6', () => {
    // TODO fix blinking test
    const sender = makePrayAction(6)

    expect(sender.population).toBe(startingPopulation)
    expect(sender.militaryPower).toBe(1)
    expect(Object.values(sender.technologies).length).toBe(1)
    expect(sender.getCurrencyBonus(Currency.TurnAction)).toBe(1)
})
