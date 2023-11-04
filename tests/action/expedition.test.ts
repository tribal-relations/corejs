import 'reflect-metadata'
import { container } from 'tsyringe'
import TurnDecisionManager from '../../src/app/TurnDecisionManager'
import Action from '../../src/domain/entity/Action'
import Player from '../../src/domain/entity/Player'
import Tribe from '../../src/domain/entity/Tribe'
import Turn from '../../src/domain/entity/Turn'
import DiceThrower from '../../src/domain/helper/DiceThrower'
import LosingDiceThrower from '../../src/domain/helper/LosingDiceThrower'
import SuccessfulDiceThrower from '../../src/domain/helper/SuccessfulDiceThrower'

function makeExpedition(turnDecisionManager: TurnDecisionManager, tribe: Tribe): void {
    const player = new Player(tribe, 'test_player')
    const turn = new Turn(player)

    expect(tribe.territory.tiles.length).toBe(0)

    const action = Action.createFromName(Action.expedition)
    turnDecisionManager.processTurn(action, turn)
}

test('expedition adds one tile', () => {
    container.reset()
    const turnDecisionManager = container
        .createChildContainer()
        .register<DiceThrower>(DiceThrower, SuccessfulDiceThrower)
        .resolve(TurnDecisionManager)
    const tribe = new Tribe()
    makeExpedition(turnDecisionManager, tribe)

    expect(tribe.territory.tiles.length).toBe(1)
})

test('expedition can result in failure', () => {
    container.reset()
    const turnDecisionManager = container
        .createChildContainer()
        .register<DiceThrower>(DiceThrower, LosingDiceThrower)
        .resolve(TurnDecisionManager)

    const tribe = new Tribe()
    makeExpedition(turnDecisionManager, tribe)

    expect(tribe.territory.tiles.length).toBe(0)
})
