import type GameplayAction from './GameplayAction.ts'
import type Tribe from '../Tribe.ts'

interface PlayerActionInterface {
    gameplayAction: GameplayAction
    actor: Tribe
}

export default PlayerActionInterface
