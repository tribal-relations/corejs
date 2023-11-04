import 'reflect-metadata'
import { container } from 'tsyringe'
import ActionRepository from '../../src/app/repository/ActionRepository'
import TurnDecisionManager from '../../src/app/TurnDecisionManager'
import Player from '../../src/domain/entity/Player'
import Tribe from '../../src/domain/entity/Tribe'
import Turn from '../../src/domain/entity/Turn'
import ActionName from '../../src/domain/enum/ActionName'

test('q to quit game', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = new Tribe()
    const player = new Player(tribe, 'test_player')

    const turn = new Turn(player)
    const action = ActionRepository.createFromName(ActionName.quit)
    const turnResult = turnDecisionManager.processTurn(action, turn)

    expect(turnResult.isLast).toBe(true)
})
