import TurnDecisionManager from '../../../../src/app/TurnDecisionManager.ts'
import ResearchPlayerAction from '../../../../src/domain/entity/action/ResearchPlayerAction.ts'
import Player from '../../../../src/domain/entity/Player.ts'
import Turn from '../../../../src/domain/entity/Turn.ts'
import TechnologyName from '../../../../src/domain/enum/TechnologyName.ts'
import TechnologyRepository from '../../../../src/domain/repository/TechnologyRepository.ts'
import { container } from '../../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../../src/outer/factory/TribeFactory.ts'

test.skip('research adds technology', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.technologies).toStrictEqual({})

    const player = new Player(tribe)
    const turn = new Turn(player)

    const playerAction = new ResearchPlayerAction(player.tribe, TechnologyRepository.get(TechnologyName.Pottery))
    const turnResult = turnDecisionManager.processTurn(playerAction, turn)

    expect(turnResult.isLast).toBe(false)
    expect(tribe.technologies).toStrictEqual({ Pottery: true })
})
