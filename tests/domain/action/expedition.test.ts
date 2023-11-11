import 'reflect-metadata'
import { container } from 'tsyringe'
import TurnDecisionManager from '../../../src/app/TurnDecisionManager'
import Player from '../../../src/domain/entity/Player'
import type Tribe from '../../../src/domain/entity/Tribe'
import Turn from '../../../src/domain/entity/Turn'
import ActionName from '../../../src/domain/enum/ActionName'
import DiceThrower from '../../../src/domain/helper/DiceThrower'
import ActionRepository from '../../../src/domain/repository/ActionRepository'
import TribeFactory from '../../../src/outer/factory/TribeFactory'
import LosingDiceThrower from '../../mock/LosingDiceThrower'
import SuccessfulDiceThrower from '../../mock/SuccessfulDiceThrower'

function makeExpedition(turnDecisionManager: TurnDecisionManager, tribe: Tribe): void {
    const player = new Player(tribe)
    const turn = new Turn(player)

    expect(tribe.tiles.length).toBe(2)

    const action = ActionRepository.createFromName(ActionName.Expedition)
    turnDecisionManager.processTurn(action, turn)
}

test('expedition adds one tile', () => {
    const turnDecisionManager = container
        .createChildContainer()
        .register<DiceThrower>(DiceThrower, SuccessfulDiceThrower)
        .resolve(TurnDecisionManager)
    const tribe = TribeFactory.createStarterTribeWithOptions()

    makeExpedition(turnDecisionManager, tribe)

    expect(tribe.tiles.length).toBe(2 + 1)
})

test('expedition can result in failure', () => {
    const turnDecisionManager = container
        .createChildContainer()
        .register<DiceThrower>(DiceThrower, LosingDiceThrower)
        .resolve(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()

    makeExpedition(turnDecisionManager, tribe)

    expect(tribe.tiles.length).toBe(2 + 0)
})
