import { singleton } from 'tsyringe'
import DiceThrower from './DiceThrower'

@singleton()
class SuccessfulDiceThrower extends DiceThrower {
    public ifSuccessD6(successSides: number): boolean {
        return true
    }
}

export default SuccessfulDiceThrower
