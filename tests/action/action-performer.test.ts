import 'reflect-metadata'
import { container } from 'tsyringe'
import TurnDecisionManager from '../../src/app/turn-decision-manager'
import Turn from '../../src/domain/entity/turn'
import Player from '../../src/domain/entity/player'
import Tribe from '../../src/domain/entity/tribe'
import Population from '../../src/domain/entity/population'
import Action from '../../src/domain/entity/Action'
import TestBootstrapper from '../test-bootstrapper'
import Currency from '../../src/domain/entity/Currency'

test('arm reduces civilizedness if no extra population', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()

    expect(tribe.population.total).toBe(2)
    expect(tribe.population.civilizedness).toBe(1)
    expect(tribe.population.combatReadiness).toBe(1)

    const action = Action.createFromName(Action.arm)
    const turnResult = turnDecisionManager.processTurn(action, turn)

    expect(turnResult.isLast).toBe(false)
    expect(tribe.population.total).toBe(2)
    expect(tribe.population.civilizedness).toBe(0)
    expect(tribe.population.combatReadiness).toBe(2)
})

test('arm does not reduce civilizedness if extra population', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = new Tribe(
        '',
        0,
        0,
        new Population(10, 1, 1),
    )
    expect(tribe.population.total).toBe(10)
    expect(tribe.population.civilizedness).toBe(1)
    expect(tribe.population.combatReadiness).toBe(1)

    const player = new Player(tribe, 'test_player')

    const turn = new Turn(player)
    const action = Action.createFromName(Action.arm)

    const turnResult = turnDecisionManager.processTurn(action, turn)

    expect(turnResult.isLast).toBe(false)
    expect(tribe.population.total).toBe(10)
    expect(tribe.population.civilizedness).toBe(1)
    expect(tribe.population.combatReadiness).toBe(2)
})

test('research adds technology', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()

    const action = Action.createFromName(Action.research)
    turn.parameters = 'Pottery'
    const turnResult = turnDecisionManager.processTurn(action, turn)

    expect(turnResult.isLast).toBe(false)
    expect(tribe.technologies).toStrictEqual({ Pottery: true })
})

test('cannot research blocked technology', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()

    const techName = 'Advanced Writing'

    const throwingFunction = (): void => {
        const action = Action.createFromName(Action.research)
        turn.parameters = techName
        const turnResult = turnDecisionManager.processTurn(action, turn)

        expect(turnResult.isLast).toBe(false)
        expect(tribe.technologies).toStrictEqual({})
    }
    expect(throwingFunction).toThrow(`${tribe.name} cannot research ${techName}, because not all prerequisites are met`)
})

test('cannot research already known technology', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()

    const techName = 'Pottery'
    tribe.research(techName)
    expect(tribe.technologies).toStrictEqual({ Pottery: true })

    const throwingFunction = (): void => {
        const action = Action.createFromName(Action.research)
        turn.parameters = techName
        const turnResult = turnDecisionManager.processTurn(action, turn)

        expect(turnResult.isLast).toBe(false)
        expect(tribe.technologies).toStrictEqual({ Pottery: true })
    }

    expect(throwingFunction).toThrow(`${tribe.name} cannot research ${techName}, because it is already known`)
})

test('action constraints must be respected', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = new Tribe(
        'test_tribe',
        0,
        0,
        new Population(0, 0, 0),
        )
    const player = new Player(tribe, 'test_player')
    const turn = new Turn(player)

    expect(tribe.population.total).toStrictEqual(0)
    const action = Action.createFromName(Action.expedition)

    const throwingFunction = (): void => {
        turnDecisionManager.processTurn(action, turn)
    }

    expect(throwingFunction).toThrow(
        `Tribe '${tribe.name}' cannot perform action '${action.name}', because it does not satisfy action constraints. (Insufficient ${Currency.Population})`,
    )
    expect(tribe.territory.tiles.length).toBe(0)
})
