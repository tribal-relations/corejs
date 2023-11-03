import DiceThrower from './DiceThrower'
import { singleton } from 'tsyringe'

@singleton()
class LosingDiceThrower extends DiceThrower {
    public ifSuccessD6(successSides: number): boolean {
        return false
    }
}

export default LosingDiceThrower
