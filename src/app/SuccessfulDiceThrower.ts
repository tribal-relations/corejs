import DiceThrower from './DiceThrower'
import { singleton } from 'tsyringe'

@singleton()
class SuccessfulDiceThrower extends DiceThrower {
    public ifSuccessD6(successSides: number): boolean {
        return true
    }
}

export default SuccessfulDiceThrower
