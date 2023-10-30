import DiceThrower from './diceThrower'
import { singleton } from 'tsyringe'

@singleton()
class SuccessfulDiceThrower extends DiceThrower {
    public ifSuccessD6(successSides: number): boolean {
        return true
    }
}

export default SuccessfulDiceThrower
