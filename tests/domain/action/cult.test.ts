import 'reflect-metadata'
import { container } from 'tsyringe'
import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import Player from '../../../src/domain/entity/Player.ts'
import Tribe from '../../../src/domain/entity/Tribe.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import ActionName from '../../../src/domain/enum/ActionName.ts'
import DiceThrower from '../../../src/domain/helper/DiceThrower.ts'
import ActionRepository from '../../../src/domain/repository/ActionRepository.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'
import SpecificDiceThrower from '../../mock/SpecificDiceThrower.ts'

const startingCulture = 10

function sendCult(diceResult: number, populationPopulation: number = 10): Tribe {
    const turnDecisionManager = container
        .createChildContainer()
        .register<DiceThrower>(DiceThrower, SpecificDiceThrower)
        .resolve(TurnDecisionManager)

    SpecificDiceThrower.target = diceResult

    const sender = TribeFactory.createEmpty({ culture: startingCulture, population: populationPopulation })

    const senderPlayer = new Player(sender, 'senderPlayer')
    const turn = new Turn(senderPlayer)
    const action = ActionRepository.createFromName(ActionName.Cult)
    turnDecisionManager.processTurn(action, turn)
    return sender
}

test('can send cult with result 1', () => {
    return
    const sender = sendCult(1)

    expect(sender.population).toBe(10 - 5)
    expect(sender.culture).toBe(startingCulture)
})

test('can send cult with result 1 when less than 5 - 1 persists', () => {
    return

    const sender = sendCult(1, 4)

    expect(sender.population).toBe(1)
    expect(sender.culture).toBe(startingCulture)
})

test('can send cult with result 2', () => {
    return

    const sender = sendCult(2)

    expect(sender.culture).toBe(startingCulture)
    expect(sender.population).toBe(10)
    expect(sender.militaryPower).toBe(Tribe.defaultMilitaryPower)
})

test('can send cult with result 3', () => {
    return

    const sender = sendCult(3)

    expect(sender.culture).toBe(startingCulture + 2)
})

test('can send cult with result 4', () => {
    return

    const sender = sendCult(4)

    expect(sender.culture).toBe(startingCulture + 3)
})

test('can send cult with result 5', () => {
    return
    const sender = sendCult(5)

    expect(sender.culture).toBe(startingCulture + 4)
})

test('can send cult with result 6', () => {
    return

    const sender = sendCult(6)

    expect(sender.culture).toBe(startingCulture + 5)
})
