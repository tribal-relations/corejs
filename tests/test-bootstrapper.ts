import TurnDecisionManager from '../src/app/turn-decision-manager'
import Tribe from '../src/domain/entity/tribe'
import Turn from '../src/domain/entity/turn'
import { container } from 'tsyringe'
import Player from '../src/domain/entity/player'
import Std from '../src/ui/std'

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
