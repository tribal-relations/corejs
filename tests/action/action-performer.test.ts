import 'reflect-metadata'
import { container } from 'tsyringe'
import TurnDecisionManager from '../../src/app/TurnDecisionManager'
import Action from '../../src/domain/entity/Action'
import Currency from '../../src/domain/entity/Currency'
import Player from '../../src/domain/entity/Player'
import Population from '../../src/domain/entity/Population'
import Tribe from '../../src/domain/entity/Tribe'
import Turn from '../../src/domain/entity/Turn'

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
