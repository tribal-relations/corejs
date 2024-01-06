import TurnDecisionManager from '../../src/app/TurnDecisionManager.ts'
import AbstractPlayerAction from '../../src/domain/entity/action/AbstractPlayerAction'
import Player from '../../src/domain/entity/Player.ts'
import Turn from '../../src/domain/entity/Turn.ts'
import ActionName from '../../src/domain/enum/ActionName.ts'
import ActionRepository from '../../src/domain/repository/ActionRepository.ts'
import { container } from '../../src/NaiveDiContainer.ts'
import TribeFactory from '../../src/outer/factory/TribeFactory.ts'

test('q to quit game', () => {
    const turnDecisionManager = container.resolve(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    const player = new Player(tribe)

    const turn = new Turn(player)
    const gameAction = ActionRepository.createFromName(ActionName.Quit)
    const playerAction = new AbstractPlayerAction(gameAction, player.tribe)
    const turnResult = turnDecisionManager.processTurn(playerAction, turn)

    expect(turnResult.isLast).toBe(true)
})
