import { container } from 'tsyringe'
import TurnDecisionManager from '../src/app/TurnDecisionManager'
import Player from '../src/domain/entity/Player'
import Population from '../src/domain/entity/Population'
import Territory from '../src/domain/entity/Territory'
import Tile from '../src/domain/entity/Tile'
import Tribe from '../src/domain/entity/Tribe'
import Turn from '../src/domain/entity/Turn'
import ResourceName from '../src/domain/enum/ResourceName'
import Std from '../src/ui/Std'

class TestBootstrapper {
    public static getStarterData(): {
        'turnDecisionManager': TurnDecisionManager
        'tribe': Tribe
        'turn': Turn
    } {
        const turnDecisionManager = container.resolve(TurnDecisionManager)

        const tribe = new Tribe()
        expect(tribe.technologies).toStrictEqual({})

        const player = new Player(tribe, 'test_player')

        const turn = new Turn(player)
        const std = container.resolve(Std)

        return {
            turnDecisionManager,
            tribe,
            turn,
        }
    }

    public static createStarterTribe(name: string = 'test'): Tribe {
        return new Tribe(
            name,
            0,
            0,
            Population.createStarterPopulation(),
            Territory.createStarterTerritory(),
        )
    }

    public static addCulture(tribe: Tribe): void {
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
}

export default TestBootstrapper
