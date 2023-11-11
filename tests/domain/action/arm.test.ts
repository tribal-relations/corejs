import 'reflect-metadata'
import { container } from 'tsyringe'
import TurnDecisionManager from '../../../src/app/TurnDecisionManager'
import type Action from '../../../src/domain/entity/Action'
import Player from '../../../src/domain/entity/Player'
import Turn from '../../../src/domain/entity/Turn'
import ActionName from '../../../src/domain/enum/ActionName'
import ActionRepository from '../../../src/domain/repository/ActionRepository'
import TribeFactory from '../../../src/outer/factory/TribeFactory'

test('arm for amount of production', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = TribeFactory.createEmpty({ production: 10, population: 100 })
    expect(tribe.total).toBe(100)
    expect(tribe.combatReadiness).toBe(0)

    const player = new Player(tribe)
    const turn = new Turn(player)
    const action = ActionRepository.createFromName(ActionName.Arm)

    turnDecisionManager.processTurn(action, turn)

    expect(tribe.total).toBe(100)
    expect(tribe.combatReadiness).toBe(10)
})

test('arm for amount of production, but not bigger than non-armed population', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = TribeFactory.createEmpty({ production: 1000, population: 100 })

    expect(tribe.total).toBe(100)
    expect(tribe.combatReadiness).toBe(0)

    const player = new Player(tribe)
    const turn = new Turn(player)
    const action = ActionRepository.createFromName(ActionName.Arm)

    turnDecisionManager.processTurn(action, turn)

    expect(tribe.total).toBe(100)
    expect(tribe.combatReadiness).toBe(100)
})

test('cannot arm more than population', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = TribeFactory.createEmpty({ production: 90, population: 100 })

    const player = new Player(tribe)
    const turn = new Turn(player)
    let action: Action
    expect(tribe.total).toBe(100)
    expect(tribe.combatReadiness).toBe(0)
    expect(tribe.production).toBe(90)

    action = ActionRepository.createFromName(ActionName.Arm)
    turnDecisionManager.processTurn(action, turn)

    expect(tribe.total).toBe(100)
    expect(tribe.combatReadiness).toBe(90)

    action = ActionRepository.createFromName(ActionName.Arm)
    turnDecisionManager.processTurn(action, turn)

    expect(tribe.total).toBe(100)
    expect(tribe.combatReadiness).toBe(100)

    const throwingFunction = (): void => {
        const action = ActionRepository.createFromName(ActionName.Arm)
        turnDecisionManager.processTurn(action, turn)
    }
    expect(tribe.combatReadiness).toBe(100)

    expect(throwingFunction).toThrow('Cannot arm further. Maximal combat readiness for such population.')
})
