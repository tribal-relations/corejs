import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import AbstractPlayerAction from '../../../src/domain/entity/action/AbstractPlayerAction.ts'
import Player from '../../../src/domain/entity/Player.ts'
import Tribe from '../../../src/domain/entity/Tribe.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import ActionName from '../../../src/domain/enum/ActionName.ts'
import TribeName from '../../../src/domain/enum/TribeName.ts'
import GameplayActionRepository from '../../../src/domain/repository/GameplayActionRepository.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'
import SpecificDiceThrower from '../../mock/SpecificDiceThrower.ts'

const startingCulture = 10

function sendCult(diceResult: number, population: number = 10): Tribe {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    SpecificDiceThrower.target = diceResult

    const sender = TribeFactory.createEmpty({
        name: TribeName.Achaeans,
        culture: startingCulture,
        population,
        militaryPower: Tribe.defaultMilitaryPower,
    })

    const senderPlayer = new Player(sender, 'senderPlayer')
    const turn = new Turn(senderPlayer)
    const gameAction = GameplayActionRepository.get(ActionName.Cult)
    const playerAction = new AbstractPlayerAction(gameAction, sender)

    turnDecisionManager.processTurn(playerAction, turn)
    return sender
}

test('can send cult with result 1', () => {
    const sender = sendCult(1)

    expect(sender.population).toBe(10 - 5)
    expect(sender.culture).toBe(startingCulture)
})

test('cannot send cult with population less than 10', () => {
    const throwingFunction = () => {
        const sender = sendCult(1, 4)
    }
    expect(throwingFunction).toThrow(`Tribe '${TribeName.Achaeans}' cannot perform action '${ActionName.Cult}', because it does not satisfy action constraints. (Insufficient Population)`)
})

test('can send cult with result 2', () => {
    const sender = sendCult(2)

    expect(sender.culture).toBe(startingCulture)
    expect(sender.population).toBe(10)
    expect(sender.militaryPower).toBe(Tribe.defaultMilitaryPower)
})

test('can send cult with result 3', () => {
    const sender = sendCult(3)

    expect(sender.culture).toBe(startingCulture + 2)
})

test('can send cult with result 4', () => {
    const sender = sendCult(4)

    expect(sender.culture).toBe(startingCulture + 3)
})

test('can send cult with result 5', () => {
    const sender = sendCult(5)

    expect(sender.culture).toBe(startingCulture + 4)
})

test('can send cult with result 6', () => {
    const sender = sendCult(6)

    expect(sender.culture).toBe(startingCulture + 6)
})
