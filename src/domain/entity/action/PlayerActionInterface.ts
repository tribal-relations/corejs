import type GameAction from '../GameAction'
import type Tribe from '../Tribe'

interface PlayerActionInterface {
    gameAction: GameAction
    actor: Tribe
}

export default PlayerActionInterface
