import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import AbstractPlayerAction from '../../../src/domain/entity/action/AbstractPlayerAction.ts'
import Player from '../../../src/domain/entity/Player.ts'
import type Tribe from '../../../src/domain/entity/Tribe.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import ActionName from '../../../src/domain/enum/ActionName.ts'
import DiceThrower from '../../../src/domain/helper/DiceThrower.ts'
import GameplayActionRepository from '../../../src/domain/repository/GameplayActionRepository.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'
import LosingDiceThrower from '../../mock/LosingDiceThrower.ts'
import SuccessfulDiceThrower from '../../mock/SuccessfulDiceThrower.ts'
import TestBootstrapper from '../../test-bootstrapper.ts'

function makeExpedition(turnDecisionManager: TurnDecisionManager, tribe: Tribe): void {
    const player = new Player(tribe)
    const turn = new Turn(player)

    expect(tribe.tiles.length).toBe(2)

    const gameAction = container.resolveSafely(GameplayActionRepository).get(ActionName.Expedition)
    const playerAction = new AbstractPlayerAction(gameAction, player.tribe)

    const turnResult = turnDecisionManager.processTurn(playerAction, turn)
}

test('expedition adds one tile', () => {
    TestBootstrapper.addMocks([{
        class: DiceThrower, instance: new SuccessfulDiceThrower(),
    }])
    const turnDecisionManager: TurnDecisionManager = container.resolveSafely(TurnDecisionManager)
    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.tiles.length).toBe(2 + 0)

    makeExpedition(turnDecisionManager, tribe)

    expect(tribe.tiles.length).toBe(2 + 1)
})

test('expedition can result in failure', () => {
    TestBootstrapper.addMocks([{
        class: DiceThrower, instance: new LosingDiceThrower(),
    }])
    const turnDecisionManager: TurnDecisionManager = container.resolveSafely(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.tiles.length).toBe(2 + 0)

    makeExpedition(turnDecisionManager, tribe)

    expect(tribe.tiles.length).toBe(2 + 0)
})
