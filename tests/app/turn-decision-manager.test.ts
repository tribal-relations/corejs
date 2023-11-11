import 'reflect-metadata'
import { container } from 'tsyringe'
import TurnDecisionManager from '../../src/app/TurnDecisionManager'
import Player from '../../src/domain/entity/Player'
import Turn from '../../src/domain/entity/Turn'
import ActionName from '../../src/domain/enum/ActionName'
import ActionRepository from '../../src/domain/repository/ActionRepository'
import TribeFactory from '../../src/outer/factory/TribeFactory'

test('q to quit game', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    const player = new Player(tribe)

    const turn = new Turn(player)
    const action = ActionRepository.createFromName(ActionName.Quit)
    const turnResult = turnDecisionManager.processTurn(action, turn)

    expect(turnResult.isLast).toBe(true)
})
