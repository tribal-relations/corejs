import DiceThrower from './diceThrower'
import { singleton } from 'tsyringe'

@singleton()
class LosingDiceThrower extends DiceThrower {
    public ifSuccessD6(successSides: number): boolean {
        return false
    }
}

export default LosingDiceThrower
