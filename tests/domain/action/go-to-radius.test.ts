import TurnDecisionManager from '../../../src/app/TurnDecisionManager.ts'
import AbstractPlayerAction from '../../../src/domain/entity/action/AbstractPlayerAction'
import Player from '../../../src/domain/entity/Player.ts'
import Turn from '../../../src/domain/entity/Turn.ts'
import ActionName from '../../../src/domain/enum/ActionName.ts'
import ActionRepository from '../../../src/domain/repository/ActionRepository.ts'
import { container } from '../../../src/NaiveDiContainer.ts'
import TribeFactory from '../../../src/outer/factory/TribeFactory.ts'
import TestBootstrapper from '../../test-bootstrapper.ts'

test('can go to 3rd radius from 4th', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.technologies).toStrictEqual({})

    const player = new Player(tribe)
    const turn = new Turn(player)
    expect(tribe.radius).toStrictEqual(4)

    const gameAction = ActionRepository.createFromName(ActionName.GoTo3rdRadius)
    const playerAction = new AbstractPlayerAction(gameAction, player.tribe)
    turnDecisionManager.processTurn(playerAction, turn)

    expect(tribe.radius).toStrictEqual(3)
})

test('cannot go to 2nd radius from 4th', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.technologies).toStrictEqual({})

    const player = new Player(tribe)
    const turn = new Turn(player)

    expect(tribe.radius).toStrictEqual(4)
    TestBootstrapper.addCulture(tribe, 10)

    const gameAction = ActionRepository.createFromName(ActionName.GoTo2ndRadius)
    const playerAction = new AbstractPlayerAction(gameAction, player.tribe)
    const throwingFunction = (): void => {
        turnDecisionManager.processTurn(playerAction, turn)
    }
    const targetRadius = 2
    expect(throwingFunction).toThrow(
        `Tribe '${tribe.name}' has not yet reached radius ${targetRadius + 1} necessary to perform action '${ActionName.GoTo2ndRadius}'.`,
    )
    expect(tribe.radius).toStrictEqual(4)
})

test('cannot go to 1st radius from 4th', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.technologies).toStrictEqual({})

    const player = new Player(tribe)
    const turn = new Turn(player)

    expect(tribe.radius).toStrictEqual(4)
    TestBootstrapper.addCulture(tribe, 10)

    const gameAction = ActionRepository.createFromName(ActionName.GoTo1stRadius)
    const playerAction = new AbstractPlayerAction(gameAction, player.tribe)
    const throwingFunction = (): void => {
        turnDecisionManager.processTurn(playerAction, turn)
    }
    const targetRadius = 1
    expect(throwingFunction).toThrow(
        `Tribe '${tribe.name}' has not yet reached radius ${targetRadius + 1} necessary to perform action '${ActionName.GoTo1stRadius}'.`,
    )
    expect(tribe.radius).toStrictEqual(4)
})

test('can go to 2nd radius from 3rd', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.technologies).toStrictEqual({})

    const player = new Player(tribe)
    const turn = new Turn(player)

    TestBootstrapper.addCulture(tribe, 10)
    tribe.goToNextRadius()
    expect(tribe.radius).toStrictEqual(3)

    const gameAction = ActionRepository.createFromName(ActionName.GoTo2ndRadius)
    const playerAction = new AbstractPlayerAction(gameAction, player.tribe)
    turnDecisionManager.processTurn(playerAction, turn)

    expect(tribe.radius).toStrictEqual(2)
})

test('cannot go to 1st radius from 3rd', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.technologies).toStrictEqual({})

    const player = new Player(tribe)
    const turn = new Turn(player)

    TestBootstrapper.addCulture(tribe, 10)
    tribe.goToNextRadius()
    expect(tribe.radius).toStrictEqual(3)

    const gameAction = ActionRepository.createFromName(ActionName.GoTo1stRadius)
    const playerAction = new AbstractPlayerAction(gameAction, player.tribe)
    const throwingFunction = (): void => {
        turnDecisionManager.processTurn(playerAction, turn)
    }
    const targetRadius = 1
    expect(throwingFunction).toThrow(
        `Tribe '${tribe.name}' has not yet reached radius ${targetRadius + 1} necessary to perform action '${ActionName.GoTo1stRadius}'.`,
    )
    expect(tribe.radius).toStrictEqual(3)
})

test('can go to 1st radius from 2nd', () => {
    const turnDecisionManager = container.resolveSafely(TurnDecisionManager)

    const tribe = TribeFactory.createStarterTribeWithOptions()
    expect(tribe.technologies).toStrictEqual({})

    const player = new Player(tribe)
    const turn = new Turn(player)

    TestBootstrapper.addCulture(tribe, 10)
    tribe.goToNextRadius()
    tribe.goToNextRadius()
    expect(tribe.radius).toStrictEqual(2)

    const gameAction = ActionRepository.createFromName(ActionName.GoTo1stRadius)
    const playerAction = new AbstractPlayerAction(gameAction, player.tribe)
    turnDecisionManager.processTurn(playerAction, turn)

    expect(tribe.radius).toStrictEqual(1)
})
