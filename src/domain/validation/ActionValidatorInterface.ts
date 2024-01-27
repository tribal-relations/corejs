import type PlayerActionInterface from '../entity/action/PlayerActionInterface.ts'

interface ActionValidatorInterface {
     validate: (action: PlayerActionInterface) => void
}

export default ActionValidatorInterface
