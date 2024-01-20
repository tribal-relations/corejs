import NotFoundException from './NotFoundException.ts'
import type TribeName from '../../domain/enum/TribeName.ts'

class CaravanNotFound extends NotFoundException {
    constructor(sender: TribeName, recipient: TribeName | null = null) {
        if (!recipient) {
            super('Caravan', `from ${sender}`)
            return
        }
        super('Caravan', `from ${sender} to ${recipient}`)
    }
}

export default CaravanNotFound
