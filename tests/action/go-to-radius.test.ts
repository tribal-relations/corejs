import 'reflect-metadata'
import ActionRepository from '../../src/app/repository/ActionRepository'
import Tile from '../../src/domain/entity/Tile'
import type Tribe from '../../src/domain/entity/Tribe'
import ActionName from '../../src/domain/enum/ActionName'
import ResourceName from '../../src/domain/enum/ResourceName'
import TestBootstrapper from '../test-bootstrapper'

function addCulture(tribe: Tribe): void {
    const tile = Tile.createFromResourceName(ResourceName.Lake)
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

    const action = ActionRepository.createFromName(ActionName.goTo3rdRadius)
    turnDecisionManager.processTurn(action, turn)

    expect(tribe.radius).toStrictEqual(3)
})

test('cannot go to 2nd radius from 4th', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    expect(tribe.radius).toStrictEqual(4)
    addCulture(tribe)

    const action = ActionRepository.createFromName(ActionName.goTo2ndRadius)
    const throwingFunction = (): void => {
        turnDecisionManager.processTurn(action, turn)
    }
    const targetRadius = 2
    expect(throwingFunction).toThrow(
        `Tribe '${tribe.name}' has not yet reached radius ${targetRadius + 1} necessary to perform action '${ActionName.goTo2ndRadius}'.`,
    )
    expect(tribe.radius).toStrictEqual(4)
})

test('cannot go to 1st radius from 4th', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    expect(tribe.radius).toStrictEqual(4)
    addCulture(tribe)

    const action = ActionRepository.createFromName(ActionName.goTo1stRadius)
    const throwingFunction = (): void => {
        turnDecisionManager.processTurn(action, turn)
    }
    const targetRadius = 1
    expect(throwingFunction).toThrow(
        `Tribe '${tribe.name}' has not yet reached radius ${targetRadius + 1} necessary to perform action '${ActionName.goTo1stRadius}'.`,
    )
    expect(tribe.radius).toStrictEqual(4)
})

test('can go to 2nd radius from 3rd', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    addCulture(tribe)
    tribe.goToNextRadius()
    expect(tribe.radius).toStrictEqual(3)

    const action = ActionRepository.createFromName(ActionName.goTo2ndRadius)
    turnDecisionManager.processTurn(action, turn)

    expect(tribe.radius).toStrictEqual(2)
})

test('cannot go to 1st radius from 3rd', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    addCulture(tribe)
    tribe.goToNextRadius()
    expect(tribe.radius).toStrictEqual(3)

    const action = ActionRepository.createFromName(ActionName.goTo1stRadius)
    const throwingFunction = (): void => {
        turnDecisionManager.processTurn(action, turn)
    }
    const targetRadius = 1
    expect(throwingFunction).toThrow(
        `Tribe '${tribe.name}' has not yet reached radius ${targetRadius + 1} necessary to perform action '${ActionName.goTo1stRadius}'.`,
    )
    expect(tribe.radius).toStrictEqual(3)
})

test('can go to 1st radius from 2nd', () => {
    const { turnDecisionManager, tribe, turn } = TestBootstrapper.getStarterData()
    addCulture(tribe)
    tribe.goToNextRadius()
    tribe.goToNextRadius()
    expect(tribe.radius).toStrictEqual(2)

    const action = ActionRepository.createFromName(ActionName.goTo1stRadius)
    turnDecisionManager.processTurn(action, turn)

    expect(tribe.radius).toStrictEqual(1)
})
