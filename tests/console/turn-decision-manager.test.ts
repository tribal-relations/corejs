import 'reflect-metadata'
import { container } from 'tsyringe'
import TurnDecisionManager from '../../src/app/turn-decision-manager'
import Turn from '../../src/domain/entity/turn'
import Player from '../../src/domain/entity/player'
import Tribe from '../../src/domain/entity/tribe'
import Action from '../../src/domain/entity/Action'

test('q to quit game', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = new Tribe()
    const player = new Player(tribe, 'test_player')

    const turn = new Turn(player)
    const action = Action.createFromName(Action.quit)
    const turnResult = turnDecisionManager.processTurn(action, turn)

    expect(turnResult.isLast).toBe(true)
})
