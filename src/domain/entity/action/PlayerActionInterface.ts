import type ActionName from '../../enum/ActionName.ts'
import type Tribe from '../Tribe.ts'

interface PlayerActionInterface {
    gameplayActionName: ActionName
    actor: Tribe
}

export default PlayerActionInterface
