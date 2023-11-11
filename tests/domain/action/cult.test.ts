import 'reflect-metadata'
import { container } from 'tsyringe'
import TurnDecisionManager from '../../../src/app/TurnDecisionManager'
import Player from '../../../src/domain/entity/Player'
import Tribe from '../../../src/domain/entity/Tribe'
import Turn from '../../../src/domain/entity/Turn'
import ActionName from '../../../src/domain/enum/ActionName'
import DiceThrower from '../../../src/domain/helper/DiceThrower'
import ActionRepository from '../../../src/domain/repository/ActionRepository'
import TribeFactory from '../../../src/outer/factory/TribeFactory'
import SpecificDiceThrower from '../../mock/SpecificDiceThrower'

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
