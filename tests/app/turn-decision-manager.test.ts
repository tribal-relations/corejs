import 'reflect-metadata'
import { container } from 'tsyringe'
import TurnDecisionManager from '../../src/app/TurnDecisionManager.ts'
import Player from '../../src/domain/entity/Player.ts'
import Turn from '../../src/domain/entity/Turn.ts'
import ActionName from '../../src/domain/enum/ActionName.ts'
import ActionRepository from '../../src/domain/repository/ActionRepository.ts'
import TribeFactory from '../../src/outer/factory/TribeFactory.ts'

test('q to quit game', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    const player = new Player(tribe)

    const turn = new Turn(player)
    const action = ActionRepository.createFromName(ActionName.Quit)
    const turnResult = turnDecisionManager.processTurn(action, turn)

    expect(turnResult.isLast).toBe(true)
})
