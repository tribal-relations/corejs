import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import AbstractPlayerAction from '../../../src/domain/entity/action/AbstractPlayerAction.ts'
import type GameplayAction from '../../../src/domain/entity/action/GameplayAction.ts'
import type PlayerActionInterface from '../../../src/domain/entity/action/PlayerActionInterface.ts'
import Player from '../../../src/domain/entity/Player.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import ActionName from '../../../src/domain/enum/ActionName.ts'
import GameplayActionRepository from '../../../src/domain/repository/GameplayActionRepository.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'

test('arm for amount of production', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    const tribe = TribeFactory.createEmpty({ production: 10, population: 100 })
    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBe(0)

    const player = new Player(tribe)
    const turn = new Turn(player)
    const gameAction = GameplayActionRepository.get(ActionName.Arm)
    const playerAction = new AbstractPlayerAction(gameAction, player.tribe)

    turnDecisionManager.processTurn(playerAction, turn)

    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBe(10)
})

test('arm for amount of production, but not bigger than non-armed population', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    const tribe = TribeFactory.createEmpty({ production: 1000, population: 100 })

    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBe(0)

    const player = new Player(tribe)
    const turn = new Turn(player)
    const gameAction = GameplayActionRepository.get(ActionName.Arm)
    const playerAction = new AbstractPlayerAction(gameAction, player.tribe)

    turnDecisionManager.processTurn(playerAction, turn)

    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBe(100)
})

test('cannot arm more than population', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    const tribe = TribeFactory.createEmpty({ production: 90, population: 100 })

    const player = new Player(tribe)
    const turn = new Turn(player)
    let gameAction: GameplayAction
    let playerAction: PlayerActionInterface
    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBe(0)
    expect(tribe.production).toBe(90)

     gameAction = GameplayActionRepository.get(ActionName.Arm)
     playerAction = new AbstractPlayerAction(gameAction, player.tribe)

    turnDecisionManager.processTurn(playerAction, turn)

    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBe(90)

     gameAction = GameplayActionRepository.get(ActionName.Arm)
     playerAction = new AbstractPlayerAction(gameAction, player.tribe)

    turnDecisionManager.processTurn(playerAction, turn)

    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBe(100)

    const throwingFunction = (): void => {
        const gameAction = GameplayActionRepository.get(ActionName.Arm)
        const playerAction = new AbstractPlayerAction(gameAction, player.tribe)

        turnDecisionManager.processTurn(playerAction, turn)
    }
    expect(tribe.militaryPower).toBe(100)

    expect(throwingFunction).toThrow('Cannot arm further. Attained maximal military power 100 for population 100.')
})
