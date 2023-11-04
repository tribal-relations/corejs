import { container } from 'tsyringe'
import TurnDecisionManager from '../src/app/TurnDecisionManager'
import Player from '../src/domain/entity/Player'
import Tribe from '../src/domain/entity/Tribe'
import Turn from '../src/domain/entity/Turn'
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
}

export default TestBootstrapper
