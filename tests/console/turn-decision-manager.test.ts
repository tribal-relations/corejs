import 'reflect-metadata'
import { container } from 'tsyringe'
import TurnDecisionManager from '../../src/app/TurnDecisionManager'
import Action from '../../src/domain/entity/Action'
import Player from '../../src/domain/entity/Player'
import Tribe from '../../src/domain/entity/Tribe'
import Turn from '../../src/domain/entity/Turn'

test('q to quit game', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = new Tribe()
    const player = new Player(tribe, 'test_player')

    const turn = new Turn(player)
    const action = Action.createFromName(Action.quit)
    const turnResult = turnDecisionManager.processTurn(action, turn)

    expect(turnResult.isLast).toBe(true)
})
