import { container } from 'tsyringe'
import TurnDecisionManager from '../src/app/TurnDecisionManager'
import Player from '../src/domain/entity/Player'
import type Territory from '../src/domain/entity/Territory'
import Tile from '../src/domain/entity/Tile'
import Tribe from '../src/domain/entity/Tribe'
import Turn from '../src/domain/entity/Turn'
import ResourceName from '../src/domain/enum/ResourceName'
import TribeFactory from '../src/outer/factory/TribeFactory'

class TestBootstrapper {
    public static getStarterData(): {
        'turnDecisionManager': TurnDecisionManager
        'tribe': Tribe
        'turn': Turn
    } {
        const turnDecisionManager = container.resolve(TurnDecisionManager)

        const tribe = new Tribe()
        expect(tribe.technologies).toStrictEqual({})

        const player = new Player(tribe)
        const turn = new Turn(player)
        return {
            turnDecisionManager,
            tribe,
            turn,
        }
    }

    public static createStarterTribe(
        name: string = 'test',
        territory: Territory | null = null,
    ): Tribe {
        return TribeFactory.createStarterTribe(name, territory)
    }

    public static addFood(tribe: Tribe, amount: number = 1): void {
        const tile = Tile.createFromResourceName(ResourceName.Forest)
        for (let i = 0; i < amount; ++i) {
            tribe.addTile(tile)
        }
        tribe.updateResources()
    }

    public static addCulture(tribe: Tribe, amount: number = 1): void {
        const tile = Tile.createFromResourceName(ResourceName.Lake)
        for (let i = 0; i < amount; ++i) {
            tribe.addTile(tile)
        }
        tribe.updateResources()
    }

    public static addProduction(tribe: Tribe, amount: number = 1): void {
        if (amount % 2 !== 0) {
            throw new Error('There are only tiles with production 2.')
        }
        const tile = Tile.createFromResourceName(ResourceName.Metal)
        for (let i = 0; i < amount / 2; ++i) {
            tribe.addTile(tile)
        }

        tribe.updateResources()
    }
}

export default TestBootstrapper
