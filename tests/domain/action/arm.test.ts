
import { container } from '../../../src/NaiveDiContainer.ts'
import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import type Action from '../../../src/domain/entity/Action.ts'
import Player from '../../../src/domain/entity/Player.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import ActionName from '../../../src/domain/enum/ActionName.ts'
import ActionRepository from '../../../src/domain/repository/ActionRepository.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'

test('arm for amount of production', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = TribeFactory.createEmpty({ production: 10, population: 100 })
    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBe(0)

    const player = new Player(tribe)
    const turn = new Turn(player)
    const action = ActionRepository.createFromName(ActionName.Arm)

    turnDecisionManager.processTurn(action, turn)

    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBe(10)
})

test('arm for amount of production, but not bigger than non-armed population', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = TribeFactory.createEmpty({ production: 1000, population: 100 })

    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBe(0)

    const player = new Player(tribe)
    const turn = new Turn(player)
    const action = ActionRepository.createFromName(ActionName.Arm)

    turnDecisionManager.processTurn(action, turn)

    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBe(100)
})

test('cannot arm more than population', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = TribeFactory.createEmpty({ production: 90, population: 100 })

    const player = new Player(tribe)
    const turn = new Turn(player)
    let action: Action
    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBe(0)
    expect(tribe.production).toBe(90)

    action = ActionRepository.createFromName(ActionName.Arm)
    turnDecisionManager.processTurn(action, turn)

    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBe(90)

    action = ActionRepository.createFromName(ActionName.Arm)
    turnDecisionManager.processTurn(action, turn)

    expect(tribe.population).toBe(100)
    expect(tribe.militaryPower).toBe(100)

    const throwingFunction = (): void => {
        const action = ActionRepository.createFromName(ActionName.Arm)
        turnDecisionManager.processTurn(action, turn)
    }
    expect(tribe.militaryPower).toBe(100)

    expect(throwingFunction).toThrow('Cannot arm further. Maximal combat readiness for such population.')
})
