import type ActionValidatorInterface from './ActionValidatorInterface.ts'
import ActionUnsuccessful from '../../exception/ActionUnsuccessful.ts'
import type CaravanPlayerAction from '../entity/action/CaravanPlayerAction.ts'

class CaravanValidator implements ActionValidatorInterface {
    validate(action: CaravanPlayerAction): void {
        if (action.actor.name === action.recipient.name) {
            throw new ActionUnsuccessful('Cannot send caravan to self.')
        }
    }
}

export default CaravanValidator
