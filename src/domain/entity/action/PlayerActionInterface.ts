import type GameplayAction from './GameplayAction'
import type Tribe from '../Tribe'

interface PlayerActionInterface {
    gameplayAction: GameplayAction
    actor: Tribe
}

export default PlayerActionInterface
