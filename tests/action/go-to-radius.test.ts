import 'reflect-metadata'
import Action from '../../src/domain/entity/Action'
import Resource from '../../src/domain/entity/Resource'
import Tile from '../../src/domain/entity/Tile'
import type Tribe from '../../src/domain/entity/Tribe'
import TestBootstrapper from '../test-bootstrapper'

function addCulture(tribe: Tribe): void {
    const tile = Tile.createFromResourceName(Resource.lake)
    tribe.territory.addTile(tile)
    tribe.territory.addTile(tile)
    tribe.territory.addTile(tile)
    tribe.territory.addTile(tile)
    tribe.territory.addTile(tile)
    tribe.territory.addTile(tile)
    tribe.territory.addTile(tile)
    tribe.territory.addTile(tile)
    tribe.territory.addTile(tile)
    tribe.territory.updateResources()
}

test('can go to 3rd radius from 4th', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    expect(tribe.radius).toStrictEqual(4)

    const action = Action.createFromName(Action.goTo3rdRadius)
    turnDecisionManager.processTurn(action, turn)

    expect(tribe.radius).toStrictEqual(3)
})

test('cannot go to 2nd radius from 4th', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    expect(tribe.radius).toStrictEqual(4)
    addCulture(tribe)

    const action = Action.createFromName(Action.goTo2ndRadius)
    const throwingFunction = (): void => {
        turnDecisionManager.processTurn(action, turn)
    }
    const targetRadius = 2
    expect(throwingFunction).toThrow(
        `Tribe '${tribe.name}' has not yet reached radius ${targetRadius + 1} necessary to perform action '${Action.goTo2ndRadius}'.`,
    )
    expect(tribe.radius).toStrictEqual(4)
})

test('cannot go to 1st radius from 4th', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    expect(tribe.radius).toStrictEqual(4)
    addCulture(tribe)

    const action = Action.createFromName(Action.goTo1stRadius)
    const throwingFunction = (): void => {
        turnDecisionManager.processTurn(action, turn)
    }
    const targetRadius = 1
    expect(throwingFunction).toThrow(
        `Tribe '${tribe.name}' has not yet reached radius ${targetRadius + 1} necessary to perform action '${Action.goTo1stRadius}'.`,
    )
    expect(tribe.radius).toStrictEqual(4)
})

test('can go to 2nd radius from 3rd', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    addCulture(tribe)
    tribe.goToNextRadius()
    expect(tribe.radius).toStrictEqual(3)

    const action = Action.createFromName(Action.goTo2ndRadius)
    turnDecisionManager.processTurn(action, turn)

    expect(tribe.radius).toStrictEqual(2)
})

test('cannot go to 1st radius from 3rd', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    addCulture(tribe)
    tribe.goToNextRadius()
    expect(tribe.radius).toStrictEqual(3)

    const action = Action.createFromName(Action.goTo1stRadius)
    const throwingFunction = (): void => {
        turnDecisionManager.processTurn(action, turn)
    }
    const targetRadius = 1
    expect(throwingFunction).toThrow(
        `Tribe '${tribe.name}' has not yet reached radius ${targetRadius + 1} necessary to perform action '${Action.goTo1stRadius}'.`,
    )
    expect(tribe.radius).toStrictEqual(3)
})

test('can go to 1st radius from 2nd', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    addCulture(tribe)
    tribe.goToNextRadius()
    tribe.goToNextRadius()
    expect(tribe.radius).toStrictEqual(2)

    const action = Action.createFromName(Action.goTo1stRadius)
    turnDecisionManager.processTurn(action, turn)

    expect(tribe.radius).toStrictEqual(1)
})
