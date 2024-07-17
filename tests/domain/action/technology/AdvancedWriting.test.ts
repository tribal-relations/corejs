import { expect, test } from 'vitest'
import TurnDecisionManager from '../../../../src/app/TurnDecisionManager.ts'
import ResearchPlayerAction from '../../../../src/domain/entity/action/ResearchPlayerAction.ts'
import Player from '../../../../src/domain/entity/Player.ts'
import Turn from '../../../../src/domain/entity/Turn.ts'
import TechnologyName from '../../../../src/domain/enum/TechnologyName.ts'
import TileBonusName from '../../../../src/domain/enum/TileBonusName.ts'
import TechnologyRepository from '../../../../src/domain/repository/TechnologyRepository.ts'
import { container } from '../../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../../src/outer/factory/TribeFactory.ts'

test.skip('culture is doubled', () => {
    const turnDecisionManager = container.resolveSafely<TurnDecisionManager>(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.technologies).toStrictEqual({})

    const player = new Player(tribe)
    const turn = new Turn(player)

    let playerAction = new ResearchPlayerAction(player.tribe, container.resolveSafely(TechnologyRepository).get(TechnologyName.Pottery))
    turnDecisionManager.processTurn(playerAction, turn)

    playerAction = new ResearchPlayerAction(player.tribe, container.resolveSafely(TechnologyRepository).get(TechnologyName.PrimitiveWriting))
    turnDecisionManager.processTurn(playerAction, turn)

    playerAction = new ResearchPlayerAction(player.tribe, container.resolveSafely(TechnologyRepository).get(TechnologyName.AdvancedWriting))
    turnDecisionManager.processTurn(playerAction, turn)

    expect(tribe.technologies).toStrictEqual({
        [TechnologyName.Pottery]: true,
        [TechnologyName.PrimitiveWriting]: true,
        [TechnologyName.AdvancedWriting]: true,
    })

    expect(tribe.hasBonusByName(TileBonusName.AdvancedWritingCulture)).toBe(true)
})
