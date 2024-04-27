import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import AbstractPlayerAction from '../../../src/domain/entity/action/AbstractPlayerAction.ts'
import Player from '../../../src/domain/entity/Player.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import ActionName from '../../../src/domain/enum/ActionName.ts'
import TribeName from '../../../src/domain/enum/TribeName.ts'
import GameplayActionRepository from '../../../src/domain/repository/GameplayActionRepository.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'

test('action constraints must be respected', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribe(TribeName.Achaeans)
    const player = new Player(tribe)
    const turn = new Turn(player)
    expect(tribe.tilesLength).toBe(2)

    expect(tribe.population).toStrictEqual(2)
    const gameAction = container.resolveSafely(GameplayActionRepository).get(ActionName.Conquer)
    const playerAction = new AbstractPlayerAction(gameAction, player.tribe)

    const throwingFunction = (): void => {
        turnDecisionManager.processTurn(playerAction, turn)
    }

    expect(throwingFunction).toThrow(
        `Tribe '${tribe.name}' has not yet reached radius 1 necessary to perform action '${playerAction.gameplayActionName}'`,
    )
    expect(tribe.isWinner).toBe(false)
})
